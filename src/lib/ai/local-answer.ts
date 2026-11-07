/**
 * No-key answer engine for Relay (lab) and Core (support dock).
 *
 * When there is no XAI_API_KEY, the chat server functions answer here
 * instead of calling a language model. Everything comes from the site's own
 * data (services, products, settings, FAQs) plus the built-in coding
 * knowledge base — so it never invents prices, hours, or facts, costs
 * nothing, and works offline. When a key is set, the LLM path is used
 * instead; this is the fallback, not a replacement.
 */
import { formatUsd } from "../utils.ts";
import type { Faq, Product, Service, Settings } from "../cms/types.ts";
import { findKnowledge, normalizeQuery } from "./knowledge.ts";

export type LocalAnswerInput = {
  botName: string;
  settings: Settings;
  services: Service[];
  products: Product[];
  faqs?: Faq[];
  messages: { role: "user" | "assistant"; content: string }[];
};

const HOW_TO =
  /\b(how (to|do|can|should)|how do i|how can i|make|build|create|code|coding|write|learn|teach|explain|what is|what are|what does|why)\b/;
const PRICE_WORDS = /\b(price|pricing|cost|how much|quote|charge|rates?|expensive|cheap)\b/;
const BOOK_WORDS = /\b(book|brief|start (a )?project|hire|work with you|get started|i need (a |an )?|i want (a |an )?)\b/;
const HUMAN_WORDS = /\b(human|real person|someone real|talk to (a |someone|anyone)|contact|email|reach (you|the studio|the desk))\b/;
const HOURS_WORDS = /\b(hour|hours|open|when (are|do) you|available|desk hours|what time)\b/;
const MENU_WORDS = /\b(menu|services|what do you (do|sell|offer)|offerings|what can you do|catalog)\b/;
const GREETING = /^(hi|hey|hello|yo|sup|hiya|good (morning|afternoon|evening))\b/;

function lastUserMessage(messages: LocalAnswerInput["messages"]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") return messages[i].content;
  }
  return "";
}

/** True when a service/product name is mentioned (distinctive word, 4+ letters, or the full name). */
function nameMatches(message: string, name: string): boolean {
  const n = normalizeQuery(name);
  if (!n) return false;
  if (message.includes(n)) return true;
  const stop = new Set(["and", "the", "for", "with", "your", "our"]);
  return n
    .split(" ")
    .filter((w) => w.length >= 4 && !stop.has(w))
    .some((w) => message.includes(w));
}

function serviceLine(s: Service): string {
  return `- ${s.name} ${formatUsd(s.price, { monthly: s.billing === "monthly" })}`;
}

export function answerLocally(input: LocalAnswerInput): string {
  const { botName, settings, services, products, faqs = [] } = input;
  const raw = lastUserMessage(input.messages);
  const q = normalizeQuery(raw);
  if (!q) return `Say something and I will answer. I cover hours, services, prices, and coding questions.`;

  const publishedServices = services.filter((s) => s.published);
  const publishedProducts = products.filter((p) => p.published);
  const bookLine = `Open a brief at /book and the desk will pick it up.`;
  const contactLine = `Email ${settings.email}, or find the studio on Discord and Telegram.`;

  if (GREETING.test(q)) {
    return `Hey. I cover hours, services, prices, and coding questions. What do you need?`;
  }
  if (/\b(thanks|thank you|thx|appreciated)\b/.test(q)) {
    return `Anytime.`;
  }
  if (HOURS_WORDS.test(q)) {
    return `Desk hours are ${settings.deskDays} ${settings.deskHours} (${settings.zone}). ${settings.sla}`;
  }
  if (HUMAN_WORDS.test(q)) {
    return `${contactLine} For a job, ${bookLine.toLowerCase()}`;
  }
  if (BOOK_WORDS.test(q) && !HOW_TO.test(q)) {
    return bookLine;
  }
  if (PRICE_WORDS.test(q)) {
    const service = publishedServices.find((s) => nameMatches(q, s.name));
    if (service) {
      return `${service.name} is ${formatUsd(service.price, { monthly: service.billing === "monthly" })}${service.billing === "monthly" ? " / month" : ""}. ${service.summary} ${bookLine}`;
    }
    const product = publishedProducts.find((p) => nameMatches(q, p.name));
    if (product) {
      return `${product.name} is ${formatUsd(product.price)}. ${product.blurb} See it on /store.`;
    }
    if (publishedServices.length) {
      return `Prices live on the catalog:\n${publishedServices.map(serviceLine).join("\n")}\n${bookLine}`;
    }
    return `Prices live on /services. ${bookLine}`;
  }

  // A named service/product — unless the message is a how-to, which belongs
  // to the coding knowledge base (e.g. "how do I make a Discord bot").
  if (!HOW_TO.test(q)) {
    const service = publishedServices.find((s) => nameMatches(q, s.name));
    if (service) {
      return `${service.name}: ${service.summary} ${formatUsd(service.price, { monthly: service.billing === "monthly" })}${service.billing === "monthly" ? " / month" : ""}. Timeline: ${service.timeline}. ${bookLine}`;
    }
    const product = publishedProducts.find((p) => nameMatches(q, p.name));
    if (product) {
      return `${product.name}: ${product.blurb} ${formatUsd(product.price)}. See it on /store.`;
    }
  }

  const knowledge = findKnowledge(raw);
  if (knowledge) return knowledge.entry.answer;

  if (MENU_WORDS.test(q)) {
    if (!publishedServices.length) return `Services live on /services. ${bookLine}`;
    return `What the studio does:\n${publishedServices.map(serviceLine).join("\n")}\n${bookLine}`;
  }

  const faq = faqs.find(
    (f) =>
      normalizeQuery(f.question)
        .split(" ")
        .filter((w) => w.length >= 4)
        .some((w) => q.includes(w)) && q.length > 3,
  );
  if (faq) return faq.answer;

  return (
    `I can help with hours, services, prices, starting a project, or coding questions ` +
    `(Discord and Telegram bots, React, JavaScript, hosting, and more). ` +
    `For anything else, ${bookLine.toLowerCase()} or ${contactLine.toLowerCase()}`
  );
}
