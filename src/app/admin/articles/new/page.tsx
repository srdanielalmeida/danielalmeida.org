'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CATEGORIES, CATEGORY_LABELS, ArticleCategory, ArticleStatus } from '@/lib/types';
import { slugify, calculateReadingTime, generateExcerpt } from '@/lib/utils';
import { ArticleContent } from '@/components/ArticleContent';
import { MarkdownEditor } from '@/components/MarkdownEditor';

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('filosofia');
  const [content, setContent] = useState('');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<ArticleStatus>('draft');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Apenas arquivos .jpg e .png são aceitos.');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 5MB.');
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setError('');
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('O título é obrigatório.');
      return;
    }
    if (!content.trim()) {
      setError('O conteúdo é obrigatório.');
      return;
    }
    if (!publishedDate) {
      setError('A data de publicação é obrigatória.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Sessão expirada. Faça login novamente.');
        setSaving(false);
        return;
      }

      const slug = slugify(title);
      let coverImageUrl: string | null = null;

      // Upload cover image
      if (coverFile) {
        const formData = new FormData();
        formData.append('file', coverFile);
        formData.append('slug', slug);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadRes.ok) {
          coverImageUrl = uploadData.url;
        } else {
          setError(uploadData.error || 'Erro ao fazer upload da imagem.');
          setSaving(false);
          return;
        }
      }

      // Create article
      const { error: insertError } = await supabase.from('articles').insert({
        title: title.trim(),
        slug,
        category,
        content: content.trim(),
        excerpt: generateExcerpt(content),
        cover_image_url: coverImageUrl,
        reading_time_minutes: calculateReadingTime(content),
        published_date: publishedDate,
        status,
        author_id: user.id,
      });

      if (insertError) {
        if (insertError.code === '23505') {
          setError('Já existe um artigo com esse título/slug.');
        } else {
          setError('Erro ao salvar artigo: ' + insertError.message);
        }
        setSaving(false);
        return;
      }

      router.push('/admin/articles');
      router.refresh();
    } catch {
      setError('Erro inesperado ao salvar.');
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-navy font-semibold">Novo Artigo</h1>
          <p className="font-ui text-sm text-gray-500 mt-1">
            Slug: <span className="text-navy font-mono text-xs">{title ? `/${slugify(title)}` : '—'}</span>
            {content && (
              <> · <span className="text-navy">{calculateReadingTime(content)} min</span> de leitura</>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary text-sm"
            id="toggle-preview"
          >
            {showPreview ? 'Editar' : 'Preview'}
          </button>
          <button
            onClick={() => router.push('/admin/articles')}
            className="font-ui text-sm text-gray-500 hover:text-navy transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>

      {showPreview ? (
        /* Preview Mode */
        <div className="bg-white rounded-xl border border-gray-100 p-8 max-w-[700px] mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <span className="badge badge-category mb-3 inline-block">{CATEGORY_LABELS[category]}</span>
            <h1 className="font-heading text-3xl text-navy font-semibold mb-2">{title || 'Sem título'}</h1>
            <p className="font-ui text-sm text-bronze/60">
              Daniel Almeida · {new Date(publishedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
              · {calculateReadingTime(content)} min de leitura
            </p>
          </div>
          {coverPreview && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img src={coverPreview} alt="Capa" className="w-full h-64 object-cover" />
            </div>
          )}
          <ArticleContent content={content || 'Sem conteúdo.'} />
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-ui text-xs text-navy/70 font-medium mb-1.5" htmlFor="article-title">
              Título *
            </label>
            <input
              id="article-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="O título do seu artigo..."
              className="input-field text-lg font-heading"
              required
            />
          </div>

          {/* Category + Date + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-ui text-xs text-navy/70 font-medium mb-1.5" htmlFor="article-category">
                Categoria *
              </label>
              <select
                id="article-category"
                value={category}
                onChange={e => setCategory(e.target.value as ArticleCategory)}
                className="input-field text-sm"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-ui text-xs text-navy/70 font-medium mb-1.5" htmlFor="article-date">
                Data de Publicação *
              </label>
              <input
                id="article-date"
                type="date"
                value={publishedDate}
                onChange={e => setPublishedDate(e.target.value)}
                className="input-field text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-ui text-xs text-navy/70 font-medium mb-1.5">
                Status
              </label>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200
                    ${status === 'published' ? 'bg-green-500' : 'bg-gray-300'}`}
                  id="article-status-toggle"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
                      ${status === 'published' ? 'translate-x-6' : 'translate-x-0'}`}
                  />
                </button>
                <span className="font-ui text-sm text-gray-600">
                  {status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-ui text-xs text-navy/70 font-medium mb-1.5">
              Imagem de Capa
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-navy/30 transition-colors"
              id="cover-upload-area"
            >
              {coverPreview ? (
                <div className="relative">
                  <img src={coverPreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                  <p className="font-ui text-xs text-gray-400 mt-2">Clique para trocar</p>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="4" y="4" width="24" height="24" rx="3" />
                    <circle cx="12" cy="13" r="3" />
                    <path d="M4 22 L10 16 L16 22 L22 14 L28 22" />
                  </svg>
                  <p className="font-ui text-sm text-gray-400">
                    Clique para selecionar imagem
                  </p>
                  <p className="font-ui text-xs text-gray-300 mt-1">
                    JPG ou PNG, máx. 5MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="cover-file-input"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-ui text-xs text-navy/70 font-medium mb-1.5" htmlFor="article-content">
              Conteúdo *
            </label>
            <p className="font-ui text-[10px] text-gray-400 mb-2">
              Você pode usar os atalhos acima ou digitar a formatação manualmente. Duas linhas vazias criam um divisor decorativo.
            </p>
            <MarkdownEditor
              id="article-content"
              value={content}
              onChange={setContent}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="font-ui text-sm text-red-500 animate-fade-in" id="article-error">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              id="article-save"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin-slow h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                    <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Salvando...
                </span>
              ) : (
                'Salvar Artigo'
              )}
            </button>
            <button
              onClick={() => router.push('/admin/articles')}
              className="font-ui text-sm text-gray-500 hover:text-navy transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
