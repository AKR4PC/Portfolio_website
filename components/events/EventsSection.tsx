import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EventToggle } from "@/components/events/EventToggle";

export function EventsSection() {
  return (
    <section id="events" className="events-section section-light" data-nav-theme="light">
      <div className="page-grid events-heading">
        <SectionEyebrow index="04">Rooms where developers build</SectionEyebrow>
        <div className="events-heading-main">
          <h2>TECHNOLOGY IS BETTER<br />WHEN PEOPLE <em>BUILD</em> TOGETHER.</h2>
          <p>From workshops to national-level hackathons, I create the conditions for people to learn in public, find their people and ship something they care about.</p>
        </div>
      </div>
      <div className="page-grid events-browser-wrap"><EventToggle /></div>
    </section>
  );
}
