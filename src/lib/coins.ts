// ============================================================
// COINS — điểm thưởng khi hoàn thành bài kiểm tra, hiển thị ở Header.
// Lưu trong cột "coins" của bảng profiles (chỉ user đã đăng nhập).
// Khách (chưa đăng nhập) vẫn làm bài được nhưng không tích coin.
// ============================================================

import { supabase } from "./supabaseClient";

// +10 coin cho việc hoàn thành, cộng thêm tối đa +10 theo điểm số
// (điểm 10/10 -> +10, điểm 0 -> +0), làm tròn xuống.
export function calcCoinsForAttempt(normalizedScore: number): number {
  const base = 10;
  const bonus = Math.floor(Math.max(0, Math.min(10, normalizedScore)));
  return base + bonus;
}

export async function awardCoins(userId: string, amount: number): Promise<number | null> {
  if (!supabase || amount <= 0) return null;
  const { data: current, error: readErr } = await supabase
    .from("profiles")
    .select("coins")
    .eq("user_id", userId)
    .maybeSingle();
  if (readErr) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] Không đọc được số coin hiện tại:", readErr.message);
    return null;
  }
  const nextCoins = (current?.coins ?? 0) + amount;
  const { error: writeErr } = await supabase
    .from("profiles")
    .update({ coins: nextCoins })
    .eq("user_id", userId);
  if (writeErr) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] Không cộng được coin:", writeErr.message);
    return null;
  }
  return nextCoins;
}
