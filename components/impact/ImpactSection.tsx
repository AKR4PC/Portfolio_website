import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Metrics } from "@/components/impact/Metrics";
import { ParticleNetworkDynamic } from "@/components/impact/ParticleNetworkDynamic";

export function ImpactSection() {
  return (
    <section id="impact" className="impact-section section-dark" data-nav-theme="dark">
      <div className="page-grid impact-heading">
        <SectionEyebrow index="03">Measured in people, not pixels</SectionEyebrow>
        <p className="impact-heading-note">Some numbers are loud.<br />The work behind them is quieter.</p>
      </div>
      <div className="page-grid impact-layout">
        <div className="impact-visual-wrap"><ParticleNetworkDynamic /></div>
        <div className="impact-copy-wrap">
          <h2>SCALE IS A<br /><em>SHARED</em> LANGUAGE.</h2>
          <p>Every metric here started with a conversation, a room, a line of code or a question worth exploring together.</p>
          <div className="impact-rule" />
          <div className="impact-caption">THE NETWORK IS NOT A SIDE EFFECT.<br />IT IS THE POINT.</div>
        </div>
      </div>
      <div className="page-grid metrics-wrap"><Metrics /></div>
    </section>
  );
}
