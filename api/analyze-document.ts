// ============================================================
// /api/analyze-document — Vercel Edge Function
//
// Nhận ảnh (base64) hoặc text của một tài liệu, gọi Google Gemini API
// (có vision) để đọc nội dung và gợi ý môn học/chủ đề.
// API key (GEMINI_API_KEY) chỉ tồn tại phía server — KHÔNG bao giờ
// gửi về client, KHÔNG dùng tiền tố VITE_ (tiền tố đó sẽ bị Vite bundle
// vào code client và lộ key).
//
// Lấy key tại: https://aistudio.google.com/apikey (miễn phí, có hạn mức).
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
const MODEL = "gemini-2.5-flash";
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

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function extractJsonBlock(raw: string): string {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) return raw;
  return raw.slice(start, end + 1);
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (!GEMINI_API_KEY) {
    return jsonResponse(
      {
        error:
          "Server chưa cấu hình GEMINI_API_KEY. Thêm biến môi trường này trên Vercel (Project Settings → Environment Variables) rồi redeploy.",
      },
      500
    );
  }

  let payload: { imageBase64?: string; mimeType?: string; text?: string };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Body không phải JSON hợp lệ." }, 400);
  }

  if (!payload.imageBase64 && !payload.text) {
    return jsonResponse({ error: "Thiếu imageBase64 hoặc text." }, 400);
  }

  // Gemini dùng "parts" trong 1 content, ảnh là inline_data base64.
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
        },
      }),
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      return jsonResponse({ error: `Gemini API lỗi: ${errText}` }, 502);
    }

    const data = await response.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("") || "";

    let parsed: { extractedText?: string; suggestedTopic?: string; warning?: string };
    try {
      parsed = JSON.parse(extractJsonBlock(rawText));
    } catch {
      return jsonResponse(
        { error: "AI trả về định dạng không hợp lệ, vui lòng thử lại." },
        502
      );
    }

    if (!parsed.extractedText || !parsed.extractedText.trim()) {
      return jsonResponse(
        {
          error:
            "Không thể đọc rõ một phần tài liệu. Vui lòng chụp lại ảnh rõ hơn.",
        },
        422
      );
    }

    return jsonResponse({
      extractedText: parsed.extractedText,
      suggestedTopic: parsed.suggestedTopic || "",
      warning: parsed.warning || "",
    });
  } catch (err) {
    return jsonResponse({ error: `Không gọi được AI: ${(err as Error).name === "AbortError" ? "quá thời gian chờ (>55s), thử lại với ảnh nhỏ/nhẹ hơn." : (err as Error).message}` }, 500);
  }
}
