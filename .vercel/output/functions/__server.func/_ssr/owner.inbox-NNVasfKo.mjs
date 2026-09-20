import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as ownerSetStatus, P as Button, c as useDesk } from "./router-CkGAamYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.inbox-NNVasfKo.js
var import_jsx_runtime = require_jsx_runtime();
function InboxPage() {
	const { inbox } = useDesk();
	const router = useRouter();
	async function setStatus(table, id, status) {
		const res = await ownerSetStatus({ data: {
			table,
			id,
			status
		} });
		if (!res.ok) {
			toast.error(res.error);
			return;
		}
		toast.success("Updated.");
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
				children: "Inbox"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-light tracking-tight",
				children: "Briefs, tickets, orders."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Briefs"
			}), inbox.briefs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg-muted",
				children: "None yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: inbox.briefs.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base",
								children: b.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-fg-subtle",
								children: b.id
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-fg-muted",
							children: [
								b.email,
								b.channel ? ` · ${b.channel}` : "",
								" · ",
								b.budget,
								" · ",
								b.timeline
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: b.groups.join(" / ")
						}),
						b.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-fg-muted",
							children: b.notes
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								"new",
								"replied",
								"archived"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: b.status === s ? "primary" : "secondary",
								onClick: () => void setStatus("briefs", b.id, s),
								children: s
							}, s))
						})
					]
				}, b.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Messages"
			}), inbox.messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg-muted",
				children: "None yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: inbox.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base",
							children: [
								m.name,
								" · ",
								m.topic
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-fg-muted",
							children: m.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: m.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								"new",
								"replied",
								"archived"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: m.status === s ? "primary" : "secondary",
								onClick: () => void setStatus("messages", m.id, s),
								children: s
							}, s))
						})
					]
				}, m.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Orders"
			}), inbox.orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg-muted",
				children: "None yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: inbox.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base",
								children: o.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm",
								children: formatUsd(o.total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 text-sm text-fg-muted",
							children: o.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								i.qty,
								" × ",
								i.name,
								" — ",
								formatUsd(i.price)
							] }, i.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								"queued",
								"fulfilled",
								"cancelled"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: o.status === s ? "primary" : "secondary",
								onClick: () => void setStatus("orders", o.id, s),
								children: s
							}, s))
						})
					]
				}, o.id))
			})] })
		]
	});
}
//#endregion
export { InboxPage as component };
