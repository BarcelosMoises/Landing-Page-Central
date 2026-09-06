/**
 * GaleriaBento — galeria estática em bento grid para o topo dos cards de serviço.
 *
 * Server-compatible (sem estado, sem interação, sem client-only libs): renderiza
 * sempre a mesma composição — 1 foto grande à esquerda + 2 fotos empilhadas à
 * direita — replicando o padrão visual aprovado pelo cliente.
 *
 * Quando o serviço ainda não possui fotos reais (`imagens` vazio/ausente),
 * renderiza um preenchimento visual on-brand (ícone do serviço sobre fundo
 * tintado), nunca um estado de "TODO"/"Em breve"/PlaceholderImage.
 */
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import type { ImagemServico } from "@/data/servicos";

interface GaleriaBentoProps {
  /** Fotos reais do serviço. Vazio/ausente → usa preenchimento com ícone. */
  imagens: readonly ImagemServico[];
  /** Ícone do serviço (mesmo usado no cabeçalho do card), para o fallback. */
  icon: LucideIcon;
  /** Nome do serviço, usado apenas no aria-label do grupo de imagens reais. */
  nome: string;
}

function TileIcone({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-red-50">
      <Icon
        className="h-8 w-8"
        style={{ color: "var(--color-service-accent, #800000)" }}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}

export function GaleriaBento({ imagens, icon, nome }: GaleriaBentoProps) {
  const temFotos = imagens.length > 0;
  const destaque = temFotos ? imagens.find((img) => img.destaque) ?? imagens[0] : null;
  const outras = temFotos ? imagens.filter((img) => img !== destaque) : [];
  const secundarias: (ImagemServico | null)[] = temFotos
    ? [outras[0] ?? null, outras[1] ?? null]
    : [null, null];

  return (
    <div
      className="grid h-48 grid-cols-[1.6fr_1fr] gap-1.5 overflow-hidden rounded-t-2xl sm:h-56"
      role="group"
      aria-label={temFotos ? `Galeria de fotos: ${nome}` : undefined}
    >
      <div className="relative overflow-hidden rounded-lg">
        {destaque ? (
          <Image
            src={destaque.src}
            alt={destaque.alt}
            fill
            sizes="(min-width: 768px) 30vw, 60vw"
            className="object-cover"
          />
        ) : (
          <TileIcone icon={icon} />
        )}
      </div>

      <div className="grid grid-rows-2 gap-1.5">
        {secundarias.map((img, i) =>
          img ? (
            <div key={img.src} className="relative overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              key={`galeria-fallback-${i}`}
              className="relative overflow-hidden rounded-lg"
            >
              <TileIcone icon={icon} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
