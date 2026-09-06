"use client";

/**
 * GaleriaBentoPreview — prévia editorial fixa para os cards de serviço.
 *
 * A galeria mostra a imagem de destaque em tamanho maior à esquerda e duas
 * imagens menores empilhadas à direita. O bento é um botão semântico: ao
 * acioná-lo, o card pai abre o carrossel horizontal completo.
 */

import Image from "next/image";
import { Images } from "lucide-react";
import type { ImagemServico } from "@/data/servicos";

interface GaleriaBentoPreviewProps {
  imagens: readonly ImagemServico[];
  nome: string;
  onOpen: () => void;
}

export function GaleriaBentoPreview({
  imagens,
  nome,
  onOpen,
}: GaleriaBentoPreviewProps) {
  const destaque = imagens.find((imagem) => imagem.destaque) ?? imagens[0];
  const secundarias = imagens
    .filter((imagem) => imagem.src !== destaque.src)
    .slice(0, 2);

  if (!destaque) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver galeria com ${imagens.length} fotos de ${nome}`}
      className="group relative block w-full overflow-hidden border-b border-neutral-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-inset"
    >
      <span className="grid aspect-[16/9] grid-cols-[2fr_1fr] gap-1.5 p-1.5">
        <span className="relative overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={destaque.src}
            alt={destaque.alt}
            fill
            sizes="(min-width: 768px) 380px, 92vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </span>

        <span className="grid grid-rows-2 gap-1.5">
          {secundarias.map((imagem) => (
            <span
              key={imagem.src}
              className="relative overflow-hidden rounded-md bg-neutral-100"
            >
              <Image
                src={imagem.src}
                alt={imagem.alt}
                fill
                sizes="160px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </span>
          ))}
        </span>
      </span>

      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white opacity-100 transition-transform duration-200 group-hover:scale-105">
        <Images className="h-3.5 w-3.5" aria-hidden="true" />
        Ver {imagens.length} fotos
      </span>
    </button>
  );
}
