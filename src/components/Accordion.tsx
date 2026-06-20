'use client';

import React, { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  variant?: 'default' | 'dark';
}

export function Accordion({ items, className = '', variant = 'default' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const isDark = variant === 'dark';
        return (
          <div
            key={i}
            className="rounded-2xl overflow-hidden transition-all duration-500"
            style={{
              background: isDark
                ? isOpen ? '#0F3460' : '#0F3460cc'
                : isOpen ? '#fff' : '#fff',
              border: isDark ? 'none' : '1px solid rgba(15,52,96,0.08)',
              boxShadow: isOpen
                ? isDark
                  ? '0 20px 50px rgba(15,52,96,0.3)'
                  : '0 10px 40px rgba(15,52,96,0.08)'
                : 'none',
            }}
          >
            <button
              className="w-full flex items-center gap-4 p-6 md:p-8 text-left cursor-pointer border-0 bg-transparent"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span
                className="flex-1 font-heading text-xl md:text-2xl font-bold"
                style={{ color: isDark ? '#D4A574' : '#0F3460' }}
              >
                {item.title}
              </span>
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,52,96,0.06)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={isDark ? '#D4A574' : '#0F3460'} strokeWidth="2" strokeLinecap="round">
                  <path d="M3 5 L7 9 L11 5" />
                </svg>
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isOpen ? '2000px' : '0px',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-6 md:px-8 pb-8" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(15,52,96,0.7)' }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
