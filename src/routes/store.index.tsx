import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, graph, organization, productNode } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/store/")({
  component: StorePage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.store.title,
      description: PAGE_COPY.store.description,
      path: "/store",
      site,
    });
  },
});

function StorePage() {
  const { products, settings } = useSite();
  return (
    <div>
      <JsonLd
        data={graph([
          organization(settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Store", path: "/store" },
          ]),
          {
            "@type": "CollectionPage",
            name: PAGE_COPY.store.title,
            description: PAGE_COPY.store.description,
            hasPart: products.map((p) => productNode(p, settings)),
          },
        ])}
      />
      <PageHeader
        kicker="Store"
        title="Tools we already built — yours to run."
        lede="Templates and themes. No license maze. Add to cart; fulfillment is queued to the channel you give us."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 sm:grid-cols-2 sm:px-6">
        {products.map((p) => (
          <Link
            key={p.slug}
            to="/store/$slug"
            params={{ slug: p.slug }}
            className="rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{p.stack.join(" · ")}</p>
            <h2 className="mt-3 text-xl font-light">{p.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.blurb}</p>
            <p className="mt-6 font-mono text-sm tabular-nums">{formatUsd(p.price)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
