"use client";

import { useRef, useState, useEffect, useId } from "react";

interface FaqItemProps {
  pergunta: string;
  resposta: string;
  /** Cor de accent herdada da pagina (ex: "var(--color-service-accent)") */
  accentColor?: string;
}

export function FaqItem({
  pergunta,
  resposta,
  accentColor = "var(--color-service-accent, #800000)",
}: FaqItemProps) {
  const [aberto, setAberto] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const painelRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const painelId = `faq-painel-${id}`;
  const botaoId = `faq-botao-${id}`;

  // Detecta preferencia de movimento reduzido uma unica vez no cliente
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function toggle() {
    if (!painelRef.current) return;

    if (reducedMotion) {
      setAberto((prev) => !prev);
      return;
    }

    const el = painelRef.current;

    if (!aberto) {
      // Abertura: 0 -> scrollHeight
      el.style.height = "0px";
      el.style.overflow = "hidden";
      el.style.display = "block";
      const target = el.scrollHeight;
      requestAnimationFrame(() => {
        el.style.transition = "height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease";
        el.style.height = target + "px";
        el.style.opacity = "1";
      });
      // Aguarda apenas o fim da transicao de height (ignora opacity)
      const onOpenEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "height") return;
        el.removeEventListener("transitionend", onOpenEnd);
        el.style.height = "auto";
        el.style.overflow = "";
        el.style.transition = "";
      };
      el.addEventListener("transitionend", onOpenEnd);
    } else {
      // Fechamento: scrollHeight -> 0
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
      requestAnimationFrame(() => {
        el.style.transition = "height 250ms cubic-bezier(0.4, 0, 1, 1), opacity 150ms ease";
        el.style.height = "0px";
        el.style.opacity = "0";
      });
      // Aguarda apenas o fim da transicao de height antes de ocultar
      const onCloseEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "height") return;
        el.removeEventListener("transitionend", onCloseEnd);
        el.style.display = "none";
        el.style.height = "";
        el.style.overflow = "";
        el.style.transition = "";
      };
      el.addEventListener("transitionend", onCloseEnd);
    }

    setAberto((prev) => !prev);
  }

  return (
    <div className="border border-neutral-100 rounded-xl bg-white">
      <button
        id={botaoId}
        type="button"
        aria-expanded={aberto}
        aria-controls={painelId}
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-heading text-base font-bold text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
        style={{ ["--tw-ring-color" as string]: accentColor }}
      >
        <span>{pergunta}</span>
        <span
          aria-hidden="true"
          className="flex-shrink-0 transition-transform duration-200"
          style={{
            color: accentColor,
            transform: aberto ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/*
       * Painel de resposta — permanece no DOM para indexacao pelo Googlebot.
       * Visibilidade controlada por display + height via JS (nao por unmount).
       * Estado inicial: display:none para nao ocupar espaco antes da hidratacao.
       */}
      <div
        id={painelId}
        ref={painelRef}
        role="region"
        aria-labelledby={botaoId}
        style={{ display: "none", opacity: 0 }}
      >
        <p className="px-6 pb-5 pt-1 text-neutral-600 text-base leading-relaxed">
          {resposta}
        </p>
      </div>
    </div>
  );
}
