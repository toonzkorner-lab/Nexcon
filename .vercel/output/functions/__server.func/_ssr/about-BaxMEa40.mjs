import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as STACK_NOTES, p as formatUsd } from "./db-CgZiGDRe.mjs";
import { P as Button, V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { n as aboutGraph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BaxMEa40.js
var import_jsx_runtime = require_jsx_runtime();
var BRIEF = [
	{
		n: "01",
		t: "What",
		d: "Build, Automate, Host, Amplify — pick the lanes."
	},
	{
		n: "02",
		t: "Budget",
		d: "Under $500, $500–2k, $2k–8k, $8k+, or not sure."
	},
	{
		n: "03",
		t: "Timing",
		d: "ASAP, this month, this quarter, or exploring."
	},
	{
		n: "04",
		t: "Notes",
		d: "A paragraph. URL, Discord, what is broken, what “done” means."
	}
];
function AboutPage() {
	const site = useSite();
	const { settings, principles, engagements, projects, services } = site;
	const genesis = settings.genesis.split(/\n\n+/).filter(Boolean);
	const featured = projects.filter((p) => p.featured).slice(0, 3);
	const catalog = services.filter((s) => [
		"web-development",
		"web-design",
		"discord-bots",
		"premium-managed-cloud-hosting"
	].includes(s.slug));
	const facts = [
		{
			k: "Based",
			v: [settings.city || "South Texas", settings.region].filter(Boolean).join(", ")
		},
		{
			k: "Desk",
			v: `${settings.deskDays} ${settings.deskHours}`
		},
		{
			k: "Zone",
			v: settings.zone
		},
		{
			k: "First reply",
			v: settings.sla
		}
	];
	const stackNotes = settings.stack.map((name) => ({
		name,
		use: STACK_NOTES.find((s) => s.name === name)?.use ?? "In production here"
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: aboutGraph(site) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "About",
			title: "One founder. The whole loop.",
			lede: `${settings.founderName} runs ${settings.studioName} from ${settings.city || "South Texas"}: type, React, Postgres, Discord.js, deploy. Catalog from ${formatUsd(99)} bots to ${formatUsd(1250)} web development.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [{
					label: "Home",
					to: "/"
				}, { label: "About" }] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-10 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/studio-desk.jpg",
						alt: `${settings.founderName} at the ${settings.studioName} desk`,
						width: 1280,
						height: 800,
						loading: "lazy",
						decoding: "async",
						className: "aspect-[16/10] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "self-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
								children: "Founder"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-3xl font-light tracking-tight",
								children: settings.founderName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg-muted",
								children: settings.founderTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-base leading-relaxed text-fg-muted",
								children: settings.founderBio
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-6 space-y-2 text-sm text-fg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${settings.email}`,
									className: "hover:text-fg",
									children: settings.email
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: settings.discordUrl,
										className: "hover:text-fg",
										target: "_blank",
										rel: "noreferrer",
										children: "Discord"
									}),
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: settings.telegramUrl,
										className: "hover:text-fg",
										target: "_blank",
										rel: "noreferrer",
										children: "Telegram"
									})
								] })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
							children: "Genesis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-light tracking-tight",
							children: "Why the studio exists."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 max-w-2xl space-y-4",
							children: genesis.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base leading-relaxed text-fg-muted",
								children: p
							}, p.slice(0, 24)))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4",
					children: facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-bg px-5 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
							children: f.k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg",
							children: f.v
						})]
					}, f.k))
				}),
				featured.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-light tracking-tight",
							children: "On the record."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm text-fg-muted",
							children: "Named work, not a logo wall. Duration and stack are on each case."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 divide-y divide-border border-y border-border",
							children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/work/$slug",
								params: { slug: p.slug },
								className: "flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-fg-subtle",
									children: [
										p.year,
										" · ",
										p.duration,
										" · ",
										p.stack.slice(0, 3).join(" · ")
									]
								})]
							}) }, p.slug))
						})
					]
				}) : null,
				catalog.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-light tracking-tight",
							children: "Catalog floors."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm text-fg-muted",
							children: "Starting prices for a bounded job. Auth, migrations, or a second language are scoped on top."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 divide-y divide-border border-y border-border",
							children: catalog.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/services/$slug",
								params: { slug: s.slug },
								className: "flex items-baseline justify-between gap-4 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] tabular-nums text-fg-subtle",
									children: formatUsd(s.price, { monthly: s.billing === "monthly" })
								})]
							}) }, s.slug))
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "How we decide."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-10 sm:grid-cols-3",
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
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "A brief is four questions."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: BRIEF.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-fg-subtle",
								children: b.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg",
								children: b.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-fg-muted",
								children: b.d
							})
						] }, b.n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "How a job is billed."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6 lg:grid-cols-3",
						children: engagements.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
									children: e.rangeLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 text-xl font-light",
									children: e.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-fg-muted",
									children: e.body
								}),
								e.includes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-1.5",
									children: e.includes.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "font-mono text-[11px] text-fg-subtle",
										children: i
									}, i))
								}) : null
							]
						}, e.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-light tracking-tight",
						children: "Stack we actually use"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 divide-y divide-border border-y border-border",
						children: stackNotes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm",
								children: s.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg-muted",
								children: s.use
							})]
						}, s.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-12 max-w-xl text-sm leading-relaxed text-fg-muted",
					children: [
						"Pipeline, in-scope work, and FAQ live on",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/studio",
							className: "text-fg hover:underline",
							children: "Studio"
						}),
						". This page is the person and the numbers."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap gap-3",
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
							to: "/contact",
							children: "Contact"
						})
					})]
				})
			]
		})
	] });
}
//#endregion
export { AboutPage as component };
