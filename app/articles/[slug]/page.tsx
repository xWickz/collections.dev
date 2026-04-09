import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: article.meta.title,
    description: article.meta.description,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.meta.published) {
    notFound();
  }

  const { Post, meta } = article;

  return (
    <main className="py-12">
      <Container>
        <article className="prose prose-invert max-w-none font-sans">
          <header className="mb-10 border-b border-white/10 pb-6">
            <p className="mb-3 text-sm uppercase tracking-tight text-zinc-500">
              {meta.category}
            </p>

            <h1 className="mb-3 text-4xl font-bold tracking-tight">
              {meta.title.replace("| collections.dev", "")}
            </h1>

            <p className="text-black">{meta.description}</p>
          </header>

          <Post />
        </article>
      </Container>
    </main>
  );
}
