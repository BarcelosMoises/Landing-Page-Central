// app/regularizacao-prefeitura/layout.tsx
// Layout da subpágina: Regularização junto à Prefeitura
// Server Component puro — sem "use client".
// Define --color-service-accent (vinho #800000) no <div> wrapper,
// garantindo que NavPrimaria e Footer também herdem a cor do serviço.
//
// COR: vinho #800000 — família Legalização (mesma do AVCB). Decisão registrada
// em AGENTS.md → Mapa de cores e TASKS.md #56 (provisória, aguardando cliente).

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
        "--color-service-accent": "#800000",
        "--color-service-accent-hover": "#4f0101",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  )
}
