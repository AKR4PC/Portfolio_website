"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/utils";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const observerTargets = useRef<Map<Element, string>>(new Map());

  // Use IntersectionObserver instead of elementsFromPoint on every scroll frame.
  // elementsFromPoint forces a synchronous layout/style recalc per call — on a
  // site with ScrollTrigger-pinned sections that's a major source of jank.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
    if (!sections.length) return;

    const map = observerTargets.current;
    map.clear();

    // Track which themed section is currently at the nav position (~100px from top).
    // The one with the highest intersection ratio at that narrow rootMargin wins.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            map.set(entry.target, (entry.target as HTMLElement).dataset.navTheme ?? "dark");
          } else {
            map.delete(entry.target);
          }
        });

        // The most recently intersecting section at the top wins.
        let currentTheme = "dark";
        const viewportTop = 100;
        let closest = Infinity;
        map.forEach((theme, element) => {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportTop);
          if (rect.top <= viewportTop + 10 && rect.bottom > viewportTop && distance < closest) {
            closest = distance;
            currentTheme = theme;
          }
        });
        setOnLight(currentTheme === "light");
      },
      {
        rootMargin: "-50px 0px -60% 0px",
        threshold: [0, 0.1, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Fallback: still listen to scroll for sections that IO rootMargin might miss
  // (like very short sections).  But throttle to once per ~100ms instead of every frame.
  useEffect(() => {
    let ticking = false;
    const updateTheme = () => {
      const marker = document.elementsFromPoint(window.innerWidth / 2, 100).find(
        (element) => element instanceof HTMLElement && element.closest("[data-nav-theme]"),
      ) as HTMLElement | undefined;
      const section = marker?.closest<HTMLElement>("[data-nav-theme]");
      setOnLight(section?.dataset.navTheme === "light");
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateTheme);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    if (open) window.__portfolioSmoother?.stop();
    else window.__portfolioSmoother?.start();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-is-open");
    };
  }, [open]);

  const closeAndGo = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), 80);
  };

  return (
    <>
      <header className={`floating-nav ${onLight ? "nav-on-light" : "nav-on-dark"} ${open ? "is-menu-open" : ""}`}>
        <button
          className="nav-menu-trigger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          data-cursor={open ? "CLOSE" : "MENU"}
        >
          {open ? <X size={17} strokeWidth={1.8} /> : <Menu size={17} strokeWidth={1.6} />}
          <span>{open ? "CLOSE" : "MENU"}</span>
        </button>
        <button className="nav-wordmark" type="button" onClick={() => closeAndGo("home")} data-cursor="TOP">
          AKSHAT
        </button>
        <a
          className="nav-contact"
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          data-cursor="TALK"
        >
          <span>LET&apos;S TALK</span>
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </a>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} onNavigate={closeAndGo} />
    </>
  );
}
