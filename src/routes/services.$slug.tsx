import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, graph, organization, serviceNode } from "@/lib/schema";
import { listingDescription, listingTitle, pageHead, siteFromMatches } from "@/lib/seo";
import { formatUsd } from "@/lib/utils";
import { useCart } from "@/stores/cart";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  loader: ({ params, context }) => {
    const service = context.site.services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ matches, loaderData }) => {
    const site = siteFromMatches(matches);
    const service = loaderData;
    if (!service) {
      // Loader threw notFound(): emit nothing indexable for the missing slug.
      return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    }
    return pageHead({
      title: `${listingTitle(service, service.name)}`,
      description: listingDescription(service, `${service.name} from ${site.settings.studioName}. ${service.summary}`),
      path: `/services/${service.slug}`,
      site,
    });
  },
});

function ServiceDetail() {
  const service = Route.useLoaderData();
  const { services, settings } = useSite();
  const add = useCart((s) => s.add);
  const related = services.filter((s) => s.slug !== service.slug && s.group === service.group).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={graph([
          organization(settings),
          serviceNode(service, settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.name },
        ]}
      />
      <Link to="/services" className="mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Services
      </Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Badge>{service.group}</Badge>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">{service.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{service.description}</p>
          {service.hoursNote ? <p className="mt-3 text-sm text-fg-subtle">{service.hoursNote}</p> : null}
          <ul className="mt-10 space-y-3">
            {service.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-fg">
                <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            {service.billing === "monthly" ? "Subscription" : "Starting at"}
          </p>
          <p className="mt-2 font-mono text-3xl tabular-nums">
            {formatUsd(service.price, { monthly: service.billing === "monthly" })}
          </p>
          <p className="mt-2 text-sm text-fg-muted">Timeline: {service.timeline}</p>
          <div className="mt-6 flex flex-col gap-2">
            <Button
              onClick={() => {
                add({
                  id: `svc-${service.slug}`,
                  kind: "service",
                  name: service.name,
                  price: service.price,
                  billing: service.billing,
                });
                toast.success(`${service.name} added to cart`);
              }}
            >
              Add to cart
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/book">Discuss a custom scope</Link>
            </Button>
          </div>
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Deliverables</p>
            <ul className="mt-3 space-y-2 text-sm text-fg-muted">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {related.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-medium">Also in {service.group}</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {related.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="flex justify-between gap-4 py-3 text-sm">
                  <span>{s.name}</span>
                  <span className="font-mono text-[11px] text-fg-subtle">
                    {formatUsd(s.price, { monthly: s.billing === "monthly" })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
