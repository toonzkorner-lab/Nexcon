/**
 * Which direct social providers (owner's own OAuth apps) are configured.
 *
 * Pure + testable: given the env vars, returns the provider ids whose client
 * id AND secret are both set. The server uses this to register only the
 * direct providers that are actually wired up; the client flag
 * `VITE_AUTH_DIRECT_SOCIAL` decides which buttons the login page shows.
 */
export type DirectProviderId = "google" | "twitter";

export function configuredDirectProviders(
  env: Record<string, string | undefined>,
): DirectProviderId[] {
  const out: DirectProviderId[] = [];
  if (env.GOOGLE_CLIENT_ID?.trim() && env.GOOGLE_CLIENT_SECRET?.trim()) out.push("google");
  if (env.TWITTER_CLIENT_ID?.trim() && env.TWITTER_CLIENT_SECRET?.trim()) out.push("twitter");
  return out;
}

/**
 * Which direct providers the login page should OFFER, from the build-time
 * VITE_ flags. The server registers a provider only when its client id AND
 * secret are set; the matching VITE_ flag is set alongside them so the button
 * never appears for a provider that isn't wired up. Pure + testable.
 */
export function visibleDirectProviders(
  env: Record<string, string | undefined>,
): DirectProviderId[] {
  const out: DirectProviderId[] = [];
  if (env.VITE_AUTH_DIRECT_GOOGLE === "true") out.push("google");
  if (env.VITE_AUTH_DIRECT_TWITTER === "true") out.push("twitter");
  return out;
}
