alter table public.calendar_events add column if not exists stable_key text;
create unique index if not exists calendar_events_user_stable_key_idx
  on public.calendar_events (user_id, stable_key)
  where stable_key is not null;
