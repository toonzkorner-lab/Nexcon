import type { Post, Product, Project, Service, Settings, Site } from "./cms/types";

export const DEFAULT_ORIGIN = "https://n3xuskonc3ptz.com";

export const PAGE_COPY = {
  home: {
    title: "N3xUs Konc3pt'z — Web Design, Development & Hosting",
    description:
      "South Texas digital studio for custom websites, apps, Discord and Telegram bots, SEO, and managed hosting. Design, development, and deployment from one desk.",
  },
  services: {
    title: "Web Design, Development, Bots & Hosting",
    description:
      "Priced catalog for custom web design and development, Discord and Telegram bots, managed cloud hosting, and SEO. Remote-ready, South Texas studio.",
  },
  work: {
    title: "Case Studies — Web, Bots & Systems",
    description:
      "Client and studio systems on the record: websites, Discord bots, hosting, and internal tools shipped by N3xUs Konc3pt'z.",
  },
  store: {
    title: "Digital Goods — Bots, Kits & Themes",
    description:
      "Ready-to-run Discord bots, site kits, and themes from N3xUs Konc3pt'z. One production license, fulfillment through the studio.",
  },
  journal: {
    title: "Journal — Design, Development, Deployment",
    description:
      "Notes from the N3xUs desk on bots, type, hiring, hosting, and how a small studio actually ships.",
  },
  studio: {
    title: "About the Studio — South Texas Digital Practice",
    description:
      "N3xUs Konc3pt'z is a South Texas studio for the whole loop: design, development, and deployment. Founded and run by Juan.",
  },
  about: {
    title: "About N3xUs Konc3pt'z — Juan, South Texas",
    description:
      "Meet Juan Socarras, founder of N3xUs Konc3pt'z in South Texas. Design, React, Postgres, Discord bots, hosting. Catalog from $99 bots to $1,250 web development.",
  },
  contact: {
    title: "Contact the Studio",
    description:
      "Write N3xUs Konc3pt'z by form, email, Discord, or Telegram. Weekday first response within 24 hours.",
  },
  book: {
    title: "Start a Project — Open a Brief",
    description:
      "Four questions to scope web design, development, bots, or hosting with N3xUs Konc3pt'z. We reply within a weekday.",
  },
  transmissions: {
    title: "Client Reviews & Transmissions",
    description:
      "What it was like to ship with N3xUs Konc3pt'z — reviews from clients and collaborators.",
  },
  lab: {
    title: "Lab — Live Bot Demos",
    description:
      "Try N3xUs bots in the browser: a Discord economy ledger and a Telegram desk responder. Not a screenshot — a sandbox you can use.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How N3xUs Konc3pt'z handles the information you send through the site: briefs, messages, orders, and analytics.",
  },
  terms: {
    title: "Terms of Service",
    description:
      "The working terms for projects, digital goods, and services from N3xUs Konc3pt'z.",
  },
} as const;

export function siteFromMatches(matches: ReadonlyArray<{ context?: { site?: Site } }>): Site {
  for (const m of matches) {
    if (m.context?.site) return m.context.site;
  }
  return {
    settings: {
      studioName: "N3xUs Konc3pt'z",
      studioShort: "N3xUs",
      tagline: "Design. Development. Deployment.",
      email: "studio@n3xuskonc3ptz.com",
      discordUrl: "",
      telegramUrl: "",
      founderName: "Juan",
      founderTitle: "Founder",
      founderBio: "",
      genesis: "",
      deskDays: "Mon–Fri",
      deskHours: "09:00–18:00",
      sla: "24h first response on weekdays",
      zone: "America/Chicago",
      stack: [],
      siteUrl: DEFAULT_ORIGIN,
      seoTitle: PAGE_COPY.home.title,
      seoDescription: PAGE_COPY.home.description,
      seoKeywords: "",
      city: "South Texas",
      region: "Texas",
      country: "US",
      twitterHandle: "",
      googleVerification: "",
      indexable: true,
    },
    faqs: [],
    principles: [],
    pipeline: [],
    engagements: [],
    capabilities: [],
    services: [],
    projects: [],
    products: [],
    posts: [],
    reviews: [],
    bots: [],
  };
}

export function siteOrigin(settings?: Pick<Settings, "siteUrl"> | null): string {
  const raw = settings?.siteUrl?.trim() || DEFAULT_ORIGIN;
  return raw.replace(/\/+$/, "");
}

