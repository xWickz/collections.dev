import Link from "next/link";
import { formatDate } from "@/lib/categories";
import type { ArticleListItem } from "@/types/article";

export default function FeaturedArticle({
  article,
}: {
  article: ArticleListItem;
}) {
  return (
    <article className="rounded-md border border-foreground/20 bg-foreground/5 p-6 sm:p-8 font-pixel">
      <p className="mb-2 text-sm text-accent">
        Nuevo · {formatDate(article.publishedAt)}
      </p>
      <h2 className="mb-3 text-3xl max-sm:text-2xl font-semibold tracking-tight text-foreground">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      <p className="mb-5 max-w-3xl text-foreground/90">{article.description}</p>
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-foreground/10 px-2.5 py-1 text-xs text-foreground/80"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
