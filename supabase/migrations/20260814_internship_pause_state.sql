-- Adds durable pause/resume state to internship sessions.
alter table public.internship_sessions
  add column if not exists paused_at timestamptz,
  add column if not exists accumulated_seconds integer not null default 0;

create index if not exists internship_sessions_open_by_user_idx
  on public.internship_sessions (user_id, started_at desc)
  where ended_at is null;
