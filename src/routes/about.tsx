import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { Button } from "@/components/ui/button";
import { STACK_NOTES } from "@/data/studio";
import { useSite } from "@/lib/cms/use-site";
import { aboutGraph } from "@/lib/schema";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.about.title,
      description: PAGE_COPY.about.description,
      path: "/about",
      site,
    });
  },
});

const BRIEF = [
  { n: "01", t: "What", d: "Build, Automate, Host, Amplify — pick the lanes." },
  { n: "02", t: "Budget", d: "Under $500, $500–2k, $2k–8k, $8k+, or not sure." },
  { n: "03", t: "Timing", d: "ASAP, this month, this quarter, or exploring." },
  { n: "04", t: "Notes", d: "A paragraph. URL, Discord, what is broken, what “done” means." },
];

function AboutPage() {
  const site = useSite();
  const { settings, principles, engagements, projects, services } = site;
  const genesis = settings.genesis.split(/\n\n+/).filter(Boolean);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const catalog = services.filter((s) =>
    ["web-development", "web-design", "discord-bots", "premium-managed-cloud-hosting"].includes(s.slug),
  );
  const facts = [
    { k: "Based", v: [settings.city || "South Texas", settings.region].filter(Boolean).join(", ") },
    { k: "Desk", v: `${settings.deskDays} ${settings.deskHours}` },
    { k: "Zone", v: settings.zone },
    { k: "First reply", v: settings.sla },
  ];
  const stackNotes = settings.stack.map((name) => ({
    name,
    use: STACK_NOTES.find((s) => s.name === name)?.use ?? "In production here",
  }));

  return (
    <div>
      <JsonLd data={aboutGraph(site)} />
      <PageHeader
        kicker="About"
        title="One founder. The whole loop."
        lede={`${settings.founderName} runs ${settings.studioName} from ${settings.city || "South Texas"}: type, React, Postgres, Discord.js, deploy. Catalog from ${formatUsd(99)} bots to ${formatUsd(1250)} web development.`}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <img
            src="/images/studio-desk.jpg"
            alt={`${settings.founderName} at the ${settings.studioName} desk`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
          />
          <div className="self-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Founder</p>
            <h2 className="mt-2 text-3xl font-light tracking-tight">{settings.founderName}</h2>
            <p className="mt-1 text-sm text-fg-muted">{settings.founderTitle}</p>
            <p className="mt-5 text-base leading-relaxed text-fg-muted">{settings.founderBio}</p>
            <ul className="mt-6 space-y-2 text-sm text-fg-muted">
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-fg">
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={settings.discordUrl} className="hover:text-fg" target="_blank" rel="noreferrer">
                  Discord
                </a>
                {" · "}
                <a href={settings.telegramUrl} className="hover:text-fg" target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Genesis</p>
          <h2 className="mt-3 text-3xl font-light tracking-tight">Why the studio exists.</h2>
          <div className="mt-5 max-w-2xl space-y-4">
            {genesis.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="bg-bg px-5 py-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{f.k}</p>
              <p className="mt-2 text-sm text-fg">{f.v}</p>
            </div>
          ))}
        </section>

        {featured.length ? (
          <section className="mt-20">
            <h2 className="text-3xl font-light tracking-tight">On the record.</h2>
            <p className="mt-3 max-w-xl text-sm text-fg-muted">Named work, not a logo wall. Duration and stack are on each case.</p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-sm">{p.title}</span>
                    <span className="font-mono text-[11px] text-fg-subtle">
                      {p.year} · {p.duration} · {p.stack.slice(0, 3).join(" · ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {catalog.length ? (
          <section className="mt-20">
            <h2 className="text-3xl font-light tracking-tight">Catalog floors.</h2>
            <p className="mt-3 max-w-xl text-sm text-fg-muted">
              Starting prices for a bounded job. Auth, migrations, or a second language are scoped on top.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {catalog.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="text-sm">{s.name}</span>
                    <span className="font-mono text-[11px] tabular-nums text-fg-subtle">
                      {formatUsd(s.price, { monthly: s.billing === "monthly" })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-20">
          <h2 className="text-3xl font-light tracking-tight">How we decide.</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.id}>
                <p className="font-mono text-[11px] text-fg-subtle">{p.num}</p>
                <h3 className="mt-3 text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-light tracking-tight">A brief is four questions.</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BRIEF.map((b) => (
              <li key={b.n}>
                <p className="font-mono text-[11px] text-fg-subtle">{b.n}</p>
                <h3 className="mt-3 text-lg">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{b.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-light tracking-tight">How a job is billed.</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {engagements.map((e) => (
              <article key={e.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{e.rangeLabel}</p>
                <h3 className="mt-2 text-xl font-light">{e.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{e.body}</p>
                {e.includes.length ? (
                  <ul className="mt-4 space-y-1.5">
                    {e.includes.map((i) => (
                      <li key={i} className="font-mono text-[11px] text-fg-subtle">
                        {i}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light tracking-tight">Stack we actually use</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {stackNotes.map((s) => (
              <li key={s.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-mono text-sm">{s.name}</span>
                <span className="text-sm text-fg-muted">{s.use}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 max-w-xl text-sm leading-relaxed text-fg-muted">
          Pipeline, in-scope work, and FAQ live on{" "}
          <Link to="/studio" className="text-fg hover:underline">
            Studio
          </Link>
          . This page is the person and the numbers.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/book">Open a brief</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
