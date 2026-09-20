import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { articleNode, breadcrumbs, graph, organization } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/journal/")({
  component: JournalPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.journal.title,
      description: PAGE_COPY.journal.description,
      path: "/journal",
      site,
    });
  },
});

function JournalPage() {
  const { posts, settings } = useSite();
  return (
    <div>
      <JsonLd
        data={graph([
          organization(settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
          ]),
          {
            "@type": "CollectionPage",
            name: PAGE_COPY.journal.title,
            description: PAGE_COPY.journal.description,
            hasPart: posts.map((p) => articleNode(p, settings)),
          },
        ])}
      />
      <PageHeader
        kicker="Journal"
        title="Notes from the desk."
        lede="How we actually work — bots, type, hiring, and the difference between dark and neon."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Journal" }]} />
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {posts.map((p) => (
            <li key={p.slug} className="py-7">
              <Link to="/journal/$slug" params={{ slug: p.slug }} className="block">
                <p className="font-mono text-[11px] text-fg-subtle">
                  {p.date} · {p.reading} · {p.tags.join(" / ")}
                </p>
                <h2 className="mt-2 text-2xl font-light tracking-tight">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
