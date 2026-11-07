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
  {
    id: "python",
    topic: "Python",
    triggers: ["what is python", "python", "learn python", "python programming", "python vs javascript"],
    answer:
      "Python is a general-purpose language known for readable, beginner-friendly code. It powers web backends, data work, automation scripts, and bots — including Telegram bots. If JavaScript is the language of the browser, Python is the workhorse behind the scenes.",
  },
  {
    id: "conditionals",
    topic: "If / else",
    triggers: ["if else", "if statement", "conditional", "if else statement", "else if"],
    answer:
      "An if statement runs code only when a condition is true: if (age >= 18) { ... } else { ... }. The else branch runs when the condition is false. Chain else if for more than two outcomes. Keep conditions simple — if you nest three deep, split it into a function.",
  },
  {
    id: "loops",
    topic: "Loops",
    triggers: ["for loop", "while loop", "loop", "how to loop", "iterate", "for each"],
    answer:
      "A loop repeats code. A for loop runs a set number of times: for (let i = 0; i < 5; i++). A while loop runs until a condition turns false. For arrays, prefer for...of or .forEach over counting indexes by hand — fewer off-by-one mistakes.",
  },
  {
    id: "strings",
    topic: "Strings",
    triggers: ["string", "template literal", "string interpolation", "concatenate", "string methods"],
    answer:
      "A string is text in quotes: const s = \"hello\";. Template literals use backticks and let you embed values: `Hello, ${name}`. Common helpers: .length, .toUpperCase(), .includes(), .split(). Strings are immutable — methods return a new string, they never change the original.",
  },
  {
    id: "booleans-logic",
    topic: "Booleans and logic",
    triggers: ["boolean", "true false", "logical operators", "and or not", "boolean logic"],
    answer:
      "A boolean is true or false. Combine them with && (and — both must be true), || (or — at least one true), and ! (not — flips it). A common bug: using = (assign) where you meant === (compare). Triple equals checks value and type; double equals can coerce types and surprise you.",
  },
  {
    id: "error-handling",
    topic: "Try / catch",
    triggers: ["try catch", "error handling", "handle errors", "throw an error", "catch error"],
    answer:
      "Wrap risky code in try/catch so one failure does not crash everything: try { await fetch(url); } catch (err) { console.error(err); }. Use try/catch around network calls, file reads, and JSON parsing — the places that fail in the real world. Log the error, then decide: retry, fall back, or tell the user.",
  },
  {
    id: "classes-oop",
    topic: "Classes and OOP",
    triggers: ["class", "oop", "object oriented", "what is a class", "constructor"],
    answer:
      "A class is a blueprint for creating objects with the same shape and behavior. You define properties (data) and methods (functions) once, then make instances: const user = new User(\"Juan\");. OOP groups data and the code that works on it together. You do not need classes for everything — plain functions and objects cover most small jobs.",
  },
  {
    id: "modules-imports",
    topic: "Modules and imports",
    triggers: ["import", "export", "module", "how to import", "require vs import"],
    answer:
      "Modules split code across files so each file does one job. Export what a file provides: export function greet() {}. Import it where you need it: import { greet } from \"./greet.js\";. Use ESM import/export in modern projects; require() is the older CommonJS style. A circular import (A imports B, B imports A) is a sign the shared code belongs in a third file.",
  },
  {
    id: "json-deep",
    topic: "JSON",
    triggers: ["json parse", "json stringify", "parse json", "json.stringify", "json format"],
    answer:
      "JSON is the text format APIs use to send data. JSON.parse(text) turns a JSON string into a JavaScript object; JSON.stringify(obj) turns an object back into a string. Keys must use double quotes and there are no trailing commas — that is why hand-written JSON breaks so often. Validate with a JSON linter when a parse fails.",
  },
  {
    id: "regex",
    topic: "Regular expressions",
    triggers: ["regex", "regular expression", "pattern matching", "validate email regex", "what is regex", "what is a regex"],
    answer:
      "A regular expression (regex) is a pattern for matching text: /\\d+/ matches digits, /^\\S+@\\S+\\.\\S+$/ is a rough email check. Use them for validation and search, not for parsing HTML or nested data — that way lies madness. Test your pattern on regex101.com before shipping it.",
  },
  {
    id: "http-status-codes",
    topic: "HTTP status codes",
    triggers: ["http status", "status code", "404 error", "404 not found", "what is 404", "500 error", "500 internal", "403 forbidden", "401 unauthorized", "200 ok"],
    answer:
      "Status codes say what happened: 2xx means success (200 OK), 3xx means redirect, 4xx means the client messed up (404 not found, 401 not logged in, 403 not allowed), 5xx means the server messed up (500 internal error). When debugging, the code tells you which side to look at first — 4xx is your request, 5xx is their server.",
  },
  {
    id: "http-methods",
    topic: "HTTP methods",
    triggers: ["http methods", "get vs post", "get post put delete", "what is get", "what is post"],
    answer:
      "HTTP methods say what you want to do: GET reads data, POST creates it, PUT/PATCH updates it, DELETE removes it. GET requests should never change anything — that is what makes them safe to retry and cache. A form that creates something should POST; a link that only reads should GET.",
  },
  {
    id: "cors",
    topic: "CORS",
    triggers: ["cors", "cors error", "blocked by cors", "access control allow origin", "cross origin", "what is cors"],
    answer:
      "CORS is the browser blocking a page from calling an API on a different domain unless that API explicitly allows it. The fix lives on the server: it must send an Access-Control-Allow-Origin header for your domain. During development you can use a proxy, but do not ship a browser extension workaround as the fix.",
  },
  {
    id: "frontend-backend",
    topic: "Frontend vs backend",
    triggers: ["frontend vs backend", "front end vs back end", "what is frontend", "what is backend", "client vs server"],
    answer:
      "Frontend is what runs in the browser — what the user sees and clicks. Backend is what runs on a server — the database, the logic, the APIs. The frontend asks, the backend answers. A full-stack developer does both sides.",
  },
  {
    id: "full-stack",
    topic: "Full-stack",
    triggers: ["full stack", "fullstack", "what is full stack", "full stack developer"],
    answer:
      "Full-stack means building both the frontend (what users see) and the backend (server, database, APIs) of an app. A typical stack: React on the front, Node.js and Postgres on the back. You do not need to master every layer to ship — know one end well and the other well enough to connect them.",
  },
  {
    id: "what-is-server",
    topic: "What a server is",
    triggers: ["what is a server", "server", "what does a server do", "web server"],
    answer:
      "A server is a computer (or program) that answers requests from other computers. Your browser asks a web server for a page; the server sends it back. Servers stay on and reachable, which is why a bot or an API needs one. Your laptop can be a server for testing, but a hosted one is what the public reaches.",
  },
  {
    id: "static-vs-dynamic",
    topic: "Static vs dynamic sites",
    triggers: ["static vs dynamic", "static site", "dynamic site", "static website"],
    answer:
      "A static site is fixed files — fast, cheap, and great for landing pages and blogs. A dynamic site builds pages per request from a database — needed for logins, carts, and dashboards. Most real projects mix both: static pages for marketing, dynamic routes for the app itself.",
  },
  {
    id: "domains-dns",
    topic: "Domains and DNS",
    triggers: ["domain", "dns", "what is dns", "how does a domain work", "nameserver", "point domain", "dns work"],
    answer:
      "A domain is a human name for an IP address. DNS is the lookup: when you type a domain, DNS returns the server's IP. To point a domain at a host, you set DNS records (usually an A record or CNAME) at your registrar. Changes take minutes to hours to spread worldwide — that delay is DNS propagation.",
  },
  {
    id: "ssl-https",
    topic: "SSL and HTTPS",
    triggers: ["ssl", "https", "certificate", "what is https", "secure connection", "tls"],
    answer:
      "HTTPS encrypts traffic between the browser and the server so no one in between can read or change it. The padlock comes from a certificate proving the site owns the domain. Modern hosts (Vercel, Netlify) issue certificates automatically — you only need to point the DNS at them. Never collect logins or payments over plain HTTP.",
  },
  {
    id: "seo-basics",
    topic: "SEO basics",
    triggers: ["seo", "search engine", "rank on google", "how to rank", "meta tags"],
    answer:
      "SEO is making your pages easy for search engines to find, understand, and rank. The basics: one clear title per page, a short description, real headings, fast loading, and pages that work on mobile. Add a sitemap and Open Graph tags so links look right when shared. Content that answers a real question beats keyword tricks every time.",
  },
  {
    id: "cookies-sessions",
    topic: "Cookies and sessions",
    triggers: ["cookie", "cookies", "session", "what is a cookie", "session cookie"],
    answer:
      "A cookie is a small piece of data the browser stores and sends back with each request. Sessions use a cookie holding an ID; the server keeps the real data (like who is logged in) keyed by that ID. Mark auth cookies HttpOnly (JavaScript cannot read them) and Secure (only over HTTPS). That is most of login security in one paragraph.",
  },
  {
    id: "localstorage",
    topic: "localStorage",
    triggers: ["localstorage", "local storage", "sessionstorage", "store data in browser", "in localstorage"],
    answer:
      "localStorage lets a web page save small data in the browser that survives reloads: localStorage.setItem(\"theme\", \"dark\");. It holds strings only, about 5 MB, and it is per-domain. Never store secrets or tokens there — any script on the page can read it. For anything sensitive, use HttpOnly cookies instead.",
  },
  {
    id: "forms-validation",
    topic: "Forms and validation",
    triggers: ["form", "form validation", "validate input", "html form", "submit form"],
    answer:
      "Validate in two places: the browser (fast feedback, required fields, input types) and the server (the real check — never trust the browser alone). Check that required fields are present, emails look like emails, and text is within length limits. Show one clear error per field, next to the field, in plain words.",
  },
  {
    id: "accessibility",
    topic: "Accessibility",
    triggers: ["accessibility", "a11y", "screen reader", "aria", "accessible website"],
    answer:
      "Accessibility means people using keyboards, screen readers, or high contrast can use your site. The cheap wins: real buttons and links (not divs), alt text on images, labels on every input, and enough color contrast. Test by tabbing through the page with only a keyboard — if you cannot reach it, neither can they.",
  },
  {
    id: "sql-select",
    topic: "SQL SELECT",
    triggers: ["sql select", "select query", "sql where", "how to query", "select from"],
    answer:
      "SELECT reads rows from a table: SELECT name, email FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10;. WHERE filters, ORDER BY sorts, LIMIT caps the count. Start by selecting only the columns you need — SELECT * is fine for exploring, wasteful in production.",
  },
  {
    id: "sql-joins",
    topic: "SQL JOINs",
    triggers: ["sql join", "join tables", "inner join", "left join", "how to join", "join two tables", "tables in sql"],
    answer:
      "A JOIN combines rows from two tables on a shared key: SELECT orders.id, users.name FROM orders JOIN users ON orders.user_id = users.id;. INNER JOIN keeps only rows that match on both sides; LEFT JOIN keeps all rows from the left table and fills in nulls where there is no match. If your result has duplicate rows, you probably joined on the wrong key.",
  },
  {
    id: "nosql-vs-sql",
    topic: "NoSQL vs SQL",
    triggers: ["nosql", "nosql vs sql", "mongodb", "sql vs nosql", "document database"],
    answer:
      "SQL databases (Postgres, MySQL) store data in tables with a fixed schema and strong guarantees — the safe default for orders, users, and money. NoSQL (MongoDB, Firebase) stores flexible documents and scales by sharding — handy for logs, feeds, and fast-changing shapes. Pick SQL unless you have a specific reason not to.",
  },
  {
    id: "password-hashing",
    topic: "Password hashing",
    triggers: ["hash password", "password hashing", "bcrypt", "store passwords", "salt", "hash a password", "hash passwords"],
    answer:
      "Never store a password as plain text. Hash it with a slow algorithm like bcrypt or argon2, which turns the password into a scrambled value that cannot be reversed. When the user logs in, hash what they typed and compare the hashes. Add a unique salt per user so identical passwords do not produce identical hashes.",
  },
  {
    id: "jwt-auth",
    topic: "JWT",
    triggers: ["jwt", "json web token", "token auth", "bearer token", "what is jwt", "what is a jwt"],
    answer:
      "A JWT is a signed token that proves who you are: the server signs it with a secret, and anyone can verify the signature without asking the server. The client sends it as an Authorization: Bearer <token> header. Keep JWTs short-lived (minutes to hours) and store them in HttpOnly cookies, not localStorage.",
  },
  {
    id: "auth-vs-authz",
    topic: "Auth vs authorization",
    triggers: ["authentication vs authorization", "auth vs authz", "what is authentication", "what is authorization"],
    answer:
      "Authentication is proving who you are (logging in). Authorization is proving you are allowed to do a thing (an owner can edit, a visitor cannot). Log in first, then check permissions on every request — never trust the client to tell you what role it has.",
  },
  {
    id: "testing",
    topic: "Testing",
    triggers: ["testing", "unit test", "write a test", "how to test", "test driven"],
    answer:
      "A test calls your code with a known input and checks the output. Start with unit tests on pure functions (price math, validation, formatting) — they are fast and catch regressions. A good test names what it proves: \"coupon over max uses is rejected\". Run them before every push; a test you do not run is a comment.",
  },
  {
    id: "terminal-cli",
    topic: "Terminal",
    triggers: ["terminal", "command line", "cli", "how to use terminal", "use the terminal", "bash", "command prompt"],
    answer:
      "The terminal runs commands by text. The essentials: cd to move, ls to list, mkdir to make a folder, and Tab to autocomplete. Commands are case-sensitive and a typo is the most common error. If a command asks for a password, nothing shows while you type — that is normal.",
  },
  {
    id: "vscode",
    topic: "VS Code",
    triggers: ["vscode", "vs code", "code editor", "best editor"],
    answer:
      "VS Code is the most common editor for web work. Learn the shortcuts that save the most time: Ctrl+P to open any file, Ctrl+Shift+P for every command, and Ctrl+` to toggle the terminal. Install the extensions for your language (ESLint, Prettier) and format on save — it ends most style arguments.",
  },
  {
    id: "dates-time",
    topic: "Dates and time",
    triggers: ["date", "time", "timezone", "datetime", "how to handle dates", "timestamp"],
    answer:
      "Store dates in UTC and convert to the user's timezone only when displaying. A timestamp (milliseconds since 1970) is the safest format to store and compare. Timezones and daylight saving are where date bugs live — use a library (date-fns, Luxon) instead of hand-rolling the math.",
  },
  {
    id: "caching",
    topic: "Caching",
    triggers: ["cache", "caching", "what is caching", "cache busting"],
    answer:
      "Caching stores a result so the next identical request skips the work. Browsers cache files, servers cache database results, CDNs cache pages near the user. The hard part is knowing when the cached copy is stale — give cached things a short lifetime or a version in the name so a new deploy busts it.",
  },
  {
    id: "file-handling",
    topic: "File handling",
    triggers: ["read file", "write file", "file upload", "fs.readfile", "handle files"],
    answer:
      "Read files with the fs module (Node) or an upload handler (browser). Always check the file exists before reading, and cap upload sizes — a 2 GB upload will kill a small server. Store uploads outside the code repo, validate the file type by content (not just the extension), and never execute an uploaded file.",
  },
  {
    id: "telegram-commands",
    topic: "Telegram bot commands",
    triggers: ["telegram command", "bot commands", "setmycommands", "telegram menu", "telegram bot commands"],
    answer:
      "Telegram bot commands are the /words users type. Define them with @BotFather via /setcommands so Telegram shows them in a menu. In code, match the command text at the start of the message and reply. Keep command names short, lowercase, and one job each.",
  },
  {
    id: "discord-embeds",
    topic: "Discord embeds",
    triggers: ["discord embed", "embed", "rich embed", "discord message embed"],
    answer:
      "An embed is Discord's rich message card — title, description, color bar, fields, thumbnail, footer. Build one with the EmbedBuilder in discord.js and send it instead of plain text for anything structured (a product, a result, a profile). One message can hold up to 10 embeds and 6000 characters total.",
  },
  {
    id: "discord-intents",
    topic: "Discord intents",
    triggers: ["discord intents", "intents", "gateway intents", "privileged intents", "message content intent"],
    answer:
      "Intents tell Discord which events your bot wants to receive. MessageContent (privileged) is the one that lets a bot read message text — turn it on in the Developer Portal and request it in code, or your bot sees nothing. Only ask for the intents you actually use; unused privileged intents are a review risk.",
  },
];

/** Normalize text for matching: lowercase, collapse whitespace and punctuation. */
export function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bwhats\b/g, "what is")
    .replace(/\bwhat s\b/g, "what is")
    .replace(/\bhows\b/g, "how is")
    .replace(/\bhow s\b/g, "how is");
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
