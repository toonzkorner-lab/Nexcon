import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-md)] bg-bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-fg-subtle",
        "transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
