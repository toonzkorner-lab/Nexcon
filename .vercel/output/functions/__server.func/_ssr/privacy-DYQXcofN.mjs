import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-DYQXcofN.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Placeholder privacy policy — honest about what the site collects.
* OWNER: replace this with your real policy text before launch.
*/
function PrivacyPage() {
	const { settings } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Privacy",
		title: "What we collect, and why.",
		lede: "Short version: only what you send us, and only to do the work."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 pb-20 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
			label: "Home",
			to: "/"
		}, { label: "Privacy" }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 space-y-6 text-base leading-relaxed text-fg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Information you send us"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "Briefs, contact messages, orders, and reviews you submit through this site are stored so the studio can respond and fulfill. That means your name, email, and whatever you write in the form — nothing else."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "What we do not do"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "We do not sell personal information, run third-party ad trackers, or share your details with anyone except the services required to operate the site (hosting, email delivery)."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Accounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "If you create an account, we store your email and a securely hashed credential. Session cookies keep you signed in; they are not used for advertising."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Your rights"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2",
					children: [
						"Write to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${settings.email}`,
							className: "text-fg hover:underline",
							children: settings.email
						}),
						" ",
						"to see, correct, or delete the information we hold about you."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg-subtle",
					children: "Last updated: September 2026."
				})
			]
		})]
	})] });
}
//#endregion
export { PrivacyPage as component };
