import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as PAGE_COPY, V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, i as breadcrumbs, o as graph, r as articleNode, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal.index-DpM8xrwH.js
var import_jsx_runtime = require_jsx_runtime();
function JournalPage() {
	const { posts, settings } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
			organization(settings),
			breadcrumbs(settings, [{
				name: "Home",
				path: "/"
			}, {
				name: "Journal",
				path: "/journal"
			}]),
			{
				"@type": "CollectionPage",
				name: PAGE_COPY.journal.title,
				description: PAGE_COPY.journal.description,
				hasPart: posts.map((p) => articleNode(p, settings))
			}
		]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Journal",
			title: "Notes from the desk.",
			lede: "How we actually work — bots, type, hiring, and the difference between dark and neon."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 pb-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
				label: "Home",
				to: "/"
			}, { label: "Journal" }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/journal/$slug",
						params: { slug: p.slug },
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[11px] text-fg-subtle",
								children: [
									p.date,
									" · ",
									p.reading,
									" · ",
									p.tags.join(" / ")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-light tracking-tight",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-fg-muted",
								children: p.excerpt
							})
						]
					})
				}, p.slug))
			})]
		})
	] });
}
//#endregion
export { JournalPage as component };
