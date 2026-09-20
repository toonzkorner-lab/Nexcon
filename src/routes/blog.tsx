import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  beforeLoad: ({ location }) => {
    // /blog/<slug> is handled by the blog.$slug route (301 to /journal/<slug>);
    // only the bare index redirects here.
    if (location.pathname.replace(/\/+$/, "") !== "/blog") return;
    throw redirect({ to: "/journal", statusCode: 301 });
  },
});
