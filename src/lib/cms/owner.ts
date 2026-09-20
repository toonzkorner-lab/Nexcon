import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  addOwner,
  claimOrRequireOwner,
  deleteBySlug,
  deleteReview,
  listOwners,
  readInbox,
  readSite,
  removeOwner,
  replaceSimple,
  saveSettings,
  setRowStatus,
  upsertBot,
  upsertPost,
  upsertProduct,
  upsertProject,
  upsertReview,
  upsertService,
} from "./db";
import type { Capability, Engagement, Faq, PipelineStep, Post, Principle, Product, Project, Service, Settings, ShowcaseBot } from "./types";

async function asOwner(userId: string) {
  await claimOrRequireOwner(userId);
}

const result = async <T>(fn: () => Promise<T>): Promise<{ ok: true; data: T } | { ok: false; error: string }> => {
  try {
    return { ok: true, data: await fn() };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Request failed." };
  }
};

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
} from "./owner-schemas";

export const ownerBootstrap = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) =>
    result(async () => {
      await asOwner(context.userId);
      const [site, inbox, owners] = await Promise.all([readSite(false), readInbox(), listOwners()]);
      return { site, inbox, owners, userId: context.userId };
    }),
  );

export const ownerSaveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => settingsSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await saveSettings(data);
    }),
  );

export const ownerSaveFaqs = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.array(faqSchema).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await replaceSimple("faqs", data);
    }),
  );

export const ownerSavePrinciples = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.array(principleSchema).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await replaceSimple("principles", data);
    }),
  );

export const ownerSavePipeline = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.array(pipelineSchema).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await replaceSimple("pipeline", data);
    }),
  );

export const ownerSaveEngagements = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.array(engagementSchema).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await replaceSimple("engagements", data);
    }),
  );

export const ownerSaveCapabilities = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.array(capabilitySchema).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await replaceSimple("capabilities", data);
    }),
  );

export const ownerSaveService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => serviceSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await upsertService(data);
    }),
  );

export const ownerDeleteService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await deleteBySlug("services", data.slug);
    }),
  );

export const ownerSaveProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => projectSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await upsertProject(data);
    }),
  );

export const ownerDeleteProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await deleteBySlug("projects", data.slug);
    }),
  );

export const ownerSaveProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => productSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await upsertProduct(data);
    }),
  );

export const ownerDeleteProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await deleteBySlug("products", data.slug);
    }),
  );

export const ownerSavePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => postSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await upsertPost(data);
    }),
  );

export const ownerDeletePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await deleteBySlug("posts", data.slug);
    }),
  );

export const ownerSaveBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => botSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await upsertBot(data);
    }),
  );

export const ownerDeleteBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await deleteBySlug("bots", data.slug);
    }),
  );

export const ownerSaveReview = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => reviewPatchSchema.parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      const site = await readSite(false);
      const current = site.reviews.find((r) => r.id === data.id);
      if (!current) throw new Error("Review not found.");
      await upsertReview({ ...current, ...data });
    }),
  );

export const ownerDeleteReview = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await deleteReview(data.id);
    }),
  );

export const ownerSetStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        table: z.enum(["briefs", "messages", "orders"]),
        id: z.string(),
        status: z.string().min(1).max(40),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await setRowStatus(data.table, data.id, data.status);
    }),
  );

export const ownerAddOwner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ userId: z.string().min(1), email: z.string().optional() }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await addOwner(data.userId, data.email ?? null);
    }),
  );

export const ownerRemoveOwner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ userId: z.string().min(1) }).parse(input))
  .handler(async ({ context, data }) =>
    result(async () => {
      await asOwner(context.userId);
      await removeOwner(data.userId, context.userId);
    }),
  );
