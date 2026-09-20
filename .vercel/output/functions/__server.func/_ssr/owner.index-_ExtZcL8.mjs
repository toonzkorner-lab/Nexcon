import { C as useRouter, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useDesk } from "./router-CkGAamYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.index-_ExtZcL8.js
var import_jsx_runtime = require_jsx_runtime();
function Overview() {
	const desk = useDesk();
	useRouter();
	const { site, inbox } = desk;
	const pendingReviews = site.reviews.filter((r) => !r.published).length;
	const newBriefs = inbox.briefs.filter((b) => b.status === "new").length;
	const newMsgs = inbox.messages.filter((m) => m.status === "new").length;
	const queued = inbox.orders.filter((o) => o.status === "queued").length;
	const cards = [
		{
			n: newBriefs,
			label: "New briefs",
			to: "/owner/inbox"
		},
		{
			n: newMsgs,
			label: "New messages",
			to: "/owner/inbox"
		},
		{
			n: queued,
			label: "Orders to fulfill",
			to: "/owner/inbox"
		},
		{
			n: pendingReviews,
			label: "Reviews to publish",
			to: "/owner/reviews"
		},
		{
			n: site.services.length,
			label: "Services",
			to: "/owner/services"
		},
		{
			n: site.projects.length,
			label: "Projects",
			to: "/owner/work"
		},
		{
			n: site.products.length,
			label: "Store items",
			to: "/owner/store"
		},
		{
			n: site.bots.length,
			label: "Bot demos",
			to: "/owner/bots"
		},
		{
			n: site.posts.length,
			label: "Journal posts",
			to: "/owner/journal"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
			children: "Overview"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-light tracking-tight",
			children: "The desk."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-fg-muted",
			children: "Everything the public site shows is editable here. Briefs, tickets, and store orders land in Inbox."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-2 lg:grid-cols-4",
			children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: c.to,
				className: "bg-bg-elevated p-5 hover:bg-bg-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xl tabular-nums",
					children: c.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-fg-muted",
					children: c.label
				})]
			}, c.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Latest briefs"
			}), inbox.briefs.slice(0, 5).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg-muted",
				children: "No briefs yet. They appear when someone finishes Open a brief."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border border-y border-border",
				children: inbox.briefs.slice(0, 5).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: b.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-fg-muted",
						children: [
							b.groups.join(", "),
							" · ",
							b.budget
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-fg-subtle",
						children: b.status
					})]
				}, b.id))
			})]
		})
	] });
}
//#endregion
export { Overview as component };
