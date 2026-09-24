export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  impact: string[];
  image: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "TRAE",
    role: "Fellow & Community Lead",
    period: "Sep 2025 — Present",
    location: "India",
    impact: [
      "Hosted 5+ technical events across India representing Trae and engaging 500+ developers.",
      "Delivered technical talks on AI-assisted development workflows and platform capabilities to audiences exceeding 500 people.",
    ],
    image: "/images/experience/trae.svg",
    tags: ["Community", "Events", "AI"],
  },
  {
    company: "OMNIDIMENSION",
    role: "Growth & Management Intern — DevRel",
    period: "Oct 2025 — Jan 2026",
    location: "Growth / Developer Relations",
    impact: [
      "Executed 15+ A/B testing initiatives and growth experiments scaling business to $500,000+ ARR.",
      "Led sprint planning and engineering communication, reducing time-to-market by 30%.",
    ],
    image: "/images/experience/omnidimension.svg",
    tags: ["Growth", "Experiments", "Operations"],
  },
  {
    company: "THE MISTY INTERACTIVE STUDIOS",
    role: "AI Full Stack Development Intern",
    period: "May 2025 — Jul 2025",
    location: "Product Engineering",
    impact: [
      "Developed EmpireUI, an open source AI-ready UI library using Three.js, WebGL and React.",
      "Built a full-stack marketplace platform connecting 500+ users; EmpireUI reached 700+ monthly users.",
    ],
    image: "/images/experience/misty.svg",
    tags: ["Engineering", "Open source", "Product"],
  },
  {
    company: "GEEK ROOM",
    role: "Founding Member & Community Lead",
    period: "Aug 2024 — Present",
    location: "16+ chapters",
    impact: [
      "Founded and scaled a coding community to 100,000+ developers across 16+ chapters.",
      "Organized 20+ national-level hackathons with 200,000+ registrations and $50,000+ in prizes.",
    ],
    image: "/images/experience/geek-room.svg",
    tags: ["Community", "Hackathons", "Education"],
  },
];
