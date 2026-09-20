import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as cn } from "./db-CgZiGDRe.mjs";
import { a as Send, h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { N as talkToBot, P as Button, V as useSite, a as Route$19 } from "./router-CkGAamYH.mjs";
import { t as Crumbs } from "./crumbs-p_xy5w6E.mjs";
import { c as organization, i as breadcrumbs, o as graph, t as JsonLd } from "./schema-Cgb-FIs8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab._slug-DsNYUt_g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHOP = [
	{
		id: "coffee",
		name: "Coffee",
		price: 25,
		blurb: "Hot. Does nothing. Looks expensive."
	},
	{
		id: "sticker",
		name: "Neon sticker",
		price: 15,
		blurb: "The one we refuse to put on the site."
	},
	{
		id: "keycard",
		name: "Keycard",
		price: 80,
		blurb: "Access to a room that is also this sandbox."
	},
	{
		id: "vault",
		name: "Vault slot",
		price: 120,
		blurb: "Stores the other things. Very meta."
	}
];
var WORK_COOLDOWN_MS = 8e3;
function freshLedger() {
	return {
		credits: 50,
		inventory: [],
		lastWorkAt: 0,
		dailyClaimed: false
	};
}
function parseCommand(input) {
	const raw = input.trim();
	if (!raw.startsWith("/")) return null;
	const [head, ...rest] = raw.slice(1).split(/\s+/);
	const cmd = (head ?? "").toLowerCase();
	if (!cmd) return null;
	return {
		cmd,
		arg: rest.join(" ").trim()
	};
}
function runEconomy(state, input, now = Date.now()) {
	const parsed = parseCommand(input);
	if (!parsed) return {
		state,
		reply: ""
	};
	const { cmd, arg } = parsed;
	if (cmd === "help" || cmd === "commands") return {
		state,
		reply: "Commands in this sandbox:\n/balance — credits on hand\n/work — odd job, 8s cooldown\n/daily — one session bonus\n/shop — catalog\n/buy <item> — spend credits\n/inv — what you hold\n/help — this list"
	};
	if (cmd === "balance" || cmd === "bal" || cmd === "credits") return {
		state,
		reply: `Balance: ${state.credits} credits.`
	};
	if (cmd === "daily") {
		if (state.dailyClaimed) return {
			state,
			reply: "Daily already claimed this session. /work still pays."
		};
		const next = {
			...state,
			credits: state.credits + 100,
			dailyClaimed: true
		};
		return {
			state: next,
			reply: "Daily claimed. +100 credits. New balance: " + next.credits + "."
		};
	}
	if (cmd === "work" || cmd === "job") {
		const wait = WORK_COOLDOWN_MS - (now - state.lastWorkAt);
		if (state.lastWorkAt && wait > 0) return {
			state,
			reply: `On cooldown. ${Math.ceil(wait / 1e3)}s. The ledger does not hustle on demand.`
		};
		const pay = 18 + Math.floor(Math.random() * 23);
		const next = {
			...state,
			credits: state.credits + pay,
			lastWorkAt: now
		};
		return {
			state: next,
			reply: `Shift complete. +${pay} credits. Balance: ${next.credits}.`
		};
	}
	if (cmd === "shop" || cmd === "store") return {
		state,
		reply: `Shop (sandbox, not billed):\n${SHOP.map((i) => `/buy ${i.id} — ${i.name} · ${i.price}c — ${i.blurb}`).join("\n")}`
	};
	if (cmd === "inv" || cmd === "inventory" || cmd === "bag") {
		if (!state.inventory.length) return {
			state,
			reply: "Inventory empty. /shop to waste credits with intention."
		};
		const counts = countItems(state.inventory);
		return {
			state,
			reply: `Inventory:\n${Object.entries(counts).map(([id, n]) => {
				return `${n}× ${SHOP.find((i) => i.id === id)?.name ?? id}`;
			}).join("\n")}`
		};
	}
	if (cmd === "buy") {
		if (!arg) return {
			state,
			reply: "Buy what? /shop first, then /buy coffee"
		};
		const item = findItem(arg);
		if (!item) return {
			state,
			reply: `No listing for “${arg}”. /shop for ids.`
		};
		if (state.credits < item.price) return {
			state,
			reply: `Need ${item.price}c. You have ${state.credits}c. /work.`
		};
		const next = {
			...state,
			credits: state.credits - item.price,
			inventory: [...state.inventory, item.id]
		};
		return {
			state: next,
			reply: `Purchased ${item.name} for ${item.price}c. Balance: ${next.credits}. /inv to gloat.`
		};
	}
	return {
		state,
		reply: ""
	};
}
function findItem(raw) {
	const q = raw.trim().toLowerCase();
	return SHOP.find((i) => i.id === q || i.name.toLowerCase() === q || i.name.toLowerCase().includes(q));
}
function countItems(ids) {
	const out = {};
	for (const id of ids) out[id] = (out[id] ?? 0) + 1;
	return out;
}
var SUITS = [
	"♠",
	"♥",
	"♦",
	"♣"
];
var RANKS = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K"
];
var REELS = [
	"7",
	"BAR",
	"◆",
	"●",
	"＋",
	"○"
];
var RED = /* @__PURE__ */ new Set([
	1,
	3,
	5,
	7,
	9,
	12,
	14,
	16,
	18,
	19,
	21,
	23,
	25,
	27,
	30,
	32,
	34,
	36
]);
function freshHouse() {
	return {
		credits: 200,
		dailyClaimed: false,
		bj: null
	};
}
function runCasino(state, input, rng = Math.random) {
	const parsed = parseCommand(input);
	if (!parsed) return {
		state,
		reply: ""
	};
	const { cmd, arg } = parsed;
	if (cmd === "help" || cmd === "commands") return {
		state,
		reply: "House — sandbox chips, not money.\n/balance — chips on hand\n/daily — +150 once per session\n/slots <bet> — three reels\n/flip heads|tails <bet>\n/dice high|low|<1-6> <bet>\n/roulette red|black|even|odd|<0-36> <bet>\n/bj <bet> — then /hit /stand /double\n/paytable — payouts\n/help"
	};
	if (cmd === "balance" || cmd === "bal" || cmd === "chips") return {
		state,
		reply: `Chips: ${state.credits}.`
	};
	if (cmd === "daily") {
		if (state.dailyClaimed) return {
			state,
			reply: "Daily already claimed this session."
		};
		const next = {
			...state,
			credits: state.credits + 150,
			dailyClaimed: true
		};
		return {
			state: next,
			reply: `Daily +150. Chips: ${next.credits}.`
		};
	}
	if (cmd === "paytable") return {
		state,
		reply: "Slots: three 7s 12×, three kind 6×, two 7s 2×, any pair 1×.\nFlip: 1.95×.\nDice high/low 1.9×, exact 5.5×.\nRoulette even-money 2×, number 36×.\nBlackjack 3:2, win 1:1, push returns the bet.\nHouse edge is real. Chips are not."
	};
	if (state.bj && [
		"hit",
		"stand",
		"double",
		"dbl"
	].includes(cmd)) return playBj(state, cmd, rng);
	if (state.bj && cmd === "bj") return {
		state,
		reply: "Hand in play. /hit, /stand, or /double."
	};
	if (cmd === "slots" || cmd === "slot" || cmd === "spin") {
		const bet = parseBet(arg, 10);
		if (!bet.ok) return {
			state,
			reply: bet.error
		};
		if (state.credits < bet.n) return {
			state,
			reply: `Need ${bet.n}c. You have ${state.credits}c.`
		};
		const a = REELS[Math.floor(rng() * REELS.length)];
		const b = REELS[Math.floor(rng() * REELS.length)];
		const c = REELS[Math.floor(rng() * REELS.length)];
		let mult = 0;
		if (a === "7" && b === "7" && c === "7") mult = 12;
		else if (a === b && b === c) mult = 6;
		else if ([
			a,
			b,
			c
		].filter((x) => x === "7").length === 2) mult = 2;
		else if (a === b || b === c || a === c) mult = 1;
		const win = Math.floor(bet.n * mult);
		const next = {
			...state,
			credits: state.credits - bet.n + win
		};
		const line = `[ ${a} | ${b} | ${c} ]`;
		if (mult === 0) return {
			state: next,
			reply: `${line}\nNo line. −${bet.n}c. Chips: ${next.credits}.`
		};
		return {
			state: next,
			reply: `${line}\n${mult}×. +${win}c. Chips: ${next.credits}.`
		};
	}
	if (cmd === "flip" || cmd === "coinflip" || cmd === "coin") {
		const parts = arg.toLowerCase().split(/\s+/).filter(Boolean);
		const side = parts[0] === "tails" || parts[0] === "t" ? "tails" : parts[0] === "heads" || parts[0] === "h" ? "heads" : "";
		const bet = parseBet(side ? parts.slice(1).join(" ") : arg, 10);
		if (!side) return {
			state,
			reply: "Call it. /flip heads 25 or /flip tails 25"
		};
		if (!bet.ok) return {
			state,
			reply: bet.error
		};
		if (state.credits < bet.n) return {
			state,
			reply: `Need ${bet.n}c. You have ${state.credits}c.`
		};
		const land = rng() < .5 ? "heads" : "tails";
		const hit = land === side;
		const win = hit ? Math.floor(bet.n * 1.95) : 0;
		const next = {
			...state,
			credits: state.credits - bet.n + win
		};
		return {
			state: next,
			reply: hit ? `${land}. You called ${side}. +${win}c. Chips: ${next.credits}.` : `${land}. You called ${side}. −${bet.n}c. Chips: ${next.credits}.`
		};
	}
	if (cmd === "dice" || cmd === "roll") {
		const parts = arg.toLowerCase().split(/\s+/).filter(Boolean);
		const pick = parts[0] ?? "";
		const rest = parts.slice(1).join(" ");
		const bet = parseBet(rest || (isNum(pick) && Number(pick) > 6 ? pick : rest), 10);
		const roll = 1 + Math.floor(rng() * 6);
		if (!pick) return {
			state,
			reply: "/dice high 20, /dice low 20, or /dice 4 20"
		};
		if (!bet.ok) return {
			state,
			reply: bet.error
		};
		if (state.credits < bet.n) return {
			state,
			reply: `Need ${bet.n}c. You have ${state.credits}c.`
		};
		let hit = false;
		let mult = 0;
		if (pick === "high" || pick === "h") {
			hit = roll >= 4;
			mult = 1.9;
		} else if (pick === "low" || pick === "l") {
			hit = roll <= 3;
			mult = 1.9;
		} else if (isNum(pick) && Number(pick) >= 1 && Number(pick) <= 6) {
			hit = roll === Number(pick);
			mult = 5.5;
		} else return {
			state,
			reply: "/dice high|low|<1-6> <bet>"
		};
		const win = hit ? Math.floor(bet.n * mult) : 0;
		const next = {
			...state,
			credits: state.credits - bet.n + win
		};
		return {
			state: next,
			reply: hit ? `Rolled ${roll}. Hit. +${win}c. Chips: ${next.credits}.` : `Rolled ${roll}. Miss. −${bet.n}c. Chips: ${next.credits}.`
		};
	}
	if (cmd === "roulette" || cmd === "rl") {
		const parts = arg.toLowerCase().split(/\s+/).filter(Boolean);
		const pick = parts[0] ?? "";
		const bet = parseBet(parts.slice(1).join(" "), 10);
		if (!pick) return {
			state,
			reply: "/roulette red 10, /roulette black 10, /roulette 17 10"
		};
		if (!bet.ok) return {
			state,
			reply: bet.error
		};
		if (state.credits < bet.n) return {
			state,
			reply: `Need ${bet.n}c. You have ${state.credits}c.`
		};
		const n = Math.floor(rng() * 37);
		const color = n === 0 ? "green" : RED.has(n) ? "red" : "black";
		let hit = false;
		let mult = 0;
		if (pick === "red" || pick === "black") {
			hit = color === pick;
			mult = 2;
		} else if (pick === "even") {
			hit = n !== 0 && n % 2 === 0;
			mult = 2;
		} else if (pick === "odd") {
			hit = n % 2 === 1;
			mult = 2;
		} else if (isNum(pick) && Number(pick) >= 0 && Number(pick) <= 36) {
			hit = n === Number(pick);
			mult = 36;
		} else return {
			state,
			reply: "/roulette red|black|even|odd|<0-36> <bet>"
		};
		const win = hit ? bet.n * mult : 0;
		const next = {
			...state,
			credits: state.credits - bet.n + win
		};
		const pocket = n === 0 ? "0 green" : `${n} ${color}`;
		return {
			state: next,
			reply: hit ? `${pocket}. Hit. +${win}c. Chips: ${next.credits}.` : `${pocket}. Miss. −${bet.n}c. Chips: ${next.credits}.`
		};
	}
	if (cmd === "bj" || cmd === "blackjack") {
		const bet = parseBet(arg, 25);
		if (!bet.ok) return {
			state,
			reply: bet.error
		};
		if (state.credits < bet.n) return {
			state,
			reply: `Need ${bet.n}c. You have ${state.credits}c.`
		};
		const player = [draw(rng), draw(rng)];
		const dealer = [draw(rng), draw(rng)];
		const p = handValue(player);
		const d = handValue(dealer);
		if (p.total === 21 || d.total === 21) return settleBj({
			...state,
			credits: state.credits - bet.n,
			bj: {
				bet: bet.n,
				player,
				dealer,
				stand: true
			}
		}, rng, true);
		return {
			state: {
				...state,
				credits: state.credits - bet.n,
				bj: {
					bet: bet.n,
					player,
					dealer,
					stand: false
				}
			},
			reply: `Your ${fmtHand(player)} (${p.total}). Dealer shows ${fmtCard(dealer[0])}. /hit /stand /double`
		};
	}
	return {
		state,
		reply: ""
	};
}
function playBj(state, cmd, rng) {
	const bj = state.bj;
	if (!bj || bj.stand) return {
		state,
		reply: "No hand. /bj <bet>"
	};
	if (cmd === "double" || cmd === "dbl") {
		if (bj.player.length !== 2) return {
			state,
			reply: "Double only on the first two cards."
		};
		if (state.credits < bj.bet) return {
			state,
			reply: `Need ${bj.bet}c more to double.`
		};
		const player = [...bj.player, draw(rng)];
		return settleBj({
			...state,
			credits: state.credits - bj.bet,
			bj: {
				...bj,
				bet: bj.bet * 2,
				player,
				stand: true
			}
		}, rng, false);
	}
	if (cmd === "hit") {
		const player = [...bj.player, draw(rng)];
		const v = handValue(player);
		const next = {
			...state,
			bj: {
				...bj,
				player
			}
		};
		if (v.total > 21) return settleBj({
			...next,
			bj: {
				...next.bj,
				stand: true
			}
		}, rng, false);
		return {
			state: next,
			reply: `Your ${fmtHand(player)} (${v.total}). Dealer shows ${fmtCard(bj.dealer[0])}. /hit or /stand`
		};
	}
	return settleBj({
		...state,
		bj: {
			...bj,
			stand: true
		}
	}, rng, false);
}
function settleBj(state, rng, opening) {
	const bj = state.bj;
	if (!bj) return {
		state,
		reply: "No hand."
	};
	let dealer = [...bj.dealer];
	if (!opening || handValue(bj.player).total <= 21) while (handValue(dealer).total < 17) dealer = [...dealer, draw(rng)];
	const p = handValue(bj.player).total;
	const d = handValue(dealer).total;
	const pBj = opening && p === 21 && bj.player.length === 2;
	const dBj = opening && d === 21 && dealer.length === 2;
	let delta = 0;
	let line = "";
	if (p > 21) line = "Bust.";
	else if (pBj && !dBj) {
		delta = Math.floor(bj.bet * 2.5);
		line = "Blackjack. 3:2.";
	} else if (dBj && !pBj) line = "Dealer blackjack.";
	else if (d > 21 || p > d) {
		delta = bj.bet * 2;
		line = d > 21 ? "Dealer bust." : "You win.";
	} else if (p === d) {
		delta = bj.bet;
		line = "Push.";
	} else line = "Dealer wins.";
	const next = {
		...state,
		credits: state.credits + delta,
		bj: null
	};
	return {
		state: next,
		reply: `${line}\nYou ${fmtHand(bj.player)} (${p}). Dealer ${fmtHand(dealer)} (${d}). Chips: ${next.credits}.`
	};
}
function draw(rng) {
	return {
		r: 1 + Math.floor(rng() * 13),
		s: Math.floor(rng() * 4)
	};
}
function fmtCard(c) {
	return `${RANKS[c.r - 1]}${SUITS[c.s]}`;
}
function fmtHand(cards) {
	return cards.map(fmtCard).join(" ");
}
function handValue(cards) {
	let total = 0;
	let aces = 0;
	for (const c of cards) if (c.r === 1) {
		aces += 1;
		total += 11;
	} else if (c.r >= 10) total += 10;
	else total += c.r;
	while (total > 21 && aces > 0) {
		total -= 10;
		aces -= 1;
	}
	return { total };
}
function parseBet(raw, fallback) {
	const t = raw.trim();
	if (!t) return {
		ok: true,
		n: fallback
	};
	const n = Number(t);
	if (!Number.isFinite(n) || n < 1 || n > 500) return {
		ok: false,
		error: "Bet 1–500 chips."
	};
	return {
		ok: true,
		n: Math.floor(n)
	};
}
function isNum(v) {
	return v !== "" && Number.isFinite(Number(v));
}
var MAX_TURNS = 12;
function BotPlayground({ bot }) {
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: bot.welcome,
		local: true
	}]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [ledger, setLedger] = (0, import_react.useState)(freshLedger);
	const [house, setHouse] = (0, import_react.useState)(freshHouse);
	const scroller = (0, import_react.useRef)(null);
	const turns = messages.filter((m) => m.role === "user").length;
	const localKind = bot.kind === "economy" || bot.kind === "casino";
	const capped = turns >= MAX_TURNS;
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [messages, busy]);
	async function send(textRaw) {
		const text = (textRaw ?? draft).trim();
		if (!text || busy) return;
		const slash = parseCommand(text);
		if (capped && !(localKind && slash)) return;
		setDraft("");
		setError(null);
		if (bot.kind === "economy" && slash) {
			const result = runEconomy(ledger, text);
			setLedger(result.state);
			const reply = result.reply || `${bot.name} does not know that command. /help`;
			setMessages((m) => [
				...m,
				{
					role: "user",
					content: text
				},
				{
					role: "assistant",
					content: reply,
					local: true
				}
			]);
			return;
		}
		if (bot.kind === "casino" && slash) {
			const result = runCasino(house, text);
			setHouse(result.state);
			const reply = result.reply || `${bot.name} does not know that command. /help`;
			setMessages((m) => [
				...m,
				{
					role: "user",
					content: text
				},
				{
					role: "assistant",
					content: reply,
					local: true
				}
			]);
			return;
		}
		const next = [...messages, {
			role: "user",
			content: text
		}];
		setMessages(next);
		setBusy(true);
		try {
			const payload = next.filter((m) => !m.local || m.role === "user").map((m) => ({
				role: m.role,
				content: m.content.slice(0, 500)
			}));
			const res = await talkToBot({ data: {
				slug: bot.slug,
				messages: payload
			} });
			if (!res.ok) {
				setError(res.error);
				return;
			}
			setMessages([...next, {
				role: "assistant",
				content: res.text
			}]);
		} catch {
			setError("Could not reach the demo.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-[var(--radius-xl)] bg-bg-elevated shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: bot.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.14em] text-signal",
					children: [bot.channel, " · sandbox · live"]
				})] }), bot.kind === "casino" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm tabular-nums text-fg-muted",
					children: [house.credits, " chips"]
				}) : bot.kind === "economy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm tabular-nums text-fg-muted",
					children: [ledger.credits, "c"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-2 rounded-full bg-signal",
					"aria-hidden": true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "h-[min(28rem,62vh)] space-y-4 overflow-y-auto px-4 py-4 sm:px-5",
				children: [messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn(m.role === "user" ? "text-right" : "text-left"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-wider text-fg-subtle",
						children: m.role === "user" ? "You" : bot.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 inline-block max-w-[min(100%,36rem)] whitespace-pre-wrap text-left text-sm leading-relaxed", m.role === "user" ? "text-fg" : "text-fg-muted"),
						children: m.content
					})]
				}, `${i}-${m.role}`)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[11px] text-fg-subtle",
					children: [bot.name, " is typing…"]
				}) : null]
			}),
			bot.starters.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 border-t border-border px-4 py-3 sm:px-5",
				children: bot.starters.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy || capped && !parseCommand(s),
					onClick: () => void send(s),
					className: "h-9 rounded-full px-3 font-mono text-[11px] text-fg-muted shadow-[var(--shadow-border)] hover:text-fg disabled:opacity-40",
					children: s
				}, s))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					maxLength: 500,
					disabled: busy || capped && !parseCommand(draft),
					placeholder: capped && !localKind ? "Session cap reached" : bot.kind === "casino" ? "Type /slots 10 or /bj 25" : bot.kind === "economy" ? "Type /work or ask a question" : `Message ${bot.name}`,
					className: "h-11 min-w-0 flex-1 rounded-[var(--radius-md)] bg-bg px-3 text-sm outline-none shadow-[var(--shadow-border)] placeholder:text-fg-subtle disabled:opacity-50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: busy || !draft.trim() || capped && !parseCommand(draft),
					className: "h-11 px-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Send"
					})]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-3 text-xs text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-4 pb-4 text-[11px] leading-relaxed text-fg-subtle",
				children: [
					"Sandbox — nothing persists. ",
					bot.kind === "casino" ? "Chips are not money. " : null,
					bot.productSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Want this on your server?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/store/$slug",
							params: { slug: bot.productSlug },
							className: "text-fg-muted hover:text-fg",
							children: "The template"
						}),
						" ",
						"or ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							className: "text-fg-muted hover:text-fg",
							children: "open a brief"
						}),
						"."
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Custom build: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							className: "text-fg-muted hover:text-fg",
							children: "open a brief"
						}),
						"."
					] })
				]
			})
		]
	});
}
function DemoPage() {
	const bot = Route$19.useLoaderData();
	const { bots, products, settings } = useSite();
	const product = products.find((p) => p.slug === bot.productSlug);
	const others = bots.filter((b) => b.slug !== bot.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: graph([
				organization(settings),
				{
					"@type": "SoftwareApplication",
					name: bot.name,
					applicationCategory: "DeveloperApplication",
					operatingSystem: "Web",
					description: bot.description,
					url: `https://n3xuskonc3ptz.com/lab/${bot.slug}`,
					offers: {
						"@type": "Offer",
						price: "0",
						priceCurrency: "USD"
					}
				},
				breadcrumbs(settings, [
					{
						name: "Home",
						path: "/"
					},
					{
						name: "Lab",
						path: "/lab"
					},
					{
						name: bot.name,
						path: `/lab/${bot.slug}`
					}
				])
			]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crumbs, { items: [
				{
					label: "Home",
					to: "/"
				},
				{
					label: "Lab",
					to: "/lab"
				},
				{ label: bot.name }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/lab",
				className: "mt-6 inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Lab"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle",
						children: [
							bot.channel,
							" · ",
							bot.kind === "chat" ? "conversational" : "playable"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-4xl font-light tracking-tight sm:text-5xl",
						children: bot.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-fg-muted",
						children: bot.description
					}),
					bot.commands.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8 grid gap-3 sm:grid-cols-2",
						children: bot.commands.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[var(--radius-md)] px-3 py-3 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-sm",
								children: c.cmd
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-xs text-fg-muted",
								children: c.hint
							})]
						}, c.cmd))
					}) : null,
					product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-sm text-fg-muted",
						children: [
							"Ships as",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/store/$slug",
								params: { slug: product.slug },
								className: "text-fg hover:underline",
								children: product.name
							}),
							"."
						]
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotPlayground, { bot })]
			}),
			others.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "Other demos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: others.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/lab/$slug",
						params: { slug: b.slug },
						className: "flex justify-between gap-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-fg-subtle",
							children: b.channel
						})]
					}) }, b.slug))
				})]
			}) : null
		]
	});
}
//#endregion
export { DemoPage as component };
