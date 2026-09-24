"use client";

import { useEffect, useRef, useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { skillCategories } from "@/data/skills";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

export function SkillsSection() {
  const [activeId, setActiveId] = useState("devrel");
  const skillCloud = useRef<HTMLDivElement>(null);
  const active = skillCategories.find((category) => category.id === activeId) ?? skillCategories[0];

  useEffect(() => {
    const cloud = skillCloud.current;
    if (!cloud || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      gsap.fromTo(cloud.querySelectorAll("[data-skill-chip]"), { opacity: 0, y: 12, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.035, ease: ease.smooth });
    }, cloud);
    return () => context.revert();
  }, [activeId]);

  return (
    <section id="skills" className="skills-section section-dark" data-nav-theme="dark">
      <div className="page-grid skills-heading">
        <SectionEyebrow index="08" light>The working toolkit</SectionEyebrow>
        <p>Not a checklist.<br />A set of ways in.</p>
      </div>
      <div className="page-grid skills-layout">
        <div className="skills-index" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeId === category.id}
              className={`skill-index-button ${activeId === category.id ? "is-active" : ""}`}
              onMouseEnter={() => setActiveId(category.id)}
              onFocus={() => setActiveId(category.id)}
              onClick={() => setActiveId(category.id)}
              key={category.id}
            >
              <span>{category.index}</span><strong>{category.name}</strong><i>↗</i>
            </button>
          ))}
        </div>
        <div className="skills-display">
          <div className="skills-display-top"><span>{active.index} / 04</span><span>{active.description}</span></div>
          <h2>{active.shortName}</h2>
          <div ref={skillCloud} className="skill-cloud" aria-label={`${active.name} skills`}>
            {active.skills.map((skill) => <span className="skill-chip" data-skill-chip key={skill}>{skill}</span>)}
          </div>
          <div className="skills-display-footer"><span>Depth changes with the problem.</span><span>Scroll / hover to explore</span></div>
        </div>
      </div>
    </section>
  );
}
