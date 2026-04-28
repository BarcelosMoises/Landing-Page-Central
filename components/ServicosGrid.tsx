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
        .join(" \u00b7 ");

  return (
    <article
      aria-label={`Serviço: ${servico.nomeAbreviado}`}
      className="bg-white border border-neutral-100 border-l-4 border-l-[#800000] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-4"
    >
      {/* Ícone */}
      <div
        className="w-10 h-10 bg-[#800000]/10 rounded-lg flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <Icon className="w-5 h-5 text-[#800000]" aria-hidden="true" />
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

      {/* Badge de cobertura por estado */}
      <div className="flex flex-wrap gap-1.5 mt-auto" aria-label="Estados de atendimento">
        <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-[#800000]/10 text-[#800000] px-2.5 py-1 rounded-full">
          {estadosLabel}
        </span>
        {servico.coberturaNacional && (
          <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
            Cobertura nacional
          </span>
        )}
      </div>
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function ServicosGrid() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho da seção */}
        <div className="max-w-2xl mb-12">
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
        </div>

        {/* Grid de cards */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          aria-label="Lista de serviços da Central de Soluções"
        >
          {servicos.map((servico) => (
            <li key={servico.id} className="list-none">
              <ServicoCard servico={servico} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
