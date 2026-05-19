import type React from "react"

/**
 * Layout da subpágina Projetos Técnicos
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço — pois vivem fora do <main>.
 *
 * Cor: vinho #800000 (mesmo cluster visual do AVCB e da homepage)
 */
export default function LayoutProjetos({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#800000",
        "--color-service-accent-hover": "#4f0101",
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
