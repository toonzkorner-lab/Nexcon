import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { configuredDirectProviders } from "./direct-providers.ts";

describe("configuredDirectProviders", () => {
  it("returns both when both id + secret are set", () => {
    assert.deepEqual(
      configuredDirectProviders({
        GOOGLE_CLIENT_ID: "g-id",
        GOOGLE_CLIENT_SECRET: "g-secret",
        TWITTER_CLIENT_ID: "t-id",
        TWITTER_CLIENT_SECRET: "t-secret",
      }),
      ["google", "twitter"],
    );
  });

  it("returns only the fully configured provider", () => {
    assert.deepEqual(
      configuredDirectProviders({
        GOOGLE_CLIENT_ID: "g-id",
        GOOGLE_CLIENT_SECRET: "g-secret",
        TWITTER_CLIENT_ID: "t-id",
      }),
      ["google"],
    );
  });

  it("returns none when nothing is set", () => {
    assert.deepEqual(configuredDirectProviders({}), []);
  });

  it("treats blank values as unset", () => {
    assert.deepEqual(
      configuredDirectProviders({
        GOOGLE_CLIENT_ID: "   ",
        GOOGLE_CLIENT_SECRET: "g-secret",
      }),
      [],
    );
  });
});
