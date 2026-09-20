import { Bot, LifeBuoy, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { askCore } from "@/lib/ai/chat";
import { useSite } from "@/lib/cms/use-site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMsg = { role: "user" | "assistant"; content: string };

export function SupportDock() {
  const { settings } = useSite();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"menu" | "chat">("menu");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content: "N3xUs Core. Ask about a service, a stack, or whether a brief is the next step.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    const text = draft.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    setError(null);
    try {
      const res = await askCore({ data: { messages: next } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch {
      setError("Could not reach Core.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setMode("menu");
        }}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-12 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-fg shadow-[var(--shadow-border)] sm:right-6"
        aria-expanded={open}
      >
        {open ? <X className="size-4" /> : <LifeBuoy className="size-4" />}
        {open ? "Close" : "Support"}
      </button>

      {open ? (
        <div className="fixed right-4 bottom-20 z-40 w-[min(100%-2rem,22rem)] overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border-hover)] sm:right-6 sm:bottom-22">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-medium">N3xUs Support</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-signal">Online</p>
            </div>
          </div>

          {mode === "menu" ? (
            <div className="flex flex-col p-2">
              <button
                type="button"
                onClick={() => setMode("chat")}
                className="flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-left text-sm hover:bg-bg-subtle"
              >
                <Bot className="size-4 text-fg-muted" />
                Chat with Core
              </button>
              <a
                href={settings.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm hover:bg-bg-subtle"
              >
                <MessageCircle className="size-4 text-fg-muted" />
                Discord
              </a>
              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm hover:bg-bg-subtle"
              >
                <Send className="size-4 text-fg-muted" />
                Telegram
              </a>
              <a
                href="/contact"
                className="flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm hover:bg-bg-subtle"
              >
                <LifeBuoy className="size-4 text-fg-muted" />
                Open a ticket
              </a>
            </div>
          ) : (
            <div className="flex h-96 flex-col">
              <div className="min-h-0 flex-1 space-y-3 overflow-auto px-4 py-3">
                {messages.map((m, i) => (
                  <p
                    key={i}
                    className={cn(
                      "max-w-[90%] text-sm leading-relaxed",
                      m.role === "user" ? "ml-auto text-fg" : "text-fg-muted",
                    )}
                  >
                    {m.content}
                  </p>
                ))}
                {busy ? <p className="text-sm text-fg-subtle">Core is thinking…</p> : null}
                {error ? <p className="text-sm text-danger">{error}</p> : null}
              </div>
              <form
                className="flex gap-2 border-t border-border p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about a service"
                  aria-label="Message"
                />
                <Button type="submit" size="icon" disabled={busy} aria-label="Send">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
