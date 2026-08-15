// app/regularizacao-prefeitura/layout.tsx
// Layout da subpágina: Regularização junto à Prefeitura
// Server Component puro — sem "use client".
// Define --color-service-accent (roxo #6b21a8) no <div> wrapper,
// garantindo que NavPrimaria e Footer também herdem a cor do serviço.
//
// COR: roxo #6b21a8 — paleta própria da rota (tabela TASKS.md / checklist
// da task #61). Decisão registrada na tarefa de pills; atualizar AGENTS.md e
// docs/DESIGN.md se a paleta mudar.

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
        "--color-service-accent": "#6b21a8",
        "--color-service-accent-hover": "#561a86",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  )
}
