import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, graph, organization, productNode } from "@/lib/schema";
import { listingDescription, listingTitle, pageHead, siteFromMatches } from "@/lib/seo";
import { formatUsd } from "@/lib/utils";
import { useCart } from "@/stores/cart";

export const Route = createFileRoute("/store/$slug")({
  component: ProductPage,
  loader: ({ params, context }) => {
    const product = context.site.products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ matches, loaderData }) => {
    const site = siteFromMatches(matches);
    const product = loaderData;
    if (!product) {
      // Loader threw notFound(): emit nothing indexable for the missing slug.
      return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    }
    return pageHead({
      title: listingTitle(product, product.name),
      description: listingDescription(product, product.blurb),
      path: `/store/${product.slug}`,
      site,
      type: "product",
    });
  },
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { products, settings, bots } = useSite();
  const add = useCart((s) => s.add);
  const more = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const demo = bots.find((b) => b.productSlug === product.slug);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={graph([
          organization(settings),
          productNode(product, settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Store", path: "/store" },
            { name: product.name, path: `/store/${product.slug}` },
          ]),
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Store", to: "/store" },
          { label: product.name },
        ]}
      />
      <Link to="/store" className="mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Store
      </Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{product.stack.join(" · ")}</p>
          <h1 className="mt-3 text-4xl font-light tracking-tight">{product.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">{product.description}</p>
          <ul className="mt-8 space-y-3">
            {product.includes.map((i) => (
              <li key={i} className="flex gap-3 text-sm">
                <Check className="mt-0.5 size-4 text-signal" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
          <p className="font-mono text-3xl tabular-nums">{formatUsd(product.price)}</p>
          <p className="mt-2 text-sm text-fg-muted">Digital good. License for one production use unless noted.</p>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              add({
                id: `prd-${product.slug}`,
                kind: "product",
                name: product.name,
                price: product.price,
                billing: "one-off",
              });
              toast.success(`${product.name} added to cart`);
            }}
          >
            Add to cart
          </Button>
          {demo ? (
            <Button variant="secondary" className="mt-2 w-full" asChild>
              <Link to="/lab/$slug" params={{ slug: demo.slug }}>
                Try live demo
              </Link>
            </Button>
          ) : null}
        </aside>
      </div>
      {more.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-medium">More from the store</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {more.map((p) => (
              <li key={p.slug}>
                <Link to="/store/$slug" params={{ slug: p.slug }} className="flex justify-between gap-4 py-3 text-sm">
                  <span>{p.name}</span>
                  <span className="font-mono text-[11px] text-fg-subtle">{formatUsd(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
