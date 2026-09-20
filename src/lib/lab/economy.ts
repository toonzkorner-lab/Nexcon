export type ShopItem = { id: string; name: string; price: number; blurb: string };

export type Ledger = {
  credits: number;
  inventory: string[];
  lastWorkAt: number;
  dailyClaimed: boolean;
};

export const SHOP: ShopItem[] = [
  { id: "coffee", name: "Coffee", price: 25, blurb: "Hot. Does nothing. Looks expensive." },
  { id: "sticker", name: "Neon sticker", price: 15, blurb: "The one we refuse to put on the site." },
  { id: "keycard", name: "Keycard", price: 80, blurb: "Access to a room that is also this sandbox." },
  { id: "vault", name: "Vault slot", price: 120, blurb: "Stores the other things. Very meta." },
];

export const WORK_COOLDOWN_MS = 8_000;

export function freshLedger(): Ledger {
  return { credits: 50, inventory: [], lastWorkAt: 0, dailyClaimed: false };
}

export function parseCommand(input: string): { cmd: string; arg: string } | null {
  const raw = input.trim();
  if (!raw.startsWith("/")) return null;
  const [head, ...rest] = raw.slice(1).split(/\s+/);
  const cmd = (head ?? "").toLowerCase();
  if (!cmd) return null;
  return { cmd, arg: rest.join(" ").trim() };
}

export function runEconomy(state: Ledger, input: string, now = Date.now()): { state: Ledger; reply: string } {
  const parsed = parseCommand(input);
  if (!parsed) {
    return { state, reply: "" };
  }
  const { cmd, arg } = parsed;
  if (cmd === "help" || cmd === "commands") {
    return {
      state,
      reply:
        "Commands in this sandbox:\n/balance — credits on hand\n/work — odd job, 8s cooldown\n/daily — one session bonus\n/shop — catalog\n/buy <item> — spend credits\n/inv — what you hold\n/help — this list",
    };
  }
  if (cmd === "balance" || cmd === "bal" || cmd === "credits") {
    return { state, reply: `Balance: ${state.credits} credits.` };
  }
  if (cmd === "daily") {
    if (state.dailyClaimed) {
      return { state, reply: "Daily already claimed this session. /work still pays." };
    }
    const next = { ...state, credits: state.credits + 100, dailyClaimed: true };
    return { state: next, reply: "Daily claimed. +100 credits. New balance: " + next.credits + "." };
  }
  if (cmd === "work" || cmd === "job") {
    const wait = WORK_COOLDOWN_MS - (now - state.lastWorkAt);
    if (state.lastWorkAt && wait > 0) {
      const secs = Math.ceil(wait / 1000);
      return { state, reply: `On cooldown. ${secs}s. The ledger does not hustle on demand.` };
    }
    const pay = 18 + Math.floor(Math.random() * 23);
    const next = { ...state, credits: state.credits + pay, lastWorkAt: now };
    return { state: next, reply: `Shift complete. +${pay} credits. Balance: ${next.credits}.` };
  }
  if (cmd === "shop" || cmd === "store") {
    const lines = SHOP.map((i) => `/${"buy"} ${i.id} — ${i.name} · ${i.price}c — ${i.blurb}`).join("\n");
    return { state, reply: `Shop (sandbox, not billed):\n${lines}` };
  }
  if (cmd === "inv" || cmd === "inventory" || cmd === "bag") {
    if (!state.inventory.length) return { state, reply: "Inventory empty. /shop to waste credits with intention." };
    const counts = countItems(state.inventory);
    const lines = Object.entries(counts)
      .map(([id, n]) => {
        const item = SHOP.find((i) => i.id === id);
        return `${n}× ${item?.name ?? id}`;
      })
      .join("\n");
    return { state, reply: `Inventory:\n${lines}` };
  }
  if (cmd === "buy") {
    if (!arg) return { state, reply: "Buy what? /shop first, then /buy coffee" };
    const item = findItem(arg);
    if (!item) return { state, reply: `No listing for “${arg}”. /shop for ids.` };
    if (state.credits < item.price) {
      return { state, reply: `Need ${item.price}c. You have ${state.credits}c. /work.` };
    }
    const next: Ledger = {
      ...state,
      credits: state.credits - item.price,
      inventory: [...state.inventory, item.id],
    };
    return {
      state: next,
      reply: `Purchased ${item.name} for ${item.price}c. Balance: ${next.credits}. /inv to gloat.`,
    };
  }
  return { state, reply: "" };
}

function findItem(raw: string): ShopItem | undefined {
  const q = raw.trim().toLowerCase();
  return SHOP.find((i) => i.id === q || i.name.toLowerCase() === q || i.name.toLowerCase().includes(q));
}

function countItems(ids: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const id of ids) out[id] = (out[id] ?? 0) + 1;
  return out;
}
