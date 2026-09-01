// ============================================================
// /api/review-questions — Vercel Node.js Function
//
// Gọi khi: (a) user bấm nút "🔍 Rà soát bằng AI" trên QuestionsPage
// (giờ mở cho MỌI người dùng, ưu tiên câu do chính họ tạo — không chỉ
// admin, xem mục 2), hoặc (b) Vercel Cron gọi định kỳ lúc hệ thống rảnh
// (xem vercel.json), hoặc (c) có người bấm "phản bác" (dispute) một câu
// đã bị flagged.
//
// KHÔNG gọi AI trực tiếp ở đây nữa (mục 6): chỉ ghi job vào bảng
// ai_jobs (pending), sau đó chạy 3 "worker" xử lý SONG SONG — mỗi
// worker liên tục claim_next_ai_job() (khóa for update skip locked ở
// DB, xem supabase/setup.sql) nên không giành nhau 1 job và
// job treo quá lâu tự động được trả lại hàng đợi cho worker khác.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import { runWorkerPool } from "./_aiReviewWorker";

export const config = { maxDuration: 60 };

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const TABLE = "exam_content";
const ROW_ID = "main";
const ENQUEUE_BATCH_SIZE = 24; // giới hạn mỗi lần quét để không vượt maxDuration
const WORKER_COUNT = 3;
const MAX_JOBS_PER_WORKER = 8;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.GEMINI_API_KEY) {
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

  // Ưu tiên câu do người dùng thường tạo (source "user") — câu AI tự
  // sinh (đã qua bước tạo có kiểm soát hơn) thì rà soát sau.
  const unreviewed = questions
    .filter((q) => !q.aiReviewStatus || q.aiReviewStatus === "unreviewed")
    .sort((a, b) => (a.source === "user" ? -1 : 0) - (b.source === "user" ? -1 : 0));

  const disputed = questions.filter((q) => q.aiReviewDisputed && q.aiReviewStatus === "flagged");

  // Không enqueue trùng: bỏ qua câu đã có job pending/running.
  const { data: activeJobs } = await supabase
    .from("ai_jobs")
    .select("payload")
    .in("status", ["pending", "running"])
    .in("job_type", ["review_question", "review_dispute"]);
  const activeIds = new Set((activeJobs || []).map((j: any) => j.payload?.question?.id).filter(Boolean));

  const toEnqueue = [
    ...disputed
      .filter((q) => !activeIds.has(q.id))
      .map((q) => ({ job_type: "review_dispute", payload: { question: q, disputeNote: q.aiReviewDisputeNote || "" } })),
    ...unreviewed
      .filter((q) => !activeIds.has(q.id))
      .slice(0, ENQUEUE_BATCH_SIZE)
      .map((q) => ({ job_type: "review_question", payload: { question: q } })),
  ];

  if (toEnqueue.length > 0) {
    const { error: insertErr } = await supabase.from("ai_jobs").insert(toEnqueue);
    if (insertErr) {
      res.status(500).json({ error: `Không tạo được job rà soát: ${insertErr.message}` });
      return;
    }
  }

  const stillPendingBefore = unreviewed.length + disputed.length;
  if (stillPendingBefore === 0 && toEnqueue.length === 0) {
    res.status(200).json({ reviewed: 0, flagged: 0, passed: 0, remaining: 0, message: "Không có câu nào cần rà soát." });
    return;
  }

  // 3 worker chạy song song, mỗi worker rút job cho tới khi hàng đợi trống.
  const result = await runWorkerPool(supabase, WORKER_COUNT, MAX_JOBS_PER_WORKER);

  const { count: remaining } = await supabase
    .from("ai_jobs")
    .select("id", { count: "exact", head: true })
    .in("status", ["pending", "running"])
    .in("job_type", ["review_question", "review_dispute"]);

  res.status(200).json({
    reviewed: result.processed,
    flagged: result.flagged,
    passed: result.passed,
    remaining: remaining ?? 0,
  });
}
