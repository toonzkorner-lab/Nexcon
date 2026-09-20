import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, SeoFields, TextField, Toggle } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import { ownerDeleteBot, ownerSaveBot } from "@/lib/cms/owner";
import { lines, parseCommands, serializeCommands, slugify } from "@/lib/cms/parse";
import type { ShowcaseBot } from "@/lib/cms/types";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/bots")({ component: Page });

const empty = (): ShowcaseBot => ({
  slug: "",
  name: "",
  tagline: "",
  description: "",
  kind: "chat",
  channel: "Discord",
  welcome: "",
  persona: "",
  starters: [],
  commands: [],
  productSlug: "",
  published: true,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
});

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [current, setCurrent] = useState<ShowcaseBot | null>(null);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!current?.name) return;
    const row = { ...current, slug: current.slug || slugify(current.name) };
    setBusy(true);
    const res = await ownerSaveBot({ data: row });
    setBusy(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Bot demo saved. Live on /lab.");
    setCurrent(null);
    await router.invalidate();
  }

  async function remove(slug: string) {
    if (!confirm("Remove this demo from the lab?")) return;
    const res = await ownerDeleteBot({ data: { slug } });
    if (!res.ok) return toast.error(res.error);
    toast.success("Deleted.");
    setCurrent(null);
    await router.invalidate();
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Bots</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Live demos.</h1>
          <p className="mt-2 max-w-xl text-sm text-fg-muted">
            Kind “economy” runs a credits ledger. Kind “casino” runs slots, flip, dice, roulette, and blackjack. Kind “chat” is a persona. Visitors use them at /lab.
          </p>
        </div>
        <Button onClick={() => setCurrent(empty())}>New bot</Button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="divide-y divide-border border-y border-border">
          {site.bots.map((b) => (
            <li key={b.slug}>
              <button type="button" onClick={() => setCurrent({ ...b })} className="flex w-full justify-between py-3 text-left">
                <span className="text-sm">{b.name}</span>
                <span className="font-mono text-[11px] text-fg-subtle">{b.published ? b.channel : "hidden"}</span>
              </button>
            </li>
          ))}
        </ul>
        {current ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
          >
            <TextField label="Name" value={current.name} onChange={(v) => setCurrent({ ...current, name: v })} />
            <TextField label="Slug" value={current.slug} onChange={(v) => setCurrent({ ...current, slug: slugify(v) })} />
            <TextField label="Channel (Discord / Telegram / Web)" value={current.channel} onChange={(v) => setCurrent({ ...current, channel: v })} />
            <TextField
              label="Kind (chat, economy, or casino)"
              value={current.kind}
              onChange={(v) =>
                setCurrent({
                  ...current,
                  kind: v === "economy" || v === "casino" ? v : "chat",
                })
              }
            />
            <TextField label="Linked store slug" value={current.productSlug} onChange={(v) => setCurrent({ ...current, productSlug: v })} />
            <TextField label="Sort" type="number" value={current.sortOrder} onChange={(v) => setCurrent({ ...current, sortOrder: Number(v) })} />
            <TextField label="Tagline" value={current.tagline} onChange={(v) => setCurrent({ ...current, tagline: v })} />
            <AreaField label="Description" value={current.description} onChange={(v) => setCurrent({ ...current, description: v })} rows={4} />
            <AreaField label="Welcome message" value={current.welcome} onChange={(v) => setCurrent({ ...current, welcome: v })} rows={3} />
            <AreaField
              label="Persona / system prompt"
              value={current.persona}
              onChange={(v) => setCurrent({ ...current, persona: v })}
              rows={8}
              hint="This is the bot’s brain for free-text. Be specific. Slash commands in economy mode run without the model."
            />
            <AreaField
              label="Starter chips"
              value={current.starters.join("\n")}
              onChange={(v) => setCurrent({ ...current, starters: lines(v) })}
              hint="One per line. Shown as buttons in the demo."
              rows={4}
            />
            <AreaField
              label="Command list"
              value={serializeCommands(current.commands)}
              onChange={(v) => setCurrent({ ...current, commands: parseCommands(v) })}
              hint="One per line: /work | Odd job, 8s cooldown"
              rows={6}
            />
            <Toggle label="Published" checked={current.published} onChange={(v) => setCurrent({ ...current, published: v })} />
            <SeoFields
              title={current.seoTitle}
              description={current.seoDescription}
              onTitle={(v) => setCurrent({ ...current, seoTitle: v })}
              onDescription={(v) => setCurrent({ ...current, seoDescription: v })}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              {site.bots.some((b) => b.slug === current.slug) ? (
                <Button type="button" variant="danger" onClick={() => void remove(current.slug)}>Delete</Button>
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setCurrent(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-fg-muted">Select a bot or create one. Published demos appear on /lab immediately.</p>
        )}
      </div>
    </div>
  );
}
