create table if not exists owners (
  user_id text primary key,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id text primary key,
  studio_name text not null,
  studio_short text not null,
  tagline text not null,
  email text not null,
  discord_url text not null,
  telegram_url text not null,
  founder_name text not null,
  founder_title text not null,
  founder_bio text not null,
  genesis text not null,
  desk_days text not null,
  desk_hours text not null,
  sla text not null,
  zone text not null,
  stack jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create table if not exists faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

create table if not exists principles (
  id text primary key,
  num text not null,
  title text not null,
  body text not null,
  sort_order int not null default 0
);

create table if not exists pipeline (
  id text primary key,
  num text not null,
  title text not null,
  body text not null,
  sort_order int not null default 0
);

create table if not exists engagements (
  id text primary key,
  name text not null,
  range_label text not null,
  body text not null,
  includes jsonb not null default '[]',
  sort_order int not null default 0
);

create table if not exists capabilities (
  id text primary key,
  area text not null,
  in_scope boolean not null default true,
  sort_order int not null default 0
);

create table if not exists services (
  slug text primary key,
  name text not null,
  group_name text not null,
  summary text not null,
  description text not null,
  price double precision not null,
  billing text not null,
  hours_note text,
  features jsonb not null default '[]',
  deliverables jsonb not null default '[]',
  timeline text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  slug text primary key,
  title text not null,
  client text not null,
  kind text not null,
  year text not null,
  duration text not null,
  role text not null,
  tags jsonb not null default '[]',
  stack jsonb not null default '[]',
  summary text not null,
  problem text not null,
  approach text not null,
  outcome text not null,
  metrics jsonb not null default '[]',
  image text not null,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists products (
  slug text primary key,
  name text not null,
  price double precision not null,
  blurb text not null,
  description text not null,
  includes jsonb not null default '[]',
  stack jsonb not null default '[]',
  published boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  slug text primary key,
  title text not null,
  date text not null,
  excerpt text not null,
  tags jsonb not null default '[]',
  reading text not null,
  body jsonb not null default '[]',
  published boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists reviews (
  id text primary key,
  name text not null,
  role text not null,
  company text not null,
  quote text not null,
  rating int not null default 5,
  date text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists briefs (
  id text primary key,
  name text not null,
  email text not null,
  channel text not null default '',
  groups jsonb not null default '[]',
  budget text not null default '',
  timeline text not null default '',
  notes text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id text primary key,
  name text not null,
  email text not null,
  topic text not null default '',
  body text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  email text not null,
  channel text not null default '',
  total double precision not null,
  items jsonb not null default '[]',
  status text not null default 'queued',
  created_at timestamptz not null default now()
);
