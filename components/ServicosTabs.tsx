"use client";

/**
 * ServicosTabs — homepage Central de Soluções
 *
 * Client Component isolado. Toda a lógica de estado (tab ativa) fica aqui;
 * o app/page.tsx permanece Server Component e passa os dados via props.
 *
 * Props são arrays de Servico[] serializáveis (string | boolean | string[]).
 * Nunca importar `servicos` diretamente aqui — receber sempre via props.
 *
 * Estrutura das tabs:
 *   Legalização   → categoria "legalizacao"  (AVCB, Alvará, Ambiental, Prefeitura)
 *   Projetos      → categoria "projeto"      (Projetos Técnicos + sub-serviços)
 *   Laudos        → categorias "laudo" + "instalacao" (Laudos, SPDA, Aterramento, Continuidade)
 *
 * SEO: todos os painéis renderizam no DOM; painéis inativos ocultados com
 * `hidden` (Tailwind → display:none via CSS, indexado pelo Googlebot).
 */

import { useState, useRef } from "react";
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
import Link from "next/link";
import { type Servico } from "@/data/servicos";
import { CrosshairDecor } from "@/components/CrosshairDecor";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type TabId = "legalizacao" | "projetos" | "laudos";

export interface ServicosTabsProps {
  legalizacao: readonly Servico[];
  projetos: readonly Servico[];
  laudos: readonly Servico[];
}

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

// ─── Configuração das tabs ─────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; ariaLabel: string }[] = [
  {
    id: "legalizacao",
    label: "Legalização",
    ariaLabel: "Serviços de legalização: AVCB, Vigilância Sanitária, Licenciamento Ambiental e Regularização Municipal",
  },
  {
    id: "projetos",
    label: "Projetos Técnicos",
    ariaLabel: "Serviços de projetos técnicos de engenharia e arquitetura",
  },
  {
    id: "laudos",
    label: "Laudos Técnicos",
    ariaLabel: "Laudos técnicos, SPDA, aterramento elétrico e testes de continuidade",
  },
];

// ─── Variantes de animação ─────────────────────────────────────────────────────
// motion/react respeita prefers-reduced-motion automaticamente

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Sub-componente: card de serviço ──────────────────────────────────────────

function ServicoCard({ servico }: { servico: Servico }) {
  const Icon = ICON_MAP[servico.iconeLucide] ?? ShieldAlert;

  const cobertura = servico.coberturaNacional
    ? "Todo o Brasil"
    : servico.estados.filter((e) => e !== "BR").join(" · ");

  return (
    <article
      aria-label={`Serviço: ${servico.nomeAbreviado}`}
      className="bg-white border border-neutral-200/70 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-4 h-full"
    >
      {/* Ícone com fundo colorido derivado do accent */}
      <div
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-service-accent, #800000) 10%, transparent)",
        }}
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <Icon
          style={{ color: "var(--color-service-accent, #800000)" }}
          className="w-5 h-5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Textos */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-heading text-xl font-bold text-neutral-900 leading-snug">
          {servico.nomeAbreviado}
        </h3>
        <p className="text-neutral-700 text-base leading-relaxed">
          {servico.descricao}
        </p>
      </div>

      {/* Rodapé do card: badge de cobertura + link */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2 border-t border-neutral-100">
        {/* Badge de estados */}
        <span
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-service-accent, #800000) 10%, transparent)",
            color: "var(--color-service-accent, #800000)",
          }}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
        >
          {cobertura}
        </span>

        {/* Link para subpágina do serviço */}
        <Link
          href={servico.pathRota}
          style={{ color: "var(--color-service-accent, #800000)" }}
          className="text-sm font-semibold hover:underline underline-offset-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label={`Saiba mais sobre ${servico.nome}`}
        >
          Saiba mais →
        </Link>
      </div>
    </article>
  );
}

// ─── Sub-componente: painel de conteúdo da tab ────────────────────────────────