export function absUrl(path: string, settings?: Pick<Settings, "siteUrl"> | null): string {
  const origin = siteOrigin(settings);
  if (!path || path === "/") return `${origin}/`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absImage(src: string | undefined, settings?: Pick<Settings, "siteUrl"> | null): string {
  if (!src) return absUrl("/og.jpg", settings);
  return absUrl(src, settings);
}

export function clipMeta(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 80 ? cut.slice(0, sp) : cut).trim()}…`;
}

export function documentTitle(title: string, studioName: string, opts?: { home?: boolean }): string {
  const t = title.trim();
  if (opts?.home || t.includes(studioName)) return t;
  return `${t} · ${studioName}`;
}

export function listingTitle(
  item: { seoTitle?: string; name?: string; title?: string },
  fallback: string,
): string {
  return item.seoTitle?.trim() || item.name?.trim() || item.title?.trim() || fallback;
}

export function listingDescription(
  item: { seoDescription?: string; summary?: string; excerpt?: string; blurb?: string; description?: string },
  fallback: string,
): string {
  return clipMeta(
    item.seoDescription?.trim() ||
      item.summary?.trim() ||
      item.excerpt?.trim() ||
      item.blurb?.trim() ||
      item.description?.trim() ||
      fallback,
  );
}

export type HeadOpts = {
  title: string;
  description: string;
  path: string;
  site?: Site;
  image?: string;
  type?: "website" | "article" | "product";
  index?: boolean;
  home?: boolean;
  publishedTime?: string;
};

export function pageHead(opts: HeadOpts) {
  const site = opts.site ?? siteFromMatches([]);
  const { settings } = site;
  const title = documentTitle(opts.title, settings.studioName, { home: opts.home });
  const description = clipMeta(opts.description || settings.seoDescription || PAGE_COPY.home.description);
  const url = absUrl(opts.path, settings);
  const image = absImage(opts.image, settings);
  const index = (opts.index ?? true) && settings.indexable;
  const robots = index ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow";
  const keywords = settings.seoKeywords.trim();

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "googlebot", content: robots },
    { name: "author", content: settings.founderName || settings.studioName },
    { name: "application-name", content: settings.studioName },
    { name: "apple-mobile-web-app-title", content: settings.studioShort || settings.studioName },
    { name: "theme-color", content: "#090a0b" },
    { name: "format-detection", content: "telephone=no" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: opts.type === "article" ? "article" : "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: settings.studioName },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (keywords) meta.push({ name: "keywords", content: keywords });
  if (settings.twitterHandle) {
    const handle = settings.twitterHandle.replace(/^@/, "");
    meta.push({ name: "twitter:site", content: `@${handle}` });
    meta.push({ name: "twitter:creator", content: `@${handle}` });
  }
  if (settings.googleVerification) {
    meta.push({ name: "google-site-verification", content: settings.googleVerification });
  }
  if (settings.region) {
    meta.push({ name: "geo.region", content: settings.country === "US" ? `US-${regionCode(settings.region)}` : settings.country });
    meta.push({ name: "geo.placename", content: [settings.city, settings.region].filter(Boolean).join(", ") });
  }
  if (opts.publishedTime) {
    meta.push({ property: "article:published_time", content: opts.publishedTime });
    meta.push({ property: "article:author", content: settings.founderName });
  }

  return {
    meta,
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: url },
      { rel: "alternate", hrefLang: "x-default", href: url },
      { rel: "alternate", type: "application/rss+xml", href: absUrl("/rss.xml", settings), title: `${settings.studioName} journal` },
    ],
  };
}

export function privateHead(title: string, description: string) {
  return pageHead({
    title,
    description,
    path: "/login",
    index: false,
  });
}

function regionCode(region: string): string {
  const map: Record<string, string> = { texas: "TX", "south texas": "TX" };
  return map[region.trim().toLowerCase()] ?? region.slice(0, 2).toUpperCase();
}

export type SitemapRow = {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

export function isoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
    return undefined;
  }
  return d.toISOString();
}

export function buildSitemapXml(origin: string, rows: SitemapRow[]): string {
  const urls = rows
    .map((r) => {
      const loc = absUrl(r.path, { siteUrl: origin });
      const last = isoDate(r.lastmod);
      return [
        "<url>",
        `<loc>${escapeXml(loc)}</loc>`,
        last ? `<lastmod>${last}</lastmod>` : "",
        r.changefreq ? `<changefreq>${r.changefreq}</changefreq>` : "",
        r.priority ? `<priority>${r.priority}</priority>` : "",
        "</url>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`;
}

export function buildRobotsTxt(origin: string, indexable = true): string {
  const o = origin.replace(/\/+$/, "");
  if (!indexable) {
    return `User-agent: *\nDisallow: /\n`;
  }
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /owner",
    "Disallow: /owner/",
    "Disallow: /login",
    "Disallow: /cart",
    "Disallow: /api/",
    "",
    `Sitemap: ${o}/sitemap.xml`,
    "",
  ].join("\n");
}

