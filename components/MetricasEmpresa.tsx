"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// ─── Dados das métricas ───────────────────────────────────────────────────────

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
      <p
        aria-label={`${metrica.descricao}`}
        className="font-heading text-5xl md:text-6xl font-extrabold text-[#800000] leading-none tabular-nums"
      >
        <span aria-hidden="true">
          {valor.toLocaleString("pt-BR")}{metrica.sufixo}
        </span>
      </p>
      <p className="text-sm font-semibold text-neutral-900 mt-2">
        {metrica.rotulo}
      </p>
      <p className="text-xs text-neutral-500 max-w-[160px] leading-snug">
        {metrica.descricao}
      </p>
    </div>
  );
}

// ─── Variantes de animação dos cards ─────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Componente principal ─────────────────────────────────────────────────────

export function MetricasEmpresa() {
  const secaoRef = useRef<HTMLElement>(null);
  const emVista = useInView(secaoRef, { once: true, margin: "-20%" });

  return (
    <section
      ref={secaoRef}
      aria-labelledby="metricas-heading"
      className="bg-white py-16 md:py-20 border-b border-neutral-100"
    >
      <div className="container-site">

        <h2
          id="metricas-heading"
          className="sr-only"
        >
          Números da Central de Soluções
        </h2>

        <motion.dl
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={emVista ? "visible" : "hidden"}
        >
          {METRICAS.map((m) => (
            <motion.div
              key={m.rotulo}
              role="group"
              aria-label={m.rotulo}
              variants={itemVariants}
            >
              <CardMetrica metrica={m} ativo={emVista} />
            </motion.div>
          ))}
        </motion.dl>

      </div>
    </section>
  );
}
