export type EventStatus = "upcoming" | "past";

export type PortfolioEvent = {
  title: string;
  status: EventStatus;
  date: string;
  location: string;
  role: string;
  description: string;
  audience?: string;
  image: string;
  category: string;
  href?: string;
  embedUrl?: string;
};

export const events: PortfolioEvent[] = [
  {
    title: "Fish Audio",
    status: "upcoming",
    date: "Current event",
    location: "Luma event",
    role: "Event",
    description: "The current Fish Audio event, with full details and registration available through the Luma embed.",
    image: "/images/events/ai-talk.svg",
    category: "Current event",
    embedUrl: "https://luma.com/embed/event/evt-JIfsWzQiFvjvU6R/simple",
  },
  {
    title: "TrackShift 2026",
    status: "past",
    date: "2026",
    location: "Plaksha University",
    role: "Program Collaborator",
    description:
      "Collaborated with the F1 HAAS Team and Plaksha University to run TrackShift 2026, driving 3,600+ applicant registrations; managed participant onboarding, judge and partner coordination, venue logistics, and program execution.",
    audience: "3,600+ applicants",
    image: "/images/events/AG5A9406.JPG",
    category: "Flagship hackathon",
    href: "https://hackculture.io/challenges/trackshift-2026",
  },
  {
    title: "Code Kshetra 2.0",
    status: "past",
    date: "Flagship hackathon",
    location: "India",
    role: "Host / Community Lead",
    description:
      "Hosted India’s largest hackathon on Devfolio with 17,000+ registrations and 5,000+ teams, bringing 300 shortlisted teams on-ground for the offline finale with Groq, GitHub, and Reactive Networks.",
    audience: "17,000+ registrations · 5,000+ teams",
    image: "/images/events/ck2.jpg",
    category: "India’s largest hackathon",
    href: "https://code-kshetra-2.devfolio.co/overview",
  },
  {
    title: "HackBLR",
    status: "past",
    date: "Bengaluru hackathon",
    location: "Bengaluru, India",
    role: "Hackathon Collaborator",
    description:
      "A hackathon in the Tech Capital of India, bringing 2,000+ participants and 400+ teams together. Collaborated with Vapi, MiniMax, Trae and other ecosystem partners.",
    audience: "2,000+ participants · 400+ teams",
    image: "/images/events/hackblr.HEIC",
    category: "Community hackathon",
    href: "https://luma.com/ia0ik7c6",
  },
];
