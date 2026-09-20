import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
import { M as Input } from "./router-CkGAamYH.mjs";
import { t as Textarea } from "./textarea-qWk3hj2G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fields-DQmYjKcG.js
var import_jsx_runtime = require_jsx_runtime();
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
			children: label
		}), children]
	});
}
function TextField({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type,
			value,
			onChange: (e) => onChange(e.target.value)
		})
	});
}
function AreaField({ label, value, onChange, hint, rows = 5 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value,
			onChange: (e) => onChange(e.target.value),
			rows
		})
	}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-fg-subtle",
		children: hint
	}) : null] });
}
function Toggle({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onChange(!checked),
		className: "flex h-11 items-center justify-between gap-4 rounded-[var(--radius-md)] px-3 text-sm shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-mono text-[11px] uppercase tracking-wider", checked ? "text-signal" : "text-fg-subtle"),
			children: checked ? "On" : "Off"
		})]
	});
}
function SeoFields({ title, description, onTitle, onDescription }) {
	const shownTitle = title.trim() || "Uses the public title";
	const shownDesc = description.trim() || "Uses the summary / excerpt";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 rounded-[var(--radius-lg)] bg-bg-subtle p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
				children: "Search listing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-fg-muted",
				children: "Optional. Leave blank to use the title and summary Google already sees."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				label: "SEO title",
				value: title,
				onChange: onTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
				label: "SEO description",
				value: description,
				onChange: onDescription,
				rows: 3,
				hint: "Aim for 140–160 characters."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] bg-bg px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm text-[#8ab4f8]",
						children: shownTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate font-mono text-[11px] text-signal",
						children: "n3xuskonc3ptz.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-xs text-fg-muted",
						children: shownDesc
					})
				]
			})
		]
	});
}
//#endregion
export { Toggle as i, SeoFields as n, TextField as r, AreaField as t };
