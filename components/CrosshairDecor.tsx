/**
 * CrosshairDecor
 * ---------------
 * SVG decorativo inline que replica a retícula de engenharia (crosshair)
 * presente no canto inferior direito de todos os posts de Instagram do cliente.
 *
 * Função: assinatura visual técnica — conecta o site ao material já reconhecido
 * pelo público-alvo da Central de Soluções.
 *
 * USO:
 *   Inserir em qualquer <section className="relative"> com fundo escuro.
 *   Em fundos claros, usar variant="dark".
 *
 * EXEMPLOS:
 *   <CrosshairDecor />                        // padrão: canto inferior direito, fundo escuro
 *   <CrosshairDecor corner="bottom-left" />   // canto inferior esquerdo
 *   <CrosshairDecor variant="dark" size="sm"/> // fundo claro, tamanho pequeno
 */

import { cn } from "@/lib/utils";

type Corner = "bottom-right" | "bottom-left" | "top-right" | "top-left";
type Variant = "light" | "dark"; // light = sobre fundo escuro (branco), dark = sobre fundo claro (preto)
type Size = "sm" | "md" | "lg";

interface CrosshairDecorProps {
  corner?: Corner;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const cornerClasses: Record<Corner, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

const sizeClasses: Record<Size, string> = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

/** Opacidade por variante:
 *  - light (sobre fundo escuro): branco a 8% — sutil mas presente
 *  - dark  (sobre fundo claro):  preto a 6% — ainda mais discreto
 */
const variantClasses: Record<Variant, string> = {
  light: "text-white opacity-[0.08]",
  dark: "text-neutral-900 opacity-[0.06]",
};

export function CrosshairDecor({
  corner = "bottom-right",
  variant = "light",
  size = "md",
  className,
}: CrosshairDecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute pointer-events-none select-none",
        cornerClasses[corner],
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Grade de linhas horizontais */}
      <line x1="0" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="0.75" />

      {/* Grade de linhas verticais */}
      <line x1="20" y1="0" x2="20" y2="80" stroke="currentColor" strokeWidth="0.75" />
      <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" strokeWidth="0.75" />
      <line x1="60" y1="0" x2="60" y2="80" stroke="currentColor" strokeWidth="0.75" />

      {/* Ponto de cruzamento central — miolo do crosshair */}
      <circle cx="40" cy="40" r="2" fill="currentColor" />

      {/* Anel externo do crosshair */}
      <circle
        cx="40"
        cy="40"
        r="7"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Marcações de tick nos eixos — detalhe técnico */}
      <line x1="37" y1="40" x2="33" y2="40" stroke="currentColor" strokeWidth="0.75" />
      <line x1="43" y1="40" x2="47" y2="40" stroke="currentColor" strokeWidth="0.75" />
      <line x1="40" y1="37" x2="40" y2="33" stroke="currentColor" strokeWidth="0.75" />
      <line x1="40" y1="43" x2="40" y2="47" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
