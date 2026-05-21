import Image from "next/image";
import { getTodosClientesLogos } from "@/data/servicos";

// ─── Tipos exportados consumidos externamente ─────────────────────────────────────────

export interface OrgaoReguladorBadge {
  label: string;
  href: string;
  title: string;
}

// ─── Órgãos reguladores ───────────────────────────────────────────────────────────────────

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

// ─── Constantes do marquee ─────────────────────────────────────────────────────────────────
//
// LOGO_CONTAINER_W: largura do container fixo de cada logo (w-36 = 144px).
// LOGO_CONTAINER_H: altura do container fixo de cada logo (h-12 = 48px).
// Cada logo preenche o container com object-contain, garantindo área visual
// idêntica independente da proporção original do arquivo PNG.
//
// Velocidade-alvo: 90px/s.
// largura_bloco = n_logos × (LOGO_CONTAINER_W + LOGO_GAP_PX)
// duracao = largura_bloco / VELOCIDADE_PX_S
//
// Se adicionar/remover logos, a duração se recalcula automaticamente
// pelo comprimento do array em getTodosClientesLogos().

const LOGO_CONTAINER_W  = 144; // w-36 = 144px
const LOGO_CONTAINER_H  = 48;  // h-12 = 48px
const LOGO_GAP_PX       = 64;  // gap-16 = 4rem = 64px
const VELOCIDADE_PX_S   = 90;  // px por segundo

// ─── Componente ─────────────────────────────────────────────────────────────────────────────
// Server Component — sem "use client", sem JS no cliente.
// Marquee via CSS @keyframes (globals.css — .trustbar-track).
// prefers-reduced-motion: pausa via media query CSS.
//
// DESIGN.md (tabela Animações por Elemento):
//   Logos TrustBar → grayscale(1)→grayscale(0) + opacity 0.5→1 em 250ms ease.
//   Implementado via classes Tailwind no container de cada logo.
//
// mix-blend-mode: darken no <Image> remove halos residuais de PNGs que
// ainda tenham fundo claro (mais robusto que multiply em bg-neutral-50).

export function TrustBar() {
  const todosLogos = getTodosClientesLogos();

  // Duplica a lista para o loop contínuo.
  // Ponto de juntura: padding-right no último item do bloco 1 = 1 gap (64px),
  // tornando a distância entre o último e o primeiro logo idêntica aos demais.
  const logosSlider = [...todosLogos, ...todosLogos];

  // Duração calculada no servidor — escala automaticamente com o nº de logos.
  const larguraBloco = todosLogos.length * (LOGO_CONTAINER_W + LOGO_GAP_PX);
  const duracaoS = Math.round(larguraBloco / VELOCIDADE_PX_S);

  return (
    <section
      aria-label="Empresas e órgãos reguladores parceiros da Central de Soluções"
      className="bg-neutral-50 border-y border-neutral-100 py-10 overflow-hidden"
    >

      {/* ── Faixa 1 — Marquee de logos ─────────────────────────────────── */}
      <div className="mb-8">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-6"
          aria-label="Empresas que confiam na Central de Soluções"
        >
          Empresas que confiam na Central de Soluções
        </p>

        <div className="overflow-hidden w-full">
          <ul
            className="trustbar-track flex items-center gap-16 w-max"
            style={{ "--marquee-duration": `${duracaoS}s` } as React.CSSProperties}
            aria-label="Lista de logos de clientes"
          >
            {logosSlider.map((cliente, i) => {
              const isEcho = i >= todosLogos.length;
              const isLastOfFirstBlock = i === todosLogos.length - 1;

              return (
                <li
                  key={`${cliente.id}-${i}`}
                  className="list-none flex-shrink-0"
                  style={isLastOfFirstBlock ? { paddingRight: `${LOGO_GAP_PX}px` } : undefined}
                  aria-hidden={isEcho ? "true" : undefined}
                >
                  {/*
                    Container fixo: w-36 h-12 (144×48px).
                    Toda logo — circular, quadrada, horizontal — ocupa exatamente
                    a mesma área visual, eliminando a inconsistência de tamanhos.

                    grayscale + opacity-50: estado de repouso (DESIGN.md).
                    hover:grayscale-0 + hover:opacity-100: estado ativo (250ms ease).
                    transition aplicada no container para capturar o hover na área
                    inteira do box, não apenas nos pixels da imagem.
                  */}
                  <div
                    className="w-36 h-12 flex items-center justify-center
                               grayscale opacity-50
                               hover:grayscale-0 hover:opacity-100
                               transition-all duration-[250ms] ease-[ease]"
                  >
                    <Image
                      src={cliente.logoPath!}
                      alt={
                        isEcho
                          ? ""
                          : `Logo de ${cliente.nome} — cliente da Central de Soluções`
                      }
                      width={LOGO_CONTAINER_W}
                      height={LOGO_CONTAINER_H}
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
