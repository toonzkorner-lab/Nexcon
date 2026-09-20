import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Input, O as submitBrief, P as Button, V as useSite } from "./router-CkGAamYH.mjs";
import { t as PageHeader } from "./page-header-BzC_TJNw.mjs";
import { t as Label } from "./label-DE48S6Om.mjs";
import { t as Textarea } from "./textarea-qWk3hj2G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-Aw8bQXpU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BUDGETS = [
	"Under $500",
	"$500–2k",
	"$2k–8k",
	"$8k+",
	"Not sure"
];
var TIMES = [
	"ASAP",
	"This month",
	"This quarter",
	"Exploring"
];
function BookPage() {
	const { services } = useSite();
	const groups = [...new Set(services.map((s) => s.group))];
	const [step, setStep] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [budget, setBudget] = (0, import_react.useState)("");
	const [timeline, setTimeline] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [id, setId] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const router = useRouter();
	function toggle(g) {
		setPicked((cur) => cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]);
	}
	async function submit() {
		if (!name.trim() || !email.trim()) {
			toast.error("Name and email are required.");
			return;
		}
		setBusy(true);
		try {
			const row = await submitBrief({ data: {
				name: name.trim(),
				email: email.trim(),
				channel: channel.trim(),
				groups: picked,
				budget,
				timeline,
				notes: notes.trim()
			} });
			setId(row.id);
			toast.success("Brief received at the desk.");
			await router.invalidate();
		} catch {
			toast.error("Could not queue the brief. Try again.");
		} finally {
			setBusy(false);
		}
	}
	if (id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-signal",
				children: "Queued"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-light tracking-tight",
				children: "We have the brief."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm leading-relaxed text-fg-muted",
				children: [
					"Reference ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-fg",
						children: id
					}),
					". The desk will reply within a weekday. If it is urgent, ping Discord or Telegram with that ID."
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Brief",
		title: "Four questions. Then we know if we are the right desk.",
		lede: "No calendar theatre. Tell us the job, the money, the clock, and how to reach you."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 pb-20 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] text-fg-subtle",
				children: [
					"Step ",
					step + 1,
					" of 4"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-px bg-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-px bg-accent transition-[width] duration-200 ease-out",
					style: { width: `${(step + 1) / 4 * 100}%` }
				})
			}),
			step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-light",
						children: "What kind of work?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-fg-muted",
						children: "Pick every group that applies."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-2",
						children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggle(g),
							className: cn("h-14 rounded-[var(--radius-md)] text-sm transition-colors", picked.includes(g) ? "bg-accent text-accent-fg" : "text-fg shadow-[var(--shadow-border)]"),
							children: g
						}, g))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-8",
						onClick: () => setStep(1),
						disabled: picked.length === 0,
						children: "Continue"
					})
				]
			}) : null,
			step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-light",
						children: "Budget"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: BUDGETS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setBudget(b),
							className: cn("h-12 rounded-[var(--radius-md)] px-4 text-left text-sm", budget === b ? "bg-accent text-accent-fg" : "shadow-[var(--shadow-border)]"),
							children: b
						}, b))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setStep(0),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setStep(2),
							disabled: !budget,
							children: "Continue"
						})]
					})
				]
			}) : null,
			step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-light",
						children: "When?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: TIMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTimeline(t),
							className: cn("h-12 rounded-[var(--radius-md)] px-4 text-left text-sm", timeline === t ? "bg-accent text-accent-fg" : "shadow-[var(--shadow-border)]"),
							children: t
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setStep(1),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setStep(3),
							disabled: !timeline,
							children: "Continue"
						})]
					})
				]
			}) : null,
			step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-light",
						children: "How do we reach you?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "n",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "n",
						value: name,
						onChange: (e) => setName(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "e",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "e",
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c",
						children: "Discord or Telegram (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c",
						value: channel,
						onChange: (e) => setChannel(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "notes",
						children: "The job, in your words"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "notes",
						value: notes,
						onChange: (e) => setNotes(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setStep(2),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void submit(),
							disabled: busy,
							children: busy ? "Sending…" : "Send brief"
						})]
					})
				]
			}) : null
		]
	})] });
}
//#endregion
export { BookPage as component };
