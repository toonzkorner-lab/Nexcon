import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, SeoFields, TextField, Toggle } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import { ownerDeleteProject, ownerSaveProject } from "@/lib/cms/owner";
import { lines, parseMetrics, serializeMetrics, slugify } from "@/lib/cms/parse";
import type { Project } from "@/lib/cms/types";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/work")({ component: Page });

const empty = (): Project => ({
  slug: "",
  title: "",
  client: "",
  kind: "Client",
  year: String(new Date().getFullYear()),
  duration: "",
  role: "",
  tags: [],
  stack: [],
  summary: "",
  problem: "",
  approach: "",
  outcome: "",
  metrics: [],
  image: "/images/hero-studio.jpg",
  imageAlt: "",
  featured: false,
  published: true,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
});

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [current, setCurrent] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!current?.title) return;
    const row = { ...current, slug: current.slug || slugify(current.title) };
    setBusy(true);
    const res = await ownerSaveProject({ data: row });
    setBusy(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Project saved.");
    setCurrent(null);
    await router.invalidate();
  }

  async function remove(slug: string) {
    if (!confirm("Delete this project?")) return;
    const res = await ownerDeleteProject({ data: { slug } });
    if (!res.ok) return toast.error(res.error);
    toast.success("Deleted.");
    setCurrent(null);
    await router.invalidate();
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Work</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Case studies.</h1>
        </div>
        <Button onClick={() => setCurrent(empty())}>New project</Button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="divide-y divide-border border-y border-border">
          {site.projects.map((p) => (
            <li key={p.slug}>
              <button type="button" onClick={() => setCurrent({ ...p })} className="flex w-full justify-between py-3 text-left">
                <span className="text-sm">{p.title}</span>
                <span className="font-mono text-[11px] text-fg-subtle">{p.year}</span>
              </button>
            </li>
          ))}
        </ul>
        {current ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
          >
            <TextField label="Title" value={current.title} onChange={(v) => setCurrent({ ...current, title: v })} />
            <TextField label="Slug" value={current.slug} onChange={(v) => setCurrent({ ...current, slug: slugify(v) })} />
            <TextField label="Client" value={current.client} onChange={(v) => setCurrent({ ...current, client: v })} />
            <TextField label="Kind (Client / Studio)" value={current.kind} onChange={(v) => setCurrent({ ...current, kind: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Year" value={current.year} onChange={(v) => setCurrent({ ...current, year: v })} />
              <TextField label="Duration" value={current.duration} onChange={(v) => setCurrent({ ...current, duration: v })} />
            </div>
            <TextField label="Role" value={current.role} onChange={(v) => setCurrent({ ...current, role: v })} />
            <TextField label="Image path or URL" value={current.image} onChange={(v) => setCurrent({ ...current, image: v })} />
            <TextField label="Image alt text" value={current.imageAlt} onChange={(v) => setCurrent({ ...current, imageAlt: v })} />
            <TextField label="Tags" value={current.tags.join(", ")} onChange={(v) => setCurrent({ ...current, tags: lines(v.replaceAll(",", "\n")) })} />
            <TextField label="Stack" value={current.stack.join(", ")} onChange={(v) => setCurrent({ ...current, stack: lines(v.replaceAll(",", "\n")) })} />
            <AreaField label="Summary" value={current.summary} onChange={(v) => setCurrent({ ...current, summary: v })} rows={3} />
            <AreaField label="Problem" value={current.problem} onChange={(v) => setCurrent({ ...current, problem: v })} />
            <AreaField label="Approach" value={current.approach} onChange={(v) => setCurrent({ ...current, approach: v })} />
            <AreaField label="Outcome" value={current.outcome} onChange={(v) => setCurrent({ ...current, outcome: v })} />
            <AreaField
              label="Metrics"
              value={serializeMetrics(current.metrics)}
              onChange={(v) => setCurrent({ ...current, metrics: parseMetrics(v) })}
              hint="One per line: 6w | Brief to launch"
            />
            <Toggle label="Featured on home" checked={current.featured} onChange={(v) => setCurrent({ ...current, featured: v })} />
            <Toggle label="Published" checked={current.published} onChange={(v) => setCurrent({ ...current, published: v })} />
            <SeoFields
              title={current.seoTitle}
              description={current.seoDescription}
              onTitle={(v) => setCurrent({ ...current, seoTitle: v })}
              onDescription={(v) => setCurrent({ ...current, seoDescription: v })}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              {site.projects.some((p) => p.slug === current.slug) ? (
                <Button type="button" variant="danger" onClick={() => void remove(current.slug)}>Delete</Button>
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setCurrent(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-fg-muted">Select a case study. Image can be /images/… or any https URL.</p>
        )}
      </div>
    </div>
  );
}
