import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/")({ component: Overview });

function Overview() {
  const desk = useDesk();
  const router = useRouter();
  void router;
  const { site, inbox } = desk;
  const pendingReviews = site.reviews.filter((r) => !r.published).length;
  const newBriefs = inbox.briefs.filter((b) => b.status === "new").length;
  const newMsgs = inbox.messages.filter((m) => m.status === "new").length;
  const queued = inbox.orders.filter((o) => o.status === "queued").length;

  const cards = [
    { n: newBriefs, label: "New briefs", to: "/owner/inbox" },
    { n: newMsgs, label: "New messages", to: "/owner/inbox" },
    { n: queued, label: "Orders to fulfill", to: "/owner/inbox" },
    { n: pendingReviews, label: "Reviews to publish", to: "/owner/reviews" },
    { n: site.services.length, label: "Services", to: "/owner/services" },
    { n: site.projects.length, label: "Projects", to: "/owner/work" },
    { n: site.products.length, label: "Store items", to: "/owner/store" },
    { n: site.bots.length, label: "Bot demos", to: "/owner/bots" },
    { n: site.posts.length, label: "Journal posts", to: "/owner/journal" },
  ];

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Overview</p>
      <h1 className="mt-2 text-3xl font-light tracking-tight">The desk.</h1>
      <p className="mt-2 max-w-xl text-sm text-fg-muted">
        Everything the public site shows is editable here. Briefs, tickets, and store orders land in Inbox.
      </p>
      <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="bg-bg-elevated p-5 hover:bg-bg-subtle">
            <p className="font-mono text-2xl tabular-nums">{c.n}</p>
            <p className="mt-1 text-sm text-fg-muted">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-medium">Latest briefs</h2>
        {inbox.briefs.slice(0, 5).length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">No briefs yet. They appear when someone finishes Open a brief.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {inbox.briefs.slice(0, 5).map((b) => (
              <li key={b.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="text-sm">{b.name}</p>
                  <p className="text-xs text-fg-muted">{b.groups.join(", ")} · {b.budget}</p>
                </div>
                <p className="font-mono text-[11px] text-fg-subtle">{b.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
