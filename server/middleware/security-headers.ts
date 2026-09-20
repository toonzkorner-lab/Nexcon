/**
 * Baseline security headers for the deployed (nitro) build. Auto-registered
 * with the other `server/middleware/*` files (see `nitro({ serverDir })` in
 * `vite.config.ts`).
 *
 * `X-Frame-Options: SAMEORIGIN` (not DENY): the Grok live preview renders the
 * dev server in an iframe, and the owner may embed their own pages elsewhere.
 * HSTS is only meaningful over HTTPS, which every deploy target uses.
 */
interface SecurityEvent {
  url: URL;
}

export default async function securityHeaders(
  event: SecurityEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const result = await next();
  if (!(result instanceof Response)) return result;
  const headers = new Headers(result.headers);
  headers.set("strict-transport-security", "max-age=31536000; includeSubDomains");
  headers.set("x-frame-options", "SAMEORIGIN");
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
