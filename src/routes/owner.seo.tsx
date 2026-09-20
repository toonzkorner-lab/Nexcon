import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, TextField, Toggle } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import { ownerSaveSettings } from "@/lib/cms/owner";
import type { Settings } from "@/lib/cms/types";
import { PAGE_COPY } from "@/lib/seo";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/seo")({ component: Page });

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(site.settings);
  const [busy, setBusy] = useState(false);

  const title = settings.seoTitle || PAGE_COPY.home.title;
  const description = settings.seoDescription || PAGE_COPY.home.description;

  async function save() {
    setBusy(true);
    const res = await ownerSaveSettings({ data: settings });
    setBusy(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Search settings saved. Sitemap and titles update immediately.");
    await router.invalidate();
  }

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">SEO</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight">How Google reads the studio.</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Canonical domain, homepage title, location, and verification. Per-page titles live on each service, case study, product, and journal post.
        </p>
      </div>

      <section className="rounded-[var(--radius-lg)] bg-bg-elevated p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Search preview</p>
        <p className="mt-3 text-lg text-[#8ab4f8]">{title}</p>
        <p className="mt-1 font-mono text-[11px] text-signal">{(settings.siteUrl || "https://n3xuskonc3ptz.com").replace(/^https?:\/\//, "")}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted">{description}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Canonical site</h2>
        <TextField
          label="Public URL"
          value={settings.siteUrl}
          onChange={(v) => setSettings({ ...settings, siteUrl: v })}
        />
        <Toggle
          label="Allow search engines to index"
          checked={settings.indexable}
          onChange={(v) => setSettings({ ...settings, indexable: v })}
        />
        <p className="text-xs text-fg-subtle">
          Sitemap: {(settings.siteUrl || "https://n3xuskonc3ptz.com").replace(/\/$/, "")}/sitemap.xml · robots.txt is generated from this flag.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Homepage listing</h2>
        <TextField
          label="SEO title"
          value={settings.seoTitle}
          onChange={(v) => setSettings({ ...settings, seoTitle: v })}
        />
        <AreaField
          label="Meta description"
          value={settings.seoDescription}
          onChange={(v) => setSettings({ ...settings, seoDescription: v })}
          rows={3}
          hint="140–160 characters. This is the sentence under the blue link."
        />
        <AreaField
          label="Keywords"
          value={settings.seoKeywords}
          onChange={(v) => setSettings({ ...settings, seoKeywords: v })}
          rows={2}
          hint="Comma-separated. Secondary signal — the copy on the pages matters more."
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Local & social</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField label="City / area" value={settings.city} onChange={(v) => setSettings({ ...settings, city: v })} />
          <TextField label="Region" value={settings.region} onChange={(v) => setSettings({ ...settings, region: v })} />
          <TextField label="Country" value={settings.country} onChange={(v) => setSettings({ ...settings, country: v })} />
        </div>
        <TextField
          label="X / Twitter handle"
          value={settings.twitterHandle}
          onChange={(v) => setSettings({ ...settings, twitterHandle: v })}
        />
        <TextField
          label="Google Search Console verification"
          value={settings.googleVerification}
          onChange={(v) => setSettings({ ...settings, googleVerification: v })}
        />
        <p className="text-xs text-fg-subtle">
          Paste the content token from Search Console (the string inside google-site-verification), not the whole meta tag.
        </p>
      </section>

      <Button onClick={() => void save()} disabled={busy}>
        {busy ? "Saving…" : "Save SEO"}
      </Button>
    </div>
  );
}
