import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { answerLocally, type LocalAnswerInput } from "./local-answer.ts";
import type { Product, Service, Settings } from "../cms/types.ts";

const settings: Settings = {
  studioName: "N3xUs Konc3pt'z",
  studioShort: "N3xUs",
  tagline: "Design. Development. Deployment.",
  email: "studio@n3xuskonc3ptz.com",
  discordUrl: "https://discord.gg/n3xus",
  telegramUrl: "https://t.me/n3xus",
  founderName: "Juan",
  founderTitle: "Founder",
  founderBio: "",
  genesis: "",
  deskDays: "Mon–Fri",
  deskHours: "09:00–18:00",
  sla: "24h first response on weekdays.",
  zone: "America/Chicago",
  stack: [],
  siteUrl: "https://n3xuskonc3ptz.com",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  city: "San Antonio",
  region: "Texas",
  country: "US",
  twitterHandle: "",
  googleVerification: "",
  indexable: true,
};

const services: Service[] = [
  {
    slug: "discord-bot",
    name: "Discord Bot",
    group: "Automate",
    summary: "A bot for your server.",
    description: "",
    price: 250,
    billing: "one-off",
    features: [],
    deliverables: [],
    timeline: "1 week",
    sortOrder: 0,
    published: true,
    seoTitle: "",
    seoDescription: "",
  },
  {
    slug: "web-design",
    name: "Web Design",
    group: "Build",
    summary: "A site that sells.",
    description: "",
    price: 900,
    billing: "one-off",
    features: [],
    deliverables: [],
    timeline: "2 weeks",
    sortOrder: 1,
    published: true,
    seoTitle: "",
    seoDescription: "",
  },
];

const products: Product[] = [
  {
    slug: "discord-economy-template",
    name: "Discord Economy Template",
    price: 49,
    blurb: "Credits, jobs, shop.",
    description: "",
    includes: [],
    stack: [],
    published: true,
    sortOrder: 0,
    seoTitle: "",
    seoDescription: "",
  },
];

function ask(text: string): string {
  const input: LocalAnswerInput = {
    botName: "Relay",
    settings,
    services,
    products,
    faqs: [],
    messages: [{ role: "user", content: text }],
  };
  return answerLocally(input);
}

describe("answerLocally — studio intents", () => {
  it("answers hours from settings", () => {
    const reply = ask("What are your hours?");
    assert.match(reply, /Mon–Fri/);
    assert.match(reply, /09:00–18:00/);
  });

  it("answers a named service price from the catalog", () => {
    const reply = ask("How much is a Discord bot?");
    assert.match(reply, /\$250/);
  });

  it("lists prices when no service is named", () => {
    const reply = ask("How much do you charge?");
    assert.match(reply, /\$250/);
    assert.match(reply, /\$900/);
  });

  it("points to /book for starting a project", () => {
    assert.match(ask("I want to start a project"), /\/book/);
  });

  it("gives contact info for a human", () => {
    assert.match(ask("Can I talk to a human?"), /studio@n3xuskonc3ptz\.com/);
  });

  it("greets", () => {
    assert.match(ask("hey"), /Hey/);
  });
});

describe("answerLocally — coding knowledge", () => {
  it("answers a how-to instead of the service blurb", () => {
    const reply = ask("How do I make a Discord bot?");
    assert.match(reply, /Developer Portal/);
    assert.doesNotMatch(reply, /\$250/);
  });

  it("answers a plain coding question", () => {
    assert.match(ask("What is TypeScript?"), /types/);
    assert.match(ask("how to center a div"), /flex/);
  });

  it("falls back with what it can do", () => {
    const reply = ask("blorp zorp fnord");
    assert.match(reply, /coding questions/);
    assert.match(reply, /\/book/);
  });
});
