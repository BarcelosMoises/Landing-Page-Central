"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { getWhatsAppUrl } from "@/data/servicos";

const NAV_ITENS = [
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "setores", label: "Área de Atuação", href: "/#setores" },
  { id: "contato", label: "Contato", href: "/#contato" },
] as const;

const SERVICOS_MENU = [
  { label: "Corpo de Bombeiros", href: "/avcb-corpo-de-bombeiros" },
  { label: "Vigilância Sanitária", href: "/vigilancia-sanitaria" },
  { label: "Meio Ambiente", href: "/licenciamento-ambiental" },
  { label: "Prefeitura", href: "/regularizacao-prefeitura" },
  { label: "Laudos Técnicos", href: "/laudos-tecnicos" },
  { label: "Projetos Técnicos", href: "/projetos" },
] as const;

type NavItemId = (typeof NAV_ITENS)[number]["id"];

const CTA_WHATSAPP = getWhatsAppUrl(
  "Olá! Vim pelo site da Central de Soluções e gostaria de solicitar um orçamento."
);

const menuTransition = { type: "spring", stiffness: 320, damping: 30 } as const;

// Fundo do dropdown: mistura o accent do serviço (herdado via --color-service-accent
// do layout.tsx da subpágina) com o vinho escuro cinemtico da marca (#1a0000).
// Na homepage, --color-service-accent não é definido e o fallback #800000 mantém o
// vinho global, então o gradiente permanece igual ao atual.
const dropdownBg =
  "linear-gradient(180deg, color-mix(in srgb, var(--color-service-accent, #800000) 55%, #1a0000) 0%, #1a0000 100%)";

export function NavPrimaria() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [ativa, setAtiva] = useState<NavItemId>(NAV_ITENS[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [servicosAberto, setServicosAberto] = useState(false);
  const observersRef = useRef<IntersectionObserver[]>([]);
  const menuRef = useRef<HTMLElement>(null);

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
    const handler = () => {
      if (window.innerWidth < 768) return;
      if (window.innerWidth >= 768) setMenuAberto(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    const clickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuAberto(false);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuAberto(false);
    };
    document.addEventListener("mousedown", clickOutside);
    window.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
      window.removeEventListener("keydown", keydown);
    };
  }, [menuAberto]);

  function fecharMenu() {
    setMenuAberto(false);
    setServicosAberto(false);
  }

  function scrollParaSecao(id: string) {
    fecharMenu();
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth", block: "start" });
  }

  function abrirServicos() {
    setServicosAberto((aberto) => !aberto);
    if (isHomepage) {
      const el = document.getElementById("servicos");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth", block: "start" });
    }
  }

  const scrolledBg = "color-mix(in srgb, var(--color-service-accent, #800000) 18%, #0a0a0a 82%)";

  function NavItem({ id, label, href }: { id: string; label: string; href: string }) {
    const isAtiva = isHomepage && ativa === id;
    const baseClasses = [
      "w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-service-accent,#800000)]",
      isAtiva ? "text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
    ].join(" ");
    if (isHomepage) {
      return <button type="button" onClick={() => scrollParaSecao(id)} aria-current={isAtiva ? "true" : undefined} className={baseClasses} style={isAtiva ? { backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 20%, transparent)" } : undefined}>{label}</button>;
    }
    return <Link href={href} onClick={fecharMenu} className={baseClasses}>{label}</Link>;
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

        <nav ref={menuRef} aria-label="Menu principal" className="relative">
          <button
            type="button"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span aria-hidden="true" className="relative flex h-6 w-6 items-center justify-center">
              <motion.span animate={{ rotate: menuAberto ? 45 : 0, y: menuAberto ? 0 : -7 }} transition={menuTransition} className="absolute h-0.5 w-6 bg-current" />
              <motion.span animate={{ opacity: menuAberto ? 0 : 1, scaleX: menuAberto ? 0 : 1 }} transition={menuTransition} className="absolute h-0.5 w-6 bg-current" />
              <motion.span animate={{ rotate: menuAberto ? -45 : 0, y: menuAberto ? 0 : 7 }} transition={menuTransition} className="absolute h-0.5 w-6 bg-current" />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {menuAberto && (
              <motion.div
                id="menu-principal"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={menuTransition}
                className="absolute right-0 top-full z-50 mt-3 w-max min-w-64 max-w-[calc(100vw-2rem)] rounded-xl border p-3 shadow-xl backdrop-blur-sm md:min-w-72"
                style={{
                  background: dropdownBg,
                  borderColor: "color-mix(in srgb, var(--color-service-accent, #800000) 35%, white 15%)",
                }}
              >
                <button
                  type="button"
                  onClick={abrirServicos}
                  aria-expanded={servicosAberto}
                  aria-controls="menu-servicos"
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-service-accent,#800000)]"
                >
                  Serviços
                  <ChevronDown className={"h-4 w-4 transition-transform duration-200" + (servicosAberto ? " rotate-180" : "")} aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {servicosAberto && (
                    <motion.div id="menu-servicos" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={menuTransition} className="overflow-hidden">
                      <ul className="ml-4 border-l border-white/20 py-1">
                        {SERVICOS_MENU.map((servico, index) => (
                          <motion.li key={servico.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * index, duration: 0.18 }}>
                            <Link href={servico.href} onClick={fecharMenu} className="block rounded-md px-4 py-2 text-sm text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-service-accent,#800000)]">{servico.label}</Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {NAV_ITENS.filter((item) => item.id !== "servicos").map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * (index + 1), duration: 0.18 }}>
                    <NavItem {...item} />
                  </motion.div>
                ))}
                <motion.a
                  href={CTA_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fecharMenu}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14, duration: 0.18 }}
                  className="mt-3 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]"
                  style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
                >
                  Solicitar Orçamento
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
