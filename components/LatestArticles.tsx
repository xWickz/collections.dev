import ArticleCard from "@/components/ui/article-card";
import SkeletonArticleCard from "@/components/ui/SkeletonArticleCard";
import type { ArticleSource, SearchParams } from "@/lib/definitions";

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
      <div className="mt-8 mb-6 h-8 w-56 animate-pulse rounded bg-foreground/10" />
      <div className="grid gap-4 md:grid-cols-2">
        {SKELETON_IDS.map((id) => (
          <SkeletonArticleCard key={id} />
        ))}
      </div>
    </section>
  );
}

export default async function LatestArticles({
  source,
  searchParams,
}: {
  source: ArticleSource;
  searchParams?: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const type = params?.type || "articles";
  const query = params?.query || "";

  const articles = (await source(query, type)).slice(0, MAX_ARTICLES);
  return (
    <>
      <h2 className="text-2xl font-semibold text-foreground mt-8 mb-6 tracking-tight font-pixel">
        Últimos artículos
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <p className="text-foreground/60">No se encontraron artículos.</p>
        )}
      </div>
    </>
  );
}
