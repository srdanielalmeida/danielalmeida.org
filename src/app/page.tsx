import React from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/ArticleCard';
import { Arabesque } from '@/components/Arabesque';
import { Article } from '@/lib/types';
import { ScrollReveal } from '@/components/ScrollReveal';
import { LayersDiagram } from '@/components/LayersDiagram';
import { NecrologioSection } from './sections/NecrologioSection';
import { LigacaoCamadasSection } from './sections/LigacaoCamadasSection';
import { DecimaCamadaSection } from './sections/DecimaCamadaSection';

async function getPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_date', { ascending: false });

    if (error) throw error;
    return (data as Article[]) || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const featured = articles.slice(0, 3);
  const remaining = articles.slice(3, 5);

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════
          HERO – Cinematic Opener
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-cream" id="hero">
        {/* Background SVG */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url('/Gemini_Generated_Image_p13obp13obp13obp.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.25,
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <ScrollReveal>
            <p className="font-ui text-sm uppercase tracking-[0.3em] text-gold-dark mb-6 opacity-80">
              As 12 Camadas da Personalidade
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-navy font-bold leading-[1.15] mb-8">
              É para lá que estamos{' '}
              <span className="italic text-gold-dark">caminhando...</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-body text-lg md:text-xl text-navy/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Uma jornada do autoconhecimento radical à santidade. 
              Do exercício que inaugura a vida intelectual até o confronto 
              final com o Deus vivo.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.45}>
            <a
              href="#necrologio"
              className="inline-flex items-center gap-3 bg-navy hover:bg-gold-dark px-8 py-4 rounded-full font-ui text-sm font-medium transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
              id="hero-cta-start"
            >
              <span className="text-white">Comece a jornada</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-white">
                <path d="M8 3 L8 13 M4 9 L8 13 L12 9" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
          <div className="w-6 h-10 rounded-full border-2 border-navy/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-navy/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 – O Exercício do Necrológio
      ═══════════════════════════════════════════════════════════ */}
      <NecrologioSection />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 – Interactive Layers Diagram
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white" id="layers-interactive">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-ui text-xs uppercase tracking-[0.25em] text-bronze mb-4">Explore a estrutura completa</p>
              <h2 className="font-heading text-3xl md:text-5xl text-navy font-bold mb-4">
                As 12 Camadas
              </h2>
              <p className="font-body text-lg text-navy/50 max-w-xl mx-auto">
                Clique em cada camada para entender onde você está — e para onde precisa ir.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <LayersDiagram />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 – A Ligação entre 8ª e 12ª Camada
      ═══════════════════════════════════════════════════════════ */}
      <LigacaoCamadasSection />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 – A Décima Segunda Camada (main text)
      ═══════════════════════════════════════════════════════════ */}
      <DecimaCamadaSection />

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL – Quer ir também?
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-cream border-t border-cream-dark" id="cta-final">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <Arabesque variant="divider" className="mb-10 [&_line]:!stroke-gold-dark/30 [&_path]:!stroke-gold-dark/50" />
            <p className="font-heading text-2xl md:text-4xl text-navy/80 italic mb-4 leading-snug">
              &ldquo;É para lá que estamos caminhando...&rdquo;
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-navy mb-12 font-heading">
              Quer ir também?<br /><span className="text-gold-dark">Siga-nos.</span>
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex justify-center gap-5 mb-12">
              <a
                href="https://instagram.com/almeidafilosofia"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-16 h-16 rounded-2xl bg-white text-navy flex items-center justify-center hover:bg-gold-dark hover:text-white hover:-translate-y-2 transition-all duration-300 border border-cream-dark hover:border-gold-dark shadow-sm hover:shadow-md"
                id="cta-instagram"
              >
                <span className="sr-only">Instagram</span>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://t.me/almeidafilosofia"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-16 h-16 rounded-2xl bg-white text-navy flex items-center justify-center hover:bg-gold-dark hover:text-white hover:-translate-y-2 transition-all duration-300 border border-cream-dark hover:border-gold-dark shadow-sm hover:shadow-md"
                id="cta-telegram"
              >
                <span className="sr-only">Telegram</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.017c.24-.213-.054-.33-.373-.12l-6.869 4.32-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.46c.536-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@sirdanielalmeida"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-16 h-16 rounded-2xl bg-white text-navy flex items-center justify-center hover:bg-gold-dark hover:text-white hover:-translate-y-2 transition-all duration-300 border border-cream-dark hover:border-gold-dark shadow-sm hover:shadow-md"
                id="cta-youtube"
              >
                <span className="sr-only">YouTube</span>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ARTICLES
      ═══════════════════════════════════════════════════════════ */}
      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="py-20 bg-white/50" id="featured-articles">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl text-navy font-semibold mb-2">
                  Artigos Recentes
                </h2>
                <Arabesque variant="small" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((article, i) => (
                <ScrollReveal key={article.id} delay={i * 0.1}>
                  <ArticleCard article={article} index={i} variant="featured" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      {remaining.length > 0 && (
        <section className="py-16" id="all-articles">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl text-navy font-semibold mb-2">
                Mais Artigos
              </h2>
              <Arabesque variant="divider" />
            </div>

            <div className="flex flex-col">
              {remaining.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i + 3} variant="compact" />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 border border-bronze/30 px-6 py-3 rounded-full font-ui text-sm font-medium text-navy hover:bg-navy hover:text-white transition-all duration-300"
              >
                Ver todos os artigos
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 8h8m-4-4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {articles.length === 0 && (
        <section className="py-20" id="empty-state">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <Arabesque variant="section" className="mb-8" />
            <h2 className="font-heading text-2xl text-navy/60 font-semibold mb-4">
              Em breve, novos textos
            </h2>
            <p className="font-ui text-sm text-bronze/60">
              Os primeiros artigos estão sendo preparados com cuidado.
              Volte em breve para ler as primeiras reflexões.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
