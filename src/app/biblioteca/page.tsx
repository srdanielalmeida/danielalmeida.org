import React from 'react';
import { Arabesque } from '@/components/Arabesque';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca',
  description: 'Livros e autores recomendados sobre filosofia, teologia, espiritualidade e formação clássica.',
};

const LIBRARY_SECTIONS = [
  {
    title: 'Patrístico',
    description: 'Os Padres da Igreja e seus escritos fundamentais.',
    books: [
      { title: 'Confissões', author: 'Santo Agostinho' },
      { title: 'A Cidade de Deus', author: 'Santo Agostinho' },
      { title: 'Catequeses', author: 'São Cirilo de Jerusalém' },
      { title: 'Sobre o Espírito Santo', author: 'São Basílio Magno' },
      { title: 'Vida de Santo Antão', author: 'Santo Atanásio' },
    ],
  },
  {
    title: 'Medieval',
    description: 'A grande síntese da razão e da fé.',
    books: [
      { title: 'Suma Teológica', author: 'São Tomás de Aquino' },
      { title: 'A Imitação de Cristo', author: 'Tomás de Kempis' },
      { title: 'A Divina Comédia', author: 'Dante Alighieri' },
      { title: 'Sobre a Consolação da Filosofia', author: 'Boécio' },
      { title: 'Proslogion', author: 'Santo Anselmo' },
    ],
  },
  {
    title: 'Espiritualidade',
    description: 'Guias para a vida interior e a santificação.',
    books: [
      { title: 'Introdução à Vida Devota', author: 'São Francisco de Sales' },
      { title: 'Subida do Monte Carmelo', author: 'São João da Cruz' },
      { title: 'O Castelo Interior', author: 'Santa Teresa de Ávila' },
      { title: 'Exercícios Espirituais', author: 'Santo Inácio de Loyola' },
      { title: 'Tratado da Verdadeira Devoção à Santíssima Virgem', author: 'São Luís Maria de Montfort' },
    ],
  },
  {
    title: 'Filosofia Clássica',
    description: 'As raízes do pensamento ocidental.',
    books: [
      { title: 'Ética a Nicômaco', author: 'Aristóteles' },
      { title: 'A República', author: 'Platão' },
      { title: 'Meditações', author: 'Marco Aurélio' },
      { title: 'Sobre a Natureza das Coisas', author: 'Lucrécio' },
      { title: 'Manual', author: 'Epicteto' },
    ],
  },
  {
    title: 'Moderno',
    description: 'Pensadores contemporâneos sobre formação, virtude e sentido.',
    books: [
      { title: 'O Homem Eterno', author: 'G.K. Chesterton' },
      { title: 'Mero Cristianismo', author: 'C.S. Lewis' },
      { title: 'O Sentido da Existência Humana', author: 'Viktor Frankl' },
      { title: 'Introdução ao Cristianismo', author: 'Joseph Ratzinger' },
      { title: 'A Abolição do Homem', author: 'C.S. Lewis' },
    ],
  },
];

export default function BibliotecaPage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-heading text-4xl md:text-5xl text-navy font-semibold mb-3">
            Biblioteca
          </h1>
          <p className="font-ui text-sm text-bronze/60 mb-6">
            Livros e autores que moldaram este projeto e que recomendo para a formação integral.
          </p>
          <Arabesque variant="section" />
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {LIBRARY_SECTIONS.map((section, sIdx) => (
            <section
              key={section.title}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${sIdx * 150}ms`, animationFillMode: 'forwards' }}
            >
              <div className="mb-6">
                <h2 className="font-heading text-2xl text-navy font-semibold mb-1">
                  {section.title}
                </h2>
                <p className="font-ui text-sm text-bronze/60">
                  {section.description}
                </p>
              </div>

              <div className="space-y-1">
                {section.books.map(book => (
                  <div
                    key={book.title}
                    className="flex items-baseline gap-3 py-3 border-b border-bronze/8 group hover:bg-white/50 px-3 rounded transition-colors"
                  >
                    <span className="text-gold text-xs shrink-0">◆</span>
                    <div>
                      <span className="font-body text-navy group-hover:text-gold transition-colors font-semibold">
                        {book.title}
                      </span>
                      <span className="font-ui text-sm text-bronze/50 ml-2">
                        — {book.author}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {sIdx < LIBRARY_SECTIONS.length - 1 && (
                <Arabesque variant="divider" className="mt-6" />
              )}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <Arabesque variant="section" />
          <p className="font-ui text-xs text-bronze/40 mt-6 italic">
            Esta lista é viva e será atualizada conforme novas leituras forem feitas.
          </p>
        </div>
      </div>
    </div>
  );
}
