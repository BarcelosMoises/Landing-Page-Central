// app/regularizacao-prefeitura/page.tsx
// Página de serviço: Regularização junto à Prefeitura
// Server Component puro — sem "use client".
// Accent: #1a3a6b (azul marinho) — cor primária do serviço.

import type { Metadata } from "next";
import Link from "next/link";
import { NavPrimaria } from "@/components/NavPrimaria";
import { FaqItem } from "@/components/FaqItem";
import { CrosshairDecor } from "@/components/CrosshairDecor";
import {
  servicos,
  contato,
  estadosAtuacao,
  getWhatsAppUrl,
} from "@/data/servicos";


// ─── Metadata ──────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Regularização junto à Prefeitura — Habite-se, Projeto Legal e Loteamento",
  description:
    "Regularização de imóveis junto às prefeituras municipais nos estados RJ, SP, MG e ES. Aprovação de projetos, Habite-se, desmembramento e remembramento de lotes, com ART e acompanhamento completo até a emissão do documento.",
  keywords: [
    "regularização prefeitura engenharia civil",
    "habite-se RJ regularização",
    "aprovação projeto prefeitura SP",
    "regularização imóvel prefeitura MG",
    "desmembramento lote prefeitura ES",
    "projeto legal aprovado secretaria municipal",
    "remembramento lote engenharia",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/regularizacao-prefeitura",
  },
  openGraph: {
    title: "Regularização junto à Prefeitura — Central de Soluções",
    description:
      "Regularização de imóveis junto às prefeituras municipais em RJ, SP, MG e ES. Habite-se, aprovação de projetos e loteamento com ART.",
    url: "https://www.centraldesolucoes.eng.br/regularizacao-prefeitura",
    images: [
      {
        url: "/og-regularizacao-prefeitura.jpg",
        width: 1200,
        height: 630,
        alt: "Regularização junto à Prefeitura — Central de Soluções",
      },
    ],
  },
};

// ─── JSON-LD ───────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Regularização junto à Prefeitura — Habite-se, Projeto Legal e Loteamento",
  alternateName: "Aprovação de Projetos Municipais / Secretaria de Obras",
  description:
    "Regularização de imóveis junto às prefeituras municipais, incluindo aprovação de projetos, Habite-se, desmembramento e remembramento de lotes nos estados RJ, SP, MG e ES.",
  url: "https://www.centraldesolucoes.eng.br/regularizacao-prefeitura",
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
  serviceType: "Regularização Municipal / Aprovação junto à Prefeitura",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Etapas do serviço de Regularização junto à Prefeitura",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto Legal aprovado pela Secretaria Municipal" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Obtenção do Habite-se" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desmembramento de lotes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remembramento de lotes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ART assinada por engenheiro responsável" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o Habite-se e quando ele é obrigatório?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Habite-se é o documento emitido pela Prefeitura Municipal que atesta que uma obra foi concluída de acordo com o projeto aprovado e as normas municipais de construção. É obrigatório para qualquer edificação nova ou reformada que necessite de regularização junto ao município. Sem o Habite-se, o imóvel não pode ser registrado no Cartório de Imóveis, nem financiado ou alienado legalmente.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre Projeto Legal e Projeto Executivo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Projeto Legal é o conjunto de documentos (plantas, memoriais e ART) elaborado para aprovação junto à Prefeitura, atendendo ao Código de Obras, Plano Diretor e legislação municipal de uso e ocupação do solo. Já o Projeto Executivo é o detalhamento técnico completo destinado à execução da obra em campo. A Central de Soluções elabora o Projeto Legal e acompanha o processo de aprovação até a emissão do alvará de construção ou do Habite-se.",
      },
    },
    {
      "@type": "Question",
      name: "O que é desmembramento e remembramento de lotes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O desmembramento é o processo de divisão de um lote em dois ou mais lotes menores, mantendo o acesso à via pública. O remembramento é o processo inverso: a união de dois ou mais lotes contíguos em um único lote maior. Ambos os processos exigem aprovação da Prefeitura Municipal, com elaboração de projeto técnico, ART e registro em cartório.",
      },
    },
    {
      "@type": "Question",
      name: "Qual órgão analisa a regularização de imóveis junto à Prefeitura?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A regularização junto à Prefeitura é analisada pelas Secretarias Municipais de Obras, Urbanismo ou Planejamento Urbano, que variam de nome conforme o município. A base normativa inclui o Código de Obras municipal, o Plano Diretor e a Lei de Uso e Ocupação do Solo. A Central de Soluções atua nos municípios dos estados RJ, SP, MG e ES, conhecendo a legislação local de cada estado atendido.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o prazo para aprovação de projeto na Prefeitura?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O prazo varia conforme o município, o tipo de edificação e a complexidade do projeto. Em média, o processo leva de 30 a 120 dias entre a entrega da documentação completa e a emissão do alvará ou Habite-se. Municípios de grande porte como São Paulo e Rio de Janeiro podem ter prazos maiores devido ao volume de processos. A Central de Soluções realiza diagnóstico prévio para estimar o prazo do seu caso específico.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────

const prefeitura = servicos.find((s) => s.id === "regularizacao-prefeitura")!;
const estadosPrefeitura = estadosAtuacao.filter((e) =>
  prefeitura.estados.includes(e.sigla)
);
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse no serviço de Regularização junto à Prefeitura. Pode me passar mais informações?"
);

