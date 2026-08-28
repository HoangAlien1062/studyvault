// Kết nối Supabase — dùng để lưu dữ liệu Môn học/Giáo viên/Chương/Bài học
// lên "đám mây" (bảng study_content), thay vì localStorage của từng máy.
// Nhờ vậy chỉnh sửa trên thiết bị này sẽ hiện đúng như vậy trên thiết bị khác.
//
// Cấu hình lấy từ file .env.local:
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
//
// Nếu chưa cấu hình, `supabase` sẽ là null và app tự động dùng dữ liệu
// mặc định trong /src/data/courses.ts (không lưu lên mạng) để tránh crash.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase) {
  // eslint-disable-next-line no-console
  console.warn(
    "[StudyVault] Chưa cấu hình Supabase (thiếu VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY trong .env.local) — " +
      "dữ liệu sẽ chỉ dùng bộ mặc định và không đồng bộ giữa các thiết bị."
  );
}
