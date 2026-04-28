"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export interface HeroSectionProps {
  imageSrc?: string;
}

export function HeroSection({ imageSrc = "/images/hero-bg.jpg" }: HeroSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  function handleScroll(targetId: string) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  }

  return (
    <section
      aria-label="Apresentação da Central de Soluções"
      className="relative min-h-[90vh] flex items-center"
    >
      {/* Imagem de fundo */}
      <Image
        src={imageSrc}
        alt="Engenheiros da Central de Soluções realizando vistoria técnica em galpão industrial"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay cinemático */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(79,1,1,0.85) 0%, rgba(10,0,0,0.6) 100%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div ref={contentRef} className="max-w-3xl">
          {/* Badge de cobertura */}
          <div className="mb-6 flex flex-wrap gap-2" aria-label="Estados de atendimento">
            {(["RJ", "SP", "MG", "ES"] as const).map((uf) => (
              <span
                key={uf}
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-[#800000]/30 border border-[#800000]/50 text-white/90 px-2.5 py-1 rounded-full"
              >
                {uf}
              </span>
            ))}
          </div>

          {/* H1 */}
          <h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Engenharia, Regularização e Segurança:{" "}
            <span className="text-[#f5f5f5]">
              Sua empresa em conformidade em RJ, SP, MG e ES
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="font-body text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl">
            AVCB, SPDA, Vigilância Sanitária e Licenciamento Ambiental.{" "}
            <strong className="font-semibold text-white">Tudo em um só lugar.</strong>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => handleScroll("contato")}
              aria-label="Solicitar orçamento — ir para o formulário de contato"
              className="w-full sm:w-auto bg-[#800000] hover:bg-[#4f0101] active:bg-[#4f0101] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#800000]"
            >
              Solicitar Orçamento
            </button>

            <button
              type="button"
              onClick={() => handleScroll("servicos")}
              aria-label="Conhecer serviços — rolar para a seção de serviços"
              className="w-full sm:w-auto border border-white/40 hover:border-white hover:bg-white/10 active:bg-white/20 text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Conhecer Serviços
            </button>
          </div>

          {/* Linha de credibilidade */}
          <p className="mt-10 text-sm text-white/60 font-body">
            Atendemos{" "}
            <span className="text-white/90 font-medium">
              Claro, Embratel, Ambev e Mercado Livre
            </span>
            {" "}— engenheiros com ART em todos os serviços.
          </p>
        </div>
      </div>
    </section>
  );
}
