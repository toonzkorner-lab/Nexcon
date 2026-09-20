import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, graph, organization } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/lab/")({
  component: LabPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.lab.title,
      description: PAGE_COPY.lab.description,
      path: "/lab",
      site,
    });
  },
});

function LabPage() {
  const { bots, settings } = useSite();
  return (
    <div>
      <JsonLd
        data={graph([
          organization(settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Lab", path: "/lab" },
          ]),
        ])}
      />
      <PageHeader
        kicker="Lab"
        title="Bots you can actually use."
        lede="Not a screenshot. Ledger is a live economy. Relay is a live desk. Both run in this page — the same patterns we deploy to Discord and Telegram."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Lab" }]} />
        {bots.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {bots.map((b) => (
              <Link
                key={b.slug}
                to="/lab/$slug"
                params={{ slug: b.slug }}
                className="rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                  {b.channel} · {b.kind === "chat" ? "live chat" : b.kind === "casino" ? "playable casino" : "playable ledger"}
                </p>
                <h2 className="mt-3 text-2xl font-light tracking-tight">{b.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{b.tagline}</p>
                <p className="mt-5 font-mono text-[11px] text-signal">Open demo</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-fg-muted">No demos published. The desk can add one in Bots.</p>
        )}
      </div>
    </div>
  );
}
