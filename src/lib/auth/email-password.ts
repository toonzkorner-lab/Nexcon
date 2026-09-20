/**
 * Local email/password sign-in (this app's Better Auth DB — not the broker).
 *
 * Enabled for this site. To disable: set `emailAndPasswordEnabled` to `false`
 * below, then remove the sign-up / sign-in forms that use
 * `authClient.signUp.email` / `authClient.signIn.email` from
 * `@/lib/auth/client` (see the auth skill).
 *
 * Do NOT edit `server.ts` for this — that file is frozen pre-wired config.
 */
export const emailAndPasswordEnabled = true;
