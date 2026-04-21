import ArticleCard from "@/components/ui/article-card";
import SkeletonArticleCard from "@/components/ui/SkeletonArticleCard";
import { getAllArticles } from "@/lib/mdx";

const MAX_ARTICLES: Readonly<number> = 10;
const SKELETON_IDS = [
  "latest-skeleton-1",
  "latest-skeleton-2",
  "latest-skeleton-3",
  "latest-skeleton-4",
  "latest-skeleton-5",
  "latest-skeleton-6",
] as const;

export function LatestArticlesSkeleton() {
  return (
    <section aria-busy="true" aria-label="Cargando últimos artículos">
      <div className="mt-8 mb-6 h-8 w-56 animate-pulse rounded bg-white/10" />
      <div className="grid gap-4 md:grid-cols-2">
        {SKELETON_IDS.map((id) => (
          <SkeletonArticleCard key={id} />
        ))}
      </div>
    </section>
  );
}

export default async function LatestArticles({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; type?: string }>;
}) {
  const type = (await searchParams)?.type || "articles";
  const query = (await searchParams)?.query || "";

  const articles = (await getAllArticles(query, type)).slice(0, MAX_ARTICLES);
  return (
    <>
      <h2 className="text-2xl font-semibold text-snow-white mt-8 mb-6 tracking-tight font-pixel">
        Últimos artículos
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <p className="text-zinc-500">No se encontraron artículos.</p>
        )}
      </div>
    </>
  );
}
