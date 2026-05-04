// app/projetos/page.tsx
// Página de serviço: Projetos Técnicos de Engenharia
// Server Component puro — sem "use client".
// Accent: #1a3a5c (azul naval) — categoria projeto.

import type { Metadata } from "next";
import Link from "next/link";
import { NavPrimaria } from "@/components/NavPrimaria";
import { CrosshairDecor } from "@/components/CrosshairDecor";
import {
  servicos,
  equipe,
  clientes,
  contato,
  getWhatsAppUrl,
} from "@/data/servicos";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Projetos Técnicos de Engenharia — Arquitetônico, Incêndio, PGRS",
  description:
    "Elaboração de projetos técnicos completos: projeto arquitetônico, combate ao incêndio e pânico, acessibilidade (NBR 9050), hidráulico/sanitário, PGRS e PGRSS. Atendemos RJ, SP, MG e ES com ART.",
  keywords: [
    "projeto técnico de engenharia RJ SP",
    "projeto combate incêndio corpo de bombeiros",
    "projeto arquitetônico vigilância sanitária",
    "PGRS PGRSS plano resíduos sólidos",
    "projeto acessibilidade NBR 9050",
    "levantamento arquitetônico AutoCAD",
    "projeto hidráulico sanitário",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/projetos",
  },
  openGraph: {
    title: "Projetos Técnicos — Central de Soluções",
    description:
      "Projetos técnicos completos de engenharia e arquitetura: incêndio, VISA, hidráulico, acessibilidade, PGRS e PGRSS em RJ, SP, MG e ES.",
    url: "https://www.centraldesolucoes.eng.br/projetos",
    images: [
      {
        url: "/og-projetos.jpg",
        width: 1200,
        height: 630,
        alt: "Projetos Técnicos — Central de Soluções",
      },
    ],
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Projetos Técnicos de Engenharia",
  description:
    "Elaboração de projetos técnicos completos — arquitetônico, combate ao incêndio, hidráulico/sanitário, acessibilidade, PGRS e PGRSS — com ART e acompanhamento até a aprovação nos órgãos competentes.",
  url: "https://www.centraldesolucoes.eng.br/projetos",
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
  serviceType: "Projetos Técnicos de Engenharia e Arquitetura",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tipos de projetos técnicos",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Levantamento Arquitetônico (AutoCAD / PDF)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto de Combate ao Incêndio e Pânico com ART" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto Arquitetônico para Vigilância Sanitária" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto Hidráulico / Sanitário" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto de Acessibilidade (NBR 9050)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "PGRS e PGRSS" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quando é obrigatório um projeto de combate ao incêndio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O projeto de combate ao incêndio e pânico é obrigatório para a maioria dos imóveis que precisam do AVCB (Auto de Vistoria do Corpo de Bombeiros). A exigência varia conforme a área, ocupação e risco do imóvel, de acordo com as Instruções Técnicas do Corpo de Bombeiros estadual. Galpões, indústrias, comércios, escolas e igrejas são os casos mais comuns.",
      },
    },
    {
      "@type": "Question",
      name: "O que é o levantamento arquitetônico e para que serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O levantamento arquitetônico é o registro técnico das dimensões, layout e características físicas de um imóvel existente, resultando em plantas baixas, cortes e fachadas em AutoCAD e PDF. É a base obrigatória para qualquer projeto técnico de regularização — AVCB, Alvará Sanitário, Licenciamento Ambiental ou adequações de acessibilidade.",
      },
    },
    {
      "@type": "Question",
      name: "O que é o PGRS e quando ele é exigido?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O PGRS (Plano de Gerenciamento de Resíduos Sólidos) é o documento exigido pela Lei 12.305/2010 que descreve como o estabelecimento gerencia, armazena e descarta seus resíduos sólidos. É obrigatório para indústrias, comércios e serviços que geram resíduos e é requisito para o Alvará Sanitário e o Licenciamento Ambiental. Para estabelecimentos de saúde, exige-se também o PGRSS (RDC ANVISA 222/2018).",
      },
    },
    {
      "@type": "Question",
      name: "O que é o projeto de acessibilidade e quais normas ele segue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O projeto de acessibilidade adapta o imóvel à ABNT NBR 9050, garantindo acesso a pessoas com deficiência ou mobilidade reduzida. Inclui dimensionamento de rampas, pisos táteis, sanitários adaptados e sinalização. É exigido pela Vigilância Sanitária para clínicas, laboratórios e estabelecimentos de saúde, e pela maioria das prefeituras para aprovação de reformas e novas construções.",
      },
    },
    {
      "@type": "Question",
      name: "A Central de Soluções emite ART para os projetos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Todos os projetos elaborados pela Central de Soluções são assinados com ART (Anotação de Responsabilidade Técnica) pelo engenheiro ou arquiteto responsável, garantindo validade legal e responsabilidade técnica perante o CREA e os órgãos reguladores. Não trabalhamos com projetos sem ART.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────────────────

const projetos = servicos.find((s) => s.id === "projetos-tecnicos")!;
const clientesDestaque = clientes.filter((c) => c.destaque);
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse nos serviços de Projetos Técnicos. Pode me passar mais informações?"
);

