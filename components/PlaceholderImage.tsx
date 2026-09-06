// components/PlaceholderImage.tsx
// Placeholder temporário de imagem para slots ainda sem foto real — dev-only.
//
// Regras (AGENTS.md → Placeholders temporários):
//   - Marcação `data-todo="placeholder"` obrigatória + label descritivo do slot.
//   - Formato: aspect-video, rounded-lg, fundo #4f0101 (vinho escuro da marca — nunca vermelho puro).
//   - Ciclo de vida: criado em desenvolvimento → substituído por foto real → removido antes do deploy.
//   - Nunca stock photo. A alternativa permitida é o "card visual de documento/norma".

interface PlaceholderImageProps {
  /** Label descritivo do slot, ex.: "Galeria de Vigilância Sanitária — em breve" */
  label: string;
  className?: string;
}

export function PlaceholderImage({ label, className = "" }: PlaceholderImageProps) {
  return (
    <div
      data-todo="placeholder"
      className={`aspect-video rounded-lg border border-dashed flex items-center justify-center p-6 text-center ${className}`}
      style={{
        backgroundColor: "#4f0101",
        borderColor: "color-mix(in srgb, var(--color-service-accent, #800000) 40%, transparent)",
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-widest leading-relaxed"
        style={{ color: "#c4a8a8" }}
      >
        {label}
      </span>
    </div>
  );
}
