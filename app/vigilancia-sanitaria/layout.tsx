import type React from "react"

/**
 * Layout da subpágina Vigilância Sanitária
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço — pois vivem fora do <main>.
 *
 * Cor: teal #0d7377 (extraído dos posts de Instagram da categoria)
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
    </div>
  )
}
