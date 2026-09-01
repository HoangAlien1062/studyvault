// ============================================================
// COINS — điểm thưởng, dùng hàm SQL apply_coin_delta (atomic) thay vì
// đọc-số-dư-rồi-ghi-đè ở client (tránh race condition khi 2 request
// cùng lúc — xem supabase/setup.sql).
// Khách (chưa đăng nhập) vẫn làm bài được nhưng không tích coin.
// ============================================================

import { supabase } from "./supabaseClient";

export const EXAM_COMPLETE_REWARD = 5; // mục 4: mức cố định, thay cho +10..+20 theo điểm cũ
export const QUESTION_APPROVED_REWARD = 2;
export const SOLO_STAKE = 5; // mục 5: cược Solo

/** Cộng/trừ coin nguyên tử qua RPC. delta âm = trừ; trả về false nếu không đủ số dư. */
export async function applyCoinDelta(userId: string, delta: number): Promise<{ ok: boolean; balance: number | null }> {
  if (!supabase) return { ok: false, balance: null };
  const { data, error } = await supabase.rpc("apply_coin_delta", { p_user_id: userId, p_delta: delta });
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] apply_coin_delta lỗi:", error.message);
    return { ok: false, balance: null };
  }
  const row = Array.isArray(data) ? data[0] : data;
  return { ok: !!row?.ok, balance: row?.new_balance ?? null };
}

/** Giữ tương thích ngược cho chỗ nào còn gọi awardCoins(amount dương). */
export async function awardCoins(userId: string, amount: number): Promise<number | null> {
  if (amount <= 0) return null;
  const { ok, balance } = await applyCoinDelta(userId, amount);
  return ok ? balance : null;
}

/**
 * Ghi nhận hoàn thành 1 nhiệm vụ và cộng coin — idempotent theo (missionId, refId)
 * nhờ ràng buộc unique ở bảng mission_claims: nếu đã claim rồi (vd thi lại vẫn
 * cùng attempt.id) thì không cộng trùng.
 */
export async function claimMission(userId: string, missionId: string, refId: string, coinReward: number): Promise<boolean> {
  if (!supabase) return false;
  const { data, error } = await supabase.rpc("claim_mission", {
    p_user_id: userId,
    p_mission_id: missionId,
    p_ref_id: refId,
    p_coins: coinReward,
  });
  if (error) return false;
  return Boolean(data);
}

export async function claimExamCompleteReward(userId: string, attemptId: string): Promise<boolean> {
  return claimMission(userId, "exam_complete", attemptId, EXAM_COMPLETE_REWARD);
}

export async function claimQuestionApprovedReward(userId: string, questionId: string): Promise<boolean> {
  return claimMission(userId, "question_approved", questionId, QUESTION_APPROVED_REWARD);
}

/** Trừ SOLO_STAKE khi vào trận Solo. Trả false nếu không đủ coin (không trừ). */
export async function chargeSoloStake(userId: string, duelId: string): Promise<{ ok: boolean; balance: number | null }> {
  if (!supabase) return { ok: false, balance: null };
  const { error: rowErr } = await supabase
    .from("duel_stakes")
    .upsert({ duel_id: duelId, user_id: userId, amount: SOLO_STAKE, charged: false }, { onConflict: "duel_id,user_id" });
  if (rowErr) return { ok: false, balance: null };
  const { ok, balance } = await applyCoinDelta(userId, -SOLO_STAKE);
  if (ok) {
    await supabase.from("duel_stakes").update({ charged: true }).eq("duel_id", duelId).eq("user_id", userId);
  }
  return { ok, balance };
}

/** Thắng: hoàn lại x2 cược (net +SOLO_STAKE). Hòa: hoàn lại đúng số đã cược. */
export async function settleSoloStake(userId: string, duelId: string, outcome: "win" | "lose" | "draw"): Promise<void> {
  if (!supabase) return;
  if (outcome === "lose") return; // đã mất coin lúc vào trận, không hoàn
  const payout = outcome === "win" ? SOLO_STAKE * 2 : SOLO_STAKE;
  const { data } = await supabase
    .from("duel_stakes")
    .select("charged, refunded")
    .eq("duel_id", duelId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!data?.charged || data.refunded) return; // chưa bị trừ, hoặc đã hoàn rồi -> tránh hoàn trùng
  const { ok } = await applyCoinDelta(userId, payout);
  if (ok) {
    await supabase.from("duel_stakes").update({ refunded: true }).eq("duel_id", duelId).eq("user_id", userId);
  }
}

/**
 * Tính thắng/thua/hòa và hoàn coin cho cả 2 bên khi 1 Duel vừa hoàn thành.
 * Hòa (cả điểm lẫn thời gian) -> hoàn lại cho cả 2, không ai lãi/lỗ.
 */
export async function settleDuelStakes(
  challengerId: string | undefined,
  opponentId: string | undefined,
  duelId: string,
  challengerScore: number,
  opponentScore: number,
  challengerTime: number,
  opponentTime: number
): Promise<void> {
  const isDraw = challengerScore === opponentScore && challengerTime === opponentTime;
  const challengerWins = !isDraw && (challengerScore !== opponentScore ? challengerScore > opponentScore : challengerTime <= opponentTime);

  const tasks: Promise<void>[] = [];
  if (challengerId) {
    tasks.push(settleSoloStake(challengerId, duelId, isDraw ? "draw" : challengerWins ? "win" : "lose"));
  }
  if (opponentId) {
    tasks.push(settleSoloStake(opponentId, duelId, isDraw ? "draw" : challengerWins ? "lose" : "win"));
  }
  await Promise.all(tasks);
}

// Giữ lại để tương thích ngược nếu còn nơi khác import; không dùng nữa
// cho thưởng hoàn thành đề (đã đổi sang mức cố định EXAM_COMPLETE_REWARD ở mục 4).
export function calcCoinsForAttempt(_normalizedScore: number): number {
  return EXAM_COMPLETE_REWARD;
}
