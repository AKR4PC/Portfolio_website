"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function WorkSection() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageElement = stage.current;
    const trackElement = track.current;
    if (!stageElement || !trackElement) return;

    let cleanupAnimation: (() => void) | null = null;

    const init = () => {
      // Clean up previous instance if any
      if (cleanupAnimation) {
        cleanupAnimation();
        cleanupAnimation = null;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const getScrollAmount = () => {
          return Math.max(0, trackElement.scrollWidth - window.innerWidth);
        };

        // Timeline controlling horizontal scroll with Apple-style pacing:
        // 1. Initial 15% hold: Card 1 sits centered and still, letting the user's eye settle
        // 2. 70% duration: Smooth linear glide through all cards
        // 3. Final 15% hold: End card ("LET'S TALK") sits centered before unpinning
        const scrubTimeline = gsap.timeline({
          scrollTrigger: {
            id: "work-horizontal-scroll",
            trigger: stageElement,
            pin: true,
            pinType: "transform",
            start: "top top",
            end: () => `+=${Math.max(1200, getScrollAmount() + window.innerHeight * 0.8)}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        scrubTimeline
          .to({}, { duration: 0.15 }) // Hold on Card 1
          .to(trackElement, {
            x: () => -getScrollAmount(),
            ease: "none",
            duration: 0.70,
          })
          .to({}, { duration: 0.15 }); // Hold on End Card

        ScrollTrigger.refresh();

        return () => {
          scrubTimeline.kill();
          scrubTimeline.scrollTrigger?.kill();
        };
      });

      cleanupAnimation = () => mm.revert();
    };

    if (ScrollSmoother.get()) {
      init();
    } else {
      window.addEventListener("portfolio-smoother-ready", () => init(), { once: true });
    }

    return () => {
      window.removeEventListener("portfolio-smoother-ready", init);
      if (cleanupAnimation) cleanupAnimation();
    };
  }, []);

  return (
    <section ref={section} id="work" className="work-section section-light" data-nav-theme="light">
      <div className="page-grid work-heading">
        <SectionEyebrow index="06">A few things I&apos;ve made</SectionEyebrow>
        <div>
          <h2>HANDPICKED<br /><em>WORK.</em></h2>
          <p>Interfaces, systems and experiments. Each one is a different answer to the same question: what can technology make easier to understand?</p>
        </div>
        <span className="work-scroll-hint"><ArrowDown size={15} strokeWidth={1.3} /> Scroll to move through the work</span>
      </div>
      <div ref={stage} className="work-stage-pin">
        <div className="work-stage">
          <div ref={track} className="work-track">
            {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
            <div className="work-end-card">
              <span>Next chapter</span>
              <strong>Open to the<br />right problem.</strong>
              <a href="#contact" data-cursor="TALK">LET&apos;S TALK <span>↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
