import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "n3xus-pwa-dismiss";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallChip() {
  const [promptEvent, setPromptEvent] = useState<PromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(DISMISS_KEY) === "1") return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as PromptEvent);
      setOpen(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    if (isIos() && !isStandalone()) {
      const t = window.setTimeout(() => setOpen(true), 1400);
      return () => {
        window.removeEventListener("beforeinstallprompt", onPrompt);
        window.clearTimeout(t);
      };
    }
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!open || isStandalone()) return null;
  if (!promptEvent && !isIos()) return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
    setIosHint(false);
  }

  async function install() {
    if (!promptEvent) {
      setIosHint(true);
      return;
    }
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setOpen(false);
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 w-[min(100%-5.5rem,18rem)] sm:left-6">
      <div className="rounded-[var(--radius-lg)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Install N3xUs</p>
            <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">
              {iosHint
                ? "Share, then Add to Home Screen."
                : "The studio on your home screen. Works offline for the shell."}
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="relative size-8 shrink-0 text-fg-subtle after:absolute after:inset-[-6px] hover:text-fg"
            aria-label="Dismiss"
          >
            <X className="mx-auto size-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => void install()}
          className="mt-3 inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-3 text-sm font-medium text-accent-fg"
        >
          {iosHint ? <Share className="size-4" /> : <Download className="size-4" />}
          {iosHint ? "How" : "Install"}
        </button>
      </div>
    </div>
  );
}
