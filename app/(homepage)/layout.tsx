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
    <>
      {children}
      <Footer />
    </>
  );
}
