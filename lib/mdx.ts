import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { ArticleListItem, ArticleMeta } from "@/types/article";

const CONTENT_DIR = path.join(process.cwd(), "content");

// En desarrollo los borradores son visibles para poder previsualizarlos.
const showDrafts = process.env.NODE_ENV !== "production";

type MdxModule = {
  default: React.ComponentType;
  meta: ArticleMeta;
};

function getAllMdxFiles(): string[] {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name))
    .map((e) => e.name);
}

function getSlugFromFileName(fileName: string): string {
  return fileName.replace(/\.(md|mdx)$/, "");
}

// El `meta` lo exporta el propio MDX, compilado por @next/mdx.
const loadArticle = cache(async (slug: string) => {
  const fileName = getAllMdxFiles().find(
    (file) => getSlugFromFileName(file) === slug,
  );
  if (!fileName) return null;

  const mod = (await import(`@/content/${fileName}`)) as MdxModule;
  if (!mod.meta || (!mod.meta.published && !showDrafts)) return null;

  return { meta: mod.meta, Post: mod.default };
});

export const getAllArticleSlugs = cache(async (): Promise<string[]> => {
  const slugs = getAllMdxFiles().map(getSlugFromFileName);
  const articles = await Promise.all(slugs.map(loadArticle));
  return slugs.filter((_, i) => articles[i]);
});

export const getAllArticles = cache(
  async (query?: string, type?: string): Promise<ArticleListItem[]> => {
    const slugs = getAllMdxFiles().map(getSlugFromFileName);
    const loaded = await Promise.all(slugs.map(loadArticle));

    const articles: ArticleListItem[] = [];
    slugs.forEach((slug, i) => {
      const meta = loaded[i]?.meta;
      // Los listados públicos (home, sitemap, llms.txt) nunca muestran borradores.
      if (meta?.published) {
        articles.push({ slug, ...meta, tags: [...new Set(meta.tags)] });
      }
    });

    const searchTerm = query?.toLowerCase();
    const filteredArticles = articles.filter((article) => {
      if (!searchTerm) return true;

      if (type === "category") {
        return article.category.toLowerCase().includes(searchTerm);
      }

      return (
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });

    return filteredArticles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  },
);

export const getArticleMetaBySlug = cache(
  async (slug: string): Promise<ArticleMeta | null> =>
    (await loadArticle(slug))?.meta ?? null,
);

export const getArticleBySlug = loadArticle;
