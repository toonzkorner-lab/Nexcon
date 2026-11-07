import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { assertRateLimit } from "@/lib/rate-limit.server";
import { insertBrief, insertMessage, insertOrder, insertReview, readSite } from "./db";
import { applyCouponToOrder } from "@/lib/owner-coupons";
import {
  chargeSquare,
  dollarsToCents,
  squareConfig,
  squarePublicConfig,
} from "@/lib/payments/square";

export const loadSite = createServerFn({ method: "GET" }).handler(async () => {
  return readSite(true);
});

/** Public Square config for the browser card form (no secrets). Null when unset. */
export const getSquareConfig = createServerFn({ method: "GET" }).handler(async () => {
  return squarePublicConfig(process.env);
});

// Honeypot field shared by every public form. Real users never see it; bots
// fill it in. It must stay optional so existing clients validate unchanged.
const websiteHoneypot = z.string().max(120).optional();

/** Rate-limit the caller; safe when invoked outside a request context. */
function limitCaller(scope: string, limitPerMinute: number): void {
  const request = getRequest();
  assertRateLimit(
    request?.headers ?? new Headers(),
    scope,
    limitPerMinute,
    60_000,
  );
}

/**
 * Fake a successful submission for honeypot trips. The shape mirrors the real
 * insert return (callers read `row.id`) but nothing is written to the DB.
 */
function honeypotOk() {
  return {
    id: "ok",
    status: "queued",
    createdAt: new Date().toISOString(),
  };
}

export const submitBrief = createServerFn({ method: "POST" })
  .validator(
    (input: unknown) =>
      z.object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(200),
        channel: z.string().trim().max(120).default(""),
        groups: z.array(z.string()).max(8),
        budget: z.string().max(80),
        timeline: z.string().max(80),
        notes: z.string().trim().max(4000).default(""),
        website: websiteHoneypot,
      }).parse(input),
  )
  .handler(async ({ data }) => {
    limitCaller("form:brief", 5);
    const { website, ...rest } = data;
    if (website) return { ...honeypotOk(), ...rest };
    return insertBrief(rest);
  });

export const submitMessage = createServerFn({ method: "POST" })
  .validator(
    (input: unknown) =>
      z.object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(200),
        topic: z.string().trim().max(120).default("General"),
        body: z.string().trim().min(1).max(4000),
        website: websiteHoneypot,
      }).parse(input),
  )
  .handler(async ({ data }) => {
    limitCaller("form:message", 5);
    const { website, ...rest } = data;
    if (website) return { ...honeypotOk(), ...rest };
    return insertMessage(rest);
  });

export const submitOrder = createServerFn({ method: "POST" })
  .validator(
    (input: unknown) =>
      z.object({
        email: z.string().trim().email().max(200),
        channel: z.string().trim().max(120).default(""),
        // Kept for backward compatibility, but NOT trusted: the total is
        // recomputed server-side from the products table below.
        total: z.number().nonnegative(),
        items: z.array(
          z.object({
            name: z.string(),
            qty: z.number().int().positive(),
            price: z.number().nonnegative(),
          }),
        ).min(1).max(40),
        coupon: z.string().trim().max(24).optional(),
        // Single-use Square card token from the browser SDK. When present
        // and the total is above $0, the card is charged before the order
        // is recorded; a failed charge records nothing.
        sourceId: z.string().trim().max(200).optional(),
        website: websiteHoneypot,
      }).parse(input),
  )
  .handler(async ({ data }) => {
    limitCaller("form:order", 5);
    const { website, coupon, sourceId, ...rest } = data;
    if (website) return { ...honeypotOk(), ...rest, total: 0 };

    // Recompute the total from authoritative product prices. Client prices
    // are ignored entirely so a tampered cart cannot underpay.
    const site = await readSite(true);
    const byName = new Map(
      site.products.map((p) => [p.name.trim().toLowerCase(), p]),
    );
    const items = rest.items.map((item) => {
      const product = byName.get(item.name.trim().toLowerCase());
      if (!product) {
        throw new Response(`Unknown product: ${item.name}`, { status: 400 });
      }
      return { name: product.name, qty: item.qty, price: product.price };
    });
    const serverTotal = Math.round(
      items.reduce((sum, i) => sum + i.price * i.qty, 0) * 100,
    ) / 100;
    if (Math.abs(rest.total - serverTotal) > 0.005) {
      console.warn(
        `[submitOrder] client total ${rest.total} != server total ${serverTotal} ` +
          `for ${rest.email}; using server total`,
      );
    }
    // Coupons are revalidated against the server-side subtotal; the discount
    // is never trusted from the client.
    const applied = await applyCouponToOrder(coupon, serverTotal);
    const finalTotal = Math.round((serverTotal - applied.discount) * 100) / 100;

    // Card payment: charge first, record the order only on success.
    let paymentId = "";
    let paymentProvider = "";
    if (sourceId && finalTotal > 0) {
      const config = squareConfig(process.env);
      if (!config) {
        throw new Response("Card payments are not connected.", { status: 503 });
      }
      const charge = await chargeSquare(config, {
        sourceId,
        amountCents: dollarsToCents(finalTotal),
        idempotencyKey: randomUUID(),
        note: `N3xUs order for ${rest.email}`,
        buyerEmail: rest.email,
      });
      paymentId = charge.paymentId;
      paymentProvider = "square";
    }

    return insertOrder({
      ...rest,
      items,
      total: finalTotal,
      couponCode: applied.code,
      discount: applied.discount,
      paymentId,
      paymentProvider,
    });
  });

export const submitReview = createServerFn({ method: "POST" })
  .validator(
    (input: unknown) =>
      z.object({
        name: z.string().trim().min(1).max(80),
        role: z.string().trim().max(80).default("Collaborator"),
        company: z.string().trim().max(80).default("—"),
        quote: z.string().trim().min(1).max(800),
        rating: z.number().int().min(1).max(5),
        website: websiteHoneypot,
      }).parse(input),
  )
  .handler(async ({ data }) => {
    limitCaller("form:review", 10);
    const { website, ...rest } = data;
    if (website) return { ...honeypotOk(), ...rest };
    return insertReview(rest);
  });
