import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { assertRateLimit } from "@/lib/rate-limit.server";
import { getPublishedBot, readSite } from "@/lib/cms/db";
import { seedSite } from "@/lib/cms/seed-data";
import { formatUsd } from "@/lib/utils";
import { answerLocally } from "./local-answer";

const MAX_USER_TURNS = 12;
const MAX_MSG = 500;
const MAX_ASK_MESSAGES = 8;
const MAX_ASK_MSG = 2000;

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
    const apiKey = process.env.XAI_API_KEY;
    // Site data drives both the LLM catalog and the no-key local answers.
    // If the DB read fails, fall back to the seed site so the desk still answers.
    let site;
    try {
      site = await readSite(true);
    } catch {
      site = seedSite();
    }
    // No key: answer locally off the site's own data + coding knowledge.
    if (!apiKey) {
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

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages: [{ role: "system", content: catalog }, ...data.messages.slice(-8)],
        max_tokens: 400,
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: "Core could not answer just now." };
    }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) return { ok: false as const, error: "Empty reply from Core." };
    return { ok: true as const, text };
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

    const apiKey = process.env.XAI_API_KEY;
    // No key: answer locally off the site's own data + coding knowledge.
    if (!apiKey) {
      let site;
      try {
        site = await readSite(true);
      } catch {
        site = seedSite();
      }
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
    }

    const system = `${bot.persona}

You are being demonstrated on the N3xUs Konc3pt'z site. Do not claim you are ChatGPT or Grok. Stay in character as ${bot.name}.`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages: [{ role: "system", content: system }, ...data.messages.slice(-8)],
        max_tokens: 280,
        temperature: 0.6,
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `${bot.name} could not answer just now.` };
    }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) return { ok: false as const, error: "Empty reply." };
    return { ok: true as const, text };
  });
