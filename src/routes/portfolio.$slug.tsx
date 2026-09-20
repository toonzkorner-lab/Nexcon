import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy portfolio detail URLs (/portfolio/<slug>) from the old site.
 * Slugs are 1:1 compatible with /work/<slug>; preserve them with a
 * permanent redirect, and fall back to the work index for unknown slugs.
 */
export const Route = createFileRoute("/portfolio/$slug")({
  beforeLoad: ({ params, context }) => {
    const project = context.site.projects.find((p) => p.slug === params.slug);
    if (project) {
      throw redirect({ to: "/work/$slug", params: { slug: project.slug }, statusCode: 301 });
    }
    throw redirect({ to: "/work", statusCode: 301 });
  },
});
