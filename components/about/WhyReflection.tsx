"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

export function WhyReflection() {
  const turbulence = useRef<SVGFETurbulenceElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const turbulenceElement = turbulence.current;
    const displacementElement = displacement.current;
    if (!turbulenceElement || !displacementElement) return;

    const context = gsap.context(() => {
      const frequency = { x: 0.012, y: 0.04 };
      const displacement = { scale: 22 };
      gsap.to(frequency, {
        x: 0.02,
        y: 0.06,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onUpdate: () => turbulenceElement.setAttribute("baseFrequency", `${frequency.x} ${frequency.y}`),
      });
      gsap.to(displacement, {
        scale: 34,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: ease.smooth,
        onUpdate: () => displacementElement.setAttribute("scale", String(displacement.scale)),
      });
    });
    return () => context.revert();
  }, []);

  return (
    <div className="why-reflection" aria-hidden="true">
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
