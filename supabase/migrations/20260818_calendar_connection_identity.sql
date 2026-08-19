-- Safe display identity for the connected Google Calendar account.
-- OAuth tokens remain server-only in calendar_connections.
alter table public.calendar_connections
  add column if not exists account_email text;
