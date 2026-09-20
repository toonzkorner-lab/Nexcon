/**
 * Pure analytics helpers: user-agent parsing, visitor hashing, path
 * normalization. Server + tests; no DB access here.
 */
import { createHash } from "node:crypto";

export type ParsedAgent = { device: string; browser: string; os: string };

/** Tiny dependency-free UA parser — good enough for desk-level breakdowns. */
export function parseUserAgent(ua: string): ParsedAgent {
  const s = ua.toLowerCase();
  const device = /tablet|ipad|playbook|silk(?!.*mobile)/.test(s)
    ? "tablet"
    : /mobi|android|iphone|ipod|phone/.test(s)
      ? "mobile"
      : "desktop";
  let browser = "other";
  if (s.includes("edg/")) browser = "edge";
  else if (s.includes("opr/") || s.includes("opera")) browser = "opera";
  else if (s.includes("firefox") || s.includes("fxios")) browser = "firefox";
  else if (s.includes("crios") || s.includes("chrome")) browser = "chrome";
  else if (s.includes("safari")) browser = "safari";
  else if (s.includes("bot") || s.includes("crawl") || s.includes("spider") || s.includes("headless"))
    browser = "bot";
  let os = "other";
  if (s.includes("iphone") || s.includes("ipad") || /\bios\b/.test(s)) os = "ios";
  else if (s.includes("android")) os = "android";
  else if (s.includes("windows")) os = "windows";
  else if (s.includes("mac os") || s.includes("macintosh")) os = "macos";
  else if (s.includes("linux")) os = "linux";
  return { device, browser, os };
}

/**
 * Privacy-preserving visitor identity: SHA-256 of (ip + daily salt).
 * The same visitor hashes differently each day, and the raw IP is never stored.
 */
export function hashVisitor(ip: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/** Daily salt — stable within a day (UTC), unique across days. */
export function dailySalt(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Normalize a path for aggregation: strip query + hash, drop trailing slash
 * (except root), lowercase. Keeps cardinality bounded.
 */
export function normalizePath(raw: string): string {
  let p = (raw || "/").split("?")[0]!.split("#")[0]!.trim().toLowerCase();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p || "/";
}

/** Collapse a referrer URL to its host, or "" for direct/empty. */
export function referrerHost(raw: string): string {
  const r = (raw || "").trim();
  if (!r) return "";
  try {
    return new URL(r).host.toLowerCase();
  } catch {
    return "";
  }
}

/** Country from common proxy/CDN headers, else "". */
export function countryFromHeaders(headers: Headers): string {
  for (const key of ["cf-ipcountry", "x-vercel-ip-country", "x-country-code"]) {
    const v = headers.get(key);
    if (v && v.trim() && v.trim().toLowerCase() !== "xx") return v.trim().toUpperCase();
  }
  return "";
}
