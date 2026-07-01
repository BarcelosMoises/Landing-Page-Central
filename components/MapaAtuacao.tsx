/* eslint-disable react/no-unknown-property */
"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import {
  estadosAtuacao,
  getServicosPorEstado,
  getWhatsAppUrl,
  type EstadoSigla,
} from "@/data/servicos";
import { MAPA_PATHS } from "@/data/mapa-paths";
import { CrosshairDecor } from "@/components/CrosshairDecor";

const ESTADOS_COMPLETOS = new Set<string>(
  estadosAtuacao
    .filter((e) => e.cobertura === "completa")
    .map((e) => e.sigla)
);

const NOME_TODOS_ESTADOS: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas",
  BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", GO: "Goiás",
  MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", PA: "Pará",
  PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
  RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia",
  RR: "Roraima", SC: "Santa Catarina", SE: "Sergipe", TO: "Tocantins",
  RJ: "Rio de Janeiro", SP: "São Paulo", MG: "Minas Gerais", ES: "Espírito Santo",
};

function CardBrasil() {
  return (
    <article className="bg-[#800000] border border-[#4f0101] rounded-xl p-6 shadow-sm flex flex-col gap-4 col-span-1 md:col-span-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-white/80" />
            <span className="font-heading text-2xl font-extrabold text-white">Brasil</span>
            <span className="text-xs font-semibold uppercase tracking-wide bg-white/20 text-white px-2.5 py-0.5 rounded-full">Cobertura Nacional</span>
          </div>
          <h3 className="font-heading text-lg md:text-xl font-bold text-white leading-snug">SPDA e Sistemas de Segurança: Todo o Brasil</h3>
          <p className="text-white/80 text-sm leading-relaxed max-w-xl">Projeto, laudo e instalação em qualquer estado brasileiro.</p>
        </div>
        <Link href="/#servicos" className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#800000] hover:bg-neutral-100 font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
          Ver serviços de SPDA <span>→</span>
        </Link>
      </div>
    </article>
  );
}

export function MapaAtuacao() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ sigla: string; nome: string } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getEstadoFill = (sigla: string) => {
    if (selectedState === sigla) return "#800000";
    if (selectedState !== null && selectedState !== sigla) return "#1a0000";
    if (hoveredState === sigla && ESTADOS_COMPLETOS.has(sigla)) return "#800000";
    if (hoveredState === sigla && !ESTADOS_COMPLETOS.has(sigla)) return "#4f0101";
    return "#3d3d3d";
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!tooltipRef.current) return;
    const x = Math.max(8, Math.min(e.clientX - 110, window.innerWidth - 230));
    const y = e.clientY - 140;
    tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseEnter = (sigla: string, e: React.MouseEvent) => {
    setHoveredState(sigla);
    setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
  };

  const handleMouseLeave = () => { setHoveredState(null); setTooltip(null); };

  const handleClick = (sigla: string) => {
    setSelectedState(prev => prev === sigla ? null : sigla);
  };

  return (
    <section className="relative bg-[#1a0000] py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">Área de atuação</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">Atuamos em Todo o Sudeste do Brasil</h2>
          <p className="text-white/70 text-lg">ES, MG, RJ e SP — com atendimento nacional para SPDA.</p>
        </div>

        <div className="w-full flex justify-center mb-10 overflow-visible" onMouseMove={handleMouseMove}>
          <svg viewBox="0 0 613 639" className="w-full max-w-2xl h-auto select-none touch-auto">
            {MAPA_PATHS.map((estado) => (
              <path
                key={estado.sigla}
                d={estado.d}
                fill={getEstadoFill(estado.sigla)}
                opacity={selectedState && selectedState !== estado.sigla ? 0.4 : 1}
                stroke="#1a0000"
                strokeWidth={1.5}
                style={{ transition: "fill 200ms ease, opacity 200ms ease", cursor: "pointer" }}
                onMouseEnter={(e) => handleMouseEnter(estado.sigla, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(estado.sigla)}
              />
            ))}
          </svg>
        </div>

        {tooltip && (
          <div ref={tooltipRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 100 }} className="flex flex-col bg-[#1a0000]/fb border border-[#800000]/50 rounded-lg p-3 shadow-xl backdrop-blur-md min-w-[180px]">
            <p className="font-bold text-white text-sm">{tooltip.nome}</p>
            {ESTADOS_COMPLETOS.has(tooltip.sigla) ? (
              <span className="mt-2 text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full w-fit">✓ Atendimento completo</span>
            ) : (
              <p className="text-white/60 text-[10px] mt-1">Serviços sob consulta</p>
            )}
          </div>
        )}

        <CardBrasil />
      </div>
      <CrosshairDecor />
    </section>
  );
}