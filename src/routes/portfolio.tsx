import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio")({
  beforeLoad: ({ location }) => {
    // /portfolio/<slug> is handled by the portfolio.$slug route (301 to /work/<slug>);
    // only the bare index redirects here.
    if (location.pathname.replace(/\/+$/, "") !== "/portfolio") return;
    throw redirect({ to: "/work", statusCode: 301 });
  },
});
