/* N3xUs Konc3pt'z service worker — network-first documents, cache-first assets. */
const VERSION = "n3xus-pwa-v1";
const STATIC_CACHE = `${VERSION}-static`;
const PAGE_CACHE = `${VERSION}-pages`;
const PRECACHE = [
  "/",
  "/offline.html",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
];

const BYPASS = [
  "/api/",
  "/auth/",
  "/owner",
  "/login",
  "/__grok/",
  "/@",
  "/src/",
  "/node_modules",
  "/__app-env",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (BYPASS.some((p) => url.pathname === p || url.pathname.startsWith(p))) return;
  if (url.pathname === "/sw.js" || url.pathname === "/manifest.webmanifest") return;

  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(networkFirstPage(req));
    return;
  }

  if (isAsset(url, req)) {
    event.respondWith(cacheFirst(req));
  }
});

function isAsset(url, req) {
  if (["style", "script", "image", "font"].includes(req.destination)) return true;
  return /\.(?:js|css|png|jpe?g|svg|webp|woff2?|ico)$/i.test(url.pathname);
}

async function networkFirstPage(req) {
  try {
    const fresh = await fetch(req);
    if (fresh.ok) {
      const copy = fresh.clone();
      const cache = await caches.open(PAGE_CACHE);
      await cache.put(req, copy);
    }
    return fresh;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    const offline = await caches.match("/offline.html");
    if (offline) return offline;
    return new Response("Offline.", { status: 503, headers: { "content-type": "text/plain" } });
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(req, fresh.clone());
    }
    return fresh;
  } catch {
    return Response.error();
  }
}
