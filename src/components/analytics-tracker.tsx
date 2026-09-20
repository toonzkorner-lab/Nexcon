/**
 * Privacy-respecting pageview tracker. Mount once (in the root route).
 * Honors Do Not Track, sends via a server function so it never blocks
 * navigation, and skips the owner's own desk traffic.
 */
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { recordAnalyticsEvent } from "@/lib/analytics/events";
import { trackerSessionId } from "@/lib/analytics/track";

export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });

  useEffect(() => {
    try {
      if (
        typeof navigator !== "undefined" &&
        (navigator as Navigator & { doNotTrack?: string }).doNotTrack === "1"
      )
        return;
      // Skip the owner's own desk traffic — the dashboard would otherwise
      // count the owner refreshing stats as visitors.
      if (pathname.startsWith("/owner") || pathname.startsWith("/login")) return;
      void recordAnalyticsEvent({
        data: {
          event: "pageview",
          path: `${pathname}${search === "?" ? "" : search}`,
          referrer: document.referrer,
          sessionId: trackerSessionId(),
        },
      }).catch(() => {});
    } catch {
      /* analytics must never break the page */
    }
  }, [pathname, search]);

  return null;
}
