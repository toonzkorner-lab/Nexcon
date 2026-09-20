import { createFileRoute } from "@tanstack/react-router";
import { readSite } from "@/lib/cms/db";
import { buildWebManifest } from "@/lib/pwa/manifest";

export const Route = createFileRoute("/manifest.webmanifest")({
  server: {
    handlers: {
      GET: async () => {
        const site = await readSite(true);
        return new Response(JSON.stringify(buildWebManifest(site.settings), null, 2), {
          headers: {
            "content-type": "application/manifest+json; charset=utf-8",
            "cache-control": "no-cache",
          },
        });
      },
    },
  },
});
