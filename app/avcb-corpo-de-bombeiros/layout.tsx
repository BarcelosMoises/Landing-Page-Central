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
 */
export default function LayoutAvcb({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#800000",
        "--color-service-accent-hover": "#4f0101",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
