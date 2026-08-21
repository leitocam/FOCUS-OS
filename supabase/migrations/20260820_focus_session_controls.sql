-- FOCUS//OS / Sprint 5: intentional focus sessions, with resumable pauses.
alter table public.focus_sessions
  add column if not exists target_minutes smallint,
  add column if not exists paused_at timestamptz,
  add column if not exists paused_seconds integer not null default 0;

alter table public.focus_sessions
  drop constraint if exists valid_focus_target,
  add constraint valid_focus_target check (
    target_minutes is null or (target_minutes between 15 and 180 and mod(target_minutes, 5) = 0)
  ),
  drop constraint if exists valid_focus_paused_seconds,
  add constraint valid_focus_paused_seconds check (paused_seconds >= 0),
  drop constraint if exists valid_focus_pause_state,
  add constraint valid_focus_pause_state check (ended_at is null or paused_at is null);
