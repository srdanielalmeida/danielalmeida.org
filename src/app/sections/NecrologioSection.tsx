'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Accordion } from '@/components/Accordion';

export function NecrologioSection() {
  return (
    <section className="relative py-20 md:py-28 bg-cream" id="necrologio">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-bronze mb-4">O primeiro exercício</p>
            <h2 className="font-heading text-3xl md:text-5xl text-navy font-bold">
              O Exercício do Necrológio
            </h2>
          </div>
        </ScrollReveal>

        {/* Two-column: Image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy/15 aspect-[4/3]">
              <Image
                src="/necrologio.png"
                alt="Homem escrevendo à luz de velas em estudo monástico"
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/80 font-ui text-xs uppercase tracking-wider">
                  Seminário de Filosofia — COF
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="font-body text-lg text-navy-dark/80 leading-relaxed">
              <p className="text-2xl md:text-3xl font-heading text-navy font-medium leading-snug mb-8">
                <span className="text-6xl text-gold float-left mr-4 mt-1 font-serif leading-none">M</span>
                eu caro, o primeiro exercício do Seminário de Filosofia, aquele que inaugura a vida intelectual de qualquer estudante sério no COF, é o célebre Exercício do Necrológio.
              </p>
              <p className="text-lg md:text-xl text-navy/70">
                Pode parecer algo sombrio para quem tem a imaginação fraca, mas é, na verdade, a ferramenta pedagógica e espiritual mais poderosa para arrancar o sujeito da ilusão e dar a ele um eixo, um Norte moral definitivo.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* The mechanics — Accordion style */}
        <ScrollReveal>
          <Accordion
            items={[
              {
                title: 'A Mecânica do Exercício',
                icon: (
                  <span className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </span>
                ),
                content: (
                  <div className="space-y-6 font-body text-lg leading-relaxed">
                    <p>
                      O exercício consiste no seguinte: você vai imaginar que a sua vida chegou ao fim. Você morreu, o seu tempo na Terra esgotou-se e a sua história está concluída. Agora, você deve escrever o seu próprio obituário (o necrológio).
                    </p>
                    <p>
                      Contudo, há uma <strong className="text-navy font-semibold">regra estrita de perspectiva</strong>: você não vai escrever isso como um currículo burocrático, listando diplomas, cargos, salários ou bens materiais. Isso é poeira que o vento leva. Você vai escrever este texto adotando o ponto de vista do seu melhor amigo, da pessoa que mais o conheceu, que mais o amou e que compreendeu o fundo da sua alma.
                    </p>
                    {/* 4 questions as cards */}
                    <div className="mt-8 mb-4">
                      <p className="text-base text-navy font-semibold mb-5">Esta testemunha imaginária vai descrever quem você se tornou. Ela vai relatar:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Quais foram as virtudes reais que você conquistou a duras penas?',
                          'Qual foi a substância moral do seu caráter?',
                          'Pelo que você lutou e que sacrifícios esteve disposto a fazer?',
                          'Qual foi a marca espiritual que você deixou nas pessoas ao seu redor?',
                        ].map((q, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-navy/[0.03] border border-navy/[0.06] flex gap-3 items-start"
                          >
                            <span className="w-7 h-7 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center text-sm font-bold font-ui shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-base text-navy/80 italic">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: 'O Propósito da Prática',
                icon: (
                  <span className="w-12 h-12 rounded-2xl bg-navy/[0.06] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F3460" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </span>
                ),
                content: (
                  <div className="space-y-6 font-body text-lg leading-relaxed">
                    <p>
                      Por que começamos a jornada filosófica com a morte? Porque, como já ensinavam os filósofos clássicos e os santos, <strong className="text-navy font-semibold">a única maneira de você saber o que deve fazer com o seu dia hoje é saber como a sua história deve terminar.</strong> Se você não sabe quem precisa ser na hora da sua morte, você não sabe o que está fazendo vivo; qualquer vento o desvia e qualquer vaidade o corrompe.
                    </p>
                    <p>
                      O necrológio não é uma técnica de autoajuda, é uma ascese. É uma confissão brutal de intenções perante a eternidade. Ele o obriga a olhar para além do aplauso imediato e da aprovação social, jogando a medida da sua vida para o momento do balanço final, perante Deus e a sua própria consciência.
                    </p>
                    <blockquote className="border-l-4 border-gold pl-6 py-4 bg-gold/5 rounded-r-xl my-6 text-xl font-heading italic text-navy">
                      A partir do momento em que você escreve o seu necrológio com absoluta e dolorosa sinceridade, ele se converte no juiz implacável de todas as suas ações cotidianas.
                    </blockquote>
                    <p>
                      Sempre que você estiver diante de uma escolha moral ou de um momento de preguiça, basta olhar para aquele papel e se perguntar: <span className="bg-gold/10 px-1.5 py-0.5 rounded font-medium">&ldquo;Se eu ceder a isto agora, serei o homem que está descrito ali?&rdquo;</span>. É assim que se forja uma personalidade que não se dobra.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
