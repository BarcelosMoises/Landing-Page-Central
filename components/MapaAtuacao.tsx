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

export function MapaAtuacao() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ sigla: string; nome: string } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getEstadoFill = (sigla: string) => {
    if (selectedState === sigla) return "#800000"; // Vinho se selecionado
    if (selectedState !== null && selectedState !== sigla) return "rgba(255,255,255,0.1)"; // Opaco se outro estiver selecionado
    if (hoveredState === sigla) {
      return ESTADOS_COMPLETOS.has(sigla) ? "#800000" : "#4f0101";
    }
    return "#ffffff"; // BRANCO no estado neutro como você pediu
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!tooltipRef.current) return;
    const x = Math.max(10, Math.min(e.clientX - 100, window.innerWidth - 220));
    const y = e.clientY - 130;
    tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseEnter = (sigla: string) => {
    setHoveredState(sigla);
    setTooltip({ sigla, nome: NOME_TODOS_ESTADOS[sigla] || sigla });
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
    setTooltip(null);
  };

  return (
    <section className="relative bg-[#1a0000] py-16 md:py-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">Área de atuação</p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">Atendimento em Todo o Brasil</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Foco em <span className="text-white font-semibold">ES, MG, RJ e SP</span> com serviços completos e cobertura nacional para SPDA.
          </p>
        </div>

        <div className="w-full flex justify-center mb-10 overflow-visible" onMouseMove={handleMouseMove}>
          <svg
            viewBox="0 0 613 639"
            className="w-full max-w-2xl h-auto select-none drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {MAPA_PATHS.map((estado) => (
              <path
                key={estado.sigla}
                d={estado.d}
                fill={getEstadoFill(estado.sigla)}
                stroke="#1a0000"
                strokeWidth="0.8"
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                onMouseEnter={() => handleMouseEnter(estado.sigla)}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedState(prev => prev === estado.sigla ? null : estado.sigla)}
                className="hover:filter hover:brightness-90"
              />
            ))}
          </svg>
        </div>

        {tooltip && (
          <div
            ref={tooltipRef}
            style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 100 }}
            className="flex flex-col bg-[#1a0000] border border-white/20 rounded-lg p-4 shadow-2xl backdrop-blur-xl min-w-[200px]"
          >
            <p className="font-bold text-white text-base">{tooltip.nome}</p>
            {ESTADOS_COMPLETOS.has(tooltip.sigla) ? (
              <div className="mt-2">
                <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-1 rounded-full uppercase">✓ Atendimento completo</span>
                <ul className="mt-2 space-y-1">
                   {getServicosPorEstado(tooltip.sigla as EstadoSigla).slice(0,3).map(s => (
                     <li key={s.id} className="text-white/60 text-[11px]">• {s.nomeAbreviado}</li>
                   ))}
                </ul>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-white/50 text-xs italic">Serviços sob consulta</p>
                <Link href={getWhatsAppUrl()} className="mt-2 inline-block text-[10px] text-[#800000] font-bold underline">Falar com consultor →</Link>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 mt-10">
           <article className="bg-[#800000] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/10 rounded-xl"><Globe className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">Sistemas SPDA e Aterramento</h3>
                  <p className="text-white/80 text-sm mt-1 max-w-md">Realizamos laudos, projetos e instalações de para-raios com validade nacional e emissão de ART.</p>
                </div>
              </div>
              <Link href="/#servicos" className="w-full md:w-auto bg-white text-[#800000] px-8 py-3 rounded-full font-bold hover:bg-neutral-100 transition-colors text-center">Ver Serviços</Link>
           </article>
        </div>
      </div>
      <CrosshairDecor className="opacity-20" />
    </section>
  );
}