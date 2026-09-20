import { z } from "zod";

/**
 * Real Zod validators for every owner write (used by `src/lib/cms/owner.ts`).
 * They mirror `src/lib/cms/types.ts` exactly: drafts legitimately contain
 * empty strings, so text fields are required-but-allow-empty, while DB keys
 * (slugs, review ids) must be non-empty. Extra/unknown keys are stripped,
 * never trusted.
 */
export const slugSchema = z.string().min(1).max(120);
const idSchema = z.string().max(120); // empty allowed: replaceSimple() generates one
const sortOrderSchema = z.number().int();
const strListSchema = z.array(z.string());
const seoFields = {
  seoTitle: z.string(),
  seoDescription: z.string(),
};
const updatedAtField = { updatedAt: z.string().optional() };

export const settingsSchema = z.object({
  studioName: z.string(),
  studioShort: z.string(),
  tagline: z.string(),
  email: z.string(),
  discordUrl: z.string(),
  telegramUrl: z.string(),
  founderName: z.string(),
  founderTitle: z.string(),
  founderBio: z.string(),
  genesis: z.string(),
  deskDays: z.string(),
  deskHours: z.string(),
  sla: z.string(),
  zone: z.string(),
  stack: strListSchema,
  siteUrl: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  seoKeywords: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  twitterHandle: z.string(),
  googleVerification: z.string(),
  indexable: z.boolean(),
});

export const faqSchema = z.object({
  id: idSchema,
  question: z.string(),
  answer: z.string(),
  sortOrder: sortOrderSchema,
});
export const principleSchema = z.object({
  id: idSchema,
  num: z.string(),
  title: z.string(),
  body: z.string(),
  sortOrder: sortOrderSchema,
});
export const pipelineSchema = z.object({
  id: idSchema,
  num: z.string(),
  title: z.string(),
  body: z.string(),
  sortOrder: sortOrderSchema,
});
export const engagementSchema = z.object({
  id: idSchema,
  name: z.string(),
  rangeLabel: z.string(),
  body: z.string(),
  includes: strListSchema,
  sortOrder: sortOrderSchema,
});
export const capabilitySchema = z.object({
  id: idSchema,
  area: z.string(),
  inScope: z.boolean(),
  sortOrder: sortOrderSchema,
});

export const serviceSchema = z.object({
  slug: slugSchema,
  name: z.string(),
  group: z.string(),
  summary: z.string(),
  description: z.string(),
  price: z.number().finite(),
  billing: z.enum(["one-off", "monthly"]),
  hoursNote: z.string().optional(),
  features: strListSchema,
  deliverables: strListSchema,
  timeline: z.string(),
  sortOrder: sortOrderSchema,
  published: z.boolean(),
  ...seoFields,
  ...updatedAtField,
});

export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string(),
  client: z.string(),
  kind: z.string(),
  year: z.string(),
  duration: z.string(),
  role: z.string(),
  tags: strListSchema,
  stack: strListSchema,
  summary: z.string(),
  problem: z.string(),
  approach: z.string(),
  outcome: z.string(),
  metrics: z.array(z.object({ value: z.string(), label: z.string() })),
  image: z.string(),
  imageAlt: z.string(),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: sortOrderSchema,
  ...seoFields,
  ...updatedAtField,
});

export const productSchema = z.object({
  slug: slugSchema,
  name: z.string(),
  price: z.number().finite(),
  blurb: z.string(),
  description: z.string(),
  includes: strListSchema,
  stack: strListSchema,
  published: z.boolean(),
  sortOrder: sortOrderSchema,
  ...seoFields,
  ...updatedAtField,
});

export const postSchema = z.object({
  slug: slugSchema,
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  tags: strListSchema,
  reading: z.string(),
  body: z.array(z.object({ heading: z.string().optional(), paragraphs: strListSchema })),
  image: z.string(),
  imageAlt: z.string(),
  published: z.boolean(),
  sortOrder: sortOrderSchema,
  ...seoFields,
  ...updatedAtField,
});

export const botSchema = z.object({
  slug: slugSchema,
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  kind: z.string(),
  channel: z.string(),
  welcome: z.string(),
  persona: z.string(),
  starters: strListSchema,
  commands: z.array(z.object({ cmd: z.string(), hint: z.string() })),
  productSlug: z.string(),
  published: z.boolean(),
  sortOrder: sortOrderSchema,
  ...seoFields,
  ...updatedAtField,
});

export const reviewPatchSchema = z.object({
  id: z.string().min(1).max(120),
  published: z.boolean(),
  quote: z.string().optional(),
  name: z.string().optional(),
});
