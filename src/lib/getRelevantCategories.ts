import { createClient } from '@/lib/supabase/server';
import { ArticleCategory } from '@/lib/types';

export async function getRelevantCategories(): Promise<ArticleCategory[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('category, published_date')
      .eq('status', 'published');

    if (error || !data) return [];

    const stats: Record<string, { count: number; latestDate: number }> = {};

    data.forEach((article: any) => {
      const cat = article.category as ArticleCategory;
      const date = new Date(article.published_date).getTime();
      
      if (!stats[cat]) {
        stats[cat] = { count: 1, latestDate: date };
      } else {
        stats[cat].count += 1;
        if (date > stats[cat].latestDate) {
          stats[cat].latestDate = date;
        }
      }
    });

    const categories = Object.entries(stats).map(([category, stat]) => ({
      category: category as ArticleCategory,
      score: stat.count * 10 + (Date.now() - stat.latestDate < 30 * 24 * 60 * 60 * 1000 ? 5 : 0)
    }));

    categories.sort((a, b) => b.score - a.score);

    return categories.map(c => c.category);
  } catch {
    return [];
  }
}
