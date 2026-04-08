import Link from "next/link";
import type { ArticleListItem } from "@/types/article";

type Props = {
  article: ArticleListItem;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black p-5 font-sans">
      <p className="mb-2 text-xs text-white">{article.category}</p>

      <h2 className="mb-2 text-xl font-semibold text-white">
        <Link href={`/articles/${article.slug}`} className="hover:underline">
          {article.title.replace("| collections.dev", "")}
        </Link>
      </h2>

      <p className="mb-4 text-zinc-300">{article.description}</p>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
