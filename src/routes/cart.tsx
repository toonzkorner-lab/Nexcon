import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitOrder } from "@/lib/cms/public";
import { pageHead, siteFromMatches } from "@/lib/seo";
import { formatUsd } from "@/lib/utils";
import { cartTotal, useCart } from "@/stores/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: ({ matches }) =>
    pageHead({
      title: "Cart",
      description: "Review items, then transmit the order to the studio.",
      path: "/cart",
      site: siteFromMatches(matches),
      index: false,
    }),
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const total = cartTotal(items);

  async function checkout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const channel = String(fd.get("channel") ?? "").trim();
    if (!email) {
      toast.error("Email is required so we can fulfill.");
      return;
    }
    setBusy(true);
    try {
      const row = await submitOrder({
        data: {
          email,
          channel,
          total,
          items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        },
      });
      clear();
      setOrderId(row.id);
      toast.success("Order queued for fulfillment.");
      await router.invalidate();
    } catch {
      toast.error("Could not queue the order.");
    } finally {
      setBusy(false);
    }
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Queued</p>
        <h1 className="mt-4 text-4xl font-light">Order {orderId}</h1>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          Digital goods and retainers are fulfilled manually — we will send access, invoices, or a kickoff note to the email you gave. Card charges are not taken here; this is the studio queue.
        </p>
        <Link to="/store" className="mt-8 inline-flex h-11 items-center text-sm text-fg-muted hover:text-fg">
          Back to store
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="Cart"
        title="Review, then transmit."
        lede="Services and digital goods. Fulfillment is a human at the desk — not an instant download wall."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[1.2fr_0.8fr] sm:px-6">
        <div>
          {items.length === 0 ? (
            <p className="text-sm text-fg-muted">
              Cart is empty.{" "}
              <Link to="/store" className="text-fg underline-offset-4 hover:underline">Store</Link>
              {" "}or{" "}
              <Link to="/services" className="text-fg underline-offset-4 hover:underline">services</Link>.
            </p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {items.map((i) => (
                <li key={i.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm">{i.name}</p>
                    <p className="font-mono text-[11px] text-fg-subtle">
                      {formatUsd(i.price, { monthly: i.billing === "monthly" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="sr-only" htmlFor={`qty-${i.id}`}>Quantity</label>
                    <input
                      id={`qty-${i.id}`}
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => setQty(i.id, Number(e.target.value))}
                      className="h-11 w-16 rounded-[var(--radius-sm)] bg-transparent px-2 font-mono text-sm shadow-[var(--shadow-border)]"
                    />
                    <button type="button" className="text-sm text-fg-muted hover:text-fg" onClick={() => remove(i.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={(e) => void checkout(e)} className="h-fit space-y-4 rounded-[var(--radius-xl)] bg-bg-elevated p-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Transmit</p>
          <p className="font-mono text-2xl tabular-nums">{formatUsd(total)}</p>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="channel">Discord or Telegram (optional)</Label>
            <Input id="channel" name="channel" />
          </div>
          <Button type="submit" className="w-full" disabled={items.length === 0 || busy}>
            {busy ? "Sending…" : "Place order"}
          </Button>
        </form>
      </div>
    </div>
  );
}
