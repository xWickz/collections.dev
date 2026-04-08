import Link from "next/link";
import Container from "@/components/container";
import ArticleCard from "@/components/article-card";
import { getAllArticles } from "@/lib/mdx";

const MAX_ARTICLES: number = 4;

export default async function HomePage() {
  const articles = (await getAllArticles()).slice(0, MAX_ARTICLES);

  return (
    <main className="py-12">
      <Container>
        <section className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            collections.dev
          </h1>
          <p className="max-w-2xl text-zinc-700">
            Colección de recursos, artículos y herramientas
          </p>

          <div className="mt-6">
            <Link
              href="/articles"
              className="inline-flex rounded-xl border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10"
            >
              Ver artículos
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Últimos artículos</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
