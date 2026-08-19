-- FOCUS//OS / Sprint 2 core schema. Run in Supabase SQL Editor once.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone text not null default 'America/La_Paz',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 280),
  status text not null default 'TODO' check (status in ('TODO', 'IN_PROGRESS', 'DONE')),
  priority smallint not null default 2 check (priority between 1 and 4),
  estimated_minutes integer check (estimated_minutes > 0),
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer,
  created_at timestamptz not null default now(),
  constraint valid_focus_duration check (duration_seconds is null or duration_seconds >= 0),
  constraint valid_focus_range check (ended_at is null or ended_at >= started_at)
);

create table if not exists public.internship_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  required_minutes integer not null default 14400 check (required_minutes > 0),
  weekly_target_minutes integer,
  start_date date,
  deadline date,
  company text,
  role text,
  updated_at timestamptz not null default now()
);

create table if not exists public.internship_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer,
  description text,
  project text,
  created_at timestamptz not null default now(),
  constraint valid_internship_duration check (duration_seconds is null or duration_seconds >= 0),
  constraint valid_internship_range check (ended_at is null or ended_at >= started_at)
);

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.internship_profiles enable row level security;
alter table public.internship_sessions enable row level security;

create policy "Profiles are private" on public.profiles for all using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Tasks are private" on public.tasks for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Focus sessions are private" on public.focus_sessions for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Internship profiles are private" on public.internship_profiles for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Internship sessions are private" on public.internship_sessions for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
