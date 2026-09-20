import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /faq URL — FAQ content now lives on /studio (with FAQPage schema). */
export const Route = createFileRoute("/faq")({
  beforeLoad: () => {
    throw redirect({ to: "/studio", statusCode: 301 });
  },
});
