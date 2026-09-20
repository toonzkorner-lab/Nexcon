//#region node_modules/.nitro/vite/services/ssr/assets/rate-limit.server-CiJECjW_.js
var buckets = /* @__PURE__ */ new Map();
function sweepExpired(now) {
	if (buckets.size < 5e3) return;
	for (const [key, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(key);
}
function getClientIp(headers) {
	const forwarded = headers.get("x-forwarded-for");
	if (forwarded) {
		const first = forwarded.split(",")[0];
		if (first) return first.trim();
	}
	return headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? "unknown";
}
function checkRateLimit({ key, limit, windowMs }) {
	const now = Date.now();
	sweepExpired(now);
	const bucket = buckets.get(key);
	if (!bucket || bucket.resetAt <= now) {
		buckets.set(key, {
			count: 1,
			resetAt: now + windowMs
		});
		return {
			ok: true,
			retryAfterMs: 0
		};
	}
	if (bucket.count < limit) {
		bucket.count += 1;
		return {
			ok: true,
			retryAfterMs: 0
		};
	}
	return {
		ok: false,
		retryAfterMs: bucket.resetAt - now
	};
}
/**
* Assert the caller is within `limit` requests per `windowMs` for `scope`
* (scoped per client IP). Throws a 429 Response when exceeded.
*/
function assertRateLimit(headers, scope, limit, windowMs) {
	const { ok, retryAfterMs } = checkRateLimit({
		key: `${scope}:${getClientIp(headers)}`,
		limit,
		windowMs
	});
	if (!ok) throw new Response("Too many requests — slow down and try again.", {
		status: 429,
		headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1e3)) }
	});
}
//#endregion
export { assertRateLimit as t };
