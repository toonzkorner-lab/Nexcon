import { useEffect, useState } from "react";

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const label = now
    ? now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Chicago",
      })
    : "--:--:--";

  return (
    <span className="font-mono text-[11px] tabular-nums tracking-wider text-fg-muted">
      CST {label}
    </span>
  );
}
