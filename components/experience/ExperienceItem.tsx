"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/data/experience";

type ExperienceItemProps = {
  item: Experience;
  index: number;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
};

export function ExperienceItem({ item, index, active, onActivate, onDeactivate }: ExperienceItemProps) {
  return (
    <article
      className={`experience-item ${active ? "is-active" : ""}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={onActivate}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onActivate(); } }}
      tabIndex={0}
      role="button"
      aria-label={`${item.company} — ${item.role}`}
      data-cursor="VIEW"
      aria-expanded={active}
    >
      <div className="experience-row">
        <span className="experience-number">0{index + 1}</span>
        <div className="experience-company-wrap">
          <h3>{item.company}</h3>
          <span className="experience-role">{item.role}</span>
        </div>
        <span className="experience-period">{item.period}</span>
        <span className="experience-arrow"><ArrowUpRight size={20} strokeWidth={1.2} /></span>
      </div>
      <div className="experience-detail">
        <div className="experience-detail-copy">
          <span className="detail-label">What moved</span>
          <ul>
            {item.impact.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <div className="experience-detail-meta">
          <span>{item.location}</span>
          <div className="experience-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
      <div className="experience-mobile-image">
        <Image src={item.image} alt="" fill sizes="100vw" />
      </div>
    </article>
  );
}
