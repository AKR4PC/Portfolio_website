"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { experience } from "@/data/experience";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";
import { useIsDesktop } from "@/lib/hooks";

export function ExperienceSection() {
  const [active, setActive] = useState<number | null>(null);
  const desktop = useIsDesktop();
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!desktop || prefersReducedMotion() || !root.current || !preview.current || active === null) return;
    const xTo = gsap.quickTo(preview.current, "x", { duration: 0.65, ease: ease.smooth });
    const yTo = gsap.quickTo(preview.current, "y", { duration: 0.65, ease: ease.smooth });
    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };
    root.current.addEventListener("pointermove", onMove, { passive: true });
    return () => root.current?.removeEventListener("pointermove", onMove);
  }, [active, desktop]);

  useEffect(() => {
    if (!preview.current || !image.current) return;
    gsap.to(preview.current, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.82 : 1,
      duration: prefersReducedMotion() ? 0.01 : 0.55,
      ease: ease.cinematic,
      overwrite: true,
    });
  }, [active]);

  const current = active === null ? undefined : experience[active];

  return (
    <section ref={root} id="experience" className="experience-section section-dark" data-nav-theme="dark">
      <div className="page-grid experience-heading">
        <SectionEyebrow index="05" light>Selected chapters</SectionEyebrow>
        <div>
          <h2>WORK THAT<br /><em>MOVES</em> PEOPLE.</h2>
          <p>Engineering is one part of the practice. The rest is listening, making the room and staying for the hard part.</p>
        </div>
      </div>
      <div className="page-grid experience-list">
        {experience.map((item, index) => (
          <ExperienceItem
            key={item.company}
            item={item}
            index={index}
            active={active === index}
            onActivate={() => setActive(index)}
            onDeactivate={() => setActive(null)}
          />
        ))}
      </div>
      <div className="page-grid experience-footnote">
        <span>Hover to open a chapter</span>
        <span>Tap / focus on touch and keyboard</span>
      </div>
      {desktop ? (
        <div ref={preview} className="experience-preview" aria-hidden="true">
          <div ref={image} className="experience-preview-image">
            {current ? <Image src={current.image} alt="" fill sizes="260px" /> : null}
            <span>{current?.company}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
