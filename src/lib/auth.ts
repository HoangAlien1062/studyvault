// ============================================================
// AUTH — Supabase Auth thật (email + mật khẩu).
//
// Thay cho lớp "mật khẩu admin dùng chung" cũ (adminAuth.ts).
// Mỗi người giờ có tài khoản riêng; quyền admin được đánh dấu bằng
// cột is_admin trong bảng "profiles" (xem supabase/exam_schema.sql).
//
// Nếu chưa cấu hình Supabase (.env.local thiếu), auth sẽ không hoạt
// động — các hàm dưới đây trả lỗi rõ ràng thay vì crash.
// ============================================================

import { supabase } from "./supabaseClient";

export interface Profile {
  user_id: string;
  display_name: string | null;
  is_admin: boolean;
  coins: number;
  created_at: string;
}

const NO_SUPABASE_ERROR = "Chưa cấu hình Supabase (.env.local) nên không thể đăng nhập.";

export async function signUp(email: string, password: string, displayName: string) {
  if (!supabase) throw new Error(NO_SUPABASE_ERROR);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error(NO_SUPABASE_ERROR);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[StudyVault] Không tải được profile:", error);
    return null;
  }
  return data as Profile | null;
}

export async function updateDisplayName(userId: string, displayName: string) {
  if (!supabase) throw new Error(NO_SUPABASE_ERROR);
  const { error } = await supabase.from("profiles").update({ display_name: displayName }).eq("user_id", userId);
  if (error) throw error;
}
