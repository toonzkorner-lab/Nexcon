import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crumbs-p_xy5w6E.js
var import_jsx_runtime = require_jsx_runtime();
function Crumbs({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-wrap items-center gap-2",
			children: items.map((item, i) => {
				const last = i === items.length - 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "/"
					}) : null, last || !item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: last ? "text-fg-muted" : void 0,
						"aria-current": last ? "page" : void 0,
						children: item.label
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						params: item.params,
						className: "hover:text-fg",
						children: item.label
					})]
				}, `${item.label}-${i}`);
			})
		})
	});
}
//#endregion
export { Crumbs as t };
