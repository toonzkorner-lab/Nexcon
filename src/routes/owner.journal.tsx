import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, SeoFields, TextField, Toggle } from "@/components/owner/fields";
import { Button } from "@/components/ui/button";
import { ownerDeletePost, ownerSavePost } from "@/lib/cms/owner";
import { lines, parsePostBody, serializePostBody, slugify } from "@/lib/cms/parse";
import type { Post } from "@/lib/cms/types";
import { useDesk } from "./owner";

export const Route = createFileRoute("/owner/journal")({ component: Page });

const empty = (): Post => ({
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tags: [],
  reading: "5 min",
  body: [{ paragraphs: [""] }],
  image: "",
  imageAlt: "",
  published: true,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
});

function Page() {
  const { site } = useDesk();
  const router = useRouter();
  const [current, setCurrent] = useState<Post | null>(null);
  const [bodyText, setBodyText] = useState("");
  const [busy, setBusy] = useState(false);

  function open(p: Post) {
    setCurrent({ ...p });
    setBodyText(serializePostBody(p.body));
  }

  async function save() {
    if (!current?.title) return;
    const row: Post = {
      ...current,
      slug: current.slug || slugify(current.title),
      body: parsePostBody(bodyText),
    };
    setBusy(true);
    const res = await ownerSavePost({ data: row });
    setBusy(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Post saved.");
    setCurrent(null);
    await router.invalidate();
  }

  async function remove(slug: string) {
    if (!confirm("Delete this post?")) return;
    const res = await ownerDeletePost({ data: { slug } });
    if (!res.ok) return toast.error(res.error);
    toast.success("Deleted.");
    setCurrent(null);
    await router.invalidate();
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Journal</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Writing.</h1>
        </div>
        <Button onClick={() => { setCurrent(empty()); setBodyText(""); }}>New post</Button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <ul className="divide-y divide-border border-y border-border">
          {site.posts.map((p) => (
            <li key={p.slug}>
              <button type="button" onClick={() => open(p)} className="flex w-full justify-between py-3 text-left">
                <span className="text-sm">{p.title}</span>
                <span className="font-mono text-[11px] text-fg-subtle">{p.date}</span>
              </button>
            </li>
          ))}
        </ul>
        {current ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); void save(); }}>
            <TextField label="Title" value={current.title} onChange={(v) => setCurrent({ ...current, title: v })} />
            <TextField label="Slug" value={current.slug} onChange={(v) => setCurrent({ ...current, slug: slugify(v) })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Date" value={current.date} onChange={(v) => setCurrent({ ...current, date: v })} />
              <TextField label="Reading time" value={current.reading} onChange={(v) => setCurrent({ ...current, reading: v })} />
            </div>
            <TextField label="Tags" value={current.tags.join(", ")} onChange={(v) => setCurrent({ ...current, tags: lines(v.replaceAll(",", "\n")) })} />
            <AreaField label="Excerpt" value={current.excerpt} onChange={(v) => setCurrent({ ...current, excerpt: v })} rows={3} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Cover image" value={current.image} onChange={(v) => setCurrent({ ...current, image: v })} />
              <TextField label="Cover alt text" value={current.imageAlt} onChange={(v) => setCurrent({ ...current, imageAlt: v })} />
            </div>
            <AreaField
              label="Body"
              value={bodyText}
              onChange={setBodyText}
              rows={16}
              hint="Paragraphs separated by a blank line. Headings: a line starting with # "
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
              {site.posts.some((p) => p.slug === current.slug) ? (
                <Button type="button" variant="danger" onClick={() => void remove(current.slug)}>Delete</Button>
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setCurrent(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-fg-muted">Select a post. Unpublished drafts stay off the public journal.</p>
        )}
      </div>
    </div>
  );
}
