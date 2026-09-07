"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/data/servicos";

const NAV_ITENS = [
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "setores", label: "Área de Atuação", href: "/#setores" },
  { id: "contato", label: "Contato", href: "/#contato" },
] as const;

type NavItemId = (typeof NAV_ITENS)[number]["id"];

const CTA_WHATSAPP = getWhatsAppUrl(
  "Olá! Vim pelo site da Central de Soluções e gostaria de solicitar um orçamento."
);

export function NavPrimaria() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [ativa, setAtiva] = useState<NavItemId>(NAV_ITENS[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    if (!isHomepage) return;
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    NAV_ITENS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setAtiva(id); },
        { threshold: prefersReduced ? 0.1 : 0.4, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });
    return () => observersRef.current.forEach((o) => o.disconnect());
  }, [isHomepage]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuAberto(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  function scrollParaSecao(id: string) {
    setMenuAberto(false);
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth", block: "start" });
  }

  const scrolledBg = "color-mix(in srgb, var(--color-service-accent, #800000) 18%, #0a0a0a 82%)";

  function NavItem({ id, label, href }: { id: string; label: string; href: string }) {
    const isAtiva = isHomepage && ativa === id;
    const baseClasses = [
      "relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]",
      isAtiva ? "text-white" : "text-white/70 hover:text-white",
    ].join(" ");
    if (isHomepage) {
      return (
        <button type="button" onClick={() => scrollParaSecao(id)} aria-current={isAtiva ? "true" : undefined} className={baseClasses}>
          {label}
          {isAtiva && <span aria-hidden="true" className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-[var(--color-service-accent,#800000)]" />}
        </button>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {label}
        {isAtiva && <span aria-hidden="true" className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-[var(--color-service-accent,#800000)]" />}
      </Link>
    );
  }

  function NavItemMobile({ id, label, href }: { id: string; label: string; href: string }) {
    const isAtiva = isHomepage && ativa === id;
    const baseClasses = [
      "w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000]",
      isAtiva ? "text-white" : "text-neutral-300 hover:bg-white/10 hover:text-white",
    ].join(" ");
    if (isHomepage) {
      return (
        <button type="button" onClick={() => scrollParaSecao(id)} aria-current={isAtiva ? "true" : undefined} className={baseClasses} style={isAtiva ? { backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 20%, transparent)" } : undefined}>
          {label}
        </button>
      );
    }
    return (
      <Link href={href} onClick={() => setMenuAberto(false)} className={baseClasses} style={isAtiva ? { backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 20%, transparent)" } : undefined}>
        {label}
      </Link>
    );
  }

  return (
    <header className={["fixed inset-x-0 top-0 z-50 transition-colors duration-300", scrolled ? "backdrop-blur-sm" : "bg-transparent"].join(" ")} style={scrolled ? { backgroundColor: scrolledBg } : undefined}>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Central de Soluções — ir para o topo" className="flex shrink-0 items-center gap-2">
          <Image src="/images/logo.png" alt="Símbolo da Central de Soluções" width={58} height={58} priority className="h-[54px] w-[54px] shrink-0 object-contain sm:h-[58px] sm:w-[58px]" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-[14px] font-semibold tracking-[0.12em] text-white sm:text-[15px]">CENTRAL DE</span>
            <span className="mt-0.5 font-heading text-[19px] font-bold tracking-[0.06em] text-white sm:text-[21px]">SOLUÇÕES</span>
            <span className="mt-1 whitespace-nowrap text-[7px] font-medium tracking-[0.08em] text-white/80 sm:text-[8px]">LEGALIZAÇÃO | PROJETOS | LAUDOS</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {NAV_ITENS.map((item) => <NavItem key={item.id} {...item} />)}
          <a href={CTA_WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento via WhatsApp" className="ml-6 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" style={{ backgroundColor: "var(--color-service-accent, #800000)" }}>Solicitar Orçamento</a>
        </nav>

        <button type="button" aria-label={menuAberto ? "Fechar menu" : "Abrir menu"} aria-expanded={menuAberto} onClick={() => setMenuAberto((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:hidden">
          <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>
      </div>

      {menuAberto && (
        <div className="border-t border-white/10 bg-[#1a0000]/98 px-4 pb-5 pt-3 backdrop-blur-sm md:hidden">
          <nav aria-label="Menu mobile" className="mx-auto flex max-w-7xl flex-col gap-1">
            {NAV_ITENS.map((item) => <NavItemMobile key={item.id} {...item} />)}
            <a href={CTA_WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setMenuAberto(false)} className="mt-3 inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]" style={{ backgroundColor: "var(--color-service-accent, #800000)" }}>Solicitar Orçamento</a>
          </nav>
        </div>
      )}
    </header>
  );
}
