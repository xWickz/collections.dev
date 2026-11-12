import Link from "next/link";
import type { ArticleListItem } from "@/types/article";

type Props = {
  article: ArticleListItem;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="flex flex-col h-full rounded-md border border-foreground/20 bg-foreground/5 p-5 font-pixel">
      <div className="grow">
        <h2 className="mb-0.5 text-xl font-semibold text-foreground tracking-tight">
          <Link href={`/articles/${article.slug}`} className="hover:underline">
            {article.title.replace("| collections.dev", "")}
          </Link>
        </h2>

        <p className="mb-4 text-foreground/90 tracking-tight">
          {article.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
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
