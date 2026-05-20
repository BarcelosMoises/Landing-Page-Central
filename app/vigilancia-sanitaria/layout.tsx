import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina Vigilância Sanitária
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: teal/ciano #0d7377 — paleta Vigilância Sanitária conforme briefing do cliente.
 * Hover: #095e62
 */
export default function LayoutVigilancia({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#0d7377",
        "--color-service-accent-hover": "#095e62",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
