import type React from "react"

/**
 * Layout da subpágina Projetos Técnicos
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço — pois vivem fora do <main>.
 *
 * Cor: azul #1e40af (Tailwind blue-800) — paleta definida pelo cliente
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
    </div>
  )
}
