// Footer global — Server Component puro (sem "use client")
// Usado em todas as subpáginas de serviço e na homepage.
// Dados importados de data/servicos.ts — nenhum texto hardcodado.

import Link from "next/link";
import { servicos, contato, equipe } from "@/data/servicos";

const ANO_ATUAL = new Date().getFullYear();

// Subconjunto de serviços exibidos no footer (os 6 principais)
const SERVICOS_FOOTER = [
  "avcb",
  "vigilancia-sanitaria",
  "licenciamento-ambiental",
  "spda",
  "laudos-tecnicos",
  "projetos-tecnicos",
] as const;

export function Footer() {
  const servicosFooter = servicos.filter((s) =>
    (SERVICOS_FOOTER as readonly string[]).includes(s.id)
  );

  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé — Central de Soluções"
      className="bg-neutral-900 border-t border-white/10"
    >
      <div className="container-site py-12 md:py-16">

        {/* Grade principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Coluna 1 — Marca + contato */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link
              href="/"
              aria-label="Central de Soluções — ir para o topo"
              className="font-heading font-bold text-white text-lg leading-none tracking-tight w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:rounded"
            >
              Central de{" "}
              <span className="text-[#800000]">Soluções</span>
            </Link>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Engenharia de regularização para indústrias, galpões e telecom.
              Atendemos RJ, SP, MG e ES com responsabilidade técnica real.
            </p>

            {/* Contato */}
            <ul className="flex flex-col gap-2" aria-label="Dados de contato">
              <li>
                <a
                  href={`https://wa.me/${contato.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp da Central de Soluções"
                  className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {contato.telefone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contato.email}`}
                  aria-label={`E-mail: ${contato.email}`}
                  className="text-sm text-neutral-300 hover:text-white transition-colors duration-150"
                >
                  {contato.email}
                </a>
              </li>
              <li>
                <a
                  href={contato.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${contato.instagram}`}
                  className="text-sm text-neutral-300 hover:text-white transition-colors duration-150"
                >
                  {contato.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2 — Serviços */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Serviços
            </h2>
            <ul className="flex flex-col gap-2" aria-label="Links dos serviços">
              {servicosFooter.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.pathRota}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-150"
                  >
                    {s.nomeAbreviado}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Cobertura */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Cobertura
            </h2>
            <ul className="flex flex-col gap-2" aria-label="Estados de atuação">
              <li className="text-sm text-neutral-400">Rio de Janeiro (RJ)</li>
              <li className="text-sm text-neutral-400">São Paulo (SP)</li>
              <li className="text-sm text-neutral-400">Minas Gerais (MG)</li>
              <li className="text-sm text-neutral-400">Espírito Santo (ES)</li>
              <li className="text-sm text-neutral-400 mt-1">
                <span className="text-[#800000] font-semibold">SPDA e Aterramento:</span>{" "}
                todo o Brasil
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Equipe técnica (E-E-A-T) */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Equipe Técnica
            </h2>
            <ul className="flex flex-col gap-4" aria-label="Responsáveis técnicos">
              {equipe.map((membro) => (
                <li key={membro.id} className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">
                    {membro.nome}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {membro.formacao}
                  </span>
                  {membro.especialidades.map((esp) => (
                    <span key={esp} className="text-xs text-neutral-500">
                      {esp}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {ANO_ATUAL} Central de Soluções Engenharia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-neutral-600">
            CRECI/CREA — Responsabilidade técnica assegurada em cada serviço.
          </p>
        </div>

      </div>
    </footer>
  );
}
