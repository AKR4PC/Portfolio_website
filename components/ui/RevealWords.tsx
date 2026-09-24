"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

type RevealWordsProps = {
  text: string;
  className?: string;
  highlight?: string[];
  start?: string;
  animate?: boolean;
};

export function RevealWords({ text, className = "", highlight = [], start = "top 82%", animate = true }: RevealWordsProps) {
  const root = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const words = element.querySelectorAll<HTMLElement>("[data-word]");
    if (!animate || prefersReducedMotion()) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.018,
          ease: ease.smooth,
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        },
      );
    }, element);
    return () => context.revert();
  }, []);

  return (
    <p ref={root} className={className} aria-label={text}>
      {text.split(" ").map((word, index) => {
        const clean = word.replace(/[.,!?—:]/g, "").toLowerCase();
        const isHighlight = highlight.some((item) => clean.includes(item.toLowerCase()));
        return (
          <span className="reveal-word-wrap" key={`${word}-${index}`}>
            <span data-word className={isHighlight ? "is-highlight" : undefined}>
              {word}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
