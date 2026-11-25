export type ArticleMeta = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string; // Fecha de la última revisión real del contenido
  published: boolean;
  author?: string; // Author name must be same as GitHub
};

export type ArticleListItem = ArticleMeta & {
  slug: string;
};
