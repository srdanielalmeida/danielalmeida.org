'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORY_LABELS, ArticleCategory } from '@/lib/types';

interface BlogFiltersProps {
  activeCategory?: string;
  categories: ArticleCategory[];
}

export function BlogFilters({ activeCategory, categories }: BlogFiltersProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10" id="blog-filters">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full font-ui text-xs tracking-wide transition-all duration-200
          ${!activeCategory
            ? 'bg-navy !text-white'
            : 'border border-bronze/20 text-navy/60 hover:text-navy hover:border-navy/30'
          }`}
      >
        Todos
      </Link>
      {categories.map(cat => (
        <Link
          key={cat}
          href={`/blog?categoria=${cat}`}
          className={`px-4 py-2 rounded-full font-ui text-xs tracking-wide transition-all duration-200
            ${activeCategory === cat
              ? 'bg-navy !text-white'
              : 'border border-bronze/20 text-navy/60 hover:text-navy hover:border-navy/30'
            }`}
        >
          {CATEGORY_LABELS[cat]}
        </Link>
      ))}
    </div>
  );
}
