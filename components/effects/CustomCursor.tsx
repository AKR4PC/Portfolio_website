"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-enabled");
    return () => document.documentElement.classList.remove("custom-cursor-enabled");
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const ringXTo = gsap.quickTo(ring.current, "x", { duration: 0.48, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring.current, "y", { duration: 0.48, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      ringXTo(event.clientX);
      ringYTo(event.clientY);
      dot.current?.classList.add("is-visible");
      ring.current?.classList.add("is-visible");
    };
    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (!target) {
        ring.current?.classList.remove("is-active");
        if (label.current) label.current.textContent = "";
        return;
      }
      const cursorLabel = target.dataset.cursor ?? (target.tagName === "A" || target.tagName === "BUTTON" ? "OPEN" : "");
      ring.current?.classList.add("is-active");
      if (label.current) label.current.textContent = cursorLabel;
    };
    const onLeave = () => {
      dot.current?.classList.remove("is-visible");
      ring.current?.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ring} className="cursor-ring">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
