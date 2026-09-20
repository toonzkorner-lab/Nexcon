import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner.runbook-BCrMdMmF.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
				children: "Runbook"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-light tracking-tight",
				children: "Hostinger KVM, without folklore."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-fg-muted",
				children: "This app is a Node server with Postgres. The live Grok preview uses an in-memory database (it resets on restart). On your KVM2, point it at a real Postgres and it keeps every edit from this desk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "1. Box"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg-muted",
					children: "Ubuntu 24.04 on the KVM2. Install Node 22, Nginx, and PostgreSQL. Issue TLS (Let’s Encrypt) so owner cookies work — they require HTTPS. The PWA also requires HTTPS."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "2. Database"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs leading-relaxed text-fg",
						children: `sudo -u postgres createuser nexus
sudo -u postgres createdb -O nexus nexus
sudo -u postgres psql -c "alter user nexus password 'choose-a-long-secret';"`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg-muted",
						children: "Connection string:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs text-fg",
						children: "postgres://nexus:choose-a-long-secret@127.0.0.1:5432/nexus"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "3. Environment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-fg-muted",
						children: "Set these on the process (systemd EnvironmentFile, not a file committed to git):"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs leading-relaxed text-fg",
						children: `DATABASE_URL=postgres://nexus:…@127.0.0.1:5432/nexus
BETTER_AUTH_URL=https://your-domain.com
BETTER_AUTH_SECRET=a-32-byte-random-string
VITE_AUTH_ENABLED=true
XAI_API_KEY=optional-for-N3xUs-Core`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-fg-muted",
						children: "Email/password is the owner login on a VPS. Google / X only work when this app is deployed through Grok’s broker. On Hostinger, create the owner account at /login once, then keep that password in a vault."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "4. Build and run"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs leading-relaxed text-fg",
						children: `npm ci
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-fg-muted",
						children: [
							"Bind behind Nginx on 443 → 3000 (or whatever port the Node server prints). ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono text-fg",
								children: "npm run build"
							}),
							" applies migrations, so the schema is ready before the first request."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "5. First owner"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg-muted",
					children: "Open https://your-domain.com/login, create the account, then go to /owner. The first signed-in user becomes owner — unless OWNER_EMAIL is set in the environment, in which case only the account whose email matches OWNER_EMAIL (case-insensitive) can claim the desk. Set OWNER_EMAIL on every deploy; without it, anyone who signs up before you do owns the desk. After that, only owners can edit. Use Site to change email, Discord, Telegram, and copy without touching code."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "6. What this desk edits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-1 pl-5 text-sm text-fg-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Services, prices, and deliverables" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Case studies and metrics" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Store products" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Live bot demos (Lab)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Journal posts (drafts until published)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reviews (approve public submissions)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Identity, FAQ, process, capabilities" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Search titles, descriptions, domain, and indexing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Briefs, contact tickets, store orders" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "7. Search"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg-muted",
					children: "Paste a Google Search Console token under SEO on this desk. Sitemap lives at /sitemap.xml, robots at /robots.txt, journal RSS at /rss.xml, and llms.txt for assistants. After DNS points here, submit the sitemap once."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "8. Progressive web app"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg-muted",
					children: "The site installs as N3xUs. Chrome, Edge, and Android offer Install app. iPhone: Share → Add to Home Screen. HTTPS is required. The service worker caches the shell and icons; owner, login, and APIs stay network-only so the desk never serves a stale edit. After a deploy, visitors get a fresh shell on the next load."
				})]
			})
		]
	});
}
//#endregion
export { Page as component };
