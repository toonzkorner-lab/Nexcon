import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { RegisterPwa } from "@/components/pwa/register";
import { Shell } from "@/components/site/shell";
import { AuthProvider } from "@/lib/auth/provider";
import { loadSite } from "@/lib/cms/public";
import { seedSite } from "@/lib/cms/seed-data";
import { absUrl, siteFromMatches } from "@/lib/seo";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  beforeLoad: async () => {
    try {
      const site = await loadSite();
      return { site };
    } catch {
      return { site: seedSite() };
    }
  },
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    const meta: Array<Record<string, string>> = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#090a0b" },
      { name: "format-detection", content: "telephone=no" },
      { name: "apple-mobile-web-app-title", content: site.settings.studioShort || "N3xUs" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "mobile-web-app-capable", content: "yes" },
    ];
    if (site.settings.googleVerification) {
      meta.push({ name: "google-site-verification", content: site.settings.googleVerification });
    }
    return {
      meta,
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=3" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32.png?v=3" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16.png?v=3" },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png?v=3", sizes: "180x180" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap",
        },
        {
          rel: "alternate",
          type: "application/rss+xml",
          href: absUrl("/rss.xml", site.settings),
          title: `${site.settings.studioName} journal`,
        },
      ],
    };
  },
  component: Root,
  notFoundComponent: NotFound,
});

function Root() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <RegisterPwa />
        <AuthProvider>
          <Shell>
            <Outlet />
          </Shell>
          <Toaster
            theme="dark"
            position="top-center"
            toastOptions={{
              style: {
                background: "#111315",
                border: "1px solid rgba(236,238,235,0.12)",
                color: "#eceeeb",
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">404</p>
      <h1 className="mt-4 text-3xl font-light">This route is not on the map.</h1>
      <p className="mt-3 text-sm text-fg-muted">The page you wanted is missing or was never built.</p>
      <a href="/" className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-accent px-4 text-sm font-medium text-accent-fg">
        Back to studio
      </a>
    </div>
  );
}
