import React from 'react';
import { Arabesque } from '@/components/Arabesque';
import { NewsletterForm } from '@/components/NewsletterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Sobre Daniel Almeida — motivação, visão e o propósito deste projeto de recolhimento intelectual.',
};

export default function SobrePage() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="max-w-[700px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="flex justify-center mb-6">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="26" stroke="#D4A574" strokeWidth="0.75" strokeOpacity="0.3" />
              <circle cx="28" cy="28" r="18" stroke="#D4A574" strokeWidth="0.5" strokeOpacity="0.2" />
              <path d="M28 8 L36 28 L28 48 L20 28 Z" fill="none" stroke="#0F3460" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M28 16 L32 28 L28 40 L24 28 Z" fill="#D4A574" fillOpacity="0.15" />
              <circle cx="28" cy="28" r="3" fill="#0F3460" fillOpacity="0.3" />
            </svg>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-navy font-semibold mb-3">
            Sobre
          </h1>
          <Arabesque variant="divider" />
        </div>

        {/* Content */}
        <div className="article-content animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards', opacity: 0 }}>
          <p>
            Meu nome é Daniel Almeida. Este projeto nasce de uma convicção simples: de que 
            o desenvolvimento pessoal autêntico não pode ser separado da busca pela santidade. 
            Vivemos um tempo em que a palavra «crescimento» foi esvaziada — reduzida a métricas, 
            produtividade e otimização. Mas crescer, verdadeiramente, é outra coisa.
          </p>

          <p>
            Crescer é integrar. É descobrir as camadas da personalidade — razão, vontade, 
            afetividade, memória, imaginação — e ordená-las segundo a verdade. É reconhecer 
            que somos seres complexos, com profundidades que escapam a qualquer framework 
            simplista, e que a unidade interior exige um trabalho paciente, iluminado pela 
            filosofia e sustentado pela graça.
          </p>

          <h2>A Proposta</h2>

          <p>
            Este blog é um espaço de recolhimento intelectual. Cada texto é escrito com 
            cuidado — sem pressa, sem a pressão de algoritmos. Aqui se encontram reflexões 
            sobre as artes liberais, sobre a tradição filosófica e espiritual do Ocidente, 
            sobre o que significa ser pessoa e sobre o caminho da santificação pessoal.
          </p>

          <p>
            Não pretendo oferecer soluções rápidas ou «hacks» de produtividade. Pretendo 
            oferecer o que recebi: a sabedoria de autores que pensaram profundamente sobre a 
            condição humana — de Aristóteles a Santo Tomás, de Santo Agostinho a Viktor Frankl.
          </p>

          <h2>As 12 Camadas</h2>

          <p>
            O conceito das «12 Camadas da Personalidade» é o fio condutor deste projeto. 
            Trata-se de um modelo de compreensão da pessoa humana que integra dimensões 
            frequentemente tratadas de forma isolada: o corpo, os sentidos, as emoções, 
            a imaginação, a memória, o intelecto, a vontade, a consciência moral, a vida 
            social, a dimensão estética, a busca de sentido e a abertura ao transcendente.
          </p>

          <p>
            Cada camada precisa ser compreendida, cultivada e integrada. Os textos aqui 
            publicados exploram essas dimensões — às vezes diretamente, às vezes 
            tangencialmente — sempre com o objetivo de contribuir para uma visão mais 
            completa do que significa ser humano.
          </p>

          <h2>Contato</h2>

          <p>
            Se deseja entrar em contato, escreva-me. Cada mensagem é lida com atenção.
            Também é possível acompanhar as publicações inscrevendo-se na newsletter abaixo.
          </p>
        </div>

        {/* Newsletter */}
        <div className="mt-14 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards', opacity: 0 }}>
          <NewsletterForm variant="footer" />
        </div>

        {/* Bottom decoration */}
        <div className="mt-14">
          <Arabesque variant="section" />
        </div>
      </div>
    </div>
  );
}
