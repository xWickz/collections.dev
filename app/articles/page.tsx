import type { Metadata } from "next";
import ArticleCard from "@/components/ui/article-card";
import Container from "@/components/ui/container";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Articulos | collections.dev",
  description: "Specific page description",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main className="py-12 font-sans">
      <Container>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Articulos</h1>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </main>
  );
}
