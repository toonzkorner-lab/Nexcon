import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ownerDeleteCoupon, ownerListCoupons, ownerSaveCoupon } from "@/lib/owner-coupons";
import type { Coupon } from "@/lib/coupons";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/owner/promos")({
  loader: () => ownerListCoupons(),
  component: PromosPage,
});

type Form = {
  code: string;
  kind: "percent" | "fixed";
  value: string;
  minTotal: string;
  maxUses: string;
  startsAt: string;
  endsAt: string;
  active: boolean;
};

const EMPTY: Form = {
  code: "",
  kind: "percent",
  value: "10",
  minTotal: "",
  maxUses: "",
  startsAt: "",
  endsAt: "",
  active: true,
};

function toForm(c: Coupon): Form {
  const dt = (iso: string | null) =>
    iso ? new Date(iso).toISOString().slice(0, 16) : "";
  return {
    code: c.code,
    kind: c.kind,
    value: String(c.value),
    minTotal: c.minTotal ? String(c.minTotal) : "",
    maxUses: c.maxUses !== null ? String(c.maxUses) : "",
    startsAt: dt(c.startsAt),
    endsAt: dt(c.endsAt),
    active: c.active,
  };
}

function valueLabel(c: Coupon): string {
  return c.kind === "percent" ? `${c.value}% off` : `${formatUsd(c.value)} off`;
}

function windowLabel(c: Coupon): string {
  const d = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString() : null;
  const s = d(c.startsAt);
  const e = d(c.endsAt);
  if (s && e) return `${s} → ${e}`;
  if (s) return `from ${s}`;
  if (e) return `until ${e}`;
  return "always";
}

function PromosPage() {
  const coupons = Route.useLoaderData();
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(c: Coupon) {
    setEditing(c.code);
    setForm(toForm(c));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditing(null);
    setForm(EMPTY);
  }

  async function save() {
    setBusy(true);
    try {
      await ownerSaveCoupon({
        data: {
          code: form.code,
          kind: form.kind,
          value: Number(form.value),
          minTotal: form.minTotal ? Number(form.minTotal) : 0,
          maxUses: form.maxUses ? Number(form.maxUses) : null,
          startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
          endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null,
          active: form.active,
        },
      });
      toast.success(editing ? "Coupon updated." : "Coupon created.");
      reset();
      await router.invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the coupon.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(code: string) {
    if (!window.confirm(`Delete coupon ${code}?`)) return;
    await ownerDeleteCoupon({ data: { code } });
    toast.success("Deleted.");
    if (editing === code) reset();
    await router.invalidate();
  }

  async function toggle(c: Coupon) {
    await ownerSaveCoupon({
      data: {
        code: c.code,
        kind: c.kind,
        value: c.value,
        minTotal: c.minTotal,
        maxUses: c.maxUses,
        startsAt: c.startsAt,
        endsAt: c.endsAt,
        active: !c.active,
      },
    });
    await router.invalidate();
  }

  return (
    <div className="space-y-14">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Promos</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight">Coupon codes.</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Percent or fixed-amount discounts for the store. Codes are uppercase, validated
          server-side at checkout, and usage is counted atomically.
        </p>
      </header>

      <section className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
        <h2 className="text-lg font-medium">{editing ? `Edit ${editing}` : "New coupon"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="promo-code">Code</Label>
            <Input
              id="promo-code"
              value={form.code}
              onChange={(e) => set("code", e.target.value.toUpperCase())}
              placeholder="WELCOME10"
              className="uppercase"
              disabled={editing !== null}
            />
          </div>
          <div>
            <Label htmlFor="promo-kind">Type</Label>
            <select
              id="promo-kind"
              value={form.kind}
              onChange={(e) => set("kind", e.target.value as Form["kind"])}
              className="h-11 w-full rounded-[var(--radius-sm)] bg-transparent px-3 text-sm shadow-[var(--shadow-border)]"
            >
              <option value="percent">Percent off</option>
              <option value="fixed">Fixed $ off</option>
            </select>
          </div>
          <div>
            <Label htmlFor="promo-value">{form.kind === "percent" ? "Percent (max 90)" : "Amount ($)"}</Label>
            <Input
              id="promo-value"
              type="number"
              min={0}
              step="any"
              value={form.value}
              onChange={(e) => set("value", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="promo-min">Minimum order ($, optional)</Label>
            <Input
              id="promo-min"
              type="number"
              min={0}
              step="any"
              value={form.minTotal}
              onChange={(e) => set("minTotal", e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="promo-max">Max uses (optional)</Label>
            <Input
              id="promo-max"
              type="number"
              min={1}
              step={1}
              value={form.maxUses}
              onChange={(e) => set("maxUses", e.target.value)}
              placeholder="Unlimited"
            />
          </div>
          <div>
            <Label htmlFor="promo-start">Starts (optional)</Label>
            <Input
              id="promo-start"
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => set("startsAt", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="promo-end">Ends (optional)</Label>
            <Input
              id="promo-end"
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => set("endsAt", e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2 pb-3">
            <input
              id="promo-active"
              type="checkbox"
              checked={form.active}
              onChange={(e) => set("active", e.target.checked)}
              className="h-5 w-5"
            />
            <Label htmlFor="promo-active">Active</Label>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => void save()} disabled={busy || !form.code.trim() || !form.value}>
            {busy ? "Saving…" : editing ? "Update coupon" : "Create coupon"}
          </Button>
          {editing && (
            <Button variant="secondary" onClick={reset}>
              Cancel
            </Button>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium">All coupons ({coupons.length})</h2>
        {coupons.length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">None yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {coupons.map((c) => (
              <article key={c.code} className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono text-base">{c.code}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                          c.active ? "bg-signal/15 text-signal" : "bg-bg-subtle text-fg-subtle"
                        }`}
                      >
                        {c.active ? "active" : "off"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-fg-muted">
                      {valueLabel(c)}
                      {c.minTotal > 0 ? ` · min ${formatUsd(c.minTotal)}` : ""} ·{" "}
                      {c.maxUses !== null ? `${c.usedCount}/${c.maxUses} used` : `${c.usedCount} used`} ·{" "}
                      {windowLabel(c)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary" onClick={() => void toggle(c)}>
                      {c.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => startEdit(c)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => void remove(c.code)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
