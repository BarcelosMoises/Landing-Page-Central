// components/CtaFinal.tsx
// Superfície final derivada exclusivamente dos tokens da subpágina.
// Server Component puro; não adicionar "use client".

import type React from "react"
import { CrosshairDecor } from "./CrosshairDecor"

interface CtaFinalProps {
  titulo: string
  subtitulo: string
  whatsappUrl: string
  email: string
}

export function CtaFinal({ titulo, subtitulo, whatsappUrl, email }: CtaFinalProps) {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="relative py-20 md:py-28 border-t-4"
      style={
        {
          backgroundColor: "var(--color-service-surface, #0a0a0a)",
          borderTopColor: "var(--color-service-accent, #800000)",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: "var(--color-service-accent, #800000)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta-titulo" className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-6">
          {titulo}
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#e0c8c8" }}>
          {subtitulo}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar diagnóstico gratuito pelo WhatsApp"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-base hover:opacity-90 active:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
          >
            Solicitar diagnóstico gratuito
          </a>
          <a
            href={`mailto:${email}`}
            aria-label={`Enviar e-mail para ${email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-base border border-white/30 hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            style={{ color: "#ffffff" }}
          >
            {email}
          </a>
        </div>
      </div>
      <CrosshairDecor />
    </section>
  )
}
