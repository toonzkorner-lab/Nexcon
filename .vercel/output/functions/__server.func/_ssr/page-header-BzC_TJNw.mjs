import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-jponBted.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-BzC_TJNw.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: kicker }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 max-w-3xl text-4xl font-light tracking-tight text-fg sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-base leading-relaxed text-fg-muted",
				children: lede
			})
		]
	});
}
//#endregion
export { PageHeader as t };
