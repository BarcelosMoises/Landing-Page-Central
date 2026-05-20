import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina SPDA / Para-raios
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: amarelo/dourado #92610a — paleta SPDA conforme briefing do cliente.
 * Hover: #6e4908
 */
export default function LayoutSpda({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#92610a",
        "--color-service-accent-hover": "#6e4908",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
