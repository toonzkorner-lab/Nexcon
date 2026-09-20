import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(amount: number, opts?: { monthly?: boolean }) {
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
  return opts?.monthly ? `${value} / mo` : value;
}

export function uid(prefix = "nk") {
  // crypto.randomUUID is available in Node 18+ and all modern browsers
  // (secure contexts included). Callers treat ids as opaque strings.
  return `${prefix}-${crypto.randomUUID()}`;
}
