import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { WORK_COOLDOWN_MS, freshLedger, parseCommand, runEconomy } from "./economy.ts";

describe("economy sandbox", () => {
  it("parses slash commands and ignores chatter", () => {
    assert.deepEqual(parseCommand("/buy coffee"), { cmd: "buy", arg: "coffee" });
    assert.equal(parseCommand("hey ledger"), null);
  });

  it("starts with a float and pays work", () => {
    const start = freshLedger();
    assert.equal(start.credits, 50);
    const { state, reply } = runEconomy(start, "/work", 1_000);
    assert.ok(state.credits > 50);
    assert.match(reply, /Shift complete/);
    const blocked = runEconomy(state, "/work", 1_000 + WORK_COOLDOWN_MS - 1);
    assert.match(blocked.reply, /cooldown/i);
    assert.equal(blocked.state.credits, state.credits);
  });

  it("buys from the shop and refuses poor wallets", () => {
    const broke = { ...freshLedger(), credits: 10 };
    const no = runEconomy(broke, "/buy coffee");
    assert.match(no.reply, /Need 25c/);
    const rich = { ...freshLedger(), credits: 200 };
    const yes = runEconomy(rich, "/buy coffee");
    assert.equal(yes.state.credits, 175);
    assert.deepEqual(yes.state.inventory, ["coffee"]);
  });

  it("claims daily once per session", () => {
    const a = runEconomy(freshLedger(), "/daily");
    assert.equal(a.state.credits, 150);
    const b = runEconomy(a.state, "/daily");
    assert.match(b.reply, /already claimed/);
    assert.equal(b.state.credits, 150);
  });
});
