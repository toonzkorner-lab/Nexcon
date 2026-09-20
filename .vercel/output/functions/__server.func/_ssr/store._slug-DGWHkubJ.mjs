import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { d as Check, h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as useCart, P as Button, V as useSite, r as Route$3 } from "./router-CkGAamYH.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, i as breadcrumbs, o as graph, t as JsonLd, u as productNode } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store._slug-DGWHkubJ.js
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const product = Route$3.useLoaderData();
	const { products, settings, bots } = useSite();
	const add = useCart((s) => s.add);
	const more = products.filter((p) => p.slug !== product.slug).slice(0, 3);
	const demo = bots.find((b) => b.productSlug === product.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
				organization(settings),
				productNode(product, settings),
				breadcrumbs(settings, [
					{
						name: "Home",
						path: "/"
					},
					{
						name: "Store",
						path: "/store"
					},
					{
						name: product.name,
						path: `/store/${product.slug}`
					}
				])
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [
				{
					label: "Home",
					to: "/"
				},
				{
					label: "Store",
					to: "/store"
				},
				{ label: product.name }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/store",
				className: "mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Store"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
						children: product.stack.join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl font-light tracking-tight",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-fg-muted",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 space-y-3",
						children: product.includes.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-signal" }), i]
						}, i))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-3xl tabular-nums",
							children: formatUsd(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg-muted",
							children: "Digital good. License for one production use unless noted."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full",
							onClick: () => {
								add({
									id: `prd-${product.slug}`,
									kind: "product",
									name: product.name,
									price: product.price,
									billing: "one-off"
								});
								toast.success(`${product.name} added to cart`);
							},
							children: "Add to cart"
						}),
						demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "mt-2 w-full",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lab/$slug",
								params: { slug: demo.slug },
								children: "Try live demo"
							})
						}) : null
					]
				})]
			}),
			more.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "More from the store"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: more.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/store/$slug",
						params: { slug: p.slug },
						className: "flex justify-between gap-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-fg-subtle",
							children: formatUsd(p.price)
						})]
					}) }, p.slug))
				})]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
