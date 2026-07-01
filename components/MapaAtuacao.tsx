/* eslint-disable react/no-unknown-property */
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, MessageCircle } from "lucide-react";
import {
  estadosAtuacao,
  getServicosPorEstado,
  getWhatsAppUrl,
  type EstadoSigla,
} from "@/data/servicos";
import { MAPA_PATHS } from "@/data/mapa-paths";
import { CrosshairDecor } from "@/components/CrosshairDecor";

const ESTADOS_COMPLETOS = new Set<string>(
  estadosAtuacao.filter((e) => e.cobertura === "completa").map((e) => e.sigla)
);

const NOME_TODOS_ESTADOS: Record<string, string> = Object.fromEntries(
    MAPA_PATHS.map(e => [e.sigla, e.nome])
);

export function MapaAtuacao() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ sigla: string; nome: string } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getEstadoFill = (sigla: string) => {
    if (selectedState === sigla) return "#800000";
    if (selectedState !== null && selectedState !== sigla) return "rgba(255,255,255,0.05)";
    if (hoveredState === sigla) {
      return ESTADOS_COMPLETOS.has(sigla) ? "#800000" : "#4f0101";
    }
    return "#ffffff";
  };

  // Função para posicionar o Tooltip
  const positionTooltip = useCallback((clientX: number, clientY: number) => {
    if (!tooltipRef.current) return;
    const cardWidth = 220;
    const cardHeight = 160;

    // Offset para não ficar grudado no mouse/estado
    let x = clientX - cardWidth / 2;
    let y = clientY - cardHeight - 30; // 30px acima do ponto

    // Evita que saia das bordas da tela
    x = Math.max(20, Math.min(x, window.innerWidth - cardWidth - 20));
    if (y < 80) y = clientY + 30; // Se bater no topo, mostra abaixo

    tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  // Seguir o mouse APENAS se não houver estado selecionado
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!selectedState) {
      positionTooltip(e.clientX, e.clientY);
    }
  }, [selectedState, positionTooltip]);

  const handleMouseEnter = (sigla: string, e: React.MouseEvent) => {
    if (!selectedState) {
      setHoveredState(sigla);
      setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
    }
  };

  const handleStateClick = (sigla: string, e: React.MouseEvent<SVGPathElement>) => {
    e.stopPropagation();
    if (selectedState === sigla) {
      setSelectedState(null);
      setTooltip(null);
    } else {
      setSelectedState(sigla);
      setHoveredState(null);
      setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });

      // Fixa o card no topo do estado clicado
      const rect = e.currentTarget.getBoundingClientRect();
      positionTooltip(rect.left + rect.width / 2, rect.top);
    }
  };

  // Fecha ao clicar fora
  useEffect(() => {
    const handleOutside = () => setSelectedState(null);
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, []);

  return (
    <section className="relative bg-[#1a0000] py-16 md:py-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">Área de atuação</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">Presença em Todo o Brasil</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Clique em um estado para ver detalhes. Atendimento completo no <span className="text-white font-semibold">Sudeste</span> e SPDA nacional.
          </p>
        </div>

        <div className="w-full flex justify-center mb-10 overflow-visible" onMouseMove={handleMouseMove}>
          <svg
            viewBox="0 0 613 639"
            className="w-full max-w-2xl h-auto select-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {MAPA_PATHS.map((estado) => (
              <path
                key={estado.sigla}
                d={estado.d}
                fill={getEstadoFill(estado.sigla)}
                stroke="#1a0000"
                strokeWidth="1"
                style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "pointer" }}
                onMouseEnter={(e) => handleMouseEnter(estado.sigla, e)}
                onMouseLeave={() => !selectedState && setTooltip(null)}
                onClick={(e) => handleStateClick(estado.sigla, e)}
              />
            ))}
          </svg>
        </div>

        {tooltip && (
          <div
            ref={tooltipRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 100,
              // Permite clicar APENAS se estiver selecionado
              pointerEvents: selectedState ? 'auto' : 'none'
            }}
            className={`flex flex-col bg-[#110000] border ${selectedState ? 'border-[#800000] scale-105' : 'border-white/20'} rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl min-w-[220px] transition-transform duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-3">
                <p className="font-bold text-white text-lg">{tooltip.nome}</p>
                {selectedState && <button onClick={() => setSelectedState(null)} className="text-white/40 hover:text-white text-xs">✕</button>}
            </div>

            {ESTADOS_COMPLETOS.has(tooltip.sigla) ? (
              <div>
                <span className="text-[9px] bg-green-500/20 text-green-400 font-bold px-2 py-1 rounded-md uppercase tracking-tighter">Atendimento Completo</span>
                <ul className="mt-3 space-y-2">
                   {getServicosPorEstado(tooltip.sigla as EstadoSigla).map(s => (
                     <li key={s.id} className="text-white/70 text-[11px] flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#800000] rounded-full" />
                        {s.nomeAbreviado}
                     </li>
                   ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="text-white/50 text-xs italic leading-relaxed">Consultoria para projetos e licenciamentos sob demanda.</p>
                <a
                  href={getWhatsAppUrl(`Olá! Gostaria de informações sobre serviços no estado de ${tooltip.nome}`)}
                  target="_blank"
                  className="mt-4 flex items-center justify-center gap-2 bg-[#800000] text-white py-2 rounded-lg text-[11px] font-bold hover:bg-[#a30000] transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  CONSULTAR AGORA
                </a>
              </div>
            )}
          </div>
        )}

        {/* Card Brasil - SPDA */}
        <article className="mt-12 bg-gradient-to-br from-[#1a0000] to-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe className="w-32 h-32 text-white" />
          </div>
          <div className="flex gap-5 items-start relative z-10">
            <div className="p-4 bg-[#800000]/20 rounded-2xl border border-[#800000]/30"><Globe className="w-8 h-8 text-[#800000]" /></div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Sistemas SPDA e Aterramento</h3>
              <p className="text-white/50 mt-2 max-w-md text-sm">Projetos, laudos e instalações de para-raios com validade em <span className="text-white">todo o território nacional</span> e emissão de ART.</p>
            </div>
          </div>
          <Link href={getWhatsAppUrl("Olá, gostaria de um orçamento para SPDA.")} className="w-full md:w-auto bg-[#800000] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#a30000] transition-all shadow-lg text-center active:scale-95 relative z-10">
            Falar com Especialista
          </Link>
        </article>
      </div>
      <CrosshairDecor className="opacity-10" />
    </section>
  );
}