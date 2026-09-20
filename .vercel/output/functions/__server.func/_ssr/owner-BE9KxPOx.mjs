import { b as Link, f as useRouterState, h as Outlet, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
import { B as Mark, L as RedirectToSignIn, R as UserButton, s as Route$37, z as useCurrentUserState } from "./router-CkGAamYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner-BE9KxPOx.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		to: "/owner",
		label: "Overview",
		exact: true
	},
	{
		to: "/owner/inbox",
		label: "Inbox"
	},
	{
		to: "/owner/services",
		label: "Services"
	},
	{
		to: "/owner/work",
		label: "Work"
	},
	{
		to: "/owner/store",
		label: "Store"
	},
	{
		to: "/owner/bots",
		label: "Bots"
	},
	{
		to: "/owner/journal",
		label: "Journal"
	},
	{
		to: "/owner/reviews",
		label: "Reviews"
	},
	{
		to: "/owner/seo",
		label: "SEO"
	},
	{
		to: "/owner/site",
		label: "Site"
	},
	{
		to: "/owner/runbook",
		label: "Runbook"
	}
];
function DeskShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-56 shrink-0 border-r border-border md:flex md:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex h-14 items-center gap-2 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Desk"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-0.5 px-2 py-2",
						children: LINKS.map((item) => {
							const active = "exact" in item && item.exact ? pathname === item.to : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("flex h-10 items-center rounded-[var(--radius-sm)] px-3 text-sm", active ? "bg-bg-subtle text-fg" : "text-fg-muted hover:text-fg"),
								children: item.label
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border px-3 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex h-14 items-center gap-3 border-b border-border px-4 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Desk"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto border-b border-border px-3 py-2 md:hidden",
						children: LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("h-10 shrink-0 rounded-full px-3 text-sm leading-10", pathname === item.to || !("exact" in item && item.exact) && pathname.startsWith(item.to) ? "bg-accent text-accent-fg" : "text-fg-muted"),
							children: item.label
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 px-4 py-8 sm:px-8",
						children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})
				]
			})]
		})
	});
}
function OwnerLayout() {
	const data = Route$37.useLoaderData();
	const { user, isPending } = useCurrentUserState();
	if (data.denied) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-6 py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
				children: "Desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-light",
				children: "This desk already has an owner."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-fg-muted",
				children: [data.error, " Sign in with an owner account, or ask them to add you."]
			})
		]
	});
	if (!isPending && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
function useDesk() {
	const data = Route$37.useLoaderData();
	if (data.denied) throw new Error("Not an owner");
	return data.desk;
}
//#endregion
export { OwnerLayout as component, useDesk };
