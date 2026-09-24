import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = window.__portfolioLenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -96, duration: 1.25 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
}

export function formatNumber(value: number, compact = false) {
  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}
