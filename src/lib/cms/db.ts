import { getSql, type Sql } from "@/lib/db";
import { uid } from "@/lib/utils";
import { authConfigured } from "@/lib/auth/verify.server";
import { ownerEmail } from "@/lib/env.server";
import { asCommands, asMetrics, asOrderItems, asPostBody, asStringArray } from "./parse";
import { seedSite, SEED_GENESIS } from "./seed-data";
import { ENGAGEMENT, FAQ, FOUNDER, OLD_FOUNDER_BIO, OLD_GENESIS, PIPELINE, PRINCIPLES } from "@/data/studio";
import type {
  Brief,
  Capability,
  Engagement,
  Faq,
  Inbox,
  Message,
  Order,
  OwnerInfo,
  PipelineStep,
  Post,
  Principle,
  Product,
  Project,
  Review,
  Service,
  Settings,
  ShowcaseBot,
  Site,
} from "./types";

const g = globalThis as typeof globalThis & {
  __cmsSeeded__?: Promise<void>;
  __cmsCopyV4__?: Promise<void>;
  __cmsBotsV2__?: Promise<void>;
};

function j(value: unknown): string {
  return JSON.stringify(value);
}

function num(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function bool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1;
}

export async function ensureSeeded(): Promise<void> {
  g.__cmsSeeded__ ??= (async () => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`select count(*)::int as n from settings`;
    if ((rows[0]?.n ?? 0) === 0) {
      await insertSeed(sql);
      return;
    }
  })().catch((err) => {
    g.__cmsSeeded__ = undefined;
    throw err;
  });
  await g.__cmsSeeded__;
  g.__cmsBotsV2__ ??= (async () => {
    const sql = await getSql();
    await insertBots(sql, seedSite().bots);
  })().catch((err) => {
    g.__cmsBotsV2__ = undefined;
    throw err;
  });
  await g.__cmsBotsV2__;
  await refreshStudioCopy();
}

async function refreshStudioCopy(): Promise<void> {
  g.__cmsCopyV4__ ??= (async () => {
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>("select founder_bio, genesis from settings where id = $1", [
      "studio",
    ]);
    const row = rows[0];
    if (!row) return;
    const bio = String(row.founder_bio ?? "");
    const genesis = String(row.genesis ?? "");
    if (bio === OLD_FOUNDER_BIO || genesis === OLD_GENESIS) {
      await sql.query("update settings set founder_bio = $1, genesis = $2, updated_at = now() where id = $3", [
        FOUNDER.bio,
        SEED_GENESIS,
        "studio",
      ]);
    }
    for (let i = 0; i < PRINCIPLES.length; i++) {
      const p = PRINCIPLES[i]!;
      await sql.query("update principles set title = $1, body = $2 where id = $3", [p.title, p.body, `pr-${i + 1}`]);
    }
    for (let i = 0; i < PIPELINE.length; i++) {
      const p = PIPELINE[i]!;
      await sql.query("update pipeline set title = $1, body = $2 where id = $3", [p.title, p.body, `pl-${i + 1}`]);
    }
    for (let i = 0; i < FAQ.length; i++) {
      const f = FAQ[i]!;
      await sql.query("update faqs set question = $1, answer = $2 where id = $3", [f.q, f.a, `faq-${i + 1}`]);
    }
    for (let i = 0; i < ENGAGEMENT.length; i++) {
      const e = ENGAGEMENT[i]!;
      await sql.query("update engagements set name = $1, range_label = $2, body = $3, includes = $4::jsonb where id = $5", [
        e.name,
        e.range,
        e.body,
        j(e.includes),
        `eg-${i + 1}`,
      ]);
    }
  })().catch((err) => {
    g.__cmsCopyV4__ = undefined;
    throw err;
  });
  return g.__cmsCopyV4__;
}

