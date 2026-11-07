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

  it("answers the new fundamentals topics", () => {
    assert.equal(findKnowledge("What is Python?")?.entry.id, "python");
    assert.equal(findKnowledge("how do I write a for loop")?.entry.id, "loops");
    assert.equal(findKnowledge("what is an if else statement")?.entry.id, "conditionals");
    assert.equal(findKnowledge("how do I handle errors with try catch")?.entry.id, "error-handling");
    assert.equal(findKnowledge("what is a class in OOP")?.entry.id, "classes-oop");
    assert.equal(findKnowledge("how do I import a module")?.entry.id, "modules-imports");
    assert.equal(findKnowledge("how do I parse JSON")?.entry.id, "json-deep");
  });

  it("answers the new web and data topics", () => {
    assert.equal(findKnowledge("what does a 404 error mean")?.entry.id, "http-status-codes");
    assert.equal(findKnowledge("what is CORS")?.entry.id, "cors");
    assert.equal(findKnowledge("frontend vs backend")?.entry.id, "frontend-backend");
    assert.equal(findKnowledge("what is a server")?.entry.id, "what-is-server");
    assert.equal(findKnowledge("how does DNS work")?.entry.id, "domains-dns");
    assert.equal(findKnowledge("what is HTTPS")?.entry.id, "ssl-https");
    assert.equal(findKnowledge("how do I rank on Google")?.entry.id, "seo-basics");
    assert.equal(findKnowledge("how do I join two tables in SQL")?.entry.id, "sql-joins");
    assert.equal(findKnowledge("how do I hash a password")?.entry.id, "password-hashing");
    assert.equal(findKnowledge("what is a JWT")?.entry.id, "jwt-auth");
  });

  it("answers the new practice and bot topics", () => {
    assert.equal(findKnowledge("how do I write a unit test")?.entry.id, "testing");
    assert.equal(findKnowledge("how do I use the terminal")?.entry.id, "terminal-cli");
    assert.equal(findKnowledge("how do I store data in localStorage")?.entry.id, "localstorage");
    assert.equal(findKnowledge("how do I make a Discord embed")?.entry.id, "discord-embeds");
    assert.equal(findKnowledge("what are Discord intents")?.entry.id, "discord-intents");
    assert.equal(findKnowledge("how do I set Telegram bot commands")?.entry.id, "telegram-commands");
  });

  it("does not match empty input", () => {
    assert.equal(findKnowledge("   "), null);
  });
});

describe("normalizeQuery", () => {
  it("lowercases and strips punctuation", () => {
    assert.equal(normalizeQuery("  How DO I?? Make-A Bot! "), "how do i make a bot");
  });

  it("expands whats/hows contractions", () => {
    assert.equal(normalizeQuery("whats python"), "what is python");
    assert.equal(normalizeQuery("What's a server?"), "what is a server");
    assert.equal(normalizeQuery("hows a webhook work"), "how is a webhook work");
  });
});