export function buildRssXml(site: Site): string {
  const origin = siteOrigin(site.settings);
  const items = site.posts
    .map((p) => {
      const link = absUrl(`/journal/${p.slug}`, site.settings);
      const desc = clipMeta(p.excerpt || listingDescription(p, PAGE_COPY.journal.description), 240);
      return [
        "<item>",
        `<title>${escapeXml(p.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `<pubDate>${rssDate(p.date)}</pubDate>`,
        `<description>${escapeXml(desc)}</description>`,
        "</item>",
      ].join("");
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${escapeXml(site.settings.studioName)} journal</title><link>${escapeXml(origin)}/journal</link><description>${escapeXml(PAGE_COPY.journal.description)}</description><language>en-us</language>${items}</channel></rss>\n`;
}

export function buildLlmsTxt(site: Site): string {
  const origin = siteOrigin(site.settings);
  const s = site.settings;
  const lines = [
    `# ${s.studioName}`,
    `> ${s.tagline} ${s.seoDescription || PAGE_COPY.home.description}`,
    "",
    `Founded and run by ${s.founderName}, ${s.founderTitle}. ${s.city || "South Texas"}, ${s.region}.`,
    "",
    "## Site",
    `- [Home](${origin}/): ${PAGE_COPY.home.description}`,
    `- [Services](${origin}/services): ${PAGE_COPY.services.description}`,
    `- [Work](${origin}/work): ${PAGE_COPY.work.description}`,
    `- [Store](${origin}/store): ${PAGE_COPY.store.description}`,
    `- [Journal](${origin}/journal): ${PAGE_COPY.journal.description}`,
    `- [Lab](${origin}/lab): ${PAGE_COPY.lab.description}`,
    `- [About](${origin}/about): ${PAGE_COPY.about.description}`,
    `- [Studio](${origin}/studio): ${PAGE_COPY.studio.description}`,
    `- [Contact](${origin}/contact)`,
    `- [Open a brief](${origin}/book)`,
    "",
    "## Services",
    ...site.services.map((svc) => `- [${svc.name}](${origin}/services/${svc.slug}): ${svc.summary}`),
    "",
    "## Work",
    ...site.projects.map((p) => `- [${p.title}](${origin}/work/${p.slug}): ${p.summary}`),
    "",
    "## Journal",
    ...site.posts.map((p) => `- [${p.title}](${origin}/journal/${p.slug}): ${p.excerpt}`),
    "",
    "## Lab",
    ...site.bots.map((b) => `- [${b.name}](${origin}/lab/${b.slug}): ${b.tagline}`),
    "",
    "## Optional",
    `- [RSS](${origin}/rss.xml)`,
    `- [Sitemap](${origin}/sitemap.xml)`,
    "",
  ];
  return lines.join("\n");
}

export function staticSitemapRows(updatedAt?: string): SitemapRow[] {
  return [
    { path: "/", lastmod: updatedAt, changefreq: "weekly", priority: "1.0" },
    { path: "/services", lastmod: updatedAt, changefreq: "weekly", priority: "0.9" },
    { path: "/work", lastmod: updatedAt, changefreq: "weekly", priority: "0.8" },
    { path: "/store", lastmod: updatedAt, changefreq: "weekly", priority: "0.7" },
    { path: "/lab", lastmod: updatedAt, changefreq: "weekly", priority: "0.8" },
    { path: "/journal", lastmod: updatedAt, changefreq: "weekly", priority: "0.7" },
    { path: "/about", lastmod: updatedAt, changefreq: "monthly", priority: "0.8" },
    { path: "/studio", lastmod: updatedAt, changefreq: "monthly", priority: "0.6" },
    { path: "/contact", lastmod: updatedAt, changefreq: "monthly", priority: "0.5" },
    { path: "/book", lastmod: updatedAt, changefreq: "monthly", priority: "0.8" },
    { path: "/transmissions", lastmod: updatedAt, changefreq: "monthly", priority: "0.4" },
  ];
}

export function catalogSitemapRows(site: Site): SitemapRow[] {
  return [
    ...site.services.map((s: Service) => ({
      path: `/services/${s.slug}`,
      lastmod: s.updatedAt,
      changefreq: "monthly",
      priority: "0.8",
    })),
    ...site.projects.map((p: Project) => ({
      path: `/work/${p.slug}`,
      lastmod: p.updatedAt,
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...site.products.map((p: Product) => ({
      path: `/store/${p.slug}`,
      lastmod: p.updatedAt,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...site.posts.map((p: Post) => ({
      path: `/journal/${p.slug}`,
      lastmod: p.updatedAt ?? p.date,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...site.bots.map((b) => ({
      path: `/lab/${b.slug}`,
      lastmod: b.updatedAt,
      changefreq: "weekly",
      priority: "0.8",
    })),
  ];
}

/**
 * Newest content timestamp across the catalog, used as <lastmod> for the
 * static pages. Falls back to post editorial dates when a row `updatedAt`
 * is not populated yet.
 */
export function siteLastmod(site: Site): string | undefined {
  const stamps: number[] = [];
  const push = (v?: string) => {
    if (!v) return;
    const t = new Date(v).getTime();
    if (!Number.isNaN(t)) stamps.push(t);
  };
  for (const s of site.services) push(s.updatedAt);
  for (const p of site.projects) push(p.updatedAt);
  for (const p of site.products) push(p.updatedAt);
  for (const p of site.posts) push(p.updatedAt ?? p.date);
  for (const b of site.bots) push(b.updatedAt);
  if (!stamps.length) return undefined;
  return new Date(Math.max(...stamps)).toISOString();
}

function rssDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "\u0026amp;";
      case "<":
        return "\u0026lt;";
      case ">":
        return "\u0026gt;";
      case '"':
        return "\u0026quot;";
      default:
        return "\u0026apos;";
    }
  });
}
