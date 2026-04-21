import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { ArticleListItem, ArticleMeta } from "@/types/article";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getAllMdxFiles(): string[] {
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name))
    .map((e) => e.name);
}

function getSlugFromFileName(fileName: string): string {
  return fileName.replace(/\.(md|mdx)$/, "");
}

function parseMetaFromSource(source: string): ArticleMeta | null {
  const match = source.match(/export const meta\s*=\s*(\{[\s\S]*?\})\s*;?/);

  if (!match) return null;

  try {
    const meta = Function(
      `"use strict"; return (${match[1]});`,
    )() as ArticleMeta;
    return meta;
  } catch {
    return null;
  }
}

function getMetaFromFile(fileName: string): ArticleMeta | null {
  const filePath = path.join(CONTENT_DIR, fileName);
  const source = fs.readFileSync(filePath, "utf-8");
  return parseMetaFromSource(source);
}

type MdxModule = {
  default: React.ComponentType;
  meta: ArticleMeta;
};

export const getAllArticleSlugs = cache(async (): Promise<string[]> => {
  return getAllMdxFiles().map((fileName) => getSlugFromFileName(fileName));
});

export const getAllArticles = cache(
  async (query?: string, type?: string): Promise<ArticleListItem[]> => {
    const files = getAllMdxFiles();

    const articles = files
      .map((fileName) => {
        const slug = getSlugFromFileName(fileName);
        const meta = getMetaFromFile(fileName);

        if (!meta) return null;

        return {
          slug,
          ...meta,
        };
      })
      .filter((article): article is ArticleListItem => article !== null);

    const filteredArticles = articles
      .filter((article) => article.published)
      .filter((article) => {
        if (!query) return true;
        const searchTerm = query.toLowerCase();

        if (type === "category") {
          return article.category?.toLowerCase().includes(searchTerm);
        }

        return (
          article.title?.toLowerCase().includes(searchTerm) ||
          article.description?.toLowerCase().includes(searchTerm) ||
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
  async (slug: string): Promise<ArticleMeta | null> => {
    const files = getAllMdxFiles();

    const fileName = files.find((file) => getSlugFromFileName(file) === slug);

    if (!fileName) return null;

    const meta = getMetaFromFile(fileName);
    if (!meta) return null;

    if (!meta.published && process.env.NODE_ENV === "production") return null;

    return meta;
  },
);

export const getArticleBySlug = cache(
  async (
    slug: string,
  ): Promise<{ meta: ArticleMeta; Post: React.ComponentType } | null> => {
    const files = getAllMdxFiles();

    const fileName = files.find((file) => getSlugFromFileName(file) === slug);

    if (!fileName) return null;

    const meta = getMetaFromFile(fileName);
    if (!meta) return null;

    if (!meta.published && process.env.NODE_ENV === "production") return null;

    const mod = (await import(`@/content/${fileName}`)) as MdxModule;

    return {
      meta,
      Post: mod.default,
    };
  },
);
