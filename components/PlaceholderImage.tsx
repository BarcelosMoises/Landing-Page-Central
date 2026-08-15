// components/PlaceholderImage.tsx
// Placeholder temporário de imagem para slots ainda sem foto real — DEV-ONLY. Task #42 (TASKS.md)
//
// Regras (AGENTS.md → Placeholders temporários):
//   - data-todo="placeholder" obrigatório — o gate de deploy (task #48) exige zero ocorrências:
//       grep -rn 'data-todo="placeholder"' app components
//   - Fundo #4f0101 (vinho escuro da marca) — nunca vermelho puro
//   - Substituição: foto real de /public/images/portfolio/ (mapeamento em docs/DESIGN.md);
//     se não houver foto adequada, usar card visual de documento/norma — nunca stock photo
//   - Ciclo de vida: criado em desenvolvimento → substituído por foto real → removido antes do deploy

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
      className={`aspect-video rounded-lg bg-[#4f0101] border border-white/10 flex flex-col items-center justify-center gap-1.5 text-center px-6 ${className}`}
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
