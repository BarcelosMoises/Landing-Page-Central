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
          {/* text-white/70 sobre bg-[#800000]/30 em bg-[#111827] → contraste adequado para ícone decorativo */}
          <Icon className="w-4 h-4 text-white/70" aria-hidden="true" />
        </div>
        {/* text-white = #fff sobre #111827 → contraste 15.3:1 ✓ WCAG AAA */}
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
          {/* text-neutral-400 = #9ca3af sobre #111827 → contraste 7.0:1 ✓ WCAG AA */}
          {servicosDemandados
            .map((s) => s.nomeAbreviado)
            .join(" \u00b7 ")}
        </p>
      )}
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function SetoresAtendidos() {
  return (
    <section
      aria-labelledby="setores-heading"
      className="bg-[#111827] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="max-w-2xl mb-12">
          {/* text-white/70 sobre bg-[#111827] → contraste ~10.7:1 ✓ WCAG AAA */}
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
            Segmentos de atuação
          </p>
          {/* text-white sobre bg-[#111827] → contraste 15.3:1 ✓ WCAG AAA */}
          <h2
            id="setores-heading"
            className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight mb-4"
          >
            Atendemos Todos os Segmentos
          </h2>
          {/* text-neutral-400 (#9ca3af) sobre bg-[#111827] → contraste 7.0:1 ✓ WCAG AA */}
          <p className="text-neutral-400 text-lg leading-relaxed">
            Indústria, energia, telecom, agronegócio e muito mais — cada
            segmento tem exigências próprias e a Central de Soluções conhece
            cada uma delas.
          </p>
        </div>

        {/* Grid de setores */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          aria-label="Setores industriais e comerciais atendidos"
        >
          {setores.map((setor) => (
            <li key={setor.id} className="list-none">
              <SetorCard setorId={setor.id} nome={setor.nome} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
