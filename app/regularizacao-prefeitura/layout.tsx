// app/regularizacao-prefeitura/layout.tsx
// Layout da subpágina: Regularização junto à Prefeitura
// Server Component puro — sem "use client".
// Define --color-service-accent (azul #1e40af) no <div> wrapper,
// garantindo que NavPrimaria e Footer também herdem a cor do serviço.
//
// COR: azul #1e40af — paleta própria da rota. Até Set 2026 esta rota usava o roxo
// #6b21a8/#561a86, trocado com a rota /projetos. Ao alterar aqui, sincronizar o
// seletor [data-service="prefeitura"] em globals.css, AGENTS.md, docs/DESIGN.md
// e docs/TASKS.md.

import type React from "react"
import { Footer } from "@/components/Footer"

export default function LayoutRegularizacaoPrefeitura({
  children,
}: {
  children: React.ReactNode
}) {
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
  )
}
