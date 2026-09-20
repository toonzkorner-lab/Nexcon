import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-qWk3hj2G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-32 w-full rounded-[var(--radius-md)] bg-bg-elevated px-3 py-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-fg-subtle", "transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", "disabled:opacity-40", className),
	...props
}));
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as t };
