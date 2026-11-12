import type { Metadata } from "next";
import ArticleCard from "@/components/ui/article-card";
import Container from "@/components/ui/container";
import type { SearchParams } from "@/lib/definitions";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Artículos | collections.dev",
  description:
    "Guías y artículos sobre desarrollo web: React, Next.js, CSS, Git, herramientas y más.",
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/articles",
    title: "Artículos | collections.dev",
    description:
      "Guías y artículos sobre desarrollo web: React, Next.js, CSS, Git, herramientas y más.",
    siteName: "collections.dev",
    images: "/opengraph-image",
  },
};

type ArticlesPageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const type = params?.type ?? "articles";
  const articles = await getAllArticles(query, type);

  return (
    <main className="py-12 font-sans bg-background">
      <Container>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Artículos de desarrollo web
          </h1>
        </header>

        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/60">No se encontraron artículos.</p>
        )}
      </Container>
    </main>
  );
}
