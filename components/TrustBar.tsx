import Image from "next/image";
import { getTodosClientesLogos } from "@/data/servicos";

// ─── Tipos exportados consumidos externamente ─────────────────────────────────

export interface OrgaoReguladorBadge {
  label: string;
  href: string;
  title: string;
}

// ─── Órgãos reguladores ──────────────────────────────────────────────────────

const ORGAOS_REGULADORES: readonly OrgaoReguladorBadge[] = [
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
// Slider implementado com CSS @keyframes (globals.css — trustbar-marquee).
// prefers-reduced-motion: pausa via media query CSS, sem JS.
// Logos exibidos em cor natural, sem grayscale nem opacidade reduzida.

export function TrustBar() {
  const todosLogos = getTodosClientesLogos();
  // Duplica para loop visual contínuo imperceptível.
  // Segunda metade: aria-hidden="true" — leitores de tela veem apenas a 1ª cópia.
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

        <div className="overflow-hidden">
          <ul
            className="flex items-center gap-12 w-max"
            style={{ animation: "trustbar-marquee 60s linear infinite" }}
            aria-label="Lista de logos de clientes"
          >
            {logosSlider.map((cliente, i) => (
              <li
                key={`${cliente.id}-${i}`}
                className="list-none flex-shrink-0"
                aria-hidden={i >= todosLogos.length ? "true" : undefined}
              >
                <Image
                  src={cliente.logoPath!}
                  alt={
                    i >= todosLogos.length
                      ? ""
                      : `Logo de ${cliente.nome} — cliente da Central de Soluções`
                  }
                  width={160}
                  height={40}
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
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
