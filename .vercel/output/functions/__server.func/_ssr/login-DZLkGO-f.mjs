import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GROK_PROVIDERS } from "./db-CgZiGDRe.mjs";
import { r as signIn, t as authClient } from "./client-DkZ_AVId.mjs";
import { B as Mark, M as Input, P as Button } from "./router-CkGAamYH.mjs";
import { t as Label } from "./label-DE48S6Om.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DZLkGO-f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name.trim() || email.split("@")[0] || "Owner"
				});
				if (err) throw new Error(err.message ?? "Could not create the account.");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password
				});
				if (err) throw new Error(err.message ?? "Could not sign in.");
			}
			await authClient.getSession();
			navigate({ to: "/owner" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tracking-tight",
						children: "N3xUs"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Owner desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-light tracking-tight",
					children: mode === "in" ? "Sign in to the desk." : "Create the first owner."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: "The first account becomes owner. After that, only owners can open this desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 space-y-4",
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								autoComplete: "name"
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								autoComplete: "email"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								autoComplete: mode === "up" ? "new-password" : "current-password"
							})] }),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: busy,
								children: busy ? "Working…" : mode === "in" ? "Sign in" : "Create owner account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-4 text-sm text-fg-muted hover:text-fg",
						onClick: () => {
							setMode((m) => m === "in" ? "up" : "in");
							setError(null);
						},
						children: mode === "in" ? "Need the first account? Create it." : "Already have an account? Sign in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
							children: "Or continue with"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-col gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void signIn(p.providerId, { callbackURL: "/owner" }),
								className: "h-11 rounded-[var(--radius-md)] text-sm text-fg shadow-[var(--shadow-border)] transition-[box-shadow] hover:shadow-[var(--shadow-border-hover)]",
								children: ["Continue with ", p.label]
							}, p.providerId))
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-10 inline-flex h-11 items-center text-sm text-fg-muted hover:text-fg",
					children: "Back to the studio"
				})
			]
		})
	});
}
//#endregion
export { Login as component };
