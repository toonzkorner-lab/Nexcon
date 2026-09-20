import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy blog detail URLs (/blog/<slug>) from the old site.
 * Slugs are 1:1 compatible with /journal/<slug>; preserve them with a
 * permanent redirect, and fall back to the journal index for unknown slugs.
 */
export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params, context }) => {
    const post = context.site.posts.find((p) => p.slug === params.slug);
    if (post) {
      throw redirect({ to: "/journal/$slug", params: { slug: post.slug }, statusCode: 301 });
    }
    throw redirect({ to: "/journal", statusCode: 301 });
  },
});
