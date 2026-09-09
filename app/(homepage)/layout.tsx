import type React from "react";
import { Footer } from "@/components/Footer";

/**
 * Layout da homepage.
 *
 * Renderiza o <Footer /> com a paleta padrão da marca (vinho #800000).
 * Não define --color-service-accent: o Footer usa o fallback #800000
 * declarado em cada var(--color-service-accent, #800000).
 *
 * Criado para liberar o app/layout.tsx (root) de renderizar o Footer,
 * permitindo que cada subpágina de serviço gerencie seu próprio Footer
 * dentro do wrapper que define a CSS var de cor.
 */
export default function LayoutHomepage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          // Preserva o vinho (#1a0000) do formulário na homepage,
          // já que aqui não há CtaFinal acima para compartilhar a cor.
          "--color-service-cta-bg": "color-mix(in srgb, #800000 12%, #1a0000)",
        } as React.CSSProperties
      }
    >
      {children}
      <Footer />
    </div>
  );
}
