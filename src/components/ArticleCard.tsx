import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  index?: number;
  variant?: 'featured' | 'compact';
}

export function ArticleCard({ article, index = 0, variant = 'featured' }: ArticleCardProps) {
  const delay = `${index * 100}ms`;

  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group flex items-baseline gap-4 py-3 border-b border-bronze/10 last:border-b-0 opacity-0 animate-fade-in"
        style={{ animationDelay: delay, animationFillMode: 'forwards' }}
        id={`article-compact-${article.slug}`}
      >
        <span className="font-ui text-xs text-bronze/60 whitespace-nowrap shrink-0">
          {formatDate(article.published_date)}
        </span>
        <h3 className="font-heading text-lg text-navy group-hover:text-gold transition-colors duration-200 leading-snug">
          {article.title}
        </h3>
        <span className="font-ui text-[10px] text-bronze/40 whitespace-nowrap shrink-0 hidden sm:inline">
          {article.reading_time_minutes} min
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="card group block opacity-0 animate-fade-in-up"
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
      id={`article-card-${article.slug}`}
    >
      {/* Cover Image */}
      {article.cover_image_url ? (
        <div className="relative h-52 overflow-hidden bg-cream-dark">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
        </div>
      ) : (
        <div className="h-52 bg-gradient-to-br from-navy/5 to-cream-dark flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4 L36 24 L24 44 L12 24 Z" fill="none" stroke="#D4A574" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M24 14 L30 24 L24 34 L18 24 Z" fill="#D4A574" fillOpacity="0.1" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="badge badge-category">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="font-ui text-[11px] text-bronze/50">
            {article.reading_time_minutes} min de leitura
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-navy group-hover:text-gold transition-colors duration-200 mb-2 leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-navy-dark/60 leading-relaxed mb-3 line-clamp-2 font-ui">
          {article.excerpt}
        </p>

        {/* Date */}
        <span className="font-ui text-xs text-bronze/50">
          {formatDate(article.published_date)}
        </span>
      </div>
    </Link>
  );
}
