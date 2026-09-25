"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

const cards = [
  { label: "@ENGINEERING", image: "/images/hero/coco-1282.jpg", alt: "Developers working together in an engineering lab" },
  { label: "@AI / WORKFLOWS", image: "/images/hero/coco-1274.jpg", alt: "A robotics and hardware engineering workshop" },
  { label: "@COMMUNITY", image: "/images/hero/SUP00295.JPG", alt: "A large developer hackathon community" },
  { label: "@OPEN SOURCE", image: "/images/hero/SUP00163.JPG", alt: "Developers building together at a technical event" },
  { label: "@PRODUCT", image: "/images/hero/SUP00628.JPG", alt: "A collaborative engineering and product workshop" },
  { label: "@EVENTS", image: "/images/hero/IMG-20251002-WA0387.jpg", alt: "Akshat at a developer relations event" },
] as const;

const baseRotations = [-5, 3, -2, 5, -3, 5];

export function HeroCards() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const container = cardsRef.current;
    if (!container) return;

    const driftTweens: gsap.core.Tween[] = [];

    const context = gsap.context(() => {
      const drifts = container.querySelectorAll<HTMLElement>(".hero-card-drift");
      drifts?.forEach((drift, index) => {
        driftTweens.push(
          gsap.to(drift, {
            y: index % 2 === 0 ? -7 : 7,
            rotation: index % 2 === 0 ? -0.7 : 0.7,
            duration: 4.6 + index * 0.22,
            delay: index * 0.14,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        );
      });
    }, container);

    // Pause the idle drift animation when the hero is scrolled off-screen.
    // These yoyo tweens run continuously — pausing them when invisible frees
    // up compositor/CPU budget for the sections the user is actually viewing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        driftTweens.forEach((tween) => {
          if (entry.isIntersecting) tween.resume();
          else tween.pause();
        });
      },
      { threshold: 0.01 },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  const handleMove = (event: React.PointerEvent<HTMLElement>, index: number) => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const base = baseRotations[index] ?? 0;
    gsap.to(card, {
      x: x * 9,
      y: y * 8,
      rotate: base * 0.58 + x * 0.8,
      scale: 1.03,
      duration: 0.65,
      ease: "power4.out",
      overwrite: "auto",
    });
    gsap.to(card.querySelector(".hero-card-image img"), {
      scale: 1.05,
      duration: 0.75,
      ease: "power4.out",
      overwrite: "auto",
    });
  };

  const handleLeave = (event: React.PointerEvent<HTMLElement>, index: number) => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const card = event.currentTarget;
    const base = baseRotations[index] ?? 0;
    gsap.to(card, { x: 0, y: 0, rotate: base, scale: 1, duration: 0.9, ease: "power4.out" });
    gsap.to(card.querySelector(".hero-card-image img"), { scale: 1, duration: 0.9, ease: "power4.out" });
  };

  return (
    <div ref={cardsRef} className="hero-cards" aria-label="Akshat's work in engineering, AI and community">
      {cards.map((card, index) => (
        <article
          className={`hero-card hero-card-${index + 1}`}
          key={card.label}
          onPointerMove={(event) => handleMove(event, index)}
          onPointerLeave={(event) => handleLeave(event, index)}
          data-cursor="VIEW"
          data-hero-card
          tabIndex={0}
          aria-label={card.alt}
        >
          <div className="hero-card-drift" data-hero-drift>
            <div className="hero-card-image">
              <Image src={card.image} alt={card.alt} fill sizes="(max-width: 700px) 42vw, (max-width: 900px) 26vw, 25vw" priority={index < 3} />
              <div className="hero-card-overlay"><span>VIEW FIELD NOTE</span><span>↗</span></div>
            </div>
            <span className="hero-card-label">{card.label}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
