import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mark } from "@/components/site/mark";
import { pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  component: Login,
  head: ({ matches }) =>
    pageHead({
      title: "Owner desk",
      description: "Sign in to the N3xUs Konc3pt'z owner desk.",
      path: "/login",
      site: siteFromMatches(matches),
      index: false,
    }),
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!authEnabled) return;
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Owner",
        });
        if (err) throw new Error(err.message ?? "Could not create the account.");
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) throw new Error(err.message ?? "Could not sign in.");
      }
      await authClient.getSession();
      void navigate({ to: "/owner" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-fg">
          <Mark />
          <span className="font-medium tracking-tight">N3xUs</span>
        </Link>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Owner desk</p>
        <h1 className="mt-2 text-3xl font-light tracking-tight">
          {mode === "in" ? "Sign in to the desk." : "Create the first owner."}
        </h1>
        <p className="mt-2 text-sm text-fg-muted">
          The first account becomes owner. After that, only owners can open this desk.
        </p>

        {authEnabled ? (
          <>
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              {mode === "up" ? (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
              ) : null}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                />
              </div>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Working…" : mode === "in" ? "Sign in" : "Create owner account"}
              </Button>
            </form>

            <button
              type="button"
              className="mt-4 text-sm text-fg-muted hover:text-fg"
              onClick={() => {
                setMode((m) => (m === "in" ? "up" : "in"));
                setError(null);
              }}
            >
              {mode === "in" ? "Need the first account? Create it." : "Already have an account? Sign in."}
            </button>

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Or continue with</p>
              <div className="mt-3 flex flex-col gap-2">
                {GROK_PROVIDERS.map((p) => (
                  <button
                    key={p.providerId}
                    type="button"
                    onClick={() => void signIn(p.providerId, { callbackURL: "/owner" })}
                    className="h-11 rounded-[var(--radius-md)] text-sm text-fg shadow-[var(--shadow-border)] transition-[box-shadow] hover:shadow-[var(--shadow-border-hover)]"
                  >
                    Continue with {p.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-fg-muted">Sign-in is disabled in this environment.</p>
        )}

        <Link to="/" className="mt-10 inline-flex h-11 items-center text-sm text-fg-muted hover:text-fg">
          Back to the studio
        </Link>
      </div>
    </main>
  );
}
