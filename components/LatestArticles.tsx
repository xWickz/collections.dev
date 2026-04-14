import ArticleCard from "@/components/ui/article-card";
import { getAllArticles } from "@/lib/mdx";

const MAX_ARTICLES: Readonly<number> = 10;

export default async function LatestArticles({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query || "";
  const articles = (await getAllArticles(query)).slice(0, MAX_ARTICLES);
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
