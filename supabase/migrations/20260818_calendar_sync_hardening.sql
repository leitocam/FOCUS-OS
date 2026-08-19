-- Sprint 4 hardening: sync state and all-day Google events.
alter table public.calendar_connections
  add column if not exists last_sync_status text not null default 'NEVER',
  add column if not exists last_sync_error text;

alter table public.calendar_events
  add column if not exists is_all_day boolean not null default false;

create index if not exists calendar_events_connection_external_idx
  on public.calendar_events (connection_id, external_id);
