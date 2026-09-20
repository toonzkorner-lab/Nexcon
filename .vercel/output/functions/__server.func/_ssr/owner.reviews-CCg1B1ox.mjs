import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as Button, c as useDesk, p as ownerDeleteReview, w as ownerSaveReview } from "./router-CkGAamYH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.reviews-CCg1B1ox.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { site } = useDesk();
	const router = useRouter();
	async function publish(id, published) {
		const res = await ownerSaveReview({ data: {
			id,
			published
		} });
		if (!res.ok) return toast.error(res.error);
		toast.success(published ? "Published." : "Hidden.");
		await router.invalidate();
	}
	async function remove(id) {
		if (!confirm("Delete this review?")) return;
		const res = await ownerDeleteReview({ data: { id } });
		if (!res.ok) return toast.error(res.error);
		toast.success("Deleted.");
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
			children: "Reviews"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-3xl font-light tracking-tight",
			children: "Transmissions."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-fg-muted",
			children: "Public submissions land unpublished. Approve to put them on the site."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-4",
			children: site.reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg-muted",
				children: "None yet."
			}) : site.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed",
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
							r.company,
							" · ",
							r.rating,
							"/5"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-[11px] text-fg-subtle",
						children: [
							r.published ? "Live" : "Pending",
							" · ",
							r.date
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: r.published ? "secondary" : "primary",
							onClick: () => void publish(r.id, !r.published),
							children: r.published ? "Unpublish" : "Publish"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "danger",
							onClick: () => void remove(r.id),
							children: "Delete"
						})]
					})
				]
			}, r.id))
		})
	] });
}
//#endregion
export { Page as component };
