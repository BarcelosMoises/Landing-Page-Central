import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina Laudos Técnicos
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: dourado #92610a — paleta Laudos Técnicos.
 * Hover: #6e4908
 */
export default function LayoutLaudos({ children }: { children: React.ReactNode }) {
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
