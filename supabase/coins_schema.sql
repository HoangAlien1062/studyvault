-- Chạy trong Supabase → SQL Editor.
-- Thêm cột coins (điểm thưởng) vào profiles — mỗi lần user đăng nhập
-- hoàn thành 1 bài kiểm tra sẽ được cộng coin, hiện ở góc phải Header.

alter table public.profiles
  add column if not exists coins integer not null default 0;
