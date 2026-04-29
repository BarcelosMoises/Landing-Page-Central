"use client";

import { useEffect, useRef, useState } from "react";

// ─── Dados das métricas ───────────────────────────────────────────────────────
// Números de impacto da Central de Soluções

interface Metrica {
  valor: number;
  sufixo: string;
  rotulo: string;
  descricao: string;
}

const METRICAS: readonly Metrica[] = [
  {
    valor: 14,
    sufixo: "+",
    rotulo: "Anos de experiência",
    descricao: "mais de 14 anos atuando em regularização de engenharia civil",
  },
  {
    valor: 4,
    sufixo: "",
    rotulo: "Estados do Sudeste",
    descricao: "atendimento completo em ES, MG, RJ e SP",
  },
  {
    valor: 500,
    sufixo: "+",
    rotulo: "Projetos entregues",
    descricao: "mais de 500 serviços concluídos com ART",
  },
  {
    valor: 14,
    sufixo: "+",
    rotulo: "Grandes clientes",
    descricao: "incluindo Claro, Ambev, Embratel e Mercado Livre",
  },
] as const;

// ─── Hook: contador animado ───────────────────────────────────────────────────

function useContador(alvo: number, duracao = 1800, ativo: boolean): number {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!ativo) return;

    // prefers-reduced-motion: exibe valor final imediatamente
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setValor(alvo);
      return;
    }

    let inicio: number | null = null;
    const id = requestAnimationFrame(function animar(ts) {
      if (!inicio) inicio = ts;
      const progresso = Math.min((ts - inicio) / duracao, 1);
      // easeOutCubic: aceleração suave
      const eased = 1 - Math.pow(1 - progresso, 3);
      setValor(Math.round(eased * alvo));
      if (progresso < 1) requestAnimationFrame(animar);
    });

    return () => cancelAnimationFrame(id);
  }, [alvo, duracao, ativo]);

  return valor;
}

// ─── Sub-componente: card de métrica ─────────────────────────────────────────

function CardMetrica({ metrica, ativo }: { metrica: Metrica; ativo: boolean }) {
  const valor = useContador(metrica.valor, 1800, ativo);

  return (
    <div className="flex flex-col items-center text-center gap-1">
      {/* Número grande */}
      <p
        aria-label={`${metrica.descricao}`}
        className="font-heading text-5xl md:text-6xl font-extrabold text-[#800000] leading-none tabular-nums"
      >
        <span aria-hidden="true">
          {valor.toLocaleString("pt-BR")}{metrica.sufixo}
        </span>
      </p>
      {/* Rótulo visível */}
      <p className="text-sm font-semibold text-neutral-900 mt-2">
        {metrica.rotulo}
      </p>
      {/* Descrição curta */}
      <p className="text-xs text-neutral-500 max-w-[160px] leading-snug">
        {metrica.descricao}
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function MetricasEmpresa() {
  const secaoRef = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  // Dispara animação quando a seção entra na viewport
  useEffect(() => {
    const el = secaoRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          obs.disconnect(); // roda apenas uma vez
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={secaoRef}
      aria-labelledby="metricas-heading"
      className="bg-white py-16 md:py-20 border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2
          id="metricas-heading"
          className="sr-only"
        >
          Números da Central de Soluções
        </h2>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {METRICAS.map((m) => (
            <div key={m.rotulo} role="group" aria-label={m.rotulo}>
              <CardMetrica metrica={m} ativo={visivel} />
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
