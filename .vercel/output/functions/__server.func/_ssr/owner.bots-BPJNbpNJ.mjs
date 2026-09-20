import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as parseCommands, I as slugify, M as serializeCommands, x as lines } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as Button, c as useDesk, h as ownerSaveBot, l as ownerDeleteBot } from "./router-CkGAamYH.mjs";
import { i as Toggle, n as SeoFields, r as TextField, t as AreaField } from "./fields-DQmYjKcG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.bots-BPJNbpNJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	slug: "",
	name: "",
	tagline: "",
	description: "",
	kind: "chat",
	channel: "Discord",
	welcome: "",
	persona: "",
	starters: [],
	commands: [],
	productSlug: "",
	published: true,
	sortOrder: 0,
	seoTitle: "",
	seoDescription: ""
});
function Page() {
	const { site } = useDesk();
	const router = useRouter();
	const [current, setCurrent] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save() {
		if (!current?.name) return;
		const row = {
			...current,
			slug: current.slug || slugify(current.name)
		};
		setBusy(true);
		const res = await ownerSaveBot({ data: row });
		setBusy(false);
		if (!res.ok) return toast.error(res.error);
		toast.success("Bot demo saved. Live on /lab.");
		setCurrent(null);
		await router.invalidate();
	}
	async function remove(slug) {
		if (!confirm("Remove this demo from the lab?")) return;
		const res = await ownerDeleteBot({ data: { slug } });
		if (!res.ok) return toast.error(res.error);
		toast.success("Deleted.");
		setCurrent(null);
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
				children: "Bots"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-light tracking-tight",
				children: "Live demos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-fg-muted",
				children: "Kind “economy” runs a credits ledger. Kind “casino” runs slots, flip, dice, roulette, and blackjack. Kind “chat” is a persona. Visitors use them at /lab."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => setCurrent(empty()),
			children: "New bot"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border border-y border-border",
			children: site.bots.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCurrent({ ...b }),
				className: "flex w-full justify-between py-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: b.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-fg-subtle",
					children: b.published ? b.channel : "hidden"
				})]
			}) }, b.slug))
		}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Name",
					value: current.name,
					onChange: (v) => setCurrent({
						...current,
						name: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Slug",
					value: current.slug,
					onChange: (v) => setCurrent({
						...current,
						slug: slugify(v)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Channel (Discord / Telegram / Web)",
					value: current.channel,
					onChange: (v) => setCurrent({
						...current,
						channel: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Kind (chat, economy, or casino)",
					value: current.kind,
					onChange: (v) => setCurrent({
						...current,
						kind: v === "economy" || v === "casino" ? v : "chat"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Linked store slug",
					value: current.productSlug,
					onChange: (v) => setCurrent({
						...current,
						productSlug: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Sort",
					type: "number",
					value: current.sortOrder,
					onChange: (v) => setCurrent({
						...current,
						sortOrder: Number(v)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Tagline",
					value: current.tagline,
					onChange: (v) => setCurrent({
						...current,
						tagline: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Description",
					value: current.description,
					onChange: (v) => setCurrent({
						...current,
						description: v
					}),
					rows: 4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Welcome message",
					value: current.welcome,
					onChange: (v) => setCurrent({
						...current,
						welcome: v
					}),
					rows: 3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Persona / system prompt",
					value: current.persona,
					onChange: (v) => setCurrent({
						...current,
						persona: v
					}),
					rows: 8,
					hint: "This is the bot’s brain for free-text. Be specific. Slash commands in economy mode run without the model."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Starter chips",
					value: current.starters.join("\n"),
					onChange: (v) => setCurrent({
						...current,
						starters: lines(v)
					}),
					hint: "One per line. Shown as buttons in the demo.",
					rows: 4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Command list",
					value: serializeCommands(current.commands),
					onChange: (v) => setCurrent({
						...current,
						commands: parseCommands(v)
					}),
					hint: "One per line: /work | Odd job, 8s cooldown",
					rows: 6
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "Published",
					checked: current.published,
					onChange: (v) => setCurrent({
						...current,
						published: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoFields, {
					title: current.seoTitle,
					description: current.seoDescription,
					onTitle: (v) => setCurrent({
						...current,
						seoTitle: v
					}),
					onDescription: (v) => setCurrent({
						...current,
						seoDescription: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Saving…" : "Save"
						}),
						site.bots.some((b) => b.slug === current.slug) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "danger",
							onClick: () => void remove(current.slug),
							children: "Delete"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setCurrent(null),
							children: "Cancel"
						})
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-fg-muted",
			children: "Select a bot or create one. Published demos appear on /lab immediately."
		})]
	})] });
}
//#endregion
export { Page as component };
