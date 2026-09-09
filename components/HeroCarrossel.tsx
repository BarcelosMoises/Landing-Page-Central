"use client";

/**
 * HeroCarrossel — carrossel automático de fundo para as hero sections das subpáginas.
 *
 * Preenche todo o contêiner (absolute inset-0) com as imagens do serviço em
 * crossfade automático, ficando atrás do overlay/gradiente da hero.
 *
 * Acessibilidade / SEO:
 *   - Decorativo (background): contêiner e imagens com `aria-hidden="true"`.
 *     O conteúdo textual (h1, parágrafos) é que carrega a informação.
 *   - A primeira imagem usa priority={true} (above-the-fold → LCP).
 *   - `prefers-reduced-motion`: o avanço automático é desativado e a
 *     transição de opacidade é removida — a primeira imagem permanece fixa.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ImagemServico } from "@/data/servicos";

interface HeroCarrosselProps {
  imagens: readonly ImagemServico[];
  /** Intervalo entre as trocas, em milissegundos. */
  intervaloMs?: number;
}

export function HeroCarrossel({ imagens, intervaloMs = 5000 }: HeroCarrosselProps) {
  const total = imagens.length;
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (total <= 1) {
      return undefined;
    }

    const prefereReduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefereReduzido) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndice((atual) => (atual + 1) % total);
    }, intervaloMs);

    return () => clearInterval(timer);
  }, [total, intervaloMs]);

  if (total === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {imagens.map((imagem, i) => (
        <div
          key={imagem.src}
          className={[
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            "motion-reduce:transition-none",
            i === indice ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src={imagem.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}