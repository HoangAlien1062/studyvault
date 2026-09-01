// ============================================================
// /api/generate-questions — Vercel Node.js Function
//
// Nhận nội dung văn bản (đã được /api/analyze-document đọc ra, hoặc
// người dùng dán tay) + cấu hình (số câu, loại câu, độ khó), gọi
// Google Gemini API để sinh câu hỏi dạng JSON có cấu trúc, validate
// lại ở server trước khi trả về cho client (không tin tuyệt đối vào
// AI — mục 55 spec: câu AI tạo luôn ở trạng thái "draft").
//
// Lấy key tại: https://aistudio.google.com/apikey
//
// Dùng Node.js runtime (không phải Edge) vì có thể mất hơn 25s —
// Edge Function bị giới hạn cứng 25s, Node.js cho phép tới 60s (free).
// ============================================================

export const config = { maxDuration: 60 };

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type QuestionType = "multiple_choice" | "true_false" | "short_answer";
type Difficulty = "easy" | "medium" | "hard" | "mixed";

interface GenerateRequestBody {
  text: string;
  courseName?: string;
  topic?: string;
  counts: Partial<Record<QuestionType, number>>;
  difficulty: Difficulty;
  hasSourceImage?: boolean; // tài liệu gốc là 1 ảnh — có thể gắn lại ảnh đó cho câu cần xem hình
  availableCourses?: { id: string; name: string }[]; // để AI tự chọn đúng môn thay vì người dùng chọn tay
}

interface RawQuestion {
  type: QuestionType;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  options?: { id: string; text: string }[];
  correctAnswer?: string;
  statements?: { id: string; text: string; correctAnswer: boolean }[];
  acceptedAnswers?: string[];
  explanation?: string;
  referencesFigure?: boolean;
}

function extractJsonObject(raw: string): string {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) return raw;
  return raw.slice(start, end + 1);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Tự thử lại khi Gemini báo 503 (quá tải), trước khi báo lỗi cho người dùng. */
async function fetchGeminiWithRetry(url: string, body: unknown, signal: AbortSignal): Promise<Response> {
  const delays = [0, 1200, 2500];
  let lastResponse: Response | null = null;
  for (const delay of delays) {
    if (delay) await sleep(delay);
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal,
      body: JSON.stringify(body),
    });
    if (response.ok || response.status !== 503) return response;
    lastResponse = response;
  }
  return lastResponse!;
}

/** Đọc body JSON thô — không phụ thuộc gói @vercel/node để tránh phải cài thêm. */
function readJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk: Buffer) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const OPTION_IDS = ["A", "B", "C", "D"];
const STATEMENT_IDS = ["a", "b", "c", "d"];

