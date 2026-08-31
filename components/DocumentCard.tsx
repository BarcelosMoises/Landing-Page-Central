// components/DocumentCard.tsx
// Card visual de documento/norma — substitui o PlaceholderImage nos slots de imagem
// das subpáginas que ainda não têm foto real do portfólio.
//
// Regras (AGENTS.md → Placeholders temporários):
//   - Nunca stock photo. A alternativa permitida é o "card visual de documento/norma".
//   - Produção-ready: sem o atributo de placeholder (o gate de deploy exige zero ocorrências).
//   - Todo o conteúdo fica no DOM (SEO #5 e acessibilidade) — sem role="img".
//   - Tudo tintado pelo accent da categoria via var(--color-service-accent, #800000).

interface DocumentCardProps {
  /** Nome do documento entregue ao cliente, ex.: "AVCB / CLCB" */
  titulo: string
  /** Descrição curta do documento, ex.: "Auto de Vistoria do Corpo de Bombeiros" */
  descricao?: string
  /** Selo técnico do rodapé — reforça E-E-A-T (ART / CREA) */
  selo?: string
  className?: string
}

export function DocumentCard({
  titulo,
  descricao,
  selo = "ART — Responsável Técnico",
  className = "",
}: DocumentCardProps) {
  return (
    <div
      className={`aspect-video rounded-lg border relative overflow-hidden flex flex-col justify-between p-6 md:p-8 ${className}`}
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 12%, #1a0000)",
        borderColor: "color-mix(in srgb, var(--color-service-accent, #800000) 40%, transparent)",
      }}
    >
      {/* Malha de blueprint (decorativa) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-service-accent, #800000) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-service-accent, #800000) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Cabeçalho do documento */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <span
            className="w-9 h-9 rounded-md flex items-center justify-center border flex-shrink-0"
            style={{
              borderColor: "color-mix(in srgb, var(--color-service-accent, #800000) 55%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 18%, transparent)",
              color: "var(--color-service-accent)",
            }}
          >
            <IconeDocumento />
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] font-mono"
            style={{ color: "#e0c8c8" }}
          >
            Documento técnico
          </span>
        </div>

        <p className="font-heading font-bold text-white text-2xl md:text-3xl leading-tight">
          {titulo}
        </p>

        {descricao ? (
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#c4a8a8" }}>
            {descricao}
          </p>
        ) : null}
      </div>

      {/* Rodapé: selo ART + CREA */}
      <div
        className="relative z-10 flex items-center justify-between gap-4 pt-4 border-t"
        style={{
          borderColor: "color-mix(in srgb, var(--color-service-accent, #800000) 30%, transparent)",
        }}
      >
        <span className="text-xs font-mono tabular-nums" style={{ color: "#c4a8a8" }}>
          {selo}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider flex-shrink-0">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-service-accent)" }}
          />
          <span style={{ color: "var(--color-service-accent)" }}>CREA</span>
        </span>
      </div>
    </div>
  )
}

function IconeDocumento() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  )
}