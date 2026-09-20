import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as slugify, N as serializeMetrics, w as parseMetrics, x as lines } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ownerSaveProject, P as Button, c as useDesk, f as ownerDeleteProject } from "./router-CkGAamYH.mjs";
import { i as Toggle, n as SeoFields, r as TextField, t as AreaField } from "./fields-DQmYjKcG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.work-CvoHFd4a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	slug: "",
	title: "",
	client: "",
	kind: "Client",
	year: String((/* @__PURE__ */ new Date()).getFullYear()),
	duration: "",
	role: "",
	tags: [],
	stack: [],
	summary: "",
	problem: "",
	approach: "",
	outcome: "",
	metrics: [],
	image: "/images/hero-studio.jpg",
	imageAlt: "",
	featured: false,
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
		if (!current?.title) return;
		const row = {
			...current,
			slug: current.slug || slugify(current.title)
		};
		setBusy(true);
		const res = await ownerSaveProject({ data: row });
		setBusy(false);
		if (!res.ok) return toast.error(res.error);
		toast.success("Project saved.");
		setCurrent(null);
		await router.invalidate();
	}
	async function remove(slug) {
		if (!confirm("Delete this project?")) return;
		const res = await ownerDeleteProject({ data: { slug } });
		if (!res.ok) return toast.error(res.error);
		toast.success("Deleted.");
		setCurrent(null);
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
			children: "Work"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-light tracking-tight",
			children: "Case studies."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => setCurrent(empty()),
			children: "New project"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border border-y border-border",
			children: site.projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCurrent({ ...p }),
				className: "flex w-full justify-between py-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: p.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-fg-subtle",
					children: p.year
				})]
			}) }, p.slug))
		}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Title",
					value: current.title,
					onChange: (v) => setCurrent({
						...current,
						title: v
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
					label: "Client",
					value: current.client,
					onChange: (v) => setCurrent({
						...current,
						client: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Kind (Client / Studio)",
					value: current.kind,
					onChange: (v) => setCurrent({
						...current,
						kind: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Year",
						value: current.year,
						onChange: (v) => setCurrent({
							...current,
							year: v
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Duration",
						value: current.duration,
						onChange: (v) => setCurrent({
							...current,
							duration: v
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Role",
					value: current.role,
					onChange: (v) => setCurrent({
						...current,
						role: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Image path or URL",
					value: current.image,
					onChange: (v) => setCurrent({
						...current,
						image: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Image alt text",
					value: current.imageAlt,
					onChange: (v) => setCurrent({
						...current,
						imageAlt: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Tags",
					value: current.tags.join(", "),
					onChange: (v) => setCurrent({
						...current,
						tags: lines(v.replaceAll(",", "\n"))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Stack",
					value: current.stack.join(", "),
					onChange: (v) => setCurrent({
						...current,
						stack: lines(v.replaceAll(",", "\n"))
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
					label: "Problem",
					value: current.problem,
					onChange: (v) => setCurrent({
						...current,
						problem: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Approach",
					value: current.approach,
					onChange: (v) => setCurrent({
						...current,
						approach: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Outcome",
					value: current.outcome,
					onChange: (v) => setCurrent({
						...current,
						outcome: v
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
					label: "Metrics",
					value: serializeMetrics(current.metrics),
					onChange: (v) => setCurrent({
						...current,
						metrics: parseMetrics(v)
					}),
					hint: "One per line: 6w | Brief to launch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
					label: "Featured on home",
					checked: current.featured,
					onChange: (v) => setCurrent({
						...current,
						featured: v
					})
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
						site.projects.some((p) => p.slug === current.slug) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
			children: "Select a case study. Image can be /images/… or any https URL."
		})]
	})] });
}
//#endregion
export { Page as component };