function TabPanel({
  id,
  servicos,
  isActive,
  inView,
}: {
  id: TabId;
  servicos: readonly Servico[];
  isActive: boolean;
  inView: boolean;
}) {
  return (
    /**
     * role="tabpanel" + aria-labelledby vinculam o painel ao botão da tab.
     * `hidden` → display:none via CSS, mas o Googlebot ainda indexa o conteúdo.
     * Não usar `display:none` via style inline — prefere-se a classe Tailwind
     * para que o CSS possa ser anulado via JavaScript sem conflito de especificidade.
     */
    <div
      role="tabpanel"
      id={`tabpanel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={isActive ? "" : "hidden"}
    >
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        aria-label={`Serviços: ${id}`}
        variants={containerVariants}
        initial="hidden"
        animate={isActive && inView ? "visible" : "hidden"}
        key={id} /* força re-animação ao trocar de tab */
      >
        {servicos.map((servico) => (
          <motion.li
            key={servico.id}
            className="list-none"
            variants={itemVariants}
          >
            <ServicoCard servico={servico} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function ServicosTabs({
  legalizacao,
  projetos,
  laudos,
}: ServicosTabsProps) {
  const [tabAtiva, setTabAtiva] = useState<TabId>("legalizacao");
  const secaoRef = useRef<HTMLElement>(null);
  const inView = useInView(secaoRef, { once: true, margin: "-8%" });

  const paineis: Record<TabId, readonly Servico[]> = {
    legalizacao,
    projetos,
    laudos,
  };

  return (
    <section
      ref={secaoRef}
      id="servicos"
      aria-labelledby="servicos-tabs-heading"
      className="relative bg-white py-16 md:py-24"
    >
      <div className="container-site">

        {/* Cabeçalho da seção */}
        <motion.div
          className="max-w-2xl mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{ color: "var(--color-service-accent, #800000)" }}
            className="text-xs font-semibold uppercase tracking-widest mb-3"
          >
            O que fazemos
          </p>
          <h2
            id="servicos-tabs-heading"
            className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
          >
            Nossos Serviços
          </h2>
          <p className="text-neutral-700 text-lg leading-relaxed">
            Regularização completa de engenharia civil — AVCB, SPDA,
            Licenciamento Ambiental, Vigilância Sanitária e Projetos Técnicos
            com responsáveis técnicos que assinam as ARTs diretamente.
          </p>
        </motion.div>

        {/* ── Barra de tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/*
           * role="tablist" + aria-label: descreve o conjunto de tabs para leitores de tela.
           * Cada botão com role="tab" + aria-selected + aria-controls vinculado ao painel.
           */}
          <div
            role="tablist"
            aria-label="Categorias de serviço"
            className="flex border-b border-neutral-200 mb-10 overflow-x-auto"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === tabAtiva;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  aria-label={tab.ariaLabel}
                  onClick={() => setTabAtiva(tab.id)}
                  style={
                    isActive
                      ? {
                          color: "var(--color-service-accent, #800000)",
                          borderBottomColor:
                            "var(--color-service-accent, #800000)",
                        }
                      : undefined
                  }
                  className={[
                    // Layout e tipografia
                    "relative px-6 py-4 text-base font-semibold whitespace-nowrap",
                    "border-b-2 -mb-px transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                    // Cor condicional
                    isActive
                      ? /* cores aplicadas via style= inline acima */
                        ""
                      : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300",
                  ]
                    .join(" ")
                    .trim()}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Painéis de conteúdo ── */}
        {TABS.map((tab) => (
          <TabPanel
            key={tab.id}
            id={tab.id}
            servicos={paineis[tab.id]}
            isActive={tab.id === tabAtiva}
            inView={inView}
          />
        ))}

      </div>

      {/* Crosshair — assinatura visual do cliente (variant dark = fundo branco) */}
      <CrosshairDecor variant="dark" size="lg" />
    </section>
  );
}
