import fs from "node:fs";
import path from "node:path";
import type { ArticleListItem, ArticleMeta } from "@/types/article";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getAllMdxFiles(): string[] {
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && /\.(md|mdx)$/.test(e.name))
    .map((e) => e.name);
}

type MdxModule = {
  default: React.ComponentType;
  meta: ArticleMeta;
};

export async function getAllArticles(): Promise<ArticleListItem[]> {
  const files = getAllMdxFiles();

  const articles = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const mod = (await import(`@/content/${fileName}`)) as MdxModule;

      return {
        slug,
        ...mod.meta,
      };
    }),
  );

  return articles
    .filter((article) => article.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getArticleBySlug(
  slug: string,
): Promise<{ meta: ArticleMeta; Post: React.ComponentType } | null> {
  const files = getAllMdxFiles();

  const fileName = files.find(
    (file) => file.replace(/\.(md|mdx)$/, "") === slug,
  );

  if (!fileName) return null;

  const mod = (await import(`@/content/${fileName}`)) as MdxModule;

  return {
    meta: mod.meta,
    Post: mod.default,
  };
}
