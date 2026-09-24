"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap, ease } from "@/lib/motion";
import { events, type EventStatus } from "@/data/events";
import { EventCard } from "@/components/events/EventCard";

export function EventToggle() {
  const [status, setStatus] = useState<EventStatus>("upcoming");
  const cardsRef = useRef<HTMLDivElement>(null);
  const filtered = events.filter((event) => event.status === status);

  useLayoutEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".event-card");
    if (!cards?.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: ease.smooth });
  }, [status]);

  const changeStatus = (next: EventStatus) => {
    if (next === status) return;
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".event-card");
    if (cards?.length) gsap.to(cards, { opacity: 0, y: -12, duration: 0.22, ease: "power2.in" });
    window.setTimeout(() => setStatus(next), 210);
  };

  const toggleStatus = () => {
    changeStatus(status === "past" ? "upcoming" : "past");
  };

  const handleToggleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleStatus();
    }
  };

  const chooseStatus = (next: EventStatus) => {
    changeStatus(status === next ? (next === "past" ? "upcoming" : "past") : next);
  };

  return (
    <div className="events-browser">
      <div
        className="event-toggle"
        role="tablist"
        aria-label="Event status"
        tabIndex={0}
        onClick={toggleStatus}
        onKeyDown={handleToggleKeyDown}
      >
        <span className={`event-toggle-indicator is-${status}`} aria-hidden="true" />
        {(["upcoming", "past"] as EventStatus[]).map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={status === item}
            aria-controls="event-grid"
            className={status === item ? "is-active" : ""}
            onClick={(event) => {
              event.stopPropagation();
              chooseStatus(item);
            }}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div ref={cardsRef} id="event-grid" role="tabpanel" aria-live="polite" className={`event-grid event-grid-${status}`}>
        {filtered.map((event, index) => <EventCard key={event.title} event={event} index={index} />)}
      </div>
    </div>
  );
}
