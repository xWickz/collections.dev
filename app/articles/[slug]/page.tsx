import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/container";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getArticleMetaBySlug,
} from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getArticleMetaBySlug(slug);

  if (!meta) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.meta.published) {
    notFound();
  }

  const { Post, meta } = article;
  const dateStr = meta.publishedAt;
  const dateObj = new Date(`${dateStr}T00:00:00`);
  const formattedDate = dateObj.toLocaleDateString("es-ES", {
    month: "long",
    day: "numeric",
  });

  return (
    <main className="py-12 bg-void-eclipse text-snow-white min-h-screen">
      <Container>
        <article className="prose prose-invert max-w-none font-sans">
          <header className="mb-10 border-b border-white/10 pb-6">
            <p className="mb-1 text-sm uppercase tracking-tight text-zinc-500 text-center">
              <Link
                href={`/articles?type=category&query=${encodeURIComponent(meta.category)}`}
                className="hover:text-zinc-300 transition-colors"
              >
                {meta.category}
              </Link>
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-center">
              {meta.title.replace("| collections.dev", "")}
            </h1>
            <p className="text-snow-white/90 text-center text-md font-medium mt-4">
              {meta.description}
            </p>
            <p className="mt-5 -mb-4 text-zinc-400 text-sm">
              {meta.author && (
                <Image
                  src={`https://avatars.githubusercontent.com/${encodeURIComponent(meta.author)}?s=32&v=4`}
                  alt={meta.author}
                  width={32}
                  height={32}
                  className="rounded-full inline-block mr-2"
                />
              )}
              <strong>{meta.author ?? "Autor desconocido"}</strong>
              {formattedDate && ` - ${formattedDate}`}
            </p>
          </header>

          <Post />
        </article>
      </Container>
    </main>
  );
}
