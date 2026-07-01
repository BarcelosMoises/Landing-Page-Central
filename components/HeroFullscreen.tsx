import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/data/servicos";

// ─── Tipos ────────────────────────────────────────────────────────────────────────────

export interface ItemServico {
  nome: string;
  descricao: string;
}

export interface HeroFullscreenProps {
  /** id da seção — deve coincidir com o item de nav correspondente */
  id: string;
  /** Categoria legível (H2) */
  titulo: string;
  /** Descrição da categoria */
  descricao: string;
  /** Caminho da imagem de fundo (deve estar em /public) */
  imagemFundo: string;
  /** Alt text descritivo da imagem (WCAG + SEO) */
  imagemAlt: string;
  /** Lista de serviços da categoria */
  itens: readonly ItemServico[];
  /** Texto do botão CTA */
  ctaTexto?: string;
  /** href do CTA — padrão: WhatsApp */
  ctaHref?: string;
  /**
   * true apenas para a primeira seção visível ao carregar:
   * ativa priority={true} e eager loading no next/image.
   */
  isPrimeiro?: boolean;
}

// ─── Componente ─────────────────────────────────────────────────────────────────────

export function HeroFullscreen({
  id,
  titulo,
  descricao,
  imagemFundo,
  imagemAlt,
  itens,
  ctaTexto = "Solicitar Orçamento",
  ctaHref,
  isPrimeiro = false,
}: HeroFullscreenProps) {
  const href =
    ctaHref ??
    getWhatsAppUrl(
      `Olá! Vim pelo site e tenho interesse em: ${titulo}. Gostaria de um orçamento.`
    );

  const isCTAExterno =
    href.startsWith("http") || href.startsWith("https") || href.startsWith("wa.");

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative min-h-screen flex flex-col justify-end motion-safe:snap-start"
    >
      {/* Imagem de fundo */}
      <Image
        src={imagemFundo}
        alt={imagemAlt}
        fill
        priority={isPrimeiro}
        loading={isPrimeiro ? "eager" : "lazy"}
        sizes="100vw"
        className="object-cover object-center"
        quality={85}
      />

      {/*
        Overlay duplo para contraste uniforme em todo o hero:
        1. Camada base fixa (bg-black/50) — garante piso de contraste mesmo onde
           elementos decorativos da imagem criam ruído visual (ícones, texturas).
        2. Gradiente direcional por cima — escurece progressivamente o rodapé
           onde fica o texto, mantendo o topo com mais presença da foto.
        Resultado: branco sobre fundo efetivo ≈ #1a1a1a → contraste > 12:1 (WCAG AAA).
      */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      />

      {/* Conteúdo */}
      <div className="relative z-10 container-site w-full pb-16 md:pb-24 pt-24">
        <div className="max-w-2xl">

          {/*
            text-shadow cirúrgico no h2: cria separação local entre título e
            fundo sem escurecer a imagem inteira — técnica de jornais digitais
            com fotos de fundo (NYT, Bloomberg).
            text-white sobre overlay efetivo → contraste > 7:1 ✓ WCAG AAA
          */}
          <h2
            id={`${id}-heading`}
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            className="font-heading text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            {titulo}
          </h2>

          {/* text-white/90 → contraste ≥ 4.5:1 mesmo sobre variações do fundo ✓ WCAG AA */}
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            {descricao}
          </p>

          {/* Lista de serviços da categoria */}
          <ul
            aria-label={`Serviços de ${titulo}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10"
          >
            {itens.map((item) => (
              <li
                key={item.nome}
                className="flex items-start gap-2 text-sm text-white/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#800000] flex-shrink-0"
                />
                <span>
                  <span className="font-semibold text-white">{item.nome}</span>
                  {item.descricao ? (
                    <> — {item.descricao}</>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          {isCTAExterno ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaTexto} — ${titulo}`}
              className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#4f0101] text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaTexto}
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link
              href={href}
              aria-label={`${ctaTexto} — ${titulo}`}
              className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#4f0101] text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaTexto}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
