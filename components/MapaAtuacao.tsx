/* eslint-disable react/no-unknown-property */
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, MessageCircle, MapPin, ArrowRight } from "lucide-react";
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
  MAPA_PATHS.map((e) => [e.sigla, e.nome])
);

export function MapaAtuacao() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ sigla: string; nome: string } | null>(null);
  // Controla se o pulse já terminou (para não reanimar após interação)
  const [pulseActive, setPulseActive] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Para o pulse após primeira interação com o mapa
  const stopPulse = useCallback(() => setPulseActive(false), []);

  const getEstadoFill = (sigla: string) => {
    if (selectedState === sigla) return "#800000";
    if (selectedState !== null && selectedState !== sigla) return "#1a0000";
    if (hoveredState === sigla) {
      return ESTADOS_COMPLETOS.has(sigla) ? "#800000" : "#4f0101";
    }
    // Estados completos em neutro: vermelho escuro visualmente distinto
    if (ESTADOS_COMPLETOS.has(sigla)) return "#5a0a0a";
    return "#3d3d3d";
  };

  const getEstadoOpacity = (sigla: string) => {
    if (selectedState !== null && selectedState !== sigla) return 0.4;
    return 1;
  };

  // Retorna o nome da animação CSS para o path, se aplicável
  const getPulseAnimation = (sigla: string): string => {
    if (!pulseActive) return "none";
    if (hoveredState === sigla || selectedState === sigla) return "none";
    if (selectedState !== null) return "none";
    if (ESTADOS_COMPLETOS.has(sigla)) return "mapaPulse 2.4s ease-in-out infinite";
    return "none";
  };

  const positionTooltip = useCallback((clientX: number, clientY: number) => {
    if (!tooltipRef.current) return;
    const cardWidth = 220;
    const cardHeight = 160;
    let x = clientX - cardWidth / 2;
    let y = clientY - cardHeight - 30;
    x = Math.max(20, Math.min(x, window.innerWidth - cardWidth - 20));
    if (y < 80) y = clientY + 30;
    tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!selectedState) positionTooltip(e.clientX, e.clientY);
    },
    [selectedState, positionTooltip]
  );

  const handleMouseEnter = (sigla: string, e: React.MouseEvent) => {
    stopPulse();
    if (!selectedState) {
      setHoveredState(sigla);
      setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
    }
  };

  const handleStateClick = (sigla: string, e: React.MouseEvent<SVGPathElement>) => {
    e.stopPropagation();
    stopPulse();
    if (selectedState === sigla) {
      setSelectedState(null);
      setTooltip(null);
    } else {
      setSelectedState(sigla);
      setHoveredState(null);
      setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
      const rect = e.currentTarget.getBoundingClientRect();
      positionTooltip(rect.left + rect.width / 2, rect.top);
    }
  };

  useEffect(() => {
    const handleOutside = () => {
      setSelectedState(null);
      setTooltip(null);
    };
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, []);

  return (
    <section className="relative bg-[#1a0000] py-16 md:py-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Layout 2 colunas: info à esquerda, mapa à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center">

          {/* ── Coluna esquerda ── */}
          <div className="flex flex-col gap-8 lg:max-w-md xl:max-w-lg">

            {/* Cabeçalho */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#cc2200] mb-3">
                Área de atuação
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Presença em Todo o Brasil
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Atendimento completo no{" "}
                <span className="text-white font-semibold">Sudeste</span>.
                SPDA e aterramento elétrico em qualquer estado.
                Clique em um estado para ver detalhes.
              </p>
            </div>

            {/* Estados com cobertura completa */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-3">
                Atendimento completo
              </p>
              <ul className="flex flex-col gap-2">
                {estadosAtuacao.map((estado) => {
                  const servicos = getServicosPorEstado(estado.sigla);
                  const isActive = selectedState === estado.sigla || hoveredState === estado.sigla;
                  return (
                    <li
                      key={estado.sigla}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-default ${
                        isActive
                          ? "bg-[#800000]/20 border-[#800000]/50"
                          : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                      }`}
                    >
                      <MapPin
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
                          isActive ? "text-[#cc2200]" : "text-[#800000]"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold leading-snug">
                          {estado.nome}
                        </p>
                        <p className="text-white/50 text-[11px] mt-0.5 leading-snug">
                          {servicos.map((s) => s.nomeAbreviado).join(" · ")}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Legenda */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#800000] flex-shrink-0" />
                <span className="text-white/60 text-xs">Atendimento completo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#3d3d3d] flex-shrink-0" />
                <span className="text-white/60 text-xs">Sob consulta</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={getWhatsAppUrl("Olá! Gostaria de solicitar um orçamento.")}
              className="inline-flex items-center gap-2 self-start bg-[#800000] hover:bg-[#a30000] active:scale-95 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-200 shadow-lg"
            >
              Solicitar orçamento
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* ── Coluna direita: mapa ── */}
          <div
            className="w-full lg:w-[480px] xl:w-[540px] overflow-visible"
            onMouseMove={handleMouseMove}
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              viewBox="0 0 613 639"
              className="w-full h-auto select-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Mapa interativo dos estados de atuação da Central de Soluções"
              role="img"
            >
              {/* Keyframes injetados dentro do SVG — compatível com SVG inline */}
              <defs>
                <style>{`
                  @keyframes mapaPulse {
                    0%, 100% { fill: #5a0a0a; }
                    50%       { fill: #800000; }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .mapa-path { animation: none !important; }
                  }
                `}</style>
              </defs>

              {MAPA_PATHS.map((estado) => (
                <path
                  key={estado.sigla}
                  className="mapa-path"
                  d={estado.d}
                  fill={getEstadoFill(estado.sigla)}
                  opacity={getEstadoOpacity(estado.sigla)}
                  stroke="#1a0000"
                  strokeWidth="1"
                  style={{
                    transition: "fill 200ms ease, opacity 200ms ease",
                    cursor: "pointer",
                    animation: getPulseAnimation(estado.sigla),
                  }}
                  aria-label={NOME_TODOS_ESTADOS[estado.sigla]}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={(e) => handleMouseEnter(estado.sigla, e)}
                  onMouseLeave={() =>
                    !selectedState && (setHoveredState(null), setTooltip(null))
                  }
                  onClick={(e) => handleStateClick(estado.sigla, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleStateClick(
                        estado.sigla,
                        e as unknown as React.MouseEvent<SVGPathElement>
                      );
                  }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Tooltip flutuante (position: fixed) */}
        {tooltip && (
          <div
            ref={tooltipRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 100,
              pointerEvents: selectedState ? "auto" : "none",
            }}
            className={`flex flex-col bg-[#110000] border ${
              selectedState ? "border-[#800000] scale-105" : "border-white/20"
            } rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl min-w-[220px] transition-transform duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-3">
              <p className="font-bold text-white text-lg">{tooltip.nome}</p>
              {selectedState && (
                <button
                  onClick={() => { setSelectedState(null); setTooltip(null); }}
                  className="text-white/40 hover:text-white text-xs ml-3"
                  aria-label="Fechar"
                >
                  ✕
                </button>
              )}
            </div>

            {ESTADOS_COMPLETOS.has(tooltip.sigla) ? (
              <div>
                <span className="text-[9px] bg-green-500/20 text-green-400 font-bold px-2 py-1 rounded-md uppercase tracking-tighter">
                  Atendimento Completo
                </span>
                <ul className="mt-3 space-y-2">
                  {getServicosPorEstado(tooltip.sigla as EstadoSigla).map((s) => (
                    <li
                      key={s.id}
                      className="text-white/70 text-[11px] flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-[#800000] rounded-full" />
                      {s.nomeAbreviado}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="text-white/50 text-xs italic leading-relaxed">
                  Consultoria para projetos e licenciamentos sob demanda.
                </p>
                <a
                  href={getWhatsAppUrl(
                    `Olá! Gostaria de informações sobre serviços no estado de ${tooltip.nome}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ pointerEvents: "auto" }}
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
        <article className="mt-14 bg-gradient-to-br from-[#1a0000] to-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe className="w-32 h-32 text-white" />
          </div>
          <div className="flex gap-5 items-start relative z-10">
            <div className="p-4 bg-[#800000]/20 rounded-2xl border border-[#800000]/30">
              <Globe className="w-8 h-8 text-[#800000]" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Sistemas SPDA e Aterramento
              </h3>
              <p className="text-white/50 mt-2 max-w-md text-sm">
                Projetos, laudos e instalações de para-raios com validade em{" "}
                <span className="text-white">todo o território nacional</span> e emissão de ART.
              </p>
            </div>
          </div>
          <Link
            href={getWhatsAppUrl("Olá, gostaria de um orçamento para SPDA.")}
            className="w-full md:w-auto bg-[#800000] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#a30000] transition-all shadow-lg text-center active:scale-95 relative z-10"
          >
            Falar com Especialista
          </Link>
        </article>
      </div>

      <CrosshairDecor className="opacity-10" />
    </section>
  );
}
