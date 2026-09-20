export type WorkKind = "Client" | "Studio";
export type WorkTag = "Web" | "Bots" | "Systems" | "Brand";

export type Project = {
  slug: string;
  title: string;
  client: string;
  kind: WorkKind;
  year: string;
  duration: string;
  role: string;
  tags: WorkTag[];
  stack: string[];
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  image: string;
  imageAlt?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "elite-crete-systems-south-tx-web-platform",
    title: "Elite Crete Systems South Texas",
    client: "Elite Crete Systems — Texas South",
    kind: "Client",
    year: "2025",
    duration: "6 weeks",
    role: "Design, engineering, launch",
    tags: ["Web", "Systems"],
    stack: ["React", "Node.js", "Express"],
    summary:
      "A contractor-facing web platform for high-performance flooring in South Texas — specs, locales, and a path from inquiry to job.",
    problem:
      "Decorative and industrial flooring is sold on trust and samples, but the digital presence was a brochure that did not help a GC or property owner take the next step. Specs were scattered. Contact dropped into a void.",
    approach:
      "We rebuilt the surface as a working platform: systems and use-cases (kitchens, hangars, showrooms) as first-class routes, a cleaner inquiry flow, and a stack a local operator can actually update. Dark, material-led photography instead of clipart concrete.",
    outcome:
      "A site that reads like the product — dense, engineered, specific. Inquiries route with context (use-case, location, timeline) instead of a blank form.",
    metrics: [
      { value: "5", label: "Inquiry fields that now matter" },
      { value: "6w", label: "Brief to launch" },
      { value: "1", label: "Operator, no CMS tax" },
    ],
    image: "/images/work-crete.jpg",
    featured: true,
  },
  {
    slug: "nexus-moderation-bot",
    title: "Nexus Moderation & Economy",
    client: "N3xUs Studio",
    kind: "Studio",
    year: "2025",
    duration: "Ongoing product",
    role: "Product, backend, ops",
    tags: ["Bots", "Systems"],
    stack: ["Discord.js", "PostgreSQL", "Node API"],
    summary:
      "A Discord bot that does two jobs well: keep the room clean, and give the economy enough depth that people stay.",
    problem:
      "Most public bots are a pile of commands with no memory. Communities outgrow them the moment they need custom roles, ledgers, or moderation that understands their rules.",
    approach:
      "Postgres for the ledger and cases. Slash commands with real permission trees. Moderation that logs, expires, and can be appealed. Economy with sinks so inflation does not eat the server in a month.",
    outcome:
      "The studio’s reference bot — the same skeleton we fork for client servers. Deployed as a product, not a weekend script.",
    metrics: [
      { value: "Pg", label: "Ledger, not a JSON file" },
      { value: "RBAC", label: "Permission tree" },
      { value: "24/7", label: "Process-guarded" },
    ],
    image: "/images/work-host.jpg",
    featured: true,
  },
  {
    slug: "wicked-smokes",
    title: "Wicked Smokes",
    client: "Wicked Smokes",
    kind: "Studio",
    year: "2026",
    duration: "3 weeks",
    role: "Brand, storefront",
    tags: ["Web", "Brand"],
    stack: ["React 19", "TypeScript"],
    summary:
      "A retail surface for a smoke shop that needed to feel adult — dark glass, steel, no neon carnival.",
    problem:
      "The category defaults to loud. The shop wanted a presence that looked like the counter: matte, specific, easy to scan on a phone between errands.",
    approach:
      "React 19 storefront with a tight catalog, location/hours, and a visual system sampled from the actual fixtures. Type and contrast first; decoration last.",
    outcome:
      "A site that matches the room. Catalog and visit info without the template smell.",
    metrics: [
      { value: "390", label: "Designed at phone width first" },
      { value: "0", label: "Stock neon treatments" },
      { value: "1", label: "Visit job: hours + catalog" },
    ],
    image: "/images/work-smokes.jpg",
    featured: true,
  },
  {
    slug: "zenith-automation",
    title: "Zenith Automation",
    client: "Zenith",
    kind: "Client",
    year: "2025",
    duration: "5 weeks",
    role: "Architecture, workers",
    tags: ["Systems", "Web"],
    stack: ["Node.js", "REST", "Workers"],
    summary: "An operations layer for teams drowning in copy-paste between tools.",
    problem:
      "Quotes, follow-ups, and status lived in three chats and a spreadsheet. Nothing had a source of truth.",
    approach:
      "A small API and worker set that watches the tools they already use, then writes a single timeline. No new “platform” to log into unless they want it.",
    outcome:
      "Handoffs stopped falling on the floor. The dashboard is a byproduct — the jobs are the product.",
    metrics: [
      { value: "3→1", label: "Tools collapsed to a timeline" },
      { value: "Jobs", label: "Product, not the dashboard" },
      { value: "API", label: "Contract first" },
    ],
    image: "/images/work-zenith.jpg",
  },
  {
    slug: "crypto-pulse",
    title: "Crypto Pulse",
    client: "Studio R&D",
    kind: "Studio",
    year: "2025",
    duration: "R&D sprint",
    role: "Interface, sockets",
    tags: ["Web", "Systems"],
    stack: ["React", "WebSockets", "Node"],
    summary: "A market pulse board: few numbers, honest latency, no casino chrome.",
    problem: "Crypto UIs scream. We wanted a terminal that a tired operator could read.",
    approach:
      "Live ticks over a socket, tabular figures, muted status. No token logos as decoration. Alerts as a list, not confetti.",
    outcome:
      "An internal board we still use when we need a read, and a pattern we reuse for any live ops surface.",
    metrics: [
      { value: "WS", label: "Live ticks" },
      { value: "Tabular", label: "Numbers that do not jump" },
      { value: "Ops", label: "Reused as a pattern" },
    ],
    image: "/images/work-pulse.jpg",
  },
  {
    slug: "galactic-nights",
    title: "Galactic Nights",
    client: "Galactic Nights",
    kind: "Client",
    year: "2025",
    duration: "2 weeks",
    role: "Identity, landing",
    tags: ["Web", "Brand"],
    stack: ["React", "CMS"],
    summary: "Event identity and a night-of site: lineup, tickets, where to stand.",
    problem: "The night had a name. The internet had a Facebook event and a JPEG.",
    approach:
      "A single scrolling night: type as the identity, a quiet city photograph, ticket and lineup as the only jobs of the page.",
    outcome: "Something you can send in a text that still looks like a poster when it opens.",
    metrics: [
      { value: "1", label: "Page, two jobs" },
      { value: "Type", label: "As the identity" },
      { value: "SMS", label: "Shareable without an app" },
    ],
    image: "/images/work-nights.jpg",
  },
  {
    slug: "neon-galactic-nights",
    title: "Neon Galactic Nights",
    client: "Galactic Nights",
    kind: "Client",
    year: "2026",
    duration: "3 weeks",
    role: "System, archive",
    tags: ["Web", "Brand"],
    stack: ["React", "Motion"],
    summary:
      "The follow-up season: a tighter identity system and a page that can host a series, not one date.",
    problem:
      "One-off event pages rot. The series needed a home that could take the next date without a rebuild.",
    approach:
      "A season wrapper, archived nights, and a motion language that stays in the type — no particle soup.",
    outcome: "A living series page. Adding a date is content, not a project.",
    metrics: [
      { value: "Series", label: "Not a one-off" },
      { value: "CMS", label: "Next date is content" },
      { value: "0", label: "Particle systems" },
    ],
    image: "/images/work-neon-nights.jpg",
    imageAlt: "Rooftop terrace over a neon-lit city at night, magenta and cyan glow",
  },
  {
    slug: "n3xus-konc3pt-z",
    title: "N3xUs Konc3pt'z",
    client: "This studio",
    kind: "Studio",
    year: "2026",
    duration: "Rebuild",
    role: "Identity, product, ops",
    tags: ["Web", "Brand", "Systems"],
    stack: ["React 19", "TanStack Start", "TypeScript"],
    summary:
      "The house site. Rebuilt from a zero-stat template into a working studio operating system.",
    problem:
      "The previous site claimed a cyberpunk aesthetic and then published 0 projects, 0 bots, and 0% satisfaction. Inner pages were thin. Copy repeated itself. Emoji stood in for a design system.",
    approach:
      "A real content model, honest work, a brief builder, a store, and a support desk. Dark, typographic, no neon. The 3 D’s stay — the execution changes.",
    outcome: "The site you are on. Use it as the proof.",
    metrics: [
      { value: "0→8", label: "Systems on the record" },
      { value: "14", label: "Priced service lines" },
      { value: "Core", label: "Assistant on the desk" },
    ],
    image: "/images/hero-studio.jpg",
    featured: true,
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function featuredProjects() {
  return PROJECTS.filter((p) => p.featured);
}

export function neighbors(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: PROJECTS[i - 1],
    next: PROJECTS[i + 1],
  };
}
