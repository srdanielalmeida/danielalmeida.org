import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/ArticleCard';
import { Arabesque } from '@/components/Arabesque';
import { Article, CATEGORIES, CATEGORY_LABELS, ArticleCategory } from '@/lib/types';
import type { Metadata } from 'next';
import { BlogFilters } from './BlogFilters';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre desenvolvimento pessoal, santidade, filosofia e as camadas da personalidade humana.',
};

async function getArticles(category?: string): Promise<Article[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_date', { ascending: false });

    if (category && CATEGORIES.includes(category as ArticleCategory)) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as Article[]) || [];
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = params.categoria;
  const page = parseInt(params.page || '1', 10);
  const perPage = 10;

  const allArticles = await getArticles(category);
  const totalPages = Math.max(1, Math.ceil(allArticles.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const articles = allArticles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-navy font-semibold mb-3">
            Blog
          </h1>
          <p className="font-ui text-sm text-bronze/60 mb-6">
            Todas as reflexões, ordenadas da mais recente à mais antiga.
          </p>
          <Arabesque variant="divider" />
        </div>

        {/* Category Filters */}
        <BlogFilters activeCategory={category} />

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} variant="featured" />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 font-ui text-sm">
                {currentPage > 1 && (
                  <a
                    href={`/blog?${category ? `categoria=${category}&` : ''}page=${currentPage - 1}`}
                    className="px-4 py-2 border border-bronze/20 rounded-md text-navy hover:bg-navy hover:text-cream transition-colors"
                    id="pagination-prev"
                  >
                    ← Anterior
                  </a>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <a
                    key={p}
                    href={`/blog?${category ? `categoria=${category}&` : ''}page=${p}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                      ${p === currentPage 
                        ? 'bg-navy text-cream' 
                        : 'border border-bronze/20 text-navy hover:bg-navy hover:text-cream'
                      }`}
                    id={`pagination-${p}`}
                  >
                    {p}
                  </a>
                ))}

                {currentPage < totalPages && (
                  <a
                    href={`/blog?${category ? `categoria=${category}&` : ''}page=${currentPage + 1}`}
                    className="px-4 py-2 border border-bronze/20 rounded-md text-navy hover:bg-navy hover:text-cream transition-colors"
                    id="pagination-next"
                  >
                    Próximo →
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Arabesque variant="section" className="mb-6" />
            <p className="font-heading text-xl text-navy/50">
              {category 
                ? `Nenhum artigo encontrado em "${CATEGORY_LABELS[category as ArticleCategory] || category}".`
                : 'Nenhum artigo publicado ainda.'}
            </p>
            <p className="font-ui text-sm text-bronze/50 mt-2">
              Volte em breve para novas reflexões.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
