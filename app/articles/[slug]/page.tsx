import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClientTranslator from "@/components/ClientTranslator";
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
    alternates: { canonical: `/articles/${slug}` },
    authors: meta.author
      ? [{ name: meta.author, url: `https://github.com/${meta.author}` }]
      : undefined,
    openGraph: {
      type: "article",
      locale: "es_ES",
      url: `/articles/${slug}`,
      title: meta.title,
      description: meta.description,
      siteName: "collections.dev",
      publishedTime: meta.publishedAt,
      tags: meta.tags,
      section: meta.category,
      authors: meta.author ? [`https://github.com/${meta.author}`] : undefined,
    },
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
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const url = `https://collections.wickz.dev/articles/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title,
      description: meta.description,
      url,
      mainEntityOfPage: url,
      inLanguage: "es",
      datePublished: meta.publishedAt,
      dateModified: meta.publishedAt,
      keywords: meta.tags.join(", "),
      articleSection: meta.category,
      image: `${url}/opengraph-image`,
      author: meta.author
        ? {
            "@type": "Person",
            name: meta.author,
            url: `https://github.com/${meta.author}`,
          }
        : undefined,
      publisher: {
        "@type": "Organization",
        name: "collections.dev",
        url: "https://collections.wickz.dev",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://collections.wickz.dev" },
        { "@type": "ListItem", position: 2, name: "Artículos", item: "https://collections.wickz.dev/articles" },
        { "@type": "ListItem", position: 3, name: meta.title, item: url },
      ],
    },
  ];

  return (
    <div className="py-12 bg-background text-foreground min-h-screen">
      {jsonLd.map((d) => (
        <script
          key={d["@type"]}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
      <Container>
        <article className="prose prose-invert max-w-none font-sans">
          <header className="mb-10 border-b border-foreground/10 pb-6">
            <p className="mb-1 text-sm uppercase tracking-tight text-foreground/60 text-center">
              <Link
                href={`/articles?type=category&query=${encodeURIComponent(meta.category)}`}
                className="hover:text-foreground/80 transition-colors"
              >
                {meta.category}
              </Link>
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-center">
              {meta.title.replace("| collections.dev", "")}
            </h1>
            <p className="text-foreground/90 text-center text-md font-medium mt-4">
              {meta.description}
            </p>
            <p className="mt-5 -mb-4 text-foreground/70 text-sm">
              {meta.author && (
                <Image
                  src={`https://avatars.githubusercontent.com/${encodeURIComponent(meta.author)}?s=32&v=4`}
                  alt={meta.author}
                  width={32}
                  height={32}
                  unoptimized
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

      <ClientTranslator defaultTarget="en" />
    </div>
  );
}
