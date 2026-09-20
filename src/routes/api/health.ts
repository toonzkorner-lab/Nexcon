import { createFileRoute } from "@tanstack/react-router";

/**
 * Lightweight liveness probe for container healthchecks (Coolify / Docker).
 * Intentionally cheap: no DB query, no page render — just proves the
 * Node server is up and routing.
 */
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        }),
      HEAD: () => new Response(null, { status: 200 }),
    },
  },
});
