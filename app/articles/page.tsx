import type { Metadata } from "next";
import ArticleCard from "@/components/ui/article-card";
import Container from "@/components/ui/container";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Articulos | collections.dev",
  description: "Specific page description",
};

type ArticlesPageProps = {
  searchParams?: Promise<{ query?: string; type?: string }>;
};

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const type = params?.type ?? "articles";
  const articles = await getAllArticles(query, type);

  return (
    <main className="py-12 font-sans bg-void-eclipse">
      <Container>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Articulos
          </h1>
        </header>

        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-500">No se encontraron articulos.</p>
        )}
      </Container>
    </main>
  );
}
