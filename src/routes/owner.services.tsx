import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, SeoFields, TextField, Toggle } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import { ownerDeleteService, ownerSaveService } from "@/lib/cms/owner";
import { lines, slugify } from "@/lib/cms/parse";
import type { Service } from "@/lib/cms/types";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/services")({ component: Page });

const empty = (): Service => ({
  slug: "",
  name: "",
  group: "Build",
  summary: "",
  description: "",
  price: 0,
  billing: "one-off",
  hoursNote: "",
  features: [],
  deliverables: [],
  timeline: "",
  sortOrder: 0,
  published: true,
  seoTitle: "",
  seoDescription: "",
});

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [current, setCurrent] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!current?.name) return;
    const row: Service = {
      ...current,
      slug: current.slug || slugify(current.name),
      features: current.features,
      deliverables: current.deliverables,
    };
    setBusy(true);
    const res = await ownerSaveService({ data: row });
    setBusy(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Service saved. Live on the public catalog.");
    setCurrent(null);
    await router.invalidate();
  }

  async function remove(slug: string) {
    if (!confirm("Delete this service from the public catalog?")) return;
    const res = await ownerDeleteService({ data: { slug } });
    if (!res.ok) return toast.error(res.error);
    toast.success("Deleted.");
    setCurrent(null);
    await router.invalidate();
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Services</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Catalog.</h1>
        </div>
        <Button onClick={() => setCurrent(empty())}>New service</Button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="divide-y divide-border border-y border-border">
          {site.services.map((s) => (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => setCurrent({ ...s })}
                className="flex w-full items-baseline justify-between py-3 text-left"
              >
                <span className="text-sm">{s.name}</span>
                <span className="font-mono text-[11px] text-fg-subtle">{s.published ? s.group : "hidden"}</span>
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
            <TextField label="Name" value={current.name} onChange={(v) => setCurrent({ ...current, name: v })} />
            <TextField label="Slug" value={current.slug} onChange={(v) => setCurrent({ ...current, slug: slugify(v) })} />
            <TextField label="Group (Build / Automate / Host / Amplify)" value={current.group} onChange={(v) => setCurrent({ ...current, group: v })} />
            <TextField label="Price USD" type="number" value={current.price} onChange={(v) => setCurrent({ ...current, price: Number(v) })} />
            <TextField
              label="Billing"
              value={current.billing}
              onChange={(v) => setCurrent({ ...current, billing: v === "monthly" ? "monthly" : "one-off" })}
            />
            <TextField label="Hours note" value={current.hoursNote ?? ""} onChange={(v) => setCurrent({ ...current, hoursNote: v })} />
            <TextField label="Timeline" value={current.timeline} onChange={(v) => setCurrent({ ...current, timeline: v })} />
            <TextField label="Sort" type="number" value={current.sortOrder} onChange={(v) => setCurrent({ ...current, sortOrder: Number(v) })} />
            <AreaField label="Summary" value={current.summary} onChange={(v) => setCurrent({ ...current, summary: v })} rows={3} />
            <AreaField label="Description" value={current.description} onChange={(v) => setCurrent({ ...current, description: v })} />
            <AreaField
              label="Features"
              value={current.features.join("\n")}
              onChange={(v) => setCurrent({ ...current, features: lines(v) })}
              hint="One per line."
            />
            <AreaField
              label="Deliverables"
              value={current.deliverables.join("\n")}
              onChange={(v) => setCurrent({ ...current, deliverables: lines(v) })}
              hint="One per line."
            />
            <Toggle label="Published" checked={current.published} onChange={(v) => setCurrent({ ...current, published: v })} />
            <SeoFields
              title={current.seoTitle}
              description={current.seoDescription}
              onTitle={(v) => setCurrent({ ...current, seoTitle: v })}
              onDescription={(v) => setCurrent({ ...current, seoDescription: v })}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              {current.slug && site.services.some((s) => s.slug === current.slug) ? (
                <Button type="button" variant="danger" onClick={() => void remove(current.slug)}>
                  Delete
                </Button>
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setCurrent(null)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-fg-muted">Select a service or create one. Prices and copy go live immediately.</p>
        )}
      </div>
    </div>
  );
}
