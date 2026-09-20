import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSite } from "@/lib/cms/use-site";
import { formatUsd } from "@/lib/utils";
import { pageHead } from "@/lib/head";
import { JsonLd } from "@/components/site/json-ld";
import { homeGraph } from "@/lib/schema";
import { PAGE_COPY, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: site.settings.seoTitle || PAGE_COPY.home.title,
      description: site.settings.seoDescription || PAGE_COPY.home.description,
      path: "/",
      site,
      home: true,
    });
  },
});

const DS = [
  {
    k: "01",
    title: "Design",
    body: "Type, surface, one accent. Interfaces that look like the business — not a theme with extra steps.",
  },
  {
    k: "02",
    title: "Development",
    body: "React, Node, Postgres. Bots that remember. APIs with a contract. Code a year from now can still read.",
  },
  {
    k: "03",
    title: "Deployment",
    body: "Live, patched, backed up. Hosting for sites and bots so you are not SSH-ing at midnight.",
  },
];

function Home() {
  const site = useSite();
  const { settings, services, projects, reviews, pipeline, engagements, bots } = site;
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const snapshot = services.filter((s) =>
    ["web-development", "web-design", "discord-bots", "premium-managed-cloud-hosting"].includes(s.slug),
  );
  const stats = [
    { value: String(projects.length), label: "Public systems", hint: "Work on the record" },
    { value: String(services.length), label: "Service lines", hint: "Priced in the catalog" },
    { value: "24h", label: "First response", hint: settings.sla },
    { value: "3 D's", label: "The loop", hint: settings.tagline },
  ];

  return (
    <div>
      <JsonLd data={homeGraph(site)} />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-fade opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pt-28">
          <div>
            <Badge>Studio · {settings.city || "South Texas"}</Badge>
            <h1 className="mt-6 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] font-light tracking-tight">
              Design.
              <br />
              Development.
              <br />
              Deployment.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted">
              {settings.studioName} — {settings.founderName}, {settings.city || "South Texas"}. Sites, Discord and Telegram bots, hosting. Catalog from $99 bots to $1,250 web development. One desk for the 3 D’s.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/book">
                  Open a brief
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/work">View work</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated">
            <img
              src="/images/hero-studio.jpg"
              alt="N3xUs Konc3pt'z studio desk at night — dual monitors, concrete, a quiet workspace"
              width={1600}
              height={1100}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/11] h-full w-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg to-transparent px-4 py-4">
              <span className="font-mono text-[11px] tracking-wider text-fg">SYS · OPERATIONAL</span>
              <span className="font-mono text-[11px] text-signal">CORE LIVE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-r border-b border-border px-4 py-6 last:border-r-0 md:border-b-0 md:px-6">
              <p className="font-mono text-2xl tabular-nums text-fg sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-sm text-fg">{s.label}</p>
              <p className="mt-1 text-xs text-fg-subtle">{s.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">The 3 D’s</p>
        <h2 className="mt-3 max-w-xl text-3xl font-light tracking-tight sm:text-4xl">
          One studio, three jobs, no handoff tax.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-3">
          {DS.map((d) => (
            <article key={d.k} className="bg-bg-elevated p-6 sm:p-8">
              <p className="font-mono text-[11px] text-fg-subtle">{d.k}</p>
              <h3 className="mt-4 text-2xl font-light">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Engagement</p>
        <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">How the work is bought.</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border lg:grid-cols-3">
          {engagements.map((e) => (
            <article key={e.id} className="bg-bg p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{e.rangeLabel}</p>
              <h3 className="mt-3 text-2xl font-light">{e.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{e.body}</p>
              <ul className="mt-5 space-y-1.5 text-sm text-fg-muted">
                {e.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Work</p>
            <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">Systems on the record.</h2>
          </div>
          <Link to="/work" className="hidden items-center gap-1 text-sm text-fg-muted hover:text-fg sm:inline-flex">
            All work <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <img
                src={p.image}
                alt={p.imageAlt || `${p.title} case study`}
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  {p.kind} · {p.year}
                </p>
                <h3 className="mt-2 text-xl font-light">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Services</p>
            <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">A catalog, not a mystery.</h2>
          </div>
          <Link to="/services" className="hidden items-center gap-1 text-sm text-fg-muted hover:text-fg sm:inline-flex">
            All services <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {(snapshot.length ? snapshot : services.slice(0, 4)).map((s) => (
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Pipeline</p>
        <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">Four phases. No theatre.</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((p) => (
            <li key={p.id}>
              <p className="font-mono text-[11px] text-fg-subtle">{p.num}</p>
              <h3 className="mt-3 text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Lab</p>
            <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">Bots you can use, not watch.</h2>
          </div>
          <Link to="/lab" className="hidden items-center gap-1 text-sm text-fg-muted hover:text-fg sm:inline-flex">
            All demos <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {bots.slice(0, 3).map((b) => (
            <Link
              key={b.slug}
              to="/lab/$slug"
              params={{ slug: b.slug }}
              className="rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{b.channel}</p>
              <h3 className="mt-3 text-2xl font-light">{b.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{b.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Transmissions</p>
            <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">From people who shipped with us.</h2>
          </div>
          <Link to="/transmissions" className="hidden text-sm text-fg-muted hover:text-fg sm:inline">
            All reviews
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {reviews.slice(0, 4).map((r) => (
            <blockquote key={r.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
              <p className="text-base leading-relaxed text-fg">“{r.quote}”</p>
              <footer className="mt-5 text-sm text-fg-muted">
                {r.name} · {r.role}, {r.company}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-bg-elevated px-6 py-12 sm:px-12">
          <h2 className="max-w-lg text-3xl font-light tracking-tight sm:text-4xl">
            Ready when you have a real problem — not a moodboard.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
            Send a brief. We answer within a day on weekdays, often faster on Discord. If we are the wrong studio, we will say so.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/book">
                Open a brief <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
