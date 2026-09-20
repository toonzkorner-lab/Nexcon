import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /case-studies URL — case studies now live on /work. */
export const Route = createFileRoute("/case-studies")({
  beforeLoad: () => {
    throw redirect({ to: "/work", statusCode: 301 });
  },
});
