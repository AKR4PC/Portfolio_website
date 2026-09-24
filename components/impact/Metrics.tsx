"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ease, prefersReducedMotion } from "@/lib/motion";

const metrics = [
  { value: 100, suffix: "K+", label: "Developers in community" },
  { value: 20, suffix: "+", label: "National-level hackathons" },
  { value: 500, suffix: "+", label: "Developers engaged at Trae events" },
  { value: 500, suffix: "K+", prefix: "$", label: "ARR impacted at OmniDimension" },
  { value: 700, suffix: "+", label: "Monthly EmpireUI users" },
  { value: 200, suffix: "K+", label: "Hackathon registrations" },
];

export function Metrics() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    if (prefersReducedMotion()) return;
    const context = gsap.context(() => {
      const values = section.querySelectorAll<HTMLElement>("[data-metric-value]");
      gsap.fromTo(section.querySelectorAll("[data-metric-row]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: ease.smooth, scrollTrigger: { trigger: section, start: "top 76%", once: true } });
      values.forEach((element) => {
        const end = Number(element.dataset.metricValue ?? 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
          onUpdate: () => { element.textContent = `${element.dataset.metricPrefix ?? ""}${Math.round(counter.value)}${element.dataset.metricSuffix ?? ""}`; },
        });
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <div ref={root} className="metrics-grid">
      {metrics.map((metric) => (
        <div className="metric-row" data-metric-row key={metric.label}>
          <div className="metric-value" data-metric-value={metric.value} data-metric-prefix={metric.prefix ?? ""} data-metric-suffix={metric.suffix}>
            {metric.prefix ?? ""}{metric.value}{metric.suffix}
          </div>
          <div className="metric-label">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
