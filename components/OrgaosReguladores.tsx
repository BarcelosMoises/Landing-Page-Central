"use client";

/**
 * OrgaosReguladores — duas variantes visuais dos 4 orgaos reguladores
 * atendidos pela Central de Solucoes, compartilhando os mesmos dados.
 *
 * OrgaosReguladoresClaro: faixa branca abaixo da hero, visivel apenas
 * a partir de lg (desktop/tablet grande).
 *
 * OrgaosReguladoresHero: cards escuros integrados a propria hero,
 * visiveis apenas abaixo de lg (mobile/tablet).
 */

import Link from "next/link";
import { Flame, ClipboardCheck, Building2, Leaf, type LucideProps } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface OrgaoRegulador {
  readonly label: string;
  readonly href: string;
  readonly Icone: React.ComponentType<LucideProps>;
}

const ORGAOS: readonly OrgaoRegulador[] = [
  { label: "Corpo de Bombeiros", href: "/avcb-corpo-de-bombeiros", Icone: Flame },
  { label: "Vigilância Sanitária", href: "/vigilancia-sanitaria", Icone: ClipboardCheck },
  { label: "Prefeitura", href: "/regularizacao-prefeitura", Icone: Building2 },
  { label: "Meio Ambiente", href: "/licenciamento-ambiental", Icone: Leaf },
] as const;

export function OrgaosReguladoresClaro() {
  const reduzMovimento = useReducedMotion();

  return (
    <section
      aria-label="Órgãos reguladores atendidos pela Central de Soluções"
      className="hidden bg-white py-4 lg:block"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-6 lg:px-8">
        {ORGAOS.map((orgao, index) => (
          <motion.div
            key={orgao.label}
            initial={reduzMovimento ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: reduzMovimento ? 0 : index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={orgao.href}
              aria-label={`Ver serviços de ${orgao.label}`}
              className="flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200/70 bg-white px-4 py-3.5 transition-shadow duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
            >
              <orgao.Icone
                style={{ color: "#800000" }}
                className="h-7 w-7 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-sm font-bold uppercase tracking-wide text-neutral-900">
                {orgao.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function OrgaosReguladoresHero() {
  const reduzMovimento = useReducedMotion();

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden" aria-label="Órgãos reguladores atendidos pela Central de Soluções">
      {ORGAOS.map((orgao, index) => (
        <motion.div
          key={orgao.label}
          initial={reduzMovimento ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: reduzMovimento ? 0 : index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={orgao.href}
            aria-label={`Ver serviços de ${orgao.label}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-4 text-center backdrop-blur-sm transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4f0101]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <orgao.Icone className="h-6 w-6 text-white" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-white">
              {orgao.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
