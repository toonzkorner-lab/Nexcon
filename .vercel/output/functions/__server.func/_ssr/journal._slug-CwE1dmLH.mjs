import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { V as useSite, o as Route$21 } from "./router-CkGAamYH.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, i as breadcrumbs, l as person, o as graph, r as articleNode, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal._slug-CwE1dmLH.js
var import_jsx_runtime = require_jsx_runtime();
function PostPage() {
	const post = Route$21.useLoaderData();
	const { posts, settings } = useSite();
	const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
				organization(settings),
				person(settings),
				articleNode(post, settings),
				breadcrumbs(settings, [
					{
						name: "Home",
						path: "/"
					},
					{
						name: "Journal",
						path: "/journal"
					},
					{
						name: post.title,
						path: `/journal/${post.slug}`
					}
				])
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [
				{
					label: "Home",
					to: "/"
				},
				{
					label: "Journal",
					to: "/journal"
				},
				{ label: post.title }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/journal",
				className: "mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Journal"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 font-mono text-[11px] text-fg-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: post.date,
						children: post.date
					}),
					" · ",
					post.reading,
					" · ",
					post.tags.join(" / ")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-light tracking-tight",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-fg-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						itemProp: "author",
						children: settings.founderName
					}),
					" · ",
					settings.founderTitle
				]
			}),
			post.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.image,
					alt: post.imageAlt || post.title,
					className: "aspect-[16/9] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-10",
				children: post.body.map((block, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [block.heading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-xl font-medium",
					children: block.heading
				}) : null, block.paragraphs.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-base leading-relaxed text-fg-muted last:mb-0",
					children: para
				}, para))] }, i))
			}),
			more.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-16 border-t border-border pt-8",
				"aria-label": "More journal posts",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "More from the desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: more.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/journal/$slug",
						params: { slug: p.slug },
						className: "text-sm text-fg-muted hover:text-fg",
						children: p.title
					}) }, p.slug))
				})]
			}) : null
		]
	});
}
//#endregion
export { PostPage as component };
