import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { InstallChip } from "@/components/pwa/install-chip";
import { CommandPalette } from "./command-palette";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { ScrollProgress } from "./scroll-progress";
import { StatusBar } from "./status-bar";
import { SupportDock } from "./support-dock";

export function Shell({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const desk = pathname.startsWith("/owner") || pathname === "/login";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (desk) {
    return (
      <div className="relative min-h-dvh">
        <div className="grain" />
        {children}
        <CommandPalette open={search} onClose={() => setSearch(false)} />
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="grain" />
      <ScrollProgress />
      <StatusBar />
      <Nav onSearch={() => setSearch(true)} />
      <main id="main">{children}</main>
      <Footer />
      <SupportDock />
      <InstallChip />
      <CommandPalette open={search} onClose={() => setSearch(false)} />
    </div>
  );
}
