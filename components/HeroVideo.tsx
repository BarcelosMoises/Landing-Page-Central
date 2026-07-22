"use client";

import { useEffect, useState } from "react";

interface HeroVideoProps {
  src: string;
  className?: string;
}

/**
 * Vídeo do hero renderizado apenas quando:
 * - o usuário NÃO pediu redução de movimento (prefers-reduced-motion)
 * - a conexão não é lenta nem está em modo de economia de dados
 *
 * A imagem estática (next/image com priority) permanece sempre renderizada
 * por baixo — o vídeo é apenas uma camada de melhoria progressiva por cima.
 */
export function HeroVideo({ src, className }: HeroVideoProps) {
  const [podeReproduzir, setPodeReproduzir] = useState(false);

  useEffect(() => {
    const prefereReduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const conexao = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const conexaoLenta =
      conexao?.saveData === true ||
      conexao?.effectiveType === "slow-2g" ||
      conexao?.effectiveType === "2g";

    if (!prefereReduzido && !conexaoLenta) {
      setPodeReproduzir(true);
    }
  }, []);

  if (!podeReproduzir) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
