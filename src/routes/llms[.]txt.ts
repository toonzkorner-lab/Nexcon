import { createFileRoute } from "@tanstack/react-router";
import { readSite } from "@/lib/cms/db";
import { buildLlmsTxt } from "@/lib/seo";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const site = await readSite(true);
        return new Response(buildLlmsTxt(site), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
