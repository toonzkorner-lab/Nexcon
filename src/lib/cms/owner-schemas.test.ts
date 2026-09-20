import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  botSchema,
  capabilitySchema,
  engagementSchema,
  faqSchema,
  pipelineSchema,
  postSchema,
  principleSchema,
  productSchema,
  projectSchema,
  reviewPatchSchema,
  serviceSchema,
  settingsSchema,
} from "./owner-schemas.ts";

// Fixtures mirror exactly what the owner desk sends (see src/routes/owner.*.tsx).
const validSettings = {
  studioName: "N3xUs Konc3pt'z",
  studioShort: "N3XUS",
  tagline: "Websites with teeth.",
  email: "studio@n3xuskonc3ptz.com",
  discordUrl: "https://discord.gg/x",
  telegramUrl: "https://t.me/x",
  founderName: "Kartoon",
  founderTitle: "Founder",
  founderBio: "Builds things.",
  genesis: "Started in a garage.",
  deskDays: "Mon-Fri",
  deskHours: "9-5",
  sla: "24h",
  zone: "America/Chicago",
  stack: ["React", "Node"],
  siteUrl: "https://n3xuskonc3ptz.com",
  seoTitle: "N3xUs",
  seoDescription: "Studio",
  seoKeywords: "web",
  city: "San Antonio",
  region: "TX",
  country: "US",
  twitterHandle: "@n3xus",
  googleVerification: "",
  indexable: true,
};

const validService = {
  slug: "web-build",
  name: "Web Build",
  group: "Build",
  summary: "A site.",
  description: "Full build.",
  price: 2500,
  billing: "one-off",
  hoursNote: "",
  features: ["Design", "Build"],
  deliverables: ["Site"],
  timeline: "4 weeks",
  sortOrder: 0,
  published: true,
  seoTitle: "",
  seoDescription: "",
};

const validPost = {
  slug: "hello-world",
  title: "Hello World",
  date: "2026-09-20",
  excerpt: "First.",
  tags: ["news"],
  reading: "2 min",
  body: [{ heading: "Intro", paragraphs: ["Hello."] }, { paragraphs: ["No heading."] }],
  image: "/images/x.jpg",
  imageAlt: "Alt",
  published: true,
  sortOrder: 0,
  seoTitle: "",
  seoDescription: "",
  updatedAt: "2026-09-20T00:00:00Z",
};

describe("owner write schemas", () => {
  it("accepts desk-shaped payloads", () => {
    assert.doesNotThrow(() => settingsSchema.parse(validSettings));
    assert.doesNotThrow(() => serviceSchema.parse(validService));
    assert.doesNotThrow(() => postSchema.parse(validPost));
    assert.doesNotThrow(() =>
      productSchema.parse({
        slug: "audit",
        name: "Audit",
        price: 99.5,
        blurb: "b",
        description: "d",
        includes: [],
        stack: [],
        published: false,
        sortOrder: 1,
        seoTitle: "",
        seoDescription: "",
      }),
    );
    assert.doesNotThrow(() =>
      projectSchema.parse({
        slug: "p1",
        title: "T",
        client: "C",
        kind: "Client",
        year: "2026",
        duration: "1m",
        role: "Dev",
        tags: [],
        stack: [],
        summary: "",
        problem: "",
        approach: "",
        outcome: "",
        metrics: [{ value: "2x", label: "Speed" }],
        image: "",
        imageAlt: "",
        featured: false,
        published: true,
        sortOrder: 0,
        seoTitle: "",
        seoDescription: "",
      }),
    );
    assert.doesNotThrow(() =>
      botSchema.parse({
        slug: "b1",
        name: "Bot",
        tagline: "t",
        description: "d",
        kind: "chat",
        channel: "Discord",
        welcome: "hi",
        persona: "p",
        starters: [],
        commands: [{ cmd: "/go", hint: "Go" }],
        productSlug: "",
        published: true,
        sortOrder: 0,
        seoTitle: "",
        seoDescription: "",
      }),
    );
    assert.doesNotThrow(() => reviewPatchSchema.parse({ id: "r1", published: true }));
    assert.doesNotThrow(() =>
      faqSchema.parse({ id: "", question: "Q", answer: "A", sortOrder: 0 }),
    );
    assert.doesNotThrow(() =>
      principleSchema.parse({ id: "p1", num: "01", title: "T", body: "B", sortOrder: 0 }),
    );
    assert.doesNotThrow(() =>
      pipelineSchema.parse({ id: "p1", num: "01", title: "T", body: "B", sortOrder: 0 }),
    );
    assert.doesNotThrow(() =>
      engagementSchema.parse({
        id: "e1",
        name: "N",
        rangeLabel: "$",
        body: "B",
        includes: ["x"],
        sortOrder: 0,
      }),
    );
    assert.doesNotThrow(() =>
      capabilitySchema.parse({ id: "c1", area: "Web", inScope: true, sortOrder: 0 }),
    );
  });

  it("rejects empty slugs (the DB upsert key)", () => {
    assert.throws(() => serviceSchema.parse({ ...validService, slug: "" }));
    assert.throws(() => postSchema.parse({ ...validPost, slug: "" }));
    assert.throws(() => reviewPatchSchema.parse({ id: "", published: true }));
  });

  it("rejects wrong types and out-of-domain values", () => {
    assert.throws(() => serviceSchema.parse({ ...validService, price: Number.NaN }));
    assert.throws(() => serviceSchema.parse({ ...validService, price: "2500" }));
    assert.throws(() => serviceSchema.parse({ ...validService, billing: "yearly" }));
    assert.throws(() => serviceSchema.parse({ ...validService, published: "yes" }));
    assert.throws(() => serviceSchema.parse({ ...validService, sortOrder: 1.5 }));
    assert.throws(() => settingsSchema.parse({ ...validSettings, indexable: "yes" }));
    assert.throws(() => settingsSchema.parse({ ...validSettings, stack: "React" }));
    assert.throws(() => postSchema.parse({ ...validPost, body: [{ paragraphs: "nope" }] }));
    assert.throws(() =>
      botSchema.parse({
        slug: "b1",
        name: "B",
        tagline: "",
        description: "",
        kind: "chat",
        channel: "",
        welcome: "",
        persona: "",
        starters: [],
        commands: [{ cmd: "/go" }],
        productSlug: "",
        published: true,
        sortOrder: 0,
        seoTitle: "",
        seoDescription: "",
      }),
    );
  });

  it("rejects missing required fields and non-array table payloads", () => {
    const { email: _email, ...noEmail } = validSettings;
    assert.throws(() => settingsSchema.parse(noEmail));
    assert.throws(() => faqSchema.array().parse({ id: "x" }));
    assert.throws(() => postSchema.parse({ ...validPost, title: undefined }));
  });

  it("strips unknown keys instead of trusting them", () => {
    const out = serviceSchema.parse({ ...validService, isAdmin: true, price: 10 });
    assert.ok(!("isAdmin" in out));
    assert.equal(out.price, 10);
  });
});
