import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Site } from "./cms/types.ts";
import {
  PAGE_COPY,
  absUrl,
  buildLlmsTxt,
  buildRobotsTxt,
  buildRssXml,
  buildSitemapXml,
  catalogSitemapRows,
  clipMeta,
  documentTitle,
  siteLastmod,
  siteOrigin,
  staticSitemapRows,
} from "./seo.ts";

const site: Site = {
  settings: {
    studioName: "N3xUs Konc3pt'z",
    studioShort: "N3xUs",
    tagline: "Design. Development. Deployment.",
    email: "studio@n3xuskonc3ptz.com",
    discordUrl: "https://discord.gg/x",
    telegramUrl: "https://t.me/x",
    founderName: "Juan",
    founderTitle: "Founder",
    founderBio: "Builder.",
    genesis: "Studio genesis.",
    deskDays: "Mon–Fri",
    deskHours: "09:00–18:00",
    sla: "24h",
    zone: "America/Chicago",
    stack: ["React"],
    siteUrl: "https://n3xuskonc3ptz.com",
    seoTitle: PAGE_COPY.home.title,
    seoDescription: PAGE_COPY.home.description,
    seoKeywords: "web design",
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
  services: [
    {
      slug: "web-development",
      name: "Web Development",
      group: "Build",
      summary: "Custom applications.",
      description: "Full-stack engineering.",
      price: 1250,
      billing: "one-off",
      features: [],
      deliverables: [],
      timeline: "3–8 weeks",
      sortOrder: 0,
      published: true,
      seoTitle: "",
      seoDescription: "",
    },
  ],
  projects: [
    {
      slug: "pulse",
      title: "Pulse",
      client: "Pulse",
      kind: "Client",
      year: "2024",
      duration: "6w",
      role: "Full stack",
      tags: ["Web"],
      stack: ["React"],
      summary: "A marketing site.",
      problem: "p",
      approach: "a",
      outcome: "o",
      metrics: [],
      image: "/images/work-pulse.jpg",
      imageAlt: "Pulse",
      featured: true,
      published: true,
      sortOrder: 0,
      seoTitle: "",
      seoDescription: "",
    },
  ],
  products: [],
  posts: [
    {
      slug: "dark-not-neon",
      title: "Dark, not neon",
      date: "2024-06-01",
      excerpt: "Why the studio looks like this.",
      tags: ["Design"],
      reading: "4 min",
      body: [{ paragraphs: ["Body."] }],
      image: "",
      imageAlt: "",
      published: true,
      sortOrder: 0,
      seoTitle: "",
      seoDescription: "",
    },
  ],
  reviews: [],
  bots: [],
};

describe("seo", () => {
  it("clips descriptions on a word boundary", () => {
    const long =
      "Custom websites, apps, Discord bots and managed hosting from a South Texas studio that actually ships the work.";
    const clipped = clipMeta(long, 80);
    assert.ok(clipped.endsWith("…"));
    assert.ok(clipped.length <= 80);
    assert.equal(clipped.includes("  "), false);
  });

  it("builds absolute urls from the canonical origin", () => {
    assert.equal(siteOrigin({ siteUrl: "https://n3xuskonc3ptz.com/" }), "https://n3xuskonc3ptz.com");
    assert.equal(absUrl("/work", { siteUrl: "https://n3xuskonc3ptz.com" }), "https://n3xuskonc3ptz.com/work");
    assert.equal(absUrl("/", { siteUrl: "https://n3xuskonc3ptz.com" }), "https://n3xuskonc3ptz.com/");
  });

  it("does not suffix the studio name twice", () => {
    assert.equal(
      documentTitle("N3xUs Konc3pt'z — Web Design", "N3xUs Konc3pt'z", { home: true }),
      "N3xUs Konc3pt'z — Web Design",
    );
    assert.equal(documentTitle("Services", "N3xUs Konc3pt'z"), "Services · N3xUs Konc3pt'z");
  });

  it("emits a sitemap with the money pages", () => {
    const xml = buildSitemapXml("https://n3xuskonc3ptz.com", [
      ...staticSitemapRows(),
      ...catalogSitemapRows(site),
    ]);
    assert.match(xml, /<loc>https:\/\/n3xuskonc3ptz.com\/<\/loc>/);
    assert.match(xml, /\/services\/web-development/);
    assert.match(xml, /\/work\/pulse/);
    assert.match(xml, /\/journal\/dark-not-neon/);
    assert.equal(xml.includes("/owner"), false);
    assert.equal(xml.includes("/login"), false);
  });

  it("keeps robots open and points at the sitemap", () => {
    const txt = buildRobotsTxt("https://n3xuskonc3ptz.com");
    assert.match(txt, /Allow: \//);
    assert.match(txt, /Disallow: \/owner/);
    assert.match(txt, /Sitemap: https:\/\/n3xuskonc3ptz.com\/sitemap.xml/);
    assert.equal(txt.includes("Disallow: /\n"), false);
  });

  it("can close the index from the desk", () => {
    assert.equal(buildRobotsTxt("https://n3xuskonc3ptz.com", false).includes("Disallow: /"), true);
  });

  it("rss and llms list published journal posts", () => {
    const rss = buildRssXml(site);
    const llms = buildLlmsTxt(site);
    assert.match(rss, /<rss version="2.0">/);
    assert.match(rss, /Dark, not neon/);
    assert.match(llms, /## Services/);
    assert.match(llms, /web-development/);
    assert.ok(PAGE_COPY.home.title.includes("N3xUs"));
  });

  it("escapes xml in titles", () => {
    const xml = buildSitemapXml("https://n3xuskonc3ptz.com", [{ path: "/a&b" }]);
    assert.match(xml, /\/a\u0026amp;b/);
  });

  it("threads catalog updated_at into sitemap lastmod", () => {
    const withDates: Site = {
      ...site,
      services: [{ ...site.services[0], updatedAt: "2026-09-10T12:00:00Z" }],
      posts: [{ ...site.posts[0], updatedAt: "2026-08-01T00:00:00Z" }],
    };
    const rows = catalogSitemapRows(withDates);
    assert.equal(rows.find((r) => r.path === "/services/web-development")?.lastmod, "2026-09-10T12:00:00Z");
    assert.equal(rows.find((r) => r.path === "/journal/dark-not-neon")?.lastmod, "2026-08-01T00:00:00Z");
    // static pages inherit the newest catalog stamp
    const xml = buildSitemapXml("https://n3xuskonc3ptz.com", staticSitemapRows(siteLastmod(withDates)));
    assert.match(xml, /<lastmod>2026-09-10T12:00:00\.000Z<\/lastmod>/);
    // posts fall back to their editorial date when updatedAt is absent
    const fallback = catalogSitemapRows(site).find((r) => r.path === "/journal/dark-not-neon");
    assert.equal(fallback?.lastmod, "2024-06-01");
    assert.equal(siteLastmod({ ...site, services: [], projects: [], products: [], posts: [], bots: [] }), undefined);
  });
});
