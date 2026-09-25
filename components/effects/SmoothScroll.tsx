"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.15,
      smoothTouch: 0,
      effects: false,
      normalizeScroll: false,
    });
    window.__portfolioSmoother = {
      scrollTo: (target, options) => {
        smoother.scrollTo(target, !options?.immediate, `top ${-(options?.offset ?? 0)}px`);
      },
      stop: () => smoother.paused(true),
      start: () => smoother.paused(false),
    };
    document.documentElement.classList.add("smooth-enabled");
    window.dispatchEvent(new CustomEvent("portfolio-smoother-ready"));

    return () => {
      smoother.kill();
      delete window.__portfolioSmoother;
      document.documentElement.classList.remove("smooth-enabled");
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
