"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ShieldAlert,
  ClipboardCheck,
  Leaf,
  Building2,
  Zap,
  FlameKindling,
  Activity,
  Radio,
  FileText,
  Ruler,
  type LucideProps,
} from "lucide-react";
import { servicos, type Servico } from "@/data/servicos";

// ─── Mapa de ícones ────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  ShieldAlert,
  ClipboardCheck,
  Leaf,
  Building2,
  Zap,
  FlameKindling,
  Activity,
  Radio,
  FileText,
  Ruler,
};

// ─── Variantes de animação ────────────────────────────────────────────────────
// Respeita prefers-reduced-motion via motion/react automaticamente

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Sub-componente: card individual ─────────────────────────────────────────────

interface ServicoCardProps {
  servico: Servico;
}

function ServicoCard({ servico }: ServicoCardProps) {
  const Icon = ICON_MAP[servico.iconeLucide] ?? ShieldAlert;

  const estadosLabel = servico.coberturaNacional
    ? "Todo o Brasil"
    : servico.estados
        .filter((e) => e !== "BR")
        .join(" · ");

  return (
    <article
      aria-label={`Serviço: ${servico.nomeAbreviado}`}
      className="bg-white border border-neutral-200/60 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
    >
      {/* Ícone — sem círculo colorido de fundo (anti-pattern removido) */}
      <Icon
        className="w-8 h-8 text-[#800000]"
        aria-hidden="true"
      />

      {/* Textos */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-heading text-xl font-bold text-neutral-900 leading-snug">
          {servico.nomeAbreviado}
        </h3>
        <p className="text-neutral-700 text-base leading-relaxed">
          {servico.descricao}
        </p>
      </div>

      {/* Badge de cobertura — apenas vinho, sem verde fora do design system */}
      <div className="flex flex-wrap gap-1.5 mt-auto" aria-label="Estados de atendimento">
        <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-[#800000]/10 text-[#800000] px-2.5 py-1 rounded-full">
          {estadosLabel}
        </span>
        {servico.coberturaNacional && (
          <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-[#800000]/5 text-[#800000]/80 px-2.5 py-1 rounded-full">
            Cobertura nacional
          </span>
        )}
      </div>
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function ServicosGrid() {
  const secaoRef = useRef<HTMLElement>(null);
  const emVista = useInView(secaoRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={secaoRef}
      id="servicos"
      aria-labelledby="servicos-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="container-site">

        {/* Cabeçalho da seção */}
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={emVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
            O que fazemos
          </p>
          <h2
            id="servicos-heading"
            className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
          >
            Nossos Serviços
          </h2>
          <p className="text-neutral-700 text-lg leading-relaxed">
            Regularização completa de engenharia civil para sua empresa —
            AVCB, SPDA, Licenciamento Ambiental, Vigilância Sanitária e muito
            mais, com engenheiros que assinam as ARTs diretamente.
          </p>
        </motion.div>

        {/* Grid de cards com stagger */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          aria-label="Lista de serviços da Central de Soluções"
          variants={containerVariants}
          initial="hidden"
          animate={emVista ? "visible" : "hidden"}
        >
          {servicos.map((servico) => (
            <motion.li key={servico.id} className="list-none" variants={itemVariants}>
              <ServicoCard servico={servico} />
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
