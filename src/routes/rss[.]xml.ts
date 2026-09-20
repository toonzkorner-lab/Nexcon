import { createFileRoute } from "@tanstack/react-router";
import { readSite } from "@/lib/cms/db";
import { buildRssXml } from "@/lib/seo";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const site = await readSite(true);
        return new Response(buildRssXml(site), {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
