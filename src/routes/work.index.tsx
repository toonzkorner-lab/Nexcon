import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { Badge } from "@/components/ui/badge";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, creativeWorkNode, graph, organization } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  component: WorkPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.work.title,
      description: PAGE_COPY.work.description,
      path: "/work",
      site,
    });
  },
});

const FILTERS = ["All", "Web", "Bots", "Systems", "Brand"] as const;

function WorkPage() {
  const site = useSite();
  const { projects, settings } = site;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter, projects],
  );

  return (
    <div>
      <JsonLd
        data={graph([
          organization(settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          {
            "@type": "CollectionPage",
            name: PAGE_COPY.work.title,
            description: PAGE_COPY.work.description,
            hasPart: projects.map((p) => creativeWorkNode(p, settings)),
          },
        ])}
      />
      <PageHeader
        kicker="Work"
        title="Systems on the record."
        lede="Client and studio projects. Websites, Discord bots, hosting, and internal tools you can actually open."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Work" }]} />
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "h-10 rounded-full px-4 text-sm transition-colors duration-150",
                filter === f ? "bg-accent text-accent-fg" : "text-fg-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {list.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <img
                src={p.image}
                alt={p.imageAlt || `${p.title} — ${p.client} case study`}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <h2 className="mt-3 text-xl font-light">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.summary}</p>
                <p className="mt-3 font-mono text-[11px] text-fg-subtle">
                  {p.kind} · {p.year} · {p.stack.join(" / ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
