import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArticleContent } from '@/components/ArticleContent';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Arabesque } from '@/components/Arabesque';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) return null;
    return data as Article;
  } catch {
    return null;
  }
}

async function getAdjacentArticles(publishedDate: string): Promise<{
  prev: Article | null;
  next: Article | null;
}> {
  try {
    const supabase = await createClient();

    const [prevResult, nextResult] = await Promise.all([
      supabase
        .from('articles')
        .select('slug, title')
        .eq('status', 'published')
        .lt('published_date', publishedDate)
        .order('published_date', { ascending: false })
        .limit(1)
        .single(),
      supabase
        .from('articles')
        .select('slug, title')
        .eq('status', 'published')
        .gt('published_date', publishedDate)
        .order('published_date', { ascending: true })
        .limit(1)
        .single(),
    ]);

    return {
      prev: prevResult.data as Article | null,
      next: nextResult.data as Article | null,
    };
  } catch {
    return { prev: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Artigo não encontrado' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_date,
      authors: ['Daniel Almeida'],
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const { prev, next } = await getAdjacentArticles(article.published_date);

  return (
    <article className="min-h-screen" id={`article-${article.slug}`}>
      {/* Cover Image */}
      {article.cover_image_url ? (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-cream-dark">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
        </div>
      ) : (
        <div className="w-full h-32 bg-gradient-to-b from-cream-dark/30 to-cream" />
      )}

      {/* Article Body */}
      <div className="max-w-[700px] mx-auto px-6 py-10">
        {/* Metadata */}
        <header className="mb-10 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="badge badge-category">
              {CATEGORY_LABELS[article.category]}
            </span>
            <span className="font-ui text-xs text-bronze/50">
              {article.reading_time_minutes} min de leitura
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-navy font-semibold leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-2 font-ui text-sm text-bronze/60">
            <span>Daniel Almeida</span>
            <span className="text-bronze/30">·</span>
            <time dateTime={article.published_date}>
              {formatDate(article.published_date)}
            </time>
          </div>

          <Arabesque variant="divider" className="mt-8" />
        </header>

        {/* Content */}
        <div className="animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards', opacity: 0 }}>
          <ArticleContent content={article.content} />
        </div>

        {/* End arabesque */}
        <Arabesque variant="section" className="my-12" />

        {/* Newsletter CTA */}
        <div className="my-12">
          <NewsletterForm variant="footer" />
        </div>

        {/* Navigation */}
        <nav className="flex items-stretch gap-4 mt-12 pt-8 border-t border-bronze/10" id="article-nav">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="flex-1 group p-4 rounded-lg border border-bronze/10 hover:border-gold/30 hover:bg-white transition-all duration-200"
              id="article-nav-prev"
            >
              <span className="font-ui text-[10px] text-bronze/40 uppercase tracking-wider">← Anterior</span>
              <p className="font-heading text-sm text-navy group-hover:text-gold transition-colors mt-1 leading-snug">
                {prev.title}
              </p>
            </Link>
          ) : <div className="flex-1" />}
          
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="flex-1 group p-4 rounded-lg border border-bronze/10 hover:border-gold/30 hover:bg-white transition-all duration-200 text-right"
              id="article-nav-next"
            >
              <span className="font-ui text-[10px] text-bronze/40 uppercase tracking-wider">Próximo →</span>
              <p className="font-heading text-sm text-navy group-hover:text-gold transition-colors mt-1 leading-snug">
                {next.title}
              </p>
            </Link>
          ) : <div className="flex-1" />}
        </nav>
      </div>
    </article>
  );
}
