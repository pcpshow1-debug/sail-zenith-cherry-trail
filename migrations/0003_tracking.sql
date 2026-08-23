alter table leads add column if not exists visitor_id text;
alter table leads add column if not exists session_id text;
alter table leads add column if not exists channel text;
alter table leads add column if not exists landing text;
alter table leads add column if not exists referrer text;
alter table leads add column if not exists utm_source text;
alter table leads add column if not exists utm_medium text;
alter table leads add column if not exists utm_campaign text;
alter table leads add column if not exists package text;

create table if not exists visitors (
  id text primary key,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

create table if not exists sessions (
  id text primary key,
  visitor_id text not null,
  lead_id text,
  channel text,
  landing text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  started_at timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

create table if not exists slide_events (
  id text primary key,
  session_id text not null,
  visitor_id text not null,
  slide_id text not null,
  slide_label text not null,
  kind text not null,
  ms integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists sessions_visitor_idx on sessions (visitor_id);
create index if not exists sessions_lead_idx on sessions (lead_id);
create index if not exists slide_events_session_idx on slide_events (session_id);
create index if not exists slide_events_slide_idx on slide_events (slide_id);
