import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { breadcrumbs, creativeWorkNode, graph, organization } from "@/lib/schema";
import { listingDescription, listingTitle, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  component: ProjectPage,
  loader: ({ params, context }) => {
    const project = context.site.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ matches, loaderData }) => {
    const site = siteFromMatches(matches);
    const project = loaderData;
    if (!project) {
      // Loader threw notFound(): emit nothing indexable for the missing slug.
      return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    }
    return pageHead({
      title: listingTitle(project, project.title),
      description: listingDescription(project, `${project.title} case study from ${site.settings.studioName}.`),
      path: `/work/${project.slug}`,
      site,
      image: project.image,
    });
  },
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const { projects, settings } = useSite();
  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const related = projects.filter((p) => p.slug !== project.slug && p.tags.some((t) => project.tags.includes(t))).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd
        data={graph([
          organization(settings),
          creativeWorkNode(project, settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Work", to: "/work" },
          { label: project.title },
        ]}
      />
      <Link to="/work" className="mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Work
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{project.summary}</p>
        </div>
        <dl className="grid grid-cols-2 gap-6 self-end text-sm">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Client</dt>
            <dd className="mt-1">{project.client}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Year</dt>
            <dd className="mt-1">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Duration</dt>
            <dd className="mt-1">{project.duration}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Stack</dt>
            <dd className="mt-1">{project.stack.join(", ")}</dd>
          </div>
        </dl>
      </div>
      <img
        src={project.image}
        alt={project.imageAlt || `${project.title} — ${project.client}`}
        width={1600}
        height={900}
        decoding="async"
        className="mt-12 aspect-[16/9] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
      />
      {project.metrics.length ? (
        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-bg-elevated px-5 py-6">
              <p className="font-mono text-2xl tabular-nums">{m.value}</p>
              <p className="mt-1 text-sm text-fg-muted">{m.label}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mx-auto mt-16 grid max-w-3xl gap-10">
        <section>
          <h2 className="text-xl font-medium">Problem</h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium">Approach</h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">{project.approach}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium">Outcome</h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">{project.outcome}</p>
        </section>
      </div>
      {related.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-medium">More work</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {related.map((p) => (
              <li key={p.slug}>
                <Link to="/work/$slug" params={{ slug: p.slug }} className="flex justify-between gap-4 py-3 text-sm">
                  <span>{p.title}</span>
                  <span className="font-mono text-[11px] text-fg-subtle">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="mt-20 flex items-center justify-between gap-4 border-t border-border pt-8">
        {prev ? (
          <Link to="/work/$slug" params={{ slug: prev.slug }} className="text-sm text-fg-muted hover:text-fg">
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/work/$slug" params={{ slug: next.slug }} className="text-sm text-fg-muted hover:text-fg">
            {next.title} →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
