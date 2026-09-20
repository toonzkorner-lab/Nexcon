import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Input, P as Button, V as useSite, k as submitMessage } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Label } from "./label-DE48S6Om.mjs";
import { t as Textarea } from "./textarea-qWk3hj2G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-ZN3n0j5_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { settings } = useSite();
	const router = useRouter();
	const [sent, setSent] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const name = String(fd.get("name") ?? "").trim();
		const email = String(fd.get("email") ?? "").trim();
		const topic = String(fd.get("topic") ?? "").trim();
		const body = String(fd.get("body") ?? "").trim();
		if (!name || !email || !body) {
			toast.error("Name, email, and a message are required.");
			return;
		}
		setBusy(true);
		try {
			const row = await submitMessage({ data: {
				name,
				email,
				topic: topic || "General",
				body
			} });
			setSent(row.id);
			toast.success("Message at the desk. We answer within 24 hours on weekdays.");
			e.currentTarget.reset();
			await router.invalidate();
		} catch {
			toast.error("Could not send. Try Discord if it is urgent.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Contact",
		title: "Write, or use the channel you already live in.",
		lede: "Tickets, Discord, Telegram. First response within a day on weekdays — often faster."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[1fr_0.8fr] sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void onSubmit(e),
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						name: "name",
						required: true,
						autoComplete: "name"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						name: "email",
						type: "email",
						required: true,
						autoComplete: "email"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "topic",
					children: "Topic"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "topic",
					name: "topic",
					placeholder: "Site, bot, hosting, other"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "body",
					children: "Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "body",
					name: "body",
					required: true,
					placeholder: "What has to be true in 90 days?"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Sending…" : "Send message"
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-signal",
					children: [
						"Queued as ",
						sent,
						"."
					]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
					children: "Direct channels"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: settings.discordUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-fg text-fg-muted",
							children: "Discord — live room"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: settings.telegramUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:text-fg text-fg-muted",
							children: "Telegram"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${settings.email}`,
							className: "hover:text-fg text-fg-muted",
							children: settings.email
						}) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm leading-relaxed text-fg-muted",
					children: "Prefer a scoped project? Use Open a brief — it is a better first artifact than an empty inbox."
				})
			]
		})]
	})] });
}
//#endregion
export { ContactPage as component };
