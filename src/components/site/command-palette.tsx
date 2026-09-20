import { useRouter } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSite } from "@/lib/cms/use-site";
import { cn } from "@/lib/utils";

type Hit = { href: string; label: string; hint: string };

const STATIC: Hit[] = [
  { href: "/", label: "Home", hint: "Studio" },
  { href: "/work", label: "Work", hint: "Portfolio" },
  { href: "/services", label: "Services", hint: "Catalog" },
  { href: "/store", label: "Store", hint: "Digital goods" },
  { href: "/lab", label: "Lab", hint: "Live bot demos" },
  { href: "/journal", label: "Journal", hint: "Writing" },
  { href: "/about", label: "About", hint: "Founder" },
  { href: "/studio", label: "Studio", hint: "How we work" },
  { href: "/contact", label: "Contact", hint: "Message" },
  { href: "/book", label: "Open a brief", hint: "Start a project" },
  { href: "/transmissions", label: "Transmissions", hint: "Reviews" },
  { href: "/cart", label: "Cart", hint: "Checkout" },
  { href: "/owner", label: "Owner desk", hint: "CMS" },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const site = useSite();

  const hits = useMemo(() => {
    const pool: Hit[] = [
      ...STATIC,
      ...site.projects.map((p) => ({ href: `/work/${p.slug}`, label: p.title, hint: "Work" })),
      ...site.services.map((s) => ({ href: `/services/${s.slug}`, label: s.name, hint: "Service" })),
      ...site.products.map((p) => ({ href: `/store/${p.slug}`, label: p.name, hint: "Store" })),
      ...site.bots.map((b) => ({ href: `/lab/${b.slug}`, label: b.name, hint: "Lab" })),
      ...site.posts.map((p) => ({ href: `/journal/${p.slug}`, label: p.title, hint: "Journal" })),
    ];
    const needle = q.trim().toLowerCase();
    if (!needle) return pool.slice(0, 10);
    return pool.filter((h) => `${h.label} ${h.hint}`.toLowerCase().includes(needle)).slice(0, 12);
  }, [q, site]);

  useEffect(() => {
    if (open) {
      setQ("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <button type="button" className="absolute inset-0 bg-bg/70" onClick={onClose} aria-label="Close search" />
      <div
        role="dialog"
        aria-label="Command palette"
        className="relative w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated p-2 shadow-[var(--shadow-border-hover)]"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump to a page, project, or service"
          className="h-12 w-full bg-transparent px-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:outline-none"
        />
        <ul className="max-h-80 overflow-auto py-1">
          {hits.length === 0 ? (
            <li className="px-3 py-6 text-sm text-fg-muted">Nothing matches.</li>
          ) : (
            hits.map((h) => (
              <li key={h.href}>
                <button
                  type="button"
                  onClick={() => {
                    router.history.push(h.href);
                    onClose();
                  }}
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-[var(--radius-md)] px-3 text-left text-sm text-fg hover:bg-bg-subtle",
                  )}
                >
                  <span>{h.label}</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                    {h.hint}
                    <ArrowRight className="size-3.5" />
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
