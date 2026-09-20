import { Link } from "@tanstack/react-router";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {last || !item.to ? (
                <span className={last ? "text-fg-muted" : undefined} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to as "/"} params={item.params as never} className="hover:text-fg">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
