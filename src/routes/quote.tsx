import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /quote URL — the brief form now lives on /book. */
export const Route = createFileRoute("/quote")({
  beforeLoad: () => {
    throw redirect({ to: "/book", statusCode: 301 });
  },
});
