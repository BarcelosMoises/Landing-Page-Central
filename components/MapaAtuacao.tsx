import Link from "next/link";
import { MapPin, ShieldCheck, Leaf, Globe } from "lucide-react";
import { estadosAtuacao } from "@/data/servicos";

// ─── Tipos ──────────────────────────────────────────────────────────────────

// Slug de URL por estado (conforme docs/SEO.md)
const ESTADO_SLUG: Record<string, string> = {
  RJ: "rio-de-janeiro",
  SP: "sao-paulo",
  MG: "minas-gerais",
  ES: "espirito-santo",
};

// Label de concorrência de SEO (para uso interno / futuro)
const ESTADO_CONCORRENCIA: Record<string, string> = {
  RJ: "Alta",
  SP: "Muito Alta",
  MG: "Média",
  ES: "Baixa / Média",
};

// ─── Sub-componente: card de estado ─────────────────────────────────────────────

interface EstadoCardProps {
  sigla: string;
  nome: string;
  siglaCB: string;
  orgaoAmbiental: string;
}

function EstadoCard({ sigla, nome, siglaCB, orgaoAmbiental }: EstadoCardProps) {
  const slug = ESTADO_SLUG[sigla];

  return (
    <article
      aria-label={`Atendimento no estado de ${nome}`}
      className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
    >
      {/* Sigla + badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin
            className="w-4 h-4 text-[#800000] flex-shrink-0"
            aria-hidden="true"
          />
          <span className="font-heading text-2xl font-extrabold text-[#800000]">
            {sigla}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          Atendimento completo
        </span>
      </div>

      {/* Nome do estado */}
      <h3 className="font-heading text-lg font-bold text-neutral-900 leading-snug">
        {nome}
      </h3>

      {/* Metaórgãos */}
      <dl className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck
            className="w-3.5 h-3.5 text-[#800000] flex-shrink-0"
            aria-hidden="true"
          />
          <dt className="sr-only">Corpo de Bombeiros</dt>
          <dd className="text-neutral-700 font-medium">{siglaCB}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Leaf
            className="w-3.5 h-3.5 text-green-600 flex-shrink-0"
            aria-hidden="true"
          />
          <dt className="sr-only">Órgão ambiental</dt>
          <dd className="text-neutral-700 font-medium">{orgaoAmbiental}</dd>
        </div>
      </dl>

      {/* Link CTA */}
      {slug && (
        // TODO: atualizar para /avcb-corpo-de-bombeiros?estado=${slug} após Fase 6
        <Link
          href="/#servicos"
          aria-label={`Ver serviços de regularização de engenharia civil no ${nome}`}
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#800000] hover:text-[#4f0101] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:rounded"
        >
          Ver serviços no {sigla}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </article>
  );
}

// ─── Card do Brasil (cobertura nacional) ────────────────────────────────────────

function CardBrasil() {
  return (
    <article
      aria-label="SPDA e sistemas de segurança com cobertura nacional"
      // bg-[#800000] com texto branco: contraste 5.9:1 ✓ WCAG AA
      className="bg-[#800000] border border-[#4f0101] rounded-xl p-6 shadow-sm flex flex-col gap-4 col-span-1 md:col-span-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Lado esquerdo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Globe
              className="w-5 h-5 text-white/80"
              aria-hidden="true"
            />
            {/* #fff sobre #800000 → contraste 5.9:1 ✓ WCAG AA */}
            <span className="font-heading text-2xl font-extrabold text-white">
              Brasil
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide bg-white/20 text-white px-2.5 py-0.5 rounded-full">
              Cobertura Nacional
            </span>
          </div>
          <h3 className="font-heading text-lg md:text-xl font-bold text-white leading-snug">
            SPDA e Sistemas de Segurança: Todo o Brasil
          </h3>
          {/* text-white/80 sobre #800000 → contraste ~4.7:1 ✓ WCAG AA */}
          <p className="text-white/80 text-sm leading-relaxed max-w-xl">
            Projeto, laudo e instalação de SPDA (para-raios), aterramento
            elétrico e teste de continuidade conforme NBR 5419 e NR-10.
            Atendemos usinas fotovoltaicas, torres de telecom e subestações
            em qualquer estado brasileiro.
          </p>
        </div>

        {/* CTA */}
        // TODO: atualizar para /spda-para-raios após Fase 6
        <Link
          href="/#servicos"
          aria-label="Ver serviços de SPDA e sistemas de proteção em todo o Brasil"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#800000] hover:bg-neutral-100 font-semibold text-sm px-5 py-3 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#800000] self-start sm:self-center"
        >
          Ver serviços de SPDA
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function MapaAtuacao() {
  return (
    <section
      aria-labelledby="mapa-atuacao-heading"
      className="bg-neutral-50 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
            Área de atuação
          </p>
          {/* text-neutral-900 sobre bg-neutral-50: contraste 18.1:1 ✓ WCAG AAA */}
          <h2
            id="mapa-atuacao-heading"
            className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
          >
            Atuamos em Todo o Sudeste do Brasil
          </h2>
          {/* text-neutral-700 sobre bg-neutral-50: contraste 9.4:1 ✓ WCAG AAA */}
          <p className="text-neutral-700 text-lg leading-relaxed">
            ES, MG, RJ e SP — com atendimento nacional para SPDA e
            sistemas de segurança.
          </p>
        </div>

        {/* Grid: 4 estados + card Brasil */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          aria-label="Estados de atendimento da Central de Soluções"
        >
          {estadosAtuacao.map((estado) => (
            <li key={estado.sigla} className="list-none">
              <EstadoCard
                sigla={estado.sigla}
                nome={estado.nome}
                siglaCB={estado.siglaCB}
                orgaoAmbiental={estado.orgaoAmbiental}
              />
            </li>
          ))}

          {/* Card nacional — largura completa */}
          <li className="list-none col-span-1 sm:col-span-2 md:col-span-4">
            <CardBrasil />
          </li>
        </ul>

      </div>
    </section>
  );
}