/** Kiểm tra & chuẩn hoá tối thiểu để tránh AI trả sai schema làm hỏng UI. */
function sanitizeQuestion(raw: unknown): RawQuestion | null {
  if (!raw || typeof raw !== "object") return null;
  const q = raw as Record<string, unknown>;
  const type = q.type as QuestionType;
  const difficulty = (["easy", "medium", "hard"].includes(q.difficulty as string)
    ? q.difficulty
    : "medium") as "easy" | "medium" | "hard";
  const referencesFigure = q.referencesFigure === true;

  if (typeof q.question !== "string" || !q.question.trim()) return null;

  if (type === "multiple_choice") {
    const options = Array.isArray(q.options) ? (q.options as { id: string; text: string }[]) : [];
    if (options.length !== 4) return null;
    const normalizedOptions = options.map((opt, i) => ({
      id: OPTION_IDS[i],
      text: String(opt.text ?? opt),
    }));
    const correctAnswer = String(q.correctAnswer ?? "").toUpperCase();
    if (!OPTION_IDS.includes(correctAnswer)) return null;
    return {
      type,
      question: q.question,
      difficulty,
      options: normalizedOptions,
      correctAnswer,
      explanation: typeof q.explanation === "string" ? q.explanation : undefined,
      referencesFigure,
    };
  }

  if (type === "true_false") {
    const statements = Array.isArray(q.statements)
      ? (q.statements as { text: string; correctAnswer: boolean }[])
      : [];
    if (statements.length !== 4) return null;
    const normalized = statements.map((s, i) => ({
      id: STATEMENT_IDS[i],
      text: String(s.text ?? ""),
      correctAnswer: Boolean(s.correctAnswer),
    }));
    if (normalized.some((s) => !s.text.trim())) return null;
    return {
      type,
      question: q.question,
      difficulty,
      statements: normalized,
      explanation: typeof q.explanation === "string" ? q.explanation : undefined,
      referencesFigure,
    };
  }

  if (type === "short_answer") {
    const accepted = Array.isArray(q.acceptedAnswers)
      ? (q.acceptedAnswers as unknown[]).map(String).filter(Boolean)
      : [];
    if (accepted.length === 0) return null;
    return {
      type,
      question: q.question,
      difficulty,
      acceptedAnswers: accepted,
      explanation: typeof q.explanation === "string" ? q.explanation : undefined,
      referencesFigure,
    };
  }

  return null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!GEMINI_API_KEY) {
    res.status(500).json({
      error: "Server chưa cấu hình GEMINI_API_KEY. Thêm biến môi trường này trên Vercel rồi redeploy.",
    });
    return;
  }

  let body: GenerateRequestBody;
  try {
    body = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: "Body không phải JSON hợp lệ." });
    return;
  }

  if (!body.text || !body.text.trim()) {
    res.status(400).json({ error: "Thiếu nội dung tài liệu (text)." });
    return;
  }

  const counts = body.counts || {};
  const totalRequested = Object.values(counts).reduce((sum, n) => sum + (n || 0), 0);
  if (totalRequested <= 0) {
    res.status(400).json({ error: "Cần chọn ít nhất 1 câu hỏi để tạo." });
    return;
  }
  if (totalRequested > 60) {
    res.status(400).json({ error: "Tối đa 60 câu mỗi lần tạo." });
    return;
  }

  const requestLines: string[] = [];
  if (counts.multiple_choice) requestLines.push(`- ${counts.multiple_choice} câu trắc nghiệm 4 đáp án (A/B/C/D, chỉ 1 đáp án đúng)`);
  if (counts.true_false) requestLines.push(`- ${counts.true_false} câu Đúng/Sai, MỖI câu luôn có đúng 4 ý nhỏ a/b/c/d`);
  if (counts.short_answer) requestLines.push(`- ${counts.short_answer} câu trả lời ngắn`);

  const difficultyText =
    body.difficulty === "mixed"
      ? "độ khó hỗn hợp (trộn dễ/trung bình/khó)"
      : `độ khó "${body.difficulty}"`;

  const figureInstruction = body.hasSourceImage
    ? `Tài liệu gốc LÀ MỘT ẢNH CHỤP (có thể chứa hình vẽ/đồ thị/sơ đồ/bảng biểu).
Nếu một câu hỏi bắt buộc phải nhìn hình minh họa mới trả lời được (vd "quan sát hình
bên", đồ thị hàm số, mạch điện, sơ đồ...), đặt "referencesFigure": true cho câu đó —
hệ thống sẽ tự đính kèm lại ảnh gốc cho câu này. Ưu tiên đặt câu hỏi có thể trả lời
CHỈ BẰNG CHỮ khi có thể, chỉ dùng referencesFigure khi thực sự cần thiết.`
    : `Tài liệu gốc KHÔNG có hình ảnh đính kèm (chỉ có chữ). TUYỆT ĐỐI KHÔNG tạo câu hỏi
yêu cầu "quan sát hình/đồ thị/sơ đồ bên" hay bất kỳ hình minh họa nào — vì sẽ không
có ảnh nào hiển thị cho học sinh xem. Nếu cần mô tả một tình huống có tính không gian
(hình học, mạch điện...), hãy diễn đạt đầy đủ bằng lời/số liệu trong chính câu hỏi.`;

  const courseListText = (body.availableCourses ?? [])
    .map((c) => `- id="${c.id}": ${c.name}`)
    .join("\n");
  const courseClassificationBlock = courseListText
    ? `\nDựa vào nội dung tài liệu, hãy TỰ XÁC ĐỊNH câu hỏi này thuộc môn học nào trong danh
sách dưới đây (so khớp theo nội dung kiến thức, không theo tên file):
${courseListText}
- id="other": nếu nội dung không khớp rõ với môn nào ở trên, hoặc trộn nhiều môn

Trả về id môn phù hợp nhất vào field "courseId" ở gốc JSON (bắt buộc, đúng 1 trong các
id ở trên).`
    : "";

  const systemPrompt = `Bạn là giáo viên biên soạn câu hỏi ôn tập tiếng Việt. Chỉ tạo câu hỏi
dựa TRÊN nội dung tài liệu được cung cấp — không bịa kiến thức ngoài tài liệu trừ khi
tài liệu quá ít thông tin thì có thể bổ sung kiến thức phổ thông liên quan trực tiếp
đến chủ đề.
${courseClassificationBlock}

${figureInstruction}

Giữ nguyên ký hiệu toán học/công thức nếu có (dùng LaTeX dạng $...$).

Tạo chính xác:
${requestLines.join("\n")}

Với ${difficultyText}.

Chỉ trả lời bằng một JSON OBJECT hợp lệ duy nhất, KHÔNG kèm giải thích, KHÔNG markdown,
đúng dạng: {"courseId": "...", "questions": [ ... ]}

Mỗi phần tử trong "questions" theo đúng 1 trong 3 dạng (field "referencesFigure" là
boolean, tùy chọn, mặc định false nếu không có):

Trắc nghiệm:
{"type":"multiple_choice","question":"...","difficulty":"easy|medium|hard","options":[{"id":"A","text":"..."},{"id":"B","text":"..."},{"id":"C","text":"..."},{"id":"D","text":"..."}],"correctAnswer":"B","explanation":"...","referencesFigure":false}

Đúng/Sai (LUÔN đúng 4 ý):
{"type":"true_false","question":"...","difficulty":"easy|medium|hard","statements":[{"id":"a","text":"...","correctAnswer":true},{"id":"b","text":"...","correctAnswer":false},{"id":"c","text":"...","correctAnswer":true},{"id":"d","text":"...","correctAnswer":false}],"explanation":"...","referencesFigure":false}

Trả lời ngắn:
{"type":"short_answer","question":"...","difficulty":"easy|medium|hard","acceptedAnswers":["..."],"explanation":"...","referencesFigure":false}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55_000);

    const response = await fetchGeminiWithRetry(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Nội dung tài liệu${body.topic ? ` (chủ đề: ${body.topic})` : ""}:\n\n${body.text}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 16384,
          thinkingConfig: { thinkingLevel: "low" },
        },
      },
      controller.signal
    );
    clearTimeout(timeout);

    if (!response.ok) {
      if (response.status === 503) {
        res.status(503).json({
          error: "Server AI (Gemini) đang quá tải, đã thử lại vài lần nhưng chưa được. Vui lòng thử lại sau ít phút.",
        });
        return;
      }
      const errText = await response.text();
      res.status(502).json({ error: `Gemini API lỗi: ${errText}` });
      return;
    }

    const data = await response.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts
        ?.filter((p: { thought?: boolean }) => !p.thought)
        ?.map((p: { text?: string }) => p.text || "")
        .join("") || "";

    let parsedObj: { courseId?: string; questions?: unknown[] };
    try {
      parsedObj = JSON.parse(extractJsonObject(rawText));
      if (!Array.isArray(parsedObj.questions)) throw new Error("missing questions array");
    } catch {
      res.status(502).json({ error: "AI trả về định dạng không hợp lệ, vui lòng thử lại." });
      return;
    }

    const validCourseIds = new Set((body.availableCourses ?? []).map((c) => c.id).concat("other"));
    const courseId =
      parsedObj.courseId && validCourseIds.has(parsedObj.courseId) ? parsedObj.courseId : "other";

    const questions = parsedObj
      .questions!.map(sanitizeQuestion)
      .filter((q): q is RawQuestion => q !== null);

    if (questions.length === 0) {
      res.status(422).json({
        error: "AI không tạo được câu hỏi hợp lệ từ tài liệu này, thử lại hoặc chọn tài liệu khác.",
      });
      return;
    }

    res.status(200).json({
      questions,
      courseId,
      requested: totalRequested,
      generated: questions.length,
    });
  } catch (err) {
    const isAbort = (err as Error).name === "AbortError";
    res.status(500).json({
      error: `Không gọi được AI: ${isAbort ? "quá thời gian chờ (>55s), thử lại với ít câu hỏi hơn." : (err as Error).message}`,
    });
  }
}
