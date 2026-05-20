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

// ─── Cálculo da duração do marquee ────────────────────────────────────────────────────────
//
// Velocidade-alvo: 90px/s (ritmo confortável para leitura de logos).
// logo_width_media: 120px | gap entre logos: 64px (gap-16)
// largura_bloco = n_logos × (logo_width + gap)
// duracao = largura_bloco / velocidade
//
// Com 20 logos: 20 × (120 + 64) = 3.680px / 90 ≈ 41s → arredondado para 41s.
//
// Se adicionar/remover logos, atualizar LOGO_WIDTH_MEDIA ou
// n_logos será recalculado automaticamente pelo comprimento do array.

const LOGO_WIDTH_MEDIA_PX = 120; // largura média estimada de cada logo
const LOGO_GAP_PX         = 64;  // gap-16 = 4rem = 64px
const VELOCIDADE_PX_S     = 90;  // px por segundo

// ─── Componente ────────────────────────────────────────────────────────────────────────────────
// Server Component — sem "use client", sem JS no cliente.
// Marquee via CSS @keyframes (globals.css — .trustbar-track).
// prefers-reduced-motion: pausa via media query CSS.
// mix-blend-mode: darken remove fundo branco/claro dos PNGs em qualquer
// fundo neutro claro (mais robusto que multiply para fundos não-brancos puros).

export function TrustBar() {
  const todosLogos = getTodosClientesLogos();

  // Duplica a lista para o loop contínuo.
  // O ponto de juntura (ultimo item do bloco 1 → primeiro do bloco 2)
  // é visualmente idêntico ao intervalo entre quaisquer dois logos consecutivos
  // porque o padding-right no ultimo item do bloco 1 vale exatamente 1 gap.
  const logosSlider = [...todosLogos, ...todosLogos];

  // Duracão calculada no servidor: escala automaticamente se logos forem adicionados.
  const larguraBloco = todosLogos.length * (LOGO_WIDTH_MEDIA_PX + LOGO_GAP_PX);
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

        {/* overflow-hidden recorta a faixa; w-full garante que não haja scroll horizontal */}
        <div className="overflow-hidden w-full">
          {/*
            trustbar-track: classe CSS que aplica a animação (globals.css)
            --marquee-duration: calculado no servidor e injetado como CSS var
            gap-16 = 64px entre logos (coerente com LOGO_GAP_PX acima)
          */}
          <ul
            className="trustbar-track flex items-center gap-16 w-max"
            style={{ "--marquee-duration": `${duracaoS}s` } as React.CSSProperties}
            aria-label="Lista de logos de clientes"
          >
            {logosSlider.map((cliente, i) => {
              const isEcho = i >= todosLogos.length;
              // Ultimo item do bloco 1: padding-right fecha a junta do loop.
              // O valor é 1 gap (64px) para que a distância entre o último logo
              // do bloco 1 e o primeiro logo do bloco 2 seja identica ao gap
              // entre quaisquer outros dois logos consecutivos.
              const isLastOfFirstBlock = i === todosLogos.length - 1;

              return (
                <li
                  key={`${cliente.id}-${i}`}
                  className="list-none flex-shrink-0"
                  style={isLastOfFirstBlock ? { paddingRight: `${LOGO_GAP_PX}px` } : undefined}
                  aria-hidden={isEcho ? "true" : undefined}
                >
                  <Image
                    src={cliente.logoPath!}
                    alt={
                      isEcho
                        ? ""
                        : `Logo de ${cliente.nome} — cliente da Central de Soluções`
                    }
                    width={160}
                    height={56}
                    className="h-14 w-auto object-contain"
                    style={{ mixBlendMode: "darken" }}
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Divisor ───────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="border-t border-neutral-100 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      />

      {/* ── Faixa 2 — Órgãos reguladores ───────────────────────────────────── */}
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
