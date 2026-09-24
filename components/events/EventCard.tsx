"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioEvent } from "@/data/events";
import { scrollToId } from "@/lib/utils";

export function EventCard({ event, index }: { event: PortfolioEvent; index: number }) {
  const visual = event.embedUrl ? (
    <div className="event-embed-wrap">
      <iframe
        src={event.embedUrl}
        title={`${event.title} event embed`}
        loading="lazy"
        frameBorder={0}
        allow="fullscreen; payment"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="event-image-wrap">
      <Image src={event.image} alt={`${event.title} editorial visual`} fill sizes="(max-width: 700px) 92vw, 640px" />
      <div className="event-image-wash" />
      <span className="event-category">{event.category}</span>
      <span className="event-open"><ArrowUpRight size={19} strokeWidth={1.3} /></span>
    </div>
  );

  const details = (
    <div className="event-card-meta">
      <div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
      <div className="event-details">
        <span>{event.date}</span>
        <span>{event.location}</span>
        <span>{event.role}</span>
        {event.audience ? <strong>{event.audience}</strong> : null}
      </div>
    </div>
  );

  if (event.embedUrl) {
    return (
      <article className={`event-card event-card-${index + 1} event-card-embed`} data-cursor="VIEW">
        <div className="event-card-link event-card-link-embed">
          {visual}
          {details}
        </div>
      </article>
    );
  }

  return (
    <article className={`event-card event-card-${index + 1}`} data-cursor="VIEW">
      <a
        href={event.href ?? "#contact"}
        className="event-card-link"
        onClick={(clickEvent) => { if (!event.href) { clickEvent.preventDefault(); scrollToId("contact"); } }}
        {...(event.href && !event.href.startsWith("#") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {visual}
        {details}
      </a>
    </article>
  );
}
