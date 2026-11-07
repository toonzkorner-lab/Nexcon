import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  advanceBrief,
  briefPayload,
  isBriefIntent,
  startBrief,
  type BriefState,
} from "./brief-flow.ts";

const GROUPS = ["Build", "Automate", "Host", "Amplify"];

function runFlow(answers: string[]): { state: BriefState; submit: boolean } {
  let { state } = startBrief(GROUPS);
  let submit = false;
  for (const a of answers) {
    const res = advanceBrief(state, a, GROUPS);
    state = res.state;
    submit = res.submit;
    if (res.cancelled) break;
  }
  return { state, submit };
}

describe("isBriefIntent", () => {
  it("detects booking intent", () => {
    assert.equal(isBriefIntent("I want to start a project"), true);
    assert.equal(isBriefIntent("Can you build me a bot?"), true);
    assert.equal(isBriefIntent("I need a Discord bot"), true);
  });

  it("does not fire on questions or prices", () => {
    assert.equal(isBriefIntent("What is TypeScript?"), false);
    assert.equal(isBriefIntent("How much is a Discord bot?"), false);
    assert.equal(isBriefIntent("What are your hours?"), false);
  });
});

describe("brief flow", () => {
  it("walks the happy path to submit", () => {
    const { state, submit } = runFlow([
      "Automate",
      "$500–2k",
      "This month",
      "Test Person",
      "test@example.com",
      "skip",
      "yes",
    ]);
    assert.equal(submit, true);
    const payload = briefPayload(state);
    assert.deepEqual(payload.groups, ["Automate"]);
    assert.equal(payload.budget, "$500–2k");
    assert.equal(payload.timeline, "This month");
    assert.equal(payload.name, "Test Person");
    assert.equal(payload.email, "test@example.com");
    assert.equal(payload.channel, "Core chat");
    assert.equal(payload.notes, "");
  });

  it("matches a group by number and keeps free-text budget", () => {
    const { state, submit } = runFlow(["2", "around 1000", "ASAP", "A", "a@b.co", "skip", "yes"]);
    assert.equal(submit, true);
    assert.deepEqual(briefPayload(state).groups, ["Automate"]);
    assert.equal(briefPayload(state).budget, "around 1000");
  });

  it("rejects a bad email and stays on that step", () => {
    let { state } = startBrief(GROUPS);
    for (const a of ["Build", "$500–2k", "ASAP", "A"]) {
      state = advanceBrief(state, a, GROUPS).state;
    }
    const bad = advanceBrief(state, "not-an-email", GROUPS);
    assert.equal(bad.state.step, "email");
    assert.match(bad.reply, /doesn't look right/);
    const good = advanceBrief(bad.state, "a@b.co", GROUPS);
    assert.equal(good.state.step, "notes");
  });

  it("cancels at any step", () => {
    const { state } = startBrief(GROUPS);
    const res = advanceBrief(state, "cancel", GROUPS);
    assert.equal(res.cancelled, true);
    assert.equal(res.submit, false);
  });

  it("restarts when the visitor says no at confirm", () => {
    let { state } = startBrief(GROUPS);
    for (const a of ["Build", "Not sure", "Exploring", "A", "a@b.co", "skip"]) {
      state = advanceBrief(state, a, GROUPS).state;
    }
    assert.equal(state.step, "confirm");
    const res = advanceBrief(state, "no", GROUPS);
    assert.equal(res.state.step, "groups");
    assert.equal(res.submit, false);
  });
});
