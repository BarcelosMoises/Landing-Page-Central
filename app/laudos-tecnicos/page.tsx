// app/laudos-tecnicos/page.tsx
// Página de serviço: Laudos Técnicos de Engenharia
// Server Component puro — sem "use client".
// Accent: #92610a (dourado) | data-service="laudos" | estados: RJ, SP, MG, ES

import type { Metadata } from "next";
import Link from "next/link";
import { NavPrimaria } from "@/components/NavPrimaria";
import {
  servicos,
  equipe,
  clientes,
  contato,
  estadosAtuacao,
  getWhatsAppUrl,
} from "@/data/servicos";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Laudos Técnicos de Engenharia — ART, AVCB e Inconformidades | Central de Soluções",
  description:
    "Elaboração de laudos técnicos de engenharia com ART: laudo de exigências do Corpo de Bombeiros, diagnóstico de inconformidades e acompanhamento até emissão do AVCB. Atendemos RJ, SP, MG e ES.",
  keywords: [
    "laudo técnico engenharia RJ SP MG ES",
    "laudo exigências corpo de bombeiros",
    "laudo técnico ART CREA",
    "diagnóstico inconformidades AVCB",
    "acompanhamento AVCB engenheiro",
    "laudo técnico consultoria",
    "laudos técnicos corpo de bombeiros consultoria",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/laudos-tecnicos",
  },
  openGraph: {
    title: "Laudos Técnicos de Engenharia — Central de Soluções",
    description:
      "Laudos técnicos com ART: exigências do Corpo de Bombeiros, diagnóstico de inconformidades e acompanhamento do AVCB em RJ, SP, MG e ES.",
    url: "https://www.centraldesolucoes.eng.br/laudos-tecnicos",
    images: [{ url: "/og-laudos.jpg", width: 1200, height: 630, alt: "Laudos Técnicos — Central de Soluções" }],
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Laudos Técnicos de Engenharia",
  description:
    "Elaboração de laudos técnicos de engenharia com ART: laudo de exigências do Corpo de Bombeiros, diagnósticos de inconformidades e planos de adequação. Atendemos RJ, SP, MG e ES.",
  url: "https://www.centraldesolucoes.eng.br/laudos-tecnicos",
  provider: {
    "@type": "ProfessionalService",
    name: "Central de Soluções",
    url: "https://www.centraldesolucoes.eng.br",
    telephone: "+552298112-1315",
  },
  areaServed: [
    { "@type": "State", name: "Rio de Janeiro" },
    { "@type": "State", name: "São Paulo" },
    { "@type": "State", name: "Minas Gerais" },
    { "@type": "State", name: "Espírito Santo" },
  ],
  serviceType: "Laudos Técnicos de Engenharia",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de laudos técnicos",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laudo de Exigências do Corpo de Bombeiros" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diagnóstico de inconformidades com plano de adequações" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acompanhamento completo até emissão do AVCB" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ART assinada por responsável técnico" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é um laudo técnico de engenharia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um laudo técnico de engenharia é um documento elaborado por engenheiro habilitado, acompanhado de ART (Anotação de Responsabilidade Técnica) junto ao CREA, que descreve o estado técnico de uma edificação, sistema ou instalação. No contexto da segurança contra incêndio, o laudo identifica as inconformidades apontadas pelo Corpo de Bombeiros e apresenta um plano de adequações com prazos e soluções.",
      },
    },
    {
      "@type": "Question",
      name: "O que é o Laudo de Exigências do Corpo de Bombeiros?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Laudo de Exigências é o documento emitido pela Central de Soluções após vistoria técnica, que relaciona todas as inconformidades identificadas pelo Corpo de Bombeiros estadual (CBMERJ, CBPMESP, CBMMG ou CBMES), descreve as adequações necessárias para obtenção do AVCB ou CLCB e estabelece um cronograma de execução. É o ponto de partida para a regularização de segurança contra incêndio.",
      },
    },
    {
      "@type": "Question",
      name: "Todo laudo técnico precisa de ART?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A ART (Anotação de Responsabilidade Técnica) é obrigatória para laudos técnicos de engenharia que amparam processos junto a órgãos públicos como o Corpo de Bombeiros e o CREA. Ela vincula o documento a um engenheiro legalmente habilitado, conferindo validade jurídica e técnica ao laudo. A Central de Soluções possui engenheiros registrados no CREA que assinam as ARTs diretamente.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre o laudo técnico e o acompanhamento até o AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O laudo técnico é o diagnóstico: identifica as inconformidades e propõe o plano de adequações. O acompanhamento até o AVCB é a execução completa do processo: gerenciamento da documentação, execução ou supervisão das adequações, interface com o Corpo de Bombeiros e acompanhamento da vistoria até a emissão do certificado. A Central de Soluções oferece ambos os serviços, podendo assumir o processo de ponta a ponta.",
      },
    },
    {
      "@type": "Question",
      name: "A Central de Soluções atende laudos em quais estados?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atendemos Rio de Janeiro (CBMERJ), São Paulo (CBPMESP), Minas Gerais (CBMMG) e Espírito Santo (CBMES). Cada estado possui suas próprias Instruções Técnicas e processos específicos. Nossa equipe é especializada nos procedimentos de cada Corpo de Bombeiros estadual, garantindo laudos aderentes às exigências locais.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────────────────

const laudos = servicos.find((s) => s.id === "laudos-tecnicos")!;
const clientesDestaque = clientes.filter((c) => c.destaque);
const estadosLaudos = estadosAtuacao.filter((e) =>
  laudos.estados.includes(e.sigla)
);
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse no serviço de Laudos Técnicos de Engenharia. Pode me passar mais informações?"
);