async function insertSeed(sql: Sql) {
  const seed = seedSite();
  const s = seed.settings;
  await sql.query(
    `insert into settings (
      id, studio_name, studio_short, tagline, email, discord_url, telegram_url,
      founder_name, founder_title, founder_bio, genesis, desk_days, desk_hours, sla, zone, stack,
      site_url, seo_title, seo_description, seo_keywords, city, region, country, twitter_handle,
      google_verification, indexable
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16::jsonb,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)`,
    [
      "studio",
      s.studioName,
      s.studioShort,
      s.tagline,
      s.email,
      s.discordUrl,
      s.telegramUrl,
      s.founderName,
      s.founderTitle,
      s.founderBio,
      s.genesis,
      s.deskDays,
      s.deskHours,
      s.sla,
      s.zone,
      j(s.stack),
      s.siteUrl,
      s.seoTitle,
      s.seoDescription,
      s.seoKeywords,
      s.city,
      s.region,
      s.country,
      s.twitterHandle,
      s.googleVerification,
      s.indexable,
    ],
  );

  for (const f of seed.faqs) {
    await sql.query(`insert into faqs (id, question, answer, sort_order) values ($1,$2,$3,$4)`, [
      f.id,
      f.question,
      f.answer,
      f.sortOrder,
    ]);
  }
  for (const p of seed.principles) {
    await sql.query(`insert into principles (id, num, title, body, sort_order) values ($1,$2,$3,$4,$5)`, [
      p.id,
      p.num,
      p.title,
      p.body,
      p.sortOrder,
    ]);
  }
  for (const p of seed.pipeline) {
    await sql.query(`insert into pipeline (id, num, title, body, sort_order) values ($1,$2,$3,$4,$5)`, [
      p.id,
      p.num,
      p.title,
      p.body,
      p.sortOrder,
    ]);
  }
  for (const e of seed.engagements) {
    await sql.query(
      `insert into engagements (id, name, range_label, body, includes, sort_order) values ($1,$2,$3,$4,$5::jsonb,$6)`,
      [e.id, e.name, e.rangeLabel, e.body, j(e.includes), e.sortOrder],
    );
  }
  for (const c of seed.capabilities) {
    await sql.query(
      `insert into capabilities (id, area, in_scope, sort_order) values ($1,$2,$3,$4)`,
      [c.id, c.area, c.inScope, c.sortOrder],
    );
  }
  for (const svc of seed.services) {
    await sql.query(
      `insert into services (
        slug, name, group_name, summary, description, price, billing, hours_note,
        features, deliverables, timeline, sort_order, published, seo_title, seo_description
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12,$13,$14,$15)`,
      [
        svc.slug,
        svc.name,
        svc.group,
        svc.summary,
        svc.description,
        svc.price,
        svc.billing,
        svc.hoursNote ?? null,
        j(svc.features),
        j(svc.deliverables),
        svc.timeline,
        svc.sortOrder,
        svc.published,
        svc.seoTitle,
        svc.seoDescription,
      ],
    );
  }
  for (const p of seed.projects) {
    await sql.query(
      `insert into projects (
        slug, title, client, kind, year, duration, role, tags, stack, summary,
        problem, approach, outcome, metrics, image, featured, published, sort_order,
        image_alt, seo_title, seo_description
      ) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10,$11,$12,$13,$14::jsonb,$15,$16,$17,$18,$19,$20,$21)`,
      [
        p.slug,
        p.title,
        p.client,
        p.kind,
        p.year,
        p.duration,
        p.role,
        j(p.tags),
        j(p.stack),
        p.summary,
        p.problem,
        p.approach,
        p.outcome,
        j(p.metrics),
        p.image,
        p.featured,
        p.published,
        p.sortOrder,
        p.imageAlt,
        p.seoTitle,
        p.seoDescription,
      ],
    );
  }
  for (const p of seed.products) {
    await sql.query(
      `insert into products (
        slug, name, price, blurb, description, includes, stack, published, sort_order, seo_title, seo_description
      ) values ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10,$11)`,
      [p.slug, p.name, p.price, p.blurb, p.description, j(p.includes), j(p.stack), p.published, p.sortOrder, p.seoTitle, p.seoDescription],
    );
  }
  for (const p of seed.posts) {
    await sql.query(
      `insert into posts (
        slug, title, date, excerpt, tags, reading, body, published, sort_order, seo_title, seo_description,
        image, image_alt
      ) values ($1,$2,$3,$4,$5::jsonb,$6,$7::jsonb,$8,$9,$10,$11,$12,$13)`,
      [p.slug, p.title, p.date, p.excerpt, j(p.tags), p.reading, j(p.body), p.published, p.sortOrder, p.seoTitle, p.seoDescription, p.image, p.imageAlt],
    );
  }
  for (const r of seed.reviews) {
    await sql.query(
      `insert into reviews (id, name, role, company, quote, rating, date, published) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [r.id, r.name, r.role, r.company, r.quote, r.rating, r.date, r.published],
    );
  }
  await insertBots(sql, seed.bots);
}

async function insertBots(sql: Sql, bots: ShowcaseBot[]) {
  for (const b of bots) {
    await sql.query(
      `insert into bots (
        slug, name, tagline, description, kind, channel, welcome, persona,
        starters, commands, product_slug, published, sort_order, seo_title, seo_description
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12,$13,$14,$15)
      on conflict (slug) do nothing`,
      [
        b.slug,
        b.name,
        b.tagline,
        b.description,
        b.kind,
        b.channel,
        b.welcome,
        b.persona,
        j(b.starters),
        j(b.commands),
        b.productSlug,
        b.published,
        b.sortOrder,
        b.seoTitle,
        b.seoDescription,
      ],
    );
  }
}

function mapSettings(row: Record<string, unknown>): Settings {
  return {
    studioName: String(row.studio_name ?? ""),
    studioShort: String(row.studio_short ?? ""),
    tagline: String(row.tagline ?? ""),
    email: String(row.email ?? ""),
    discordUrl: String(row.discord_url ?? ""),
    telegramUrl: String(row.telegram_url ?? ""),
    founderName: String(row.founder_name ?? ""),
    founderTitle: String(row.founder_title ?? ""),
    founderBio: String(row.founder_bio ?? ""),
    genesis: String(row.genesis ?? ""),
    deskDays: String(row.desk_days ?? ""),
    deskHours: String(row.desk_hours ?? ""),
    sla: String(row.sla ?? ""),
    zone: String(row.zone ?? ""),
    stack: asStringArray(row.stack),
    siteUrl: String(row.site_url ?? "https://n3xuskonc3ptz.com"),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    seoKeywords: String(row.seo_keywords ?? ""),
    city: String(row.city ?? ""),
    region: String(row.region ?? "Texas"),
    country: String(row.country ?? "US"),
    twitterHandle: String(row.twitter_handle ?? ""),
    googleVerification: String(row.google_verification ?? ""),
    indexable: row.indexable === undefined ? true : bool(row.indexable),
  };
}

/** Optional until callers need it: ISO timestamp from a row's updated_at column. */
function updatedAtOf(row: Record<string, unknown>): string | undefined {
  const value = row.updated_at;
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function mapService(row: Record<string, unknown>): Service {
  return {
    slug: String(row.slug),
    name: String(row.name),
    group: String(row.group_name),
    summary: String(row.summary),
    description: String(row.description),
    price: num(row.price),
    billing: row.billing === "monthly" ? "monthly" : "one-off",
    hoursNote: row.hours_note ? String(row.hours_note) : undefined,
    features: asStringArray(row.features),
    deliverables: asStringArray(row.deliverables),
    timeline: String(row.timeline),
    sortOrder: num(row.sort_order),
    published: bool(row.published),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    updatedAt: updatedAtOf(row),
  };
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    slug: String(row.slug),
    title: String(row.title),
    client: String(row.client),
    kind: String(row.kind),
    year: String(row.year),
    duration: String(row.duration),
    role: String(row.role),
    tags: asStringArray(row.tags),
    stack: asStringArray(row.stack),
    summary: String(row.summary),
    problem: String(row.problem),
    approach: String(row.approach),
    outcome: String(row.outcome),
    metrics: asMetrics(row.metrics),
    image: String(row.image),
    imageAlt: String(row.image_alt ?? row.title ?? ""),
    featured: bool(row.featured),
    published: bool(row.published),
    sortOrder: num(row.sort_order),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    updatedAt: updatedAtOf(row),
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    slug: String(row.slug),
    name: String(row.name),
    price: num(row.price),
    blurb: String(row.blurb),
    description: String(row.description),
    includes: asStringArray(row.includes),
    stack: asStringArray(row.stack),
    published: bool(row.published),
    sortOrder: num(row.sort_order),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    updatedAt: updatedAtOf(row),
  };
}

function mapPost(row: Record<string, unknown>): Post {
  return {
    slug: String(row.slug),
    title: String(row.title),
    date: String(row.date),
    excerpt: String(row.excerpt),
    tags: asStringArray(row.tags),
    reading: String(row.reading),
    body: asPostBody(row.body),
    image: String(row.image ?? ""),
    imageAlt: String(row.image_alt ?? ""),
    published: bool(row.published),
    sortOrder: num(row.sort_order),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    updatedAt: updatedAtOf(row),
  };
}

function mapReview(row: Record<string, unknown>): Review {
  return {
    id: String(row.id),
    name: String(row.name),
    role: String(row.role),
    company: String(row.company),
    quote: String(row.quote),
    rating: num(row.rating),
    date: String(row.date),
    published: bool(row.published),
  };
}

function mapBot(row: Record<string, unknown>): ShowcaseBot {
  return {
    slug: String(row.slug),
    name: String(row.name),
    tagline: String(row.tagline ?? ""),
    description: String(row.description ?? ""),
    kind: String(row.kind ?? "chat"),
    channel: String(row.channel ?? "Discord"),
    welcome: String(row.welcome ?? ""),
    persona: String(row.persona ?? ""),
    starters: asStringArray(row.starters),
    commands: asCommands(row.commands),
    productSlug: String(row.product_slug ?? ""),
    published: bool(row.published),
    sortOrder: num(row.sort_order),
    seoTitle: String(row.seo_title ?? ""),
    seoDescription: String(row.seo_description ?? ""),
    updatedAt: updatedAtOf(row),
  };
}

export async function readSite(publishedOnly = true): Promise<Site> {
  await ensureSeeded();
  const sql = await getSql();
  const pub = publishedOnly ? "where published = true" : "";
  const [settingsRows, faqs, principles, pipeline, engagements, capabilities, services, projects, products, posts, reviews, bots] =
    await Promise.all([
      sql.query<Record<string, unknown>>("select * from settings where id = $1", ["studio"]),
      sql.query<Record<string, unknown>>("select * from faqs order by sort_order"),
      sql.query<Record<string, unknown>>("select * from principles order by sort_order"),
      sql.query<Record<string, unknown>>("select * from pipeline order by sort_order"),
      sql.query<Record<string, unknown>>("select * from engagements order by sort_order"),
      sql.query<Record<string, unknown>>("select * from capabilities order by sort_order"),
      sql.query<Record<string, unknown>>(`select * from services ${pub} order by sort_order`),
      sql.query<Record<string, unknown>>(`select * from projects ${pub} order by sort_order`),
      sql.query<Record<string, unknown>>(`select * from products ${pub} order by sort_order`),
      sql.query<Record<string, unknown>>(`select * from posts ${pub} order by date desc`),
      sql.query<Record<string, unknown>>(
        `select * from reviews ${publishedOnly ? "where published = true" : ""} order by date desc`,
      ),
      sql.query<Record<string, unknown>>(`select * from bots ${pub} order by sort_order`),
    ]);

  const settings = settingsRows[0] ? mapSettings(settingsRows[0]) : seedSite().settings;

  return {
    settings,
    faqs: faqs.map((r) => ({
      id: String(r.id),
      question: String(r.question),
      answer: String(r.answer),
      sortOrder: num(r.sort_order),
    })),
    principles: principles.map((r) => ({
      id: String(r.id),
      num: String(r.num),
      title: String(r.title),
      body: String(r.body),
      sortOrder: num(r.sort_order),
    })),
    pipeline: pipeline.map((r) => ({
      id: String(r.id),
      num: String(r.num),
      title: String(r.title),
      body: String(r.body),
      sortOrder: num(r.sort_order),
    })),
    engagements: engagements.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      rangeLabel: String(r.range_label),
      body: String(r.body),
      includes: asStringArray(r.includes),
      sortOrder: num(r.sort_order),
    })),
    capabilities: capabilities.map((r) => ({
      id: String(r.id),
      area: String(r.area),
      inScope: bool(r.in_scope),
      sortOrder: num(r.sort_order),
    })),
    services: services.map(mapService),
    projects: projects.map(mapProject),
    products: products.map(mapProduct),
    posts: posts.map(mapPost),
    reviews: reviews.map(mapReview),
    bots: bots.map(mapBot),
  };
}

export async function readInbox(): Promise<Inbox> {
  await ensureSeeded();
  const sql = await getSql();
  const [briefs, messages, orders] = await Promise.all([
    sql.query<Record<string, unknown>>("select * from briefs order by created_at desc"),
    sql.query<Record<string, unknown>>("select * from messages order by created_at desc"),
    sql.query<Record<string, unknown>>("select * from orders order by created_at desc"),
  ]);
  return {
    briefs: briefs.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      email: String(r.email),
      channel: String(r.channel ?? ""),
      groups: asStringArray(r.groups),
      budget: String(r.budget ?? ""),
      timeline: String(r.timeline ?? ""),
      notes: String(r.notes ?? ""),
      status: String(r.status),
      createdAt: String(r.created_at),
    })),
    messages: messages.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      email: String(r.email),
      topic: String(r.topic ?? ""),
      body: String(r.body),
      status: String(r.status),
      createdAt: String(r.created_at),
    })),
    orders: orders.map((r) => ({
      id: String(r.id),
      email: String(r.email),
      channel: String(r.channel ?? ""),
      total: num(r.total),
      items: asOrderItems(r.items),
      status: String(r.status),
      createdAt: String(r.created_at),
    })),
  };
}

export async function listOwners(): Promise<OwnerInfo[]> {
  const sql = await getSql();
  const rows = await sql.query<{ user_id: string; email: string | null }>(
    "select user_id, email from owners order by created_at",
  );
  return rows.map((r) => ({ userId: r.user_id, email: r.email }));
}

export async function claimOrRequireOwner(userId: string, email?: string | null): Promise<void> {
  const sql = await getSql();
  const existing = await sql.query<{ user_id: string }>("select user_id from owners");
  if (existing.length > 0) {
    if (!existing.some((r) => r.user_id === userId)) {
      throw new Error("This desk already has an owner.");
    }
    return;
  }

  // First claim. When OWNER_EMAIL is set on a deployed, auth-configured
  // instance, only the account whose email matches may claim the desk —
  // otherwise the first stranger who signs up owns it. The gate is skipped
  // when auth is off (local dev / live preview use a shared dev user, where
  // OWNER_EMAIL is meaningless), and when OWNER_EMAIL is unset the historic
  // first-claim behavior applies.
  const callerEmail = email ?? (await lookupAuthEmail(sql, userId));
  const gate = authConfigured ? ownerEmail() : undefined;
  if (gate) {
    if (!callerEmail || callerEmail.toLowerCase() !== gate) {
      throw new Error("Owner claim rejected: this account is not the configured desk owner.");
    }
  }

  // Race-safe: two concurrent first visitors both pass the gate, the loser's
  // insert is a no-op thanks to ON CONFLICT DO NOTHING, and the re-select
  // below rejects anyone who didn't win the row.
  await sql.query("insert into owners (user_id, email) values ($1,$2) on conflict (user_id) do nothing", [
    userId,
    callerEmail ?? null,
  ]);
  const after = await sql.query<{ user_id: string }>("select user_id from owners");
  if (!after.some((r) => r.user_id === userId)) {
    throw new Error("This desk already has an owner.");
  }
}

/** Look up a Better Auth user's email by id. Fails closed: returns null on error. */
async function lookupAuthEmail(sql: Sql, userId: string): Promise<string | null> {
  try {
    const rows = await sql.query<{ email: string }>('select "email" from "user" where "id" = $1', [userId]);
    return rows[0]?.email ?? null;
  } catch {
    return null;
  }
}

export async function addOwner(userId: string, email: string | null) {
  const sql = await getSql();
  await sql.query(
    "insert into owners (user_id, email) values ($1,$2) on conflict (user_id) do update set email = excluded.email",
    [userId, email],
  );
}

export async function removeOwner(userId: string, actorId: string) {
  if (userId === actorId) throw new Error("You cannot remove yourself.");
  const sql = await getSql();
  const count = await sql.query<{ n: number }>("select count(*)::int as n from owners");
  if ((count[0]?.n ?? 0) <= 1) throw new Error("At least one owner is required.");
  await sql.query("delete from owners where user_id = $1", [userId]);
}

export async function saveSettings(s: Settings) {
  const sql = await getSql();
  await sql.query(
    `update settings set
      studio_name=$1, studio_short=$2, tagline=$3, email=$4, discord_url=$5, telegram_url=$6,
      founder_name=$7, founder_title=$8, founder_bio=$9, genesis=$10, desk_days=$11, desk_hours=$12,
      sla=$13, zone=$14, stack=$15::jsonb,
      site_url=$16, seo_title=$17, seo_description=$18, seo_keywords=$19, city=$20, region=$21,
      country=$22, twitter_handle=$23, google_verification=$24, indexable=$25, updated_at=now()
     where id='studio'`,
    [
      s.studioName,
      s.studioShort,
      s.tagline,
      s.email,
      s.discordUrl,
      s.telegramUrl,
      s.founderName,
      s.founderTitle,
      s.founderBio,
      s.genesis,
      s.deskDays,
      s.deskHours,
      s.sla,
      s.zone,
      j(s.stack),
      s.siteUrl,
      s.seoTitle,
      s.seoDescription,
      s.seoKeywords,
      s.city,
      s.region,
      s.country,
      s.twitterHandle,
      s.googleVerification,
      s.indexable,
    ],
  );
}

export async function replaceSimple(
  table: "faqs" | "principles" | "pipeline" | "engagements" | "capabilities",
  rows: unknown[],
) {
  const sql = await getSql();
  await sql.query(`delete from ${table}`);
  if (table === "faqs") {
    for (const raw of rows as Faq[]) {
      await sql.query(`insert into faqs (id, question, answer, sort_order) values ($1,$2,$3,$4)`, [
        raw.id || uid("faq"),
        raw.question,
        raw.answer,
        raw.sortOrder,
      ]);
    }
  } else if (table === "principles") {
    for (const raw of rows as Principle[]) {
      await sql.query(`insert into principles (id, num, title, body, sort_order) values ($1,$2,$3,$4,$5)`, [
        raw.id || uid("pr"),
        raw.num,
        raw.title,
        raw.body,
        raw.sortOrder,
      ]);
    }
  } else if (table === "pipeline") {
    for (const raw of rows as PipelineStep[]) {
      await sql.query(`insert into pipeline (id, num, title, body, sort_order) values ($1,$2,$3,$4,$5)`, [
        raw.id || uid("pl"),
        raw.num,
        raw.title,
        raw.body,
        raw.sortOrder,
      ]);
    }
  } else if (table === "engagements") {
    for (const raw of rows as Engagement[]) {
      await sql.query(
        `insert into engagements (id, name, range_label, body, includes, sort_order) values ($1,$2,$3,$4,$5::jsonb,$6)`,
        [raw.id || uid("eg"), raw.name, raw.rangeLabel, raw.body, j(raw.includes), raw.sortOrder],
      );
    }
  } else {
    for (const raw of rows as Capability[]) {
      await sql.query(`insert into capabilities (id, area, in_scope, sort_order) values ($1,$2,$3,$4)`, [
        raw.id || uid("cap"),
        raw.area,
        raw.inScope,
        raw.sortOrder,
      ]);
    }
  }
}

export async function upsertService(svc: Service) {
  const sql = await getSql();
  await sql.query(
    `insert into services (
      slug, name, group_name, summary, description, price, billing, hours_note,
      features, deliverables, timeline, sort_order, published, seo_title, seo_description, updated_at
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12,$13,$14,$15,now())
    on conflict (slug) do update set
      name=excluded.name, group_name=excluded.group_name, summary=excluded.summary,
      description=excluded.description, price=excluded.price, billing=excluded.billing,
      hours_note=excluded.hours_note, features=excluded.features, deliverables=excluded.deliverables,
      timeline=excluded.timeline, sort_order=excluded.sort_order, published=excluded.published,
      seo_title=excluded.seo_title, seo_description=excluded.seo_description, updated_at=now()`,
    [
      svc.slug,
      svc.name,
      svc.group,
      svc.summary,
      svc.description,
      svc.price,
      svc.billing,
      svc.hoursNote ?? null,
      j(svc.features),
      j(svc.deliverables),
      svc.timeline,
      svc.sortOrder,
      svc.published,
      svc.seoTitle,
      svc.seoDescription,
    ],
  );
}

export async function deleteBySlug(table: "services" | "projects" | "products" | "posts" | "bots", slug: string) {
  const sql = await getSql();
  await sql.query(`delete from ${table} where slug = $1`, [slug]);
}

export async function upsertProject(p: Project) {
  const sql = await getSql();
  await sql.query(
    `insert into projects (
      slug, title, client, kind, year, duration, role, tags, stack, summary,
      problem, approach, outcome, metrics, image, featured, published, sort_order,
      image_alt, seo_title, seo_description, updated_at
    ) values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10,$11,$12,$13,$14::jsonb,$15,$16,$17,$18,$19,$20,$21,now())
    on conflict (slug) do update set
      title=excluded.title, client=excluded.client, kind=excluded.kind, year=excluded.year,
      duration=excluded.duration, role=excluded.role, tags=excluded.tags, stack=excluded.stack,
      summary=excluded.summary, problem=excluded.problem, approach=excluded.approach,
      outcome=excluded.outcome, metrics=excluded.metrics, image=excluded.image,
      featured=excluded.featured, published=excluded.published, sort_order=excluded.sort_order,
      image_alt=excluded.image_alt, seo_title=excluded.seo_title, seo_description=excluded.seo_description,
      updated_at=now()`,
    [
      p.slug,
      p.title,
      p.client,
      p.kind,
      p.year,
      p.duration,
      p.role,
      j(p.tags),
      j(p.stack),
      p.summary,
      p.problem,
      p.approach,
      p.outcome,
      j(p.metrics),
      p.image,
      p.featured,
      p.published,
      p.sortOrder,
      p.imageAlt,
      p.seoTitle,
      p.seoDescription,
    ],
  );
}

export async function upsertProduct(p: Product) {
  const sql = await getSql();
  await sql.query(
    `insert into products (
      slug, name, price, blurb, description, includes, stack, published, sort_order,
      seo_title, seo_description, updated_at
    ) values ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10,$11,now())
    on conflict (slug) do update set
      name=excluded.name, price=excluded.price, blurb=excluded.blurb, description=excluded.description,
      includes=excluded.includes, stack=excluded.stack, published=excluded.published,
      sort_order=excluded.sort_order, seo_title=excluded.seo_title, seo_description=excluded.seo_description,
      updated_at=now()`,
    [p.slug, p.name, p.price, p.blurb, p.description, j(p.includes), j(p.stack), p.published, p.sortOrder, p.seoTitle, p.seoDescription],
  );
}

export async function upsertPost(p: Post) {
  const sql = await getSql();
  await sql.query(
    `insert into posts (
      slug, title, date, excerpt, tags, reading, body, published, sort_order,
      seo_title, seo_description, image, image_alt, updated_at
    ) values ($1,$2,$3,$4,$5::jsonb,$6,$7::jsonb,$8,$9,$10,$11,$12,$13,now())
    on conflict (slug) do update set
      title=excluded.title, date=excluded.date, excerpt=excluded.excerpt, tags=excluded.tags,
      reading=excluded.reading, body=excluded.body, published=excluded.published,
      sort_order=excluded.sort_order, seo_title=excluded.seo_title, seo_description=excluded.seo_description,
      image=excluded.image, image_alt=excluded.image_alt,
      updated_at=now()`,
    [p.slug, p.title, p.date, p.excerpt, j(p.tags), p.reading, j(p.body), p.published, p.sortOrder, p.seoTitle, p.seoDescription, p.image, p.imageAlt],
  );
}

export async function upsertBot(b: ShowcaseBot) {
  const sql = await getSql();
  await sql.query(
    `insert into bots (
      slug, name, tagline, description, kind, channel, welcome, persona,
      starters, commands, product_slug, published, sort_order, seo_title, seo_description, updated_at
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12,$13,$14,$15,now())
    on conflict (slug) do update set
      name=excluded.name, tagline=excluded.tagline, description=excluded.description, kind=excluded.kind,
      channel=excluded.channel, welcome=excluded.welcome, persona=excluded.persona, starters=excluded.starters,
      commands=excluded.commands, product_slug=excluded.product_slug, published=excluded.published,
      sort_order=excluded.sort_order, seo_title=excluded.seo_title, seo_description=excluded.seo_description,
      updated_at=now()`,
    [
      b.slug,
      b.name,
      b.tagline,
      b.description,
      b.kind,
      b.channel,
      b.welcome,
      b.persona,
      j(b.starters),
      j(b.commands),
      b.productSlug,
      b.published,
      b.sortOrder,
      b.seoTitle,
      b.seoDescription,
    ],
  );
}

export async function getPublishedBot(slug: string): Promise<ShowcaseBot | null> {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(
    "select * from bots where slug = $1 and published = true",
    [slug],
  );
  return rows[0] ? mapBot(rows[0]) : null;
}

export async function upsertReview(r: Review) {
  const sql = await getSql();
  await sql.query(
    `insert into reviews (id, name, role, company, quote, rating, date, published)
     values ($1,$2,$3,$4,$5,$6,$7,$8)
     on conflict (id) do update set
       name=excluded.name, role=excluded.role, company=excluded.company, quote=excluded.quote,
       rating=excluded.rating, date=excluded.date, published=excluded.published`,
    [r.id, r.name, r.role, r.company, r.quote, r.rating, r.date, r.published],
  );
}

export async function deleteReview(id: string) {
  const sql = await getSql();
  await sql.query("delete from reviews where id = $1", [id]);
}

export async function insertBrief(input: Omit<Brief, "id" | "status" | "createdAt">): Promise<Brief> {
  await ensureSeeded();
  const sql = await getSql();
  const id = uid("brf");
  await sql.query(
    `insert into briefs (id, name, email, channel, groups, budget, timeline, notes, status)
     values ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,'new')`,
    [id, input.name, input.email, input.channel, j(input.groups), input.budget, input.timeline, input.notes],
  );
  return { ...input, id, status: "new", createdAt: new Date().toISOString() };
}

export async function insertMessage(input: Omit<Message, "id" | "status" | "createdAt">): Promise<Message> {
  await ensureSeeded();
  const sql = await getSql();
  const id = uid("msg");
  await sql.query(
    `insert into messages (id, name, email, topic, body, status) values ($1,$2,$3,$4,$5,'new')`,
    [id, input.name, input.email, input.topic, input.body],
  );
  return { ...input, id, status: "new", createdAt: new Date().toISOString() };
}

export async function insertOrder(input: Omit<Order, "id" | "status" | "createdAt">): Promise<Order> {
  await ensureSeeded();
  const sql = await getSql();
  const id = uid("ord");
  await sql.query(
    `insert into orders (id, email, channel, total, items, status) values ($1,$2,$3,$4,$5::jsonb,'queued')`,
    [id, input.email, input.channel, input.total, j(input.items)],
  );
  return { ...input, id, status: "queued", createdAt: new Date().toISOString() };
}

export async function insertReview(input: Omit<Review, "id" | "date" | "published">): Promise<Review> {
  await ensureSeeded();
  const sql = await getSql();
  const id = uid("rev");
  const date = new Date().toISOString().slice(0, 10);
  await sql.query(
    `insert into reviews (id, name, role, company, quote, rating, date, published)
     values ($1,$2,$3,$4,$5,$6,$7,false)`,
    [id, input.name, input.role, input.company, input.quote, input.rating, date],
  );
  return { ...input, id, date, published: false };
}

export async function setRowStatus(
  table: "briefs" | "messages" | "orders",
  id: string,
  status: string,
) {
  const sql = await getSql();
  await sql.query(`update ${table} set status = $1 where id = $2`, [status, id]);
}

export { mapService, mapProject, mapProduct, mapPost, mapReview };
