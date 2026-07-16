import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Arabesque } from './Arabesque';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream/80 mt-auto">
      <div className="max-w-5xl mx-auto px-6">
        {/* Decorative top */}
        <div className="flex justify-center pt-8">
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0 L38 10 L30 20 L22 10 Z" fill="none" stroke="#D4A574" strokeWidth="0.75" strokeOpacity="0.5" />
            <path d="M30 5 L34 10 L30 15 L26 10 Z" fill="#D4A574" fillOpacity="0.15" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#D4A574" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="40" y1="10" x2="60" y2="10" stroke="#D4A574" strokeWidth="0.5" strokeOpacity="0.3" />
          </svg>
        </div>

        {/* Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-ui">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/brasao.svg" alt="Brasão" width={24} height={24} className="opacity-30 invert" />
              <h4 className="font-heading text-lg text-cream font-semibold">Daniel Almeida</h4>
            </div>
            <p className="text-cream/50 leading-relaxed text-xs">
              Reflexões sobre desenvolvimento pessoal, santidade e as camadas da personalidade humana. 
              Um espaço de recolhimento intelectual.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg text-cream font-semibold mb-3">Navegação</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/blog" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Blog</Link>
              <Link href="/biblioteca" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Biblioteca</Link>
              <Link href="/sobre" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Sobre</Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg text-cream font-semibold mb-3">Categorias</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/blog?categoria=artes-liberais" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Artes Liberais</Link>
              <Link href="/blog?categoria=ensaios-critica" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Ensaios &amp; Crítica</Link>
              <Link href="/blog?categoria=filosofia" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Filosofia</Link>
              <Link href="/blog?categoria=notas-escrivaninha" className="!text-cream/50 hover:!text-gold transition-colors text-xs">Notas da Escrivaninha</Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <p className="text-cream/30 text-xs font-ui">
              © {currentYear} Daniel Almeida. Todos os direitos reservados.
            </p>
            <p className="text-cream/40 text-[10px] font-ui">
              Desenvolvido por{' '}
              <a
                href="https://nexoratecnologia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-cream/80 hover:!text-gold font-medium transition-colors duration-300 relative py-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                nexoratecnologia.com
              </a>
            </p>
          </div>
          <p className="text-cream/20 text-[10px] font-ui italic">
            «Omnia in Christo instaurare»
          </p>
        </div>
      </div>
    </footer>
  );
}
