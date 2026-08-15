import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina SPDA / Para-raios
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: dourado #b7791f — paleta SPDA (tabela TASKS.md).
 * Hover: #8a5a12
 */
export default function LayoutSpda({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#b7791f",
        "--color-service-accent-hover": "#8a5a12",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
