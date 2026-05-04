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
      // scroll-snap-align: start — cada seção ocupa a viewport inteira
      // motion-safe garante que scroll-snap só aplica se prefers-reduced-motion: no-preference
      className="relative min-h-screen flex flex-col justify-end motion-safe:snap-start"
    >
      {/* Imagem de fundo */}
      <Image
        src={imagemFundo}
        alt={imagemAlt}
        fill
        // Apenas a primeira seção carrega com priority; demais são lazy
        priority={isPrimeiro}
        loading={isPrimeiro ? "eager" : "lazy"}
        sizes="100vw"
        className="object-cover object-center"
        // Qualidade 85 preserva fidelidade visual sem aumentar LCP
        quality={85}
      />

      {/* Overlay gradiente — fundo para legibilidade WCAG */}
      {/*
        Gradiente de baixo para cima:
        - 60% cobertura no rodapé onde fica o texto
        - Transição suave para transparente no topo
        O texto branco sobre #000 com 60% de opacidade = contraste > 7:1 ✓ AAA
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"
      />

      {/* Conteúdo — usa .container-site para padding e max-width consistentes com o projeto */}
      <div className="relative z-10 container-site w-full pb-16 md:pb-24 pt-24">
        <div className="max-w-2xl">

          {/* H2 da categoria */}
          {/* text-white sobre overlay black/75 → contraste > 7:1 ✓ WCAG AAA */}
          <h2
            id={`${id}-heading`}
            className="font-heading text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            {titulo}
          </h2>

          <p className="text-white/85 text-lg leading-relaxed mb-8">
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
                className="flex items-start gap-2 text-sm text-white/80"
              >
                {/* Bullet estilizado — sem ícone importado para manter bundle mínimo */}
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
