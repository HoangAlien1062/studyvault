// ============================================================
// Enqueue job vào bảng ai_jobs từ client (vd khi user bấm "phản bác").
// Việc XỬ LÝ job (gọi AI) diễn ra ở worker phía server — xem
// api/_aiReviewWorker.ts và api/review-questions.ts (mục 6).
// ============================================================

import { supabase } from "./supabaseClient";
import type { Question } from "../types/exam";

export async function enqueueDisputeReview(question: Question, disputeNote: string): Promise<void> {
  if (!supabase) return;
  await supabase.from("ai_jobs").insert({
    job_type: "review_dispute",
    payload: { question, disputeNote },
  });
}
