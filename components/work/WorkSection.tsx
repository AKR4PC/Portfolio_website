"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";

export function WorkSection() {
  const section = useRef<HTMLElement>(null);
  const placeholder = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = section.current;
    const placeholderElement = placeholder.current;
    const stageElement = stage.current;
    const trackElement = track.current;
    if (!sectionElement || !placeholderElement || !stageElement || !trackElement) return;

    const desktopQuery = window.matchMedia("(min-width: 900px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(trackElement.querySelectorAll<HTMLElement>(".project-card"));
    let desktop = desktopQuery.matches;
    let desktopLayout = false;
    let targetProgress = 0;
    let currentProgress = 0;
    let frame = 0;
    let distance = 0;
    let stageDocumentTop = 0;
    let stageOffset = 0;
    let stageHeight = 0;
    let stageMargin = 0;

    const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
    const smoothstep = (value: number) => {
      const normalized = clamp(value);
      return normalized * normalized * (3 - 2 * normalized);
    };
    const pulse = (value: number, start: number, end: number) => {
      if (value <= start || value >= end) return 0;
      return Math.sin(((value - start) / (end - start)) * Math.PI);
    };

    const clearCardEffects = () => {
      trackElement.style.removeProperty("transform");
      cards.forEach((card) => {
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
        card.style.removeProperty("filter");
      });
    };

    const removeDesktopLayout = () => {
      sectionElement.style.removeProperty("padding-bottom");
      placeholderElement.style.removeProperty("display");
      placeholderElement.style.removeProperty("height");
      placeholderElement.style.removeProperty("margin-top");
      ["position", "top", "left", "width", "height", "z-index", "margin-top", "opacity", "visibility", "pointer-events"].forEach((property) => stageElement.style.removeProperty(property));
      desktopLayout = false;
      stageDocumentTop = 0;
    };

    const resetForMobile = () => {
      removeDesktopLayout();
      targetProgress = 0;
      currentProgress = 0;
      clearCardEffects();
    };

    const applyDesktopLayout = () => {
      if (desktopLayout) return;
      const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;
      stageOffset = stageElement.offsetTop;
      stageMargin = Number.parseFloat(getComputedStyle(stageElement).marginTop) || 0;
      stageHeight = stageElement.getBoundingClientRect().height;
      stageDocumentTop = sectionTop + stageOffset;

      placeholderElement.style.display = "block";
      placeholderElement.style.height = `${stageHeight}px`;
      placeholderElement.style.marginTop = `${stageMargin}px`;
      stageElement.style.position = "fixed";
      stageElement.style.top = "0px";
      stageElement.style.left = "0px";
      stageElement.style.marginTop = "0px";
      stageElement.style.width = "100%";
      stageElement.style.height = `${stageHeight}px`;
      stageElement.style.zIndex = "40";
      stageElement.style.opacity = "0";
      stageElement.style.visibility = "hidden";
      stageElement.style.pointerEvents = "none";
      desktopLayout = true;
    };

    const updateTarget = () => {
      const nextDesktop = desktopQuery.matches;
      if (nextDesktop !== desktop) {
        desktop = nextDesktop;
        if (!desktop) resetForMobile();
        else applyDesktopLayout();
      }
      if (!desktop) {
        if (desktopLayout || stageDocumentTop !== 0) resetForMobile();
        return;
      }
      if (!desktopLayout) applyDesktopLayout();

      distance = Math.max(0, trackElement.scrollWidth - window.innerWidth + 40);
      const requiredPadding = Math.max(100, distance + window.innerHeight * 0.25 - stageOffset);
      const nextPadding = `${requiredPadding}px`;
      if (sectionElement.style.paddingBottom !== nextPadding) sectionElement.style.paddingBottom = nextPadding;

      const sectionBottom = sectionElement.getBoundingClientRect().bottom + window.scrollY;
      const end = sectionBottom - window.innerHeight;
      const range = Math.max(1, end - stageDocumentTop);
      targetProgress = clamp((window.scrollY - stageDocumentTop) / range);
    };

    const render = () => {
      if (desktop) {
        if (reducedMotionQuery.matches) currentProgress = targetProgress;
        else currentProgress += (targetProgress - currentProgress) * 0.12;

        const isVisible = currentProgress > 0.0005 && currentProgress < 0.995;
        stageElement.style.opacity = isVisible ? "1" : "0";
        stageElement.style.visibility = isVisible ? "visible" : "hidden";
        stageElement.style.pointerEvents = isVisible ? "auto" : "none";

        const delayedProgress = smoothstep((currentProgress - 0.1) / 0.9);
        trackElement.style.transform = `translate3d(${-distance * delayedProgress}px, 0, 0)`;

        const glitch = reducedMotionQuery.matches ? 0 : Math.max(
          pulse(currentProgress, 0.02, 0.15),
          pulse(currentProgress, 0.84, 0.99),
        );
        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const offset = glitch * direction * (4 + (index % 3) * 2);
          const skew = glitch * direction * (1.2 + (index % 2) * 0.5);
          card.style.transform = `translate3d(${offset}px, 0, 0) skewX(${skew}deg)`;
          card.style.opacity = `${1 - glitch * 0.28}`;
          card.style.filter = glitch > 0.01 ? `contrast(${1 + glitch * 0.45})` : "none";
        });
      }

      frame = window.requestAnimationFrame(render);
    };

    const onResize = () => {
      if (desktopLayout) removeDesktopLayout();
      updateTarget();
    };
    const onScroll = () => updateTarget();
    const onMotionChange = () => updateTarget();

    updateTarget();
    desktopQuery.addEventListener("change", onResize);
    reducedMotionQuery.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      desktopQuery.removeEventListener("change", onResize);
      reducedMotionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
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
      <div ref={placeholder} className="work-stage-placeholder" aria-hidden="true" />
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
