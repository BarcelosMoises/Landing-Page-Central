"use client";

/**
 * GaleriaBento — carrossel de imagens em bento grid para os cards de serviço.
 *
 * Client Component. Recebe as imagens via props (nunca importa dados).
 * Estrutura:
 *   - Imagem ativa grande (col-span-2 row-span-2) com transição animada (motion).
 *   - Miniaturas clicáveis no bento grid (as 4 imagens seguintes à ativa).
 *   - Botões prev/next + contador, acessíveis via aria-label.
 *
 * Animações: spring physics (stiffness/damping) — motion/react respeita
 * prefers-reduced-motion automaticamente.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImagemServico } from "@/data/servicos";

interface GaleriaBentoProps {
  imagens: readonly ImagemServico[];
}

export function GaleriaBento({ imagens }: GaleriaBentoProps) {
  const [indice, setIndice] = useState(0);
  const total = imagens.length;
  const ativa = imagens[indice];

  const anterior = () => setIndice((i) => (i - 1 + total) % total);
  const proxima = () => setIndice((i) => (i + 1) % total);

  // Miniaturas: as 4 imagens seguintes à ativa (cíclico) — preenchem o bento grid.
  const miniaturas = Array.from({ length: Math.min(4, total - 1) }, (_, k) =>
    imagens[(indice + 1 + k) % total]
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Bento grid: imagem ativa grande + miniaturas */}
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        {/* Imagem ativa (carrossel) — ocupa 2x2 */}
        <div className="relative col-span-2 row-span-2 aspect-video rounded-xl overflow-hidden bg-neutral-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={ativa.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="absolute inset-0"
            >
              <Image
                src={ativa.src}
                alt={ativa.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradiente para legibilidade dos controles */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          />

          {/* Botões prev/next */}
          <button
            onClick={anterior}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={proxima}
            aria-label="Próxima foto"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Contador */}
          <span className="absolute bottom-2 right-2 z-10 text-xs font-mono tabular-nums text-white bg-black/50 rounded-full px-2.5 py-1">
            {indice + 1} / {total}
          </span>
        </div>

        {/* Miniaturas */}
        {miniaturas.map((img) => (
          <button
            key={img.src}
            onClick={() => setIndice(imagens.indexOf(img))}
            aria-label={`Ver foto: ${img.alt}`}
            className="relative h-full w-full rounded-lg overflow-hidden bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
          >
            <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Legenda da imagem ativa */}
      <p className="text-xs leading-relaxed" style={{ color: "#c4a8a8" }}>
        {ativa.alt}
      </p>
    </div>
  );
}
