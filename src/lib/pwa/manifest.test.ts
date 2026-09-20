import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildWebManifest } from "./manifest.ts";
import type { Settings } from "../cms/types.ts";

const settings: Settings = {
  studioName: "N3xUs Konc3pt'z",
  studioShort: "N3xUs",
  tagline: "Design. Development. Deployment.",
  email: "studio@n3xuskonc3ptz.com",
  discordUrl: "",
  telegramUrl: "",
  founderName: "Juan",
  founderTitle: "Founder",
  founderBio: "",
  genesis: "",
  deskDays: "Mon–Fri",
  deskHours: "09:00–18:00",
  sla: "24h",
  zone: "America/Chicago",
  stack: [],
  siteUrl: "https://n3xuskonc3ptz.com",
  seoTitle: "",
  seoDescription: "South Texas digital studio.",
  seoKeywords: "",
  city: "South Texas",
  region: "Texas",
  country: "US",
  twitterHandle: "",
  googleVerification: "",
  indexable: true,
};

describe("web manifest", () => {
  it("is installable: name, standalone, icons, start_url", () => {
    const m = buildWebManifest(settings);
    assert.equal(m.display, "standalone");
    assert.equal(m.start_url, "/");
    assert.equal(m.theme_color, "#090a0b");
    assert.equal(m.short_name, "N3xUs");
    assert.ok(m.icons.some((i) => i.sizes === "192x192"));
    assert.ok(m.icons.some((i) => i.purpose === "maskable"));
    assert.ok(m.shortcuts.some((s) => s.url === "/lab"));
  });
});
