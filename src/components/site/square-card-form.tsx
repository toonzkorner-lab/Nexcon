/**
 * Square embedded card form (Web Payments SDK).
 *
 * The card inputs live in a Square-controlled iframe, so the raw card
 * number never reaches this page's code. On submit the parent calls
 * tokenize() to get a single-use source ID, which it sends to the server
 * to charge. The SDK script is loaded from Square's CDN for the
 * configured environment (sandbox vs production).
 */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SQUARE_SDK_URLS, type SquarePublicConfig } from "@/lib/payments/square";

export type SquareCardFormHandle = {
  /** Tokenize the card; resolves to the single-use source ID. Throws on error. */
  tokenize: () => Promise<string>;
};

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{
    status: string;
    token?: string;
    errors?: { message: string }[];
  }>;
};

declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId: string,
      ) => { card: () => Promise<SquareCard> };
    };
  }
}

function loadSquareScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load the card form."));
    document.head.appendChild(script);
  });
}

export const SquareCardForm = forwardRef<
  SquareCardFormHandle,
  { config: SquarePublicConfig }
>(function SquareCardForm({ config }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<SquareCard | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function mount() {
      try {
        await loadSquareScript(SQUARE_SDK_URLS[config.environment]);
        if (cancelled || !window.Square) throw new Error("Card form unavailable.");
        const payments = window.Square.payments(config.applicationId, config.locationId);
        const card = await payments.card();
        if (cancelled) return;
        await card.attach("#square-card-container");
        if (cancelled) return;
        cardRef.current = card;
        setReady(true);
      } catch {
        if (!cancelled) setError("Could not load the card form. Try again.");
      }
    }
    void mount();
    return () => {
      cancelled = true;
    };
  }, [config.applicationId, config.locationId, config.environment]);

  useImperativeHandle(ref, () => ({
    async tokenize() {
      const card = cardRef.current;
      if (!card) throw new Error("Card form is not ready yet.");
      const result = await card.tokenize();
      if (result.status === "OK" && result.token) return result.token;
      const message =
        result.errors?.[0]?.message ?? "Check the card details and try again.";
      throw new Error(message);
    },
  }));

  return (
    <div className="space-y-2">
      <div
        id="square-card-container"
        ref={containerRef}
        className="min-h-11 rounded-[var(--radius-sm)] bg-transparent shadow-[var(--shadow-border)]"
        aria-label="Card details"
      />
      {!ready && !error ? (
        <p className="text-xs text-fg-subtle">Loading the secure card form…</p>
      ) : null}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
});
