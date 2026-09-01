-- ============================================================
-- STUDYVAULT — SETUP SUPABASE (1 FILE DUY NHẤT)
--
-- Copy toàn bộ file này → Supabase → SQL Editor → New query → Run.
-- An toàn chạy lại nhiều lần (mọi lệnh đều dùng "if not exists" /
-- "drop ... if exists" trước khi tạo), nên nếu đã chạy các bản cũ
-- (schema.sql, exam_schema.sql, coins_schema.sql) thì chạy đè file
-- này lên cũng không sao — không mất dữ liệu đã có.
-- ============================================================


-- ------------------------------------------------------------
-- 1) MÔN HỌC / GIÁO VIÊN / CHƯƠNG / BÀI HỌC
--    1 bảng duy nhất lưu toàn bộ cây dữ liệu dưới dạng JSON
--    (đúng 1 dòng, id = 'main').
-- ------------------------------------------------------------

create table if not exists public.study_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

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

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'study_content'
  ) then
    alter publication supabase_realtime add table public.study_content;
  end if;
end $$;


-- ------------------------------------------------------------
-- 2) NGÂN HÀNG CÂU HỎI / ĐỀ KIỂM TRA / KẾT QUẢ / THÁCH ĐẤU
--    Cũng 1 bảng JSON duy nhất, cùng pattern với study_content.
-- ------------------------------------------------------------

create table if not exists public.exam_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

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

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'exam_content'
  ) then
    alter publication supabase_realtime add table public.exam_content;
  end if;
end $$;


-- ------------------------------------------------------------
-- 3) STORAGE — bucket chứa tài liệu upload/chụp ảnh cho AI đọc đề
-- ------------------------------------------------------------

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


-- ------------------------------------------------------------
-- 4) TÀI KHOẢN — Supabase Auth thật + bảng profiles (tên hiển thị,
--    quyền admin, coin tích lũy).
-- ------------------------------------------------------------

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  is_admin boolean not null default false,
  coins integer not null default 0,
  created_at timestamptz not null default now()
);

-- Nếu bảng profiles đã tồn tại từ trước (chạy exam_schema.sql cũ) mà
-- chưa có cột coins, thêm vào — không ảnh hưởng dữ liệu đã có.
alter table public.profiles add column if not exists coins integer not null default 0;

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Admin được sửa profile (cấp/thu quyền, ví dụ) của bất kỳ ai khác.
drop policy if exists "Admins can update any profile" on public.profiles;
create policy "Admins can update any profile"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles admin_check
      where admin_check.user_id = auth.uid() and admin_check.is_admin = true
    )
  );

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


-- ============================================================
-- ⚠️ BƯỚC CUỐI — CHỈ LÀM 1 LẦN, THỦ CÔNG:
-- Sau khi bạn đã đăng ký tài khoản đầu tiên qua trang /login, chạy
-- riêng dòng dưới đây (đổi email cho đúng) để cấp quyền admin:
--
--   update public.profiles set is_admin = true
--   where user_id = (select id from auth.users where email = 'ban@vidu.com');
--
-- Chỉ tài khoản is_admin = true mới vào được /admin và
-- /exams/questions, /exams/create (ngân hàng câu hỏi + tạo đề).
-- ============================================================
