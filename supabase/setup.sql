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
-- 4) COIN AN TOÀN (ATOMIC) + NHIỆM VỤ + CƯỢC SOLO (mục 4, 5)
--    Nguồn: supabase/coins_v2_schema.sql
-- ============================================================

create or replace function public.apply_coin_delta(p_user_id uuid, p_delta integer)
returns table (ok boolean, new_balance integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_new integer;
begin
  if p_delta >= 0 then
    update public.profiles
      set coins = coins + p_delta
      where user_id = p_user_id
      returning coins into v_new;
    return query select true, v_new;
  else
    update public.profiles
      set coins = coins + p_delta
      where user_id = p_user_id and coins >= (-p_delta)
      returning coins into v_new;
    if v_new is null then
      return query select false, (select coins from public.profiles where user_id = p_user_id);
    else
      return query select true, v_new;
    end if;
  end if;
end;
$$;

grant execute on function public.apply_coin_delta(uuid, integer) to authenticated;

-- 2) Nhiệm vụ — cấu hình dạng bảng, không hard-code trong code.
create table if not exists public.missions (
  id text primary key,               -- vd 'exam_complete', 'question_approved'
  label text not null,                -- hiển thị cho user
  coin_reward integer not null,
  active boolean not null default true
);

insert into public.missions (id, label, coin_reward) values
  ('exam_complete', 'Hoàn thành 1 đề kiểm tra', 5),
  ('question_approved', 'Tạo 1 câu hỏi được duyệt (không bị AI flagged)', 2)
on conflict (id) do nothing;

alter table public.missions enable row level security;
drop policy if exists "Missions are viewable by everyone" on public.missions;
create policy "Missions are viewable by everyone"
  on public.missions for select
  using (true);
-- Chỉ admin sửa cấu hình nhiệm vụ (thực hiện qua service role / trang admin).

-- Log các lần nhận thưởng nhiệm vụ, để không phát thưởng trùng cho
-- cùng 1 sự kiện (vd cùng 1 attempt / cùng 1 câu hỏi).
create table if not exists public.mission_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id text not null references public.missions(id),
  ref_id text not null,               -- vd attempt.id hoặc question.id
  coins_awarded integer not null,
  created_at timestamptz not null default now(),
  unique (mission_id, ref_id)
);

alter table public.mission_claims enable row level security;
drop policy if exists "Users see own mission claims" on public.mission_claims;
create policy "Users see own mission claims"
  on public.mission_claims for select
  using (auth.uid() = user_id);
drop policy if exists "Users insert own mission claims" on public.mission_claims;
create policy "Users insert own mission claims"
  on public.mission_claims for insert
  with check (auth.uid() = user_id);

-- 2b) Nhận thưởng nhiệm vụ nguyên tử + idempotent, chạy security definer
--     nên gọi được cả từ client (đã đăng nhập) lẫn từ worker phía server
--     (anon key, không có auth.uid() — vd khi AI duyệt câu hỏi cho người
--     khác) mà không cần nới lỏng RLS trực tiếp trên mission_claims.
create or replace function public.claim_mission(p_user_id uuid, p_mission_id text, p_ref_id text, p_coins integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.mission_claims (user_id, mission_id, ref_id, coins_awarded)
  values (p_user_id, p_mission_id, p_ref_id, p_coins)
  on conflict (mission_id, ref_id) do nothing;

  if not found then
    return false; -- đã claim trước đó, không cộng trùng
  end if;

  update public.profiles set coins = coins + p_coins where user_id = p_user_id;
  return true;
end;
$$;

grant execute on function public.claim_mission(uuid, text, text, integer) to anon, authenticated;

-- 3) Solo (Duel) cược coin — lưu cùng ai đã cược bao nhiêu, tránh trừ 2 lần.
alter table public.exam_content
  add column if not exists updated_at timestamptz not null default now();

-- Duel object đã nằm trong exam_content (JSON blob dùng chung toàn app).
-- Thêm bảng riêng để khóa việc trừ coin theo từng duel + user, atomic:
create table if not exists public.duel_stakes (
  duel_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null default 5,
  charged boolean not null default false,
  refunded boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (duel_id, user_id)
);

alter table public.duel_stakes enable row level security;
drop policy if exists "Users manage own duel stakes" on public.duel_stakes;
create policy "Users manage own duel stakes"
  on public.duel_stakes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- 5) HÀNG ĐỢI AI ĐA WORKER (mục 2, 6)
--    Nguồn: supabase/ai_jobs_schema.sql
-- ============================================================

create table if not exists public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,             -- 'review_question' | 'review_dispute' | 'generate_questions' | 'analyze_document'
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending', -- pending | running | done | error
  error_message text,
  attempts integer not null default 0,
  created_at timestamptz not null default now(),
  claimed_at timestamptz,
  finished_at timestamptz
);

create index if not exists ai_jobs_status_idx on public.ai_jobs (status, created_at);

