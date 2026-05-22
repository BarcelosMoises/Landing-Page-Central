"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/data/servicos";

// ─── Dados estáticos da nav ───────────────────────────────────────────────────
//
// REGRA: cada id aqui deve ter um elemento com id correspondente na homepage.
// IDs declarados em app/page.tsx: servicos · setores · contato
// Nunca adicionar um item sem antes declarar o id na seção correspondente.

const NAV_ITENS = [
  { id: "servicos", label: "Serviços",        href: "/#servicos" },
  { id: "setores",  label: "Área de Atuação", href: "/#setores"  },
  { id: "contato",  label: "Contato",         href: "/#contato"  },
] as const;

const CTA_WHATSAPP = getWhatsAppUrl(
  "Olá! Vim pelo site da Central de Soluções e gostaria de solicitar um orçamento."
);

// ─── Componente ───────────────────────────────────────────────────────────────

export function NavPrimaria() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [ativa, setAtiva]           = useState<string>(NAV_ITENS[0].id);
  const [scrolled, setScrolled]     = useState(false);
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

  // Fundo escuro da nav ao scrollar — versão muito escura da cor do serviço.
  // color-mix(18% accent + 82% #0a0a0a) garante legibilidade do texto branco
  // em qualquer paleta (WCAG AA) e ainda traz o tint da cor do serviço.
  // Fallback #1a0000 mantém o comportamento original na homepage.
  const scrolledBg = [
    "color-mix(in srgb,",
    "var(--color-service-accent, #800000) 18%,",
    "#0a0a0a 82%)",
  ].join(" ");

  // ── Renderização de item de nav ─────────────────────────────────────────────
  // Na homepage: botão com scroll suave
  // Nas subpáginas: Link para /#secao (navegação real)
  function NavItem({ id, label, href }: { id: string; label: string; href: string }) {
    const isAtiva = isHomepage && ativa === id;
    const baseClasses = [
      "relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]",
      isAtiva
        ? "text-white"
        : "text-white/70 hover:text-white",
    ].join(" ");

    if (isHomepage) {
      return (
        <button
          onClick={() => scrollParaSecao(id)}
          aria-current={isAtiva ? "true" : undefined}
          className={baseClasses}
        >
          {label}
          {isAtiva && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
              style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
            />
          )}
        </button>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {label}
        {isAtiva && (
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
            style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
          />
        )}
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
        ? "text-white"
        : "text-neutral-300 hover:bg-white/10 hover:text-white",
    ].join(" ");

    if (isHomepage) {
      return (
        <button
          onClick={() => scrollParaSecao(id)}
          aria-current={isAtiva ? "true" : undefined}
          className={baseClasses}
          style={isAtiva ? {
            backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 20%, transparent)",
          } : undefined}
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
        style={isAtiva ? {
          backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 20%, transparent)",
        } : undefined}
      >
        {label}
      </Link>
    );
  }

  return (
    <header
      role="banner"
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={scrolled ? {
        backgroundColor: scrolledBg,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Central de Soluções — ir para o topo"
          className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:rounded"
        >
          <Image
            src="/images/logo.png"
            alt="Central de Soluções"
            width={120}
            height={36}
            className="h-9 w-auto"
            priority
          />
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
          className="hidden md:inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 flex-shrink-0"
          style={{
            backgroundColor: "var(--color-service-accent, #800000)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              "var(--color-service-accent-hover, #4f0101)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              "var(--color-service-accent, #800000)";
          }}
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
          className="md:hidden backdrop-blur-sm border-t border-white/10 px-4 py-4 flex flex-col gap-1"
          style={{ backgroundColor: scrolledBg }}
        >
          {NAV_ITENS.map((item) => (
            <NavItemMobile key={item.id} {...item} />
          ))}
          <a
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuAberto(false)}
            className="mt-2 w-full text-center text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: "var(--color-service-accent, #800000)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-service-accent-hover, #4f0101)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-service-accent, #800000)";
            }}
          >
            Solicitar Orçamento
          </a>
        </nav>
      )}
    </header>
  );
}
