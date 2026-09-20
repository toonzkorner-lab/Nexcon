import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as PAGE_COPY, M as Input, P as Button, V as useSite, j as submitReview } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { c as organization, d as reviewNode, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
import { t as Label } from "./label-DE48S6Om.mjs";
import { t as Textarea } from "./textarea-qWk3hj2G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transmissions-1ajG31VU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TransmissionsPage() {
	const { reviews, settings } = useSite();
	const router = useRouter();
	const [rating, setRating] = (0, import_react.useState)(5);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const name = String(fd.get("name") ?? "").trim();
		const role = String(fd.get("role") ?? "").trim();
		const company = String(fd.get("company") ?? "").trim();
		const quote = String(fd.get("quote") ?? "").trim();
		if (!name || !quote) {
			toast.error("Name and a note are required.");
			return;
		}
		setBusy(true);
		try {
			await submitReview({ data: {
				name,
				role: role || "Collaborator",
				company: company || "—",
				quote,
				rating
			} });
			toast.success("Received. It goes live after the desk approves it.");
			e.currentTarget.reset();
			setRating(5);
			await router.invalidate();
		} catch {
			toast.error("Could not post the review.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([organization(settings), {
			"@type": "CollectionPage",
			name: PAGE_COPY.transmissions.title,
			description: PAGE_COPY.transmissions.description,
			review: reviews.map(reviewNode)
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Transmissions",
			title: "What it was like to ship with us.",
			lede: "If we built something together, leave the unvarnished version. Stars are optional; sentences are not."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[0.9fr_1.1fr] sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void onSubmit(e),
				className: "h-fit space-y-4 rounded-[var(--radius-xl)] bg-bg-elevated p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Leave a review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rating" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRating(n),
							className: cn("size-11 rounded-[var(--radius-sm)] font-mono text-sm", n <= rating ? "bg-accent text-accent-fg" : "text-fg-muted shadow-[var(--shadow-border)]"),
							"aria-label": `${n} star${n === 1 ? "" : "s"}`,
							children: n
						}, n))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						name: "name",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "role",
							children: "Role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "role",
							name: "role"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "company",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "company",
							name: "company"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "quote",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "quote",
						name: "quote",
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Sending…" : "Submit for review"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
				children: [
					"All reviews (",
					reviews.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-6",
				children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-border pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-fg-subtle",
							children: [
								r.rating,
								"/5 · ",
								r.date
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-base leading-relaxed",
							children: [
								"“",
								r.quote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-fg-muted",
							children: [
								r.name,
								" · ",
								r.role,
								", ",
								r.company
							]
						})
					]
				}, r.id))
			})] })]
		})
	] });
}
//#endregion
export { TransmissionsPage as component };
