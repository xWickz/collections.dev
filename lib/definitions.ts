import type { ArticleListItem } from "@/types/article";

export type NavbarItems = {
  readonly name: string;
  readonly link: string;
};

export type SearchParams = { query?: string; type?: string };

export type ArticleSource = (
  query?: string,
  type?: string,
) => Promise<ArticleListItem[]>;
