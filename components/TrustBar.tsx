import Image from "next/image";
import { getClientesDestaque } from "@/data/servicos";

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface LogoItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface OrgaoReguladorBadge {
  label: string;
  href: string;
  title: string;
}

// ─── Dimensões de exibição dos logos por id de cliente ───────────────────────────

const LOGO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  claro:         { width: 96,  height: 32 },
  embratel:      { width: 112, height: 32 },
  ambev:         { width: 88,  height: 32 },
  "mercado-livre": { width: 128, height: 32 },
  brasol:        { width: 96,  height: 32 },
};

const DEFAULT_DIMENSIONS = { width: 96, height: 32 };

// ─── Órgãos reguladores ────────────────────────────────────────────────────────

const ORGAOS_REGULADORES: readonly OrgaoReguladorBadge[] = [
  {
    label: "CBMERJ \u00b7 RJ",
    href: "https://www.cbmerj.rj.gov.br",
    title: "Corpo de Bombeiros Militar do Estado do Rio de Janeiro",
  },
  {
    label: "CBPMESP \u00b7 SP",
    href: "https://www.corpodebombeiros.sp.gov.br",
    title: "Corpo de Bombeiros da Pol\u00edcia Militar do Estado de S\u00e3o Paulo",
  },
  {
    label: "CBMMG \u00b7 MG",
    href: "https://www.bombeiros.mg.gov.br",
    title: "Corpo de Bombeiros Militar de Minas Gerais",
  },
  {
    label: "CBMES \u00b7 ES",
    href: "https://www.cbmes.es.gov.br",
    title: "Corpo de Bombeiros Militar do Esp\u00edrito Santo",
  },
  {
    label: "INEA \u00b7 RJ",
    href: "https://inea.rj.gov.br",
    title: "Instituto Estadual do Ambiente do Rio de Janeiro",
  },
  {
    label: "ANVISA",
    href: "https://www.gov.br/anvisa",
    title: "Ag\u00eancia Nacional de Vigil\u00e2ncia Sanit\u00e1ria",
  },
] as const;

// ─── Componente ─────────────────────────────────────────────────────────────────────

export function TrustBar() {
  const clientesDestaque = getClientesDestaque();

  const logos: LogoItem[] = clientesDestaque.map((cliente) => {
    const dims = LOGO_DIMENSIONS[cliente.id] ?? DEFAULT_DIMENSIONS;
    return {
      src: cliente.logoPath,
      alt: `Logo de ${cliente.nome} \u2014 ${cliente.segmento}, cliente da Central de Solu\u00e7\u00f5es`,
      width: dims.width,
      height: dims.height,
    };
  });

  return (
    <section
      aria-label="Empresas e \u00f3rg\u00e3os reguladores parceiros da Central de Solu\u00e7\u00f5es"
      className="bg-neutral-50 border-y border-neutral-100 py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Faixa 1 \u2014 Logos de clientes */}
        <div className="mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-6"
            aria-label="Empresas que confiam na Central de Solu\u00e7\u00f5es"
          >
            Empresas que confiam na Central de Solu\u00e7\u00f5es
          </p>

          <ul
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            aria-label="Lista de clientes"
          >
            {logos.map((logo) => (
              <li key={logo.src} className="list-none">
                <div
                  className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain h-8"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Divisor */}
        <div aria-hidden="true" className="border-t border-neutral-100 mb-8" />

        {/* Faixa 2 \u2014 \u00d3rg\u00e3os reguladores */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-4">
            \u00d3rg\u00e3os reguladores com os quais atuamos
          </p>

          <ul
            className="flex flex-wrap justify-center items-center gap-2 md:gap-3"
            aria-label="\u00d3rg\u00e3os reguladores parceiros"
          >
            {ORGAOS_REGULADORES.map((orgao) => (
              <li key={orgao.label} className="list-none">
                <a
                  href={orgao.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={orgao.title}
                  aria-label={`${orgao.title} \u2014 abre em nova aba`}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide bg-[#800000]/10 text-[#800000] hover:bg-[#800000]/20 px-2.5 py-1 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-1"
                >
                  {orgao.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
