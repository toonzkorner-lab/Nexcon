import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as uid, x as lines } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as ownerSaveSettings, P as Button, _ as ownerSaveEngagements, c as useDesk, g as ownerSaveCapabilities, v as ownerSaveFaqs, x as ownerSavePrinciples, y as ownerSavePipeline } from "./router-CkGAamYH.mjs";
import { r as TextField, t as AreaField } from "./fields-DQmYjKcG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.site-Blt9nhOI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { site } = useDesk();
	const router = useRouter();
	const [settings, setSettings] = (0, import_react.useState)(site.settings);
	const [faqs, setFaqs] = (0, import_react.useState)(site.faqs);
	const [principles, setPrinciples] = (0, import_react.useState)(site.principles);
	const [pipeline, setPipeline] = (0, import_react.useState)(site.pipeline);
	const [engagements, setEngagements] = (0, import_react.useState)(site.engagements);
	const [capabilities, setCapabilities] = (0, import_react.useState)(site.capabilities);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function saveAll() {
		setBusy(true);
		const results = await Promise.all([
			ownerSaveSettings({ data: settings }),
			ownerSaveFaqs({ data: faqs }),
			ownerSavePrinciples({ data: principles }),
			ownerSavePipeline({ data: pipeline }),
			ownerSaveEngagements({ data: engagements }),
			ownerSaveCapabilities({ data: capabilities })
		]);
		setBusy(false);
		const fail = results.find((r) => !r.ok);
		if (fail && !fail.ok) return toast.error(fail.error);
		toast.success("Site copy saved.");
		await router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
					children: "Site"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-light tracking-tight",
					children: "Identity and copy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-fg-muted",
					children: "Name, channels, founder, FAQ, process. This is what the public pages read."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Identity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Studio name",
						value: settings.studioName,
						onChange: (v) => setSettings({
							...settings,
							studioName: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Short name",
						value: settings.studioShort,
						onChange: (v) => setSettings({
							...settings,
							studioShort: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Tagline",
						value: settings.tagline,
						onChange: (v) => setSettings({
							...settings,
							tagline: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Email",
						value: settings.email,
						onChange: (v) => setSettings({
							...settings,
							email: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Discord URL",
						value: settings.discordUrl,
						onChange: (v) => setSettings({
							...settings,
							discordUrl: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Telegram URL",
						value: settings.telegramUrl,
						onChange: (v) => setSettings({
							...settings,
							telegramUrl: v
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Founder"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Name",
						value: settings.founderName,
						onChange: (v) => setSettings({
							...settings,
							founderName: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "Title",
						value: settings.founderTitle,
						onChange: (v) => setSettings({
							...settings,
							founderTitle: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
						label: "Bio",
						value: settings.founderBio,
						onChange: (v) => setSettings({
							...settings,
							founderBio: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
						label: "Genesis / about",
						value: settings.genesis,
						onChange: (v) => setSettings({
							...settings,
							genesis: v
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Desk hours"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Days",
								value: settings.deskDays,
								onChange: (v) => setSettings({
									...settings,
									deskDays: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Hours",
								value: settings.deskHours,
								onChange: (v) => setSettings({
									...settings,
									deskHours: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "SLA",
								value: settings.sla,
								onChange: (v) => setSettings({
									...settings,
									sla: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Timezone",
								value: settings.zone,
								onChange: (v) => setSettings({
									...settings,
									zone: v
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
						label: "Stack",
						value: settings.stack.join("\n"),
						onChange: (v) => setSettings({
							...settings,
							stack: lines(v)
						}),
						hint: "One technology per line.",
						rows: 6
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {
				title: "FAQ",
				rows: faqs,
				onAdd: () => setFaqs([...faqs, {
					id: uid("faq"),
					question: "",
					answer: "",
					sortOrder: faqs.length
				}]),
				render: (row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Question",
							value: row.question,
							onChange: (v) => setFaqs(faqs.map((f, j) => j === i ? {
								...f,
								question: v
							} : f))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
							label: "Answer",
							value: row.answer,
							onChange: (v) => setFaqs(faqs.map((f, j) => j === i ? {
								...f,
								answer: v
							} : f)),
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setFaqs(faqs.filter((_, j) => j !== i)),
							children: "Remove"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {
				title: "Principles",
				rows: principles,
				onAdd: () => setPrinciples([...principles, {
					id: uid("pr"),
					num: String(principles.length + 1).padStart(2, "0"),
					title: "",
					body: "",
					sortOrder: principles.length
				}]),
				render: (row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Title",
							value: row.title,
							onChange: (v) => setPrinciples(principles.map((p, j) => j === i ? {
								...p,
								title: v
							} : p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
							label: "Body",
							value: row.body,
							onChange: (v) => setPrinciples(principles.map((p, j) => j === i ? {
								...p,
								body: v
							} : p)),
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setPrinciples(principles.filter((_, j) => j !== i)),
							children: "Remove"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {
				title: "Pipeline",
				rows: pipeline,
				onAdd: () => setPipeline([...pipeline, {
					id: uid("pl"),
					num: String(pipeline.length + 1).padStart(2, "0"),
					title: "",
					body: "",
					sortOrder: pipeline.length
				}]),
				render: (row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Title",
							value: row.title,
							onChange: (v) => setPipeline(pipeline.map((p, j) => j === i ? {
								...p,
								title: v
							} : p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
							label: "Body",
							value: row.body,
							onChange: (v) => setPipeline(pipeline.map((p, j) => j === i ? {
								...p,
								body: v
							} : p)),
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setPipeline(pipeline.filter((_, j) => j !== i)),
							children: "Remove"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {
				title: "Engagement models",
				rows: engagements,
				onAdd: () => setEngagements([...engagements, {
					id: uid("eg"),
					name: "",
					rangeLabel: "",
					body: "",
					includes: [],
					sortOrder: engagements.length
				}]),
				render: (row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Name",
							value: row.name,
							onChange: (v) => setEngagements(engagements.map((p, j) => j === i ? {
								...p,
								name: v
							} : p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Range",
							value: row.rangeLabel,
							onChange: (v) => setEngagements(engagements.map((p, j) => j === i ? {
								...p,
								rangeLabel: v
							} : p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
							label: "Body",
							value: row.body,
							onChange: (v) => setEngagements(engagements.map((p, j) => j === i ? {
								...p,
								body: v
							} : p)),
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaField, {
							label: "Includes",
							value: row.includes.join("\n"),
							onChange: (v) => setEngagements(engagements.map((p, j) => j === i ? {
								...p,
								includes: lines(v)
							} : p)),
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setEngagements(engagements.filter((_, j) => j !== i)),
							children: "Remove"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, {
				title: "Capabilities",
				rows: capabilities,
				onAdd: () => setCapabilities([...capabilities, {
					id: uid("cap"),
					area: "",
					inScope: true,
					sortOrder: capabilities.length
				}]),
				render: (row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Area",
							value: row.area,
							onChange: (v) => setCapabilities(capabilities.map((p, j) => j === i ? {
								...p,
								area: v
							} : p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setCapabilities(capabilities.map((p, j) => j === i ? {
								...p,
								inScope: !p.inScope
							} : p)),
							children: row.inScope ? "In scope" : "Out of scope"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setCapabilities(capabilities.filter((_, j) => j !== i)),
							children: "Remove"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					disabled: busy,
					onClick: () => void saveAll(),
					children: busy ? "Saving…" : "Save site copy"
				})
			})
		]
	});
}
function Repeat({ title, rows, onAdd, render }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "secondary",
			onClick: onAdd,
			children: "Add"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 space-y-6",
		children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5",
			children: render(row, i)
		}, i))
	})] });
}
//#endregion
export { Page as component };
