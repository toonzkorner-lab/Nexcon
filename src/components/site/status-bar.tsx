import { useEffect, useState } from "react";
import { useSite } from "@/lib/cms/use-site";
import { deskState } from "@/lib/desk";

export function StatusBar() {
  const { settings } = useSite();
  const [desk, setDesk] = useState(() => deskState());
  useEffect(() => {
    const t = window.setInterval(() => setDesk(deskState()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="hidden border-b border-border bg-bg-elevated/80 md:block">
      <div className="mx-auto flex h-8 max-w-6xl items-center justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
        <span className={desk.open ? "text-signal" : undefined}>
          {desk.open ? "● Desk open" : `○ ${desk.label}`} · {desk.local}
        </span>
        <span className="truncate">
          {settings.deskDays} {settings.deskHours} · {settings.sla}
        </span>
      </div>
    </div>
  );
}
