import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chatCompletionsUrl,
  configuredProviders,
  GEMINI_CONFIG,
  providerApiKey,
  XAI_CONFIG,
} from "./providers.ts";

describe("configuredProviders", () => {
  it("returns xai first when both keys are set", () => {
    assert.deepEqual(configuredProviders({ XAI_API_KEY: "x", GEMINI_API_KEY: "g" }), [
      "xai",
      "gemini",
    ]);
  });

  it("returns gemini alone when only the Gemini key is set", () => {
    assert.deepEqual(configuredProviders({ GEMINI_API_KEY: "g" }), ["gemini"]);
  });

  it("returns xai alone when only the xAI key is set", () => {
    assert.deepEqual(configuredProviders({ XAI_API_KEY: "x" }), ["xai"]);
  });

  it("returns none when no key is set", () => {
    assert.deepEqual(configuredProviders({}), []);
  });

  it("treats a blank key as unset", () => {
    assert.deepEqual(configuredProviders({ XAI_API_KEY: "   ", GEMINI_API_KEY: "" }), []);
  });
});

describe("providerApiKey", () => {
  it("returns the key when set", () => {
    assert.equal(providerApiKey({ GEMINI_API_KEY: "g-key" }, "gemini"), "g-key");
  });

  it("returns undefined when blank or missing", () => {
    assert.equal(providerApiKey({ GEMINI_API_KEY: "  " }, "gemini"), undefined);
    assert.equal(providerApiKey({}, "xai"), undefined);
  });
});

describe("provider config", () => {
  it("points Gemini at Google's OpenAI-compatible endpoint with 3.5 Flash-Lite", () => {
    assert.equal(
      GEMINI_CONFIG.baseUrl,
      "https://generativelanguage.googleapis.com/v1beta/openai",
    );
    assert.equal(GEMINI_CONFIG.model, "gemini-3.5-flash-lite");
    assert.equal(GEMINI_CONFIG.envKey, "GEMINI_API_KEY");
    assert.equal(
      chatCompletionsUrl("gemini"),
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    );
  });

  it("keeps xAI on Grok", () => {
    assert.equal(XAI_CONFIG.baseUrl, "https://api.x.ai/v1");
    assert.equal(XAI_CONFIG.model, "grok-4.5");
    assert.equal(XAI_CONFIG.envKey, "XAI_API_KEY");
    assert.equal(chatCompletionsUrl("xai"), "https://api.x.ai/v1/chat/completions");
  });
});
