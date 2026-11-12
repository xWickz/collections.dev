import type { ArticleListItem as ListItem } from "@/types/article";

export type NavbarItems = {
  readonly name: string;
  readonly link: string;
};

export type ArticleMeta = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
  author?: string;
};

export type ArticleListItem = ArticleMeta & {
  slug: string;
};

export type SearchParams = { query?: string; type?: string };

export type ArticleSource = (
  query?: string,
  type?: string,
) => Promise<ListItem[]>;
