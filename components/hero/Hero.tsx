"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroCards } from "@/components/hero/HeroCards";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { profile } from "@/data/profile";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: ease.cinematic } });
      intro
        .fromTo("[data-hero-kicker]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo("[data-hero-index]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
        .fromTo(
          "[data-hero-line]",
          { yPercent: 108, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.075 },
          "-=0.35",
        )
        .fromTo("[data-hero-card]", { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, stagger: 0.065, ease: ease.settle }, "-=0.62")
        .fromTo("[data-hero-footer]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.3");

      gsap.to("[data-hero-card]", {
        y: (index) => (index % 2 === 0 ? -42 : 30),
        rotate: (index) => (index % 2 === 0 ? -1.5 : 2),
        ease: "none",
        stagger: 0.035,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1.1 },
      });
      gsap.to("[data-hero-footer]", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 22%", end: "bottom top", scrub: true },
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} id="home" className="hero section-dark" data-nav-theme="dark">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner page-grid">
        <div className="hero-meta-row" data-hero-kicker>
          <div className="hero-kicker">
            <span className="status-dot" />
            <span>Developer · Developer Relations · Community Builder</span>
          </div>
          <span className="hero-index" data-hero-index>AK / 01 — 2026</span>
        </div>

        <div className="hero-headline-wrap">
          <h1 className="hero-headline hero-headline-three" aria-label="I build products, communities and moments">
            <span className="hero-line"><span data-hero-line>I BUILD</span></span>
            <span className="hero-line hero-line-pair">
              <span data-hero-line>PRODUCTS, </span><span data-hero-line className="hero-highlight">COMMUNITIES</span>
            </span>
            <span className="hero-line"><span data-hero-line>AND MOMENTS</span></span>
          </h1>
        </div>

        <div className="hero-cards-stage">
          <HeroCards />
        </div>

        <div className="hero-footer" data-hero-footer>
          <button type="button" className="scroll-cue" onClick={() => scrollToId("why")} data-cursor="SCROLL">
            <span className="scroll-cue-icon"><ArrowDown size={14} strokeWidth={1.5} /></span>
            <span>SCROLL TO EXPLORE</span>
          </button>
          <p className="hero-support">From shipping products to building communities, I work where technology meets people.</p>
          <MagneticLink href="#why" className="hero-about-link" onClick={(event) => { event.preventDefault(); scrollToId("why"); }} cursor="READ">
            <span>THE SHORT VERSION</span><ArrowUpRight size={16} strokeWidth={1.5} />
          </MagneticLink>
        </div>
      </div>
      <div className="hero-bottom-note">{profile.name} <span>—</span> New Delhi / Everywhere</div>
    </section>
  );
}
