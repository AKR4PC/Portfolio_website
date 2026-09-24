import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  const content = (
    <>
      <div className="article-image-wrap">
        <Image src={article.image} alt={`${article.title} editorial visual`} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" />
        <span className="article-image-arrow"><ArrowUpRight size={18} strokeWidth={1.3} /></span>
      </div>
      <div className="article-card-body">
        <div className="article-meta"><span>{article.category}</span><span>{article.date}</span></div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-card-foot"><span>{article.readingTime}</span><span>{article.href ? "Read article" : "Link coming soon"}</span></div>
      </div>
    </>
  );

  if (article.href) {
    return <a className="article-card" href={article.href} data-cursor="READ">{content}</a>;
  }
  return <article className="article-card is-draft" tabIndex={0} aria-label={`${article.title} — link coming soon`} data-cursor="READ">{content}</article>;
}
