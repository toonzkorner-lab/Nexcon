import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, G as notFound, V as redirect, _ as createFileRoute, b as Link, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, w as require_jsx_runtime, x as Navigate, y as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { At as array, Bt as union, Ft as number, It as object, Nt as literal, Ot as _enum, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { D as readSite, g as hasGateSessionMarker, j as seedSite, l as cn, r as NAV, s as auth } from "./db-CgZiGDRe.mjs";
import { i as signOut, t as authClient } from "./client-DkZ_AVId.mjs";
import { t as authMiddleware } from "./middleware-DplnsrPw.mjs";
import { a as Send, c as Menu, f as Bot, i as Share, l as LifeBuoy, m as ArrowRight, n as TriangleAlert, o as Search, r as ShoppingBag, s as MessageCircle, t as X, u as Download } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-B2Izd0c7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-Dzngea3I.js
var DEFAULT_ORIGIN$1 = "https://n3xuskonc3ptz.com";
var PAGE_COPY = {
	home: {
		title: "N3xUs Konc3pt'z — Web Design, Development & Hosting",
		description: "South Texas digital studio for custom websites, apps, Discord and Telegram bots, SEO, and managed hosting. Design, development, and deployment from one desk."
	},
	services: {
		title: "Web Design, Development, Bots & Hosting",
		description: "Priced catalog for custom web design and development, Discord and Telegram bots, managed cloud hosting, and SEO. Remote-ready, South Texas studio."
	},
	work: {
		title: "Case Studies — Web, Bots & Systems",
		description: "Client and studio systems on the record: websites, Discord bots, hosting, and internal tools shipped by N3xUs Konc3pt'z."
	},
	store: {
		title: "Digital Goods — Bots, Kits & Themes",
		description: "Ready-to-run Discord bots, site kits, and themes from N3xUs Konc3pt'z. One production license, fulfillment through the studio."
	},
	journal: {
		title: "Journal — Design, Development, Deployment",
		description: "Notes from the N3xUs desk on bots, type, hiring, hosting, and how a small studio actually ships."
	},
	studio: {
		title: "About the Studio — South Texas Digital Practice",
		description: "N3xUs Konc3pt'z is a South Texas studio for the whole loop: design, development, and deployment. Founded and run by Juan."
	},
	about: {
		title: "About N3xUs Konc3pt'z — Juan, South Texas",
		description: "Meet Juan Socarras, founder of N3xUs Konc3pt'z in South Texas. Design, React, Postgres, Discord bots, hosting. Catalog from $99 bots to $1,250 web development."
	},
	contact: {
		title: "Contact the Studio",
		description: "Write N3xUs Konc3pt'z by form, email, Discord, or Telegram. Weekday first response within 24 hours."
	},
	book: {
		title: "Start a Project — Open a Brief",
		description: "Four questions to scope web design, development, bots, or hosting with N3xUs Konc3pt'z. We reply within a weekday."
	},
	transmissions: {
		title: "Client Reviews & Transmissions",
		description: "What it was like to ship with N3xUs Konc3pt'z — reviews from clients and collaborators."
	},
	lab: {
		title: "Lab — Live Bot Demos",
		description: "Try N3xUs bots in the browser: a Discord economy ledger and a Telegram desk responder. Not a screenshot — a sandbox you can use."
	},
	privacy: {
		title: "Privacy Policy",
		description: "How N3xUs Konc3pt'z handles the information you send through the site: briefs, messages, orders, and analytics."
	},
	terms: {
		title: "Terms of Service",
		description: "The working terms for projects, digital goods, and services from N3xUs Konc3pt'z."
	}
};
function siteFromMatches(matches) {
	for (const m of matches) if (m.context?.site) return m.context.site;
	return {
		settings: {
			studioName: "N3xUs Konc3pt'z",
			studioShort: "N3xUs",
			tagline: "Design. Development. Deployment.",
			email: "studio@n3xuskonc3ptz.com",
			discordUrl: "",
			telegramUrl: "",
			founderName: "Juan",
			founderTitle: "Founder",
			founderBio: "",
			genesis: "",
			deskDays: "Mon–Fri",
			deskHours: "09:00–18:00",
			sla: "24h first response on weekdays",
			zone: "America/Chicago",
			stack: [],
			siteUrl: DEFAULT_ORIGIN$1,
			seoTitle: PAGE_COPY.home.title,
			seoDescription: PAGE_COPY.home.description,
			seoKeywords: "",
			city: "South Texas",
			region: "Texas",
			country: "US",
			twitterHandle: "",
			googleVerification: "",
			indexable: true
		},
		faqs: [],
		principles: [],
		pipeline: [],
		engagements: [],
		capabilities: [],
		services: [],
		projects: [],
		products: [],
		posts: [],
		reviews: [],
		bots: []
	};
}
function siteOrigin(settings) {
	return (settings?.siteUrl?.trim() || "https://n3xuskonc3ptz.com").replace(/\/+$/, "");
}
function absUrl(path, settings) {
	const origin = siteOrigin(settings);
	if (!path || path === "/") return `${origin}/`;
	if (/^https?:\/\//i.test(path)) return path;
	return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
function absImage(src, settings) {
	if (!src) return absUrl("/og.jpg", settings);
	return absUrl(src, settings);
}
function clipMeta(text, max = 160) {
	const clean = text.replace(/\s+/g, " ").trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max - 1);
	const sp = cut.lastIndexOf(" ");
	return `${(sp > 80 ? cut.slice(0, sp) : cut).trim()}…`;
}
function documentTitle(title, studioName, opts) {
	const t = title.trim();
	if (opts?.home || t.includes(studioName)) return t;
	return `${t} · ${studioName}`;
}
function listingTitle(item, fallback) {
	return item.seoTitle?.trim() || item.name?.trim() || item.title?.trim() || fallback;
}
function listingDescription(item, fallback) {
	return clipMeta(item.seoDescription?.trim() || item.summary?.trim() || item.excerpt?.trim() || item.blurb?.trim() || item.description?.trim() || fallback);
}
function pageHead(opts) {
	const { settings } = opts.site ?? siteFromMatches([]);
	const title = documentTitle(opts.title, settings.studioName, { home: opts.home });
	const description = clipMeta(opts.description || settings.seoDescription || PAGE_COPY.home.description);
	const url = absUrl(opts.path, settings);
	const image = absImage(opts.image, settings);
	const robots = (opts.index ?? true) && settings.indexable ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow";
	const keywords = settings.seoKeywords.trim();
	const meta = [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			name: "robots",
			content: robots
		},
		{
			name: "googlebot",
			content: robots
		},
		{
			name: "author",
			content: settings.founderName || settings.studioName
		},
		{
			name: "application-name",
			content: settings.studioName
		},
		{
			name: "apple-mobile-web-app-title",
			content: settings.studioShort || settings.studioName
		},
		{
			name: "theme-color",
			content: "#090a0b"
		},
		{
			name: "format-detection",
			content: "telephone=no"
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: opts.type === "article" ? "article" : "website"
		},
		{
			property: "og:url",
			content: url
		},
		{
			property: "og:site_name",
			content: settings.studioName
		},
		{
			property: "og:locale",
			content: "en_US"
		},
		{
			property: "og:image",
			content: image
		},
		{
			property: "og:image:width",
			content: "1200"
		},
		{
			property: "og:image:height",
			content: "630"
		},
		{
			property: "og:image:alt",
			content: title
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		},
		{
			name: "twitter:image",
			content: image
		}
	];
	if (keywords) meta.push({
		name: "keywords",
		content: keywords
	});
	if (settings.twitterHandle) {
		const handle = settings.twitterHandle.replace(/^@/, "");
		meta.push({
			name: "twitter:site",
			content: `@${handle}`
		});
		meta.push({
			name: "twitter:creator",
			content: `@${handle}`
		});
	}
	if (settings.googleVerification) meta.push({
		name: "google-site-verification",
		content: settings.googleVerification
	});
	if (settings.region) {
		meta.push({
			name: "geo.region",
			content: settings.country === "US" ? `US-${regionCode(settings.region)}` : settings.country
		});
		meta.push({
			name: "geo.placename",
			content: [settings.city, settings.region].filter(Boolean).join(", ")
		});
	}
	if (opts.publishedTime) {
		meta.push({
			property: "article:published_time",
			content: opts.publishedTime
		});
		meta.push({
			property: "article:author",
			content: settings.founderName
		});
	}
	return {
		meta,
		links: [
			{
				rel: "canonical",
				href: url
			},
			{
				rel: "alternate",
				hrefLang: "en",
				href: url
			},
			{
				rel: "alternate",
				hrefLang: "x-default",
				href: url
			},
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: absUrl("/rss.xml", settings),
				title: `${settings.studioName} journal`
			}
		]
	};
}
function regionCode(region) {
	return {
		texas: "TX",
		"south texas": "TX"
	}[region.trim().toLowerCase()] ?? region.slice(0, 2).toUpperCase();
}
function isoDate(value) {
	if (!value) return void 0;
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) {
		if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
		return;
	}
	return d.toISOString();
}
function buildSitemapXml(origin, rows) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${rows.map((r) => {
		const loc = absUrl(r.path, { siteUrl: origin });
		const last = isoDate(r.lastmod);
		return [
			"<url>",
			`<loc>${escapeXml(loc)}</loc>`,
			last ? `<lastmod>${last}</lastmod>` : "",
			r.changefreq ? `<changefreq>${r.changefreq}</changefreq>` : "",
			r.priority ? `<priority>${r.priority}</priority>` : "",
			"</url>"
		].filter(Boolean).join("");
	}).join("")}</urlset>\n`;
}
function buildRobotsTxt(origin, indexable = true) {
	const o = origin.replace(/\/+$/, "");
	if (!indexable) return `User-agent: *\nDisallow: /\n`;
	return [
		"User-agent: *",
		"Allow: /",
		"Disallow: /owner",
		"Disallow: /owner/",
		"Disallow: /login",
		"Disallow: /cart",
		"Disallow: /api/",
		"",
		`Sitemap: ${o}/sitemap.xml`,
		""
	].join("\n");
}
function buildRssXml(site) {
	const origin = siteOrigin(site.settings);
	const items = site.posts.map((p) => {
		const link = absUrl(`/journal/${p.slug}`, site.settings);
		const desc = clipMeta(p.excerpt || listingDescription(p, PAGE_COPY.journal.description), 240);
		return [
			"<item>",
			`<title>${escapeXml(p.title)}</title>`,
			`<link>${escapeXml(link)}</link>`,
			`<guid isPermaLink="true">${escapeXml(link)}</guid>`,
			`<pubDate>${rssDate(p.date)}</pubDate>`,
			`<description>${escapeXml(desc)}</description>`,
			"</item>"
		].join("");
	}).join("");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${escapeXml(site.settings.studioName)} journal</title><link>${escapeXml(origin)}/journal</link><description>${escapeXml(PAGE_COPY.journal.description)}</description><language>en-us</language>${items}</channel></rss>\n`;
}
function buildLlmsTxt(site) {
	const origin = siteOrigin(site.settings);
	const s = site.settings;
	return [
		`# ${s.studioName}`,
		`> ${s.tagline} ${s.seoDescription || PAGE_COPY.home.description}`,
		"",
		`Founded and run by ${s.founderName}, ${s.founderTitle}. ${s.city || "South Texas"}, ${s.region}.`,
		"",
		"## Site",
		`- [Home](${origin}/): ${PAGE_COPY.home.description}`,
		`- [Services](${origin}/services): ${PAGE_COPY.services.description}`,
		`- [Work](${origin}/work): ${PAGE_COPY.work.description}`,
		`- [Store](${origin}/store): ${PAGE_COPY.store.description}`,
		`- [Journal](${origin}/journal): ${PAGE_COPY.journal.description}`,
		`- [Lab](${origin}/lab): ${PAGE_COPY.lab.description}`,
		`- [About](${origin}/about): ${PAGE_COPY.about.description}`,
		`- [Studio](${origin}/studio): ${PAGE_COPY.studio.description}`,
		`- [Contact](${origin}/contact)`,
		`- [Open a brief](${origin}/book)`,
		"",
		"## Services",
		...site.services.map((svc) => `- [${svc.name}](${origin}/services/${svc.slug}): ${svc.summary}`),
		"",
		"## Work",
		...site.projects.map((p) => `- [${p.title}](${origin}/work/${p.slug}): ${p.summary}`),
		"",
		"## Journal",
		...site.posts.map((p) => `- [${p.title}](${origin}/journal/${p.slug}): ${p.excerpt}`),
		"",
		"## Lab",
		...site.bots.map((b) => `- [${b.name}](${origin}/lab/${b.slug}): ${b.tagline}`),
		"",
		"## Optional",
		`- [RSS](${origin}/rss.xml)`,
		`- [Sitemap](${origin}/sitemap.xml)`,
		""
	].join("\n");
}
function staticSitemapRows(updatedAt) {
	return [
		{
			path: "/",
			lastmod: updatedAt,
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/services",
			lastmod: updatedAt,
			changefreq: "weekly",
			priority: "0.9"
		},
		{
			path: "/work",
			lastmod: updatedAt,
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/store",
			lastmod: updatedAt,
			changefreq: "weekly",
			priority: "0.7"
		},
		{
			path: "/lab",
			lastmod: updatedAt,
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/journal",
			lastmod: updatedAt,
			changefreq: "weekly",
			priority: "0.7"
		},
		{
			path: "/about",
			lastmod: updatedAt,
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/studio",
			lastmod: updatedAt,
			changefreq: "monthly",
			priority: "0.6"
		},
		{
			path: "/contact",
			lastmod: updatedAt,
			changefreq: "monthly",
			priority: "0.5"
		},
		{
			path: "/book",
			lastmod: updatedAt,
			changefreq: "monthly",
			priority: "0.8"
		},
		{
			path: "/transmissions",
			lastmod: updatedAt,
			changefreq: "monthly",
			priority: "0.4"
		}
	];
}
function catalogSitemapRows(site) {
	return [
		...site.services.map((s) => ({
			path: `/services/${s.slug}`,
			lastmod: s.updatedAt,
			changefreq: "monthly",
			priority: "0.8"
		})),
		...site.projects.map((p) => ({
			path: `/work/${p.slug}`,
			lastmod: p.updatedAt,
			changefreq: "monthly",
			priority: "0.7"
		})),
		...site.products.map((p) => ({
			path: `/store/${p.slug}`,
			lastmod: p.updatedAt,
			changefreq: "monthly",
			priority: "0.6"
		})),
		...site.posts.map((p) => ({
			path: `/journal/${p.slug}`,
			lastmod: p.updatedAt ?? p.date,
			changefreq: "monthly",
			priority: "0.6"
		})),
		...site.bots.map((b) => ({
			path: `/lab/${b.slug}`,
			lastmod: b.updatedAt,
			changefreq: "weekly",
			priority: "0.8"
		}))
	];
}
/**
* Newest content timestamp across the catalog, used as <lastmod> for the
* static pages. Falls back to post editorial dates when a row `updatedAt`
* is not populated yet.
*/
function siteLastmod(site) {
	const stamps = [];
	const push = (v) => {
		if (!v) return;
		const t = new Date(v).getTime();
		if (!Number.isNaN(t)) stamps.push(t);
	};
	for (const s of site.services) push(s.updatedAt);
	for (const p of site.projects) push(p.updatedAt);
	for (const p of site.products) push(p.updatedAt);
	for (const p of site.posts) push(p.updatedAt ?? p.date);
	for (const b of site.bots) push(b.updatedAt);
	if (!stamps.length) return void 0;
	return new Date(Math.max(...stamps)).toISOString();
}
function rssDate(value) {
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return (/* @__PURE__ */ new Date()).toUTCString();
	return d.toUTCString();
}
function escapeXml(value) {
	return value.replace(/[&<>"']/g, (ch) => {
		switch (ch) {
			case "&": return "&amp;";
			case "<": return "&lt;";
			case ">": return "&gt;";
			case "\"": return "&quot;";
			default: return "&apos;";
		}
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CkGAamYH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function AppErrorComponent({ error }) {
	console.error("[app-error]", error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: FALLBACK_MESSAGE
			})
		]
	});
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function RegisterPwa() {
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		const onLoad = () => {
			navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
		};
		if (document.readyState === "complete") onLoad();
		else window.addEventListener("load", onLoad, { once: true });
	}, []);
	return null;
}
var DISMISS_KEY = "n3xus-pwa-dismiss";
function isStandalone() {
	return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: minimal-ui)").matches || "standalone" in navigator && Boolean(navigator.standalone);
}
function isIos() {
	return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function InstallChip() {
	const [promptEvent, setPromptEvent] = (0, import_react.useState)(null);
	const [iosHint, setIosHint] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isStandalone() || localStorage.getItem(DISMISS_KEY) === "1") return;
		const onPrompt = (e) => {
			e.preventDefault();
			setPromptEvent(e);
			setOpen(true);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		if (isIos() && !isStandalone()) {
			const t = window.setTimeout(() => setOpen(true), 1400);
			return () => {
				window.removeEventListener("beforeinstallprompt", onPrompt);
				window.clearTimeout(t);
			};
		}
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	if (!open || isStandalone()) return null;
	if (!promptEvent && !isIos()) return null;
	function dismiss() {
		localStorage.setItem(DISMISS_KEY, "1");
		setOpen(false);
		setIosHint(false);
	}
	async function install() {
		if (!promptEvent) {
			setIosHint(true);
			return;
		}
		await promptEvent.prompt();
		if ((await promptEvent.userChoice).outcome === "accepted") setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 w-[min(100%-5.5rem,18rem)] sm:left-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-lg)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Install N3xUs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs leading-relaxed text-fg-muted",
						children: iosHint ? "Share, then Add to Home Screen." : "The studio on your home screen. Works offline for the shell."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: dismiss,
					className: "relative size-8 shrink-0 text-fg-subtle after:absolute after:inset-[-6px] hover:text-fg",
					"aria-label": "Dismiss",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mx-auto size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void install(),
				className: "mt-3 inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-3 text-sm font-medium text-accent-fg",
				children: [iosHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), iosHint ? "How" : "Install"]
			})]
		})
	});
}
var rootApi = getRouteApi("__root__");
function useSite() {
	return rootApi.useRouteContext().site;
}
var STATIC = [
	{
		href: "/",
		label: "Home",
		hint: "Studio"
	},
	{
		href: "/work",
		label: "Work",
		hint: "Portfolio"
	},
	{
		href: "/services",
		label: "Services",
		hint: "Catalog"
	},
	{
		href: "/store",
		label: "Store",
		hint: "Digital goods"
	},
	{
		href: "/lab",
		label: "Lab",
		hint: "Live bot demos"
	},
	{
		href: "/journal",
		label: "Journal",
		hint: "Writing"
	},
	{
		href: "/about",
		label: "About",
		hint: "Founder"
	},
	{
		href: "/studio",
		label: "Studio",
		hint: "How we work"
	},
	{
		href: "/contact",
		label: "Contact",
		hint: "Message"
	},
	{
		href: "/book",
		label: "Open a brief",
		hint: "Start a project"
	},
	{
		href: "/transmissions",
		label: "Transmissions",
		hint: "Reviews"
	},
	{
		href: "/cart",
		label: "Cart",
		hint: "Checkout"
	},
	{
		href: "/owner",
		label: "Owner desk",
		hint: "CMS"
	}
];
function CommandPalette({ open, onClose }) {
	const [q, setQ] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const router = useRouter();
	const site = useSite();
	const hits = (0, import_react.useMemo)(() => {
		const pool = [
			...STATIC,
			...site.projects.map((p) => ({
				href: `/work/${p.slug}`,
				label: p.title,
				hint: "Work"
			})),
			...site.services.map((s) => ({
				href: `/services/${s.slug}`,
				label: s.name,
				hint: "Service"
			})),
			...site.products.map((p) => ({
				href: `/store/${p.slug}`,
				label: p.name,
				hint: "Store"
			})),
			...site.bots.map((b) => ({
				href: `/lab/${b.slug}`,
				label: b.name,
				hint: "Lab"
			})),
			...site.posts.map((p) => ({
				href: `/journal/${p.slug}`,
				label: p.title,
				hint: "Journal"
			}))
		];
		const needle = q.trim().toLowerCase();
		if (!needle) return pool.slice(0, 10);
		return pool.filter((h) => `${h.label} ${h.hint}`.toLowerCase().includes(needle)).slice(0, 12);
	}, [q, site]);
	(0, import_react.useEffect)(() => {
		if (open) {
			setQ("");
			requestAnimationFrame(() => inputRef.current?.focus());
		}
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/70",
			onClick: onClose,
			"aria-label": "Close search"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-label": "Command palette",
			className: "relative w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated p-2 shadow-[var(--shadow-border-hover)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Jump to a page, project, or service",
				className: "h-12 w-full bg-transparent px-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-80 overflow-auto py-1",
				children: hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-6 text-sm text-fg-muted",
					children: "Nothing matches."
				}) : hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						router.history.push(h.href);
						onClose();
					},
					className: cn("flex h-11 w-full items-center justify-between rounded-[var(--radius-md)] px-3 text-left text-sm text-fg hover:bg-bg-subtle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-fg-subtle",
						children: [h.hint, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
					})]
				}) }, h.href))
			})]
		})]
	});
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-7", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "7",
				className: "fill-bg-elevated"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M7 25V7h5.5L20 18.2V7h5v18h-5.5L12 13.8V25H7z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "20",
				y: "7",
				width: "5",
				height: "5",
				className: "fill-signal"
			})
		]
	});
}
function Footer() {
	const { settings, services } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: settings.studioName
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-xs text-sm leading-relaxed text-fg-muted",
						children: [
							"Design, development, and deployment from one studio. ",
							settings.city || "South Texas",
							", working wherever the work is."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "text-fg-muted transition-colors hover:text-fg",
							children: item.label
						}) }, item.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/studio",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Studio"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Contact"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Open a brief"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/transmissions",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Transmissions"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/rss.xml",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Journal RSS"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/sitemap.xml",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Sitemap"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/owner",
							className: "text-fg-muted transition-colors hover:text-fg",
							children: "Owner desk"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [services.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/services/$slug",
						params: { slug: s.slug },
						className: "text-fg-muted transition-colors hover:text-fg",
						children: s.name
					}) }, s.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/services",
						className: "text-fg-muted transition-colors hover:text-fg",
						children: "All services"
					}) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Channels"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: settings.discordUrl,
							className: "text-fg-muted transition-colors hover:text-fg",
							target: "_blank",
							rel: "noreferrer",
							children: "Discord"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: settings.telegramUrl,
							className: "text-fg-muted transition-colors hover:text-fg",
							target: "_blank",
							rel: "noreferrer",
							children: "Telegram"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${settings.email}`,
							className: "text-fg-muted transition-colors hover:text-fg",
							children: settings.email
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 font-mono text-[11px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					settings.studioName
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The 3 D’s — still the whole job." })]
			})
		})]
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var useCart = create()(persist((set, get) => ({
	items: [],
	add: (item, qty = 1) => {
		if (get().items.find((i) => i.id === item.id)) {
			set({ items: get().items.map((i) => i.id === item.id ? {
				...i,
				qty: i.qty + qty
			} : i) });
			return;
		}
		set({ items: [...get().items, {
			...item,
			qty
		}] });
	},
	remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
	setQty: (id, qty) => {
		if (qty < 1) {
			set({ items: get().items.filter((i) => i.id !== id) });
			return;
		}
		set({ items: get().items.map((i) => i.id === id ? {
			...i,
			qty
		} : i) });
	},
	clear: () => set({ items: [] })
}), { name: "nk-cart" }));
function cartCount(items) {
	return items.reduce((n, i) => n + i.qty, 0);
}
function cartTotal(items) {
	return items.reduce((n, i) => n + i.price * i.qty, 0);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-fg-muted hover:text-fg hover:bg-bg-subtle",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
			md: "h-11 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-base rounded-[var(--radius-md)]",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
Button.displayName = "Button";
function LiveClock() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(id);
	}, []);
	const label = now ? now.toLocaleTimeString("en-US", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "America/Chicago"
	}) : "--:--:--";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "font-mono text-[11px] tabular-nums tracking-wider text-fg-muted",
		children: ["CST ", label]
	});
}
function Nav({ onSearch }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const count = useCart((s) => cartCount(s.items));
	const { settings } = useSite();
	(0, import_react.useEffect)(() => setReady(true), []);
	const shown = ready ? count : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:h-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 text-fg",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tracking-tight",
						children: settings.studioShort
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-6 hidden items-center gap-1 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150", pathname === item.to || pathname.startsWith(item.to + "/") ? "text-fg" : "text-fg-muted hover:text-fg"),
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1 sm:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden md:inline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveClock, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onSearch,
							className: "hidden items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-fg-muted shadow-[var(--shadow-border)] transition-[box-shadow,color] duration-150 hover:text-fg hover:shadow-[var(--shadow-border-hover)] sm:inline-flex",
							"aria-label": "Open command palette",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px]",
								children: "K"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "relative inline-flex size-11 items-center justify-center text-fg-muted transition-colors hover:text-fg",
							"aria-label": `Cart, ${shown} items`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), shown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-accent-fg",
								children: shown
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/owner",
							className: "hidden text-sm text-fg-muted hover:text-fg sm:inline",
							children: "Desk"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							asChild: true,
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/book",
								children: "Open a brief"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center text-fg md:hidden",
							onClick: () => setOpen((v) => !v),
							"aria-label": open ? "Close menu" : "Open menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-bg px-4 py-4 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col",
				children: [
					NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "flex h-12 items-center text-base text-fg",
						children: item.label
					}, item.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "flex h-12 items-center text-fg-muted",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/owner",
						onClick: () => setOpen(false),
						className: "flex h-12 items-center text-fg-muted",
						children: "Owner desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-2 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							onClick: () => setOpen(false),
							children: "Open a brief"
						})
					})
				]
			})
		}) : null]
	});
}
function ScrollProgress() {
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const el = document.documentElement;
			const max = el.scrollHeight - el.clientHeight;
			setP(max > 0 ? el.scrollTop / max : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed top-0 right-0 left-0 z-40 h-px bg-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-px bg-accent origin-left",
			style: { transform: `scaleX(${p})` }
		})
	});
}
function deskState(now = /* @__PURE__ */ new Date(), zone = "America/Chicago") {
	const fmt = new Intl.DateTimeFormat("en-US", {
		timeZone: zone,
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	});
	const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
	const hour = Number(parts.hour);
	const weekday = parts.weekday;
	const weekend = weekday === "Sat" || weekday === "Sun";
	const open = !weekend && hour >= 9 && hour < 18;
	const tz = zone.includes("Chicago") ? "CST" : zone.split("/").pop() ?? "";
	return {
		open,
		label: open ? "Desk open" : weekend ? "Weekend queue" : "After hours",
		local: `${parts.hour}:${parts.minute} ${tz}`
	};
}
function StatusBar() {
	const { settings } = useSite();
	const [desk, setDesk] = (0, import_react.useState)(() => deskState());
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => setDesk(deskState()), 3e4);
		return () => window.clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden border-b border-border bg-bg-elevated/80 md:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-8 max-w-6xl items-center justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: desk.open ? "text-signal" : void 0,
				children: [
					desk.open ? "● Desk open" : `○ ${desk.label}`,
					" · ",
					desk.local
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "truncate",
				children: [
					settings.deskDays,
					" ",
					settings.deskHours,
					" · ",
					settings.sla
				]
			})]
		})
	});
}
var MAX_MSG = 500;
var MAX_ASK_MESSAGES = 8;
var MAX_ASK_MSG = 2e3;
var askCore = createServerFn({ method: "POST" }).validator((input) => object({ messages: array(object({
	role: _enum(["user", "assistant"]),
	content: string().trim().min(1).max(MAX_ASK_MSG)
})).min(1).max(MAX_ASK_MESSAGES) }).parse(input)).handler(createSsrRpc("7d89d1cde102fe1f76484fe0a2b48a14c095ac17c74fb675d7f3a8ca483ee55a"));
var talkToBot = createServerFn({ method: "POST" }).validator((input) => object({
	slug: string().trim().min(1).max(80),
	messages: array(object({
		role: _enum(["user", "assistant"]),
		content: string().trim().min(1).max(MAX_MSG)
	})).min(1).max(24)
}).parse(input)).handler(createSsrRpc("5cdb09c33321f45a0fad4fed7714ad204e150128323cbefbea8904de85cad39c"));
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-[var(--radius-md)] bg-bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-fg-subtle", "transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", "disabled:opacity-40", className),
	...props
}));
Input.displayName = "Input";
function SupportDock() {
	const { settings } = useSite();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("menu");
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "N3xUs Core. Ask about a service, a stack, or whether a brief is the next step."
	}]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function send() {
		const text = draft.trim();
		if (!text || busy) return;
		const next = [...messages, {
			role: "user",
			content: text
		}];
		setMessages(next);
		setDraft("");
		setBusy(true);
		setError(null);
		try {
			const res = await askCore({ data: { messages: next } });
			if (!res.ok) {
				setError(res.error);
				return;
			}
			setMessages([...next, {
				role: "assistant",
				content: res.text
			}]);
		} catch {
			setError("Could not reach Core.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			setOpen((v) => !v);
			setMode("menu");
		},
		className: "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-12 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-fg shadow-[var(--shadow-border)] sm:right-6",
		"aria-expanded": open,
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-4" }), open ? "Close" : "Support"]
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed right-4 bottom-20 z-40 w-[min(100%-2rem,22rem)] overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border-hover)] sm:right-6 sm:bottom-22",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "N3xUs Support"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-wider text-signal",
				children: "Online"
			})] })
		}), mode === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode("chat"),
					className: "flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-left text-sm hover:bg-bg-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4 text-fg-muted" }), "Chat with Core"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: settings.discordUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm hover:bg-bg-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-fg-muted" }), "Discord"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: settings.telegramUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm hover:bg-bg-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4 text-fg-muted" }), "Telegram"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/contact",
					className: "flex h-12 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm hover:bg-bg-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-4 text-fg-muted" }), "Open a ticket"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-96 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-3 overflow-auto px-4 py-3",
				children: [
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("max-w-[90%] text-sm leading-relaxed", m.role === "user" ? "ml-auto text-fg" : "text-fg-muted"),
						children: m.content
					}, i)),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg-subtle",
						children: "Core is thinking…"
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Ask about a service",
					"aria-label": "Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: busy,
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})]
		})]
	}) : null] });
}
function Shell({ children }) {
	const [search, setSearch] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const desk = pathname.startsWith("/owner") || pathname === "/login";
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearch((v) => !v);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (desk) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain" }),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: search,
				onClose: () => setSearch(false)
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-accent-fg",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { onSearch: () => setSearch(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportDock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallChip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: search,
				onClose: () => setSearch(false)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var loadSite = createServerFn({ method: "GET" }).handler(createSsrRpc("7dbaa1024e172c9855e2b1695daef47a73181ff83fa4fd583e388449c3128508"));
var websiteHoneypot = string().max(120).optional();
/** Rate-limit the caller; safe when invoked outside a request context. */
/**
* Fake a successful submission for honeypot trips. The shape mirrors the real
* insert return (callers read `row.id`) but nothing is written to the DB.
*/
var submitBrief = createServerFn({ method: "POST" }).validator((input) => object({
	name: string().trim().min(1).max(120),
	email: string().trim().email().max(200),
	channel: string().trim().max(120).default(""),
	groups: array(string()).max(8),
	budget: string().max(80),
	timeline: string().max(80),
	notes: string().trim().max(4e3).default(""),
	website: websiteHoneypot
}).parse(input)).handler(createSsrRpc("4c03ae564e49cc058ce4ab7c890e4517c581262c19b75ed006ccae016b0a94f9"));
var submitMessage = createServerFn({ method: "POST" }).validator((input) => object({
	name: string().trim().min(1).max(120),
	email: string().trim().email().max(200),
	topic: string().trim().max(120).default("General"),
	body: string().trim().min(1).max(4e3),
	website: websiteHoneypot
}).parse(input)).handler(createSsrRpc("d0bccd5538e926bf449b495e19dabb6516fc5697876ac3933a2d9d568b4b8cee"));
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
}).parse(input)).handler(createSsrRpc("c980a44612302431577dd5bcceaa40cd8ad9f222ff630c673347f9164b944da2"));
var submitReview = createServerFn({ method: "POST" }).validator((input) => object({
	name: string().trim().min(1).max(80),
	role: string().trim().max(80).default("Collaborator"),
	company: string().trim().max(80).default("—"),
	quote: string().trim().min(1).max(800),
	rating: number().int().min(1).max(5),
	website: websiteHoneypot
}).parse(input)).handler(createSsrRpc("7c3f05ffefffc42829304dbea61fa0144e5a3c4fe99ee168e968e03c013ddc07"));
var styles_default = "/assets/styles-BSX_6mt0.css";
var Route$51 = createRootRoute({
	beforeLoad: async () => {
		try {
			return { site: await loadSite() };
		} catch {
			return { site: seedSite() };
		}
	},
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		const meta = [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#090a0b"
			},
			{
				name: "format-detection",
				content: "telephone=no"
			},
			{
				name: "apple-mobile-web-app-title",
				content: site.settings.studioShort || "N3xUs"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		];
		if (site.settings.googleVerification) meta.push({
			name: "google-site-verification",
			content: site.settings.googleVerification
		});
		return {
			meta,
			links: [
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg?v=3"
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/icons/favicon-32.png?v=3"
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/icons/favicon-16.png?v=3"
				},
				{
					rel: "manifest",
					href: "/manifest.webmanifest"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "manifest",
					href: "/__grok/manifest.webmanifest"
				},
				{
					rel: "apple-touch-icon",
					href: "/icons/apple-touch-icon.png?v=3",
					sizes: "180x180"
				},
				{
					rel: "apple-touch-icon",
					href: "/__grok/icon-180.png"
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
				},
				{
					rel: "alternate",
					type: "application/rss+xml",
					href: absUrl("/rss.xml", site.settings),
					title: `${site.settings.studioName} journal`
				}
			]
		};
	},
	component: Root,
	notFoundComponent: NotFound
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterPwa, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center",
				toastOptions: { style: {
					background: "#111315",
					border: "1px solid rgba(236,238,235,0.12)",
					color: "#eceeeb"
				} }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-6 py-32 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl font-light",
				children: "This route is not on the map."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg-muted",
				children: "The page you wanted is missing or was never built."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-8 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Back to studio"
			})
		]
	});
}
var $$splitComponentImporter$36 = () => import("./routes-D1zrez78.mjs");
var Route$50 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$36, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: site.settings.seoTitle || PAGE_COPY.home.title,
			description: site.settings.seoDescription || PAGE_COPY.home.description,
			path: "/",
			site,
			home: true
		});
	}
});
var $$splitComponentImporter$35 = () => import("./about-BaxMEa40.mjs");
var Route$49 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$35, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.about.title,
			description: PAGE_COPY.about.description,
			path: "/about",
			site
		});
	}
});
var Route$48 = createFileRoute("/blog")({ beforeLoad: ({ location }) => {
	if (location.pathname.replace(/\/+$/, "") !== "/blog") return;
	throw redirect({
		to: "/journal",
		statusCode: 301
	});
} });
var $$splitComponentImporter$34 = () => import("./book-Aw8bQXpU.mjs");
var Route$47 = createFileRoute("/book")({
	component: lazyRouteComponent($$splitComponentImporter$34, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.book.title,
			description: PAGE_COPY.book.description,
			path: "/book",
			site
		});
	}
});
var $$splitComponentImporter$33 = () => import("./cart-RlRPyspu.mjs");
var Route$46 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$33, "component"),
	head: ({ matches }) => pageHead({
		title: "Cart",
		description: "Review items, then transmit the order to the studio.",
		path: "/cart",
		site: siteFromMatches(matches),
		index: false
	})
});
/** Legacy /case-studies URL — case studies now live on /work. */
var Route$45 = createFileRoute("/case-studies")({ beforeLoad: () => {
	throw redirect({
		to: "/work",
		statusCode: 301
	});
} });
var $$splitComponentImporter$32 = () => import("./contact-ZN3n0j5_.mjs");
var Route$44 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$32, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.contact.title,
			description: PAGE_COPY.contact.description,
			path: "/contact",
			site
		});
	}
});
/** Legacy /faq URL — FAQ content now lives on /studio (with FAQPage schema). */
var Route$43 = createFileRoute("/faq")({ beforeLoad: () => {
	throw redirect({
		to: "/studio",
		statusCode: 301
	});
} });
var $$splitComponentImporter$31 = () => import("./journal-Bxaa2Aso.mjs");
var Route$42 = createFileRoute("/journal")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./lab-AWJ9s131.mjs");
var Route$41 = createFileRoute("/lab")({ component: lazyRouteComponent($$splitComponentImporter$30, "component") });
var Route$40 = createFileRoute("/llms.txt")({ server: { handlers: { GET: async () => {
	const site = await readSite(true);
	return new Response(buildLlmsTxt(site), { headers: {
		"content-type": "text/plain; charset=utf-8",
		"cache-control": "public, max-age=1800"
	} });
} } } });
var $$splitComponentImporter$29 = () => import("./login-DZLkGO-f.mjs");
var Route$39 = createFileRoute("/login")({
	component: lazyRouteComponent($$splitComponentImporter$29, "component"),
	head: ({ matches }) => pageHead({
		title: "Owner desk",
		description: "Sign in to the N3xUs Konc3pt'z owner desk.",
		path: "/login",
		site: siteFromMatches(matches),
		index: false
	})
});
var DEFAULT_ORIGIN = "https://n3xuskonc3ptz.com";
function originOf(settings) {
	return (settings.siteUrl?.trim() || DEFAULT_ORIGIN).replace(/\/+$/, "");
}
function buildWebManifest(settings) {
	const name = settings.studioName || "N3xUs Konc3pt'z";
	const short = settings.studioShort || "N3xUs";
	const description = settings.seoDescription || settings.tagline || "Design. Development. Deployment.";
	return {
		id: `${originOf(settings)}/`,
		name,
		short_name: short.slice(0, 12),
		description,
		lang: "en",
		dir: "ltr",
		start_url: "/",
		scope: "/",
		display: "standalone",
		display_override: [
			"standalone",
			"minimal-ui",
			"browser"
		],
		orientation: "any",
		background_color: "#090a0b",
		theme_color: "#090a0b",
		categories: [
			"business",
			"design",
			"productivity"
		],
		handle_links: "preferred",
		launch_handler: { client_mode: "navigate-existing" },
		icons: [
			{
				src: "/icons/icon-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any"
			},
			{
				src: "/icons/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any"
			},
			{
				src: "/icons/maskable-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable"
			}
		],
		shortcuts: [
			{
				name: "Lab",
				short_name: "Lab",
				description: "Try live bot demos",
				url: "/lab",
				icons: [{
					src: "/icons/icon-192.png",
					sizes: "192x192"
				}]
			},
			{
				name: "Open a brief",
				short_name: "Brief",
				description: "Start a project",
				url: "/book",
				icons: [{
					src: "/icons/icon-192.png",
					sizes: "192x192"
				}]
			},
			{
				name: "Services",
				short_name: "Services",
				url: "/services",
				icons: [{
					src: "/icons/icon-192.png",
					sizes: "192x192"
				}]
			}
		],
		screenshots: [{
			src: "/icons/shot-wide.png",
			sizes: "1280x720",
			type: "image/png",
			form_factor: "wide",
			label: "Studio home"
		}, {
			src: "/icons/shot-narrow.png",
			sizes: "750x1334",
			type: "image/png",
			form_factor: "narrow",
			label: "Studio on a phone"
		}]
	};
}
var Route$38 = createFileRoute("/manifest.webmanifest")({ server: { handlers: { GET: async () => {
	const site = await readSite(true);
	return new Response(JSON.stringify(buildWebManifest(site.settings), null, 2), { headers: {
		"content-type": "application/manifest+json; charset=utf-8",
		"cache-control": "no-cache"
	} });
} } } });
var ownerBootstrap = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f27781fa2e6f592de849352793111cd35706702969f6533cfde16da11fc1816a"));
var ownerSaveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("990da8135db66b69fa0cab4da3bd912ba4e3c7b0ba5a1082b81f0c35a36c20c1"));
var ownerSaveFaqs = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a3487b9bf1198feba6e5aec55fd7a4d588aeab9c10217c601a1be751ef17cc98"));
var ownerSavePrinciples = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("fbbd70d53d01a6ff15b545eeb6ab11c5260c7be7c8b9a058c3583544a374fe66"));
var ownerSavePipeline = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("6a5c4f93d16d3bfba5364d4b2985e90b1f5f6280424522d98780b7c2305a63ba"));
var ownerSaveEngagements = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("687ac13689ac053b096a06ebd8f02995d7d935ecfa5756a20a623e95a6185c2a"));
var ownerSaveCapabilities = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("4ee635d7fe72b4bd5dacea4adf70db9245e868ad522925489144d94e40c856db"));
var ownerSaveService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e7a381876a0057ddcb052de5175a6585f72e53a0d5e2509ccfef44f86f9eb3a2"));
var ownerDeleteService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(createSsrRpc("cecbaf19dd72f0740ccbf512b733979491e294ecf48aa962a021604a45d0ff01"));
var ownerSaveProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("98e49a84cf68b79968757b9881fb65bdd62531e52bed7b4bf57822a21518dcec"));
var ownerDeleteProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(createSsrRpc("e8605ad6db71435dea84a0162e9cae55ee2dabc437f5c616c82cdbd68fe67c8a"));
var ownerSaveProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("2471182d8d6af6974ec163bfddbce21f43d842b3239c4b3f78903c76fd959c3b"));
var ownerDeleteProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(createSsrRpc("facadb5629689e4be70466da1ba6c57451a4584f93d7146c2509f69fa01f4ee3"));
var ownerSavePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("99b1a92f611b2a376beb3981962dc8956bcb419080f07a2dbaf517ddf342d493"));
var ownerDeletePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(createSsrRpc("bf8be7a766563ff317f024d00bf6703183dba9fe3547ddc6b3bec1745a5e0601"));
var ownerSaveBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("dffefd66ca0e4edcb5a99478b1ff6e46ad19625825c33fc4099a771e8f5e6925"));
var ownerDeleteBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(createSsrRpc("0146a1011e201218b1bebfe79cc8afee4ccf2e2c08f872f6067ac1bec0f30931"));
var ownerSaveReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("315a271c326fcf61f8130fcf761a4a71ddbbc38c9b01ffc0864661a642416891"));
var ownerDeleteReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ id: string() }).parse(input)).handler(createSsrRpc("01b52493cd23a9d3d929c1cbcaa76f255faa91ecfc840894c7a91c43302e8152"));
var ownerSetStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	table: _enum([
		"briefs",
		"messages",
		"orders"
	]),
	id: string(),
	status: string().min(1).max(40)
}).parse(input)).handler(createSsrRpc("b1d827663d906cea755dedd09d800510c3a4b5ad54ea4044692f2ba22ec259fc"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	userId: string().min(1),
	email: string().optional()
}).parse(input)).handler(createSsrRpc("2e4c780d1717723b705dddc8dd40737f12d2dc57cd6d4006b24bca054075369c"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ userId: string().min(1) }).parse(input)).handler(createSsrRpc("e7604ec1bad9d43d3e630f1ff8c6bc9144f39e0ca1cff126c1ec67b146d124f8"));
var $$splitComponentImporter$28 = () => import("./owner-BE9KxPOx.mjs");
var Route$37 = createFileRoute("/owner")({
	loader: async () => {
		try {
			const res = await ownerBootstrap();
			if (!res.ok) {
				if (res.error.includes("already has an owner")) return {
					denied: true,
					error: res.error
				};
				throw redirect({ to: "/login" });
			}
			return {
				denied: false,
				desk: res.data
			};
		} catch {
			throw redirect({ to: "/login" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$28, "component"),
	head: ({ matches }) => pageHead({
		title: "Owner desk",
		description: "Edit the studio site, inbox, and catalog.",
		path: "/owner",
		site: siteFromMatches(matches),
		index: false
	})
});
function useDesk() {
	const data = Route$37.useLoaderData();
	if (data.denied) throw new Error("Not an owner");
	return data.desk;
}
var Route$36 = createFileRoute("/portfolio")({ beforeLoad: ({ location }) => {
	if (location.pathname.replace(/\/+$/, "") !== "/portfolio") return;
	throw redirect({
		to: "/work",
		statusCode: 301
	});
} });
var $$splitComponentImporter$27 = () => import("./privacy-DYQXcofN.mjs");
/**
* Placeholder privacy policy — honest about what the site collects.
* OWNER: replace this with your real policy text before launch.
*/
var Route$35 = createFileRoute("/privacy")({
	component: lazyRouteComponent($$splitComponentImporter$27, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.privacy.title,
			description: PAGE_COPY.privacy.description,
			path: "/privacy",
			site
		});
	}
});
/** Legacy /quote URL — the brief form now lives on /book. */
var Route$34 = createFileRoute("/quote")({ beforeLoad: () => {
	throw redirect({
		to: "/book",
		statusCode: 301
	});
} });
var Route$33 = createFileRoute("/reviews")({ beforeLoad: () => {
	throw redirect({
		to: "/transmissions",
		statusCode: 301
	});
} });
var Route$32 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async () => {
	const site = await readSite(true);
	const body = buildRobotsTxt(siteOrigin(site.settings), site.settings.indexable);
	return new Response(body, { headers: {
		"content-type": "text/plain; charset=utf-8",
		"cache-control": "public, max-age=1800"
	} });
} } } });
var Route$31 = createFileRoute("/rss.xml")({ server: { handlers: { GET: async () => {
	const site = await readSite(true);
	return new Response(buildRssXml(site), { headers: {
		"content-type": "application/rss+xml; charset=utf-8",
		"cache-control": "public, max-age=1800"
	} });
} } } });
var $$splitComponentImporter$26 = () => import("./services-C5swur1F.mjs");
var Route$30 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var Route$29 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const site = await readSite(true);
	const xml = buildSitemapXml(siteOrigin(site.settings), [...staticSitemapRows(siteLastmod(site)), ...catalogSitemapRows(site)]);
	return new Response(xml, { headers: {
		"content-type": "application/xml; charset=utf-8",
		"cache-control": "public, max-age=1800"
	} });
} } } });
var $$splitComponentImporter$25 = () => import("./store-Cz9qDx3U.mjs");
var Route$28 = createFileRoute("/store")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./studio-BlllDI03.mjs");
var Route$27 = createFileRoute("/studio")({
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.studio.title,
			description: PAGE_COPY.studio.description,
			path: "/studio",
			site
		});
	}
});
var $$splitComponentImporter$23 = () => import("./terms-CT3shqwt.mjs");
/**
* Placeholder terms of service — plain-language working terms.
* OWNER: replace this with your real terms before launch.
*/
var Route$26 = createFileRoute("/terms")({
	component: lazyRouteComponent($$splitComponentImporter$23, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.terms.title,
			description: PAGE_COPY.terms.description,
			path: "/terms",
			site
		});
	}
});
var $$splitComponentImporter$22 = () => import("./transmissions-1ajG31VU.mjs");
var Route$25 = createFileRoute("/transmissions")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.transmissions.title,
			description: PAGE_COPY.transmissions.description,
			path: "/transmissions",
			site
		});
	}
});
var $$splitComponentImporter$21 = () => import("./work-4KK0cFTh.mjs");
var Route$24 = createFileRoute("/work")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
/**
* Legacy blog detail URLs (/blog/<slug>) from the old site.
* Slugs are 1:1 compatible with /journal/<slug>; preserve them with a
* permanent redirect, and fall back to the journal index for unknown slugs.
*/
var Route$23 = createFileRoute("/blog/$slug")({ beforeLoad: ({ params, context }) => {
	const post = context.site.posts.find((p) => p.slug === params.slug);
	if (post) throw redirect({
		to: "/journal/$slug",
		params: { slug: post.slug },
		statusCode: 301
	});
	throw redirect({
		to: "/journal",
		statusCode: 301
	});
} });
var $$splitComponentImporter$20 = () => import("./journal.index-DpM8xrwH.mjs");
var Route$22 = createFileRoute("/journal/")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.journal.title,
			description: PAGE_COPY.journal.description,
			path: "/journal",
			site
		});
	}
});
var $$splitComponentImporter$19 = () => import("./journal._slug-CwE1dmLH.mjs");
var Route$21 = createFileRoute("/journal/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	loader: ({ params, context }) => {
		const post = context.site.posts.find((p) => p.slug === params.slug);
		if (!post) throw notFound();
		return post;
	},
	head: ({ matches, loaderData }) => {
		const site = siteFromMatches(matches);
		const post = loaderData;
		if (!post) return { meta: [{
			name: "robots",
			content: "noindex, nofollow"
		}] };
		return pageHead({
			title: listingTitle(post, post.title),
			description: listingDescription(post, post.excerpt),
			path: `/journal/${post.slug}`,
			site,
			image: post.image || void 0,
			type: "article",
			publishedTime: post.date
		});
	}
});
var $$splitComponentImporter$18 = () => import("./lab.index-CKQLsj9E.mjs");
var Route$20 = createFileRoute("/lab/")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.lab.title,
			description: PAGE_COPY.lab.description,
			path: "/lab",
			site
		});
	}
});
var $$splitComponentImporter$17 = () => import("./lab._slug-DsNYUt_g.mjs");
var Route$19 = createFileRoute("/lab/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	loader: ({ params, context }) => {
		const bot = context.site.bots.find((b) => b.slug === params.slug);
		if (!bot) throw notFound();
		return bot;
	},
	head: ({ matches, loaderData }) => {
		const site = siteFromMatches(matches);
		const bot = loaderData;
		if (!bot) return { meta: [{
			name: "robots",
			content: "noindex, nofollow"
		}] };
		return pageHead({
			title: listingTitle(bot, bot.name),
			description: listingDescription(bot, bot.tagline),
			path: `/lab/${bot.slug}`,
			site
		});
	}
});
var $$splitComponentImporter$16 = () => import("./owner.index-_ExtZcL8.mjs");
var Route$18 = createFileRoute("/owner/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./owner.bots-BPJNbpNJ.mjs");
var Route$17 = createFileRoute("/owner/bots")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./owner.inbox-NNVasfKo.mjs");
var Route$16 = createFileRoute("/owner/inbox")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./owner.journal-CQgj8o1l.mjs");
var Route$15 = createFileRoute("/owner/journal")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./owner.reviews-CCg1B1ox.mjs");
var Route$14 = createFileRoute("/owner/reviews")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./owner.runbook-BCrMdMmF.mjs");
var Route$13 = createFileRoute("/owner/runbook")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./owner.seo-DlOUwTKK.mjs");
var Route$12 = createFileRoute("/owner/seo")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./owner.services-BriwO7Hj.mjs");
var Route$11 = createFileRoute("/owner/services")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./owner.site-Blt9nhOI.mjs");
var Route$10 = createFileRoute("/owner/site")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./owner.store-CnD_I5DQ.mjs");
var Route$9 = createFileRoute("/owner/store")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./owner.work-CvoHFd4a.mjs");
var Route$8 = createFileRoute("/owner/work")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
/**
* Legacy portfolio detail URLs (/portfolio/<slug>) from the old site.
* Slugs are 1:1 compatible with /work/<slug>; preserve them with a
* permanent redirect, and fall back to the work index for unknown slugs.
*/
var Route$7 = createFileRoute("/portfolio/$slug")({ beforeLoad: ({ params, context }) => {
	const project = context.site.projects.find((p) => p.slug === params.slug);
	if (project) throw redirect({
		to: "/work/$slug",
		params: { slug: project.slug },
		statusCode: 301
	});
	throw redirect({
		to: "/work",
		statusCode: 301
	});
} });
var $$splitComponentImporter$5 = () => import("./services.index-Cud__tZo.mjs");
var Route$6 = createFileRoute("/services/")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.services.title,
			description: PAGE_COPY.services.description,
			path: "/services",
			site
		});
	}
});
var $$splitComponentImporter$4 = () => import("./services._slug-B4cA2ToN.mjs");
var Route$5 = createFileRoute("/services/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	loader: ({ params, context }) => {
		const service = context.site.services.find((s) => s.slug === params.slug);
		if (!service) throw notFound();
		return service;
	},
	head: ({ matches, loaderData }) => {
		const site = siteFromMatches(matches);
		const service = loaderData;
		if (!service) return { meta: [{
			name: "robots",
			content: "noindex, nofollow"
		}] };
		return pageHead({
			title: `${listingTitle(service, service.name)}`,
			description: listingDescription(service, `${service.name} from ${site.settings.studioName}. ${service.summary}`),
			path: `/services/${service.slug}`,
			site
		});
	}
});
var $$splitComponentImporter$3 = () => import("./store.index-BGghx5uv.mjs");
var Route$4 = createFileRoute("/store/")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.store.title,
			description: PAGE_COPY.store.description,
			path: "/store",
			site
		});
	}
});
var $$splitComponentImporter$2 = () => import("./store._slug-DGWHkubJ.mjs");
var Route$3 = createFileRoute("/store/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	loader: ({ params, context }) => {
		const product = context.site.products.find((p) => p.slug === params.slug);
		if (!product) throw notFound();
		return product;
	},
	head: ({ matches, loaderData }) => {
		const site = siteFromMatches(matches);
		const product = loaderData;
		if (!product) return { meta: [{
			name: "robots",
			content: "noindex, nofollow"
		}] };
		return pageHead({
			title: listingTitle(product, product.name),
			description: listingDescription(product, product.blurb),
			path: `/store/${product.slug}`,
			site,
			type: "product"
		});
	}
});
var $$splitComponentImporter$1 = () => import("./work.index-9ANpRzjo.mjs");
var Route$2 = createFileRoute("/work/")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ matches }) => {
		const site = siteFromMatches(matches);
		return pageHead({
			title: PAGE_COPY.work.title,
			description: PAGE_COPY.work.description,
			path: "/work",
			site
		});
	}
});
var $$splitComponentImporter = () => import("./work._slug-D-t4LWc3.mjs");
var Route$1 = createFileRoute("/work/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: ({ params, context }) => {
		const project = context.site.projects.find((p) => p.slug === params.slug);
		if (!project) throw notFound();
		return project;
	},
	head: ({ matches, loaderData }) => {
		const site = siteFromMatches(matches);
		const project = loaderData;
		if (!project) return { meta: [{
			name: "robots",
			content: "noindex, nofollow"
		}] };
		return pageHead({
			title: listingTitle(project, project.title),
			description: listingDescription(project, `${project.title} case study from ${site.settings.studioName}.`),
			path: `/work/${project.slug}`,
			site,
			image: project.image
		});
	}
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$50.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$51
});
var AboutRoute = Route$49.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$51
});
var BlogRoute = Route$48.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$51
});
var BookRoute = Route$47.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => Route$51
});
var CartRoute = Route$46.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$51
});
var CaseStudiesRoute = Route$45.update({
	id: "/case-studies",
	path: "/case-studies",
	getParentRoute: () => Route$51
});
var ContactRoute = Route$44.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$51
});
var FaqRoute = Route$43.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$51
});
var JournalRoute = Route$42.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$51
});
var LabRoute = Route$41.update({
	id: "/lab",
	path: "/lab",
	getParentRoute: () => Route$51
});
var LlmsDottxtRoute = Route$40.update({
	id: "/llms.txt",
	path: "/llms.txt",
	getParentRoute: () => Route$51
});
var LoginRoute = Route$39.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$51
});
var ManifestDotwebmanifestRoute = Route$38.update({
	id: "/manifest.webmanifest",
	path: "/manifest.webmanifest",
	getParentRoute: () => Route$51
});
var OwnerRoute = Route$37.update({
	id: "/owner",
	path: "/owner",
	getParentRoute: () => Route$51
});
var PortfolioRoute = Route$36.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => Route$51
});
var PrivacyRoute = Route$35.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$51
});
var QuoteRoute = Route$34.update({
	id: "/quote",
	path: "/quote",
	getParentRoute: () => Route$51
});
var ReviewsRoute = Route$33.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => Route$51
});
var RobotsDottxtRoute = Route$32.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$51
});
var RssDotxmlRoute = Route$31.update({
	id: "/rss.xml",
	path: "/rss.xml",
	getParentRoute: () => Route$51
});
var ServicesRoute = Route$30.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$51
});
var SitemapDotxmlRoute = Route$29.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$51
});
var StoreRoute = Route$28.update({
	id: "/store",
	path: "/store",
	getParentRoute: () => Route$51
});
var StudioRoute = Route$27.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$51
});
var TermsRoute = Route$26.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$51
});
var TransmissionsRoute = Route$25.update({
	id: "/transmissions",
	path: "/transmissions",
	getParentRoute: () => Route$51
});
var WorkRoute = Route$24.update({
	id: "/work",
	path: "/work",
	getParentRoute: () => Route$51
});
var BlogSlugRoute = Route$23.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var JournalIndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => JournalRoute
});
var JournalSlugRoute = Route$21.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => JournalRoute
});
var LabIndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => LabRoute
});
var LabSlugRoute = Route$19.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LabRoute
});
var OwnerIndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => OwnerRoute
});
var OwnerBotsRoute = Route$17.update({
	id: "/bots",
	path: "/bots",
	getParentRoute: () => OwnerRoute
});
var OwnerInboxRoute = Route$16.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => OwnerRoute
});
var OwnerJournalRoute = Route$15.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => OwnerRoute
});
var OwnerReviewsRoute = Route$14.update({
	id: "/reviews",
	path: "/reviews",
	getParentRoute: () => OwnerRoute
});
var OwnerRunbookRoute = Route$13.update({
	id: "/runbook",
	path: "/runbook",
	getParentRoute: () => OwnerRoute
});
var OwnerSeoRoute = Route$12.update({
	id: "/seo",
	path: "/seo",
	getParentRoute: () => OwnerRoute
});
var OwnerServicesRoute = Route$11.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => OwnerRoute
});
var OwnerSiteRoute = Route$10.update({
	id: "/site",
	path: "/site",
	getParentRoute: () => OwnerRoute
});
var OwnerStoreRoute = Route$9.update({
	id: "/store",
	path: "/store",
	getParentRoute: () => OwnerRoute
});
var OwnerWorkRoute = Route$8.update({
	id: "/work",
	path: "/work",
	getParentRoute: () => OwnerRoute
});
var PortfolioSlugRoute = Route$7.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => PortfolioRoute
});
var ServicesIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => ServicesRoute
});
var ServicesSlugRoute = Route$5.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ServicesRoute
});
var StoreIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => StoreRoute
});
var StoreSlugRoute = Route$3.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => StoreRoute
});
var WorkIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => WorkRoute
});
var WorkSlugRoute = Route$1.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => WorkRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$51
});
var BlogRouteChildren = { BlogSlugRoute };
var BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
var JournalRouteChildren = {
	JournalSlugRoute,
	JournalIndexRoute
};
var JournalRouteWithChildren = JournalRoute._addFileChildren(JournalRouteChildren);
var LabRouteChildren = {
	LabSlugRoute,
	LabIndexRoute
};
var LabRouteWithChildren = LabRoute._addFileChildren(LabRouteChildren);
var OwnerRouteChildren = {
	OwnerBotsRoute,
	OwnerInboxRoute,
	OwnerJournalRoute,
	OwnerReviewsRoute,
	OwnerRunbookRoute,
	OwnerSeoRoute,
	OwnerServicesRoute,
	OwnerSiteRoute,
	OwnerStoreRoute,
	OwnerWorkRoute,
	OwnerIndexRoute
};
var OwnerRouteWithChildren = OwnerRoute._addFileChildren(OwnerRouteChildren);
var PortfolioRouteChildren = { PortfolioSlugRoute };
var PortfolioRouteWithChildren = PortfolioRoute._addFileChildren(PortfolioRouteChildren);
var ServicesRouteChildren = {
	ServicesSlugRoute,
	ServicesIndexRoute
};
var ServicesRouteWithChildren = ServicesRoute._addFileChildren(ServicesRouteChildren);
var StoreRouteChildren = {
	StoreSlugRoute,
	StoreIndexRoute
};
var StoreRouteWithChildren = StoreRoute._addFileChildren(StoreRouteChildren);
var WorkRouteChildren = {
	WorkSlugRoute,
	WorkIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	BlogRoute: BlogRouteWithChildren,
	BookRoute,
	CartRoute,
	CaseStudiesRoute,
	ContactRoute,
	FaqRoute,
	JournalRoute: JournalRouteWithChildren,
	LabRoute: LabRouteWithChildren,
	LlmsDottxtRoute,
	LoginRoute,
	ManifestDotwebmanifestRoute,
	OwnerRoute: OwnerRouteWithChildren,
	PortfolioRoute: PortfolioRouteWithChildren,
	PrivacyRoute,
	QuoteRoute,
	ReviewsRoute,
	RobotsDottxtRoute,
	RssDotxmlRoute,
	ServicesRoute: ServicesRouteWithChildren,
	SitemapDotxmlRoute,
	StoreRoute: StoreRouteWithChildren,
	StudioRoute,
	TermsRoute,
	TransmissionsRoute,
	WorkRoute: WorkRoute._addFileChildren(WorkRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$51._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { submitOrder as A, Mark as B, ownerSaveProject as C, ownerSetStatus as D, ownerSaveSettings as E, cartTotal as F, clipMeta as G, PAGE_COPY as H, useCart as I, siteOrigin as K, RedirectToSignIn as L, Input as M, talkToBot as N, submitBrief as O, Button as P, UserButton as R, ownerSaveProduct as S, ownerSaveService as T, absImage as U, useSite as V, absUrl as W, ownerSaveEngagements as _, Route$19 as a, ownerSavePost as b, useDesk as c, ownerDeleteProduct as d, ownerDeleteProject as f, ownerSaveCapabilities as g, ownerSaveBot as h, Route$5 as i, submitReview as j, submitMessage as k, ownerDeleteBot as l, ownerDeleteService as m, Route$1 as n, Route$21 as o, ownerDeleteReview as p, Route$3 as r, Route$37 as s, router_exports as t, ownerDeletePost as u, ownerSaveFaqs as v, ownerSaveReview as w, ownerSavePrinciples as x, ownerSavePipeline as y, useCurrentUserState as z };
