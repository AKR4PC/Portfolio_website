export type Project = {
  number: string;
  name: string;
  type: string;
  description: string;
  image: string;
  tech: string[];
  highlights: string[];
  href?: string;
};

/** Replace the reserved links with final case-study or article URLs when available. */
export const projects: Project[] = [
  {
    number: "01",
    name: "EMPIREUI",
    type: "Open source AI-ready UI library",
    description:
      "A creative component system for building interfaces that feel alive. 40+ accessible components meet AI actions, WebGL physics and a liquid-glass cursor language.",
    image: "/images/projects/empireui.png",
    tech: ["TypeScript", "React", "Next.js", "Three.js", "Tailwind CSS"],
    highlights: ["40+ components", "AI-ready primitives", "WebGL interactions"],
    href: "https://empireui.com",
  },
  {
    number: "02",
    name: "PAGIO",
    type: "AI-powered productivity platform",
    description:
      "A focused workspace for turning unstructured notes into useful action with summarization, auto-tagging and notes-to-tasks workflows.",
    image: "/images/projects/pagio.svg",
    tech: ["Next.js", "Node.js", "Python", "Appwrite", "OpenAI GPT-4"],
    highlights: ["5,000+ documents", "Auto-tagging", "Notes-to-tasks"],
    href: "#contact",
  },
  {
    number: "03",
    name: "HYBRID SEARCH",
    type: "Technical article / AI property search",
    description:
      "Published a technical deep-dive on why vector search alone is not enough, building an AI property search with advanced filtering and Qdrant.",
    image: "/images/projects/article.jpg",
    tech: ["AI", "Vector Search", "Qdrant", "Advanced Filtering"],
    highlights: ["Technical deep-dive", "AI property search", "Qdrant"],
    href: "https://pub.towardsai.net/why-vector-search-alone-isnt-enough-building-ai-property-search-with-advanced-filtering-1e60ae82b259",
  },
];
