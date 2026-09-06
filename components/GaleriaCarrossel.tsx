"use client";

/**
 * GaleriaCarrossel — carrossel de imagens em bento grid para o painel
 * expansível dos cards de serviço (ServicosTabs).
 *
 * Client Component. Recebe `imagens` e `nome` via props — nunca importa
 * dados diretamente (padrão do projeto).
 *
 * Layout: imagem ativa grande à esquerda (2/3 da largura) + até 2
 * miniaturas clicáveis empilhadas à direita, preenchidas com as próximas
 * imagens da galeria (cíclico).
 *
 * Animações: motion/react com spring physics na troca de imagem ativa
 * (transform + opacity, GPU-accelerated) e stagger na entrada das
 * miniaturas. Respeita prefers-reduced-motion automaticamente.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImagemServico } from "@/data/servicos";

interface GaleriaCarrosselProps {
  imagens: readonly ImagemServico[];
  nome: string;
}

const slideVariants = {
  enter: (direcao: number) => ({
    x: direcao > 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direcao: number) => ({
    x: direcao > 0 ? -24 : 24,
    opacity: 0,
  }),
};

export function GaleriaCarrossel({ imagens, nome }: GaleriaCarrosselProps) {
  const [[indice, direcao], setIndice] = useState<[number, number]>([0, 0]);
  const total = imagens.length;
  const ativa = imagens[indice];

  const ir = (novoIndice: number, dir: number) => {
    setIndice([(novoIndice + total) % total, dir]);
  };

  const anterior = () => ir(indice - 1, -1);
  const proxima = () => ir(indice + 1, 1);

  const miniaturas = Array.from({ length: Math.min(2, total - 1) }, (_, k) =>
    imagens[(indice + 1 + k) % total]
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-[2fr_1fr] gap-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
          <AnimatePresence mode="wait" custom={direcao} initial={false}>
            <motion.div
              key={ativa.src}
              custom={direcao}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <Image
                src={ativa.src}
                alt={ativa.alt}
                fill
                sizes="(min-width: 768px) 420px, 90vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={anterior}
                aria-label={`Foto anterior da galeria de ${nome}`}
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={proxima}
                aria-label={`Próxima foto da galeria de ${nome}`}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                {indice + 1} / {total}
              </span>
            </>
          ) : null}
        </div>

        {miniaturas.length > 0 ? (
          <div className="grid grid-rows-2 gap-2">
            {miniaturas.map((img, k) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => ir(imagens.indexOf(img), 1)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * k, duration: 0.3 }}
                aria-label={`Ver foto: ${img.alt}`}
                className="relative aspect-square overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="140px"
                  className="object-cover transition-transform duration-200 hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
