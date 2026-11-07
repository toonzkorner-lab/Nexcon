-- Square payments: remember which payment settled an order.
alter table orders add column if not exists payment_id text not null default '';
alter table orders add column if not exists payment_provider text not null default '';
