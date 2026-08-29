// ============================================================
// /api/analyze-document — Vercel Node.js Function
//
// Nhận ảnh (base64) hoặc text của một tài liệu, gọi Google Gemini API
// (có vision) để đọc nội dung và gợi ý môn học/chủ đề.
// API key (GEMINI_API_KEY) chỉ tồn tại phía server — KHÔNG bao giờ
// gửi về client, KHÔNG dùng tiền tố VITE_ (tiền tố đó sẽ bị Vite bundle
// vào code client và lộ key).
//
// Lấy key tại: https://aistudio.google.com/apikey (miễn phí, có hạn mức).
//
// Dùng Node.js runtime (không phải Edge) vì Gemini xử lý ảnh có thể mất
// hơn 25s — Edge Function bị giới hạn cứng 25s, Node.js cho phép tới 60s
// (gói miễn phí) qua config.maxDuration bên dưới.
//
// Request JSON:
//   { imageBase64: string, mimeType: string }   // ảnh chụp/ upload
//   hoặc { text: string }                        // đã có sẵn text
//
// Response JSON:
//   { extractedText: string, suggestedTopic: string, warning?: string }
// ============================================================

export const config = { maxDuration: 60 };

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `Bạn là trợ lý đọc tài liệu học tập tiếng Việt (Toán, Lý, Hóa, Văn, Anh...).
Nhiệm vụ: đọc nội dung ảnh/tài liệu được cung cấp và trích xuất lại chính xác
toàn bộ văn bản, GIỮ NGUYÊN công thức toán/lý/hóa, ký hiệu, số liệu, bảng biểu
càng sát bản gốc càng tốt (dùng LaTeX đơn giản dạng $...$ cho công thức nếu cần).
Nếu tài liệu là một đề thi/bài tập có sẵn câu hỏi, giữ nguyên cấu trúc câu hỏi.
Nếu một phần ảnh không đọc rõ, ghi chú "[không đọc rõ]" tại đúng vị trí đó,
không tự bịa nội dung.

Chỉ trả lời bằng JSON hợp lệ, không kèm giải thích, không markdown, đúng dạng:
{"extractedText": "...", "suggestedTopic": "...", "warning": "..."}

"suggestedTopic" là chủ đề/chương ngắn gọn (vd "Hàm số", "Dao động cơ").
"warning" chỉ có khi phần lớn tài liệu không đọc được rõ, nếu không thì để chuỗi rỗng.`;

function extractJsonBlock(raw: string): string {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) return raw;
  return raw.slice(start, end + 1);
}

/** Đọc body JSON thô — không phụ thuộc gói @vercel/node để tránh phải cài thêm. */
function readJsonBody(req: any): Promise<any> {
  // Vercel Node.js runtime thường đã tự parse sẵn vào req.body khi
  // content-type là application/json; nếu chưa có thì tự đọc stream.
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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!GEMINI_API_KEY) {
    res.status(500).json({
      error:
        "Server chưa cấu hình GEMINI_API_KEY. Thêm biến môi trường này trên Vercel (Project Settings → Environment Variables) rồi redeploy.",
    });
    return;
  }

  let payload: { imageBase64?: string; mimeType?: string; text?: string };
  try {
    payload = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: "Body không phải JSON hợp lệ." });
    return;
  }

  if (!payload.imageBase64 && !payload.text) {
    res.status(400).json({ error: "Thiếu imageBase64 hoặc text." });
    return;
  }

  const parts: Array<Record<string, unknown>> = [];

  if (payload.imageBase64) {
    const base64Data = payload.imageBase64.includes(",")
      ? payload.imageBase64.split(",")[1]
      : payload.imageBase64;
    parts.push({
      inline_data: {
        mime_type: payload.mimeType || "image/jpeg",
        data: base64Data,
      },
    });
    parts.push({ text: "Đọc và trích xuất nội dung tài liệu này." });
  } else {
    parts.push({ text: `Đọc và trích xuất nội dung tài liệu sau:\n\n${payload.text}` });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55_000);

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts }],
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
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

    let parsed: { extractedText?: string; suggestedTopic?: string; warning?: string };
    try {
      parsed = JSON.parse(extractJsonBlock(rawText));
    } catch {
      res.status(502).json({ error: "AI trả về định dạng không hợp lệ, vui lòng thử lại." });
      return;
    }

    if (!parsed.extractedText || !parsed.extractedText.trim()) {
      res.status(422).json({
        error: "Không thể đọc rõ một phần tài liệu. Vui lòng chụp lại ảnh rõ hơn.",
      });
      return;
    }

    res.status(200).json({
      extractedText: parsed.extractedText,
      suggestedTopic: parsed.suggestedTopic || "",
      warning: parsed.warning || "",
    });
  } catch (err) {
    const isAbort = (err as Error).name === "AbortError";
    res.status(500).json({
      error: `Không gọi được AI: ${isAbort ? "quá thời gian chờ (>55s), thử lại với ảnh nhỏ/nhẹ hơn." : (err as Error).message}`,
    });
  }
}
