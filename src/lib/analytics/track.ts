/**
 * Client-side analytics event helper. Import from components; never from
 * server modules (it calls the `recordAnalyticsEvent` server function).
 */
import { recordAnalyticsEvent } from "@/lib/analytics/events";

function sessionId(): string {
  try {
    let id = sessionStorage.getItem("nx_sid");
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("nx_sid", id);
    }
    return id;
  } catch {
    return "";
  }
}

/** Fire-and-forget conversion event (contact submit, order, bot demo…). */
export function trackAnalyticsEvent(
  event: "contact_submit" | "order_complete" | "bot_demo_start" | "service_inquiry",
) {
  try {
    if (
      typeof navigator !== "undefined" &&
      (navigator as Navigator & { doNotTrack?: string }).doNotTrack === "1"
    )
      return;
    void recordAnalyticsEvent({
      data: {
        event,
        path: window.location.pathname,
        referrer: document.referrer,
        sessionId: sessionId(),
      },
    });
  } catch {
    /* analytics must never break the page */
  }
}

export function trackerSessionId(): string {
  return sessionId();
}
