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
alter publication supabase_realtime add table public.exam_content;

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
