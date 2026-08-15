// components/PlaceholderImage.tsx
// Placeholder temporário de imagem para slots ainda sem foto real — DEV-ONLY. Task #42 (TASKS.md)
//
// Regras (AGENTS.md → Placeholders temporários):
//   - data-todo="placeholder" obrigatório — o gate de deploy (task #48) exige zero ocorrências
//   - Fundo e borda seguem o accent da subpágina via CSS variable
//   - Substituição: foto real de /public/images/portfolio/; nunca stock photo
//   - Ciclo de vida: desenvolvimento → foto real → remoção antes do deploy

interface PlaceholderImageProps {
  /** Descrição do slot, ex.: "Escopo VISA — imagem 16:9" */
  label: string
  className?: string
}

export function PlaceholderImage({ label, className = "" }: PlaceholderImageProps) {
  return (
    <div
      data-todo="placeholder"
      role="img"
      aria-label={`Imagem pendente: ${label}`}
      className={`aspect-video rounded-lg border flex flex-col items-center justify-center gap-1.5 text-center px-6 ${className}`}
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-service-accent, #800000) 18%, #1a0000)",
        borderColor:
          "color-mix(in srgb, var(--color-service-accent, #800000) 45%, transparent)",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "#e0c8c8" }}
      >
        {label}
      </span>
      <span className="text-xs" style={{ color: "#c4a8a8" }}>
        Imagem 16:9 — substituir por foto real do portfólio antes do deploy
      </span>
    </div>
  )
}
