'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES, CATEGORY_LABELS, ArticleCategory } from '@/lib/types';

interface BlogFiltersProps {
  activeCategory?: string;
}

export function BlogFilters({ activeCategory }: BlogFiltersProps) {
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
      {CATEGORIES.map(cat => (
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
