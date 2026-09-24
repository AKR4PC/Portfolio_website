import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/data/articles";

export function ArticlesSection() {
  return (
    <section id="articles" className="articles-section section-light" data-nav-theme="light">
      <div className="page-grid articles-heading">
        <SectionEyebrow index="07">Notes from the work</SectionEyebrow>
        <div>
          <h2>THINGS I&apos;VE BUILT,<br />BROKEN, <em>LEARNED</em><br />AND WRITTEN ABOUT.</h2>
          <p>Technical notes for the curious. Published links and dates will be added here as the writing becomes public.</p>
        </div>
      </div>
      <div className="page-grid articles-grid">
        {articles.map((article) => <ArticleCard key={article.title} article={article} />)}
      </div>
      <div className="page-grid articles-footnote"><span>Draft notes / 06</span><span>More soon — no fabricated links.</span></div>
    </section>
  );
}
