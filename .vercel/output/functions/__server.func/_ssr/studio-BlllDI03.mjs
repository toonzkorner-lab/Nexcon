import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Button, V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { p as studioGraph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BlllDI03.js
var import_jsx_runtime = require_jsx_runtime();
function StudioPage() {
	const site = useSite();
	const { settings, principles, pipeline, faqs, capabilities, engagements } = site;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: studioGraph(site) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Studio",
			title: "An architectural firm for the internet — without the pitch deck.",
			lede: `${settings.studioName} exists to close the gap between how a thing looks and whether it stays up. Founded and run by ${settings.founderName}.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
					label: "Home",
					to: "/"
				}, { label: "Studio" }] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 max-w-xl text-sm text-fg-muted",
					children: [
						"The person is on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "text-fg hover:underline",
							children: "About"
						}),
						". This page is how the desk runs."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-10 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/studio-desk.jpg",
						alt: `${settings.studioName} desk — sketches, laptop, and lamp`,
						width: 1280,
						height: 800,
						loading: "lazy",
						decoding: "async",
						className: "aspect-[16/10] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "self-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
								children: "Founder"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-3xl font-light",
								children: settings.founderName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg-muted",
								children: settings.founderTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-base leading-relaxed text-fg-muted",
								children: settings.founderBio
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "Genesis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-base leading-relaxed text-fg-muted",
						children: settings.genesis
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-16 grid gap-8 sm:grid-cols-3",
					children: principles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-fg-subtle",
							children: p.num
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-lg",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg-muted",
							children: p.body
						})
					] }, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "How we engage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6 lg:grid-cols-3",
						children: engagements.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
									children: e.rangeLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-xl font-light",
									children: e.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-fg-muted",
									children: e.body
								})
							]
						}, e.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "Pipeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
						children: pipeline.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-fg-subtle",
								children: p.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-fg-muted",
								children: p.body
							})
						] }, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "In scope / not"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 divide-y divide-border border-y border-border",
						children: capabilities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: c.area
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
								children: c.inScope ? "In" : "Out"
							})]
						}, c.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "Stack we actually use"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 flex flex-wrap gap-2",
						children: settings.stack.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-full px-3 py-1.5 font-mono text-xs text-fg-muted shadow-[var(--shadow-border)]",
							children: s
						}, s))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "FAQ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 divide-y divide-border border-y border-border",
						children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "group py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer list-none text-base font-medium",
								children: f.question
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted",
								children: f.answer
							})]
						}, f.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							children: "Open a brief"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/work",
							children: "See the work"
						})
					})]
				})
			]
		})
	] });
}
//#endregion
export { StudioPage as component };
