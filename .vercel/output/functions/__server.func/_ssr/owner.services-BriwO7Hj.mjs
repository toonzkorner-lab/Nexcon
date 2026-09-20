import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as slugify, x as lines } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as Button, T as ownerSaveService, c as useDesk, m as ownerDeleteService } from "./router-CkGAamYH.mjs";
import { i as Toggle, n as SeoFields, r as TextField, t as AreaField } from "./fields-DQmYjKcG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.services-BriwO7Hj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	slug: "",
	name: "",
	group: "Build",
	summary: "",
	description: "",
	price: 0,
	billing: "one-off",
	hoursNote: "",
	features: [],
	deliverables: [],
	timeline: "",
	sortOrder: 0,
	published: true,
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
			slug: current.slug || slugify(current.name),
			features: current.features,
			deliverables: current.deliverables
		};
		setBusy(true);
		const res = await ownerSaveService({ data: row });
		setBusy(false);
		if (!res.ok) return toast.error(res.error);
		toast.success("Service saved. Live on the public catalog.");
		setCurrent(null);
		await router.invalidate();
	}
	async function remove(slug) {
		if (!confirm("Delete this service from the public catalog?")) return;
		const res = await ownerDeleteService({ data: { slug } });
		if (!res.ok) return toast.error(res.error);
		toast.success("Deleted.");
		setCurrent(null);
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
			children: "Services"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-light tracking-tight",
			children: "Catalog."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => setCurrent(empty()),
			children: "New service"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border border-y border-border",
			children: site.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCurrent({ ...s }),
				className: "flex w-full items-baseline justify-between py-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: s.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-fg-subtle",
					children: s.published ? s.group : "hidden"
				})]
			}) }, s.slug))
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
					label: "Group (Build / Automate / Host / Amplify)",
					value: current.group,
					onChange: (v) => setCurrent({
						...current,
						group: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Price USD",
					type: "number",
					value: current.price,
					onChange: (v) => setCurrent({
						...current,
						price: Number(v)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Billing",
					value: current.billing,
					onChange: (v) => setCurrent({
						...current,
						billing: v === "monthly" ? "monthly" : "one-off"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Hours note",
					value: current.hoursNote ?? "",
					onChange: (v) => setCurrent({
						...current,
						hoursNote: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Timeline",
					value: current.timeline,
					onChange: (v) => setCurrent({
						...current,
						timeline: v
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Summary",
					value: current.summary,
					onChange: (v) => setCurrent({
						...current,
						summary: v
					}),
					rows: 3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Description",
					value: current.description,
					onChange: (v) => setCurrent({
						...current,
						description: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Features",
					value: current.features.join("\n"),
					onChange: (v) => setCurrent({
						...current,
						features: lines(v)
					}),
					hint: "One per line."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Deliverables",
					value: current.deliverables.join("\n"),
					onChange: (v) => setCurrent({
						...current,
						deliverables: lines(v)
					}),
					hint: "One per line."
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
						current.slug && site.services.some((s) => s.slug === current.slug) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
			children: "Select a service or create one. Prices and copy go live immediately."
		})]
	})] });
}
//#endregion
export { Page as component };
