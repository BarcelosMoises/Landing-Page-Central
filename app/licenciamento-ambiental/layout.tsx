import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina Licenciamento Ambiental
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: verde #2d6a2d — paleta Licenciamento Ambiental conforme briefing do cliente.
 * Hover: #1e4d1e
 */
export default function LayoutAmbiental({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#2d6a2d",
        "--color-service-accent-hover": "#1e4d1e",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
