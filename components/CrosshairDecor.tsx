// components/CrosshairDecor.tsx
// SVG decorativo da retícula de engenharia — assinatura visual do cliente.
// Presente em todos os posts do Instagram da Central de Soluções.
// Usar em seções com fundo escuro (bg-neutral-900, bg-ink, hero).
// Nunca recolorir ou escalar manualmente — usar as props fornecidas.

import type { CSSProperties } from "react";

export type CrosshairCorner = "bottom-right" | "bottom-left" | "top-right" | "top-left";
export type CrosshairVariant = "light" | "dark";
export type CrosshairSize = "sm" | "md" | "lg";

interface CrosshairDecorProps {
  /** Canto onde o elemento é posicionado. Padrão: bottom-right */
  corner?: CrosshairCorner;
  /** light = para fundos escuros (branco/cinza claro); dark = para fundos claros (cinza escuro) */
  variant?: CrosshairVariant;
  /** Tamanho do SVG. sm=48, md=72, lg=96 */
  size?: CrosshairSize;
  className?: string;
}

const SIZE_MAP: Record<CrosshairSize, number> = {
  sm: 48,
  md: 72,
  lg: 96,
};

const VARIANT_COLOR: Record<CrosshairVariant, string> = {
  light: "rgba(255,255,255,0.18)",
  dark: "rgba(30,30,30,0.12)",
};

const CORNER_STYLE: Record<CrosshairCorner, CSSProperties> = {
  "bottom-right": { bottom: "1.5rem", right: "1.5rem" },
  "bottom-left":  { bottom: "1.5rem", left:  "1.5rem" },
  "top-right":    { top:    "1.5rem", right: "1.5rem" },
  "top-left":     { top:    "1.5rem", left:  "1.5rem" },
};

/**
 * Retícula de engenharia — elemento de assinatura visual da Central de Soluções.
 * A seção pai deve ter `position: relative` (ou `className="relative"`).
 *
 * @example
 * <section className="relative bg-neutral-900 py-24">
 *   <CrosshairDecor />
 *   ...
 * </section>
 *
 * @example subpágina com fundo claro
 * <CrosshairDecor variant="dark" corner="top-right" size="sm" />
 */
export function CrosshairDecor({
  corner = "bottom-right",
  variant = "light",
  size = "md",
  className = "",
}: CrosshairDecorProps) {
  const px = SIZE_MAP[size];
  const color = VARIANT_COLOR[variant];
  const posStyle = CORNER_STYLE[corner];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        userSelect: "none",
        ...posStyle,
      }}
      className={className}
    >
      {/* Círculo externo */}
      <circle cx="48" cy="48" r="44" stroke={color} strokeWidth="1.5" />

      {/* Círculo interno */}
      <circle cx="48" cy="48" r="8" stroke={color} strokeWidth="1.5" />

      {/* Linhas cruzadas — eixo horizontal */}
      <line x1="0"  y1="48" x2="38" y2="48" stroke={color} strokeWidth="1.5" />
      <line x1="58" y1="48" x2="96" y2="48" stroke={color} strokeWidth="1.5" />

      {/* Linhas cruzadas — eixo vertical */}
      <line x1="48" y1="0"  x2="48" y2="38" stroke={color} strokeWidth="1.5" />
      <line x1="48" y1="58" x2="48" y2="96" stroke={color} strokeWidth="1.5" />

      {/* Marcadores de canto — quadrantes */}
      <path d="M4 20 L4 4 L20 4"   stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M76 4 L92 4 L92 20" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M4 76 L4 92 L20 92" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M76 92 L92 92 L92 76" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Ponto central */}
      <circle cx="48" cy="48" r="2" fill={color} />
    </svg>
  );
}
