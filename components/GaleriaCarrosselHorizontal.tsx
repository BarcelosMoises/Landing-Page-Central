"use client";

/**
 * GaleriaCarrosselHorizontal — carrossel de fotos expandido, navegável por
 * setas, miniaturas e swipe horizontal. Recebe somente dados serializáveis
 * do serviço e mantém as transições em transform/opacity com motion/react.
 */

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImagemServico } from "@/data/servicos";

interface GaleriaCarrosselHorizontalProps {
  imagens: readonly ImagemServico[];
  nome: string;
}

const slideVariants = {
  enter: (direcao: number) => ({
    x: direcao > 0 ? 36 : -36,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direcao: number) => ({
    x: direcao > 0 ? -36 : 36,
    opacity: 0,
  }),
};

export function GaleriaCarrosselHorizontal({
  imagens,
  nome,
}: GaleriaCarrosselHorizontalProps) {
  const [[indice, direcao], setIndice] = useState<[number, number]>([0, 0]);
  const total = imagens.length;
  const ativa = imagens[indice];

  const selecionar = (proximoIndice: number, proximaDirecao: number) => {
    setIndice([(proximoIndice + total) % total, proximaDirecao]);
  };

  const anterior = () => selecionar(indice - 1, -1);
  const proxima = () => selecionar(indice + 1, 1);

  const tratarFimDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const forca = info.offset.x + info.velocity.x * 0.2;
    if (forca < -70) proxima();
    if (forca > 70) anterior();
  };

  if (!ativa) {
    return null;
  }

  return (
    <div className="space-y-3 p-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
        <AnimatePresence mode="wait" custom={direcao} initial={false}>
          <motion.div
            key={ativa.src}
            custom={direcao}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={tratarFimDrag}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={ativa.src}
              alt={ativa.alt}
              fill
              sizes="(min-width: 768px) 600px, 92vw"
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
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label={`Próxima foto da galeria de ${nome}`}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
              {indice + 1} / {total}
            </span>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imagens.map((imagem, imagemIndice) => {
            const estaAtiva = imagemIndice === indice;
            return (
              <button
                key={imagem.src}
                type="button"
                onClick={() => selecionar(imagemIndice, imagemIndice > indice ? 1 : -1)}
                aria-label={`Ver foto ${imagemIndice + 1} de ${total}: ${imagem.alt}`}
                aria-current={estaAtiva ? "true" : undefined}
                className={[
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2",
                  estaAtiva
                    ? "border-[#800000] opacity-100"
                    : "border-transparent opacity-65 hover:opacity-100",
                ].join(" ")}
              >
                <Image
                  src={imagem.src}
                  alt={imagem.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
