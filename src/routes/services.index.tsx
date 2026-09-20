import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { JsonLd } from "@/components/site/json-ld";
import { Crumbs } from "@/components/site/crumbs";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, graph, organization, serviceNode } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.services.title,
      description: PAGE_COPY.services.description,
      path: "/services",
      site,
    });
  },
});

function ServicesPage() {
  const site = useSite();
  const { services, settings } = site;
  const groups = [...new Set(services.map((s) => s.group))];
  return (
    <div>
      <JsonLd
        data={graph([
          organization(settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@type": "CollectionPage",
            name: PAGE_COPY.services.title,
            description: PAGE_COPY.services.description,
            hasPart: services.map((s) => serviceNode(s, settings)),
          },
        ])}
      />
      <PageHeader
        kicker="Services"
        title="Priced, scoped, and written down."
        lede="Build, automate, host, amplify. Custom web design and development, Discord and Telegram bots, managed hosting, and SEO — if it does not fit a line item, open a brief."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
        {groups.map((g) => (
          <section key={g} className="mt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">{g}</h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {services
                .filter((s) => s.group === g)
                .map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-medium">{s.name}</h3>
                      <p className="mt-1 max-w-xl text-sm text-fg-muted">{s.summary}</p>
                    </div>
                    <p className="font-mono text-sm tabular-nums text-fg-muted">
                      {formatUsd(s.price, { monthly: s.billing === "monthly" })}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
