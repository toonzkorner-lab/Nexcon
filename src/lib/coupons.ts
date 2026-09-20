/**
 * Promo / coupon code logic — pure functions, safe to test in node.
 *
 * Money is in dollars (the store prices are dollar amounts). Discounts are
 * rounded to cents. Percent coupons cap at 90%; fixed coupons can never take
 * more than the subtotal.
 */
import { z } from "zod";

export type Coupon = {
  id: string;
  code: string;
  kind: "percent" | "fixed";
  value: number;
  minTotal: number;
  maxUses: number | null;
  usedCount: number;
  startsAt: string | null;
  endsAt: string | null;
  active: boolean;
  createdAt: string;
};

export const couponSchema = z.object({
  id: z.string().optional(),
  code: z
    .string()
    .trim()
    .min(3)
    .max(24)
    .regex(/^[a-z0-9-_]+$/i, "Letters, numbers, dash, underscore only"),
  kind: z.enum(["percent", "fixed"]),
  value: z.number().positive(),
  minTotal: z.number().nonnegative().default(0),
  maxUses: z.number().int().positive().nullable().default(null),
  startsAt: z.string().nullable().default(null),
  endsAt: z.string().nullable().default(null),
  active: z.boolean().default(true),
}).superRefine((c, ctx) => {
  if (c.kind === "percent" && c.value > 90) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Percent off cannot exceed 90%.", path: ["value"] });
  }
});

/** Normalize a code for storage/lookup: uppercase, trimmed. */
export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase();
}

export type CouponProblem =
  | "inactive"
  | "not-started"
  | "expired"
  | "maxed-out"
  | "min-not-met";

/** Why a coupon cannot be applied right now, or null when it is valid. */
export function couponProblem(c: Coupon, subtotal: number, now = new Date()): CouponProblem | null {
  if (!c.active) return "inactive";
  if (c.startsAt && new Date(c.startsAt) > now) return "not-started";
  if (c.endsAt && new Date(c.endsAt) < now) return "expired";
  if (c.maxUses !== null && c.usedCount >= c.maxUses) return "maxed-out";
  if (subtotal < c.minTotal) return "min-not-met";
  return null;
}

export const COUPON_PROBLEM_COPY: Record<CouponProblem, string> = {
  inactive: "That code is turned off.",
  "not-started": "That code is not active yet.",
  expired: "That code has expired.",
  "maxed-out": "That code has reached its usage limit.",
  "min-not-met": "That code needs a larger order.",
};

/** Dollar discount for a valid coupon on a subtotal. Returns 0 when invalid. */
export function discountFor(c: Coupon, subtotal: number, now = new Date()): number {
  if (couponProblem(c, subtotal, now)) return 0;
  const raw = c.kind === "percent" ? (subtotal * c.value) / 100 : c.value;
  return Math.min(subtotal, Math.round(raw * 100) / 100);
}
