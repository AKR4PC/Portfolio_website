"use client";

import { useEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

export function PageTransition() {
  const curtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtain.current || prefersReducedMotion()) return;
    gsap.fromTo(
      curtain.current,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 1.15, delay: 0.15, ease: ease.cinematic },
    );
  }, []);

  return <div ref={curtain} className="page-curtain" aria-hidden="true" />;
}
