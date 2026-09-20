import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  couponProblem,
  couponSchema,
  discountFor,
  normalizeCode,
  type Coupon,
} from "./coupons.ts";

const base: Coupon = {
  id: "c1",
  code: "WELCOME10",
  kind: "percent",
  value: 10,
  minTotal: 0,
  maxUses: null,
  usedCount: 0,
  startsAt: null,
  endsAt: null,
  active: true,
  createdAt: "2026-09-20",
};

describe("normalizeCode", () => {
  it("uppercases and trims", () => {
    assert.equal(normalizeCode("  welcome10 "), "WELCOME10");
  });
});

describe("couponSchema", () => {
  it("rejects percent over 90", () => {
    const r = couponSchema.safeParse({ code: "BIG", kind: "percent", value: 95 });
    assert.equal(r.success, false);
  });
  it("accepts a fixed coupon with limits", () => {
    const r = couponSchema.safeParse({
      code: "save-20",
      kind: "fixed",
      value: 20,
      minTotal: 50,
      maxUses: 100,
    });
    assert.equal(r.success, true);
  });
  it("rejects bad characters in code", () => {
    const r = couponSchema.safeParse({ code: "a b!", kind: "fixed", value: 5 });
    assert.equal(r.success, false);
  });
});

describe("couponProblem", () => {
  it("returns null for a valid coupon", () => {
    assert.equal(couponProblem(base, 100), null);
  });
  it("flags inactive, expired, maxed-out, min-not-met", () => {
    assert.equal(couponProblem({ ...base, active: false }, 100), "inactive");
    assert.equal(couponProblem({ ...base, endsAt: "2020-01-01" }, 100), "expired");
    assert.equal(couponProblem({ ...base, startsAt: "2030-01-01" }, 100), "not-started");
    assert.equal(couponProblem({ ...base, maxUses: 5, usedCount: 5 }, 100), "maxed-out");
    assert.equal(couponProblem({ ...base, minTotal: 200 }, 100), "min-not-met");
  });
});

describe("discountFor", () => {
  it("computes percent off", () => {
    assert.equal(discountFor(base, 200), 20);
  });
  it("rounds to cents", () => {
    assert.equal(discountFor({ ...base, value: 33 }, 10), 3.3);
  });
  it("caps fixed at subtotal", () => {
    assert.equal(discountFor({ ...base, kind: "fixed", value: 50 }, 30), 30);
  });
  it("returns 0 for invalid coupons", () => {
    assert.equal(discountFor({ ...base, active: false }, 200), 0);
    assert.equal(discountFor({ ...base, minTotal: 500 }, 200), 0);
  });
});
