import Image from "next/image";
import { getTodosClientesLogos, getClientesDestaque } from "@/data/servicos";
import type { Cliente, OrgaoReguladorBadge } from "@/components/TrustBar";

// ─── Re-exporta tipos consumidos externamente ────────────────────────────────

export interface LogoItem {
  src: string;
  alt: string;
}

export interface OrgaoReguladorBadge {
  label: string;
  href: string;
  title: string;
}

// ─── Dimensões dos logos no slider ───────────────────────────────────────────
// Todos os PNGs têm a mesma altura. Largura max-content via object-contain.
// h-10 = 40 px — valor calibrado para logos B2B de empresas grandes.

const LOGO_HEIGHT_CLASS = "h-10";

// ─── Órgãos reguladores ──────────────────────────────────────────────────────

const ORGAOS_REGULADORES = [
  {
    label: "CBMERJ · RJ",
    href: "https://www.cbmerj.rj.gov.br",
    title: "Corpo de Bombeiros Militar do Estado do Rio de Janeiro",
  },
  {
    label: "CBPMESP · SP",
    href: "https://www.corpodebombeiros.sp.gov.br",
    title: "Corpo de Bombeiros da Polícia Militar do Estado de São Paulo",
  },
  {
    label: "CBMMG · MG",
    href: "https://www.bombeiros.mg.gov.br",
    title: "Corpo de Bombeiros Militar de Minas Gerais",
  },
  {
    label: "CBMES · ES",
    href: "https://www.cbmes.es.gov.br",
    title: "Corpo de Bombeiros Militar do Espírito Santo",
  },
  {
    label: "INEA · RJ",
    href: "https://inea.rj.gov.br",
    title: "Instituto Estadual do Ambiente do Rio de Janeiro",
  },
  {
    label: "ANVISA",
    href: "https://www.gov.br/anvisa",
    title: "Agência Nacional de Vigilância Sanitária",
  },
] as const;

// ─── Componente ──────────────────────────────────────────────────────────────
// Server Component — sem "use client", sem JS no cliente.
// O slider é implementado puramente com CSS @keyframes (globals.css).
// prefers-reduced-motion: pausa a animação via media query CSS — sem JS.

export function TrustBar() {
  const todosLogos = getTodosClientesLogos();
  // Duplica o array para criar o loop visual contínuo.
  // A segunda metade recebe aria-hidden="true" — leitores de tela veem apenas
  // a primeira cópia da lista, sem conteúdo repetido.
  const logosSlider = [...todosLogos, ...todosLogos];

  return (
    <section
      aria-label="Empresas e órgãos reguladores parceiros da Central de Soluções"
      className="bg-neutral-50 border-y border-neutral-100 py-10 overflow-hidden"
    >

      {/* ── Faixa 1 — Slider de logos ─────────────────────────────────────── */}
      <div className="mb-8">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-6"
          aria-label="Empresas que confiam na Central de Soluções"
        >
          Empresas que confiam na Central de Soluções
        </p>

        {/*
          overflow-hidden no pai mascara os logos fora da viewport.
          A ul tem largura max-content para todos os logos ficarem em linha.
          animation-duration calibrado em: nLogos × 3s = 20 × 3 = 60s.
          Ajuste via CSS custom property --slider-duration se necessário.
        */}
        <div
          className="overflow-hidden"
          aria-hidden="false"
        >
          <ul
            className="flex items-center gap-12 w-max"
            style={{
              animation: "trustbar-marquee 60s linear infinite",
            }}
            aria-label="Lista de logos de clientes"
          >
            {logosSlider.map((cliente, i) => (
              <li
                key={`${cliente.id}-${i}`}
                className="list-none flex-shrink-0"
                aria-hidden={i >= todosLogos.length ? "true" : undefined}
              >
                <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <Image
                    src={cliente.logoPath!}
                    alt={
                      i >= todosLogos.length
                        ? ""
                        : `Logo de ${cliente.nome} — cliente da Central de Soluções`
                    }
                    width={160}
                    height={40}
                    className={`${LOGO_HEIGHT_CLASS} w-auto object-contain`}
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Divisor ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="border-t border-neutral-100 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      />

      {/* ── Faixa 2 — Órgãos reguladores ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-4">
          Órgãos reguladores com os quais atuamos
        </p>

        <ul
          className="flex flex-wrap justify-center items-center gap-2 md:gap-3"
          aria-label="Órgãos reguladores parceiros"
        >
          {ORGAOS_REGULADORES.map((orgao) => (
            <li key={orgao.label} className="list-none">
              <a
                href={orgao.href}
                target="_blank"
                rel="noopener noreferrer"
                title={orgao.title}
                aria-label={`${orgao.title} — abre em nova aba`}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide bg-[#800000]/10 text-[#800000] hover:bg-[#800000]/20 px-2.5 py-1 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-1"
              >
                {orgao.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
