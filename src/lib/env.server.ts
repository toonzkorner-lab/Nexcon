export function env(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

/**
 * Workspace preview vs deployed app. The deployer writes GROK_PROJECT_ID on
 * every publish; the sandbox preview never has it. Single source of truth for
 * the split — gate audience, gate endpoints and connector-token semantics all
 * key off this predicate.
 */
export function isWorkspacePreview(): boolean {
  return !env("GROK_PROJECT_ID");
}

/**
 * Optional allowlist for the owner desk's first-claim gate (see
 * `claimOrRequireOwner` in `@/lib/cms/db`). When set, only a signed-in user
 * whose account email matches (case-insensitive) may become the first owner.
 * When unset, the desk keeps the historic first-claim behavior — the first
 * signed-in visitor owns the desk. Always set this on a deployed instance.
 */
export function ownerEmail(): string | undefined {
  return env("OWNER_EMAIL")?.toLowerCase();
}
