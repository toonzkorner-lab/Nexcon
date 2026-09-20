import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/owner/runbook")({ component: Page });

function Page() {
  return (
    <article className="max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Runbook</p>
      <h1 className="mt-2 text-3xl font-light tracking-tight">Hostinger KVM, without folklore.</h1>
      <p className="mt-4 text-sm leading-relaxed text-fg-muted">
        This app is a Node server with Postgres. The live Grok preview uses an in-memory database (it resets on restart). On your KVM2, point it at a real Postgres and it keeps every edit from this desk.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-medium">1. Box</h2>
        <p className="text-sm leading-relaxed text-fg-muted">
          Ubuntu 24.04 on the KVM2. Install Node 22, Nginx, and PostgreSQL. Issue TLS (Let’s Encrypt) so owner cookies work — they require HTTPS. The PWA also requires HTTPS.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">2. Database</h2>
        <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs leading-relaxed text-fg">{`sudo -u postgres createuser nexus
sudo -u postgres createdb -O nexus nexus
sudo -u postgres psql -c "alter user nexus password 'choose-a-long-secret';"`}</pre>
        <p className="text-sm text-fg-muted">Connection string:</p>
        <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs text-fg">
          postgres://nexus:choose-a-long-secret@127.0.0.1:5432/nexus
        </pre>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">3. Environment</h2>
        <p className="text-sm leading-relaxed text-fg-muted">
          Set these on the process (systemd EnvironmentFile, not a file committed to git):
        </p>
        <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs leading-relaxed text-fg">{`DATABASE_URL=postgres://nexus:…@127.0.0.1:5432/nexus
BETTER_AUTH_URL=https://your-domain.com
BETTER_AUTH_SECRET=a-32-byte-random-string
VITE_AUTH_ENABLED=true
XAI_API_KEY=optional-for-N3xUs-Core`}</pre>
        <p className="text-sm leading-relaxed text-fg-muted">
          Email/password is the owner login on a VPS. Google / X only work when this app is deployed through Grok’s broker. On Hostinger, create the owner account at /login once, then keep that password in a vault.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">4. Build and run</h2>
        <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-bg-elevated p-4 font-mono text-xs leading-relaxed text-fg">{`npm ci
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs`}</pre>
        <p className="text-sm leading-relaxed text-fg-muted">
          Bind behind Nginx on 443 → 3000 (or whatever port the Node server prints). <code className="font-mono text-fg">npm run build</code> applies migrations, so the schema is ready before the first request.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">5. First owner</h2>
        <p className="text-sm leading-relaxed text-fg-muted">
          Open https://your-domain.com/login, create the account, then go to /owner. The first signed-in user becomes owner — unless OWNER_EMAIL is set in the environment, in which case only the account whose email matches OWNER_EMAIL (case-insensitive) can claim the desk. Set OWNER_EMAIL on every deploy; without it, anyone who signs up before you do owns the desk. After that, only owners can edit. Use Site to change email, Discord, Telegram, and copy without touching code.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">6. What this desk edits</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
          <li>Services, prices, and deliverables</li>
          <li>Case studies and metrics</li>
          <li>Store products</li>
          <li>Live bot demos (Lab)</li>
          <li>Journal posts (drafts until published)</li>
          <li>Reviews (approve public submissions)</li>
          <li>Identity, FAQ, process, capabilities</li>
          <li>Search titles, descriptions, domain, and indexing</li>
          <li>Briefs, contact tickets, store orders</li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">7. Search</h2>
        <p className="text-sm leading-relaxed text-fg-muted">
          Paste a Google Search Console token under SEO on this desk. Sitemap lives at /sitemap.xml, robots at /robots.txt, journal RSS at /rss.xml, and llms.txt for assistants. After DNS points here, submit the sitemap once.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">8. Progressive web app</h2>
        <p className="text-sm leading-relaxed text-fg-muted">
          The site installs as N3xUs. Chrome, Edge, and Android offer Install app. iPhone: Share → Add to Home Screen. HTTPS is required. The service worker caches the shell and icons; owner, login, and APIs stay network-only so the desk never serves a stale edit. After a deploy, visitors get a fresh shell on the next load.
        </p>
      </section>
    </article>
  );
}
