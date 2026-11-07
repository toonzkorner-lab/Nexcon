import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findKnowledge, normalizeQuery } from "./knowledge.ts";

describe("findKnowledge", () => {
  it("answers a Discord bot how-to", () => {
    const match = findKnowledge("How do I make a Discord bot?");
    assert.equal(match?.entry.id, "discord-bot-howto");
  });

  it("answers what-is questions", () => {
    assert.equal(findKnowledge("What is TypeScript?")?.entry.id, "what-is-typescript");
    assert.equal(findKnowledge("what is an api")?.entry.id, "what-is-api");
    assert.equal(findKnowledge("what is async await")?.entry.id, "async-await");
  });

  it("answers a CSS centering question", () => {
    assert.equal(findKnowledge("how to center a div")?.entry.id, "flexbox-grid");
  });

  it("answers a Telegram bot question", () => {
    assert.equal(findKnowledge("how do I make a telegram bot")?.entry.id, "telegram-bot-howto");
  });

  it("does not match a lone generic word", () => {
    assert.equal(findKnowledge("bot"), null);
    assert.equal(findKnowledge("code"), null);
  });

  it("does not match empty input", () => {
    assert.equal(findKnowledge("   "), null);
  });
});

describe("normalizeQuery", () => {
  it("lowercases and strips punctuation", () => {
    assert.equal(normalizeQuery("  How DO I?? Make-A Bot! "), "how do i make a bot");
  });
});
