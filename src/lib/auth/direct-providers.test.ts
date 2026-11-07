import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { configuredDirectProviders, visibleDirectProviders } from "./direct-providers.ts";

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

describe("visibleDirectProviders", () => {
  it("returns only the providers whose VITE_ flag is true", () => {
    assert.deepEqual(
      visibleDirectProviders({
        VITE_AUTH_DIRECT_GOOGLE: "true",
        VITE_AUTH_DIRECT_TWITTER: "false",
      }),
      ["google"],
    );
  });

  it("returns both when both flags are true", () => {
    assert.deepEqual(
      visibleDirectProviders({
        VITE_AUTH_DIRECT_GOOGLE: "true",
        VITE_AUTH_DIRECT_TWITTER: "true",
      }),
      ["google", "twitter"],
    );
  });

  it("returns none when no flag is true", () => {
    assert.deepEqual(visibleDirectProviders({}), []);
    assert.deepEqual(
      visibleDirectProviders({ VITE_AUTH_DIRECT_GOOGLE: "yes" }),
      [],
    );
  });
});
