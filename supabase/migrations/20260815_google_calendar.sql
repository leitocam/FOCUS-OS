-- Google Calendar integration. Tokens are server-only: no RLS policy grants browser access.
create table if not exists public.calendar_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null default 'google' check (provider = 'google'),
  calendar_id text not null default 'primary',
  access_token text not null,
  refresh_token text,
  expires_at timestamptz,
  scope text,
  sync_token text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider, calendar_id)
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  connection_id uuid not null references public.calendar_connections(id) on delete cascade,
  external_id text not null,
  title text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  timezone text not null default 'America/La_Paz',
  location text,
  source text not null default 'GOOGLE' check (source in ('GOOGLE', 'FOCUS_OS')),
  updated_at timestamptz not null default now(),
  unique (connection_id, external_id)
);

alter table public.calendar_connections enable row level security;
alter table public.calendar_events enable row level security;

create policy "Calendar events are private" on public.calendar_events for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create index if not exists calendar_events_user_time_idx on public.calendar_events (user_id, start_at);
