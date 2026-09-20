import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { talkToBot } from "@/lib/ai/chat";
import type { ShowcaseBot } from "@/lib/cms/types";
import { freshLedger, parseCommand, runEconomy, type Ledger } from "@/lib/lab/economy";
import { freshHouse, runCasino, type House } from "@/lib/lab/casino";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string; local?: boolean };

const MAX_TURNS = 12;

export function BotPlayground({ bot }: { bot: ShowcaseBot }) {
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: bot.welcome, local: true }]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ledger, setLedger] = useState<Ledger>(freshLedger);
  const [house, setHouse] = useState<House>(freshHouse);
  const scroller = useRef<HTMLDivElement>(null);
  const turns = messages.filter((m) => m.role === "user").length;
  const localKind = bot.kind === "economy" || bot.kind === "casino";
  const capped = turns >= MAX_TURNS;

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  async function send(textRaw?: string) {
    const text = (textRaw ?? draft).trim();
    if (!text || busy) return;
    const slash = parseCommand(text);
    if (capped && !(localKind && slash)) return;
    setDraft("");
    setError(null);

    if (bot.kind === "economy" && slash) {
      const result = runEconomy(ledger, text);
      setLedger(result.state);
      const reply = result.reply || `${bot.name} does not know that command. /help`;
      setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: reply, local: true }]);
      return;
    }
    if (bot.kind === "casino" && slash) {
      const result = runCasino(house, text);
      setHouse(result.state);
      const reply = result.reply || `${bot.name} does not know that command. /help`;
      setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: reply, local: true }]);
      return;
    }

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const payload = next
        .filter((m) => !m.local || m.role === "user")
        .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));
      const res = await talkToBot({ data: { slug: bot.slug, messages: payload } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch {
      setError("Could not reach the demo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div>
          <p className="text-sm font-medium">{bot.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
            {bot.channel} · sandbox · live
          </p>
        </div>
        {bot.kind === "casino" ? (
          <p className="font-mono text-sm tabular-nums text-fg-muted">{house.credits} chips</p>
        ) : bot.kind === "economy" ? (
          <p className="font-mono text-sm tabular-nums text-fg-muted">{ledger.credits}c</p>
        ) : (
          <span className="size-2 rounded-full bg-signal" aria-hidden />
        )}
      </div>

      <div ref={scroller} className="h-[min(28rem,62vh)] space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
        {messages.map((m, i) => (
          <div key={`${i}-${m.role}`} className={cn(m.role === "user" ? "text-right" : "text-left")}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
              {m.role === "user" ? "You" : bot.name}
            </p>
            <p
              className={cn(
                "mt-1 inline-block max-w-[min(100%,36rem)] whitespace-pre-wrap text-left text-sm leading-relaxed",
                m.role === "user" ? "text-fg" : "text-fg-muted",
              )}
            >
              {m.content}
            </p>
          </div>
        ))}
        {busy ? (
          <p className="font-mono text-[11px] text-fg-subtle">{bot.name} is typing…</p>
        ) : null}
      </div>

      {bot.starters.length ? (
        <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3 sm:px-5">
          {bot.starters.map((s) => (
            <button
              key={s}
              type="button"
              disabled={busy || (capped && !parseCommand(s))}
              onClick={() => void send(s)}
              className="h-9 rounded-full px-3 font-mono text-[11px] text-fg-muted shadow-[var(--shadow-border)] hover:text-fg disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={500}
          disabled={busy || (capped && !parseCommand(draft))}
          placeholder={
            capped && !localKind
              ? "Session cap reached"
              : bot.kind === "casino"
                ? "Type /slots 10 or /bj 25"
                : bot.kind === "economy"
                  ? "Type /work or ask a question"
                  : `Message ${bot.name}`
          }
          className="h-11 min-w-0 flex-1 rounded-[var(--radius-md)] bg-bg px-3 text-sm outline-none shadow-[var(--shadow-border)] placeholder:text-fg-subtle disabled:opacity-50"
        />
        <Button type="submit" disabled={busy || !draft.trim() || (capped && !parseCommand(draft))} className="h-11 px-3.5">
          <Send className="size-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>

      {error ? <p className="px-4 pb-3 text-xs text-danger">{error}</p> : null}
      <p className="px-4 pb-4 text-[11px] leading-relaxed text-fg-subtle">
        Sandbox — nothing persists. {bot.kind === "casino" ? "Chips are not money. " : null}{bot.productSlug ? (
          <>
            Want this on your server?{" "}
            <Link to="/store/$slug" params={{ slug: bot.productSlug }} className="text-fg-muted hover:text-fg">
              The template
            </Link>{" "}
            or <Link to="/book" className="text-fg-muted hover:text-fg">open a brief</Link>.
          </>
        ) : (
          <>
            Custom build: <Link to="/book" className="text-fg-muted hover:text-fg">open a brief</Link>.
          </>
        )}
      </p>
    </div>
  );
}
