'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Article, CATEGORY_LABELS, ArticleStatus } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const loadArticles = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    if (search.trim()) {
      query = query.ilike('title', `%${search.trim()}%`);
    }

    const { data } = await query;
    setArticles((data as Article[]) || []);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${title}"?`)) return;

    const supabase = createClient();
    await supabase.from('articles').delete().eq('id', id);
    loadArticles();
  };

  const totalPages = Math.max(1, Math.ceil(articles.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const paginatedArticles = articles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-navy font-semibold">Artigos</h1>
          <p className="font-ui text-sm text-gray-500 mt-1">
            Gerencie seus artigos ({articles.length} {articles.length === 1 ? 'artigo' : 'artigos'})
          </p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary" id="articles-new-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3 V13 M3 8 H13" />
          </svg>
          Novo Artigo
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por título..."
            className="input-field text-sm"
            id="articles-search"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map(status => (
            <button
              key={status}
              onClick={() => { setStatusFilter(status); setPage(1); }}
              className={`px-4 py-2 rounded-lg font-ui text-xs transition-all
                ${statusFilter === status
                  ? 'bg-navy text-cream'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-navy/30'
                }`}
              id={`filter-${status}`}
            >
              {status === 'all' ? 'Todos' : status === 'published' ? 'Publicados' : 'Rascunhos'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block animate-spin-slow">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#EDE8E0" strokeWidth="2.5" />
                <circle cx="16" cy="16" r="12" stroke="#0F3460" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="37.7 37.7" />
              </svg>
            </div>
          </div>
        ) : paginatedArticles.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedArticles.map(article => (
                <tr key={article.id}>
                  <td>
                    <p className="font-medium text-navy truncate max-w-xs">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">/{article.slug}</p>
                  </td>
                  <td>
                    <span className="badge badge-category">
                      {CATEGORY_LABELS[article.category]}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${article.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                      {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDateShort(article.published_date)}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="font-ui text-xs text-navy hover:text-gold transition-colors"
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}/preview`}
                        className="font-ui text-xs text-bronze/50 hover:text-navy transition-colors"
                      >
                        Preview
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        className="font-ui text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="font-ui text-sm text-gray-400">
              {search ? 'Nenhum artigo encontrado.' : 'Nenhum artigo criado ainda.'}
            </p>
            {!search && (
              <Link href="/admin/articles/new" className="font-ui text-xs text-navy hover:text-gold transition-colors mt-2 inline-block">
                Criar primeiro artigo →
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 font-ui text-sm">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 disabled:opacity-30 hover:border-navy/30 transition-colors text-xs"
          >
            ← Anterior
          </button>
          <span className="text-xs text-gray-400 px-3">
            {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 disabled:opacity-30 hover:border-navy/30 transition-colors text-xs"
          >
            Próximo →
          </button>
        </div>
      )}
    </div>
  );
}
