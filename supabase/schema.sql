-- Chạy toàn bộ file này trong Supabase → SQL Editor → New query → Run.
-- Tạo 1 bảng duy nhất lưu toàn bộ cây dữ liệu Môn học/Giáo viên/Chương/
-- Bài học dưới dạng JSON (đúng 1 dòng, id = 'main').

create table if not exists public.study_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Bật Row Level Security rồi mở quyền đọc/ghi công khai bằng anon key.
-- LƯU Ý: vì app chưa có đăng nhập, ai có URL + anon key của bạn cũng có
-- thể sửa được dữ liệu. Phù hợp cho công cụ quản lý cá nhân; nếu sau này
-- cần khóa lại, thêm Supabase Auth rồi đổi các policy bên dưới cho khớp.
alter table public.study_content enable row level security;

drop policy if exists "Public read access" on public.study_content;
create policy "Public read access"
  on public.study_content for select
  using (true);

drop policy if exists "Public insert access" on public.study_content;
create policy "Public insert access"
  on public.study_content for insert
  with check (true);

drop policy if exists "Public update access" on public.study_content;
create policy "Public update access"
  on public.study_content for update
  using (true);

-- Bật realtime cho bảng này để 2 thiết bị mở cùng lúc tự đồng bộ.
alter publication supabase_realtime add table public.study_content;
