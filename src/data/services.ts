export type Billing = "one-off" | "monthly";

export type Service = {
  slug: string;
  name: string;
  group: "Build" | "Automate" | "Host" | "Amplify";
  summary: string;
  description: string;
  price: number;
  billing: Billing;
  hoursNote?: string;
  features: string[];
  deliverables: string[];
  timeline: string;
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    group: "Build",
    summary: "Custom applications with modern stacks — not templates with extra steps.",
    description:
      "Full-stack engineering for products that have to ship, scale, and stay maintainable. React and Node on the surface; Postgres, auth, and APIs underneath. We design the architecture before we write the first route.",
    price: 1250,
    billing: "one-off",
    features: [
      "Full-stack application architecture",
      "API integration and custom endpoints",
      "Database modeling and migrations",
      "Auth, roles, and session handling",
      "Performance budgets and Core Web Vitals",
      "Handoff docs and deployment runbook",
    ],
    deliverables: ["Source repository", "Staging + production deploy", "Admin or CMS if needed", "30-day post-launch patch window"],
    timeline: "3–8 weeks depending on scope",
  },
  {
    slug: "web-design",
    name: "Web Design",
    group: "Build",
    summary: "A visual system your brand can actually live in — not a one-page mood.",
    description:
      "Interface design with the restraint of print and the precision of product. We start with type, surface, and a single accent — then build pages that convert without looking like every other agency site.",
    price: 750,
    billing: "one-off",
    features: [
      "UI/UX for marketing or product surfaces",
      "Wireframes through high-fidelity screens",
      "Brand integration and type pairing",
      "Component inventory for engineering",
      "Mobile-first layouts",
      "Motion spec (subtle, interruptible)",
    ],
    deliverables: ["Figma or equivalent source", "Design tokens", "Key page set", "Handoff notes"],
    timeline: "2–5 weeks",
  },
  {
    slug: "responsive-web-design",
    name: "Responsive Web Design",
    group: "Build",
    summary: "The same system, honest on a phone and a 27-inch display.",
    description:
      "Reflow, not shrink. We rebuild layouts so type, hit targets, and media behave at 390px first, then up. Cross-browser checks included — Safari, Chrome, Firefox.",
    price: 500,
    billing: "one-off",
    features: [
      "Mobile-first layout pass",
      "Fluid type and spacing",
      "Cross-browser testing",
      "Touch target audit (44px)",
      "Overflow and orientation fixes",
      "Image and media srcset strategy",
    ],
    deliverables: ["Responsive implementation", "Device QA report", "Breakpoint notes"],
    timeline: "1–3 weeks",
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    group: "Build",
    summary: "One job: turn a visit into a lead or a sale.",
    description:
      "A single, tightly written surface with a clear offer, proof, and a form that actually submits. Copy, layout, and tracking in one pass — no carousel of distractions.",
    price: 175,
    billing: "one-off",
    features: [
      "Offer architecture and copy",
      "Lead capture form",
      "A/B-ready section structure",
      "Analytics and conversion events",
      "Fast load, no junk scripts",
      "Mobile-first layout",
    ],
    deliverables: ["Live page", "Form destination", "Event map"],
    timeline: "5–10 days",
  },
  {
    slug: "website-work",
    name: "Website Work",
    group: "Build",
    summary: "Three focused hours: patches, content, performance, or a stubborn bug.",
    description:
      "A scoped block of engineering time for sites that are already live. Security updates, content swaps, speed work, or the thing you’ve been ignoring. Unused time does not roll — we use the three hours.",
    price: 100,
    billing: "one-off",
    hoursNote: "Includes 3 hours of focused work",
    features: [
      "Security and dependency updates",
      "Content and layout edits",
      "Performance passes",
      "Bug isolation and fix",
      "Backup before we touch production",
      "Written summary of what changed",
    ],
    deliverables: ["Change log", "Deployed updates"],
    timeline: "Usually within 72 hours of brief",
  },
  {
    slug: "api-development",
    name: "API Development",
    group: "Build",
    summary: "REST or GraphQL that other systems can trust.",
    description:
      "Contracts first: resources, auth, rate limits, errors. Then implementation with tests and docs so the next engineer — including future-you — does not have to reverse-engineer a black box.",
    price: 200,
    billing: "one-off",
    features: [
      "REST or GraphQL design",
      "Token and session authentication",
      "Rate limiting and abuse controls",
      "Versioning strategy",
      "OpenAPI or schema docs",
      "Staging environment",
    ],
    deliverables: ["API + docs", "Postman or equivalent collection", "Deploy config"],
    timeline: "1–4 weeks",
  },
  {
    slug: "discord-bots",
    name: "Custom Discord Bots",
    group: "Automate",
    summary: "Moderation, economy, music, AI hooks — built for your server, not a public template.",
    description:
      "A bot is a product. We spec commands, permissions, and failure modes, then ship Discord.js with a real database. Optional AI for support or onboarding. Hosting is separate if you want us to run it.",
    price: 99,
    billing: "one-off",
    features: [
      "Slash commands and permissions",
      "Moderation and logging",
      "Economy / XP systems",
      "Music or media queues",
      "AI integration where it earns its keep",
      "Admin dashboard or config channel",
    ],
    deliverables: ["Bot application", "Invite + setup guide", "Source or managed run"],
    timeline: "1–3 weeks",
  },
  {
    slug: "telegram-bots",
    name: "Custom Telegram Bots",
    group: "Automate",
    summary: "Group ops, replies, payments, and API glue inside Telegram.",
    description:
      "Telegram is where a lot of communities and shops actually live. We build bots that manage groups, take payments, and talk to your other systems — without the 3 a.m. “bot is down” message.",
    price: 99,
    billing: "one-off",
    features: [
      "Group management and anti-spam",
      "Automated replies and menus",
      "Payment gateway hooks",
      "API integration",
      "Broadcast and digest jobs",
      "Logging and admin commands",
    ],
    deliverables: ["Bot + token setup", "Runbook", "Optional managed hosting"],
    timeline: "1–3 weeks",
  },
  {
    slug: "premium-managed-bot-hosting",
    name: "Managed Bot Hosting",
    group: "Host",
    summary: "Isolated process, restarts, backups — so the bot answers at 4 a.m.",
    description:
      "Bots are not websites. They need a persistent socket, isolated RAM, and a process supervisor that comes back up without you. We run Discord and Telegram workloads on dedicated resources with token-safe config and daily state backups.",
    price: 9.99,
    billing: "monthly",
    features: [
      "Isolated CPU and memory",
      "Low-latency process placement",
      "Automatic restart on crash",
      "Encrypted token storage",
      "Daily state / database snapshots",
      "Uptime watch and incident notes",
    ],
    deliverables: ["Provisioned environment", "Status channel", "Restore procedure"],
    timeline: "Usually live within 24 hours",
  },
  {
    slug: "premium-managed-cloud-hosting",
    name: "Managed Cloud Hosting",
    group: "Host",
    summary: "The site stays fast, patched, and restorable. You do not SSH at midnight.",
    description:
      "We take the box, the TLS, the backups, and the updates. Global CDN in front, daily snapshots behind, firewall and patch cadence in between. Built for the sites and apps we design — or for ones you already have.",
    price: 19.99,
    billing: "monthly",
    features: [
      "CDN and aggressive cache policy",
      "TLS, firewall, and patch cadence",
      "Daily snapshots with rollback",
      "Uptime monitoring",
      "Core updates and performance tuning",
      "Incident response during business hours+",
    ],
    deliverables: ["Live environment", "Backup schedule", "Access credentials vaulted"],
    timeline: "Migration in 1–5 days",
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    group: "Amplify",
    summary: "Technical SEO and content that a human would actually read.",
    description:
      "Crawl health, titles, internals, and a keyword map tied to pages you can ship. We do not sell a thousand backlinks. We make the site make sense to Google and to the person who lands.",
    price: 300,
    billing: "one-off",
    features: [
      "Keyword and intent map",
      "On-page titles, metas, headings",
      "Internal linking and IA",
      "Technical crawl fixes",
      "Schema where it is honest",
      "90-day measurement plan",
    ],
    deliverables: ["SEO brief", "Implemented on-page work", "Tracking sheet"],
    timeline: "2–4 weeks",
  },
  {
    slug: "internet-marketing",
    name: "Internet Marketing",
    group: "Amplify",
    summary: "Campaigns with a number attached: traffic, leads, or sales.",
    description:
      "Strategy, creative, and tracking in one loop. PPC, landing alignment, and conversion events so you can see what the spend did — not a vanity dashboard.",
    price: 250,
    billing: "one-off",
    features: [
      "Campaign strategy",
      "PPC setup and structure",
      "Creative and offer alignment",
      "Conversion tracking",
      "Weekly pulse notes",
      "Kill / scale rules",
    ],
    deliverables: ["Account structure", "Tracking live", "First flight of ads"],
    timeline: "1–2 weeks to first flight",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    group: "Amplify",
    summary: "A channel plan with a cadence you can keep.",
    description:
      "We pick the two surfaces that matter, write a month of posts, and set the measurement. Discord and Telegram-native if that is where your people are — not a generic grid.",
    price: 250,
    billing: "one-off",
    features: [
      "Channel and cadence plan",
      "30-day content set",
      "Community playbook",
      "Profile and bio pass",
      "UTM and tracking",
      "Handoff calendar",
    ],
    deliverables: ["Content calendar", "Asset pack", "Posting SOP"],
    timeline: "2 weeks",
  },
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    group: "Amplify",
    summary: "Stills and motion that match the site — not stock with a logo slapped on.",
    description:
      "Product, space, and team coverage with a post pipeline. We shoot for the layouts we already designed so crops, contrast, and color actually fit.",
    price: 400,
    billing: "one-off",
    features: [
      "Product or space stills",
      "Short-form brand video",
      "Color and retouch",
      "Web-sized exports",
      "Usage-cleared files",
      "Optional on-site direction",
    ],
    deliverables: ["Edited stills", "Cut video", "Web + archive files"],
    timeline: "1–3 weeks after shoot",
  },
];

export const SERVICE_GROUPS = ["Build", "Automate", "Host", "Amplify"] as const;

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
