import { Hero } from "@/components/hero/Hero";
import { WhySection } from "@/components/about/WhySection";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { EventsSection } from "@/components/events/EventsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { WorkSection } from "@/components/work/WorkSection";
// import { ArticlesSection } from "@/components/articles/ArticlesSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhySection />
      <ImpactSection />
      <EventsSection />
      <ExperienceSection />
      <WorkSection />
      {/* <ArticlesSection /> */}
      {/* Section 07 is intentionally reserved and commented out until its future content is ready. */}
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
