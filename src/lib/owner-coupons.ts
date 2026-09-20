/**
 * Owner-facing promo/coupon management + the public code validator.
 *
 * Owner mutations are gated by authMiddleware; the public validate endpoint
 * is rate-limited and only reveals whether a code applies to the given
 * subtotal (plus the resulting discount), never the coupon's internals.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { authMiddleware } from "./auth/middleware";
import { assertRateLimit } from "./rate-limit.server";
import {
  consumeCoupon,
  deleteCoupon,
  findCoupon,
  listCoupons,
  upsertCoupon,
} from "./cms/db";
import {
  COUPON_PROBLEM_COPY,
  couponProblem,
  couponSchema,
  discountFor,
  normalizeCode,
  type Coupon,
} from "./coupons";

function toCoupon(r: {
  id: string; code: string; kind: "percent" | "fixed"; value: number;
  min_total: number; max_uses: number | null; used_count: number;
  starts_at: string | null; ends_at: string | null; active: boolean;
  created_at: string;
}): Coupon {
  return {
    id: r.id, code: r.code, kind: r.kind, value: r.value,
    minTotal: r.min_total, maxUses: r.max_uses, usedCount: r.used_count,
    startsAt: r.starts_at, endsAt: r.ends_at, active: r.active,
    createdAt: r.created_at,
  };
}

export const ownerListCoupons = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    return (await listCoupons()).map(toCoupon);
});

export const ownerSaveCoupon = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => couponSchema.parse(input))
  .handler(async ({ data }) => {
        await upsertCoupon({
      code: normalizeCode(data.code),
      kind: data.kind,
      value: data.value,
      min_total: data.minTotal,
      max_uses: data.maxUses,
      starts_at: data.startsAt,
      ends_at: data.endsAt,
      active: data.active,
    });
    return { ok: true as const };
  });

export const ownerDeleteCoupon = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ code: z.string() }).parse(input))
  .handler(async ({ data }) => {
        await deleteCoupon(normalizeCode(data.code));
    return { ok: true as const };
  });

/** Public: check a code against a subtotal. Rate-limited in the route that calls it. */
export async function checkCoupon(rawCode: string, subtotal: number): Promise<
  | { ok: true; code: string; kind: "percent" | "fixed"; value: number; discount: number }
  | { ok: false; error: string }
> {
  const code = normalizeCode(rawCode);
  if (!code) return { ok: false, error: "Enter a code." };
  const row = await findCoupon(code);
  if (!row) return { ok: false, error: "That code doesn't exist." };
  const coupon = toCoupon(row);
  const problem = couponProblem(coupon, subtotal);
  if (problem) return { ok: false, error: COUPON_PROBLEM_COPY[problem] };
  return {
    ok: true,
    code: coupon.code,
    kind: coupon.kind,
    value: coupon.value,
    discount: discountFor(coupon, subtotal),
  };
}

export const validateCoupon = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({
      code: z.string().trim().min(1).max(24),
      subtotal: z.number().nonnegative(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const request = getRequest();
    assertRateLimit(request?.headers ?? new Headers(), "coupon:validate", 20, 60_000);
    return checkCoupon(data.code, data.subtotal);
  });

/**
 * Apply a coupon during checkout. Recomputes from the server-side subtotal,
 * consumes one use atomically, and returns the final discount + code.
 */
export async function applyCouponToOrder(rawCode: string | undefined, subtotal: number): Promise<{ code: string; discount: number }> {
  if (!rawCode?.trim()) return { code: "", discount: 0 };
  const checked = await checkCoupon(rawCode, subtotal);
  if (!checked.ok) return { code: "", discount: 0 };
  // Atomic guard: if another checkout grabbed the last use, this fails closed.
  const consumed = await consumeCoupon(checked.code);
  if (!consumed) return { code: "", discount: 0 };
  return { code: checked.code, discount: checked.discount };
}
