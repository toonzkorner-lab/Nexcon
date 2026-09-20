import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { d as Check, h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as useCart, P as Button, V as useSite, i as Route$5 } from "./router-CkGAamYH.mjs";
import { t as Badge } from "./badge-jponBted.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, f as serviceNode, i as breadcrumbs, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._slug-B4cA2ToN.js
var import_jsx_runtime = require_jsx_runtime();
function ServiceDetail() {
	const service = Route$5.useLoaderData();
	const { services, settings } = useSite();
	const add = useCart((s) => s.add);
	const related = services.filter((s) => s.slug !== service.slug && s.group === service.group).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
				organization(settings),
				serviceNode(service, settings),
				breadcrumbs(settings, [
					{
						name: "Home",
						path: "/"
					},
					{
						name: "Services",
						path: "/services"
					},
					{
						name: service.name,
						path: `/services/${service.slug}`
					}
				])
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [
				{
					label: "Home",
					to: "/"
				},
				{
					label: "Services",
					to: "/services"
				},
				{ label: service.name }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/services",
				className: "mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Services"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: service.group }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-light tracking-tight sm:text-5xl",
						children: service.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-fg-muted",
						children: service.description
					}),
					service.hoursNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-fg-subtle",
						children: service.hoursNote
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 space-y-3",
						children: service.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-signal" }), f]
						}, f))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
							children: service.billing === "monthly" ? "Subscription" : "Starting at"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-3xl tabular-nums",
							children: formatUsd(service.price, { monthly: service.billing === "monthly" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-fg-muted",
							children: ["Timeline: ", service.timeline]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									add({
										id: `svc-${service.slug}`,
										kind: "service",
										name: service.name,
										price: service.price,
										billing: service.billing
									});
									toast.success(`${service.name} added to cart`);
								},
								children: "Add to cart"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/book",
									children: "Discuss a custom scope"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
								children: "Deliverables"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2 text-sm text-fg-muted",
								children: service.deliverables.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d }, d))
							})]
						})
					]
				})]
			}),
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xl font-medium",
					children: ["Also in ", service.group]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: related.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/services/$slug",
						params: { slug: s.slug },
						className: "flex justify-between gap-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-fg-subtle",
							children: formatUsd(s.price, { monthly: s.billing === "monthly" })
						})]
					}) }, s.slug))
				})]
			}) : null
		]
	});
}
//#endregion
export { ServiceDetail as component };
