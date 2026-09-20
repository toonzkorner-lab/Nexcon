import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ownerDeleteReview, ownerSaveReview } from "@/lib/cms/owner";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/reviews")({ component: Page });

function Page() {
  const { site } = useDesk();
  const router = useRouter();

  async function publish(id: string, published: boolean) {
    const res = await ownerSaveReview({ data: { id, published } });
    if (!res.ok) return toast.error(res.error);
    toast.success(published ? "Published." : "Hidden.");
    await router.invalidate();
  }

  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    const res = await ownerDeleteReview({ data: { id } });
    if (!res.ok) return toast.error(res.error);
    toast.success("Deleted.");
    await router.invalidate();
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Reviews</p>
      <h1 className="mt-2 text-3xl font-light tracking-tight">Transmissions.</h1>
      <p className="mt-2 max-w-xl text-sm text-fg-muted">
        Public submissions land unpublished. Approve to put them on the site.
      </p>
      <div className="mt-8 space-y-4">
        {site.reviews.length === 0 ? (
          <p className="text-sm text-fg-muted">None yet.</p>
        ) : (
          site.reviews.map((r) => (
            <article key={r.id} className="rounded-[var(--radius-xl)] bg-bg-elevated p-5">
              <p className="text-sm leading-relaxed">“{r.quote}”</p>
              <p className="mt-3 text-sm text-fg-muted">
                {r.name} · {r.role}, {r.company} · {r.rating}/5
              </p>
              <p className="mt-1 font-mono text-[11px] text-fg-subtle">{r.published ? "Live" : "Pending"} · {r.date}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant={r.published ? "secondary" : "primary"} onClick={() => void publish(r.id, !r.published)}>
                  {r.published ? "Unpublish" : "Publish"}
                </Button>
                <Button size="sm" variant="danger" onClick={() => void remove(r.id)}>
                  Delete
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
