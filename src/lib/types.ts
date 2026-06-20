export type ArticleCategory = 
  | 'artes-liberais' 
  | 'ensaios-critica' 
  | 'filosofia' 
  | 'notas-escrivaninha';

export type ArticleStatus = 'draft' | 'published';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  content: string;
  excerpt: string;
  cover_image_url: string | null;
  reading_time_minutes: number;
  published_date: string;
  created_at: string;
  updated_at: string;
  status: ArticleStatus;
  author_id: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  verified: boolean;
}

export interface DashboardStats {
  totalArticles: number;
  totalSubscribers: number;
  recentArticles: Article[];
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  'artes-liberais': 'Artes Liberais',
  'ensaios-critica': 'Ensaios & Crítica',
  'filosofia': 'Filosofia',
  'notas-escrivaninha': 'Notas da Escrivaninha',
};

export const CATEGORIES: ArticleCategory[] = [
  'artes-liberais',
  'ensaios-critica',
  'filosofia',
  'notas-escrivaninha',
];
