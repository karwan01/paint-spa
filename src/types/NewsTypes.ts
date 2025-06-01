export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  publishedAt: string;
  author?: string;
  readTime?: string;
  isMainNews?: boolean;
}
