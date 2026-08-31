// ============================================================
// /api/validate-question — Vercel Node.js Function
//
// Khi người dùng THÊM 1 CÂU HỎI THỦ CÔNG (không qua AI tạo), gọi
// endpoint này để AI kiểm tra: đề bài + đáp án có đúng/hợp lý không.
// Nếu đúng → cho phép lưu vào ngân hàng (status "published" luôn).
// Nếu sai/không chắc → trả về lý do, chặn lưu, người dùng phải sửa lại.
//
// Đây là một lớp kiểm tra hỗ trợ, KHÔNG thay thế hoàn toàn việc người
// dùng tự kiểm tra — AI cũng có thể sai, nhất là với câu hỏi mơ hồ.
// ============================================================

export const config = { maxDuration: 30 };

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

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

function extractJsonBlock(raw: string): string {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) return raw;
  return raw.slice(start, end + 1);
}

interface ValidateBody {
  question: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  options?: { id: string; text: string }[];
  correctAnswer?: string;
  statements?: { id: string; text: string; correctAnswer: boolean }[];
  acceptedAnswers?: string[];
  courseName?: string;
  topic?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: "Server chưa cấu hình GEMINI_API_KEY." });
    return;
  }

  let body: ValidateBody;
  try {
    body = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: "Body không phải JSON hợp lệ." });
    return;
  }

  if (!body.question || !body.question.trim()) {
    res.status(400).json({ error: "Thiếu nội dung câu hỏi." });
    return;
  }

  let questionBlock = `Câu hỏi: ${body.question}\n`;
  if (body.type === "multiple_choice" && body.options) {
    questionBlock += body.options.map((o) => `${o.id}. ${o.text}`).join("\n");
    questionBlock += `\nĐáp án được đánh dấu đúng: ${body.correctAnswer}`;
  } else if (body.type === "true_false" && body.statements) {
    questionBlock += body.statements
      .map((s) => `${s.id}) ${s.text} — được đánh dấu: ${s.correctAnswer ? "Đúng" : "Sai"}`)
      .join("\n");
  } else if (body.type === "short_answer" && body.acceptedAnswers) {
    questionBlock += `Đáp án chấp nhận: ${body.acceptedAnswers.join(" / ")}`;
  }

  const systemPrompt = `Bạn là giáo viên thẩm định câu hỏi ôn tập tiếng Việt${
    body.courseName ? ` môn ${body.courseName}` : ""
  }${body.topic ? `, chủ đề "${body.topic}"` : ""}.

Nhiệm vụ: kiểm tra câu hỏi dưới đây có 3 tiêu chí:
1. Đề bài rõ ràng, không mơ hồ, không thiếu dữ kiện.
2. Đáp án được đánh dấu đúng THỰC SỰ đúng về mặt kiến thức.
3. Với trắc nghiệm: các đáp án sai phải thực sự sai (không có 2 đáp án cùng đúng).

Nếu có sai sót ở BẤT KỲ tiêu chí nào, coi là "valid": false và giải thích ngắn gọn
tại sao (nêu rõ đáp án đúng thực sự là gì nếu đáp án đánh dấu bị sai).
Nếu câu hỏi ổn, "valid": true.

Chỉ trả lời bằng JSON, không kèm giải thích ngoài field "reason", không markdown:
{"valid": true|false, "reason": "..."}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: questionBlock }] }],
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 2048,
          thinkingConfig: { thinkingLevel: "low" },
        },
      }),
    });
    clearTimeout(timeout);

    if (!response.ok) {
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

    let parsed: { valid?: boolean; reason?: string };
    try {
      parsed = JSON.parse(extractJsonBlock(rawText));
    } catch {
      res.status(502).json({ error: "AI trả về định dạng không hợp lệ, thử lại." });
      return;
    }

    res.status(200).json({
      valid: Boolean(parsed.valid),
      reason: parsed.reason || (parsed.valid ? "" : "AI cho rằng câu hỏi này có vấn đề."),
    });
  } catch (err) {
    const isAbort = (err as Error).name === "AbortError";
    res.status(500).json({
      error: `Không gọi được AI: ${isAbort ? "quá thời gian chờ, thử lại." : (err as Error).message}`,
    });
  }
}
