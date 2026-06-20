'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/biblioteca', label: 'Biblioteca' },
  { href: '/sobre', label: 'Sobre' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-bronze/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" id="header-logo">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-semibold text-navy tracking-wide leading-none group-hover:text-gold transition-colors duration-200">
              Daniel Almeida
            </span>
            <span className="font-ui text-[10px] tracking-[0.3em] text-bronze uppercase mt-0.5">
              Desenvolvimento &amp; Santidade
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-ui text-sm tracking-wide transition-all duration-200 relative pb-1
                  ${isActive 
                    ? 'text-navy font-medium' 
                    : 'text-navy-dark/60 hover:text-navy'
                  }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-navy hover:text-gold transition-colors"
          aria-label="Menu"
          id="mobile-menu-toggle"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileMenuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-bronze/10 bg-cream/95 backdrop-blur-md animate-fade-in" id="mobile-nav">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-ui text-sm py-2 px-3 rounded-md transition-all duration-200
                    ${isActive 
                      ? 'text-navy font-medium bg-navy/5' 
                      : 'text-navy-dark/60 hover:text-navy hover:bg-navy/5'
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
