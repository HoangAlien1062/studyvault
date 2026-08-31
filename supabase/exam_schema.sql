-- MODULE KIỂM TRA — chạy file này trong Supabase → SQL Editor → New query → Run.
-- Không đụng đến bảng study_content hiện tại. Đi theo đúng pattern:
-- 1 bảng duy nhất lưu toàn bộ ngân hàng câu hỏi / đề / kết quả dưới
-- dạng JSON (đúng 1 dòng, id = 'main').

create table if not exists public.exam_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Cùng mô hình bảo mật với study_content: app chưa có đăng nhập, nên
-- mở quyền đọc/ghi công khai bằng anon key. Phù hợp cho công cụ quản
-- lý cá nhân / nhóm nhỏ dùng chung link. Khi Phase 2 thêm AI + xác
-- thực người dùng thật, nên khóa lại các policy này theo user_id.
alter table public.exam_content enable row level security;

drop policy if exists "Public read access" on public.exam_content;
create policy "Public read access"
  on public.exam_content for select
  using (true);

drop policy if exists "Public insert access" on public.exam_content;
create policy "Public insert access"
  on public.exam_content for insert
  with check (true);

drop policy if exists "Public update access" on public.exam_content;
create policy "Public update access"
  on public.exam_content for update
  using (true);

-- Bật realtime để nhiều thiết bị/người chơi cùng thấy ngân hàng câu
-- hỏi, đề kiểm tra và bảng xếp hạng cập nhật ngay lập tức.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'exam_content'
  ) then
    alter publication supabase_realtime add table public.exam_content;
  end if;
end $$;

-- ============================================================
-- GIAI ĐOẠN 2 — Storage bucket cho tài liệu upload/chụp ảnh
-- (documents metadata vẫn nằm trong exam_content.data.documents,
-- chỉ file nhị phân mới cần Storage — không tạo bảng "documents" riêng).
-- ============================================================

insert into storage.buckets (id, name, public)
values ('exam-documents', 'exam-documents', true)
on conflict (id) do nothing;

drop policy if exists "Public read exam documents" on storage.objects;
create policy "Public read exam documents"
  on storage.objects for select
  using (bucket_id = 'exam-documents');

drop policy if exists "Public upload exam documents" on storage.objects;
create policy "Public upload exam documents"
  on storage.objects for insert
  with check (bucket_id = 'exam-documents');

drop policy if exists "Public delete exam documents" on storage.objects;
create policy "Public delete exam documents"
  on storage.objects for delete
  using (bucket_id = 'exam-documents');

-- ============================================================
-- BƯỚC 1 CỦA KẾ HOẠCH LỚN — Supabase Auth thật + bảng profiles
-- (chưa migrate ngân hàng câu hỏi/đề sang owner_id — đó là bước 2
-- riêng, chưa làm ở đây để tránh phá dữ liệu hiện có).
-- ============================================================

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Tự tạo 1 dòng profiles ngay khi có user mới đăng ký qua Supabase Auth.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ⚠️ SAU KHI bạn đăng ký tài khoản đầu tiên qua trang /login, chạy dòng
-- dưới đây (đổi email cho đúng) để cấp quyền admin cho tài khoản đó:
--
--   update public.profiles set is_admin = true
--   where user_id = (select id from auth.users where email = 'ban@vidu.com');
