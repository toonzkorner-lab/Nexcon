import { Badge } from "@/components/ui/badge";

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
      <Badge>{kicker}</Badge>
      <h1 className="mt-5 max-w-3xl text-4xl font-light tracking-tight text-fg sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{lede}</p>
    </header>
  );
}
