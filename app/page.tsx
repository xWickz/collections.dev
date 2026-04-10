import Link from "next/link";
import ArticleCard from "@/components/article-card";
import Container from "@/components/container";
import Search from "@/components/search";
import { getAllArticles } from "@/lib/mdx";

const MAX_ARTICLES: number = 10;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query || "";
  const articles = (await getAllArticles(query)).slice(0, MAX_ARTICLES);

  return (
    <main className="py-12">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

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

            <Search placeholder="Buscar artículos..." />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Últimos artículos</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))
            ) : (
              <p className="text-zinc-500">No se encontraron artículos.</p>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
