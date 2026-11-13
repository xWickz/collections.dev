import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";

const BASE_URL = "https://collections.wickz.dev";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  // Fecha del artículo más reciente (getAllArticles ya viene ordenado)
  const latest = new Date(`${articles[0]?.publishedAt}T00:00:00`);

  const routes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: latest },
    { url: `${BASE_URL}/articles`, lastModified: latest },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(`${article.publishedAt}T00:00:00`),
  }));

  return [...routes, ...articleRoutes];
}