alter table public.ai_jobs enable row level security;
-- exam_content hiện đang cho đọc/ghi công khai (demo, chưa có auth thật
-- ở tầng RLS) — giữ cùng mức để không chặn worker chạy bằng anon key,
-- như review-questions.ts hiện tại đang làm.
drop policy if exists "Public read ai_jobs" on public.ai_jobs;
create policy "Public read ai_jobs" on public.ai_jobs for select using (true);
drop policy if exists "Public insert ai_jobs" on public.ai_jobs;
create policy "Public insert ai_jobs" on public.ai_jobs for insert with check (true);
drop policy if exists "Public update ai_jobs" on public.ai_jobs;
create policy "Public update ai_jobs" on public.ai_jobs for update using (true);

-- Nhận 1 job đang "pending", khóa bằng for update skip locked để nhiều
-- worker gọi cùng lúc không giành nhau job. Việc treo quá lâu (running
-- > p_stale_minutes) được coi là lỗi và trả lại "pending" TRƯỚC khi
-- chọn job mới, để không bị kẹt hàng đợi.
create or replace function public.claim_next_ai_job(p_stale_minutes integer default 10)
returns public.ai_jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job public.ai_jobs;
begin
  update public.ai_jobs
    set status = 'pending', error_message = coalesce(error_message, '') || ' [timeout, trả lại hàng đợi]'
    where status = 'running' and claimed_at < now() - (p_stale_minutes || ' minutes')::interval;

  select * into v_job
    from public.ai_jobs
    where status = 'pending'
    order by created_at
    for update skip locked
    limit 1;

  if v_job.id is null then
    return null;
  end if;

  update public.ai_jobs
    set status = 'running', claimed_at = now(), attempts = attempts + 1
    where id = v_job.id
    returning * into v_job;

  return v_job;
end;
$$;

grant execute on function public.claim_next_ai_job(integer) to anon, authenticated;

create or replace function public.complete_ai_job(p_job_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.ai_jobs set status = 'done', finished_at = now() where id = p_job_id;
$$;

create or replace function public.fail_ai_job(p_job_id uuid, p_error text)
returns void language sql security definer set search_path = public as $$
  update public.ai_jobs set status = 'error', error_message = p_error, finished_at = now() where id = p_job_id;
$$;

grant execute on function public.complete_ai_job(uuid) to anon, authenticated;
grant execute on function public.fail_ai_job(uuid, text) to anon, authenticated;

-- Ghi kết quả rà soát cho ĐÚNG 1 câu hỏi bên trong exam_content.data.questions
-- (mảng JSON) bằng 1 câu UPDATE nguyên tử duy nhất (không đọc-rồi-ghi-đè ở
-- client) — nhiều worker cùng gọi hàm này cho các câu hỏi KHÁC NHAU sẽ
-- không đè mất kết quả của nhau, vì mỗi lệnh UPDATE tính lại jsonb mới
-- nhất tại đúng thời điểm nó chạy trong transaction riêng của nó.
create or replace function public.apply_question_ai_review(
  p_question_id text,
  p_status text,       -- 'passed' | 'flagged'
  p_note text,
  p_clear_dispute boolean default false
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_questions jsonb;
  v_updated jsonb;
  v_idx integer;
begin
  select (data->'questions') into v_questions from public.exam_content where id = 'main' for update;
  if v_questions is null then
    return;
  end if;

  select ord - 1 into v_idx
    from jsonb_array_elements(v_questions) with ordinality as t(elem, ord)
    where elem->>'id' = p_question_id
    limit 1;

  if v_idx is null then
    return;
  end if;

  v_updated := jsonb_set(v_questions, array[v_idx::text, 'aiReviewStatus'], to_jsonb(p_status), true);
  v_updated := jsonb_set(v_updated, array[v_idx::text, 'aiReviewNote'], to_jsonb(coalesce(p_note, '')), true);
  if p_clear_dispute then
    v_updated := jsonb_set(v_updated, array[v_idx::text, 'aiReviewDisputed'], to_jsonb(false), true);
  end if;

  update public.exam_content
    set data = jsonb_set(data, '{questions}', v_updated, true), updated_at = now()
    where id = 'main';
end;
$$;

grant execute on function public.apply_question_ai_review(text, text, text, boolean) to anon, authenticated;


-- ============================================================
-- ⚠️ BƯỚC CUỐI — CHỈ LÀM 1 LẦN, THỦ CÔNG:
-- Sau khi bạn đã đăng ký tài khoản đầu tiên qua trang /login, chạy
-- riêng dòng dưới đây (đổi email cho đúng) để cấp quyền admin:
--
--   update public.profiles set is_admin = true
--   where user_id = (select id from auth.users where email = 'ban@vidu.com');
--
-- Chỉ tài khoản is_admin = true mới vào được /admin (quản trị nội
-- dung khóa học). /exams/questions và /exams/create giờ mở cho MỌI
-- user đã đăng nhập (mục 1) — admin chỉ có thêm toàn quyền sửa/xóa/
-- xem nội dung của người khác, kể cả private.
-- ============================================================
