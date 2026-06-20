import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Article } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

async function getDashboardStats() {
  try {
    const supabase = await createClient();
    
    const [articlesResult, subscribersResult, recentResult] = await Promise.all([
      supabase
        .from('articles')
        .select('id', { count: 'exact' })
        .eq('status', 'published'),
      supabase
        .from('newsletter_subscribers')
        .select('id', { count: 'exact' }),
      supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_date', { ascending: false })
        .limit(5),
    ]);

    return {
      totalArticles: articlesResult.count || 0,
      totalSubscribers: subscribersResult.count || 0,
      recentArticles: (recentResult.data as Article[]) || [],
    };
  } catch {
    return {
      totalArticles: 0,
      totalSubscribers: 0,
      recentArticles: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-navy font-semibold">Dashboard</h1>
        <p className="font-ui text-sm text-gray-500 mt-1">
          Visão geral do seu blog
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F3460" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 3 H20 V21 H4 Z" />
                <path d="M8 7 H16 M8 11 H16 M8 15 H12" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-2xl font-bold text-navy">{stats.totalArticles}</p>
              <p className="font-ui text-xs text-gray-500">Artigos Publicados</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4 H20 V16 H13 L8 20 V16 H4 Z" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-2xl font-bold text-navy">{stats.totalSubscribers}</p>
              <p className="font-ui text-xs text-gray-500">Inscritos Newsletter</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12 L11 15 L16 9" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-2xl font-bold text-navy">Ativo</p>
              <p className="font-ui text-xs text-gray-500">Status do Blog</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <Link href="/admin/articles/new" className="btn-primary" id="dashboard-new-article">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3 V13 M3 8 H13" />
          </svg>
          Novo Artigo
        </Link>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-ui text-sm font-semibold text-navy">
            Últimos Artigos Publicados
          </h2>
        </div>

        {stats.recentArticles.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {stats.recentArticles.map(article => (
              <div key={article.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-sm font-medium text-navy truncate">
                    {article.title}
                  </p>
                  <p className="font-ui text-xs text-gray-400 mt-0.5">
                    {formatDateShort(article.published_date)} · {article.reading_time_minutes} min
                  </p>
                </div>
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="font-ui text-xs text-navy/50 hover:text-navy transition-colors ml-4"
                >
                  Editar →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="font-ui text-sm text-gray-400">
              Nenhum artigo publicado ainda.
            </p>
            <Link href="/admin/articles/new" className="font-ui text-xs text-navy hover:text-gold transition-colors mt-2 inline-block">
              Criar primeiro artigo →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