// Accent visual deste serviço
const ACCENT = "#1a3a5c";
const ACCENT_HOVER = "#122845";
const ACCENT_LIGHT = "#7aaacc";

// ─── Componentes internos ─────────────────────────────────────────────────────

function IconeRegua() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 2h20v5H2zM2 17h20v5H2z" />
      <path d="M6 7v10M12 7v10M18 7v10" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-0.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconeArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageProjetosTecnicos() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <NavPrimaria />

      <main data-service="projetos">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-titulo" className="relative bg-neutral-950 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 60% at 60% 40%, rgba(26,58,92,0.30) 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <CrosshairDecor corner="top-right" size="lg" variant="light" />
          <CrosshairDecor corner="bottom-left" size="sm" variant="light" />

          <div className="container-site relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
            {/* Breadcrumb */}
            <nav aria-label="Localização na página" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <li><Link href="/" className="hover:text-neutral-300 transition-colors">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-neutral-300">Projetos Técnicos</li>
              </ol>
            </nav>

            {/* Badge */}
            <div className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider"
                style={{
                  borderColor: "rgba(26,58,92,0.50)",
                  backgroundColor: "rgba(26,58,92,0.15)",
                  color: ACCENT_LIGHT,
                }}
              >
                <IconeRegua />
                Engenharia · Projetos Técnicos
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  Projetos Técnicos —{" "}
                  <span style={{ color: ACCENT_LIGHT }}>completos, com ART</span>
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {projetos.descricao}
                </p>

                {/* Estados */}
                <div className="flex flex-wrap gap-2 mb-10" aria-label="Estados atendidos">
                  {["RJ", "SP", "MG", "ES"].map((sigla) => (
                    <span
                      key={sigla}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs font-semibold text-neutral-200 font-mono tracking-wide"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT_LIGHT }} aria-hidden="true" />
                      {sigla}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                    style={{ backgroundColor: ACCENT }}
                    onMouseEnter={undefined}
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
              <aside aria-label="Órgãos responsáveis" className="hidden lg:flex flex-col gap-3 min-w-[220px]">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Órgãos / Registros</p>
                {projetos.orgaos.map((orgao) => (
                  <div key={orgao} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8">
                    <span className="text-sm font-semibold text-white font-mono">{orgao}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
        <section aria-label="Clientes atendidos" className="bg-neutral-900 border-y border-white/8 py-6">
          <div className="container-site">
            <p className="text-xs text-neutral-500 text-center uppercase tracking-widest mb-5 font-mono">
              Empresas que confiam na Central de Soluções
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3" aria-label="Lista de clientes">
              {clientesDestaque.map((c) => (
                <li key={c.id} className="text-sm font-semibold text-neutral-400 hover:text-neutral-200 transition-colors duration-150 tracking-wide">
                  {c.nome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── SUB-SERVIÇOS ──────────────────────────────────────────────────── */}
        <section aria-labelledby="subservicos-titulo" className="bg-white py-20 md:py-28">
          <div className="container-site">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono" style={{ color: ACCENT }}>
                Escopo completo
              </p>
              <h2
                id="subservicos-titulo"
                className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-4"
              >
                Tipos de projetos que elaboramos
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed max-w-2xl">
                Cada projeto é entregue com pranchas técnicas, memorial descritivo e ART assinada pelo responsável técnico. Acompanhamos a aprovação junto ao órgão competente.
              </p>
            </div>

            {/* Grid de sub-serviços */}
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Sub-serviços de projetos técnicos">
              {projetos.subServicos?.map((sub) => (
                <li
                  key={sub.id}
                  className="flex flex-col gap-3 p-6 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-150"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-neutral-900 text-base leading-snug">
                      {sub.nome}
                    </h3>
                    <IconeArrow />
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{sub.descricao}</p>
                  {sub.norma && (
                    <span className="text-xs font-mono text-neutral-400 mt-auto pt-2 border-t border-neutral-200">
                      {sub.norma}
                    </span>
                  )}
                  {sub.entregavel && (
                    <span className="text-xs font-mono text-neutral-400 mt-auto pt-2 border-t border-neutral-200">
                      Entregável: {sub.entregavel}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* Lista resumida de itens */}
            <div className="mt-16 grid md:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-mono">O que está incluído</p>
                <ul className="flex flex-col gap-3" aria-label="Itens incluídos">
                  {projetos.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: ACCENT }}><IconeCheck /></span>
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-neutral-900 border border-white/10 flex flex-col gap-4">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">Base normativa</p>
                <ul className="flex flex-col gap-2">
                  {["Instruções Técnicas do Corpo de Bombeiros estadual", "ABNT NBR 9050 (Acessibilidade)", "Lei 12.305/2010 (PGRS)", "RDC ANVISA 222/2018 (PGRSS)", "ABNT NBR 13714 / NBR 10897 (Hidrantes / Sprinklers)"].map((norma) => (
                    <li key={norma} className="text-sm text-neutral-300 font-mono">{norma}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── EQUIPE E-E-A-T ──────────────────────────────────────────────── */}
        <section aria-labelledby="equipe-titulo" className="relative bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <CrosshairDecor corner="bottom-right" size="md" variant="light" />
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono" style={{ color: ACCENT_LIGHT }}>
              Responsabilidade técnica real
            </p>
            <h2
              id="equipe-titulo"
              className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-12"
            >
              Engenheiros e arquitetos que assinam as ARTs
            </h2>
            <ul className="grid sm:grid-cols-2 gap-6" aria-label="Equipe técnica responsável">
              {equipe.map((membro) => (
                <li key={membro.id} className="flex flex-col gap-3 p-6 rounded-xl bg-neutral-900 border border-white/10">
                  <div>
                    <p className="font-heading font-semibold text-white text-lg">{membro.nome}</p>
                    <p className="text-sm mt-0.5" style={{ color: ACCENT_LIGHT }}>{membro.formacao}</p>
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

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-titulo" className="bg-white py-20 md:py-28 border-t border-neutral-100">
          <div className="container-site max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono" style={{ color: ACCENT }}>
              Perguntas frequentes
            </p>
            <h2
              id="faq-titulo"
              className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-10"
            >
              Tudo sobre Projetos Técnicos de Engenharia
            </h2>
            <dl className="flex flex-col divide-y divide-neutral-200">
              {faqJsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="py-6">
                  <dt className="font-heading font-semibold text-neutral-900 text-base md:text-lg mb-3">{faq.name}</dt>
                  <dd className="text-neutral-600 text-base leading-relaxed">{faq.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="cta-titulo" className="relative bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <CrosshairDecor corner="top-left" size="sm" variant="light" />
          <CrosshairDecor corner="bottom-right" size="lg" variant="light" />
          <div className="container-site text-center max-w-2xl">
            <h2
              id="cta-titulo"
              className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4"
            >
              Precisa de um projeto técnico?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossos engenheiros e receba um orçamento para o projeto que seu imóvel precisa — arquitetônico, incêndio, acessibilidade, PGRS ou hidráulico.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                style={{ backgroundColor: ACCENT }}
              >
                Solicitar orçamento
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
