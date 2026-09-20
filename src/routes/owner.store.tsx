import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, SeoFields, TextField, Toggle } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import { ownerDeleteProduct, ownerSaveProduct } from "@/lib/cms/owner";
import { lines, slugify } from "@/lib/cms/parse";
import type { Product } from "@/lib/cms/types";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/store")({ component: Page });

const empty = (): Product => ({
  slug: "",
  name: "",
  price: 0,
  blurb: "",
  description: "",
  includes: [],
  stack: [],
  published: true,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
});

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [current, setCurrent] = useState<Product | null>(null);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!current?.name) return;
    const row = { ...current, slug: current.slug || slugify(current.name) };
    setBusy(true);
    const res = await ownerSaveProduct({ data: row });
    setBusy(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Product saved.");
    setCurrent(null);
    await router.invalidate();
  }

  async function remove(slug: string) {
    if (!confirm("Delete this product?")) return;
    const res = await ownerDeleteProduct({ data: { slug } });
    if (!res.ok) return toast.error(res.error);
    toast.success("Deleted.");
    setCurrent(null);
    await router.invalidate();
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Store</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Digital goods.</h1>
        </div>
        <Button onClick={() => setCurrent(empty())}>New product</Button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="divide-y divide-border border-y border-border">
          {site.products.map((p) => (
            <li key={p.slug}>
              <button type="button" onClick={() => setCurrent({ ...p })} className="flex w-full justify-between py-3 text-left">
                <span className="text-sm">{p.name}</span>
                <span className="font-mono text-[11px] text-fg-subtle">${p.price}</span>
              </button>
            </li>
          ))}
        </ul>
        {current ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); void save(); }}>
            <TextField label="Name" value={current.name} onChange={(v) => setCurrent({ ...current, name: v })} />
            <TextField label="Slug" value={current.slug} onChange={(v) => setCurrent({ ...current, slug: slugify(v) })} />
            <TextField label="Price USD" type="number" value={current.price} onChange={(v) => setCurrent({ ...current, price: Number(v) })} />
            <AreaField label="Blurb" value={current.blurb} onChange={(v) => setCurrent({ ...current, blurb: v })} rows={2} />
            <AreaField label="Description" value={current.description} onChange={(v) => setCurrent({ ...current, description: v })} />
            <AreaField label="Includes" value={current.includes.join("\n")} onChange={(v) => setCurrent({ ...current, includes: lines(v) })} hint="One per line." />
            <TextField label="Stack" value={current.stack.join(", ")} onChange={(v) => setCurrent({ ...current, stack: lines(v.replaceAll(",", "\n")) })} />
            <Toggle label="Published" checked={current.published} onChange={(v) => setCurrent({ ...current, published: v })} />
            <SeoFields
              title={current.seoTitle}
              description={current.seoDescription}
              onTitle={(v) => setCurrent({ ...current, seoTitle: v })}
              onDescription={(v) => setCurrent({ ...current, seoDescription: v })}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              {site.products.some((p) => p.slug === current.slug) ? (
                <Button type="button" variant="danger" onClick={() => void remove(current.slug)}>Delete</Button>
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setCurrent(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-fg-muted">Select a product. Checkout still queues an order for you to fulfill.</p>
        )}
      </div>
    </div>
  );
}
