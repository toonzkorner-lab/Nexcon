import { Link } from "@tanstack/react-router";
import { NAV } from "@/data/nav";
import { useSite } from "@/lib/cms/use-site";
import { Mark } from "./mark";

export function Footer() {
  const { settings, services } = useSite();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <Mark className="size-6" />
            <span className="text-sm font-medium">{settings.studioName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            Design, development, and deployment from one studio. {settings.city || "South Texas"}, working wherever the work is.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Studio</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/studio" className="text-fg-muted transition-colors hover:text-fg">
                Studio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-fg-muted transition-colors hover:text-fg">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/book" className="text-fg-muted transition-colors hover:text-fg">
                Open a brief
              </Link>
            </li>
            <li>
              <Link to="/transmissions" className="text-fg-muted transition-colors hover:text-fg">
                Transmissions
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="text-fg-muted transition-colors hover:text-fg">
                Journal RSS
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="text-fg-muted transition-colors hover:text-fg">
                Sitemap
              </a>
            </li>
            <li>
              <Link to="/owner" className="text-fg-muted transition-colors hover:text-fg">
                Owner desk
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="text-fg-muted transition-colors hover:text-fg">
                All services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Channels</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={settings.discordUrl} className="text-fg-muted transition-colors hover:text-fg" target="_blank" rel="noreferrer">
                Discord
              </a>
            </li>
            <li>
              <a href={settings.telegramUrl} className="text-fg-muted transition-colors hover:text-fg" target="_blank" rel="noreferrer">
                Telegram
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="text-fg-muted transition-colors hover:text-fg">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 font-mono text-[11px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} {settings.studioName}</span>
          <span>The 3 D’s — still the whole job.</span>
        </div>
      </div>
    </footer>
  );
}
