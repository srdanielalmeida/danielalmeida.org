'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV_ITEMS = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="11" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="11" width="6" height="6" rx="1" />
        <rect x="11" y="11" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    href: '/admin/articles',
    label: 'Artigos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 2 H15 V16 H3 Z" />
        <path d="M6 5 H12 M6 8 H12 M6 11 H9" />
      </svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="admin-sidebar flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/admin/dashboard" className="flex items-center gap-2 opacity-100">
            <span className="font-heading text-xl font-semibold text-cream">Admin</span>
          </Link>
          <p className="text-cream/30 text-[10px] font-ui mt-1">danielalmeida.org</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`${isActive ? 'active' : ''}`}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="text-cream/40 hover:text-cream text-xs flex items-center gap-2 py-2 px-4"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 13 L1 9 L5 5 M1 9 H10 V1" />
            </svg>
            Ver site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-cream/40 hover:text-red-400 text-xs flex items-center gap-2 py-2 px-4 transition-colors"
            id="admin-logout"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 1 H2 V13 H5 M9 4 L13 7 L9 10 M5 7 H13" />
            </svg>
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
