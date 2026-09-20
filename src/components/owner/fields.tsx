import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{label}</span>
      {children}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <Field label={label}>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

export function AreaField({
  label,
  value,
  onChange,
  hint,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <Field label={label}>
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
      </Field>
      {hint ? <p className="mt-1 text-xs text-fg-subtle">{hint}</p> : null}
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex h-11 items-center justify-between gap-4 rounded-[var(--radius-md)] px-3 text-sm shadow-[var(--shadow-border)]"
    >
      <span>{label}</span>
      <span
        className={cn(
          "font-mono text-[11px] uppercase tracking-wider",
          checked ? "text-signal" : "text-fg-subtle",
        )}
      >
        {checked ? "On" : "Off"}
      </span>
    </button>
  );
}

export function SeoFields({
  title,
  description,
  onTitle,
  onDescription,
}: {
  title: string;
  description: string;
  onTitle: (v: string) => void;
  onDescription: (v: string) => void;
}) {
  const shownTitle = title.trim() || "Uses the public title";
  const shownDesc = description.trim() || "Uses the summary / excerpt";
  return (
    <div className="space-y-4 rounded-[var(--radius-lg)] bg-bg-subtle p-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Search listing</p>
        <p className="mt-1 text-xs text-fg-muted">Optional. Leave blank to use the title and summary Google already sees.</p>
      </div>
      <TextField label="SEO title" value={title} onChange={onTitle} />
      <AreaField label="SEO description" value={description} onChange={onDescription} rows={3} hint="Aim for 140–160 characters." />
      <div className="rounded-[var(--radius-md)] bg-bg px-3 py-3">
        <p className="truncate text-sm text-[#8ab4f8]">{shownTitle}</p>
        <p className="mt-0.5 truncate font-mono text-[11px] text-signal">n3xuskonc3ptz.com</p>
        <p className="mt-1 line-clamp-2 text-xs text-fg-muted">{shownDesc}</p>
      </div>
    </div>
  );
}

export { Label };
