export type ArticleMeta = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
};

export type ArticleListItem = ArticleMeta & {
  slug: string;
};
