import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted shadow-[var(--shadow-border)]",
        className,
      )}
      {...props}
    />
  );
}
