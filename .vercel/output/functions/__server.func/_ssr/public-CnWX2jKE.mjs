import { o as getRequest, r as createServerFn } from "./ssr.mjs";
import { At as array, Ft as number, It as object, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { D as readSite, _ as insertBrief, b as insertReview, v as insertMessage, y as insertOrder } from "./db-CgZiGDRe.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as assertRateLimit } from "./rate-limit.server-CiJECjW_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-CnWX2jKE.js
var loadSite_createServerFn_handler = createServerRpc({
	id: "7dbaa1024e172c9855e2b1695daef47a73181ff83fa4fd583e388449c3128508",
	name: "loadSite",
	filename: "src/lib/cms/public.ts"
}, (opts) => loadSite.__executeServer(opts));
var loadSite = createServerFn({ method: "GET" }).handler(loadSite_createServerFn_handler, async () => {
	return readSite(true);
});
var websiteHoneypot = string().max(120).optional();
/** Rate-limit the caller; safe when invoked outside a request context. */
function limitCaller(scope, limitPerMinute) {
	const request = getRequest();
	assertRateLimit(request?.headers ?? new Headers(), scope, limitPerMinute, 6e4);
}
/**
* Fake a successful submission for honeypot trips. The shape mirrors the real
* insert return (callers read `row.id`) but nothing is written to the DB.
*/
function honeypotOk() {
	return {
		id: "ok",
		status: "queued",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var submitBrief_createServerFn_handler = createServerRpc({
	id: "4c03ae564e49cc058ce4ab7c890e4517c581262c19b75ed006ccae016b0a94f9",
	name: "submitBrief",
	filename: "src/lib/cms/public.ts"
}, (opts) => submitBrief.__executeServer(opts));
var submitBrief = createServerFn({ method: "POST" }).validator((input) => object({
	name: string().trim().min(1).max(120),
	email: string().trim().email().max(200),
	channel: string().trim().max(120).default(""),
	groups: array(string()).max(8),
	budget: string().max(80),
	timeline: string().max(80),
	notes: string().trim().max(4e3).default(""),
	website: websiteHoneypot
}).parse(input)).handler(submitBrief_createServerFn_handler, async ({ data }) => {
	limitCaller("form:brief", 5);
	const { website, ...rest } = data;
	if (website) return {
		...honeypotOk(),
		...rest
	};
	return insertBrief(rest);
});
var submitMessage_createServerFn_handler = createServerRpc({
	id: "d0bccd5538e926bf449b495e19dabb6516fc5697876ac3933a2d9d568b4b8cee",
	name: "submitMessage",
	filename: "src/lib/cms/public.ts"
}, (opts) => submitMessage.__executeServer(opts));
var submitMessage = createServerFn({ method: "POST" }).validator((input) => object({
	name: string().trim().min(1).max(120),
	email: string().trim().email().max(200),
	topic: string().trim().max(120).default("General"),
	body: string().trim().min(1).max(4e3),
	website: websiteHoneypot
}).parse(input)).handler(submitMessage_createServerFn_handler, async ({ data }) => {
	limitCaller("form:message", 5);
	const { website, ...rest } = data;
	if (website) return {
		...honeypotOk(),
		...rest
	};
	return insertMessage(rest);
});
var submitOrder_createServerFn_handler = createServerRpc({
	id: "c980a44612302431577dd5bcceaa40cd8ad9f222ff630c673347f9164b944da2",
	name: "submitOrder",
	filename: "src/lib/cms/public.ts"
}, (opts) => submitOrder.__executeServer(opts));
var submitOrder = createServerFn({ method: "POST" }).validator((input) => object({
	email: string().trim().email().max(200),
	channel: string().trim().max(120).default(""),
	total: number().nonnegative(),
	items: array(object({
		name: string(),
		qty: number().int().positive(),
		price: number().nonnegative()
	})).min(1).max(40),
	website: websiteHoneypot
}).parse(input)).handler(submitOrder_createServerFn_handler, async ({ data }) => {
	limitCaller("form:order", 5);
	const { website, ...rest } = data;
	if (website) return {
		...honeypotOk(),
		...rest,
		total: 0
	};
	const site = await readSite(true);
	const byName = new Map(site.products.map((p) => [p.name.trim().toLowerCase(), p]));
	const items = rest.items.map((item) => {
		const product = byName.get(item.name.trim().toLowerCase());
		if (!product) throw new Response(`Unknown product: ${item.name}`, { status: 400 });
		return {
			name: product.name,
			qty: item.qty,
			price: product.price
		};
	});
	const serverTotal = Math.round(items.reduce((sum, i) => sum + i.price * i.qty, 0) * 100) / 100;
	if (Math.abs(rest.total - serverTotal) > .005) console.warn(`[submitOrder] client total ${rest.total} != server total ${serverTotal} for ${rest.email}; using server total`);
	return insertOrder({
		...rest,
		items,
		total: serverTotal
	});
});
var submitReview_createServerFn_handler = createServerRpc({
	id: "7c3f05ffefffc42829304dbea61fa0144e5a3c4fe99ee168e968e03c013ddc07",
	name: "submitReview",
	filename: "src/lib/cms/public.ts"
}, (opts) => submitReview.__executeServer(opts));
var submitReview = createServerFn({ method: "POST" }).validator((input) => object({
	name: string().trim().min(1).max(80),
	role: string().trim().max(80).default("Collaborator"),
	company: string().trim().max(80).default("—"),
	quote: string().trim().min(1).max(800),
	rating: number().int().min(1).max(5),
	website: websiteHoneypot
}).parse(input)).handler(submitReview_createServerFn_handler, async ({ data }) => {
	limitCaller("form:review", 10);
	const { website, ...rest } = data;
	if (website) return {
		...honeypotOk(),
		...rest
	};
	return insertReview(rest);
});
//#endregion
export { loadSite_createServerFn_handler, submitBrief_createServerFn_handler, submitMessage_createServerFn_handler, submitOrder_createServerFn_handler, submitReview_createServerFn_handler };
