"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/data/servicos";

// ─── Dados estáticos da nav ───────────────────────────────────────────────────

const NAV_ITENS = [
  { id: "legalizacao", label: "Legalização",    href: "/#legalizacao" },
  { id: "projetos",    label: "Projetos",        href: "/#projetos" },
  { id: "laudos",      label: "Laudos Técnicos", href: "/#laudos" },
  { id: "sistemas",    label: "Sistemas",        href: "/#sistemas" },
] as const;

const CTA_WHATSAPP = getWhatsAppUrl(
  "Olá! Vim pelo site da Central de Soluções e gostaria de solicitar um orçamento."
);

// ─── Componente ───────────────────────────────────────────────────────────────

export function NavPrimaria() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [ativa, setAtiva]         = useState<string>(NAV_ITENS[0].id);
  const [scrolled, setScrolled]   = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Scroll spy — só na homepage (IDs das seções não existem nas subpáginas)
  useEffect(() => {
    if (!isHomepage) return;

    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    NAV_ITENS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setAtiva(id);
        },
        {
          threshold: prefersReduced ? 0.1 : 0.4,
          rootMargin: "-80px 0px 0px 0px",
        }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => observersRef.current.forEach((o) => o.disconnect());
  }, [isHomepage]);

  // Fundo da nav ao scrollar
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Fecha menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuAberto(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Scroll suave para seção — só usado na homepage
  function scrollParaSecao(id: string) {
    setMenuAberto(false);
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: prefersReduced ? "instant" : "smooth",
      block: "start",
    });
  }

  // ── Renderização de item de nav ─────────────────────────────────────────────
  // Na homepage: botão com scroll suave
  // Nas subpáginas: Link para /#secao (navegação real)
  function NavItem({ id, label, href }: { id: string; label: string; href: string }) {
    const isAtiva = isHomepage && ativa === id;
    const baseClasses = [
      "relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]",
      isAtiva
        ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#800000] after:rounded-full"
        : "text-neutral-300 hover:text-white",
    ].join(" ");

    if (isHomepage) {
      return (
        <button
          onClick={() => scrollParaSecao(id)}
          aria-current={isAtiva ? "true" : undefined}
          className={baseClasses}
        >
          {label}
        </button>
      );
    }

    return (
      <Link
        href={href}
        className={baseClasses}
      >
        {label}
      </Link>
    );
  }

  // ── Renderização de item de nav mobile ──────────────────────────────────────
  function NavItemMobile({ id, label, href }: { id: string; label: string; href: string }) {
    const isAtiva = isHomepage && ativa === id;
    const baseClasses = [
      "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]",
      isAtiva
        ? "bg-[#800000]/20 text-white"
        : "text-neutral-300 hover:bg-white/10 hover:text-white",
    ].join(" ");

    if (isHomepage) {
      return (
        <button
          onClick={() => scrollParaSecao(id)}
          aria-current={isAtiva ? "true" : undefined}
          className={baseClasses}
        >
          {label}
        </button>
      );
    }

    return (
      <Link
        href={href}
        onClick={() => setMenuAberto(false)}
        className={baseClasses}
      >
        {label}
      </Link>
    );
  }

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-neutral-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo / Nome */}
        <Link
          href="/"
          aria-label="Central de Soluções — ir para o topo"
          className="flex-shrink-0 font-heading font-bold text-white text-lg leading-none tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:rounded"
        >
          Central de{" "}
          <span className="text-[#800000]">Soluções</span>
        </Link>

        {/* Nav desktop */}
        <nav
          aria-label="Menu principal"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_ITENS.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href={CTA_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Solicitar orçamento via WhatsApp"
          className="hidden md:inline-flex items-center gap-2 bg-[#800000] hover:bg-[#4f0101] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 flex-shrink-0"
        >
          Solicitar Orçamento
        </a>

        {/* Botão hambúrguer — mobile */}
        <button
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22" height="22"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            {menuAberto ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="md:hidden bg-neutral-900/98 backdrop-blur-sm border-t border-white/10 px-4 py-4 flex flex-col gap-1"
        >
          {NAV_ITENS.map((item) => (
            <NavItemMobile key={item.id} {...item} />
          ))}
          <a
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuAberto(false)}
            className="mt-2 w-full text-center bg-[#800000] hover:bg-[#4f0101] text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
          >
            Solicitar Orçamento
          </a>
        </nav>
      )}
    </header>
  );
}
