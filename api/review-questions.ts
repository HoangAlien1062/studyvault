// ============================================================
// /api/review-questions — Vercel Node.js Function
//
// Rà soát MỘT LOẠT câu hỏi đang ở trạng thái "unreviewed" (chưa được
// AI kiểm tra) — chạy khi admin bấm nút "🔍 Rà soát bằng AI" trên
// QuestionsPage, HOẶC do Vercel Cron gọi định kỳ lúc rảnh (xem
// vercel.json). Không chặn người dùng lúc họ thêm câu hỏi — kiểm tra
// diễn ra sau, trong nền.
//
// Đọc/ghi trực tiếp bảng "exam_content" (1 dòng JSON) bằng chính
// Supabase URL + anon key đã dùng ở client (RLS bảng này cho phép
// đọc/ghi công khai — using(true) — nên không cần service role key).
// ============================================================

import { createClient } from "@supabase/supabase-js";

export const config = { maxDuration: 60 };

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const TABLE = "exam_content";
const ROW_ID = "main";
const BATCH_SIZE = 8; // giới hạn mỗi lần chạy để không vượt maxDuration/chi phí

function extractJsonBlock(raw: string): string {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) return raw;
  return raw.slice(start, end + 1);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGeminiWithRetry(body: unknown): Promise<Response> {
  const delays = [0, 1200, 2500];
  let lastResponse: Response | null = null;
  for (const delay of delays) {
    if (delay) await sleep(delay);
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok || response.status !== 503) return response;
    lastResponse = response;
  }
  return lastResponse!;
}

async function validateOneQuestion(q: any): Promise<{ valid: boolean; reason: string } | null> {
  let questionBlock = `Câu hỏi: ${q.question}\n`;
  if (q.type === "multiple_choice" && q.options) {
    questionBlock += q.options.map((o: any) => `${o.id}. ${o.text}`).join("\n");
    questionBlock += `\nĐáp án được đánh dấu đúng: ${q.correctAnswer}`;
  } else if (q.type === "true_false" && q.statements) {
    questionBlock += q.statements
      .map((s: any) => `${s.id}) ${s.text} — được đánh dấu: ${s.correctAnswer ? "Đúng" : "Sai"}`)
      .join("\n");
  } else if (q.type === "short_answer" && q.acceptedAnswers) {
    questionBlock += `Đáp án chấp nhận: ${q.acceptedAnswers.join(" / ")}`;
  }

  const systemPrompt = `Bạn là giáo viên thẩm định câu hỏi ôn tập tiếng Việt${
    q.topic ? `, chủ đề "${q.topic}"` : ""
  }.

Kiểm tra câu hỏi có 3 tiêu chí: (1) đề bài rõ ràng không mơ hồ, (2) đáp án đánh dấu
đúng THỰC SỰ đúng, (3) với trắc nghiệm các đáp án sai phải thực sự sai.
Nếu sai ở bất kỳ tiêu chí nào → "valid": false, giải thích ngắn gọn tại sao (nêu rõ
đáp án đúng thực sự nếu có). Nếu ổn → "valid": true, "reason" để chuỗi rỗng.

Chỉ trả lời JSON, không kèm giải thích ngoài field "reason", không markdown:
{"valid": true|false, "reason": "..."}`;

  try {
    const response = await fetchGeminiWithRetry({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: questionBlock }] }],
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 1024,
        thinkingConfig: { thinkingLevel: "low" },
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts
        ?.filter((p: { thought?: boolean }) => !p.thought)
        ?.map((p: { text?: string }) => p.text || "")
        .join("") || "";
    const parsed = JSON.parse(extractJsonBlock(rawText));
    return { valid: Boolean(parsed.valid), reason: parsed.reason || "" };
  } catch {
    return null;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: "Server chưa cấu hình GEMINI_API_KEY." });
    return;
  }
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    res.status(500).json({ error: "Server chưa cấu hình Supabase." });
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data: row, error: fetchError } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", ROW_ID)
    .maybeSingle();

  if (fetchError || !row?.data) {
    res.status(500).json({ error: `Không đọc được dữ liệu: ${fetchError?.message || "không có dữ liệu"}` });
    return;
  }

  const content = row.data as { questions?: any[] };
  const questions = content.questions || [];

  const pending = questions
    .filter((q) => !q.aiReviewStatus || q.aiReviewStatus === "unreviewed")
    .slice(0, BATCH_SIZE);

  if (pending.length === 0) {
    res.status(200).json({ reviewed: 0, flagged: 0, passed: 0, remaining: 0, message: "Không có câu nào cần rà soát." });
    return;
  }

  let flaggedCount = 0;
  let passedCount = 0;

  for (const q of pending) {
    const result = await validateOneQuestion(q);
    if (result === null) continue; // lỗi mạng/AI — để lại "unreviewed", thử lần sau
    if (result.valid) {
      q.aiReviewStatus = "passed";
      q.aiReviewNote = undefined;
      passedCount++;
    } else {
      q.aiReviewStatus = "flagged";
      q.aiReviewNote = result.reason || "AI cho rằng câu này có vấn đề.";
      flaggedCount++;
    }
  }

  const { error: updateError } = await supabase
    .from(TABLE)
    .update({ data: content, updated_at: new Date().toISOString() })
    .eq("id", ROW_ID);

  if (updateError) {
    res.status(500).json({ error: `Không lưu được kết quả rà soát: ${updateError.message}` });
    return;
  }

  const remaining = questions.filter((q) => !q.aiReviewStatus || q.aiReviewStatus === "unreviewed").length;

  res.status(200).json({
    reviewed: pending.length,
    flagged: flaggedCount,
    passed: passedCount,
    remaining,
  });
}
