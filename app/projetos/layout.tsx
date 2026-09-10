import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da subpágina Projetos Técnicos
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço via CSS custom property.
 *
 * Cor: roxo #6b21a8 — paleta Projetos Técnicos.
 * Hover: #561a86
 *
 * HISTÓRICO: até Set 2026 esta rota usava o azul #1e40af/#1e3a8a, trocado com a
 * rota /regularizacao-prefeitura. Ao alterar aqui, sincronizar o seletor
 * [data-service="projetos"] em globals.css, AGENTS.md, docs/DESIGN.md e docs/TASKS.md.
 */
export default function LayoutProjetos({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#6b21a8",
        "--color-service-accent-hover": "#561a86",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  );
}
