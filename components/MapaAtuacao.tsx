/* eslint-disable react/no-unknown-property */
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, MapPin, X, CheckCircle2 } from "lucide-react";
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
  const [pulseActive, setPulseActive] = useState(true);
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelData, setPanelData] = useState<{ sigla: string; nome: string } | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const stopPulse = useCallback(() => setPulseActive(false), []);

  const openPanel = useCallback((sigla: string) => {
    setPanelData({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPanelVisible(true));
    });
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }, []);

  const closePanel = useCallback(() => {
    setPanelVisible(false);
    setTimeout(() => setPanelData(null), 300);
  }, []);

  const getEstadoFill = (sigla: string) => {
    if (selectedState === sigla) return "#800000";
    if (selectedState !== null && selectedState !== sigla) return "#1a0000";
    if (hoveredState === sigla) return ESTADOS_COMPLETOS.has(sigla) ? "#800000" : "#4f0101";
    if (ESTADOS_COMPLETOS.has(sigla)) return "#5a0a0a";
    return "#3d3d3d";
  };

  const getEstadoOpacity = (sigla: string) => {
    if (selectedState !== null && selectedState !== sigla) return 0.4;
    return 1;
  };

  const getPulseAnimation = (sigla: string): string => {
    if (!pulseActive || hoveredState === sigla || selectedState !== null) return "none";
    if (ESTADOS_COMPLETOS.has(sigla)) return "mapaPulse 2.4s ease-in-out infinite";
    return "none";
  };

  const positionTooltip = useCallback((clientX: number, clientY: number) => {
    if (!tooltipRef.current) return;
    const W = 200, H = 48;
    let x = clientX - W / 2;
    let y = clientY - H - 14;
    x = Math.max(12, Math.min(x, window.innerWidth - W - 12));
    if (y < 12) y = clientY + 14;
    tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => { if (!selectedState) positionTooltip(e.clientX, e.clientY); },
    [selectedState, positionTooltip]
  );

  const handleMouseEnter = (sigla: string, e: React.MouseEvent) => {
    stopPulse();
    if (!selectedState) {
      setHoveredState(sigla);
      setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
      positionTooltip(e.clientX, e.clientY);
    }
  };

  const handleStateClick = (sigla: string, e: React.MouseEvent<SVGPathElement>) => {
    e.stopPropagation();
    stopPulse();
    setHoveredState(null);
    setTooltip(null);
    if (selectedState === sigla) {
      setSelectedState(null);
      closePanel();
    } else {
      setSelectedState(sigla);
      openPanel(sigla);
    }
  };

  const handleDeselect = useCallback(() => {
    setSelectedState(null);
    closePanel();
  }, [closePanel]);

  useEffect(() => {
    const handleOutside = () => handleDeselect();
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, [handleDeselect]);

  const isCompleto = panelData ? ESTADOS_COMPLETOS.has(panelData.sigla) : false;
  const servicos = isCompleto && panelData
    ? getServicosPorEstado(panelData.sigla as EstadoSigla)
    : [];

  return (
    <section className="relative bg-[#1a0000] py-16 md:py-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-8 lg:max-w-md xl:max-w-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#cc2200] mb-3">
                Área de atuação
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Presença em Todo o Brasil
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                Atuamos em todo o Brasil, especialmente no{" "}
                <span className="text-white font-semibold">Sudeste</span>.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-3">
                CLIQUE NOS ESTADOS PARA INTERAGIR
              </p>
              <ul className="flex flex-col gap-2">
                {estadosAtuacao.map((estado) => {
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
                        <p className="text-white text-sm font-semibold leading-snug">{estado.nome}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

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
          </div>

          {/* Coluna direita: mapa */}
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
                  onMouseLeave={() => !selectedState && (setHoveredState(null), setTooltip(null))}
                  onClick={(e) => handleStateClick(estado.sigla, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleStateClick(estado.sigla, e as unknown as React.MouseEvent<SVGPathElement>);
                  }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Tooltip leve — só no hover */}
        {tooltip && !selectedState && (
          <div
            ref={tooltipRef}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
            className="bg-[#110000]/90 border border-white/15 rounded-lg px-3 py-2 shadow-lg backdrop-blur-md"
          >
            <p className="text-white text-xs font-semibold whitespace-nowrap">
              {tooltip.nome}
            </p>
            <p className="text-white/50 text-[10px] mt-0.5">
              {ESTADOS_COMPLETOS.has(tooltip.sigla) ? "Clique para ver serviços" : "Clique para consultar"}
            </p>
          </div>
        )}

        {/* Painel de detalhes persistente */}
        {panelData && (
          <div
            ref={panelRef}
            className="mt-8 rounded-2xl border overflow-hidden"
            style={{
              opacity: panelVisible ? 1 : 0,
              transform: panelVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 280ms ease, transform 280ms ease",
              borderColor: isCompleto ? "rgba(128,0,0,0.4)" : "rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isCompleto ? (
              <div className="bg-gradient-to-br from-[#200000] to-[#110000] p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#800000]/20 rounded-xl border border-[#800000]/30">
                      <MapPin className="w-5 h-5 text-[#cc2200]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#cc2200] mb-0.5">
                        Atendimento completo
                      </p>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight">
                        {panelData.nome}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={handleDeselect}
                    aria-label="Fechar painel"
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {servicos.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-start gap-2.5 p-3 bg-white/[0.04] border border-white/[0.07] rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#800000] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-white/80 text-sm leading-snug">{s.nomeAbreviado}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={getWhatsAppUrl(`Olá! Gostaria de um orçamento para serviços em ${panelData.nome}.`)}
                  className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#a30000] active:scale-95 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-200 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Solicitar orçamento em {panelData.nome}
                </Link>
              </div>
            ) : (
              <div className="bg-[#110000] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDeselect}
                    aria-label="Fechar painel"
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 sm:hidden"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-0.5">
                      Sob consulta
                    </p>
                    <h3 className="font-heading text-xl font-bold text-white">{panelData.nome}</h3>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed max-w-md">
                      Atendemos projetos e licenciamentos neste estado sob demanda.
                      Entre em contato para verificar disponibilidade e prazos.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <a
                    href={getWhatsAppUrl(`Olá! Tenho interesse em serviços no estado de ${panelData.nome}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#a30000] active:scale-95 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-200 shadow-lg whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Consultar disponibilidade
                  </a>
                  <button
                    onClick={handleDeselect}
                    aria-label="Fechar painel"
                    className="hidden sm:flex p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CrosshairDecor className="opacity-10" />
    </section>
  );
}
