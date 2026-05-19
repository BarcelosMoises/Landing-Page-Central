import type React from "react"

/**
 * Layout da subpágina AVCB / Corpo de Bombeiros
 *
 * Define --color-service-accent no <div> wrapper para que NavPrimaria
 * e Footer herdem a cor do serviço — pois vivem fora do <main>.
 *
 * Cor: vinho #800000 (mesmo cluster visual da homepage e projetos)
 */
export default function LayoutAvcb({ children }: { children: React.ReactNode }) {
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
