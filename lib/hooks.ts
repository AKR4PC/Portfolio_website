"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ease, prefersReducedMotion } from "@/lib/motion";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useScrollReveal<T extends HTMLElement>(options?: {
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>(options?.selector ?? "[data-reveal]");
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options?.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: options?.stagger ?? 0.07,
          ease: ease.smooth,
          scrollTrigger: {
            trigger: root,
            start: options?.start ?? "top 78%",
            once: true,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, [options?.selector, options?.y, options?.stagger, options?.start]);

  return ref;
}

export function useMagnetic<T extends HTMLElement>(strength = 12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(element, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      xTo((x / (rect.width / 2)) * strength);
      yTo((y / (rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      gsap.to(element, { x: 0, y: 0, duration: 0.4 });
    };
  }, [strength]);

  return ref;
}

export function useParallax<T extends HTMLElement>(distance = 80) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      gsap.to(element, {
        yPercent: distance / 10,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, element);
    return () => context.revert();
  }, [distance]);

  return ref;
}

export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
}

export { ScrollTrigger };
