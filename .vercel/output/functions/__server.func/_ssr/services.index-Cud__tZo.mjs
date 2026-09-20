import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { H as PAGE_COPY, V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, f as serviceNode, i as breadcrumbs, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.index-Cud__tZo.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	const { services, settings } = useSite();
	const groups = [...new Set(services.map((s) => s.group))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
			organization(settings),
			breadcrumbs(settings, [{
				name: "Home",
				path: "/"
			}, {
				name: "Services",
				path: "/services"
			}]),
			{
				"@type": "CollectionPage",
				name: PAGE_COPY.services.title,
				description: PAGE_COPY.services.description,
				hasPart: services.map((s) => serviceNode(s, settings))
			}
		]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Services",
			title: "Priced, scoped, and written down.",
			lede: "Build, automate, host, amplify. Custom web design and development, Discord and Telegram bots, managed hosting, and SEO — if it does not fit a line item, open a brief."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
				label: "Home",
				to: "/"
			}, { label: "Services" }] }), groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: g
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: services.filter((s) => s.group === g).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/services/$slug",
						params: { slug: s.slug },
						className: "flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-medium",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xl text-sm text-fg-muted",
							children: s.summary
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tabular-nums text-fg-muted",
							children: formatUsd(s.price, { monthly: s.billing === "monthly" })
						})]
					}, s.slug))
				})]
			}, g))]
		})
	] });
}
//#endregion
export { ServicesPage as component };
