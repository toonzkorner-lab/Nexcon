import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV } from "@/data/nav";
import { SignedIn } from "@/lib/auth/gates";
import { useSite } from "@/lib/cms/use-site";
import { cn } from "@/lib/utils";
import { cartCount, useCart } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { LiveClock } from "./live-clock";
import { Mark } from "./mark";

export function Nav({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = useCart((s) => cartCount(s.items));
  const { settings } = useSite();
  useEffect(() => setReady(true), []);
  const shown = ready ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:h-16 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 text-fg" onClick={() => setOpen(false)}>
          <Mark />
          <span className="font-medium tracking-tight">{settings.studioShort}</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150",
                pathname === item.to || pathname.startsWith(item.to + "/")
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <span className="hidden md:inline">
            <LiveClock />
          </span>
          <button
            type="button"
            onClick={onSearch}
            className="hidden items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-fg-muted shadow-[var(--shadow-border)] transition-[box-shadow,color] duration-150 hover:text-fg hover:shadow-[var(--shadow-border-hover)] sm:inline-flex"
            aria-label="Open command palette"
          >
            <Search className="size-3.5" />
            <span className="font-mono text-[11px]">K</span>
          </button>
          <Link
            to="/cart"
            className="relative inline-flex size-11 items-center justify-center text-fg-muted transition-colors hover:text-fg"
            aria-label={`Cart, ${shown} items`}
          >
            <ShoppingBag className="size-4" />
            {shown > 0 ? (
              <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-accent-fg">
                {shown}
              </span>
            ) : null}
          </Link>
          <SignedIn>
            <Link to="/owner" className="hidden text-sm text-fg-muted hover:text-fg sm:inline">
              Desk
            </Link>
          </SignedIn>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/book">Open a brief</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-fg md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-bg px-4 py-4 md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center text-base text-fg"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="flex h-12 items-center text-fg-muted">
              Contact
            </Link>
            <Link to="/owner" onClick={() => setOpen(false)} className="flex h-12 items-center text-fg-muted">
              Owner desk
            </Link>
            <Button asChild className="mt-2 w-full">
              <Link to="/book" onClick={() => setOpen(false)}>
                Open a brief
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
