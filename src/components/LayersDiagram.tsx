'use client';

import React, { useState } from 'react';

const LAYERS = [
  { num: 1, name: 'O Corpo Físico', desc: 'Caráter / Astrocaracterologia.', color: '#6B7280' },
  { num: 2, name: 'A Hereditariedade', desc: 'Temperamento e constituição.', color: '#6B7280' },
  { num: 3, name: 'O Aprendizado', desc: 'Cognição e percepção.', color: '#6B7280' },
  { num: 4, name: 'A História Afetiva', desc: 'Onde reside a busca por amor e a dor da rejeição.', color: '#8B7355' },
  { num: 5, name: 'O Poder Pessoal', desc: 'Ego, autoconsciência e individuação.', color: '#8B7355' },
  { num: 6, name: 'A Aptidão', desc: 'Vocação e obtenção de resultados objetivos.', color: '#8B7355' },
  { num: 7, name: 'O Papel Social', desc: 'A assunção dos deveres inegociáveis.', color: '#0F3460' },
  { num: 8, name: 'A Síntese Individual', desc: 'A consolidação da própria biografia. O necrológio vive aqui.', color: '#0F3460', highlight: true },
  { num: 9, name: 'A Personalidade Intelectual', desc: 'A busca por fins culturais e universais.', color: '#0F3460' },
  { num: 10, name: 'O Eu Transcendental', desc: 'A autoconsciência da responsabilidade moral.', color: '#D4A574' },
  { num: 11, name: 'O Personagem Histórico', desc: 'A ação do indivíduo no conjunto da história humana.', color: '#D4A574' },
  { num: 12, name: 'O Destino Final', desc: 'A santidade e o indivíduo perante Deus.', color: '#D4A574', highlight: true },
];

export function LayersDiagram() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const displayedLayer = hoveredLayer ?? activeLayer;

  return (
    <div className="w-full max-w-5xl mx-auto" id="layers-diagram">
      <div className="flex flex-col lg:flex-row items-stretch gap-8">
        {/* Visual Tower */}
        <div className="flex-1 flex flex-col-reverse gap-1">
          {LAYERS.map((layer) => {
            const isActive = displayedLayer === layer.num;
            const is8or12 = layer.num === 8 || layer.num === 12;
            return (
              <button
                key={layer.num}
                onClick={() => setActiveLayer(activeLayer === layer.num ? null : layer.num)}
                onMouseEnter={() => setHoveredLayer(layer.num)}
                onMouseLeave={() => setHoveredLayer(null)}
                className="group relative flex items-center transition-all duration-300 cursor-pointer border-0 w-full text-left"
                style={{
                  height: isActive ? '72px' : '44px',
                  background: isActive
                    ? `linear-gradient(135deg, ${layer.color}, ${layer.color}dd)`
                    : is8or12
                      ? `${layer.color}18`
                      : 'rgba(15, 52, 96, 0.04)',
                  borderRadius: '12px',
                  border: is8or12 && !isActive ? `1.5px solid ${layer.color}40` : '1.5px solid transparent',
                  padding: '0 20px',
                }}
              >
                <span
                  className="font-ui text-xs font-bold shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-3 transition-all duration-300"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : `${layer.color}15`,
                    color: isActive ? '#fff' : layer.color,
                  }}
                >
                  {layer.num}
                </span>
                <span
                  className="font-heading text-sm md:text-base font-semibold transition-colors duration-300"
                  style={{ color: isActive ? '#fff' : '#0F3460' }}
                >
                  {layer.name}
                </span>
                {is8or12 && (
                  <span
                    className="ml-auto text-xs font-ui font-bold uppercase tracking-wider animate-pulse-soft"
                    style={{ color: isActive ? '#fff' : layer.color }}
                  >
                    ★
                  </span>
                )}
                {isActive && (
                  <span className="ml-auto text-sm text-white/90 font-body max-w-[55%] hidden md:block">
                    {layer.desc}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:w-80 shrink-0 flex items-center">
          <div
            className="w-full p-6 rounded-2xl border transition-all duration-500 min-h-[180px] flex flex-col justify-center"
            style={{
              background: displayedLayer
                ? `linear-gradient(135deg, ${LAYERS[displayedLayer - 1].color}10, transparent)`
                : 'rgba(15, 52, 96, 0.03)',
              borderColor: displayedLayer
                ? `${LAYERS[displayedLayer - 1].color}30`
                : 'rgba(15, 52, 96, 0.08)',
            }}
          >
            {displayedLayer ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-ui text-sm"
                    style={{ background: LAYERS[displayedLayer - 1].color }}
                  >
                    {displayedLayer}
                  </span>
                  <h4 className="font-heading text-xl text-navy font-bold">
                    {LAYERS[displayedLayer - 1].name}
                  </h4>
                </div>
                <p className="font-body text-navy/70 text-base leading-relaxed">
                  {LAYERS[displayedLayer - 1].desc}
                </p>
                {displayedLayer === 8 && (
                  <p className="mt-3 text-sm font-ui text-gold-dark bg-gold/10 px-3 py-2 rounded-lg">
                    ← O Exercício do Necrológio te leva até aqui.
                  </p>
                )}
                {displayedLayer === 12 && (
                  <p className="mt-3 text-sm font-ui text-navy bg-navy/5 px-3 py-2 rounded-lg">
                    ← A meta final. Só a Graça divina abre esta porta.
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-navy/40 font-ui text-sm">
                Clique ou passe o mouse em uma camada para explorar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
