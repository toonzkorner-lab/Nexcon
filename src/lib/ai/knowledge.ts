/**
 * Built-in coding knowledge for the no-key answer engine.
 *
 * Customers can ask the lab bots and Core coding questions without any AI
 * API key. Each entry is a short, plain-language answer matched by keywords.
 * Keep answers accurate, short (2-4 sentences), and free of hype. Code
 * examples stay to 1-3 lines. Prices and studio facts never live here —
 * those come from the site catalog in `local-answer.ts`, never invented.
 */

export type KnowledgeEntry = {
  id: string;
  topic: string;
  /** Phrases and words that trigger this entry. Multi-word phrases count double. */
  triggers: string[];
  answer: string;
};

export const CODING_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "what-is-javascript",
    topic: "JavaScript",
    triggers: ["what is javascript", "what is js", "javascript", "js"],
    answer:
      "JavaScript is the programming language that makes web pages interactive — buttons, forms, menus, live updates. It runs in the browser and, with Node.js, on servers too. If a page does something when you click, JavaScript is usually behind it.",
  },
  {
    id: "what-is-typescript",
    topic: "TypeScript",
    triggers: ["what is typescript", "typescript", "ts", "why typescript"],
    answer:
      "TypeScript is JavaScript with types added. You declare what shape your data is, and the compiler catches mistakes before the code runs. It compiles down to plain JavaScript, so browsers never see it. Use it on anything bigger than a small script.",
  },
  {
    id: "variables",
    topic: "Variables",
    triggers: ["variable", "let vs const", "let const var", "const vs let", "declare a variable"],
    answer:
      "Use const by default — the value cannot be reassigned. Use let when the value must change later, like a counter. Avoid var; it has confusing scoping rules that const and let fixed. Example: const name = \"N3xUs\"; let visits = 0;",
  },
  {
    id: "functions",
    topic: "Functions",
    triggers: ["function", "arrow function", "how to write a function", "what is a function"],
    answer:
      "A function is a named block of code you can run again with different inputs. It takes parameters in and returns a value out. Arrow functions are the short form: const add = (a, b) => a + b; — same job, less typing.",
  },
  {
    id: "async-await",
    topic: "Async / await",
    triggers: ["async", "await", "promise", "asynchronous", "fetch data"],
    answer:
      "Async code waits for slow things (network, files, database) without freezing the page. Mark a function async, then await the slow call: const res = await fetch(url); const data = await res.json();. A promise is the object that represents a value that is not ready yet.",
  },
  {
    id: "arrays",
    topic: "Arrays",
    triggers: ["array", "map filter", "loop through", "foreach", "how to loop"],
    answer:
      "An array is an ordered list: const nums = [1, 2, 3];. map transforms every item, filter keeps the ones that match a test: nums.map(n => n * 2) gives [2, 4, 6]. Prefer map and filter over manual for loops — shorter and harder to get wrong.",
  },
  {
    id: "objects",
    topic: "Objects",
    triggers: ["object", "what is an object", "json object", "key value"],
    answer:
      "An object groups named values together: const user = { name: \"Juan\", age: 30 };. Read a value with user.name. JSON is the text format for sending objects over the network — same shape, with double quotes: {\"name\": \"Juan\"}.",
  },
  {
    id: "what-is-api",
    topic: "APIs",
    triggers: ["what is an api", "what is api", "rest api", "rest", "api", "json"],
    answer:
      "An API is a way for two programs to talk. Your site asks an API for data, the API answers, usually as JSON. A REST API uses URLs and HTTP verbs: GET to read, POST to create, PUT/PATCH to update, DELETE to remove. Example: GET /api/products returns the product list.",
  },
  {
    id: "debugging",
    topic: "Debugging",
    triggers: ["debug", "bug", "not working", "error", "fix my code", "why is my code not working", "console.log"],
    answer:
      "Start by reading the error message — it names the file and line. Add console.log() before the failing line to see what the values actually are. Fix one thing at a time and re-run. If the error names something undefined, the value was never set or the name is misspelled.",
  },
  {
    id: "npm",
    topic: "npm",
    triggers: ["npm", "package", "install a package", "node modules", "dependency"],
    answer:
      "npm installs other people's code as packages so you do not rewrite it. npm install <name> adds it to your project; the list lives in package.json. node_modules is the folder it downloads into — never edit it by hand, and never commit it.",
  },
  {
    id: "types-vs-interfaces",
    topic: "Types vs interfaces",
    triggers: ["type vs interface", "interface", "type alias", "when to use interface"],
    answer:
      "In TypeScript, type and interface both describe object shapes and are mostly interchangeable. Use interface for object shapes you may extend later, and type for unions, tuples, or primitives: type Status = \"open\" | \"closed\";. If in doubt, interface is the safe default for objects.",
  },
  {
    id: "what-is-react",
    topic: "React",
    triggers: ["what is react", "react", "component", "what is a component"],
    answer:
      "React is a library for building interfaces out of components — small, reusable pieces like a button or a product card. Each component is a function that returns what to show. When its data changes, React re-renders just that piece.",
  },
  {
    id: "hooks",
    topic: "React hooks",
    triggers: ["usestate", "useeffect", "hook", "use state", "use effect", "state in react"],
    answer:
      "Hooks let function components hold state and run side effects. useState stores a value that re-renders the component when it changes: const [count, setCount] = useState(0);. useEffect runs code after render — fetching data, timers, subscriptions — and cleans up when the component leaves.",
  },
  {
    id: "props",
    topic: "Props",
    triggers: ["props", "pass data", "parent to child"],
    answer:
      "Props are how a parent component passes data down to a child. The parent writes <Card title=\"Hello\" /> and the child reads props.title. Data flows one way — down. If a child needs to change something, the parent passes it a function to call.",
  },
  {
    id: "html-css-js",
    topic: "HTML, CSS, JavaScript",
    triggers: ["html css", "html vs css", "what is html", "what is css", "difference between html and css"],
    answer:
      "HTML is the structure (headings, paragraphs, buttons). CSS is the styling (colors, spacing, layout). JavaScript is the behavior (what happens on click). Three separate jobs, three separate files in a clean project.",
  },
  {
    id: "flexbox-grid",
    topic: "Flexbox and grid",
    triggers: ["flexbox", "flex", "css grid", "grid", "how to center", "center a div", "layout css"],
    answer:
      "Flexbox lays items out in one row or column; grid lays them out in rows and columns at once. To center one thing, flexbox is the quick answer: display: flex; align-items: center; justify-content: center;. Use grid when you need a real two-dimensional layout, like a product gallery.",
  },
  {
    id: "responsive",
    topic: "Responsive design",
    triggers: ["responsive", "mobile friendly", "media query", "looks bad on mobile", "breakpoint"],
    answer:
      "Responsive design means the layout adapts to the screen size. Use relative units and flexible layouts first, then media queries for the breakpoints where the design needs to change: @media (max-width: 640px) { ... }. Test on a real phone, not just a narrow desktop window.",
  },
  {
    id: "discord-bot-howto",
    topic: "Making a Discord bot",
    triggers: ["discord bot", "make a discord bot", "how to make a discord bot", "create a discord bot", "discord.js", "discord js"],
    answer:
      "Create the bot in the Discord Developer Portal, copy its token, and keep that token secret — it is a password. Install discord.js, log in with the token, and register slash commands. Turn on the intents your bot needs (message content, guild members) in the portal or it will see nothing. We build and host these — open a brief at /book if you want one done for you.",
  },
  {
    id: "discord-slash-commands",
    topic: "Discord slash commands",
    triggers: ["slash command", "slash commands", "discord command", "register commands"],
    answer:
      "Slash commands are the /commands users type in Discord. You define each command (name, description, options) in code, then register them with Discord — once per guild for testing, globally for production. Global commands can take up to an hour to appear. The handler runs when a user invokes the command.",
  },
  {
    id: "discord-bot-hosting",
    topic: "Hosting a Discord bot",
    triggers: ["host a discord bot", "hosting a bot", "keep my bot online", "bot goes offline", "where to host a bot"],
    answer:
      "A Discord bot is a program that must stay running, so it needs a server that is always on — a VPS, Coolify, or a host like Railway. Keep the token in an environment variable, never in the code. Give the bot a process manager or a container that restarts it if it crashes.",
  },
  {
    id: "telegram-bot-howto",
    topic: "Making a Telegram bot",
    triggers: ["telegram bot", "make a telegram bot", "how to make a telegram bot", "create a telegram bot", "botfather"],
    answer:
      "Open Telegram, message @BotFather, send /newbot, and follow the prompts — it gives you a token. Use a library like grammY or Telegraf to answer messages with that token. Start with polling (the library asks Telegram for new messages); switch to a webhook later when you need scale. We build these too — /book if you want one.",
  },
  {
    id: "telegram-webhook-polling",
    topic: "Telegram webhooks vs polling",
    triggers: ["webhook", "polling", "webhook vs polling", "how does telegram bot receive messages"],
    answer:
      "Polling means your bot repeatedly asks Telegram 'anything new?' — simple, no public URL needed, fine for small bots. A webhook means Telegram pushes new messages to your server — faster and cheaper at scale, but you need a public HTTPS URL. Start with polling; move to webhooks when the bot gets busy.",
  },
  {
    id: "nodejs-express",
    topic: "Node.js and Express",
    triggers: ["node.js", "nodejs", "node", "express", "what is node", "backend"],
    answer:
      "Node.js runs JavaScript on a server instead of a browser. Express is the common framework for building APIs with it: define routes like app.get(\"/api/products\", handler) and it answers HTTP requests. Your bot, your API, and your build tools can all be Node.",
  },
  {
    id: "database-postgres",
    topic: "Databases and Postgres",
    triggers: ["database", "postgres", "postgresql", "sql", "what is sql", "how to store data", "mysql"],
    answer:
      "A database stores data so it survives restarts. PostgreSQL is a solid free choice. You define tables (users, orders, products) and query them with SQL: SELECT * FROM products WHERE price < 50;. Never store passwords as plain text — hash them. Back up before any big change.",
  },
  {
    id: "env-vars",
    topic: "Environment variables",
    triggers: ["env var", "environment variable", ".env", "dotenv", "where to put api key", "keep secret", "hide api key"],
    answer:
      "Secrets (API keys, tokens, database passwords) go in environment variables, not in code. Put them in a .env file locally and in your host's environment settings when deployed. Never commit .env to git and never paste a key into chat or a screenshot.",
  },
  {
    id: "deploy-vercel",
    topic: "Deploying",
    triggers: ["deploy", "vercel", "how to deploy", "put my site online", "hosting a website", "coolify"],
    answer:
      "Deploying means putting your code on a server so others can reach it. Push to GitHub, connect the repo to Vercel, and it builds and publishes on every push. Set your environment variables in the host dashboard before the first deploy, or the build will fail or the app will run without its secrets.",
  },
  {
    id: "git-github",
    topic: "Git and GitHub",
    triggers: ["git", "github", "commit", "push", "pull request", "branch", "how to use git"],
    answer:
      "Git tracks changes to your code; GitHub stores it online. The daily loop: git pull, edit, git add ., git commit -m \"what changed\", git push. A branch is a separate line of work you merge when it is done. Commit small and often, with messages that say what changed.",
  },
  {
    id: "stripe",
    topic: "Stripe",
    triggers: ["stripe", "take payments", "checkout", "payment", "charge a card", "sell online"],
    answer:
      "Stripe handles card payments. The safe pattern: your server creates a Checkout Session, the customer pays on Stripe's page, and Stripe tells your server with a webhook. Never take card numbers in your own forms, and never put a secret key in front-end code. Test mode keys are free to try.",
  },
  {
    id: "api-key-safety",
    topic: "API key safety",
    triggers: ["api key", "api keys", "leaked key", "exposed key", "is my key safe", "token leaked"],
    answer:
      "Treat an API key like a password. If it leaks — in code, a screenshot, or a chat — revoke it and make a new one immediately; do not just delete the message. Use separate keys for test and live, and give each key the smallest permissions it needs.",
  },
  {
    id: "what-is-a-bot",
    topic: "What a bot is",
    triggers: ["what is a bot", "what is a chatbot", "chatbot", "what can a bot do"],
    answer:
      "A bot is a program that talks to people on a platform — Discord, Telegram, or a website — and does jobs for them: answering questions, taking orders, running games, or handling support. The ones we build answer from your real data (hours, prices, products) instead of guessing.",
  },
];

/** Normalize text for matching: lowercase, collapse whitespace and punctuation. */
export function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type KnowledgeMatch = { entry: KnowledgeEntry; score: number };

/**
 * Best-matching coding knowledge entry for a message, or null.
 * Multi-word triggers count double. A lone generic word is not enough —
 * the message must score at least 2, so "bot" alone does not match.
 */
export function findKnowledge(text: string): KnowledgeMatch | null {
  const q = normalizeQuery(text);
  if (!q) return null;
  let best: KnowledgeMatch | null = null;
  for (const entry of CODING_KNOWLEDGE) {
    let score = 0;
    for (const trigger of entry.triggers) {
      const t = normalizeQuery(trigger);
      if (!t) continue;
      if (q.includes(t)) score += t.includes(" ") ? 2 : 1;
    }
    if (score >= 2 && (!best || score > best.score)) best = { entry, score };
  }
  return best;
}
