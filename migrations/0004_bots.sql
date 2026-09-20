create table if not exists bots (
  slug text primary key,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  kind text not null default 'chat',
  channel text not null default 'Discord',
  welcome text not null default '',
  persona text not null default '',
  starters jsonb not null default '[]',
  commands jsonb not null default '[]',
  product_slug text not null default '',
  published boolean not null default true,
  sort_order int not null default 0,
  seo_title text not null default '',
  seo_description text not null default '',
  updated_at timestamptz not null default now()
);
