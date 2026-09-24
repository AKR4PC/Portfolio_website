export type Article = {
  title: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  excerpt: string;
  href?: string;
};

/**
 * These are editorial placeholders, not published articles. Replace titles,
 * dates and href values here when final articles are available.
 */
export const articles: Article[] = [
  {
    title: "Building interfaces that respond like matter",
    category: "Creative development",
    date: "Coming soon",
    readingTime: "Draft",
    image: "/images/articles/interface-matter.svg",
    excerpt: "Notes on WebGL, motion and the small decisions that make digital products feel physical.",
  },
  {
    title: "A practical map of AI-assisted development",
    category: "AI",
    date: "Coming soon",
    readingTime: "Draft",
    image: "/images/articles/ai-workflows.svg",
    excerpt: "A field note on turning powerful models into clear, useful developer workflows.",
  },
  {
    title: "Open source is a developer experience",
    category: "Open source",
    date: "Coming soon",
    readingTime: "Draft",
    image: "/images/articles/open-source.svg",
    excerpt: "What changes when the library, the documentation and the community are designed together.",
  },
  {
    title: "The room is part of the product",
    category: "Developer relations",
    date: "Coming soon",
    readingTime: "Draft",
    image: "/images/articles/developer-room.svg",
    excerpt: "Why thoughtful events create the conditions for better products and stronger communities.",
  },
  {
    title: "Designing for the space between code and people",
    category: "Communities",
    date: "Coming soon",
    readingTime: "Draft",
    image: "/images/articles/code-people.svg",
    excerpt: "A visual essay on engineering, advocacy and the practice of making technology understandable.",
  },
  {
    title: "Small systems, legible decisions",
    category: "System design",
    date: "Coming soon",
    readingTime: "Draft",
    image: "/images/articles/small-systems.svg",
    excerpt: "A compact guide to making technical systems easier to understand, extend and trust.",
  },
];
