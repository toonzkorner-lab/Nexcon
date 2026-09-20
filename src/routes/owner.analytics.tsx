import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { analyticsOverview, type AnalyticsOverview } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";
import { pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/owner/analytics")({
  head: ({ matches }) =>
    pageHead({
      title: "Analytics",
      description: "Real-time traffic and conversions for the studio.",
      path: "/owner/analytics",
      site: siteFromMatches(matches),
      index: false,
    }),
  component: Page,
});

const RANGES = [7, 30, 90] as const;
const EVENT_LABELS: Record<string, string> = {
  contact_submit: "Contact messages",
  order_complete: "Orders placed",
  bot_demo_start: "Bot demos started",
  service_inquiry: "Service inquiries",
  promo_applied: "Promo codes applied",
};

function Page() {
  const [days, setDays] = useState<number>(30);
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await analyticsOverview({ data: { days } });
        if (!alive) return;
        if (!res.ok) {
          setError(res.error);
          return;
        }
        setError(null);
        setData(res.data);
      } catch {
        if (alive) setError("Could not reach the analytics store.");
      } finally {
        if (alive) setLoading(false);
      }
    }
    setLoading(true);
    void load();
    // Live refresh: the "live visitors" panel stays real-time without a reload.
    const timer = setInterval(load, 15_000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [days]);

  const maxDaily = useMemo(
    () => Math.max(1, ...(data?.daily.map((d) => d.pageviews) ?? [1])),
    [data],
  );

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Analytics</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Who is in the room.</h1>
          <p className="mt-2 max-w-xl text-sm text-fg-muted">
            Live visitors, traffic over time, top pages, referrers, devices, and conversions. No cookies, no third
            parties — visitors are counted by a daily rotating hash, never a raw IP.
          </p>
        </div>
        <div className="flex gap-1 rounded-full border border-border p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              className={cn(
                "h-8 rounded-full px-3 font-mono text-xs",
                days === r ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4 text-sm text-fg-muted">
          {error}
        </p>
      )}

      {loading && !data ? (
        <p className="mt-10 text-sm text-fg-muted">Reading the room…</p>
      ) : data ? (
        <>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              n={data.live}
              label="Live now"
              live
              hint="Visitors active in the last 5 minutes. Refreshes every 15 seconds."
            />
            <StatCard n={data.today.pageviews} label="Pageviews today" hint={`${data.today.visitors} unique visitors`} />
            <StatCard
              n={data.range.pageviews}
              label={`Pageviews · ${data.range.days}d`}
              hint={`${data.range.visitors} unique visitors`}
            />
            <StatCard
              n={data.events.reduce((a, e) => a + e.count, 0)}
              label={`Conversions · ${data.range.days}d`}
              hint={data.events.map((e) => `${EVENT_LABELS[e.event] ?? e.event}: ${e.count}`).join(" · ") || "None yet"}
            />
          </div>

          <section className="mt-12">
            <h2 className="text-lg font-medium">Traffic over time</h2>
            {data.daily.length === 0 ? (
              <EmptyNote text="No traffic in this range yet. Pageviews start appearing once the tracker is live." />
            ) : (
              <div className="mt-4 rounded-[var(--radius-lg)] bg-bg-elevated p-5">
                <div className="flex h-40 items-end gap-1" role="img" aria-label="Daily pageviews bar chart">
                  {data.daily.map((d) => (
                    <div key={d.day} className="group relative flex-1" title={`${d.day}: ${d.pageviews} views, ${d.visitors} visitors`}>
                      <div
                        className="w-full rounded-t bg-accent/70 transition-colors group-hover:bg-accent"
                        style={{ height: `${Math.max(3, (d.pageviews / maxDaily) * 100)}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-subtle">
                  <span>{data.daily[0]?.day}</span>
                  <span>{data.daily[data.daily.length - 1]?.day}</span>
                </div>
              </div>
            )}
          </section>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Breakdown title="Top pages" rows={data.topPages.map((p) => [p.path, `${p.pageviews} views · ${p.visitors} visitors`])} empty="No pageviews yet." />
            <Breakdown title="Top referrers" rows={data.topReferrers.map((r) => [r.host, `${r.pageviews} views`])} empty="All traffic is direct so far." />
            <Breakdown title="Devices" rows={data.devices.map((d) => [d.device, `${d.pageviews} views`])} empty="No device data yet." />
            <Breakdown title="Browsers" rows={data.browsers.map((b) => [b.browser, `${b.pageviews} views`])} empty="No browser data yet." />
            <Breakdown title="Countries" rows={data.countries.map((c) => [c.country, `${c.pageviews} views`])} empty="No country data yet — available when a CDN/proxy passes it along." />
            <section>
              <h2 className="text-lg font-medium">Conversions</h2>
              {data.events.length === 0 ? (
                <EmptyNote text="No conversion events yet. Contact forms, orders, and bot demos are tracked automatically." />
              ) : (
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {data.events.map((e) => (
                    <li key={e.event} className="flex items-baseline justify-between py-3">
                      <p className="text-sm">{EVENT_LABELS[e.event] ?? e.event}</p>
                      <p className="font-mono text-sm tabular-nums">{e.count}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ n, label, hint, live }: { n: number; label: string; hint?: string; live?: boolean }) {
  return (
    <div className="bg-bg-elevated p-5">
      <p className="flex items-center gap-2 font-mono text-2xl tabular-nums">
        {live && <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
        </span>}
        {n.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-fg-muted">{label}</p>
      {hint && <p className="mt-1 text-xs text-fg-subtle">{hint}</p>}
    </div>
  );
}

function Breakdown({ title, rows, empty }: { title: string; rows: Array<[string, string]>; empty: string }) {
  return (
    <section>
      <h2 className="text-lg font-medium">{title}</h2>
      {rows.length === 0 ? (
        <EmptyNote text={empty} />
      ) : (
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {rows.map(([k, v]) => (
            <li key={k} className="flex items-baseline justify-between gap-4 py-3">
              <p className="truncate text-sm font-mono">{k}</p>
              <p className="shrink-0 font-mono text-xs tabular-nums text-fg-muted">{v}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function EmptyNote({ text }: { text: string }) {
  return <p className="mt-3 text-sm text-fg-muted">{text}</p>;
}
