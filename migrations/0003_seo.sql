alter table settings add column if not exists site_url text not null default 'https://n3xuskonc3ptz.com';
alter table settings add column if not exists seo_title text not null default '';
alter table settings add column if not exists seo_description text not null default '';
alter table settings add column if not exists seo_keywords text not null default '';
alter table settings add column if not exists city text not null default '';
alter table settings add column if not exists region text not null default 'Texas';
alter table settings add column if not exists country text not null default 'US';
alter table settings add column if not exists twitter_handle text not null default '';
alter table settings add column if not exists google_verification text not null default '';
alter table settings add column if not exists indexable boolean not null default true;

alter table services add column if not exists seo_title text not null default '';
alter table services add column if not exists seo_description text not null default '';

alter table projects add column if not exists seo_title text not null default '';
alter table projects add column if not exists seo_description text not null default '';
alter table projects add column if not exists image_alt text not null default '';

alter table products add column if not exists seo_title text not null default '';
alter table products add column if not exists seo_description text not null default '';

alter table posts add column if not exists seo_title text not null default '';
alter table posts add column if not exists seo_description text not null default '';
