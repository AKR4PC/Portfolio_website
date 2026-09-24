import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GridDistortion } from "@/components/effects/GridDistortion";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section-dark" data-nav-theme="dark">
      <div className="page-grid contact-topline">
        <SectionEyebrow index="09" light>Open channel</SectionEyebrow>
        <span>Have a good problem?</span>
      </div>
      <div className="page-grid contact-cta-wrap">
        <a href={`mailto:${profile.email}`} className="contact-cta" data-cursor="TALK">
          <GridDistortion />
          <span className="contact-cta-line">BUILD SOMETHING</span>
          <span className="contact-cta-line contact-cta-indent">PEOPLE <em>REMEMBER.</em></span>
          <span className="contact-cta-arrow"><ArrowUpRight size={44} strokeWidth={1.05} /></span>
        </a>
      </div>
      <div className="page-grid contact-details">
        <div className="contact-detail-block">
          <span className="contact-detail-label">Find me around the web</span>
          <div className="contact-links">
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN"><Linkedin size={17} strokeWidth={1.4} /> LinkedIn <ArrowUpRight size={15} /></a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" data-cursor="OPEN"><Github size={17} strokeWidth={1.4} /> GitHub <ArrowUpRight size={15} /></a>
            <a href={`mailto:${profile.email}`} data-cursor="WRITE"><Mail size={17} strokeWidth={1.4} /> Email <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="contact-detail-block contact-education">
          <span className="contact-detail-label">Education</span>
          <strong>{profile.education.school}</strong>
          <span>{profile.education.degree}</span>
        </div>
      </div>
      <footer className="site-footer page-grid">
        <div className="footer-name"><strong>AKSHAT KUMAR</strong><span>Developer<br />Developer Relations<br />Community Builder</span></div>
        <div className="footer-links"><a href="#about" data-cursor="TOP">About</a><a href="#events" data-cursor="OPEN">Events</a></div>
        <div className="footer-meta"><span>© 2026 Akshat Kumar</span><span>Made with intent / not a template</span></div>
      </footer>
    </section>
  );
}
