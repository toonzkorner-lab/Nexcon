export type Product = {
  slug: string;
  name: string;
  price: number;
  blurb: string;
  description: string;
  includes: string[];
  stack: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "advanced-discord-economy-bot-template",
    name: "Discord Economy Bot Template",
    price: 49.99,
    blurb: "A complete economy skeleton: ledger, shops, jobs, and admin — ready to skin.",
    description:
      "The same Postgres-backed pattern we use on client servers, stripped of private branding. Slash commands, a currency with sinks, inventory, and a moderation-safe admin surface. You bring the token and the rules.",
    includes: [
      "Discord.js source",
      "Postgres schema + seed",
      "Economy, shop, and job modules",
      "Admin commands and config",
      "Deploy notes for a VPS or our hosting",
    ],
    stack: ["Discord.js", "PostgreSQL", "Node"],
  },
  {
    slug: "cyberpunk-ui-component-kit-react",
    name: "Terminal UI Kit — React",
    price: 29.99,
    blurb: "A restrained dark kit: panels, tables, HUD chips. Not a neon sticker pack.",
    description:
      "The component language of this studio, packaged. IBM Plex, hairline borders, concentric radii, signal green used once. Buttons, inputs, tabs, data rows, and a command palette shell.",
    includes: [
      "React + Tailwind v4 components",
      "Token file (CSS @theme)",
      "Command palette pattern",
      "Example dashboard page",
      "Usage notes",
    ],
    stack: ["React", "Tailwind", "TypeScript"],
  },
  {
    slug: "telegram-auto-responder-script",
    name: "Telegram Auto-Responder",
    price: 19.99,
    blurb: "Menus, hours, and handoff — without standing up a full bot project.",
    description:
      "A focused script for shops and community desks that need a reliable first reply, a button menu, and a path to a human. Logging included. Extend it or leave it alone.",
    includes: [
      "Bot script + env sample",
      "Menu and hours config",
      "Handoff to a human chat",
      "Basic rate limiting",
      "Run instructions",
    ],
    stack: ["Node", "Telegram Bot API"],
  },
  {
    slug: "n3xus-premium-dark-mode-css-theme",
    name: "N3xUs Dark CSS Theme",
    price: 9.99,
    blurb: "Drop-in dark surfaces: tokens, type, and a grain that does not scream.",
    description:
      "A CSS-only theme for sites that need to go dark without a redesign. Near-black, bone type, sage signal. Works as a starting layer on top of a classless or lightly classed document.",
    includes: [
      "theme.css with tokens",
      "Optional grain overlay",
      "Form and table styles",
      "Reduced-motion guards",
    ],
    stack: ["CSS"],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
