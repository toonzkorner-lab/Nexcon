-- Real-time analytics events. Privacy-first: no raw IPs are stored — visitor
-- identity is a SHA-256 hash of (client IP + daily salt), so a visitor is
-- unique per day but cannot be traced back to an address from this table.
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  visitor_hash text not null,
  session_id text not null,
  event text not null default 'pageview',
  path text not null default '',
  referrer text not null default '',
  user_agent text not null default '',
  device text not null default '',
  browser text not null default '',
  os text not null default '',
  country text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_idx on analytics_events (created_at desc);
create index if not exists analytics_events_path_idx on analytics_events (path);
create index if not exists analytics_events_event_idx on analytics_events (event);
create index if not exists analytics_events_visitor_idx on analytics_events (visitor_hash, created_at desc);
