export const FOUNDER = {
  name: "Juan Socarras",
  title: "Founder & Principal",
  bio: "Juan Socarras founded N3xUs Konc3pt'z in South Texas and still does the work: type, React, Postgres, Discord.js, deploy. He writes the journal, runs Lab (Ledger and Relay), and answers studio@n3xuskonc3ptz.com himself. Public systems on the record include Elite Crete Systems South Texas, Pulse, and the bots on this site.",
};

export const PRINCIPLES = [
  {
    num: "01",
    title: "Aesthetic, then invisible",
    body: "IBM Plex, near-black, one sage signal. No gradient blobs, no stock neon. If a screen needs a second accent to work, the layout is wrong. The type pass is in the brief, not a polish week at the end.",
  },
  {
    num: "02",
    title: "Code that survives a year",
    body: "Postgres with backups, a staging URL before production, tokens vaulted, a runbook in the repo. Catalog jobs include a 30-day patch window. Pretty that cannot deploy is a mock — we do not invoice for mocks.",
  },
  {
    num: "03",
    title: "Build with, not at",
    body: "A four-question brief (what, budget, timing, notes) before pixels. We will cut a feature that does not change the 90-day outcome. Specialists, if any, are named in writing. You are not buying a sales layer.",
  },
];

export const PIPELINE = [
  {
    num: "01",
    title: "Discovery",
    body: "A written brief: audience, constraints, host, and what has to be true in 90 days. No Figma until that exists. Typical: one weekday to reply, then a 45-minute call if it fits.",
  },
  {
    num: "02",
    title: "Design",
    body: "Tokens, type, key pages at 390px first. You get screens you can reject — not a moodboard. Web design in the catalog starts at $750; a single landing page at $250.",
  },
  {
    num: "03",
    title: "Engineering",
    body: "React, Node, Postgres unless the job says otherwise. Discord.js or Telegram Bot API when it is a bot. Staging URL, migrations, auth. Web development starts at $1,250; a custom bot at $99.",
  },
  {
    num: "04",
    title: "Deploy",
    body: "TLS, backups, first week of traffic covered. Site hosting from $19.99/mo, bot hosting from $9.99/mo, or we hand you the repo and the runbook. We do not disappear on launch day.",
  },
];

export const STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Discord API",
  "Telegram API",
  "Stripe",
];

export const STACK_NOTES: { name: string; use: string }[] = [
  { name: "React", use: "Sites, apps, this studio OS" },
  { name: "TypeScript", use: "The default. Fewer 3 a.m. surprises" },
  { name: "Node.js", use: "APIs, workers, Discord.js, Telegram" },
  { name: "PostgreSQL", use: "Ledgers, CMS, anything that must remember" },
  { name: "Prisma", use: "Schema and migrations we can hand off" },
  { name: "Discord API", use: "Slash commands, economy, moderation" },
  { name: "Telegram API", use: "Menus, shop desks, broadcasts" },
  { name: "Stripe", use: "When money has to move" },
];

export const STATS = [
  { value: 8, suffix: "", label: "Public systems", hint: "Work on the record, not a vanity counter" },
  { value: 14, suffix: "", label: "Service lines", hint: "Build, automate, host, amplify" },
  { value: 24, suffix: "h", label: "First response", hint: "Weekdays, often faster on Discord" },
  { value: 3, suffix: " D's", label: "The loop", hint: "Design, development, deployment — one studio" },
];

export const ENGAGEMENT = [
  {
    name: "Project",
    range: "Fixed scope",
    body: "A written brief, a price, a date. Design through deploy. Best when you know the job — a site, a bot, a storefront.",
    includes: ["Discovery workshop", "Design + engineering", "Launch week coverage", "30-day patch window"],
  },
  {
    name: "Retainer",
    range: "Monthly",
    body: "Hosting, bots, and a block of hours after launch. Catalog hosting is $19.99/mo for sites, $9.99/mo for bots; retainers add a named hour block.",
    includes: ["Managed cloud or bot hosting", "Scheduled updates", "Priority queue", "Monthly status note"],
  },
  {
    name: "Rescue",
    range: "Time & materials",
    body: "Something is live and hurting. We isolate, patch, and leave a runbook — no rebuild unless you ask. 72-hour triage is the default first move.",
    includes: ["72-hour triage", "Backup before touch", "Root-cause note", "Optional follow-on project"],
  },
];

export const CAPABILITIES = [
  { area: "Marketing sites & storefronts", in: true },
  { area: "Product UI / internal tools", in: true },
  { area: "Discord & Telegram systems", in: true },
  { area: "APIs, workers, Postgres", in: true },
  { area: "Managed hosting & process watch", in: true },
  { area: "SEO and campaign structure", in: true },
  { area: "Native iOS / Android apps", in: false },
  { area: "Print, packaging, fashion", in: false },
  { area: "Paid media spend management at scale", in: false },
];

export const FAQ = [
  {
    q: "Who actually does the work?",
    a: "Juan Socarras, principal. If a job needs a specialist (motion, photography, a second language), they are named in the brief with a line item. You are not buying a sales layer.",
  },
  {
    q: "How do we start?",
    a: "Open a brief: what you need (Build / Automate / Host / Amplify), budget band, timing, and a paragraph of notes. Weekday first response within 24 hours — often faster on Discord (discord.gg/3UHWMa7rC) or Telegram (@n3xusg). If we are wrong for it, we say so.",
  },
  {
    q: "Do you take equity or revenue share?",
    a: "No. Cash for work. Hosting and retainers are monthly. Digital goods (Discord Economy Bot Template $49.99, UI kit $29.99) are a one-production license, not a partnership.",
  },
  {
    q: "What does “starting at” mean?",
    a: "Web design $750, web development $1,250, custom Discord or Telegram bot $99, landing page $250, managed site hosting $19.99/mo. Custom auth, data migrations, or a second language are scoped on top — never a surprise invoice for the listed job.",
  },
  {
    q: "Where are you?",
    a: "South Texas, America/Chicago. Desk Monday–Friday 09:00–18:00. Remote by default. On-site photography or a handshake by arrangement. studio@n3xuskonc3ptz.com",
  },
  {
    q: "Can you take over a site you did not build?",
    a: "Yes — Rescue or Website Work. We need repo or host access. We will not pretend a tangle is a two-hour job. Backup first, then a root-cause note, then a price to fix or rebuild.",
  },
];

export const DESK = {
  zone: "America/Chicago",
  days: "Mon–Fri",
  hours: "09:00–18:00",
  sla: "24h first response on weekdays",
};

export const OLD_FOUNDER_BIO =
  "Juan runs N3xUs Konc3pt'z as a small digital studio: design, engineering, and the machines that keep both online. He writes the journal, ships the bots, and still does the type pass himself.";

export const OLD_GENESIS =
  "The studio was started to refuse the usual split: a designer who never deploys, an engineer who inherits a moodboard, a host nobody owns. We take the 3 D’s as one job. Ecommerce, Discord, Telegram, CRMs, APIs — if it has to live on a network, it is in scope.";
