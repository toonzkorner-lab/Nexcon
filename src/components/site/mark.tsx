import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" className="fill-bg-elevated" />
      <path
        fill="currentColor"
        d="M7 25V7h5.5L20 18.2V7h5v18h-5.5L12 13.8V25H7z"
      />
      <rect x="20" y="7" width="5" height="5" className="fill-signal" />
    </svg>
  );
}
