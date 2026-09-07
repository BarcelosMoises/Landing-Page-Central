"use client";

/**
 * CarrosselAuto — carrossel automático de imagens para as subpáginas de serviço.
 *
 * Mostra uma imagem por vez e avança automaticamente em loop. Sem controles
 * manuais (setas, miniaturas ou pontos clicáveis) — o avanço é 100% automático,
 * conforme especificação do cliente.
 *
 * Acessibilidade / SEO:
 *   - Todas as imagens ficam no DOM com `alt` técnico descritivo (regra SEO #6);
 *     apenas a imagem ativa é exposta à árvore de acessibilidade (`aria-hidden`
 *     nas demais).
 *   - `role="img"` + `aria-label` no contêiner resume a galeria para leitores de tela.
 *   - `prefers-reduced-motion`: o avanço automático é desativado e a transição de
 *     opacidade é removida — a primeira imagem permanece fixa.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ImagemServico } from "@/data/servicos";

interface CarrosselAutoProps {
  imagens: readonly ImagemServico[];
  /** Nome do serviço — usado no aria-label da galeria. */
  nome: string;
  /** Intervalo entre as trocas, em milissegundos. */
  intervaloMs?: number;
  className?: string;
}

export function CarrosselAuto({
  imagens,
  nome,
  intervaloMs = 4000,
  className = "",
}: CarrosselAutoProps) {
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
    <div
      role="img"
      aria-label={`Galeria de ${nome} com ${total} ${total === 1 ? "foto" : "fotos"}`}
      className={`relative aspect-video overflow-hidden rounded-lg bg-neutral-100 ${className}`}
    >
      {imagens.map((imagem, i) => (
        <div
          key={imagem.src}
          aria-hidden={i !== indice}
          className={[
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            "motion-reduce:transition-none",
            i === indice ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes="(min-width: 768px) 600px, 92vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
