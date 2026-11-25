import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  // Fecha del artículo más reciente (getAllArticles ya viene ordenado)
  const latest = new Date(`${articles[0]?.publishedAt}T00:00:00`);

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: latest },
    { url: `${SITE_URL}/articles`, lastModified: latest },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(
      `${article.updatedAt ?? article.publishedAt}T00:00:00`,
    ),
  }));

  return [...routes, ...articleRoutes];
}
