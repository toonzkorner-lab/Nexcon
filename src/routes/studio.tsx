import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/cms/use-site";
import { studioGraph } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.studio.title,
      description: PAGE_COPY.studio.description,
      path: "/studio",
      site,
    });
  },
});

function StudioPage() {
  const site = useSite();
  const { settings, principles, pipeline, faqs, capabilities, engagements } = site;
  return (
    <div>
      <JsonLd data={studioGraph(site)} />
      <PageHeader
        kicker="Studio"
        title="An architectural firm for the internet — without the pitch deck."
        lede={`${settings.studioName} exists to close the gap between how a thing looks and whether it stays up. Founded and run by ${settings.founderName}.`}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Studio" }]} />
        <p className="mt-6 max-w-xl text-sm text-fg-muted">
          The person is on{" "}
          <Link to="/about" className="text-fg hover:underline">
            About
          </Link>
          . This page is how the desk runs.
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <img
            src="/images/studio-desk.jpg"
            alt={`${settings.studioName} desk — sketches, laptop, and lamp`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
          />
          <div className="self-center">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Founder</p>
            <h2 className="mt-2 text-3xl font-light">{settings.founderName}</h2>
            <p className="mt-1 text-sm text-fg-muted">{settings.founderTitle}</p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">{settings.founderBio}</p>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-light tracking-tight">Genesis</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{settings.genesis}</p>
        </section>

        <section className="mt-16 grid gap-8 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.id}>
              <p className="font-mono text-[11px] text-fg-subtle">{p.num}</p>
              <h3 className="mt-3 text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light tracking-tight">How we engage</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {engagements.map((e) => (
              <article key={e.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{e.rangeLabel}</p>
                <h3 className="mt-2 text-xl font-light">{e.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{e.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light tracking-tight">Pipeline</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((p) => (
              <li key={p.id}>
                <p className="font-mono text-[11px] text-fg-subtle">{p.num}</p>
                <h3 className="mt-3 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light tracking-tight">In scope / not</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {capabilities.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between gap-4 py-3">
                <p className="text-sm">{c.area}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  {c.inScope ? "In" : "Out"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light tracking-tight">Stack we actually use</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {settings.stack.map((s) => (
              <li
                key={s}
                className="rounded-full px-3 py-1.5 font-mono text-xs text-fg-muted shadow-[var(--shadow-border)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light tracking-tight">FAQ</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.id} className="group py-4">
                <summary className="cursor-pointer list-none text-base font-medium">
                  {f.question}
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/book">Open a brief</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/work">See the work</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
