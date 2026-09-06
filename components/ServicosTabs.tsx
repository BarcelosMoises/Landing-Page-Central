"use client";

/**
 * ServicosTabs — homepage Central de Soluções
 *
 * Client Component isolado. Toda a lógica de estado (tab ativa) fica aqui;
 * o app/page.tsx permanece Server Component e passa os dados via props.
 *
 * Props são arrays de Servico[] serializáveis.
 * Nunca importar `servicos` diretamente aqui — receber sempre via props.
 *
 * Estrutura das tabs:
 * Legalização → categoria "legalizacao" (AVCB, Alvará, Ambiental, Prefeitura)
 * Projetos → categoria "projeto" (Projetos Técnicos + sub-serviços)
 * Laudos → categorias "laudo" + "instalacao" (Laudos, SPDA, Aterramento, Continuidade)
 *
 * SEO: todos os painéis renderizam no DOM; painéis inativos ocultados com
 * a classe Tailwind `hidden` (display:none via CSS de autor, indexado pelo
 * Googlebot). Importante: nunca combinar a classe `hidden` com `grid`/`flex`
 * no mesmo elemento — CSS de autor sempre vence o atributo HTML `hidden`
 * (user-agent stylesheet), então o className precisa alternar entre os dois
 * estados em vez de somar classes conflitantes.
 *
 * Cada card exibe ícone, título, descrição e CTA sempre visíveis. Quando o
 * serviço possui `imagens` reais em data/servicos.ts, um botão "Ver fotos"
 * expande um painel com o carrossel bento animado (GaleriaCarrossel). Sem
 * fotos reais, o botão simplesmente não aparece — nunca um placeholder ou
 * bloco vazio.
 *
 * Grid: 2 colunas fixas no desktop (md:grid-cols-2), 1 coluna no mobile.
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
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
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { type Servico } from "@/data/servicos";
import { GaleriaCarrossel } from "@/components/GaleriaCarrossel";

// ─── Tipos ───────────────────────────────────────────────────────────────────────────────

type TabId = "legalizacao" | "projetos" | "laudos";

export interface ServicosTabsProps {
  legalizacao: readonly Servico[];
  projetos: readonly Servico[];
  laudos: readonly Servico[];
}

// ─── Mapa de ícones ──────────────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
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

// ─── Configuração das tabs ───────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; ariaLabel: string }[] = [
  {
    id: "legalizacao",
    label: "Legalização",
    ariaLabel:
      "Serviços de legalização: AVCB, Vigilância Sanitária, Licenciamento Ambiental e Regularização Municipal",
  },
  {
    id: "projetos",
    label: "Projetos Técnicos",
    ariaLabel: "Serviços de projetos técnicos de engenharia e arquitetura",
  },
  {
    id: "laudos",
    label: "Laudos Técnicos",
    ariaLabel:
      "Laudos técnicos, SPDA, aterramento elétrico e testes de continuidade",
  },
];

// ─── Variantes de animação ───────────────────────────────────────────────────────────────────
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
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Sub-componente: card de serviço real ────────────────────────────────────────────────

function ServicoCard({ servico }: { servico: Servico }) {
  const Icon = ICON_MAP[servico.iconeLucide] ?? ShieldAlert;
  const [expandido, setExpandido] = useState(false);

  // nomeCurto é usado exclusivamente no título do card da tab.
  // nomeAbreviado permanece inalterado para todos os outros usos do site.
  const tituloCard = servico.nomeCurto ?? servico.nomeAbreviado;
  const temGaleria = Boolean(servico.imagens && servico.imagens.length > 0);

  return (
    <motion.article
      layout
      variants={itemVariants}
      className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-service-accent, #800000) 10%, transparent)",
              color: "var(--color-service-accent, #800000)",
            }}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-semibold text-neutral-900">
            {tituloCard}
          </h3>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-neutral-600">
          {servico.descricao}
        </p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <Link
            href={servico.pathRota}
            style={{ color: "var(--color-service-accent, #800000)" }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline underline-offset-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
          >
            Saiba mais →
          </Link>

          {temGaleria ? (
            <button
              type="button"
              onClick={() => setExpandido((v) => !v)}
              aria-expanded={expandido}
              aria-controls={`galeria-${servico.id}`}
              aria-label={
                expandido
                  ? `Ocultar galeria de fotos de ${servico.nome}`
                  : `Ver galeria de fotos de ${servico.nome}`
              }
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors duration-150 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
            >
              {expandido ? "Ocultar fotos" : "Ver fotos"}
              <ChevronDown
                className={
                  "h-4 w-4 transition-transform duration-200" +
                  (expandido ? " rotate-180" : "")
                }
              />
            </button>
          ) : null}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expandido && temGaleria && servico.imagens ? (
          <motion.div
            key="galeria"
            id={`galeria-${servico.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="overflow-hidden border-t border-neutral-100"
          >
            <GaleriaCarrossel imagens={servico.imagens} nome={servico.nome} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

// ─── Sub-componente: painel de conteúdo da tab ────────────────────────────────────────────

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={
        isActive ? "grid grid-cols-1 gap-6 md:grid-cols-2" : "hidden"
      }
      data-tab-panel={id}
    >
      {servicos.map((servico) => (
        <ServicoCard key={servico.id} servico={servico} />
      ))}
    </motion.div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────────────────────────

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
      id="servicos"
      ref={secaoRef}
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Cabeçalho da seção */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-service-accent, #800000)" }}
        >
          O que fazemos
        </span>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
          Nossos Serviços
        </h2>
        <p className="mt-4 text-base text-neutral-600">
          Regularização completa de engenharia civil — AVCB, SPDA,
          Licenciamento Ambiental, Vigilância Sanitária e Projetos Técnicos
          com responsáveis técnicos que assinam as ARTs diretamente.
        </p>
      </div>

      {/* Barra de tabs */}
      <div className="mb-10 flex justify-center border-b border-neutral-200">
        {TABS.map((tab) => {
          const isActive = tab.id === tabAtiva;
          return (
            <button
              key={tab.id}
              type="button"
              aria-label={tab.ariaLabel}
              aria-pressed={isActive}
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
                "relative px-6 py-4 text-base font-semibold whitespace-nowrap",
                "border-b-2 -mb-px transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-1",
                isActive
                  ? ""
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

      {/* Painéis de conteúdo */}
      {TABS.map((tab) => (
        <TabPanel
          key={tab.id}
          id={tab.id}
          servicos={paineis[tab.id]}
          isActive={tab.id === tabAtiva}
          inView={inView}
        />
      ))}
    </section>
  );
}
