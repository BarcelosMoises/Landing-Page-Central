import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina AVCB / Corpo de Bombeiros
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: vermelho #800000 — paleta AVCB conforme briefing do cliente.
 * Hover: #4f0101
 *
 * Exceção de superfície (Ago 2026): esta rota mantém Footer e CtaFinal
 * na base vinho #1a0000 (20% accent), enquanto as demais subpáginas
 * usam a base neutra #0a0a0a alinhada à nav.
 */
export default function LayoutAvcb({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#800000",
        "--color-service-accent-hover": "#4f0101",
        "--color-service-footer-bg":
          "color-mix(in srgb, #800000 20%, #1a0000)",
        "--color-service-cta-bg":
          "color-mix(in srgb, #800000 20%, #1a0000)",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
