import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  countryFromHeaders,
  dailySalt,
  hashVisitor,
  normalizePath,
  parseUserAgent,
  referrerHost,
} from "./parse.ts";

describe("parseUserAgent", () => {
  it("identifies desktop chrome on windows", () => {
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
    assert.deepEqual(parseUserAgent(ua), { device: "desktop", browser: "chrome", os: "windows" });
  });
  it("identifies mobile safari on ios", () => {
    const ua =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
    assert.deepEqual(parseUserAgent(ua), { device: "mobile", browser: "safari", os: "ios" });
  });
  it("identifies android firefox as mobile", () => {
    const ua = "Mozilla/5.0 (Android 14; Mobile; rv:128.0) Gecko/128.0 Firefox/128.0";
    const p = parseUserAgent(ua);
    assert.equal(p.device, "mobile");
    assert.equal(p.browser, "firefox");
    assert.equal(p.os, "android");
  });
  it("flags bots", () => {
    const p = parseUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
    assert.equal(p.browser, "bot");
  });
});

describe("hashVisitor", () => {
  it("is stable for same ip+salt and changes with salt", () => {
    const a = hashVisitor("1.2.3.4", "2026-09-20");
    assert.equal(a, hashVisitor("1.2.3.4", "2026-09-20"));
    assert.notEqual(a, hashVisitor("1.2.3.4", "2026-09-21"));
    assert.notEqual(a, hashVisitor("5.6.7.8", "2026-09-20"));
    assert.equal(a.length, 32);
  });
  it("dailySalt is a UTC date string", () => {
    assert.match(dailySalt(new Date("2026-09-20T23:00:00Z")), /^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("normalizePath", () => {
  it("strips query, hash, trailing slash; lowercases", () => {
    assert.equal(normalizePath("/Work?utm=x#frag"), "/work");
    assert.equal(normalizePath("/journal/"), "/journal");
    assert.equal(normalizePath("/"), "/");
    assert.equal(normalizePath(""), "/");
  });
});

describe("referrerHost", () => {
  it("extracts host or empty", () => {
    assert.equal(referrerHost("https://Google.COM/search?q=x"), "google.com");
    assert.equal(referrerHost(""), "");
    assert.equal(referrerHost("not a url"), "");
  });
});

describe("countryFromHeaders", () => {
  it("reads cloudflare header", () => {
    const h = new Headers({ "cf-ipcountry": "de" });
    assert.equal(countryFromHeaders(h), "DE");
  });
  it("returns empty when absent", () => {
    assert.equal(countryFromHeaders(new Headers()), "");
  });
});
