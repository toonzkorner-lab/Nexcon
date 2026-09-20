-- Promo / coupon codes for the store.
create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  kind text not null default 'percent' check (kind in ('percent', 'fixed')),
  -- percent: 1–90 (percent off). fixed: dollar amount off.
  value double precision not null check (value > 0),
  min_total double precision not null default 0,
  max_uses integer check (max_uses is null or max_uses > 0),
  used_count integer not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Orders remember which coupon was applied and how much came off.
alter table orders add column if not exists coupon_code text not null default '';
alter table orders add column if not exists discount double precision not null default 0;
