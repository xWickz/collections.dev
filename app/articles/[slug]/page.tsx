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
import { formatDate, SITE_URL } from "@/lib/site";

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
      modifiedTime: meta.updatedAt ?? meta.publishedAt,
      tags: meta.tags,
      section: meta.category,
      authors: meta.author ? [`https://github.com/${meta.author}`] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { Post, meta } = article;
  const formattedDate = formatDate(meta.publishedAt, "long");

  const url = `${SITE_URL}/articles/${slug}`;
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
      dateModified: meta.updatedAt ?? meta.publishedAt,
      keywords: meta.tags.join(", "),
      articleSection: meta.category,
      image: `${url}/opengraph-image`,
      // xWickz es la misma entidad Person de wickz.dev (mismo @id): así
      // buscadores e IAs atribuyen los artículos al autor del portafolio
      author:
        meta.author === "xWickz"
          ? {
              "@type": "Person",
              "@id": "https://wickz.dev/#person",
              name: "Santiago Griman",
              alternateName: ["wickz", "xWickz"],
              url: "https://wickz.dev/",
              sameAs: ["https://github.com/xWickz"],
            }
          : meta.author
            ? {
                "@type": "Person",
                name: meta.author,
                url: `https://github.com/${meta.author}`,
              }
            : undefined,
      publisher: {
        "@type": "Organization",
        name: "collections.dev",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Artículos",
          item: `${SITE_URL}/articles`,
        },
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
        <article className="prose max-w-none font-sans">
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
              {meta.title}
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
