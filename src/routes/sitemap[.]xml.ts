import { createFileRoute } from "@tanstack/react-router";
import { readSite } from "@/lib/cms/db";
import { buildSitemapXml, catalogSitemapRows, siteLastmod, siteOrigin, staticSitemapRows } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const site = await readSite(true);
        const xml = buildSitemapXml(siteOrigin(site.settings), [
          ...staticSitemapRows(siteLastmod(site)),
          ...catalogSitemapRows(site),
        ]);
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