// ─── Componentes internos ─────────────────────────────────────────────────────

function BadgeEstado({ sigla, nome }: { sigla: string; nome: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs font-semibold text-neutral-200 font-mono tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-[#92610a]" aria-hidden="true" />
      {sigla} · {nome}
    </span>
  );
}

function IconeFileText() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#92610a] mt-0.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconeChevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-neutral-400">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageLaudosTecnicos() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <NavPrimaria />

      <main data-service="laudos">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-titulo"
          className="relative bg-neutral-950 overflow-hidden"
        >
          {/* Gradiente cinemático dourado */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(146,97,10,0.22) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="container-site relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
            {/* Breadcrumb */}
            <nav aria-label="Localização na página" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <li><Link href="/" className="hover:text-neutral-300 transition-colors">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-neutral-300">Laudos Técnicos</li>
              </ol>
            </nav>

            {/* Badge de categoria */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#92610a]/40 bg-[#92610a]/10 text-xs font-semibold text-[#f0c97a] uppercase tracking-wider">
                <IconeFileText />
                Laudo · Engenharia com ART
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  Laudos Técnicos —{" "}
                  <span className="text-[#f0c97a]">diagnóstico e ART</span>{" "}
                  para regularização junto ao Corpo de Bombeiros
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {laudos.descricao}
                </p>

                {/* Estados */}
                <div className="flex flex-wrap gap-2 mb-10" aria-label="Estados atendidos">
                  {estadosLaudos.map((e) => (
                    <BadgeEstado key={e.sigla} sigla={e.sigla} nome={e.nome} />
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#92610a] hover:bg-[#6e4908] text-white font-semibold text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#92610a] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Solicitar orçamento
                  </a>
                  <Link
                    href="/#servicos"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 text-neutral-200 hover:border-white/30 hover:text-white font-semibold text-sm transition-colors duration-150"
                  >
                    Ver outros serviços
                  </Link>
                </div>
              </div>

              {/* Card lateral — órgãos */}
              <aside
                aria-label="Órgãos e corpos de bombeiros atendidos"
                className="hidden lg:flex flex-col gap-3 min-w-[220px]"
              >
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Órgãos reguladores</p>
                {laudos.orgaos.map((orgao) => (
                  <div
                    key={orgao}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8"
                  >
                    <span className="text-sm font-semibold text-white font-mono">{orgao}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
        <section
          aria-label="Clientes atendidos"
          className="bg-neutral-900 border-y border-white/8 py-6"
        >
          <div className="container-site">
            <p className="text-xs text-neutral-500 text-center uppercase tracking-widest mb-5 font-mono">
              Empresas que confiam na Central de Soluções
            </p>
            <ul
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
              aria-label="Lista de clientes"
            >
              {clientesDestaque.map((c) => (
                <li
                  key={c.id}
                  className="text-sm font-semibold text-neutral-400 hover:text-neutral-200 transition-colors duration-150 tracking-wide"
                >
                  {c.nome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── O QUE ESTÁ INCLUÍDO ────────────────────────────────────────── */}
        <section
          aria-labelledby="incluido-titulo"
          className="bg-white py-20 md:py-28"
        >
          <div className="container-site">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div>
                <p className="text-xs font-semibold text-[#92610a] uppercase tracking-wider mb-3 font-mono">Escopo do serviço</p>
                <h2
                  id="incluido-titulo"
                  className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-6"
                >
                  O que está incluído nos Laudos Técnicos
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  A Central de Soluções elabora laudos técnicos com ART, realiza o diagnóstico completo de inconformidades e acompanha o processo até a emissão do AVCB — sem que o cliente precise gerenciar nenhuma etapa.
                </p>
                <ul className="flex flex-col gap-4" aria-label="Etapas incluídas">
                  {laudos.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconeCheck />
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-serviços */}
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Modalidades disponíveis</p>
                {laudos.subServicos && (
                  <ul className="flex flex-col gap-4" aria-label="Sub-serviços de laudos técnicos">
                    {laudos.subServicos.map((sub) => (
                      <li
                        key={sub.id}
                        className="p-5 rounded-xl bg-neutral-50 border border-neutral-200"
                      >
                        <p className="font-heading font-semibold text-neutral-900 text-base mb-2">{sub.nome}</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">{sub.descricao}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Corpos de Bombeiros por estado */}
                <div className="mt-8 p-5 rounded-xl bg-neutral-900 border border-white/10">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Corpos de Bombeiros atendidos</p>
                  <ul className="flex flex-col gap-2">
                    {estadosLaudos.map((e) => (
                      <li key={e.sigla} className="flex items-center justify-between">
                        <span className="text-sm text-neutral-200 font-mono">{e.siglaCB}</span>
                        <span className="text-xs text-neutral-500">{e.nome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EQUIPE TÉCNICA (E-E-A-T) ──────────────────────────────────── */}
        <section
          aria-labelledby="equipe-titulo"
          className="bg-neutral-950 py-20 md:py-28 border-t border-white/8"
        >
          <div className="container-site">
            <p className="text-xs font-semibold text-[#92610a] uppercase tracking-wider mb-3 font-mono">Responsabilidade técnica real</p>
            <h2
              id="equipe-titulo"
              className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-12"
            >
              Engenheiros que assinam as ARTs
            </h2>
            <ul
              className="grid sm:grid-cols-2 gap-6"
              aria-label="Equipe técnica responsável"
            >
              {equipe.map((membro) => (
                <li
                  key={membro.id}
                  className="flex flex-col gap-3 p-6 rounded-xl bg-neutral-900 border border-white/10"
                >
                  <div>
                    <p className="font-heading font-semibold text-white text-lg">{membro.nome}</p>
                    <p className="text-sm text-[#f0c97a] mt-0.5">{membro.formacao}</p>
                  </div>
                  <ul className="flex flex-col gap-1" aria-label={`Especialidades de ${membro.nome}`}>
                    {membro.especialidades.map((esp) => (
                      <li key={esp} className="text-sm text-neutral-400">{esp}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-titulo"
          className="bg-white py-20 md:py-28 border-t border-neutral-100"
        >
          <div className="container-site max-w-3xl">
            <p className="text-xs font-semibold text-[#92610a] uppercase tracking-wider mb-3 font-mono">Perguntas frequentes</p>
            <h2
              id="faq-titulo"
              className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-10"
            >
              Tudo sobre Laudos Técnicos de Engenharia
            </h2>
            <dl className="flex flex-col divide-y divide-neutral-200">
              {faqJsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="py-6">
                  <dt className="font-heading font-semibold text-neutral-900 text-base md:text-lg mb-3">
                    {faq.name}
                  </dt>
                  <dd className="text-neutral-600 text-base leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-titulo"
          className="bg-neutral-950 py-20 md:py-28 border-t border-white/8"
        >
          <div className="container-site text-center max-w-2xl">
            <h2
              id="cta-titulo"
              className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4"
            >
              Precisa de um laudo técnico de engenharia?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossos engenheiros e receba um diagnóstico gratuito sobre as exigências do Corpo de Bombeiros para o seu imóvel em RJ, SP, MG ou ES.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#92610a] hover:bg-[#6e4908] text-white font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#92610a] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Solicitar diagnóstico gratuito
              </a>
              <a
                href={`mailto:${contato.email}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/15 text-neutral-200 hover:border-white/30 hover:text-white font-semibold text-base transition-colors duration-150"
              >
                {contato.email}
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
