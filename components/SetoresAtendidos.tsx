"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Factory,
  ShoppingCart,
  Radio,
  Sun,
  Zap,
  Fuel,
  GraduationCap,
  Church,
  Wheat,
  Stethoscope,
  Layers,
  type LucideProps,
} from "lucide-react";
import { setores, getServicosPorSetor } from "@/data/servicos";

// ─── Mapa de ícones por setor ────────────────────────────────────────────────────

type IconComponent = React.ComponentType<LucideProps>;

const SETOR_ICON_MAP: Record<string, IconComponent> = {
  industria: Factory,
  comercio: ShoppingCart,
  "galpao-logistico": Layers,
  telecom: Radio,
  "energia-solar": Sun,
  subestacoes: Zap,
  "posto-combustivel": Fuel,
  escola: GraduationCap,
  igreja: Church,
  agronegocio: Wheat,
  saude: Stethoscope,
  ceramica: Factory,
};

// ─── Variantes de animação ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Sub-componente: card de setor ───────────────────────────────────────────────

interface SetorCardProps {
  setorId: string;
  nome: string;
}

function SetorCard({ setorId, nome }: SetorCardProps) {
  const Icon = SETOR_ICON_MAP[setorId] ?? Factory;
  const servicosDemandados = getServicosPorSetor(setorId);

  return (
    <article
      aria-label={`Setor atendido: ${nome}`}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors duration-200 flex flex-col gap-4"
    >
      {/* Ícone + nome */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 bg-[#800000]/30 border border-[#800000]/40 rounded-lg flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <Icon className="w-4 h-4 text-white/70" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-base font-bold text-white leading-snug">
          {nome}
        </h3>
      </div>

      {/* Serviços mais demandados — lista inline */}
      {servicosDemandados.length > 0 && (
        <p
          className="text-sm text-neutral-400 leading-relaxed"
          aria-label={`Serviços demandados por ${nome}`}
        >
          {servicosDemandados
            .map((s) => s.nomeAbreviado)
            .join(" · ")}
        </p>
      )}
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function SetoresAtendidos() {
  const secaoRef = useRef<HTMLElement>(null);
  const emVista = useInView(secaoRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={secaoRef}
      aria-labelledby="setores-heading"
      className="bg-[#111827] py-16 md:py-24"
    >
      <div className="container-site">

        {/* Cabeçalho */}
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={emVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
            Segmentos de atuação
          </p>
          <h2
            id="setores-heading"
            className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight mb-4"
          >
            Atendemos Todos os Segmentos
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Indústria, energia, telecom, agronegócio e muito mais — cada
            segmento tem exigências próprias e a Central de Soluções conhece
            cada uma delas.
          </p>
        </motion.div>

        {/* Grid de setores com stagger */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          aria-label="Setores industriais e comerciais atendidos"
          variants={containerVariants}
          initial="hidden"
          animate={emVista ? "visible" : "hidden"}
        >
          {setores.map((setor) => (
            <motion.li key={setor.id} className="list-none" variants={itemVariants}>
              <SetorCard setorId={setor.id} nome={setor.nome} />
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
