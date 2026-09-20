import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AreaField, TextField } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import {
  ownerSaveCapabilities,
  ownerSaveEngagements,
  ownerSaveFaqs,
  ownerSavePipeline,
  ownerSavePrinciples,
  ownerSaveSettings,
} from "@/lib/cms/owner";
import { lines } from "@/lib/cms/parse";
import { uid } from "@/lib/utils";
import type { Capability, Engagement, Faq, PipelineStep, Principle, Settings } from "@/lib/cms/types";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/site")({ component: Page });

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(site.settings);
  const [faqs, setFaqs] = useState<Faq[]>(site.faqs);
  const [principles, setPrinciples] = useState<Principle[]>(site.principles);
  const [pipeline, setPipeline] = useState<PipelineStep[]>(site.pipeline);
  const [engagements, setEngagements] = useState<Engagement[]>(site.engagements);
  const [capabilities, setCapabilities] = useState<Capability[]>(site.capabilities);
  const [busy, setBusy] = useState(false);

  async function saveAll() {
    setBusy(true);
    const results = await Promise.all([
      ownerSaveSettings({ data: settings }),
      ownerSaveFaqs({ data: faqs }),
      ownerSavePrinciples({ data: principles }),
      ownerSavePipeline({ data: pipeline }),
      ownerSaveEngagements({ data: engagements }),
      ownerSaveCapabilities({ data: capabilities }),
    ]);
    setBusy(false);
    const fail = results.find((r) => !r.ok);
    if (fail && !fail.ok) return toast.error(fail.error);
    toast.success("Site copy saved.");
    await router.invalidate();
  }

  return (
    <div className="max-w-3xl space-y-14">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Site</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight">Identity and copy.</h1>
        <p className="mt-2 text-sm text-fg-muted">Name, channels, founder, FAQ, process. This is what the public pages read.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Identity</h2>
        <TextField label="Studio name" value={settings.studioName} onChange={(v) => setSettings({ ...settings, studioName: v })} />
        <TextField label="Short name" value={settings.studioShort} onChange={(v) => setSettings({ ...settings, studioShort: v })} />
        <TextField label="Tagline" value={settings.tagline} onChange={(v) => setSettings({ ...settings, tagline: v })} />
        <TextField label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} />
        <TextField label="Discord URL" value={settings.discordUrl} onChange={(v) => setSettings({ ...settings, discordUrl: v })} />
        <TextField label="Telegram URL" value={settings.telegramUrl} onChange={(v) => setSettings({ ...settings, telegramUrl: v })} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Founder</h2>
        <TextField label="Name" value={settings.founderName} onChange={(v) => setSettings({ ...settings, founderName: v })} />
        <TextField label="Title" value={settings.founderTitle} onChange={(v) => setSettings({ ...settings, founderTitle: v })} />
        <AreaField label="Bio" value={settings.founderBio} onChange={(v) => setSettings({ ...settings, founderBio: v })} />
        <AreaField label="Genesis / about" value={settings.genesis} onChange={(v) => setSettings({ ...settings, genesis: v })} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Desk hours</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Days" value={settings.deskDays} onChange={(v) => setSettings({ ...settings, deskDays: v })} />
          <TextField label="Hours" value={settings.deskHours} onChange={(v) => setSettings({ ...settings, deskHours: v })} />
          <TextField label="SLA" value={settings.sla} onChange={(v) => setSettings({ ...settings, sla: v })} />
          <TextField label="Timezone" value={settings.zone} onChange={(v) => setSettings({ ...settings, zone: v })} />
        </div>
        <AreaField
          label="Stack"
          value={settings.stack.join("\n")}
          onChange={(v) => setSettings({ ...settings, stack: lines(v) })}
          hint="One technology per line."
          rows={6}
        />
      </section>

      <Repeat
        title="FAQ"
        rows={faqs}
        onAdd={() => setFaqs([...faqs, { id: uid("faq"), question: "", answer: "", sortOrder: faqs.length }])}
        render={(row, i) => (
          <div className="space-y-3">
            <TextField label="Question" value={row.question} onChange={(v) => setFaqs(faqs.map((f, j) => (j === i ? { ...f, question: v } : f)))} />
            <AreaField label="Answer" value={row.answer} onChange={(v) => setFaqs(faqs.map((f, j) => (j === i ? { ...f, answer: v } : f)))} rows={3} />
            <Button size="sm" variant="ghost" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}>Remove</Button>
          </div>
        )}
      />

      <Repeat
        title="Principles"
        rows={principles}
        onAdd={() => setPrinciples([...principles, { id: uid("pr"), num: String(principles.length + 1).padStart(2, "0"), title: "", body: "", sortOrder: principles.length }])}
        render={(row, i) => (
          <div className="space-y-3">
            <TextField label="Title" value={row.title} onChange={(v) => setPrinciples(principles.map((p, j) => (j === i ? { ...p, title: v } : p)))} />
            <AreaField label="Body" value={row.body} onChange={(v) => setPrinciples(principles.map((p, j) => (j === i ? { ...p, body: v } : p)))} rows={3} />
            <Button size="sm" variant="ghost" onClick={() => setPrinciples(principles.filter((_, j) => j !== i))}>Remove</Button>
          </div>
        )}
      />

      <Repeat
        title="Pipeline"
        rows={pipeline}
        onAdd={() => setPipeline([...pipeline, { id: uid("pl"), num: String(pipeline.length + 1).padStart(2, "0"), title: "", body: "", sortOrder: pipeline.length }])}
        render={(row, i) => (
          <div className="space-y-3">
            <TextField label="Title" value={row.title} onChange={(v) => setPipeline(pipeline.map((p, j) => (j === i ? { ...p, title: v } : p)))} />
            <AreaField label="Body" value={row.body} onChange={(v) => setPipeline(pipeline.map((p, j) => (j === i ? { ...p, body: v } : p)))} rows={3} />
            <Button size="sm" variant="ghost" onClick={() => setPipeline(pipeline.filter((_, j) => j !== i))}>Remove</Button>
          </div>
        )}
      />

      <Repeat
        title="Engagement models"
        rows={engagements}
        onAdd={() => setEngagements([...engagements, { id: uid("eg"), name: "", rangeLabel: "", body: "", includes: [], sortOrder: engagements.length }])}
        render={(row, i) => (
          <div className="space-y-3">
            <TextField label="Name" value={row.name} onChange={(v) => setEngagements(engagements.map((p, j) => (j === i ? { ...p, name: v } : p)))} />
            <TextField label="Range" value={row.rangeLabel} onChange={(v) => setEngagements(engagements.map((p, j) => (j === i ? { ...p, rangeLabel: v } : p)))} />
            <AreaField label="Body" value={row.body} onChange={(v) => setEngagements(engagements.map((p, j) => (j === i ? { ...p, body: v } : p)))} rows={3} />
            <AreaField label="Includes" value={row.includes.join("\n")} onChange={(v) => setEngagements(engagements.map((p, j) => (j === i ? { ...p, includes: lines(v) } : p)))} rows={4} />
            <Button size="sm" variant="ghost" onClick={() => setEngagements(engagements.filter((_, j) => j !== i))}>Remove</Button>
          </div>
        )}
      />

      <Repeat
        title="Capabilities"
        rows={capabilities}
        onAdd={() => setCapabilities([...capabilities, { id: uid("cap"), area: "", inScope: true, sortOrder: capabilities.length }])}
        render={(row, i) => (
          <div className="space-y-3">
            <TextField label="Area" value={row.area} onChange={(v) => setCapabilities(capabilities.map((p, j) => (j === i ? { ...p, area: v } : p)))} />
            <Button size="sm" variant="secondary" onClick={() => setCapabilities(capabilities.map((p, j) => (j === i ? { ...p, inScope: !p.inScope } : p)))}>
              {row.inScope ? "In scope" : "Out of scope"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCapabilities(capabilities.filter((_, j) => j !== i))}>Remove</Button>
          </div>
        )}
      />

      <div className="sticky bottom-4">
        <Button size="lg" disabled={busy} onClick={() => void saveAll()}>
          {busy ? "Saving…" : "Save site copy"}
        </Button>
      </div>
    </div>
  );
}

function Repeat<T>({
  title,
  rows,
  onAdd,
  render,
}: {
  title: string;
  rows: T[];
  onAdd: () => void;
  render: (row: T, i: number) => ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        <Button size="sm" variant="secondary" onClick={onAdd}>Add</Button>
      </div>
      <div className="mt-4 space-y-6">
        {rows.map((row, i) => (
          <div key={i} className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
            {render(row, i)}
          </div>
        ))}
      </div>
    </section>
  );
}
