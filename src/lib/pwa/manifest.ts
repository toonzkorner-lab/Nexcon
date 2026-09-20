import type { Settings } from "../cms/types.ts";

const DEFAULT_ORIGIN = "https://n3xuskonc3ptz.com";

function originOf(settings: Settings) {
  const raw = settings.siteUrl?.trim() || DEFAULT_ORIGIN;
  return raw.replace(/\/+$/, "");
}

export function buildWebManifest(settings: Settings) {
  const name = settings.studioName || "N3xUs Konc3pt'z";
  const short = settings.studioShort || "N3xUs";
  const description =
    settings.seoDescription ||
    settings.tagline ||
    "Design. Development. Deployment.";
  const origin = originOf(settings);
  return {
    id: `${origin}/`,
    name,
    short_name: short.slice(0, 12),
    description,
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    orientation: "any",
    background_color: "#090a0b",
    theme_color: "#090a0b",
    categories: ["business", "design", "productivity"],
    handle_links: "preferred",
    launch_handler: { client_mode: "navigate-existing" },
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Lab", short_name: "Lab", description: "Try live bot demos", url: "/lab", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Open a brief", short_name: "Brief", description: "Start a project", url: "/book", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Services", short_name: "Services", url: "/services", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
    screenshots: [
      {
        src: "/icons/shot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Studio home",
      },
      {
        src: "/icons/shot-narrow.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Studio on a phone",
      },
    ],
  };
}
