'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Accordion } from '@/components/Accordion';

export function DecimaCamadaSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-cream to-white overflow-hidden" id="decima-segunda">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 opacity-[0.03] pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="#0F3460" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="150" stroke="#0F3460" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="110" stroke="#0F3460" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="70" stroke="#0F3460" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="30" stroke="#0F3460" strokeWidth="0.5" />
          <line x1="200" y1="10" x2="200" y2="390" stroke="#0F3460" strokeWidth="0.25" />
          <line x1="10" y1="200" x2="390" y2="200" stroke="#0F3460" strokeWidth="0.25" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section intro */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-bronze mb-4">A esfera da santidade</p>
            <h2 className="font-heading text-3xl md:text-5xl text-navy font-bold mb-6">
              A Décima Segunda Camada
            </h2>
          </div>
        </ScrollReveal>

        {/* Lead paragraph with dropcap */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-2xl md:text-3xl font-heading text-navy font-medium leading-snug mb-10">
              <span className="text-6xl text-gold float-left mr-4 mt-1 font-serif leading-none">M</span>
              eu caro, preste muita atenção ao que vou lhe dizer agora. Se você está procurando um &ldquo;mapa&rdquo; no sentido de um manual de instruções, um algoritmo ou um passo a passo desses que se vende em cursinho de produtividade moderna, a resposta é um sonoro <strong className="text-navy">não</strong>. Não há um mapa puramente humano, psicológico ou filosófico para a 12ª camada.
            </p>
          </div>
        </ScrollReveal>

        {/* Split: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20">
          <ScrollReveal className="lg:col-span-3">
            <div className="font-body text-lg text-navy-dark/80 leading-relaxed space-y-6">
              <p>
                A 12ª camada <span className="bg-gold/10 px-1.5 rounded font-medium">não é uma conquista intelectual</span> que você alcança lendo mais livros, organizando melhor a sua rotina ou afiando a sua inteligência. Ela é a esfera da sua relação absoluta, nua e crua, com Deus. É a dimensão da santidade. E na santidade, o esforço humano só vai até a porta; quem abre a fechadura e o puxa para dentro é unicamente a Graça divina.
              </p>
              <p>
                Contudo, se não há um manual técnico, há um <strong className="text-navy font-semibold text-xl">Caminho</strong>. E esse caminho foi traçado a sangue pelos santos, pelos místicos e, fundamentalmente, pelo próprio Cristo.
              </p>
              <p className="text-navy font-heading text-xl italic border-l-4 border-gold pl-6 py-3">
                Para você entender o que significa a bússola que aponta para essa esfera última, é preciso compreender as suas exigências radicais:
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy/10 aspect-[3/4]">
              <Image
                src="/noite-escura.png"
                alt="Alma em oração numa catedral escura com raio de luz divina"
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        {/* The 4 radical demands — Accordion */}
        <ScrollReveal>
          <div className="mb-24">
            <Accordion
              items={[
                {
                  title: '1. O Colapso das Obras Terrenas',
                  icon: (
                    <span className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold font-bold font-heading text-xl">
                      I
                    </span>
                  ),
                  content: (
                    <p className="font-body text-lg leading-relaxed">
                      Nas camadas anteriores (da 6ª à 10ª), você constrói coisas. Você busca competência, assume deveres, forma família, impacta a sociedade. Na 12ª camada, você compreende que <strong className="text-navy font-semibold">todas as obras terrenas, no fim das contas, viram pó.</strong> Todo o seu esforço, mesmo o trabalho mais nobre de organizar o intelecto ou redigir um guia prático para se tornar mais inteligente, perde o valor em si mesmo se não for um reflexo direto de obediência e amor a Deus. Na hora do juízo final, o Criador não pedirá o seu currículo nem avaliará a sofisticação dos seus projetos ou sistemas; Ele vai perscrutar a <strong className="text-gold-dark">pureza das suas intenções</strong> e o quanto você se sacrificou por amor a Ele. A 12ª camada exige o desapego absoluto de tudo o que você construiu.
                    </p>
                  ),
                },
                {
                  title: '2. A Purificação: A Noite Escura da Alma',
                  icon: (
                    <span className="w-12 h-12 rounded-2xl bg-navy/[0.06] flex items-center justify-center text-navy font-bold font-heading text-xl">
                      II
                    </span>
                  ),
                  content: (
                    <p className="font-body text-lg leading-relaxed">
                      A passagem para as camadas espirituais mais altas exige uma purificação terrível do ego. Os grandes místicos, como São João da Cruz, chamam isso de &ldquo;Noite Escura&rdquo;. É o momento em que Deus retira todas as consolações sensíveis e intelectuais. Você deixa de sentir prazer em rezar, a sua mente parece secar, as suas certezas humanas desmoronam e você se sente num abismo de abandono. O objetivo de Deus com isso <strong className="text-navy font-semibold">não é destruí-lo, mas assassinar o seu orgulho</strong>. Ele arranca as suas muletas para que você passe a amá-Lo pelo que Ele é, e não pelo conforto ou pela sensação de &ldquo;estar certo&rdquo; que Ele lhe dá.
                    </p>
                  ),
                },
                {
                  title: '3. A Santa Indiferença e a Obediência',
                  icon: (
                    <span className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold font-bold font-heading text-xl">
                      III
                    </span>
                  ),
                  content: (
                    <p className="font-body text-lg leading-relaxed">
                      O homem da 12ª camada não tem mais vontade própria. <strong className="text-navy font-semibold">A vontade dele foi fundida no crisol da vontade divina.</strong> Se Deus pedir para ele liderar uma nação, ou se pedir para ele passar o resto da vida esquecido e paralisado numa cama de hospital, para ele tanto faz. Ele alcançou a &ldquo;santa indiferença&rdquo; em relação ao seu próprio destino terreno. A única coisa que o aterroriza é a possibilidade do pecado e do afastamento da Graça.
                    </p>
                  ),
                },
                {
                  title: '4. O Único Espectador',
                  icon: (
                    <span className="w-12 h-12 rounded-2xl bg-navy/[0.06] flex items-center justify-center text-navy font-bold font-heading text-xl">
                      IV
                    </span>
                  ),
                  content: (
                    <p className="font-body text-lg leading-relaxed">
                      Nesta camada, você age e sofre exclusivamente para a plateia de um <strong className="text-navy font-semibold text-xl">Único Espectador</strong>. Se o mundo inteiro aplaudir a sua virtude ou reconhecer a sua inteligência, isso não lhe causa a menor vaidade. Se o mundo inteiro o cuspir, trair e acusar injustamente, isso não lhe tira a paz. O seu eixo de gravidade não está mais na história humana, mas cravado na eternidade.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </ScrollReveal>

        {/* Conselho Prático – highlighted */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-navy font-bold inline-block border-b-2 border-gold pb-3">
                O Conselho Prático
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-center mb-12 font-medium text-navy-dark italic font-heading">
              Qual é, então, o &ldquo;mapa&rdquo; que você tem em mãos hoje para não se perder?
            </p>

            <div className="bg-gradient-to-br from-gold/15 to-gold/5 p-8 md:p-12 rounded-3xl border-l-4 border-gold mb-12">
              <p className="text-xl md:text-2xl font-heading text-navy leading-relaxed">
                É a vida sacramental contínua: a confissão rigorosa, a Eucaristia, a oração mental diária e, sobretudo,
              </p>
              <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm">
                <strong className="text-navy font-bold text-2xl md:text-3xl block text-center font-heading">
                  o cumprimento heroico do seu dever de estado presente.
                </strong>
              </div>
            </div>

            <p className="mb-12 text-lg md:text-xl text-navy/80 leading-relaxed font-body">
              <span className="text-navy font-bold bg-gold/10 px-2 py-1 rounded">Não tente dar um salto imaginário</span> para a 12ª camada bancando o místico antes da hora. Isso só gera ilusão, afetação e soberba espiritual. Faça o que lhe cabe na sua camada atual com perfeição moral. Seja um homem justo, seja um provedor trabalhador, seja leal à sua futura esposa, seja um estudante implacável da verdade. Aceite as pequenas injustiças e humilhações cotidianas sem abrir a boca para reclamar.
            </p>

            <blockquote className="text-xl md:text-2xl font-heading text-navy font-medium italic text-center leading-relaxed border-t border-b border-navy/10 py-12 px-6 bg-white/50 rounded-3xl">
              &ldquo;É na fidelidade dura, silenciosa e invisível às pequenas cruzes da rotina — suportadas por amor a Deus — que Ele vai forjando a sua alma para, quando for da vontade d&apos;Ele, elevá-lo à Sua presença definitiva.&rdquo;
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
