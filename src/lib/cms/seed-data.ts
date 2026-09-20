import { FAQ, CAPABILITIES, ENGAGEMENT, FOUNDER, PIPELINE, PRINCIPLES, STACK } from "@/data/studio";
import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/work";
import { PRODUCTS } from "@/data/products";
import { POSTS } from "@/data/posts";
import { SEED_REVIEWS } from "@/data/reviews";
import { SEED_BOTS } from "@/data/bots";
import { CHANNELS, STUDIO_EMAIL, STUDIO_NAME, STUDIO_SHORT, STUDIO_TAGLINE } from "@/data/nav";
import type { Site } from "./types";

export const SEED_GENESIS =
  "N3xUs Konc3pt'z started because the usual split fails: a designer who never deploys, an engineer who inherits a moodboard, a host nobody owns. We take the 3 D's as one job — design, development, and deployment — from one desk in South Texas.\n\nThe work is specific. Ecommerce storefronts, contractor platforms (Elite Crete Systems South Texas is on the record), Discord.js bots with a real ledger, Telegram shop desks, CRMs, and APIs. If it has to live on a network, it is in scope. Native iOS/Android, print, and running someone else's paid-media spend are not.\n\nYou start with a four-question brief. Catalog floors today: web design $750, web development $1,250, a custom Discord or Telegram bot $99, managed site hosting $19.99/mo. We reply within one weekday. If we are the wrong studio, we say so.";

export function seedSite(): Site {
  return {
    settings: {
      studioName: STUDIO_NAME,
      studioShort: STUDIO_SHORT,
      tagline: STUDIO_TAGLINE,
      email: STUDIO_EMAIL,
      discordUrl: CHANNELS.discord,
      telegramUrl: CHANNELS.telegram,
      founderName: FOUNDER.name,
      founderTitle: FOUNDER.title,
      founderBio: FOUNDER.bio,
      genesis: SEED_GENESIS,
      deskDays: "Mon–Fri",
      deskHours: "09:00–18:00",
      sla: "24h first response on weekdays",
      zone: "America/Chicago",
      stack: [...STACK],
      siteUrl: "https://n3xuskonc3ptz.com",
      seoTitle: "N3xUs Konc3pt'z — Web Design, Development & Hosting",
      seoDescription:
        "South Texas digital studio for custom websites, apps, Discord and Telegram bots, SEO, and managed hosting. Design, development, and deployment from one desk.",
      seoKeywords:
        "web design, web development, discord bots, telegram bots, managed hosting, SEO, South Texas, custom websites, N3xUs Konc3ptz",
      city: "South Texas",
      region: "Texas",
      country: "US",
      twitterHandle: "",
      googleVerification: "",
      indexable: true,
    },
    faqs: FAQ.map((f, i) => ({ id: `faq-${i + 1}`, question: f.q, answer: f.a, sortOrder: i })),
    principles: PRINCIPLES.map((p, i) => ({ id: `pr-${i + 1}`, ...p, sortOrder: i })),
    pipeline: PIPELINE.map((p, i) => ({ id: `pl-${i + 1}`, ...p, sortOrder: i })),
    engagements: ENGAGEMENT.map((e, i) => ({
      id: `eg-${i + 1}`,
      name: e.name,
      rangeLabel: e.range,
      body: e.body,
      includes: e.includes,
      sortOrder: i,
    })),
    capabilities: CAPABILITIES.map((c, i) => ({
      id: `cap-${i + 1}`,
      area: c.area,
      inScope: c.in,
      sortOrder: i,
    })),
    services: SERVICES.map((s, i) => ({
      ...s,
      sortOrder: i,
      published: true,
      seoTitle: "",
      seoDescription: "",
    })),
    projects: PROJECTS.map((p, i) => ({
      ...p,
      featured: Boolean(p.featured),
      sortOrder: i,
      published: true,
      imageAlt: p.imageAlt ?? p.title,
      seoTitle: "",
      seoDescription: "",
    })),
    products: PRODUCTS.map((p, i) => ({
      ...p,
      sortOrder: i,
      published: true,
      seoTitle: "",
      seoDescription: "",
    })),
    posts: POSTS.map((p, i) => ({
      ...p,
      sortOrder: i,
      published: true,
      seoTitle: "",
      seoDescription: "",
    })),
    reviews: SEED_REVIEWS.map((r) => ({ ...r, published: true })),
    bots: SEED_BOTS.map((b) => ({ ...b })),
  };
}
