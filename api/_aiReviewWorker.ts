// ============================================================
// Logic worker dùng chung cho việc rà soát câu hỏi bằng AI.
// Được gọi bởi nhiều "worker" chạy song song (xem chạy 3 vòng lặp
// đồng thời trong api/review-questions.ts) — mỗi worker liên tục
// claim_next_ai_job() (khóa bằng for update skip locked ở DB, xem
// supabase/setup.sql) nên không giành nhau xử lý 1 job.
// ============================================================

import type { SupabaseClient } from "@supabase/supabase-js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

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

/** Kiểm tra 1 câu hỏi. disputeNote != null nghĩa là đang review lần 2 vì bị phản bác. */
async function validateOneQuestion(
  q: any,
  disputeNote?: string
): Promise<{ valid: boolean; reason: string } | null> {
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
  if (q.aiReviewNote) questionBlock += `\n\nLần rà soát trước, AI từng nghi vấn: "${q.aiReviewNote}"`;
  if (disputeNote) questionBlock += `\n\nNgười tạo câu hỏi phản bác: "${disputeNote}". Hãy xem lại thật kỹ trước khi kết luận.`;

  const systemPrompt = `Bạn là giáo viên thẩm định câu hỏi ôn tập tiếng Việt${
    q.topic ? `, chủ đề "${q.topic}"` : ""
  }.

Kiểm tra câu hỏi có 3 tiêu chí: (1) đề bài rõ ràng không mơ hồ, (2) đáp án đánh dấu
đúng THỰC SỰ đúng, (3) với trắc nghiệm các đáp án sai phải thực sự sai. Cũng kiểm
tra chính tả nghiêm trọng làm sai nghĩa.
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

export interface WorkerRunResult {
  processed: number;
  flagged: number;
  passed: number;
}

/**
 * 1 "worker": liên tục claim_next_ai_job() và xử lý cho tới khi hàng đợi
 * trống hoặc hết maxJobs. Gọi hàm này 3 lần song song (Promise.all) để mô
 * phỏng 3 worker độc lập cùng rút job — an toàn nhờ khóa "for update skip
 * locked" ở tầng DB (claim_next_ai_job trong setup.sql).
 */
async function runOneWorker(supabase: SupabaseClient, maxJobs: number): Promise<WorkerRunResult> {
  const result: WorkerRunResult = { processed: 0, flagged: 0, passed: 0 };

  for (let i = 0; i < maxJobs; i++) {
    const { data: job, error: claimErr } = await supabase.rpc("claim_next_ai_job", { p_stale_minutes: 10 });
    if (claimErr || !job) break;

    try {
      if (job.job_type === "review_question" || job.job_type === "review_dispute") {
        const q = job.payload?.question;
        if (!q) throw new Error("Job thiếu payload.question");
        const disputeNote = job.job_type === "review_dispute" ? job.payload?.disputeNote : undefined;
        const verdict = await validateOneQuestion(q, disputeNote);
        if (verdict === null) {
          await supabase.rpc("fail_ai_job", { p_job_id: job.id, p_error: "Gọi AI thất bại (timeout/lỗi mạng)." });
          continue;
        }
        await supabase.rpc("apply_question_ai_review", {
          p_question_id: q.id,
          p_status: verdict.valid ? "passed" : "flagged",
          p_note: verdict.valid ? "" : verdict.reason || "AI cho rằng câu này có vấn đề.",
          p_clear_dispute: job.job_type === "review_dispute",
        });
        await supabase.rpc("complete_ai_job", { p_job_id: job.id });
        result.processed++;
        if (verdict.valid) {
          result.passed++;
          // Mục 4: +2 coin cho câu hỏi do user thường tạo, được AI duyệt (không flagged).
          // Idempotent theo (mission_id, ref_id) — không cộng trùng nếu job chạy lại.
          if (q.ownerId && q.source === "user") {
            await supabase.rpc("claim_mission", {
              p_user_id: q.ownerId,
              p_mission_id: "question_approved",
              p_ref_id: q.id,
              p_coins: 2,
            });
          }
        } else result.flagged++;
      } else {
        // generate_questions / analyze_document: chưa xử lý qua hàng đợi trong
        // bản này (vẫn dùng endpoint đồng bộ riêng) — đánh dấu lỗi rõ ràng
        // thay vì treo job vô thời hạn.
        await supabase.rpc("fail_ai_job", {
          p_job_id: job.id,
          p_error: `job_type "${job.job_type}" chưa được worker này hỗ trợ.`,
        });
      }
    } catch (err) {
      await supabase.rpc("fail_ai_job", { p_job_id: job.id, p_error: (err as Error).message });
    }
  }

  return result;
}

/** Chạy `workerCount` worker song song, mỗi worker tối đa `maxJobsPerWorker` job. */
export async function runWorkerPool(
  supabase: SupabaseClient,
  workerCount: number,
  maxJobsPerWorker: number
): Promise<WorkerRunResult> {
  const runs = await Promise.all(
    Array.from({ length: workerCount }, () => runOneWorker(supabase, maxJobsPerWorker))
  );
  return runs.reduce(
    (acc, r) => ({
      processed: acc.processed + r.processed,
      flagged: acc.flagged + r.flagged,
      passed: acc.passed + r.passed,
    }),
    { processed: 0, flagged: 0, passed: 0 }
  );
}
