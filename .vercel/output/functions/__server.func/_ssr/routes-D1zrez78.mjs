import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as formatUsd } from "./db-CgZiGDRe.mjs";
import { m as ArrowRight, p as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { P as Button, V as useSite } from "./router-CkGAamYH.mjs";
import { t as Badge } from "./badge-jponBted.mjs";
import { s as homeGraph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1zrez78.js
var import_jsx_runtime = require_jsx_runtime();
var DS = [
	{
		k: "01",
		title: "Design",
		body: "Type, surface, one accent. Interfaces that look like the business — not a theme with extra steps."
	},
	{
		k: "02",
		title: "Development",
		body: "React, Node, Postgres. Bots that remember. APIs with a contract. Code a year from now can still read."
	},
	{
		k: "03",
		title: "Deployment",
		body: "Live, patched, backed up. Hosting for sites and bots so you are not SSH-ing at midnight."
	}
];
function Home() {
	const site = useSite();
	const { settings, services, projects, reviews, pipeline, engagements, bots } = site;
	const featured = projects.filter((p) => p.featured).slice(0, 4);
	const snapshot = services.filter((s) => [
		"web-development",
		"web-design",
		"discord-bots",
		"premium-managed-cloud-hosting"
	].includes(s.slug));
	const stats = [
		{
			value: String(projects.length),
			label: "Public systems",
			hint: "Work on the record"
		},
		{
			value: String(services.length),
			label: "Service lines",
			hint: "Priced in the catalog"
		},
		{
			value: "24h",
			label: "First response",
			hint: settings.sla
		},
		{
			value: "3 D's",
			label: "The loop",
			hint: settings.tagline
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: homeGraph(site) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-fade opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:pt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Studio · ", settings.city || "South Texas"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] font-light tracking-tight",
						children: [
							"Design.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Development.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Deployment."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 max-w-md text-base leading-relaxed text-fg-muted",
						children: [
							settings.studioName,
							" — ",
							settings.founderName,
							", ",
							settings.city || "South Texas",
							". Sites, Discord and Telegram bots, hosting. Catalog from $99 bots to $1,250 web development. One desk for the 3 D’s."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/book",
								children: ["Open a brief", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/work",
								children: "View work"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/hero-studio.jpg",
						alt: "N3xUs Konc3pt'z studio desk at night — dual monitors, concrete, a quiet workspace",
						width: 1600,
						height: 1100,
						fetchPriority: "high",
						decoding: "async",
						className: "aspect-[16/11] h-full w-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg to-transparent px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] tracking-wider text-fg",
							children: "SYS · OPERATIONAL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-signal",
							children: "CORE LIVE"
						})]
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-r border-b border-border px-4 py-6 last:border-r-0 md:border-b-0 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xl tabular-nums text-fg sm:text-3xl",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-fg",
							children: s.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-fg-subtle",
							children: s.hint
						})
					]
				}, s.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "The 3 D’s"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 max-w-xl text-3xl font-light tracking-tight sm:text-4xl",
					children: "One studio, three jobs, no handoff tax."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-3",
					children: DS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-bg-elevated p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-fg-subtle",
								children: d.k
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-2xl font-light",
								children: d.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-fg-muted",
								children: d.body
							})
						]
					}, d.k))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Engagement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-light tracking-tight sm:text-4xl",
					children: "How the work is bought."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border lg:grid-cols-3",
					children: engagements.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-bg p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
								children: e.rangeLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-2xl font-light",
								children: e.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-fg-muted",
								children: e.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-1.5 text-sm text-fg-muted",
								children: e.includes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
							})
						]
					}, e.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-light tracking-tight sm:text-4xl",
					children: "Systems on the record."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work",
					className: "hidden items-center gap-1 text-sm text-fg-muted hover:text-fg sm:inline-flex",
					children: ["All work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-2",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work/$slug",
					params: { slug: p.slug },
					className: "group overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: p.imageAlt || `${p.title} case study`,
						width: 1280,
						height: 800,
						loading: "lazy",
						decoding: "async",
						className: "aspect-[16/10] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
								children: [
									p.kind,
									" · ",
									p.year
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-xl font-light",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-fg-muted",
								children: p.summary
							})
						]
					})]
				}, p.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-light tracking-tight sm:text-4xl",
					children: "A catalog, not a mystery."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/services",
					className: "hidden items-center gap-1 text-sm text-fg-muted hover:text-fg sm:inline-flex",
					children: ["All services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 divide-y divide-border border-y border-border",
				children: (snapshot.length ? snapshot : services.slice(0, 4)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/services/$slug",
					params: { slug: s.slug },
					className: "flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-fg-muted",
						children: s.summary
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm tabular-nums text-fg-muted",
						children: formatUsd(s.price, { monthly: s.billing === "monthly" })
					})]
				}, s.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Pipeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-light tracking-tight sm:text-4xl",
					children: "Four phases. No theatre."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
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
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Lab"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-light tracking-tight sm:text-4xl",
					children: "Bots you can use, not watch."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lab",
					className: "hidden items-center gap-1 text-sm text-fg-muted hover:text-fg sm:inline-flex",
					children: ["All demos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-3",
				children: bots.slice(0, 3).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lab/$slug",
					params: { slug: b.slug },
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
							children: b.channel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-2xl font-light",
							children: b.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg-muted",
							children: b.tagline
						})
					]
				}, b.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Transmissions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-light tracking-tight sm:text-4xl",
					children: "From people who shipped with us."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/transmissions",
					className: "hidden text-sm text-fg-muted hover:text-fg sm:inline",
					children: "All reviews"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-2",
				children: reviews.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "rounded-[var(--radius-xl)] bg-bg-elevated p-6 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base leading-relaxed text-fg",
						children: [
							"“",
							r.quote,
							"”"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-5 text-sm text-fg-muted",
						children: [
							r.name,
							" · ",
							r.role,
							", ",
							r.company
						]
					})]
				}, r.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[var(--radius-2xl)] bg-bg-elevated px-6 py-12 sm:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-lg text-3xl font-light tracking-tight sm:text-4xl",
						children: "Ready when you have a real problem — not a moodboard."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm leading-relaxed text-fg-muted",
						children: "Send a brief. We answer within a day on weekdays, often faster on Discord. If we are the wrong studio, we will say so."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/book",
								children: ["Open a brief ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
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
		})
	] });
}
//#endregion
export { Home as component };
