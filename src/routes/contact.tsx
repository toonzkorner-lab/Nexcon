import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitMessage } from "@/lib/cms/public";
import { useSite } from "@/lib/cms/use-site";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.contact.title,
      description: PAGE_COPY.contact.description,
      path: "/contact",
      site,
    });
  },
});

function ContactPage() {
  const { settings } = useSite();
  const router = useRouter();
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const topic = String(fd.get("topic") ?? "").trim();
    const body = String(fd.get("body") ?? "").trim();
    if (!name || !email || !body) {
      toast.error("Name, email, and a message are required.");
      return;
    }
    setBusy(true);
    try {
      const row = await submitMessage({
        data: { name, email, topic: topic || "General", body },
      });
      setSent(row.id);
      toast.success("Message at the desk. We answer within 24 hours on weekdays.");
      e.currentTarget.reset();
      await router.invalidate();
    } catch {
      toast.error("Could not send. Try Discord if it is urgent.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        kicker="Contact"
        title="Write, or use the channel you already live in."
        lede="Tickets, Discord, Telegram. First response within a day on weekdays — often faster."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[1fr_0.8fr] sm:px-6">
        <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>
          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input id="topic" name="topic" placeholder="Site, bot, hosting, other" />
          </div>
          <div>
            <Label htmlFor="body">Message</Label>
            <Textarea id="body" name="body" required placeholder="What has to be true in 90 days?" />
          </div>
          <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Send message"}</Button>
          {sent ? (
            <p className="font-mono text-xs text-signal">Queued as {sent}.</p>
          ) : null}
        </form>
        <aside className="h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Direct channels</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={settings.discordUrl} target="_blank" rel="noreferrer" className="hover:text-fg text-fg-muted">
                Discord — live room
              </a>
            </li>
            <li>
              <a href={settings.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-fg text-fg-muted">
                Telegram
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-fg text-fg-muted">
                {settings.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-fg-muted">
            Prefer a scoped project? Use Open a brief — it is a better first artifact than an empty inbox.
          </p>
        </aside>
      </div>
    </div>
  );
}
