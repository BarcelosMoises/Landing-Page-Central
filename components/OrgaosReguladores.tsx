"use client";

/**
 * OrgaosReguladores — faixa compacta abaixo da hero com os 4 órgãos
 * reguladores atendidos pela Central de Soluções. Desenhada para caber
 * junto com a hero na primeira tela (above the fold), em mobile e desktop.
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

export function OrgaosReguladores() {
  const reduzMovimento = useReducedMotion();

  return (
    <section
      aria-label="Órgãos reguladores atendidos pela Central de Soluções"
      className="bg-white py-3 sm:py-4"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2.5 px-4 sm:grid-cols-4 sm:gap-3 sm:px-6 lg:px-8">
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
              className="flex items-center gap-2 rounded-lg border border-neutral-200/70 bg-white px-3 py-2.5 transition-shadow duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2 sm:justify-center sm:py-3"
            >
              <orgao.Icone
                style={{ color: "#800000" }}
                className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-[11px] font-bold uppercase tracking-wide text-neutral-900 sm:text-xs">
                {orgao.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
