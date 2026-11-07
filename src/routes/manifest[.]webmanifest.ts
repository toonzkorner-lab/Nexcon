import { createFileRoute } from "@tanstack/react-router";
import { readSite } from "@/lib/cms/db";
import { seedSite } from "@/lib/cms/seed-data";
import { buildWebManifest } from "@/lib/pwa/manifest";

export const Route = createFileRoute("/manifest.webmanifest")({
  server: {
    handlers: {
      GET: async () => {
        // The manifest must never fail: browsers check it on every install
        // prompt, and on deploys without a live database (Vercel preview)
        // the PGLite fallback cannot start, so readSite throws. Fall back
        // to the seed settings, which are the same brand data.
        let settings = seedSite().settings;
        try {
          settings = (await readSite(true)).settings;
        } catch (err) {
          console.warn("[manifest] readSite failed, using seed settings:", err);
        }
        return new Response(JSON.stringify(buildWebManifest(settings), null, 2), {
          headers: {
            "content-type": "application/manifest+json; charset=utf-8",
            "cache-control": "no-cache",
          },
        });
      },
    },
  },
});
