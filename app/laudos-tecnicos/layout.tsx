import type React from "react"

/**
 * Layout da subpágina Laudos Técnicos
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço — pois vivem fora do <main>.
 *
 * Cor: dourado #92610a (extraído dos posts de Instagram da categoria)
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
    </div>
  )
}
