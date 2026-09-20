import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as submitOrder, F as cartTotal, I as useCart, M as Input, P as Button } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Label } from "./label-DE48S6Om.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-RlRPyspu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const items = useCart((s) => s.items);
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const clear = useCart((s) => s.clear);
	const router = useRouter();
	const [orderId, setOrderId] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const total = cartTotal(items);
	async function checkout(e) {
		e.preventDefault();
		if (items.length === 0) return;
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("email") ?? "").trim();
		const channel = String(fd.get("channel") ?? "").trim();
		if (!email) {
			toast.error("Email is required so we can fulfill.");
			return;
		}
		setBusy(true);
		try {
			const row = await submitOrder({ data: {
				email,
				channel,
				total,
				items: items.map((i) => ({
					name: i.name,
					qty: i.qty,
					price: i.price
				}))
			} });
			clear();
			setOrderId(row.id);
			toast.success("Order queued for fulfillment.");
			await router.invalidate();
		} catch {
			toast.error("Could not queue the order.");
		} finally {
			setBusy(false);
		}
	}
	if (orderId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-signal",
				children: "Queued"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-4 text-4xl font-light",
				children: ["Order ", orderId]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-fg-muted",
				children: "Digital goods and retainers are fulfilled manually — we will send access, invoices, or a kickoff note to the email you gave. Card charges are not taken here; this is the studio queue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/store",
				className: "mt-8 inline-flex h-11 items-center text-sm text-fg-muted hover:text-fg",
				children: "Back to store"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Cart",
		title: "Review, then transmit.",
		lede: "Services and digital goods. Fulfillment is a human at the desk — not an instant download wall."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[1.2fr_0.8fr] sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-fg-muted",
			children: [
				"Cart is empty.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/store",
					className: "text-fg underline-offset-4 hover:underline",
					children: "Store"
				}),
				" ",
				"or",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/services",
					className: "text-fg underline-offset-4 hover:underline",
					children: "services"
				}),
				"."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border border-y border-border",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: i.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-fg-subtle",
					children: formatUsd(i.price, { monthly: i.billing === "monthly" })
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: `qty-${i.id}`,
							children: "Quantity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `qty-${i.id}`,
							type: "number",
							min: 1,
							value: i.qty,
							onChange: (e) => setQty(i.id, Number(e.target.value)),
							className: "h-11 w-16 rounded-[var(--radius-sm)] bg-transparent px-2 font-mono text-sm shadow-[var(--shadow-border)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-fg-muted hover:text-fg",
							onClick: () => remove(i.id),
							children: "Remove"
						})
					]
				})]
			}, i.id))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void checkout(e),
			className: "h-fit space-y-4 rounded-[var(--radius-xl)] bg-bg-elevated p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
					children: "Transmit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xl tabular-nums",
					children: formatUsd(total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email",
					name: "email",
					type: "email",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "channel",
					children: "Discord or Telegram (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "channel",
					name: "channel"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					disabled: items.length === 0 || busy,
					children: busy ? "Sending…" : "Place order"
				})
			]
		})]
	})] });
}
//#endregion
export { CartPage as component };
