import { parseCommand } from "./economy.ts";

export type House = {
  credits: number;
  dailyClaimed: boolean;
  bj: Blackjack | null;
};

export type Blackjack = {
  bet: number;
  player: Card[];
  dealer: Card[];
  stand: boolean;
};

export type Card = { r: number; s: number };

export type Rng = () => number;

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const REELS = ["7", "BAR", "◆", "●", "＋", "○"];
const RED = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export function freshHouse(): House {
  return { credits: 200, dailyClaimed: false, bj: null };
}

export function runCasino(state: House, input: string, rng: Rng = Math.random): { state: House; reply: string } {
  const parsed = parseCommand(input);
  if (!parsed) return { state, reply: "" };
  const { cmd, arg } = parsed;

  if (cmd === "help" || cmd === "commands") {
    return {
      state,
      reply:
        "House — sandbox chips, not money.\n/balance — chips on hand\n/daily — +150 once per session\n/slots <bet> — three reels\n/flip heads|tails <bet>\n/dice high|low|<1-6> <bet>\n/roulette red|black|even|odd|<0-36> <bet>\n/bj <bet> — then /hit /stand /double\n/paytable — payouts\n/help",
    };
  }
  if (cmd === "balance" || cmd === "bal" || cmd === "chips") {
    return { state, reply: `Chips: ${state.credits}.` };
  }
  if (cmd === "daily") {
    if (state.dailyClaimed) return { state, reply: "Daily already claimed this session." };
    const next = { ...state, credits: state.credits + 150, dailyClaimed: true };
    return { state: next, reply: `Daily +150. Chips: ${next.credits}.` };
  }
  if (cmd === "paytable") {
    return {
      state,
      reply:
        "Slots: three 7s 12×, three kind 6×, two 7s 2×, any pair 1×.\nFlip: 1.95×.\nDice high/low 1.9×, exact 5.5×.\nRoulette even-money 2×, number 36×.\nBlackjack 3:2, win 1:1, push returns the bet.\nHouse edge is real. Chips are not.",
    };
  }

  if (state.bj && ["hit", "stand", "double", "dbl"].includes(cmd)) {
    return playBj(state, cmd, rng);
  }
  if (state.bj && cmd === "bj") {
    return { state, reply: "Hand in play. /hit, /stand, or /double." };
  }

  if (cmd === "slots" || cmd === "slot" || cmd === "spin") {
    const bet = parseBet(arg, 10);
    if (!bet.ok) return { state, reply: bet.error };
    if (state.credits < bet.n) return { state, reply: `Need ${bet.n}c. You have ${state.credits}c.` };
    const a = REELS[Math.floor(rng() * REELS.length)]!;
    const b = REELS[Math.floor(rng() * REELS.length)]!;
    const c = REELS[Math.floor(rng() * REELS.length)]!;
    let mult = 0;
    if (a === "7" && b === "7" && c === "7") mult = 12;
    else if (a === b && b === c) mult = 6;
    else if ([a, b, c].filter((x) => x === "7").length === 2) mult = 2;
    else if (a === b || b === c || a === c) mult = 1;
    const win = Math.floor(bet.n * mult);
    const next = { ...state, credits: state.credits - bet.n + win };
    const line = `[ ${a} | ${b} | ${c} ]`;
    if (mult === 0) return { state: next, reply: `${line}\nNo line. −${bet.n}c. Chips: ${next.credits}.` };
    return { state: next, reply: `${line}\n${mult}×. +${win}c. Chips: ${next.credits}.` };
  }

  if (cmd === "flip" || cmd === "coinflip" || cmd === "coin") {
    const parts = arg.toLowerCase().split(/\s+/).filter(Boolean);
    const side = parts[0] === "tails" || parts[0] === "t" ? "tails" : parts[0] === "heads" || parts[0] === "h" ? "heads" : "";
    const bet = parseBet(side ? parts.slice(1).join(" ") : arg, 10);
    if (!side) return { state, reply: "Call it. /flip heads 25 or /flip tails 25" };
    if (!bet.ok) return { state, reply: bet.error };
    if (state.credits < bet.n) return { state, reply: `Need ${bet.n}c. You have ${state.credits}c.` };
    const land = rng() < 0.5 ? "heads" : "tails";
    const hit = land === side;
    const win = hit ? Math.floor(bet.n * 1.95) : 0;
    const next = { ...state, credits: state.credits - bet.n + win };
    return {
      state: next,
      reply: hit
        ? `${land}. You called ${side}. +${win}c. Chips: ${next.credits}.`
        : `${land}. You called ${side}. −${bet.n}c. Chips: ${next.credits}.`,
    };
  }

  if (cmd === "dice" || cmd === "roll") {
    const parts = arg.toLowerCase().split(/\s+/).filter(Boolean);
    const pick = parts[0] ?? "";
    const rest = parts.slice(1).join(" ");
    const bet = parseBet(rest || (isNum(pick) && Number(pick) > 6 ? pick : rest), 10);
    const roll = 1 + Math.floor(rng() * 6);
    if (!pick) return { state, reply: "/dice high 20, /dice low 20, or /dice 4 20" };
    if (!bet.ok) return { state, reply: bet.error };
    if (state.credits < bet.n) return { state, reply: `Need ${bet.n}c. You have ${state.credits}c.` };
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
    } else {
      return { state, reply: "/dice high|low|<1-6> <bet>" };
    }
    const win = hit ? Math.floor(bet.n * mult) : 0;
    const next = { ...state, credits: state.credits - bet.n + win };
    return {
      state: next,
      reply: hit
        ? `Rolled ${roll}. Hit. +${win}c. Chips: ${next.credits}.`
        : `Rolled ${roll}. Miss. −${bet.n}c. Chips: ${next.credits}.`,
    };
  }

  if (cmd === "roulette" || cmd === "rl") {
    const parts = arg.toLowerCase().split(/\s+/).filter(Boolean);
    const pick = parts[0] ?? "";
    const bet = parseBet(parts.slice(1).join(" "), 10);
    if (!pick) return { state, reply: "/roulette red 10, /roulette black 10, /roulette 17 10" };
    if (!bet.ok) return { state, reply: bet.error };
    if (state.credits < bet.n) return { state, reply: `Need ${bet.n}c. You have ${state.credits}c.` };
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
    } else {
      return { state, reply: "/roulette red|black|even|odd|<0-36> <bet>" };
    }
    const win = hit ? bet.n * mult : 0;
    const next = { ...state, credits: state.credits - bet.n + win };
    const pocket = n === 0 ? "0 green" : `${n} ${color}`;
    return {
      state: next,
      reply: hit
        ? `${pocket}. Hit. +${win}c. Chips: ${next.credits}.`
        : `${pocket}. Miss. −${bet.n}c. Chips: ${next.credits}.`,
    };
  }

  if (cmd === "bj" || cmd === "blackjack") {
    const bet = parseBet(arg, 25);
    if (!bet.ok) return { state, reply: bet.error };
    if (state.credits < bet.n) return { state, reply: `Need ${bet.n}c. You have ${state.credits}c.` };
    const player = [draw(rng), draw(rng)];
    const dealer = [draw(rng), draw(rng)];
    const p = handValue(player);
    const d = handValue(dealer);
    if (p.total === 21 || d.total === 21) {
      return settleBj({ ...state, credits: state.credits - bet.n, bj: { bet: bet.n, player, dealer, stand: true } }, rng, true);
    }
    const next: House = {
      ...state,
      credits: state.credits - bet.n,
      bj: { bet: bet.n, player, dealer, stand: false },
    };
    return {
      state: next,
      reply: `Your ${fmtHand(player)} (${p.total}). Dealer shows ${fmtCard(dealer[0]!)}. /hit /stand /double`,
    };
  }

  return { state, reply: "" };
}

