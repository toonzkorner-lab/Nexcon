import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { cn } from "@/lib/utils";
import { Mark } from "@/components/site/mark";
import type { Inbox, OwnerInfo, Site } from "@/lib/cms/types";

export type DeskContext = {
  site: Site;
  inbox: Inbox;
  owners: OwnerInfo[];
  userId: string;
};

const LINKS = [
  { to: "/owner", label: "Overview", exact: true },
  { to: "/owner/analytics", label: "Analytics" },
  { to: "/owner/inbox", label: "Inbox" },
  { to: "/owner/services", label: "Services" },
  { to: "/owner/work", label: "Work" },
  { to: "/owner/store", label: "Store" },
  { to: "/owner/bots", label: "Bots" },
  { to: "/owner/journal", label: "Journal" },
  { to: "/owner/reviews", label: "Reviews" },
  { to: "/owner/seo", label: "SEO" },
  { to: "/owner/site", label: "Site" },
  { to: "/owner/runbook", label: "Runbook" },
] as const;

export function DeskShell({ children }: { children?: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="flex min-h-dvh">
        <aside className="hidden w-56 shrink-0 border-r border-border md:flex md:flex-col">
          <Link to="/" className="flex h-14 items-center gap-2 px-4">
            <Mark />
            <span className="text-sm font-medium">Desk</span>
          </Link>
          <nav className="flex flex-1 flex-col gap-0.5 px-2 py-2">
            {LINKS.map((item) => {
              const exact = "exact" in item && item.exact;
              const active = exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-10 items-center rounded-[var(--radius-sm)] px-3 text-sm",
                    active ? "bg-bg-subtle text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border px-3 py-3">
            <UserButton />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center gap-3 border-b border-border px-4 md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <Mark />
              <span className="text-sm font-medium">Desk</span>
            </Link>
            <div className="ml-auto">
              <UserButton />
            </div>
          </header>
          <div className="flex gap-2 overflow-x-auto border-b border-border px-3 py-2 md:hidden">
            {LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "h-10 shrink-0 rounded-full px-3 text-sm leading-10",
                  pathname === item.to || (!("exact" in item && item.exact) && pathname.startsWith(item.to))
                    ? "bg-accent text-accent-fg"
                    : "text-fg-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex-1 px-4 py-8 sm:px-8">{children ?? <Outlet />}</div>
        </div>
      </div>
    </div>
  );
}
