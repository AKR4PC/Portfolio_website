import { profile } from "@/data/profile";
import { RevealWords } from "@/components/ui/RevealWords";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function AboutIntro() {
  return (
    <section id="about" className="about-section section-light" data-nav-theme="light">
      <div className="about-intro page-grid">
        <div className="about-intro-label">
          <SectionEyebrow index="02">About me</SectionEyebrow>
          <span className="about-intro-cross">+</span>
        </div>
        <div className="about-intro-content">
          <RevealWords
            text={profile.aboutIntro}
            className="about-manifesto about-manifesto-intro"
            highlight={["akshat"]}
          />
          <div className="about-fact-list">
            {profile.aboutFacts.map((fact) => (
              <RevealWords
                key={fact}
                text={fact}
                className="about-fact-line"
                highlight={["50+", "100k+", "15+", "technology", "products", "communities", "community"]}
                animate={false}
              />
            ))}
          </div>
          <RevealWords text={profile.aboutSubtext} className="about-subtext" animate={false} />
        </div>
      </div>
    </section>
  );
}
