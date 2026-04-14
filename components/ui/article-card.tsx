import Link from "next/link";
import type { ArticleListItem } from "@/types/article";

type Props = {
  article: ArticleListItem;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="rounded-md border border-white/20 bg-midnight-abyss p-5 font-pixel">
      <p className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-snow-white/80 w-min mb-2">
        {article.category}
      </p>

      <h2 className="mb-0.5 text-xl font-semibold text-snow-white tracking-tight">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title.replace("| collections.dev", "")}
        </Link>
      </h2>

      <p className="mb-4 text-snow-white/90 tracking-tight">
        {article.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-snow-white/80"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
