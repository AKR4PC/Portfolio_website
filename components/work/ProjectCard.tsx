"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-cursor="OPEN">
      <a href={project.href ?? "#contact"} className="project-card-link">
        <div className="project-card-image">
          <Image src={project.image} alt={`${project.name} editorial visual`} fill sizes="(max-width: 800px) 92vw, 50vw" />
          <span className="project-image-index">{project.number} / 03</span>
          <span className="project-image-arrow"><ArrowUpRight size={28} strokeWidth={1.1} /></span>
        </div>
        <div className="project-card-body">
          <div className="project-card-topline"><span>{project.type}</span><span>Case study / {project.number}</span></div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-card-bottom">
            <div className="project-tech">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="project-highlights">{project.highlights.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </a>
    </article>
  );
}
