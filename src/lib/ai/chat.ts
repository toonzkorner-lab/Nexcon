import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { assertRateLimit } from "@/lib/rate-limit.server";
import { getPublishedBot, readSite } from "@/lib/cms/db";
import { seedSite } from "@/lib/cms/seed-data";
import { formatUsd } from "@/lib/utils";
import { answerLocally } from "./local-answer";
import {
  chatCompletionsUrl,
  configuredProviders,
  PROVIDER_CONFIGS,
  providerApiKey,
  type AIProvider,
} from "./providers";

const MAX_USER_TURNS = 12;
const MAX_MSG = 500;
const MAX_ASK_MESSAGES = 8;
const MAX_ASK_MSG = 2000;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/**
 * One chat-completions call to a provider. Returns the reply text, or null
 * on any failure (bad key, rate limit, outage, empty reply) so the caller
 * can try the next provider or fall back to local answers.
 */
async function tryProvider(
  provider: AIProvider,
  apiKey: string,
  messages: ChatMessage[],
  maxTokens: number,
  temperature?: number,
): Promise<string | null> {
  try {
    const res = await fetch(chatCompletionsUrl(provider), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: PROVIDER_CONFIGS[provider].model,
        messages,
        max_tokens: maxTokens,
        ...(temperature !== undefined ? { temperature } : {}),
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return json.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

/**
 * Try the configured LLM providers in order (xAI, then Gemini) and return
 * the first real reply, or null when none answers. Callers fall back to
 * the local answer engine on null, so the bots never go silent.
 */
async function tryProviders(
  system: string,
  messages: { role: "user" | "assistant"; content: string }[],
  maxTokens: number,
  temperature?: number,
): Promise<string | null> {
  const history = messages.slice(-8);
  for (const provider of configuredProviders(process.env)) {
    const apiKey = providerApiKey(process.env, provider);
    if (!apiKey) continue;
    const text = await tryProvider(
      provider,
      apiKey,
      [{ role: "system", content: system }, ...history],
      maxTokens,
      temperature,
    );
    if (text) return text;
  }
  return null;
}

export const askCore = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().trim().min(1).max(MAX_ASK_MSG),
            }),
          )
          .min(1)
          .max(MAX_ASK_MESSAGES),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    assertRateLimit(getRequest().headers, "ai:ask", 10, 60_000);
    // Site data drives both the LLM catalog and the no-key local answers.
    // If the DB read fails, fall back to the seed site so the desk still answers.
    let site;
    try {
      site = await readSite(true);
    } catch {
      site = seedSite();
    }
    const services = site.services
      .map((s) => `- ${s.name} ${formatUsd(s.price, { monthly: s.billing === "monthly" })}`)
      .join("\n");
    const store = site.products.map((p) => `- ${p.name} ${formatUsd(p.price)}`).join("\n");
    const catalog = `You are N3xUs Core, the studio assistant for ${site.settings.studioName} — run by ${site.settings.founderName}. Voice: short, specific, no hype, no emoji.

The 3 D's: Design, Development, Deployment.

Services:
${services}

Store:
${store}

Live bot demos sit at /lab. Ledger is a Discord economy sandbox. Relay is a Telegram desk bot.

Channels: Discord ${site.settings.discordUrl} and Telegram ${site.settings.telegramUrl}. ${site.settings.sla}.

Help visitors pick a service, estimate fit, and point them to Open a brief (/book) or Contact. Do not invent case studies, client names, or prices. If you don't know, say so. Keep replies under 180 words.`;

    const text = await tryProviders(catalog, data.messages, 400);
    if (text) return { ok: true as const, text };
    // No provider answered (no key, quota hit, or outage): answer locally
    // off the site's own data + coding knowledge.
    return {
      ok: true as const,
      text: answerLocally({
        botName: "Core",
        settings: site.settings,
        services: site.services,
        products: site.products,
        faqs: site.faqs,
        messages: data.messages,
      }),
    };
  });

export const talkToBot = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        slug: z.string().trim().min(1).max(80),
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().trim().min(1).max(MAX_MSG),
            }),
          )
          .min(1)
          .max(24),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    assertRateLimit(getRequest().headers, "ai:bot", 20, 60_000);
    const users = data.messages.filter((m) => m.role === "user").length;
    if (users > MAX_USER_TURNS) {
      return {
        ok: false as const,
        error: "Sandbox cap for this session. Open a brief if you want this on your server.",
      };
    }
    const bot = await getPublishedBot(data.slug);
    if (!bot) return { ok: false as const, error: "That demo is offline." };

    let site;
    try {
      site = await readSite(true);
    } catch {
      site = seedSite();
    }

    const system = `${bot.persona}

You are being demonstrated on the N3xUs Konc3pt'z site. Do not claim you are ChatGPT or Grok. Stay in character as ${bot.name}.`;

    const text = await tryProviders(system, data.messages, 280, 0.6);
    if (text) return { ok: true as const, text };
    // No provider answered: answer locally off the site's own data + coding knowledge.
    return {
      ok: true as const,
      text: answerLocally({
        botName: bot.name,
        settings: site.settings,
        services: site.services,
        products: site.products,
        faqs: site.faqs,
        messages: data.messages,
      }),
    };
  });
