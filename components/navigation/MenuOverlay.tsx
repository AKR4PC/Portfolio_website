"use client";

import { useEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

const menuItems = [
  ["HOME", "home"],
  ["WHY", "why"],
  ["EVENTS", "events"],
  ["EXPERIENCE", "experience"],
  ["WORK", "work"],
  ["SKILLS", "skills"],
  ["CONTACT", "contact"],
] as const;

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export function MenuOverlay({ open, onClose, onNavigate }: MenuOverlayProps) {
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = panel.current;
    const items = list.current?.querySelectorAll<HTMLElement>("[data-menu-item]");
    if (!element || !items) return;

    if (prefersReducedMotion()) {
      gsap.set(element, { clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" });
      gsap.set(items, { opacity: open ? 1 : 0, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      if (open) {
        gsap.set(element, { pointerEvents: "auto" });
        gsap.timeline()
          .set(element, { visibility: "visible" })
          .to(element, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: ease.cinematic })
          .fromTo(
            items,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.045, ease: ease.cinematic },
            "-=0.45",
          );
      } else {
        gsap.to(element, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => gsap.set(element, { visibility: "hidden", pointerEvents: "none" }),
        });
      }
    }, element);
    return () => context.revert();
  }, [open]);

  return (
    <div ref={panel} className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-overlay-inner">
        <div className="menu-overlay-top">
          <span>AKSHAT KUMAR</span>
          <span>NAVIGATION / 2026</span>
        </div>
        <div ref={list} className="menu-list" role="dialog" aria-modal="true" aria-label="Main navigation">
          {menuItems.map(([label, id], index) => (
            <button
              type="button"
              className="menu-item"
              data-menu-item
              key={id}
              onClick={() => onNavigate(id)}
              tabIndex={open ? 0 : -1}
            >
              <span className="menu-item-index">0{index + 1}</span>
              <span className="menu-item-label">{label}</span>
              <span className="menu-item-arrow">↗</span>
            </button>
          ))}
        </div>
        <div className="menu-overlay-bottom">
          <span>Developer · DevRel · Community</span>
          <span>Scroll to explore</span>
        </div>
      </div>
    </div>
  );
}
