create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  whatsapp text not null,
  trip_type text not null,
  destination text not null,
  travel_date_estimate text not null,
  travelers_count integer,
  budget_range text not null,
  message text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  landing_path text,
  status text not null default 'new'
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  whatsapp text,
  booking_tool text not null default 'cal.com',
  booking_datetime timestamptz,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  landing_path text,
  status text not null default 'pending'
);

create table if not exists public.conversion_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  event_name text not null,
  cta_location text,
  page_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  metadata jsonb,
  status text not null default 'captured'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists conversion_events_created_at_idx on public.conversion_events (created_at desc);
create index if not exists conversion_events_name_idx on public.conversion_events (event_name);

alter table public.leads enable row level security;
alter table public.bookings enable row level security;
alter table public.conversion_events enable row level security;

grant usage on schema public to anon;
grant insert on public.leads to anon;
grant insert on public.bookings to anon;
grant insert on public.conversion_events to anon;

drop policy if exists "anon_insert_leads" on public.leads;
create policy "anon_insert_leads"
  on public.leads
  for insert
  to anon
  with check (true);

drop policy if exists "anon_insert_bookings" on public.bookings;
create policy "anon_insert_bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

drop policy if exists "anon_insert_conversion_events" on public.conversion_events;
create policy "anon_insert_conversion_events"
  on public.conversion_events
  for insert
  to anon
  with check (true);

-- Nota fase 1:
-- 1. Mantene solo politicas de insercion anonima.
-- 2. Si aparece spam, conviene mover los inserts a un backend con service role
--    o sumar rate limiting en edge antes de exponer el sitio en produccion.
