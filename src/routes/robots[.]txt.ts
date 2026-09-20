import { createFileRoute } from "@tanstack/react-router";
import { readSite } from "@/lib/cms/db";
import { buildRobotsTxt, siteOrigin } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const site = await readSite(true);
        const body = buildRobotsTxt(siteOrigin(site.settings), site.settings.indexable);
        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
