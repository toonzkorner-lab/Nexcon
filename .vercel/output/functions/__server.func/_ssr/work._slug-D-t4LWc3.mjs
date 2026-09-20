import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { V as useSite, n as Route$1 } from "./router-CkGAamYH.mjs";
import { t as Badge } from "./badge-jponBted.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { a as creativeWorkNode, c as organization, i as breadcrumbs, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work._slug-D-t4LWc3.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectPage() {
	const project = Route$1.useLoaderData();
	const { projects, settings } = useSite();
	const i = projects.findIndex((p) => p.slug === project.slug);
	const prev = projects[i - 1];
	const next = projects[i + 1];
	const related = projects.filter((p) => p.slug !== project.slug && p.tags.some((t) => project.tags.includes(t))).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
				organization(settings),
				creativeWorkNode(project, settings),
				breadcrumbs(settings, [
					{
						name: "Home",
						path: "/"
					},
					{
						name: "Work",
						path: "/work"
					},
					{
						name: project.title,
						path: `/work/${project.slug}`
					}
				])
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [
				{
					label: "Home",
					to: "/"
				},
				{
					label: "Work",
					to: "/work"
				},
				{ label: project.title }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/work",
				className: "mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Work"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: project.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t }, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-light tracking-tight sm:text-5xl",
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-fg-muted",
						children: project.summary
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-6 self-end text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
							children: "Client"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: project.client
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
							children: "Year"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: project.year
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
							children: "Role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: project.role
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
							children: "Duration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: project.duration
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-[11px] uppercase tracking-wider text-fg-subtle",
								children: "Stack"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: project.stack.join(", ")
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: project.image,
				alt: project.imageAlt || `${project.title} — ${project.client}`,
				width: 1600,
				height: 900,
				decoding: "async",
				className: "mt-12 aspect-[16/9] w-full rounded-[var(--radius-xl)] object-cover outline outline-1 -outline-offset-1 outline-white/10"
			}),
			project.metrics.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-px overflow-hidden rounded-[var(--radius-xl)] bg-border sm:grid-cols-3",
				children: project.metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-bg-elevated px-5 py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xl tabular-nums",
						children: m.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-fg-muted",
						children: m.label
					})]
				}, m.label))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-16 grid max-w-3xl gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Problem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed text-fg-muted",
						children: project.problem
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Approach"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed text-fg-muted",
						children: project.approach
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Outcome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed text-fg-muted",
						children: project.outcome
					})] })
				]
			}),
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "More work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/work/$slug",
						params: { slug: p.slug },
						className: "flex justify-between gap-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-fg-subtle",
							children: p.year
						})]
					}) }, p.slug))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 flex items-center justify-between gap-4 border-t border-border pt-8",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work/$slug",
					params: { slug: prev.slug },
					className: "text-sm text-fg-muted hover:text-fg",
					children: ["← ", prev.title]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work/$slug",
					params: { slug: next.slug },
					className: "text-sm text-fg-muted hover:text-fg",
					children: [next.title, " →"]
				}) : null]
			})
		]
	});
}
//#endregion
export { ProjectPage as component };
