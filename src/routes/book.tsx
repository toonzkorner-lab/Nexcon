import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitBrief } from "@/lib/cms/public";
import { useSite } from "@/lib/cms/use-site";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.book.title,
      description: PAGE_COPY.book.description,
      path: "/book",
      site,
    });
  },
});

const BUDGETS = ["Under $500", "$500–2k", "$2k–8k", "$8k+", "Not sure"];
const TIMES = ["ASAP", "This month", "This quarter", "Exploring"];

function BookPage() {
  const { services } = useSite();
  const groups = [...new Set(services.map((s) => s.group))];
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [notes, setNotes] = useState("");
  const [id, setId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  function toggle(g: string) {
    setPicked((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]));
  }

  async function submit() {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    setBusy(true);
    try {
      const row = await submitBrief({
        data: {
          name: name.trim(),
          email: email.trim(),
          channel: channel.trim(),
          groups: picked,
          budget,
          timeline,
          notes: notes.trim(),
        },
      });
      setId(row.id);
      toast.success("Brief received at the desk.");
      await router.invalidate();
    } catch {
      toast.error("Could not queue the brief. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (id) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Queued</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight">We have the brief.</h1>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          Reference <span className="font-mono text-fg">{id}</span>. The desk will reply within a weekday. If it is urgent, ping Discord or Telegram with that ID.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="Brief"
        title="Four questions. Then we know if we are the right desk."
        lede="No calendar theatre. Tell us the job, the money, the clock, and how to reach you."
      />
      <div className="mx-auto max-w-xl px-4 pb-20 sm:px-6">
        <p className="font-mono text-[11px] text-fg-subtle">Step {step + 1} of 4</p>
        <div className="mt-2 h-px bg-border">
          <div
            className="h-px bg-accent transition-[width] duration-200 ease-out"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>

        {step === 0 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-light">What kind of work?</h2>
            <p className="mt-2 text-sm text-fg-muted">Pick every group that applies.</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggle(g)}
                  className={cn(
                    "h-14 rounded-[var(--radius-md)] text-sm transition-colors",
                    picked.includes(g) ? "bg-accent text-accent-fg" : "text-fg shadow-[var(--shadow-border)]",
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
            <Button className="mt-8" onClick={() => setStep(1)} disabled={picked.length === 0}>
              Continue
            </Button>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-light">Budget</h2>
            <div className="mt-6 flex flex-col gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={cn(
                    "h-12 rounded-[var(--radius-md)] px-4 text-left text-sm",
                    budget === b ? "bg-accent text-accent-fg" : "shadow-[var(--shadow-border)]",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-2">
              <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
              <Button onClick={() => setStep(2)} disabled={!budget}>Continue</Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-light">When?</h2>
            <div className="mt-6 flex flex-col gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(t)}
                  className={cn(
                    "h-12 rounded-[var(--radius-md)] px-4 text-left text-sm",
                    timeline === t ? "bg-accent text-accent-fg" : "shadow-[var(--shadow-border)]",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-2">
              <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!timeline}>Continue</Button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-light">How do we reach you?</h2>
            <div>
              <Label htmlFor="n">Name</Label>
              <Input id="n" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="e">Email</Label>
              <Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="c">Discord or Telegram (optional)</Label>
              <Input id="c" value={channel} onChange={(e) => setChannel(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="notes">The job, in your words</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => void submit()} disabled={busy}>{busy ? "Sending…" : "Send brief"}</Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
