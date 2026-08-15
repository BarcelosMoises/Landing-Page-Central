// components/CtaFinal.tsx
// Seção CTA final das subpáginas de serviço ("Precisa de X?") — imediatamente acima do footer.
// Spec canônica: AGENTS.md → Componentes Compartilhados das Subpáginas · Task #35 (TASKS.md)
//
// Server Component puro — não adicionar "use client" (sem interatividade client-side).
//
// Regras de cor (não violar — drift identificado em Ago 2026, auditoria #34):
//   - Fundo TINGIDO pelo accent do serviço: color-mix 12% accent + #1a0000 — mesmo padrão
//     do Footer. Vinho #1a0000 puro só aparece na homepage (fallback #800000 ≈ vinho).
//     Nunca #0a0a0a, bg-black ou neutral-950 (#0a0a0a é exclusivo do hero)
//   - Subtítulo #c4a8a8 · ghost #e0c8c8 — nunca text-neutral-400 sobre este fundo
//   - Botão primário e border-top via var(--color-service-accent) — proibido hardcodar #800000
//   - <CrosshairDecor /> obrigatório (seção escura) — chamada sem props usa o padrão
//     (canto inferior direito), compatível com as duas APIs documentadas

import type React from "react"
import { CrosshairDecor } from "./CrosshairDecor"

interface CtaFinalProps {
  /** Ex.: "Precisa do Alvará Sanitário?" */
  titulo: string
  /** Ex.: "Fale com nossa equipe e receba um diagnóstico gratuito sobre as exigências..." */
  subtitulo: string
  /** URL completa do WhatsApp (wa.me) com mensagem pré-preenchida do serviço */
  whatsappUrl: string
  /** E-mail de contato exibido no botão ghost (vira mailto:) */
  email: string
}

export function CtaFinal({ titulo, subtitulo, whatsappUrl, email }: CtaFinalProps) {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="relative py-20 md:py-28 border-t-4"
      style={
        {
          backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 12%, #1a0000)",
          borderTopColor: "var(--color-service-accent, #800000)",
        } as React.CSSProperties
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-titulo"
          className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-6"
        >
          {titulo}
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#c4a8a8" }}>
          {subtitulo}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar diagnóstico gratuito pelo WhatsApp"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-base hover:opacity-90 active:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]"
            style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
          >
            Solicitar diagnóstico gratuito
          </a>
          <a
            href={`mailto:${email}`}
            aria-label={`Enviar e-mail para ${email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base border border-white/20 hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]"
            style={{ color: "#e0c8c8" }}
          >
            {email}
          </a>
        </div>
      </div>
      <CrosshairDecor />
    </section>
  )
}
