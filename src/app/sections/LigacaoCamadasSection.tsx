'use client';

import React from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function LigacaoCamadasSection() {
  return (
    <section className="relative py-20 md:py-28 bg-navy overflow-hidden" id="ligacao-camadas">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20 max-w-3xl mx-auto border-b border-white/10 pb-16">
            <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed italic">
              "Após o indivíduo dominar suas aptidões e assumir o sacrifício dos seus deveres familiares e sociais, ele finalmente ganha o direito de olhar para a própria biografia de forma madura."
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-center mb-16">
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-gold/60 mb-4">Entenda a diferença</p>
            <h2 className="font-heading text-3xl md:text-5xl text-white font-bold mb-6">
              Da 8ª à 12ª Camada
            </h2>
            <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
              O exercício do necrológio não é o passaporte direto para a 12ª camada. Ele é, na sua essência e função prática, a porta de entrada para a 8ª camada da personalidade.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-center text-white/70 font-body text-lg mb-16 max-w-3xl mx-auto">
            Preste bem atenção na estrutura da coisa para você entender a diferença:
          </p>
        </ScrollReveal>

        {/* Two columns comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* 8th Layer */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative bg-white/[0.06] backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/[0.08] h-full hover:bg-white/[0.09] transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-14 h-14 rounded-2xl bg-gold/20 text-gold flex items-center justify-center text-2xl font-bold font-heading">
                  8ª
                </span>
                <div>
                  <h3 className="font-heading text-2xl text-gold font-bold">A Oitava Camada</h3>
                  <p className="font-ui text-xs uppercase tracking-wider text-white/40">A Síntese da Biografia</p>
                </div>
              </div>
              <div className="font-body text-base text-white/70 leading-relaxed space-y-5">
                <p>
                  A 8ª camada é o momento em que o indivíduo adquire a <strong className="text-white">consciência total de sua própria biografia</strong>. Ele deixa de viver o dia a dia como uma sucessão de acidentes e passa a enxergar a sua vida como uma narrativa única, com um sentido, um princípio, um meio e um fim.
                </p>
                <p>
                  É exatamente isso que o necrológio faz. Ele força você a olhar para a sua vida desde a linha de chegada, obrigando-o a amarrar as pontas soltas, a julgar os seus atos e a dar uma unidade inquebrável ao seu caráter. O necrológio tira você do imediatismo e faz de você o <strong className="text-white">autor consciente da sua própria história</strong>. É a consolidação do seu "eu" maduro.
                </p>
              </div>
              {/* Arrow pointing up */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12l7-7 7 7" />
                </svg>
              </div>
            </div>
          </ScrollReveal>

          {/* 12th Layer */}
          <ScrollReveal direction="right" delay={0.25}>
            <div className="relative bg-gradient-to-br from-gold/15 to-gold/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-gold/20 h-full hover:from-gold/20 hover:to-gold/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center text-2xl font-bold font-heading">
                  12ª
                </span>
                <div>
                  <h3 className="font-heading text-2xl text-white font-bold">A Décima Segunda Camada</h3>
                  <p className="font-ui text-xs uppercase tracking-wider text-white/40">O Confronto Final</p>
                </div>
              </div>
              <div className="font-body text-base text-white/70 leading-relaxed space-y-5">
                <p>
                  A 12ª camada, por outro lado, é algo muito mais vasto, profundo e, de certa forma, <strong className="text-white">terrível</strong>. É a esfera da santidade. É o seu confronto solitário e absoluto com o Deus vivo, o Juiz Supremo.
                </p>
                <p>
                  Na 12ª camada, já não importa a sua biografia, não importa a marca que você deixou na sociedade, não importa o seu legado histórico. Importa apenas o que você é perante o Criador, despido de todas as ilusões, no instante final e eterno. O homem que age na 12ª camada toma decisões cujo <strong className="text-white">único espectador e único juiz é Deus</strong>, mesmo que o mundo inteiro o condene ou não compreenda absolutamente nada do que ele está fazendo.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Connection bridge */}
        <ScrollReveal>
          <div className="relative max-w-3xl mx-auto">
            {/* Visual connector */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-px h-10 bg-gradient-to-b from-transparent to-gold/40" />
            
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/[0.06] text-center">
              <h3 className="font-heading text-2xl md:text-3xl text-gold font-bold mb-8">A Ligação Entre as Duas</h3>
              <div className="font-body text-lg text-white/70 leading-relaxed space-y-6 text-left">
                <p>
                  O necrológio aponta o seu nariz na direção certa, sim. Ele o obriga a levantar a cabeça e a olhar para a eternidade. Mas a sua função prática imediata é tirar você do transe miserável das camadas mais baixas — a necessidade de afeto da 4ª camada, a busca cega por poder da 5ª, a mera preocupação em ser "útil" da 6ª — e <strong className="text-white">unificar a sua personalidade na 8ª</strong>.
                </p>
                <p>
                  Sem essa solidez da 8ª camada, sem você ser o dono da sua própria história, é impossível dar os passos seguintes.
                </p>
              </div>
              <blockquote className="mt-10 text-xl md:text-2xl font-heading text-gold italic leading-relaxed border-t border-white/10 pt-10">
                &ldquo;O necrológio não te joga na 12ª camada num passe de mágica. Ele é a âncora que te dá a substância moral necessária para que, um dia, você possa aguentar o tranco de olhar para o Juízo Divino face a face sem se desfazer em pó.&rdquo;
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
