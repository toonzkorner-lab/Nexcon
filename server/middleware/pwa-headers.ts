interface PwaEvent {
  url: URL;
}

export default async function pwaHeaders(
  event: PwaEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const result = await next();
  if (!(result instanceof Response)) return result;
  const path = event.url.pathname;
  if (path !== "/sw.js" && path !== "/manifest.webmanifest") return result;
  const headers = new Headers(result.headers);
  headers.set("cache-control", "no-cache");
  if (path === "/sw.js") {
    headers.set("content-type", "application/javascript; charset=utf-8");
    headers.set("service-worker-allowed", "/");
  } else {
    headers.set("content-type", "application/manifest+json; charset=utf-8");
  }
  return new Response(result.body, { status: result.status, statusText: result.statusText, headers });
}
