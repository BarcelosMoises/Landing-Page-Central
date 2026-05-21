import Image from "next/image";
import { getTodosClientesLogos } from "@/data/servicos";

export interface OrgaoReguladorBadge {
  label: string;
  href: string;
  title: string;
}

const ORGAOS_REGULADORES: readonly OrgaoReguladorBadge[] = [
  { label: "CBMERJ \u00b7 RJ",   href: "https://www.cbmerj.rj.gov.br",                title: "Corpo de Bombeiros Militar do Estado do Rio de Janeiro" },
  { label: "CBPMESP \u00b7 SP",  href: "https://www.corpodebombeiros.sp.gov.br",      title: "Corpo de Bombeiros da Pol\u00edcia Militar do Estado de S\u00e3o Paulo" },
  { label: "CBMMG \u00b7 MG",    href: "https://www.bombeiros.mg.gov.br",             title: "Corpo de Bombeiros Militar de Minas Gerais" },
  { label: "CBMES \u00b7 ES",    href: "https://www.cbmes.es.gov.br",                 title: "Corpo de Bombeiros Militar do Esp\u00edrito Santo" },
  { label: "INEA \u00b7 RJ",     href: "https://inea.rj.gov.br",                      title: "Instituto Estadual do Ambiente do Rio de Janeiro" },
  { label: "ANVISA",        href: "https://www.gov.br/anvisa",                   title: "Ag\u00eancia Nacional de Vigil\u00e2ncia Sanit\u00e1ria" },
] as const;

// Tamanho base (default): 187x62px  — logos 1.png (Claro) e 6.png (IF)
// Tamanho large (+100%):  374x124px — todas as demais logos
// Gap: 12px
const LOGO_W_DEFAULT  = 187;
const LOGO_H_DEFAULT  = 62;
const LOGO_W_LARGE    = 374;
const LOGO_H_LARGE    = 124;
const LOGO_GAP_PX     = 12;
const VELOCIDADE_PX_S = 140;

export function TrustBar() {
  const todosLogos = getTodosClientesLogos();
  const logosSlider = [...todosLogos, ...todosLogos];

  // larguraBloco considera a largura real do contêiner de cada logo
  const larguraBloco = todosLogos.reduce((acc, cliente) => {
    const w = cliente.logoSize === "default" ? LOGO_W_DEFAULT : LOGO_W_LARGE;
    return acc + w + LOGO_GAP_PX;
  }, 0);

  const duracaoS = Math.round(larguraBloco / VELOCIDADE_PX_S);

  return (
    <section
      aria-label="Empresas e \u00f3rg\u00e3os reguladores parceiros da Central de Solu\u00e7\u00f5es"
      className="bg-neutral-50 border-y border-neutral-100 py-10 overflow-hidden"
    >
      {/* ── Faixa 1 — Marquee de logos ── */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-6">
          Empresas que confiam na Central de Solu\u00e7\u00f5es
        </p>

        <div className="overflow-hidden w-full">
          <ul
            className="trustbar-track flex items-center w-max"
            style={{
              "--marquee-duration": `${duracaoS}s`,
              gap: `${LOGO_GAP_PX}px`,
            } as React.CSSProperties}
            aria-label="Lista de logos de clientes"
          >
            {logosSlider.map((cliente, i) => {
              const isEcho = i >= todosLogos.length;
              const isLastOfFirstBlock = i === todosLogos.length - 1;
              const isDefault = cliente.logoSize === "default";
              const logoW = isDefault ? LOGO_W_DEFAULT : LOGO_W_LARGE;
              const logoH = isDefault ? LOGO_H_DEFAULT : LOGO_H_LARGE;

              return (
                <li
                  key={`${cliente.id}-${i}`}
                  className="list-none flex-shrink-0"
                  style={isLastOfFirstBlock ? { paddingRight: `${LOGO_GAP_PX}px` } : undefined}
                  aria-hidden={isEcho ? "true" : undefined}
                >
                  <div
                    style={{ width: logoW, height: logoH }}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={cliente.logoPath!}
                      alt={isEcho ? "" : `Logo de ${cliente.nome} \u2014 cliente da Central de Solu\u00e7\u00f5es`}
                      width={logoW}
                      height={logoH}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                      style={{ mixBlendMode: "darken" }}
                      loading="lazy"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Divisor ── */}
      <div
        aria-hidden="true"
        className="border-t border-neutral-100 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      />

      {/* ── Faixa 2 — \u00d3rg\u00e3os reguladores ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </section>
  );
}
