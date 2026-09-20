import { o as getRequest, r as createServerFn } from "./ssr.mjs";
import { At as array, It as object, Ot as _enum, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { D as readSite, h as getPublishedBot, p as formatUsd } from "./db-CgZiGDRe.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as assertRateLimit } from "./rate-limit.server-CiJECjW_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Hy52ybGd.js
var MAX_USER_TURNS = 12;
var MAX_MSG = 500;
var MAX_ASK_MESSAGES = 8;
var MAX_ASK_MSG = 2e3;
var askCore_createServerFn_handler = createServerRpc({
	id: "7d89d1cde102fe1f76484fe0a2b48a14c095ac17c74fb675d7f3a8ca483ee55a",
	name: "askCore",
	filename: "src/lib/ai/chat.ts"
}, (opts) => askCore.__executeServer(opts));
var askCore = createServerFn({ method: "POST" }).validator((input) => object({ messages: array(object({
	role: _enum(["user", "assistant"]),
	content: string().trim().min(1).max(MAX_ASK_MSG)
})).min(1).max(MAX_ASK_MESSAGES) }).parse(input)).handler(askCore_createServerFn_handler, async ({ data }) => {
	assertRateLimit(getRequest().headers, "ai:ask", 10, 6e4);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Core is offline in this environment."
	};
	let catalog = "";
	try {
		const site = await readSite(true);
		const services = site.services.map((s) => `- ${s.name} ${formatUsd(s.price, { monthly: s.billing === "monthly" })}`).join("\n");
		const store = site.products.map((p) => `- ${p.name} ${formatUsd(p.price)}`).join("\n");
		catalog = `You are N3xUs Core, the studio assistant for ${site.settings.studioName} — run by ${site.settings.founderName}. Voice: short, specific, no hype, no emoji.

The 3 D's: Design, Development, Deployment.

Services:
${services}

Store:
${store}

Live bot demos sit at /lab. Ledger is a Discord economy sandbox. Relay is a Telegram desk bot.

Channels: Discord ${site.settings.discordUrl} and Telegram ${site.settings.telegramUrl}. ${site.settings.sla}.

Help visitors pick a service, estimate fit, and point them to Open a brief (/book) or Contact. Do not invent case studies, client names, or prices. If you don't know, say so. Keep replies under 180 words.`;
	} catch {
		catalog = "You are N3xUs Core. Point visitors to /book, /contact, or /lab. Do not invent prices. Keep replies under 180 words.";
	}
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages: [{
				role: "system",
				content: catalog
			}, ...data.messages.slice(-8)],
			max_tokens: 400
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "Core could not answer just now."
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim();
	if (!text) return {
		ok: false,
		error: "Empty reply from Core."
	};
	return {
		ok: true,
		text
	};
});
var talkToBot_createServerFn_handler = createServerRpc({
	id: "5cdb09c33321f45a0fad4fed7714ad204e150128323cbefbea8904de85cad39c",
	name: "talkToBot",
	filename: "src/lib/ai/chat.ts"
}, (opts) => talkToBot.__executeServer(opts));
var talkToBot = createServerFn({ method: "POST" }).validator((input) => object({
	slug: string().trim().min(1).max(80),
	messages: array(object({
		role: _enum(["user", "assistant"]),
		content: string().trim().min(1).max(MAX_MSG)
	})).min(1).max(24)
}).parse(input)).handler(talkToBot_createServerFn_handler, async ({ data }) => {
	assertRateLimit(getRequest().headers, "ai:bot", 20, 6e4);
	if (data.messages.filter((m) => m.role === "user").length > MAX_USER_TURNS) return {
		ok: false,
		error: "Sandbox cap for this session. Open a brief if you want this on your server."
	};
	const bot = await getPublishedBot(data.slug);
	if (!bot) return {
		ok: false,
		error: "That demo is offline."
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "This demo’s language model is offline. Slash commands still run locally."
	};
	const system = `${bot.persona}

You are being demonstrated on the N3xUs Konc3pt'z site. Do not claim you are ChatGPT or Grok. Stay in character as ${bot.name}.`;
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages: [{
				role: "system",
				content: system
			}, ...data.messages.slice(-8)],
			max_tokens: 280,
			temperature: .6
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `${bot.name} could not answer just now.`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim();
	if (!text) return {
		ok: false,
		error: "Empty reply."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askCore_createServerFn_handler, talkToBot_createServerFn_handler };
