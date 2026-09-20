/**
 * In-memory fixed-window rate limiter for server functions.
 *
 * Usage at the top of a server function:
 *
 *   import { assertRateLimit } from "@/lib/rate-limit.server";
 *   import { getRequest } from "@tanstack/react-start/server";
 *
 *   export const myFn = createServerFn({ method: "POST" })
 *     .validator(mySchema)
 *     .handler(async ({ data }) => {
 *       assertRateLimit(getRequest().headers, "my-scope", 10, 60_000);
 *       ...
 *     });
 *
 * NOTE: counters live in process memory, so on multi-instance / serverless
 * deployments each instance tracks its own counters. This is abuse friction,
 * not a distributed guarantee — appropriate for a small studio site.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweepExpired(now: number): void {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export interface RateLimitOptions {
  /** Unique bucket key, e.g. `ai:ask:<ip>`. Include the client IP for per-IP limits. */
  key: string;
  /** Max hits allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  sweepExpired(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  if (bucket.count < limit) {
    bucket.count += 1;
    return { ok: true, retryAfterMs: 0 };
  }
  return { ok: false, retryAfterMs: bucket.resetAt - now };
}

/**
 * Assert the caller is within `limit` requests per `windowMs` for `scope`
 * (scoped per client IP). Throws a 429 Response when exceeded.
 */
export function assertRateLimit(
  headers: Headers,
  scope: string,
  limit: number,
  windowMs: number,
): void {
  const ip = getClientIp(headers);
  const { ok, retryAfterMs } = checkRateLimit({
    key: `${scope}:${ip}`,
    limit,
    windowMs,
  });
  if (!ok) {
    throw new Response("Too many requests — slow down and try again.", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
    });
  }
}