// ─── Componentes internos ───────────────────────────────────────────

function BadgeEstado({ sigla, nome }: { sigla: string; nome: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs font-semibold text-neutral-200 font-mono tracking-wide">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "var(--color-service-accent)" }}
        aria-hidden="true"
      />
      {sigla} · {nome}
    </span>
  );
}

function IconeBuilding() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 mt-0.5"
      style={{ color: "var(--color-service-accent)" }}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconeChevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-neutral-400"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ─── Diferenciais do setor pública municipal ────────────────────────

const diferencialPrefeitura = [
  {
    id: "documentacao",
    titulo: "Documentação completa para processos municipais",
    descricao:
      "Elaboramos projetos legais, memoriais descritivos, ARTs e toda a documentação exigida pela Secretaria Municipal, reduzindo exigências e re-protocolos.",
    icone: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "cobertura",
    titulo: "Atuação nos 4 estados do Sudeste",
    descricao:
      "Uma única empresa para regularizar imóveis em qualquer município de RJ, SP, MG e ES — sem precisar contratar escritórios locais diferentes.",
    icone: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "prazos",
    titulo: "Experiência com o rito municipal",
    descricao:
      "Conhecemos o fluxo de análise das secretarias, os documentos solicitados nas vistoriais e como minimizar exigências, agilizando a aprovação do seu projeto.",
    icone: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────

export default function PageRegularizacaoPrefeitura() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <NavPrimaria />

      <main data-service="prefeitura">

        {/* ── HERO ───────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-titulo"
          className="relative bg-neutral-950 overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(26,58,107,0.22) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <CrosshairDecor corner="top-right" size="lg" variant="light" />
          <CrosshairDecor corner="bottom-left" size="sm" variant="light" />

          <div className="container-site relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
            <nav aria-label="Localização na página" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <li>
                  <Link href="/" className="hover:text-neutral-300 transition-colors">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-neutral-300">
                  Regularização junto à Prefeitura
                </li>
              </ol>
            </nav>

            <div className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-service-accent) 40%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--color-service-accent) 10%, transparent)",
                  color: "var(--color-service-accent-light)",
                }}
              >
                <IconeBuilding />
                Legalização · Prefeitura Municipal
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  Regularização de imóveis junto à{" "}
                  <span style={{ color: "var(--color-service-accent-light)" }}>
                    Prefeitura Municipal
                  </span>{" "}
                  — Habite-se, Projeto Legal e Loteamento
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {prefeitura.descricao}
                </p>

                <div
                  className="flex flex-wrap gap-2 mb-10"
                  aria-label="Estados atendidos"
                >
                  {estadosPrefeitura.map((e) => (
                    <BadgeEstado key={e.sigla} sigla={e.sigla} nome={e.nome} />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Solicitar orçamento via WhatsApp para Regularização junto à Prefeitura"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                    style={{
                      backgroundColor: "var(--color-service-accent)",
                      ["--tw-ring-color" as string]: "var(--color-service-accent)",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
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

              <aside
                aria-label="Órgãos municipais atendidos"
                className="hidden lg:flex flex-col gap-3 min-w-[220px]"
              >
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Órgãos reguladores
                </p>
                {prefeitura.orgaos.map((orgao) => (
                  <div
                    key={orgao}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8"
                  >
                    <span className="text-sm font-semibold text-white font-mono">
                      {orgao}
                    </span>
                  </div>
                ))}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-3 mb-1">
                  Estados atendidos
                </p>
                {estadosPrefeitura.map((e) => (
                  <div
                    key={e.sigla}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8"
                  >
                    <span className="text-sm font-semibold text-white font-mono">
                      {e.sigla}
                    </span>
                    <span className="text-xs text-neutral-400">{e.nome}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ── ESCOPO ────────────────────────────────────────── */}
        <section
          aria-labelledby="incluido-titulo"
          className="bg-white py-20 md:py-28"
        >
          <div className="container-site">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
                  style={{ color: "var(--color-service-accent)" }}
                >
                  Escopo do serviço
                </p>
                <h2
                  id="incluido-titulo"
                  className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-6"
                >
                  O que está incluído na regularização junto à Prefeitura
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  A Central de Soluções conduz todo o processo de regularização: do diagnóstico inicial à entrega do documento final pela Prefeitura. Elaboramos o projeto legal, obtemos a ART e acompanhamos a análise na Secretaria Municipal.
                </p>
                <ul className="flex flex-col gap-4" aria-label="Itens incluídos">
                  {prefeitura.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconeCheck />
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                  Tipos de imóvel atendidos
                </p>
                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8"
                  aria-label="Tipos de imóvel atendidos"
                >
                  {[
                    "Residências e sobrados",
                    "Galpões industriais",
                    "Estabelecimentos comerciais",
                    "Edifícios multifamiliares",
                    "Imóveis rurais",
                    "Condomínios",
                    "Lotes urbanos",
                    "Obras de infraestrutura",
                  ].map((tipo) => (
                    <li
                      key={tipo}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 text-sm text-neutral-700"
                    >
                      <IconeChevron />
                      {tipo}
                    </li>
                  ))}
                </ul>

                <div className="p-5 rounded-xl bg-neutral-900 border border-white/10">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                    Base normativa
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Código de Obras Municipal",
                      "Plano Diretor Municipal",
                      "Lei de Uso e Ocupação do Solo",
                      "Lei Federal 6.766/1979 (Loteamento Urbano)",
                      "ABNT NBR 6492 — Representação de projetos",
                    ].map((norma) => (
                      <li key={norma} className="text-sm text-neutral-200 font-mono">
                        {norma}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFERENCIAIS ─────────────────────────────────────── */}
        <section
          aria-labelledby="diferenciais-titulo"
          className="py-20 md:py-28 border-t border-[#1a3a6b]/15"
          style={{ backgroundColor: "#e8edf5" }}
        >
          <div className="container-site">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
              style={{ color: "var(--color-service-accent)" }}
            >
              Por que a Central de Soluções
            </p>
            <h2
              id="diferenciais-titulo"
              className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-12"
            >
              Experiência em regularização municipal em 4 estados
            </h2>
            <ul
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Diferenciais do serviço de Regularização junto à Prefeitura"
            >
              {diferencialPrefeitura.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 p-6 rounded-xl bg-white border"
                  style={{ borderColor: "rgba(26,58,107,0.15)" }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ color: "var(--color-service-accent)" }}
                    aria-hidden="true"
                  >
                    {item.icone}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-neutral-900 text-base mb-2">
                      {item.titulo}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-titulo"
          className="bg-white py-20 md:py-28 border-t border-neutral-100"
        >
          <div className="container-site max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
              style={{ color: "var(--color-service-accent)" }}
            >
              Perguntas frequentes
            </p>
            <h2
              id="faq-titulo"
              className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-10"
            >
              Tudo sobre Regularização junto à Prefeitura Municipal
            </h2>
            <div className="flex flex-col gap-3">
              {faqJsonLd.mainEntity.map((faq, i) => (
                <FaqItem
                  key={i}
                  pergunta={faq.name}
                  resposta={faq.acceptedAnswer.text}
                  accentColor="var(--color-service-accent)"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-titulo"
          className="relative bg-neutral-950 py-20 md:py-28 border-t border-white/8"
        >
          <CrosshairDecor corner="top-left" size="sm" variant="light" />
          <CrosshairDecor corner="bottom-right" size="lg" variant="light" />
          <div className="container-site text-center max-w-2xl">
            <h2
              id="cta-titulo"
              className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4"
            >
              Precisa regularizar um imóvel junto à Prefeitura?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossa equipe e receba um diagnóstico gratuito sobre as exigências municipais para o seu imóvel em RJ, SP, MG ou ES.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solicitar diagnóstico gratuito via WhatsApp"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                style={{
                  backgroundColor: "var(--color-service-accent)",
                  ["--tw-ring-color" as string]: "var(--color-service-accent)",
                }}
              >
                Solicitar diagnóstico gratuito
              </a>
              <a
                href={`mailto:${contato.email}`}
                aria-label={`Enviar e-mail para ${contato.email}`}
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
