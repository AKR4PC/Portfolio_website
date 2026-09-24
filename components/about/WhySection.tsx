"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { AboutIntro } from "@/components/about/AboutIntro";
import { WhyReflection } from "@/components/about/WhyReflection";
import { RevealWords } from "@/components/ui/RevealWords";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { profile } from "@/data/profile";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

export function WhySection() {
  const root = useRef<HTMLElement>(null);
  const mainWord = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      gsap.fromTo(mainWord.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.35, ease: ease.cinematic, scrollTrigger: { trigger: section, start: "top 70%", once: true } });
      gsap.to(mainWord.current, { yPercent: -24, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "45% top", scrub: 1.2 } });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <>
      <section ref={root} id="why" className="why-section section-light" data-nav-theme="light">
      <div className="page-grid why-topline">
        <SectionEyebrow index="01">The point of view</SectionEyebrow>
        <span className="why-side-note">A question before a statement</span>
      </div>
      <div className="why-word-stage">
        <div ref={mainWord} className="why-word">WHY</div>
        <WhyReflection />
      </div>
      <div className="why-lower page-grid">
        <div className="why-lower-index">01<span>/</span>03</div>
        <div className="why-lower-copy">
          <span className="why-unique-label">WHAT&apos;S UNIQUE IN ME</span>
          <h2>WHY ME?</h2>
          <div className="why-statement-stack">
            {profile.uniqueLines.map((line, index) => index === 2 ? (
              <p className="why-statement-line" key={line}>
                <span className="why-event-highlight">50+ national events</span> later, we&apos;re here to explore.
              </p>
            ) : (
              <RevealWords
                key={line}
                text={line}
                className="why-statement-line"
                highlight={["development", "growth", "marketing", "100k+"]}
                start="top 70%"
                animate={false}
              />
            ))}
          </div>
          <a href="#about" className="why-explore-button" data-cursor="READ">
            <span>KEEP EXPLORING</span><ArrowDownRight size={18} strokeWidth={1.4} />
          </a>
        </div>
      </div>
      </section>
      <AboutIntro />
    </>
  );
}
