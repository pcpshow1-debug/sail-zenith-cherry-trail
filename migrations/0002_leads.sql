create table if not exists leads (
  id text primary key,
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  city text not null,
  state text not null,
  country text not null,
  company text not null,
  goals text not null,
  source text not null default 'site',
  stage text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lead_followups (
  id text primary key,
  lead_id text not null references leads (id) on delete cascade,
  step integer not null,
  title text not null,
  channel text not null,
  due_at timestamptz not null,
  done_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists lead_followups_lead_id_idx on lead_followups (lead_id);
create index if not exists lead_followups_due_at_idx on lead_followups (due_at);
