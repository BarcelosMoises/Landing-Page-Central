import Image from "next/image";
import { getTodosClientesLogos } from "@/data/servicos";

export interface OrgaoReguladorBadge {
  label: string;
  href: string;
  title: string;
}

const ORGAOS_REGULADORES: readonly OrgaoReguladorBadge[] = [
  { label: "CORPO DE BOMBEIROS", href: "#", title: "Corpos de Bombeiros estaduais" },
  { label: "VIGILÂNCIA SANITÁRIA", href: "#", title: "Órgãos de Vigilância Sanitária" },
  { label: "PREFEITURAS", href: "#", title: "Prefeituras municipais" },
  { label: "ÓRGÃOS AMBIENTAIS", href: "#", title: "Órgãos ambientais licenciadores" },
] as const;

// Tamanho default (+50% vs base 187x62): 281x93px  — logo 1.png (Claro)
// Tamanho medium  (+30% vs base 187x62): 243x81px  — logo 6.png (IF)
// Tamanho large  (+100% vs base 187x62): 374x124px — todas as demais logos
// Gap: 12px
const LOGO_W_DEFAULT  = 281;
const LOGO_H_DEFAULT  = 93;
const LOGO_W_MEDIUM   = 243;
const LOGO_H_MEDIUM   = 81;
const LOGO_W_LARGE    = 374;
const LOGO_H_LARGE    = 124;
const LOGO_GAP_PX     = 12;
const VELOCIDADE_PX_S = 140;

export function TrustBar() {
  const todosLogos = getTodosClientesLogos();
  const logosSlider = [...todosLogos, ...todosLogos];

  // larguraBloco considera a largura real do contêiner de cada logo
  const larguraBloco = todosLogos.reduce((acc, cliente) => {
    const w =
      cliente.logoSize === "default" ? LOGO_W_DEFAULT
      : cliente.logoSize === "medium"  ? LOGO_W_MEDIUM
      : LOGO_W_LARGE;
    return acc + w + LOGO_GAP_PX;
  }, 0);

  const duracaoS = Math.round(larguraBloco / VELOCIDADE_PX_S);

  return (
    <section
      aria-label="Empresas e órgãos reguladores parceiros da Central de Soluções"
      className="bg-neutral-50 border-y border-neutral-100 py-10 overflow-hidden"
    >
      {/* ── Faixa 1 — Marquee de logos ── */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-6">
          Empresas que confiam na Central de Soluções
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
              const logoW =
                cliente.logoSize === "default" ? LOGO_W_DEFAULT
                : cliente.logoSize === "medium"  ? LOGO_W_MEDIUM
                : LOGO_W_LARGE;
              const logoH =
                cliente.logoSize === "default" ? LOGO_H_DEFAULT
                : cliente.logoSize === "medium"  ? LOGO_H_MEDIUM
                : LOGO_H_LARGE;

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
                      alt={isEcho ? "" : `Logo de ${cliente.nome} — cliente da Central de Soluções`}
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

      {/* ── Faixa 2 — Órgãos reguladores ── */}
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
