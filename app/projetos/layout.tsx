import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina Projetos Técnicos
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: azul #1e40af — paleta Projetos Técnicos conforme briefing do cliente.
 * Hover: #1e3a8a
 */
export default function LayoutProjetos({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#1e40af",
        "--color-service-accent-hover": "#1e3a8a",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