function playBj(state: House, cmd: string, rng: Rng): { state: House; reply: string } {
  const bj = state.bj;
  if (!bj || bj.stand) return { state, reply: "No hand. /bj <bet>" };
  if (cmd === "double" || cmd === "dbl") {
    if (bj.player.length !== 2) return { state, reply: "Double only on the first two cards." };
    if (state.credits < bj.bet) return { state, reply: `Need ${bj.bet}c more to double.` };
    const player = [...bj.player, draw(rng)];
    const next: House = {
      ...state,
      credits: state.credits - bj.bet,
      bj: { ...bj, bet: bj.bet * 2, player, stand: true },
    };
    return settleBj(next, rng, false);
  }
  if (cmd === "hit") {
    const player = [...bj.player, draw(rng)];
    const v = handValue(player);
    const next: House = { ...state, bj: { ...bj, player } };
    if (v.total > 21) return settleBj({ ...next, bj: { ...next.bj!, stand: true } }, rng, false);
    return {
      state: next,
      reply: `Your ${fmtHand(player)} (${v.total}). Dealer shows ${fmtCard(bj.dealer[0]!)}. /hit or /stand`,
    };
  }
  return settleBj({ ...state, bj: { ...bj, stand: true } }, rng, false);
}

function settleBj(state: House, rng: Rng, opening: boolean): { state: House; reply: string } {
  const bj = state.bj;
  if (!bj) return { state, reply: "No hand." };
  let dealer = [...bj.dealer];
  if (!opening || handValue(bj.player).total <= 21) {
    while (handValue(dealer).total < 17) dealer = [...dealer, draw(rng)];
  }
  const p = handValue(bj.player).total;
  const d = handValue(dealer).total;
  const pBj = opening && p === 21 && bj.player.length === 2;
  const dBj = opening && d === 21 && dealer.length === 2;
  let delta = 0;
  let line = "";
  if (p > 21) {
    line = "Bust.";
  } else if (pBj && !dBj) {
    delta = Math.floor(bj.bet * 2.5);
    line = "Blackjack. 3:2.";
  } else if (dBj && !pBj) {
    line = "Dealer blackjack.";
  } else if (d > 21 || p > d) {
    delta = bj.bet * 2;
    line = d > 21 ? "Dealer bust." : "You win.";
  } else if (p === d) {
    delta = bj.bet;
    line = "Push.";
  } else {
    line = "Dealer wins.";
  }
  const next: House = { ...state, credits: state.credits + delta, bj: null };
  return {
    state: next,
    reply: `${line}\nYou ${fmtHand(bj.player)} (${p}). Dealer ${fmtHand(dealer)} (${d}). Chips: ${next.credits}.`,
  };
}

function draw(rng: Rng): Card {
  return { r: 1 + Math.floor(rng() * 13), s: Math.floor(rng() * 4) };
}

function fmtCard(c: Card) {
  return `${RANKS[c.r - 1]}${SUITS[c.s]}`;
}

function fmtHand(cards: Card[]) {
  return cards.map(fmtCard).join(" ");
}

function handValue(cards: Card[]): { total: number } {
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    if (c.r === 1) {
      aces += 1;
      total += 11;
    } else if (c.r >= 10) total += 10;
    else total += c.r;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return { total };
}

function parseBet(raw: string, fallback: number): { ok: true; n: number } | { ok: false; error: string } {
  const t = raw.trim();
  if (!t) return { ok: true, n: fallback };
  const n = Number(t);
  if (!Number.isFinite(n) || n < 1 || n > 500) return { ok: false, error: "Bet 1–500 chips." };
  return { ok: true, n: Math.floor(n) };
}

function isNum(v: string) {
  return v !== "" && Number.isFinite(Number(v));
}
