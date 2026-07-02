// app/regularizacao-prefeitura/layout.tsx
// Layout da subpágina: Regularização junto à Prefeitura
// Server Component puro — sem "use client".
// Define --color-service-accent (azul marinho #1a3a6b) no <div> wrapper,
// garantindo que NavPrimaria e Footer também herdem a cor do serviço.

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
        "--color-service-accent": "#1a3a6b",
        "--color-service-accent-hover": "#122a50",
        "--color-service-accent-light": "#6b93d6",
      } as React.CSSProperties}
    >
      {children}
      <Footer />
    </div>
  )
}
