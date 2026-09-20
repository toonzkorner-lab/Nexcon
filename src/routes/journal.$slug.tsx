import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Crumbs } from "@/components/site/crumbs";
import { JsonLd } from "@/components/site/json-ld";
import { useSite } from "@/lib/cms/use-site";
import { articleNode, breadcrumbs, graph, organization, person } from "@/lib/schema";
import { listingDescription, listingTitle, pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/journal/$slug")({
  component: PostPage,
  loader: ({ params, context }) => {
    const post = context.site.posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ matches, loaderData }) => {
    const site = siteFromMatches(matches);
    const post = loaderData;
    if (!post) {
      // Loader threw notFound(): emit nothing indexable for the missing slug.
      return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    }
    return pageHead({
      title: listingTitle(post, post.title),
      description: listingDescription(post, post.excerpt),
      path: `/journal/${post.slug}`,
      site,
      image: post.image || undefined,
      type: "article",
      publishedTime: post.date,
    });
  },
});

function PostPage() {
  const post = Route.useLoaderData();
  const { posts, settings } = useSite();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <JsonLd
        data={graph([
          organization(settings),
          person(settings),
          articleNode(post, settings),
          breadcrumbs(settings, [
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Journal", to: "/journal" },
          { label: post.title },
        ]}
      />
      <Link to="/journal" className="mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Journal
      </Link>
      <p className="mt-8 font-mono text-[11px] text-fg-subtle">
        <time dateTime={post.date}>{post.date}</time> · {post.reading} · {post.tags.join(" / ")}
      </p>
      <h1 className="mt-4 text-4xl font-light tracking-tight">{post.title}</h1>
      <p className="mt-4 text-sm text-fg-muted">
        <span itemProp="author">{settings.founderName}</span> · {settings.founderTitle}
      </p>
      {post.image ? (
        <figure className="mt-10">
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="aspect-[16/9] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
          />
        </figure>
      ) : null}
      <div className="mt-10 space-y-10">
        {post.body.map((block, i) => (
          <section key={i}>
            {block.heading ? <h2 className="mb-3 text-xl font-medium">{block.heading}</h2> : null}
            {block.paragraphs.map((para) => (
              <p key={para} className="mb-4 text-base leading-relaxed text-fg-muted last:mb-0">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
      {more.length ? (
        <nav className="mt-16 border-t border-border pt-8" aria-label="More journal posts">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">More from the desk</p>
          <ul className="mt-4 space-y-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link to="/journal/$slug" params={{ slug: p.slug }} className="text-sm text-fg-muted hover:text-fg">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  );
}
