import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { freshHouse, runCasino } from "./casino.ts";

function seq(values: number[]): () => number {
  let i = 0;
  return () => {
    const v = values[Math.min(i, values.length - 1)] ?? 0;
    i += 1;
    return v;
  };
}

describe("house casino", () => {
  it("starts with a 200 chip float and refuses poor bets", () => {
    const start = freshHouse();
    assert.equal(start.credits, 200);
    const no = runCasino({ ...start, credits: 5 }, "/slots 10");
    assert.match(no.reply, /Need 10c/);
    assert.equal(no.state.credits, 5);
  });

  it("pays three 7s on slots", () => {
    const rng = seq([0, 0, 0]);
    const { state, reply } = runCasino(freshHouse(), "/slots 10", rng);
    assert.match(reply, /7/);
    assert.match(reply, /12×/);
    assert.equal(state.credits, 200 - 10 + 120);
  });

  it("resolves a called coinflip", () => {
    const win = runCasino(freshHouse(), "/flip heads 20", seq([0.1]));
    assert.match(win.reply, /heads/);
    assert.ok(win.state.credits > 200);
    const lose = runCasino(freshHouse(), "/flip heads 20", seq([0.9]));
    assert.match(lose.reply, /tails/);
    assert.equal(lose.state.credits, 180);
  });

  it("plays blackjack hit-to-bust", () => {
    // player 10, 10 (20), dealer 10 showing; hit draws 10 → 30 bust
    const rng = seq([0.75, 0, 0.75, 0, 0.75, 0, 0.75, 0, 0.75, 0]);
    const dealt = runCasino(freshHouse(), "/bj 25", rng);
    assert.match(dealt.reply, /\/hit/);
    const bust = runCasino(dealt.state, "/hit", rng);
    assert.match(bust.reply, /Bust/);
    assert.equal(bust.state.credits, 175);
    assert.equal(bust.state.bj, null);
  });
});
