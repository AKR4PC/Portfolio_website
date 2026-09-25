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

    let wasVisible = false;

    const isEmbedTarget = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof HTMLElement)) return false;
      return target.tagName === "IFRAME" || !!target.closest("iframe, .event-embed-wrap, [data-cursor='hidden']");
    };

    const isPointInEmbed = (x: number, y: number): boolean => {
      try {
        const el = document.elementFromPoint(x, y);
        return isEmbedTarget(el);
      } catch {
        return false;
      }
    };

    const onLeave = () => {
      wasVisible = false;
      dot.current?.classList.remove("is-visible");
      ring.current?.classList.remove("is-visible", "is-active");
      if (label.current) label.current.textContent = "";
    };

    const onMove = (event: PointerEvent) => {
      if (isEmbedTarget(event.target) || isPointInEmbed(event.clientX, event.clientY)) {
        onLeave();
        return;
      }
      if (!wasVisible && dot.current && ring.current) {
        gsap.set([dot.current, ring.current], { x: event.clientX, y: event.clientY });
        wasVisible = true;
      }
      xTo(event.clientX);
      yTo(event.clientY);
      ringXTo(event.clientX);
      ringYTo(event.clientY);
      dot.current?.classList.add("is-visible");
      ring.current?.classList.add("is-visible");
    };

    const onOver = (event: PointerEvent) => {
      if (isEmbedTarget(event.target) || isPointInEmbed(event.clientX, event.clientY)) {
        onLeave();
        return;
      }
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (!target || target.dataset.cursor === "hidden") {
        ring.current?.classList.remove("is-active");
        if (label.current) label.current.textContent = "";
        return;
      }
      const cursorLabel = target.dataset.cursor ?? (target.tagName === "A" || target.tagName === "BUTTON" ? "OPEN" : "");
      ring.current?.classList.add("is-active");
      if (label.current) label.current.textContent = cursorLabel;
    };

    const onPointerOut = (event: PointerEvent) => {
      // If moving into an iframe or leaving the document, hide cursor
      const related = event.relatedTarget as HTMLElement | null;
      if (!related || related.tagName === "IFRAME" || isEmbedTarget(related)) {
        onLeave();
      }
    };

    const onBlur = () => {
      onLeave();
    };

    const embeds = document.querySelectorAll<HTMLElement>("iframe, .event-embed-wrap, [data-cursor='hidden']");
    embeds.forEach((el) => {
      el.addEventListener("mouseenter", onLeave, { passive: true });
      el.addEventListener("mouseover", onLeave, { passive: true });
      el.addEventListener("pointerenter", onLeave, { passive: true });
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerenter", (e) => {
      if (isEmbedTarget(e.target)) onLeave();
    }, { capture: true, passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onBlur);

    return () => {
      embeds.forEach((el) => {
        el.removeEventListener("mouseenter", onLeave);
        el.removeEventListener("mouseover", onLeave);
        el.removeEventListener("pointerenter", onLeave);
      });
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onBlur);
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
