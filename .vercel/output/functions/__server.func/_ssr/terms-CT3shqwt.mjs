import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-CT3shqwt.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Placeholder terms of service — plain-language working terms.
* OWNER: replace this with your real terms before launch.
*/
function TermsPage() {
	const { settings } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Terms",
		title: "The working agreement.",
		lede: "Plain language. The full contract for a project is always the written brief."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 pb-20 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
			label: "Home",
			to: "/"
		}, { label: "Terms" }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 space-y-6 text-base leading-relaxed text-fg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "Project scope, price, and timeline are agreed in writing before work starts — the brief you open on this site becomes the statement of work. Estimates are not invoices; changes outside the brief are scoped and priced separately."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Digital goods"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "Store purchases grant one production license unless noted otherwise. Templates and themes are delivered as-is; support covers installation questions for 30 days."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Payment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "Project work is billed per the agreed brief — typically a deposit to start and the balance on delivery. Subscriptions (hosting, care plans) renew monthly and can be cancelled any time; service continues to the end of the paid period."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Ownership"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "You own the finished work product on final payment, including source files we wrote for you. The studio retains the right to describe the engagement in its portfolio unless you ask otherwise in writing."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium text-fg",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2",
					children: [
						"Questions about these terms:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${settings.email}`,
							className: "text-fg hover:underline",
							children: settings.email
						}),
						"."
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
export { TermsPage as component };
