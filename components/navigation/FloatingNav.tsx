"use client";

import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import { scrollToId } from "@/lib/utils";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const marker = document.elementsFromPoint(window.innerWidth / 2, 100).find((element) => element instanceof HTMLElement && element.closest("[data-nav-theme]")) as HTMLElement | undefined;
      const section = marker?.closest<HTMLElement>("[data-nav-theme]");
      setOnLight(section?.dataset.navTheme === "light");
    };
    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    if (open) window.__portfolioLenis?.stop();
    else window.__portfolioLenis?.start();
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
      <header className={`floating-nav ${onLight ? "nav-on-light" : "nav-on-dark"}`}>
        <button
          className="nav-menu-trigger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          data-cursor="MENU"
        >
          <Menu size={17} strokeWidth={1.6} />
          <span>MENU</span>
        </button>
        <button className="nav-wordmark" type="button" onClick={() => closeAndGo("home")} data-cursor="TOP">
          AKSHAT
        </button>
        <button
          className="nav-contact"
          type="button"
          onClick={() => closeAndGo("contact")}
          data-cursor="TALK"
        >
          <span>LET&apos;S TALK</span>
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </button>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} onNavigate={closeAndGo} />
    </>
  );
}
