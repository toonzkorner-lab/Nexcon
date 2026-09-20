import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-32 w-full rounded-[var(--radius-md)] bg-bg-elevated px-3 py-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-fg-subtle",
        "transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
