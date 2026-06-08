-- Viszio HVAC — initial Supabase schema.
-- Paste this into the Supabase SQL editor (Project → SQL → New query) and run.

-- ---------- profiles -----------------------------------------------------
-- One row per authenticated user, mirroring auth.users with extra app fields.
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  display_name text,
  created_at   timestamp with time zone default now() not null,
  updated_at   timestamp with time zone default now() not null
);

-- ---------- user_progress -----------------------------------------------
-- A single JSONB blob per user that holds bookmarks, notes, XP, streaks,
-- completed lessons, trophies, recent activity. One row per user.
create table if not exists public.user_progress (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default now() not null
);

-- ---------- automatic profile row on signup -----------------------------
-- Whenever a user signs up via Supabase Auth, insert a matching profile row.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- row-level security ------------------------------------------
alter table public.profiles      enable row level security;
alter table public.user_progress enable row level security;

-- profiles: users can read and update their own row.
drop policy if exists "profile_select_own" on public.profiles;
create policy "profile_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profile_update_own" on public.profiles;
create policy "profile_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- user_progress: users can read, insert and update their own row only.
drop policy if exists "progress_select_own" on public.user_progress;
create policy "progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.user_progress;
create policy "progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.user_progress;
create policy "progress_update_own"
  on public.user_progress for update
  using (auth.uid() = user_id);
