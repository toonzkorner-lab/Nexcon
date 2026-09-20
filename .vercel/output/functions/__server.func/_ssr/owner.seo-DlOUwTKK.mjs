import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as ownerSaveSettings, H as PAGE_COPY, P as Button, c as useDesk } from "./router-CkGAamYH.mjs";
import { i as Toggle, r as TextField, t as AreaField } from "./fields-DQmYjKcG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.seo-DlOUwTKK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { site } = useDesk();
	const router = useRouter();
	const [settings, setSettings] = (0, import_react.useState)(site.settings);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const title = settings.seoTitle || PAGE_COPY.home.title;
	const description = settings.seoDescription || PAGE_COPY.home.description;
	async function save() {
		setBusy(true);
		const res = await ownerSaveSettings({ data: settings });
		setBusy(false);
		if (!res.ok) return toast.error(res.error);
		toast.success("Search settings saved. Sitemap and titles update immediately.");
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "SEO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-light tracking-tight",
					children: "How Google reads the studio."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: "Canonical domain, homepage title, location, and verification. Per-page titles live on each service, case study, product, and journal post."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
						children: "Search preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg text-[#8ab4f8]",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-[11px] text-signal",
						children: (settings.siteUrl || "https://n3xuskonc3ptz.com").replace(/^https?:\/\//, "")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-relaxed text-fg-muted",
						children: description
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Canonical site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Public URL",
						value: settings.siteUrl,
						onChange: (v) => setSettings({
							...settings,
							siteUrl: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Allow search engines to index",
						checked: settings.indexable,
						onChange: (v) => setSettings({
							...settings,
							indexable: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-fg-subtle",
						children: [
							"Sitemap: ",
							(settings.siteUrl || "https://n3xuskonc3ptz.com").replace(/\/$/, ""),
							"/sitemap.xml · robots.txt is generated from this flag."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Homepage listing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "SEO title",
						value: settings.seoTitle,
						onChange: (v) => setSettings({
							...settings,
							seoTitle: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
						label: "Meta description",
						value: settings.seoDescription,
						onChange: (v) => setSettings({
							...settings,
							seoDescription: v
						}),
						rows: 3,
						hint: "140–160 characters. This is the sentence under the blue link."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
						label: "Keywords",
						value: settings.seoKeywords,
						onChange: (v) => setSettings({
							...settings,
							seoKeywords: v
						}),
						rows: 2,
						hint: "Comma-separated. Secondary signal — the copy on the pages matters more."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Local & social"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "City / area",
								value: settings.city,
								onChange: (v) => setSettings({
									...settings,
									city: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Region",
								value: settings.region,
								onChange: (v) => setSettings({
									...settings,
									region: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Country",
								value: settings.country,
								onChange: (v) => setSettings({
									...settings,
									country: v
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "X / Twitter handle",
						value: settings.twitterHandle,
						onChange: (v) => setSettings({
							...settings,
							twitterHandle: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Google Search Console verification",
						value: settings.googleVerification,
						onChange: (v) => setSettings({
							...settings,
							googleVerification: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-fg-subtle",
						children: "Paste the content token from Search Console (the string inside google-site-verification), not the whole meta tag."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void save(),
				disabled: busy,
				children: busy ? "Saving…" : "Save SEO"
			})
		]
	});
}
//#endregion
export { Page as component };
