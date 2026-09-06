"use client";

/**
 * GaleriaModal — dialog acessível para exibir o carrossel de fotos de um
 * serviço sem expandir a grade de cards. Fecha por botão, clique no backdrop
 * ou Escape; restaura o foco ao elemento que abriu a galeria.
 */

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { ImagemServico } from "@/data/servicos";
import { GaleriaCarrosselHorizontal } from "@/components/GaleriaCarrosselHorizontal";

interface GaleriaModalProps {
  aberta: boolean;
  imagens: readonly ImagemServico[];
  nome: string;
  onClose: () => void;
}

export function GaleriaModal({
  aberta,
  imagens,
  nome,
  onClose,
}: GaleriaModalProps) {
  const tituloId = useId();
  const botaoFecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberta) {
      return undefined;
    }

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botaoFecharRef.current?.focus();

    const tratarTecla = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", tratarTecla);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", tratarTecla);
    };
  }, [aberta, onClose]);

  return (
    <AnimatePresence>
      {aberta ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!aberta}
        >
          <motion.button
            type="button"
            aria-label="Fechar galeria"
            className="absolute inset-0 cursor-default bg-[#1a0000]/75 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-inset"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-neutral-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Galeria de serviços
                </p>
                <h2 id={tituloId} className="mt-0.5 text-lg font-semibold text-neutral-900">
                  {nome}
                </h2>
              </div>
              <button
                ref={botaoFecharRef}
                type="button"
                onClick={onClose}
                aria-label={`Fechar galeria de ${nome}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <GaleriaCarrosselHorizontal imagens={imagens} nome={nome} />
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
