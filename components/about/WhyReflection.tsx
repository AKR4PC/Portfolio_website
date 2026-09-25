"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

export function WhyReflection() {
  const turbulence = useRef<SVGFETurbulenceElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const turbulenceElement = turbulence.current;
    const displacementElement = displacement.current;
    const containerElement = container.current;
    if (!turbulenceElement || !displacementElement || !containerElement) return;

    // Use IntersectionObserver to completely halt filter animation when off-screen.
    // This is much more effective than the old scroll-debounce approach — the SVG
    // filter never runs when the user isn't looking at this section.
    let isVisible = false;
    const filterTweens: gsap.core.Tween[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        filterTweens.forEach((tween) => {
          if (isVisible) tween.resume();
          else tween.pause();
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(containerElement);

    // During active scrolling, pause the filter animation to prevent the CPU
    // filter recompute from fighting the scroll compositor.  Resume after the
    // scroll settles.  250ms debounce is enough for Lenis' interpolation to
    // finish without a visible pop.
    let scrollIdle: number | undefined;
    let isScrolling = false;

    const onScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        filterTweens.forEach((tween) => tween.pause());
      }
      if (scrollIdle) window.clearTimeout(scrollIdle);
      scrollIdle = window.setTimeout(() => {
        isScrolling = false;
        if (isVisible) filterTweens.forEach((tween) => tween.resume());
      }, 250);
    };

    const context = gsap.context(() => {
      const frequency = { x: 0.012, y: 0.04 };
      const disp = { scale: 22 };
      filterTweens.push(
        gsap.to(frequency, {
          x: 0.02,
          y: 0.06,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: !isVisible,
          onUpdate: () => turbulenceElement.setAttribute("baseFrequency", `${frequency.x} ${frequency.y}`),
        }),
        gsap.to(disp, {
          scale: 34,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: ease.smooth,
          paused: !isVisible,
          onUpdate: () => displacementElement.setAttribute("scale", String(disp.scale)),
        }),
      );
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollIdle) window.clearTimeout(scrollIdle);
      observer.disconnect();
      context.revert();
    };
  }, []);

  return (
    <div ref={container} className="why-reflection" aria-hidden="true">
      <svg viewBox="0 0 1200 520" preserveAspectRatio="none" role="presentation">
        <defs>
          <filter id="liquid-why" x="-20%" y="-20%" width="140%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbulence} type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="8" result="noise" />
            <feDisplacementMap ref={displacement} in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="B" />
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
          <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#777" stopOpacity="0.72" />
            <stop offset="0.7" stopColor="#aaa" stopOpacity="0.18" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="reflection-mask">
            <rect width="1200" height="520" fill="url(#reflection-fade)" />
          </mask>
        </defs>
        <text x="600" y="390" textAnchor="middle" className="why-reflection-text" mask="url(#reflection-mask)" filter="url(#liquid-why)">WHY</text>
      </svg>
      <div className="why-ripple ripple-one" />
      <div className="why-ripple ripple-two" />
    </div>
  );
}
