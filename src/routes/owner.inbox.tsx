import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ownerSetStatus } from "@/lib/cms/owner";
import { formatUsd } from "@/lib/utils";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/inbox")({ component: InboxPage });

function InboxPage() {
  const { inbox } = useDesk();
  const router = useRouter();

  async function setStatus(table: "briefs" | "messages" | "orders", id: string, status: string) {
    const res = await ownerSetStatus({ data: { table, id, status } });
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Updated.");
    await router.invalidate();
  }

  return (
    <div className="space-y-14">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Inbox</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight">Briefs, tickets, orders.</h1>
      </header>

      <section>
        <h2 className="text-lg font-medium">Briefs</h2>
        {inbox.briefs.length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">None yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {inbox.briefs.map((b) => (
              <article key={b.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base">{b.name}</h3>
                  <p className="font-mono text-[11px] text-fg-subtle">{b.id}</p>
                </div>
                <p className="mt-1 text-sm text-fg-muted">
                  {b.email}
                  {b.channel ? ` · ${b.channel}` : ""} · {b.budget} · {b.timeline}
                </p>
                <p className="mt-2 text-sm">{b.groups.join(" / ")}</p>
                {b.notes ? <p className="mt-3 text-sm leading-relaxed text-fg-muted">{b.notes}</p> : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["new", "replied", "archived"].map((s) => (
                    <Button key={s} size="sm" variant={b.status === s ? "primary" : "secondary"} onClick={() => void setStatus("briefs", b.id, s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium">Messages</h2>
        {inbox.messages.length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">None yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {inbox.messages.map((m) => (
              <article key={m.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
                <h3 className="text-base">{m.name} · {m.topic}</h3>
                <p className="mt-1 text-sm text-fg-muted">{m.email}</p>
                <p className="mt-3 text-sm leading-relaxed">{m.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["new", "replied", "archived"].map((s) => (
                    <Button key={s} size="sm" variant={m.status === s ? "primary" : "secondary"} onClick={() => void setStatus("messages", m.id, s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium">Orders</h2>
        {inbox.orders.length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">None yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {inbox.orders.map((o) => (
              <article key={o.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
                <div className="flex justify-between gap-2">
                  <h3 className="text-base">{o.email}</h3>
                  <p className="font-mono text-sm">{formatUsd(o.total)}</p>
                </div>
                <ul className="mt-2 text-sm text-fg-muted">
                  {o.items.map((i) => (
                    <li key={i.name}>
                      {i.qty} × {i.name} — {formatUsd(i.price)}
                    </li>
                  ))}
                  {o.couponCode && (
                    <li className="text-signal">
                      Promo {o.couponCode} — −{formatUsd(o.discount)}
                    </li>
                  )}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["queued", "fulfilled", "cancelled"].map((s) => (
                    <Button key={s} size="sm" variant={o.status === s ? "primary" : "secondary"} onClick={() => void setStatus("orders", o.id, s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
