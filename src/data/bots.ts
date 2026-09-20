import type { ShowcaseBot } from "@/lib/cms/types";

export const SEED_BOTS: ShowcaseBot[] = [
  {
    slug: "ledger",
    name: "Ledger",
    tagline: "A Discord economy you can actually drain.",
    description:
      "The pattern behind the Economy Bot Template, running here as a sandbox: credits, jobs, a shop, inventory. Slash commands are real. Persistence is not — refresh and the ledger resets. On a client server this writes to Postgres.",
    kind: "economy",
    channel: "Discord",
    welcome:
      "Ledger online. Sandbox float: 50 credits. Try /work, /shop, /buy coffee, /balance. Chatter is fine — I will not invent your wallet.",
    persona: `You are Ledger, a Discord economy bot demo on n3xuskonc3ptz.com.
Voice: terse, specific, no emoji, no hype, no exclamation marks.
Slash commands (/balance /work /daily /shop /buy /inv) are executed by the sandbox, not by you. Never invent a credit balance or inventory.
If they ask how this would run on their server: Discord.js + Postgres, hosted by N3xUs or their VPS. Point to /store/advanced-discord-economy-bot-template or /book.
Keep replies under 90 words.`,
    starters: ["/work", "/shop", "/daily", "How would this run on my Discord?"],
    commands: [
      { cmd: "/work", hint: "Odd job, 8s cooldown" },
      { cmd: "/balance", hint: "Credits on hand" },
      { cmd: "/daily", hint: "Session bonus" },
      { cmd: "/shop", hint: "Catalog" },
      { cmd: "/buy coffee", hint: "Spend 25c" },
      { cmd: "/inv", hint: "Inventory" },
    ],
    productSlug: "advanced-discord-economy-bot-template",
    published: true,
    sortOrder: 0,
    seoTitle: "Try Ledger — Live Discord Economy Bot Demo",
    seoDescription:
      "Use a live Discord economy bot in the browser: work, shop, inventory. Sandbox demo from N3xUs Konc3pt'z.",
  },
  {
    slug: "relay",
    name: "Relay",
    tagline: "A Telegram desk that answers before a human does.",
    description:
      "Hours, a menu, and a clean handoff. Talk to it like a shop bot: hours, services, how to reach the studio. On a real Telegram it would log and escalate. Here it is the same brain, in the site.",
    kind: "chat",
    channel: "Telegram",
    welcome:
      "Relay. I cover hours, services, and how to reach the desk. If you have a real job, I will send you to a brief.",
    persona: `You are Relay, a Telegram auto-responder demo for N3xUs Konc3pt'z (n3xuskonc3ptz.com).
Voice: short, calm, no emoji, no hype.
Studio hours: weekday 09:00–18:00 America/Chicago. SLA: 24h first response on weekdays.
Services: web design, web development, Discord and Telegram bots, managed hosting, SEO. Prices live on /services. Do not invent prices — say "on the catalog" and name the page.
If they want work done: /book (open a brief) or studio@n3xuskonc3ptz.com, Discord, Telegram.
If they want this bot for their shop: /store/telegram-auto-responder-script or /book.
Keep replies under 90 words.`,
    starters: ["What are your hours?", "I need a Discord bot.", "How do I start a project?"],
    commands: [
      { cmd: "hours", hint: "When the desk is on" },
      { cmd: "menu", hint: "What the studio sells" },
      { cmd: "human", hint: "Handoff to a brief" },
    ],
    productSlug: "telegram-auto-responder-script",
    published: true,
    sortOrder: 1,
    seoTitle: "Try Relay — Live Telegram Desk Bot Demo",
    seoDescription:
      "Talk to a live Telegram-style auto-responder from N3xUs Konc3pt'z. Hours, services, and a path to a human.",
  },
  {
    slug: "house",
    name: "House",
    tagline: "A Discord casino you can actually lose chips in.",
    description:
      "Slots, coinflip, dice, roulette, blackjack — the same command surface we ship on client servers. Sandbox chips, real house edge. Refresh resets the cage. On Discord this writes to Postgres and pays a configured currency.",
    kind: "casino",
    channel: "Discord",
    welcome:
      "House is open. Sandbox float: 200 chips. Not money. /slots 10, /flip heads 25, /roulette red 20, /bj 25 then /hit or /stand. /daily if you burn the stack.",
    persona: `You are House, a Discord casino bot demo on n3xuskonc3ptz.com.
Voice: terse pit boss, no emoji, no hype, no exclamation marks.
Slash games (/slots /flip /dice /roulette /bj /hit /stand /double /balance /daily) are executed by the sandbox. Never invent a chip balance or a spin result.
Chips are not money. 18+ flavour, no real wagering.
If they want this on their Discord: Discord.js + Postgres, hosted by N3xUs. Point to /book.
Keep replies under 90 words.`,
    starters: ["/slots 10", "/flip heads 25", "/bj 25", "/roulette red 20"],
    commands: [
      { cmd: "/slots 10", hint: "Three reels" },
      { cmd: "/flip heads 25", hint: "1.95×" },
      { cmd: "/dice high 20", hint: "4–6 pays 1.9×" },
      { cmd: "/roulette red 20", hint: "Even money" },
      { cmd: "/bj 25", hint: "Then /hit /stand" },
      { cmd: "/daily", hint: "+150 once" },
    ],
    productSlug: "",
    published: true,
    sortOrder: 2,
    seoTitle: "Try House — Live Discord Casino Bot Demo",
    seoDescription:
      "Play a live Discord casino bot in the browser: slots, coinflip, roulette, blackjack. Sandbox chips from N3xUs Konc3pt'z. Not real money.",
  },
];
