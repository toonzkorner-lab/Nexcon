export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  reading: string;
  image: string;
  imageAlt: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "rise-of-agentic-coding-ai-software-development",
    image: "/images/hero-studio.jpg",
    imageAlt: "Studio workstation with code on screen",
    title: "Agentic coding is not a junior hire",
    date: "2026-06-21",
    excerpt:
      "Agents write a lot of the first draft now. Architecture, taste, and the last 20% are still the job.",
    tags: ["AI", "Engineering"],
    reading: "6 min",
    body: [
      {
        paragraphs: [
          "In 2026, an agent can stand up a route, a schema, and a plausible UI before lunch. That is not the same as shipping a product someone will pay for. The studio that treats the agent as a junior who never sleeps, and themselves as the staff engineer, is the one that gets faster without getting sloppy.",
          "We use agents the way we used to use Stack Overflow and snippets: to collapse boilerplate. We do not let them name the product, pick the type, or invent a third database “just in case.”",
        ],
      },
      {
        heading: "What actually changed",
        paragraphs: [
          "The cost of a first implementation dropped. The cost of a wrong abstraction did not. If anything it went up, because you can now generate a wrong abstraction at terrifying speed.",
          "Review is the skill. Spec is the skill. Knowing when a generated test is asserting the mock, not the behavior — that is the skill.",
        ],
      },
      {
        heading: "How we work with it",
        paragraphs: [
          "Briefs still start on paper. Agents get a bounded task with a definition of done. Humans take the merge. If you want a studio that presses generate and invoices, there are plenty. We are not that.",
        ],
      },
    ],
  },
  {
    slug: "custom-web-design-vs-templates-conversion",
    image: "/images/studio-desk.jpg",
    imageAlt: "Desk with website sketches, laptop, and coffee",
    title: "Templates convert until they don’t",
    date: "2026-05-12",
    excerpt:
      "A theme is a loan against uniqueness. Fine for a test. Fatal once you have a real offer.",
    tags: ["Design", "Conversion"],
    reading: "5 min",
    body: [
      {
        paragraphs: [
          "Templates are honest tools. They get a plumber on the internet by Friday. They also teach the visitor that you are interchangeable, because they have already seen your hero, your three-column features, and your fake 4.9 stars.",
          "Conversion is not a button color. It is whether the page sounds like the business. Custom design is expensive relative to a theme and cheap relative to a year of looking like everyone else.",
        ],
      },
      {
        heading: "When a template is correct",
        paragraphs: [
          "Validating an offer. A two-week landing test. An internal tool nobody outside the shop will see. We will say so.",
          "When the brand is the product — a shop, a venue, a specialist contractor — the template is a tax.",
        ],
      },
    ],
  },
  {
    slug: "how-custom-discord-bots-increase-community-engagement",
    image: "/images/work-smokes.jpg",
    imageAlt: "Warm-lit apothecary jars under an Edison bulb",
    title: "Bots do not create culture. They remove friction.",
    date: "2026-04-02",
    excerpt:
      "Engagement jumps when onboarding, roles, and rewards stop depending on a tired admin.",
    tags: ["Discord", "Bots"],
    reading: "7 min",
    body: [
      {
        paragraphs: [
          "A public bot is a Swiss Army knife with 400 commands and no memory of your rules. People click it, get a wall, and go back to pinging mods.",
          "A custom bot is closer to a concierge. It knows the welcome flow, the muted words, the shop, the season pass. It does the jobs that used to sit in a Google Doc titled “please read.”",
        ],
      },
      {
        heading: "The 300% number",
        paragraphs: [
          "We have seen onboarding completion and weekly chatters move like that when the first ten minutes of a new member’s life are automated well. That is not magic. That is not having to find the right channel while three bots yell.",
          "If you want a bot that plays music and also runs a bank and also does tickets, we will still ask which of those is the product.",
        ],
      },
    ],
  },
  {
    slug: "dark-web-aesthetic-trends-2026",
    image: "/images/work-nights.jpg",
    imageAlt: "Moonlit city skyline from a rooftop terrace at night",
    title: "Dark does not mean neon",
    date: "2026-03-18",
    excerpt:
      "The 2026 dark UI that works looks like print in a dim room — not a LAN party in 2012.",
    tags: ["Design", "Type"],
    reading: "5 min",
    body: [
      {
        paragraphs: [
          "Cyberpunk as a brand cue aged into a cliché: purple bloom, scanlines on everything, a HUD that fights the content. The sites that still feel expensive in the dark went the other way. Near-black. One metal accent. Type you can sit with.",
          "We kept the terminal language — status, clocks, mono labels — and threw out the rave. If a glow is doing the job of a hierarchy, the hierarchy failed.",
        ],
      },
    ],
  },
  {
    slug: "build-custom-discord-bot-nodejs-2026",
    image: "/images/work-zenith.jpg",
    imageAlt: "Dark industrial control panel with gauges and indicator lights",
    title: "Building a Discord bot in 2026, without the folklore",
    date: "2026-06-17",
    excerpt:
      "Slash commands, a real database, Docker, and a process that comes back up. That is the whole talk.",
    tags: ["Discord", "Node.js"],
    reading: "8 min",
    body: [
      {
        paragraphs: [
          "Discord is no longer a gamer VoIP with a bot graveyard. DAOs, shops, and support desks run on it. The engineering bar went up: slash commands, intents you can explain, and state that is not a JSON file on a hobby VPS.",
        ],
      },
      {
        heading: "The stack we actually use",
        paragraphs: [
          "Node, Discord.js, Postgres. Commands as data. Permissions as a tree, not a boolean. Secrets in the environment, never in the repo. A process manager that restarts on a thrown promise.",
          "Hosting is a different product from the bot. A sleeping free dyno is not an architecture.",
        ],
      },
      {
        heading: "Ship it",
        paragraphs: [
          "Containerize. Healthcheck the websocket. Log to something you will read. If you do not want to run that, that is what managed bot hosting is for — including ours.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-developer",
    image: "/images/work-crete.jpg",
    imageAlt: "Sunlit polished concrete floor",
    title: "How to hire a studio without getting a pitch deck",
    date: "2026-02-09",
    excerpt:
      "Ask to see the runbook, not the moodboard. Ask who answers when it breaks.",
    tags: ["Studio", "Process"],
    reading: "6 min",
    body: [
      {
        paragraphs: [
          "Most agencies are a sales layer on top of a freelancer network. That is fine if you know it. It is not fine if you thought you bought a studio.",
          "Ask who will design, who will commit, and who is on the hook the week after launch. Ask for a site they still maintain. Ask what they refused to build last quarter.",
        ],
      },
      {
        heading: "A useful test",
        paragraphs: [
          "Send a messy brief. See if they send back a smaller one. The people who add scope to look busy are the people who will invoice you for looking busy.",
        ],
      },
    ],
  },
  {
    slug: "mastering-serverless-architecture",
    image: "/images/work-host.jpg",
    imageAlt: "Dark server room corridor lined with racks",
    title: "Serverless is a tool. Bots still need a socket.",
    date: "2026-01-22",
    excerpt:
      "Put the marketing site on the edge. Do not put a Discord gateway behind a cold start.",
    tags: ["Infra", "Architecture"],
    reading: "6 min",
    body: [
      {
        paragraphs: [
          "Serverless is excellent for bursty HTTP. It is a poor home for anything that must hold a connection. We still meet briefs that try to host a bot on a function because “scale.”",
          "Use the right idle: a small always-on process for the gateway, functions for the webhooks, a database that is not a spreadsheet. Boring, on purpose.",
        ],
      },
    ],
  },
  {
    slug: "the-future-of-api-architecture",
    image: "/images/work-pulse.jpg",
    imageAlt: "Dark liquid-metal wave, abstract",
    title: "APIs that other humans can stand",
    date: "2025-12-11",
    excerpt:
      "Version in the URL, errors as objects, and a document that matches production.",
    tags: ["API", "Engineering"],
    reading: "5 min",
    body: [
      {
        paragraphs: [
          "The future of your API is the same as the past of a good one: a contract. GraphQL or REST is a preference. Undocumented 500s with HTML in the body is a choice.",
          "We design resources, auth, and rate limits before a single handler. Then we generate the collection you will actually import. That is the whole future.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
