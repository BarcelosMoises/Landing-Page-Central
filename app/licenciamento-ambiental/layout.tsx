import type React from "react"

/**
 * Layout da subpágina Licenciamento Ambiental
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço — pois vivem fora do <main>.
 *
 * Cor: verde #2d6a2d (extraído dos posts de Instagram da categoria)
 */
export default function LayoutAmbiental({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#2d6a2d",
        "--color-service-accent-hover": "#1e4d1e",
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
