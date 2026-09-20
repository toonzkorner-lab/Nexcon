import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { H as PAGE_COPY, V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { c as organization, i as breadcrumbs, o as graph, t as JsonLd, u as productNode } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store.index-BGghx5uv.js
var import_jsx_runtime = require_jsx_runtime();
function StorePage() {
	const { products, settings } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
			organization(settings),
			breadcrumbs(settings, [{
				name: "Home",
				path: "/"
			}, {
				name: "Store",
				path: "/store"
			}]),
			{
				"@type": "CollectionPage",
				name: PAGE_COPY.store.title,
				description: PAGE_COPY.store.description,
				hasPart: products.map((p) => productNode(p, settings))
			}
		]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Store",
			title: "Tools we already built — yours to run.",
			lede: "Templates and themes. No license maze. Add to cart; fulfillment is queued to the channel you give us."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 pb-20 sm:grid-cols-2 sm:px-6",
			children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/store/$slug",
				params: { slug: p.slug },
				className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
						children: p.stack.join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-xl font-light",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-fg-muted",
						children: p.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-mono text-sm tabular-nums",
						children: formatUsd(p.price)
					})
				]
			}, p.slug))
		})
	] });
}
//#endregion
export { StorePage as component };
