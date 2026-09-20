import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BotPlayground } from "@/components/lab/playground";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, graph, organization } from "@/lib/schema";
import { listingDescription, listingTitle, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/lab/$slug")({
  component: DemoPage,
  loader: ({ params, context }) => {
    const bot = context.site.bots.find((b) => b.slug === params.slug);
    if (!bot) throw notFound();
    return bot;
  },
  head: ({ matches, loaderData }) => {
    const site = siteFromMatches(matches);
    const bot = loaderData;
    if (!bot) {
      // Loader threw notFound(): emit nothing indexable for the missing slug.
      return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    }
    return pageHead({
      title: listingTitle(bot, bot.name),
      description: listingDescription(bot, bot.tagline),
      path: `/lab/${bot.slug}`,
      site,
    });
  },
});

function DemoPage() {
  const bot = Route.useLoaderData();
  const { bots, products, settings } = useSite();
  const product = products.find((p) => p.slug === bot.productSlug);
  const others = bots.filter((b) => b.slug !== bot.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={graph([
          organization(settings),
          {
            "@type": "SoftwareApplication",
            name: bot.name,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            description: bot.description,
            url: `https://n3xuskonc3ptz.com/lab/${bot.slug}`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Lab", path: "/lab" },
            { name: bot.name, path: `/lab/${bot.slug}` },
          ]),
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Lab", to: "/lab" },
          { label: bot.name },
        ]}
      />
      <Link to="/lab" className="mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Lab
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
            {bot.channel} · {bot.kind === "chat" ? "conversational" : "playable"}
          </p>
          <h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">{bot.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{bot.description}</p>
          {bot.commands.length ? (
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {bot.commands.map((c) => (
                <div key={c.cmd} className="rounded-[var(--radius-md)] px-3 py-3 shadow-[var(--shadow-border)]">
                  <dt className="font-mono text-sm">{c.cmd}</dt>
                  <dd className="mt-1 text-xs text-fg-muted">{c.hint}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {product ? (
            <p className="mt-8 text-sm text-fg-muted">
              Ships as{" "}
              <Link to="/store/$slug" params={{ slug: product.slug }} className="text-fg hover:underline">
                {product.name}
              </Link>
              .
            </p>
          ) : null}
        </div>
        <BotPlayground bot={bot} />
      </div>

      {others.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-medium">Other demos</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {others.map((b) => (
              <li key={b.slug}>
                <Link to="/lab/$slug" params={{ slug: b.slug }} className="flex justify-between gap-4 py-3 text-sm">
                  <span>{b.name}</span>
                  <span className="font-mono text-[11px] text-fg-subtle">{b.channel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
