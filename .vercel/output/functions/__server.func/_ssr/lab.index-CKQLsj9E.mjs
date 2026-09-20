import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, i as breadcrumbs, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab.index-CKQLsj9E.js
var import_jsx_runtime = require_jsx_runtime();
function LabPage() {
	const { bots, settings } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([organization(settings), breadcrumbs(settings, [{
			name: "Home",
			path: "/"
		}, {
			name: "Lab",
			path: "/lab"
		}])]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Lab",
			title: "Bots you can actually use.",
			lede: "Not a screenshot. Ledger is a live economy. Relay is a live desk. Both run in this page — the same patterns we deploy to Discord and Telegram."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
				label: "Home",
				to: "/"
			}, { label: "Lab" }] }), bots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-3",
				children: bots.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lab/$slug",
					params: { slug: b.slug },
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
							children: [
								b.channel,
								" · ",
								b.kind === "chat" ? "live chat" : b.kind === "casino" ? "playable casino" : "playable ledger"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-2xl font-light tracking-tight",
							children: b.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg-muted",
							children: b.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 font-mono text-[11px] text-signal",
							children: "Open demo"
						})
					]
				}, b.slug))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-fg-muted",
				children: "No demos published. The desk can add one in Bots."
			})]
		})
	] });
}
//#endregion
export { LabPage as component };
