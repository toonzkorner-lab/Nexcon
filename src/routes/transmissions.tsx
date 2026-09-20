import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/lib/cms/public";
import { useSite } from "@/lib/cms/use-site";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";
import { graph, organization, reviewNode } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/transmissions")({
  component: TransmissionsPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.transmissions.title,
      description: PAGE_COPY.transmissions.description,
      path: "/transmissions",
      site,
    });
  },
});

function TransmissionsPage() {
  const { reviews, settings } = useSite();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const role = String(fd.get("role") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const quote = String(fd.get("quote") ?? "").trim();
    if (!name || !quote) {
      toast.error("Name and a note are required.");
      return;
    }
    setBusy(true);
    try {
      await submitReview({
        data: {
          name,
          role: role || "Collaborator",
          company: company || "—",
          quote,
          rating,
        },
      });
      toast.success("Received. It goes live after the desk approves it.");
      e.currentTarget.reset();
      setRating(5);
      await router.invalidate();
    } catch {
      toast.error("Could not post the review.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <JsonLd
        data={graph([
          organization(settings),
          {
            "@type": "CollectionPage",
            name: PAGE_COPY.transmissions.title,
            description: PAGE_COPY.transmissions.description,
            review: reviews.map(reviewNode),
          },
        ])}
      />
      <PageHeader
        kicker="Transmissions"
        title="What it was like to ship with us."
        lede="If we built something together, leave the unvarnished version. Stars are optional; sentences are not."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[0.9fr_1.1fr] sm:px-6">
        <form onSubmit={(e) => void onSubmit(e)} className="h-fit space-y-4 rounded-[var(--radius-xl)] bg-bg-elevated p-6">
          <h2 className="text-lg font-medium">Leave a review</h2>
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={cn(
                    "size-11 rounded-[var(--radius-sm)] font-mono text-sm",
                    n <= rating ? "bg-accent text-accent-fg" : "text-fg-muted shadow-[var(--shadow-border)]",
                  )}
                  aria-label={`${n} star${n === 1 ? "" : "s"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" />
            </div>
          </div>
          <div>
            <Label htmlFor="quote">Note</Label>
            <Textarea id="quote" name="quote" required />
          </div>
          <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Submit for review"}</Button>
        </form>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            All reviews ({reviews.length})
          </p>
          <ul className="mt-6 space-y-6">
            {reviews.map((r) => (
              <li key={r.id} className="border-t border-border pt-6">
                <p className="font-mono text-[11px] text-fg-subtle">
                  {r.rating}/5 · {r.date}
                </p>
                <p className="mt-2 text-base leading-relaxed">“{r.quote}”</p>
                <p className="mt-3 text-sm text-fg-muted">
                  {r.name} · {r.role}, {r.company}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
