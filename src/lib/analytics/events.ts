/**
 * Analytics ingestion + owner-facing stats.
 *
 * - `recordAnalyticsEvent`: public, rate-limited per IP. Called by the client
 *   tracker (pageviews) and for conversion events (contact submit, order,
 *   bot demo). Privacy-first: the raw IP is hashed with a daily salt and
 *   never stored.
 * - `analyticsOverview`: owner-only rollups for the desk dashboard.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { claimOrRequireOwner } from "@/lib/cms/db";
import { getSql } from "@/lib/db";
import { assertRateLimit, getClientIp } from "@/lib/rate-limit.server";
import {
  countryFromHeaders,
  dailySalt,
  hashVisitor,
  normalizePath,
  parseUserAgent,
  referrerHost,
} from "./parse";

const EVENT_NAMES = [
  "pageview",
  "contact_submit",
  "order_complete",
  "bot_demo_start",
  "service_inquiry",
] as const;

const eventSchema = z.object({
  event: z.enum(EVENT_NAMES).default("pageview"),
  path: z.string().max(500).default("/"),
  referrer: z.string().max(1000).default(""),
  sessionId: z.string().max(64).default(""),
});

async function asOwner(userId: string) {
  await claimOrRequireOwner(userId);
}

export const recordAnalyticsEvent = createServerFn({ method: "POST" })
  .validator((input: unknown) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const request = getRequest();
    const headers = request.headers;
    assertRateLimit(headers, "analytics", 120, 60_000);
    const ip = getClientIp(headers);
    const ua = headers.get("user-agent") ?? "";
    const parsed = parseUserAgent(ua);
    const sql = await getSql();
    await sql`insert into analytics_events
      (visitor_hash, session_id, event, path, referrer, user_agent, device, browser, os, country)
      values (${hashVisitor(ip, dailySalt())}, ${data.sessionId.slice(0, 64)},
        ${data.event}, ${normalizePath(data.path)}, ${referrerHost(data.referrer).slice(0, 200)},
        ${ua.slice(0, 500)}, ${parsed.device}, ${parsed.browser}, ${parsed.os},
        ${countryFromHeaders(headers)})`;
    return { ok: true as const };
  });

export type AnalyticsOverview = {
  live: number;
  today: { pageviews: number; visitors: number };
  range: { days: number; pageviews: number; visitors: number };
  daily: Array<{ day: string; pageviews: number; visitors: number }>;
  topPages: Array<{ path: string; pageviews: number; visitors: number }>;
  topReferrers: Array<{ host: string; pageviews: number }>;
  devices: Array<{ device: string; pageviews: number }>;
  browsers: Array<{ browser: string; pageviews: number }>;
  countries: Array<{ country: string; pageviews: number }>;
  events: Array<{ event: string; count: number }>;
};

const overviewSchema = z.object({ days: z.number().int().min(1).max(90).default(30) });

export const analyticsOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: unknown) => overviewSchema.parse(input))
  .handler(async ({ context, data }): Promise<{ ok: true; data: AnalyticsOverview } | { ok: false; error: string }> => {
    try {
      await asOwner(context.userId);
      const sql = await getSql();
      const days = data.days;
      const since = `${days} days`;

      const [liveRows] = await sql<{ n: string }>`
        select count(distinct visitor_hash)::int as n from analytics_events
        where created_at > now() - interval '5 minutes'`;
      const [todayRows] = await sql<{ pv: string; uv: string }>`
        select count(*)::int as pv, count(distinct visitor_hash)::int as uv
        from analytics_events
        where created_at > date_trunc('day', now()) and event = 'pageview'`;
      const [rangeRows] = await sql<{ pv: string; uv: string }>`
        select count(*)::int as pv, count(distinct visitor_hash)::int as uv
        from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview'`;
      const daily = await sql<{ day: string; pageviews: number; visitors: number }>`
        select to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as day,
          count(*)::int as pageviews, count(distinct visitor_hash)::int as visitors
        from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview'
        group by 1 order by 1`;
      const topPages = await sql<{ path: string; pageviews: number; visitors: number }>`
        select path, count(*)::int as pageviews, count(distinct visitor_hash)::int as visitors
        from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview'
        group by path order by pageviews desc limit 12`;
      const topReferrers = await sql<{ host: string; pageviews: number }>`
        select nullif(referrer, '') as host, count(*)::int as pageviews
        from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview' and referrer <> ''
        group by host order by pageviews desc limit 10`;
      const devices = await sql<{ device: string; pageviews: number }>`
        select device, count(*)::int as pageviews from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview'
        group by device order by pageviews desc`;
      const browsers = await sql<{ browser: string; pageviews: number }>`
        select browser, count(*)::int as pageviews from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview'
        group by browser order by pageviews desc`;
      const countries = await sql<{ country: string; pageviews: number }>`
        select nullif(country, '') as country, count(*)::int as pageviews
        from analytics_events
        where created_at > now() - ${since}::interval and event = 'pageview' and country <> ''
        group by country order by pageviews desc limit 10`;
      const events = await sql<{ event: string; count: number }>`
        select event, count(*)::int as count from analytics_events
        where created_at > now() - ${since}::interval and event <> 'pageview'
        group by event order by count desc`;

      return {
        ok: true,
        data: {
          live: Number(liveRows?.n ?? 0),
          today: { pageviews: Number(todayRows?.pv ?? 0), visitors: Number(todayRows?.uv ?? 0) },
          range: { days, pageviews: Number(rangeRows?.pv ?? 0), visitors: Number(rangeRows?.uv ?? 0) },
          daily,
          topPages,
          topReferrers: topReferrers.map((r) => ({ host: r.host ?? "(direct)", pageviews: r.pageviews })),
          devices,
          browsers,
          countries: countries.map((r) => ({ country: r.country ?? "—", pageviews: r.pageviews })),
          events,
        },
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Could not load analytics." };
    }
  });
