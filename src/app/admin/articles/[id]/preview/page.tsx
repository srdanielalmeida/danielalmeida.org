import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArticleContent } from '@/components/ArticleContent';
import { Arabesque } from '@/components/Arabesque';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { formatDate } from '@/lib/utils';

async function getArticle(id: string): Promise<Article | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Article;
  } catch {
    return null;
  }
}

export default async function PreviewArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="p-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/articles/${id}/edit`}
            className="btn-secondary text-sm"
          >
            ← Voltar para Edição
          </Link>
          <span className={`badge ${article.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
            {article.status === 'published' ? 'Publicado' : 'Rascunho'}
          </span>
        </div>
        {article.status === 'published' && (
          <Link
            href={`/blog/${article.slug}`}
            className="font-ui text-xs text-navy hover:text-gold transition-colors"
            target="_blank"
          >
            Ver no blog →
          </Link>
        )}
      </div>

      {/* Preview Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm max-w-[700px] mx-auto overflow-hidden">
        {/* Cover */}
        {article.cover_image_url && (
          <div className="w-full h-64 bg-cream-dark overflow-hidden">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="badge badge-category">
                {CATEGORY_LABELS[article.category]}
              </span>
              <span className="font-ui text-xs text-bronze/50">
                {article.reading_time_minutes} min de leitura
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl text-navy font-semibold leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex items-center justify-center gap-2 font-ui text-sm text-bronze/60">
              <span>Daniel Almeida</span>
              <span className="text-bronze/30">·</span>
              <time>{formatDate(article.published_date)}</time>
            </div>

            <Arabesque variant="divider" className="mt-6" />
          </div>

          <ArticleContent content={article.content} />
        </div>
      </div>
    </div>
  );
}
