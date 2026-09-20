import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
import { H as PAGE_COPY, V as useSite } from "./router-CkGAamYH.mjs";
import { t as Badge } from "./badge-jponBted.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { a as creativeWorkNode, c as organization, i as breadcrumbs, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work.index-9ANpRzjo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"All",
	"Web",
	"Bots",
	"Systems",
	"Brand"
];
function WorkPage() {
	const { projects, settings } = useSite();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const list = (0, import_react.useMemo)(() => filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter)), [filter, projects]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
			organization(settings),
			breadcrumbs(settings, [{
				name: "Home",
				path: "/"
			}, {
				name: "Work",
				path: "/work"
			}]),
			{
				"@type": "CollectionPage",
				name: PAGE_COPY.work.title,
				description: PAGE_COPY.work.description,
				hasPart: projects.map((p) => creativeWorkNode(p, settings))
			}
		]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Work",
			title: "Systems on the record.",
			lede: "Client and studio projects. Websites, Discord bots, hosting, and internal tools you can actually open."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
					label: "Home",
					to: "/"
				}, { label: "Work" }] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(f),
						className: cn("h-10 rounded-full px-4 text-sm transition-colors duration-150", filter === f ? "bg-accent text-accent-fg" : "text-fg-muted shadow-[var(--shadow-border)] hover:text-fg"),
						children: f
					}, f))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 sm:grid-cols-2",
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/work/$slug",
						params: { slug: p.slug },
						className: "group overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image,
							alt: p.imageAlt || `${p.title} — ${p.client} case study`,
							width: 1280,
							height: 800,
							loading: "lazy",
							decoding: "async",
							className: "aspect-[16/10] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 group-hover:scale-[1.03]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: p.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t }, t))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 text-xl font-light",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-fg-muted",
									children: p.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 font-mono text-[11px] text-fg-subtle",
									children: [
										p.kind,
										" · ",
										p.year,
										" · ",
										p.stack.join(" / ")
									]
								})
							]
						})]
					}, p.slug))
				})
			]
		})
	] });
}
//#endregion
export { WorkPage as component };
