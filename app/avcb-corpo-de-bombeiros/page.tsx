// app/avcb-corpo-de-bombeiros/page.tsx
// Página de serviço: AVCB / CLCB — Corpo de Bombeiros
// Server Component puro — sem "use client".
// Accent: #800000 (vinho) — cor primária da marca.

import type { Metadata } from "next";
import Link from "next/link";
import { NavPrimaria } from "@/components/NavPrimaria";
import { CrosshairDecor } from "@/components/CrosshairDecor";
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
  title: "AVCB e CLCB — Regularização junto ao Corpo de Bombeiros",
  description:
    "Serviço especializado em obtenção do AVCB (Auto de Vistoria do Corpo de Bombeiros) e CLCB nos estados RJ, SP, MG e ES. Engenheiros com ART. Atendemos galpões, indústrias, comércio e telecom.",
  keywords: [
    "AVCB corpo de bombeiros",
    "CLCB certificado licença",
    "regularização corpo de bombeiros RJ SP MG ES",
    "auto de vistoria corpo de bombeiros",
    "avcb galpão industrial",
    "engenharia segurança incêndio",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/avcb-corpo-de-bombeiros",
  },
  openGraph: {
    title: "AVCB e CLCB — Central de Soluções",
    description:
      "Regularização junto ao Corpo de Bombeiros em RJ, SP, MG e ES. AVCB e CLCB para galpões, indústrias e comércio.",
    url: "https://www.centraldesolucoes.eng.br/avcb-corpo-de-bombeiros",
    images: [{ url: "/og-avcb.jpg", width: 1200, height: 630, alt: "AVCB — Central de Soluções" }],
  },
};

// ─── JSON-LD ────────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AVCB — Auto de Vistoria do Corpo de Bombeiros",
  alternateName: "CLCB — Certificado de Licença do Corpo de Bombeiros",
  description:
    "Regularização junto ao Corpo de Bombeiros estadual para obtenção do AVCB ou CLCB, com acompanhamento completo até a emissão do certificado. Atendemos RJ, SP, MG e ES.",
  url: "https://www.centraldesolucoes.eng.br/avcb-corpo-de-bombeiros",
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
  serviceType: "Regularização de Segurança Contra Incêndio e Pânico",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Etapas do serviço AVCB",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Levantamento das exigências do CB estadual" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elaboração do Laudo de Exigências" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Execução das adequações necessárias" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acompanhamento da vistoria até emissão do AVCB" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O AVCB (Auto de Vistoria do Corpo de Bombeiros) é o documento emitido pelo Corpo de Bombeiros estadual que certifica que um imóvel atende às normas de segurança contra incêndio e pânico. É obrigatório para a maioria dos imóveis comerciais, industriais e de serviços.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre AVCB e CLCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O AVCB (Auto de Vistoria) é emitido após vistoria presencial do Corpo de Bombeiros, geralmente para imóveis maiores ou de maior risco. O CLCB (Certificado de Licença) é uma modalidade simplificada para imóveis de baixo risco ou menor área, geralmente emitido sem vistoria presencial, mediante análise documental.",
      },
    },
    {
      "@type": "Question",
      name: "Quais imóveis precisam de AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Galpões logísticos, indústrias, comércio em geral, depósitos, escolas, igrejas, torres de telecomunicações e usinas fotovoltaicas são os principais casos. A obrigatoriedade e o tipo de certificado (AVCB ou CLCB) depende da área, da ocupação e do estado — cada Corpo de Bombeiros estadual tem suas próprias Instruções Técnicas (ITs).",
      },
    },
    {
      "@type": "Question",
      name: "Qual o prazo para obter o AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O prazo varia conforme o estado e a complexidade das adequações necessárias. Em média, o processo leva de 60 a 180 dias entre o início das adequações e a emissão do certificado. Imóveis que já estão adequados às normas têm prazo menor. A Central de Soluções realiza um diagnóstico inicial gratuito para estimar o prazo no seu caso específico.",
      },
    },
    {
      "@type": "Question",
      name: "A Central de Soluções atende em quais estados?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atendemos Rio de Janeiro (CBMERJ), São Paulo (CBPMESP), Minas Gerais (CBMMG) e Espírito Santo (CBMES). Cada estado tem suas próprias Instruções Técnicas e nossos engenheiros são especializados nos processos de cada Corpo de Bombeiros.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────────────────────

const avcb = servicos.find((s) => s.id === "avcb")!;
const clientesDestaque = clientes.filter((c) => c.destaque);
const estadosAVCB = estadosAtuacao.filter((e) =>
  avcb.estados.includes(e.sigla)
);
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse no serviço de AVCB / CLCB. Pode me passar mais informações?"
);

// ─── Componentes internos ────────────────────────────────────────────────────────────────

function BadgeEstado({ sigla, nome }: { sigla: string; nome: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs font-semibold text-neutral-200 font-mono tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-[#800000]" aria-hidden="true" />
      {sigla} · {nome}
    </span>
  );
}

function IconeShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#800000] mt-0.5">
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

// ─── Page ────────────────────────────────────────────────────────────────────────────────

export default function PageAVCB() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <NavPrimaria />

      <main data-service="avcb">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-titulo"
          className="relative bg-neutral-950 overflow-hidden"
        >
          {/* Gradiente cinemático */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(128,0,0,0.22) 0%, transparent 70%)",
            }}
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
                <li aria-current="page" className="text-neutral-300">AVCB / CLCB</li>
              </ol>
            </nav>

            {/* Badge de categoria */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#800000]/40 bg-[#800000]/10 text-xs font-semibold text-[#ef9999] uppercase tracking-wider">
                <IconeShield />
                Legalização · Corpo de Bombeiros
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  AVCB e CLCB —{" "}
                  <span className="text-[#ef9999]">regularização completa</span>{" "}
                  junto ao Corpo de Bombeiros
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {avcb.descricao}
                </p>

                {/* Estados */}
                <div className="flex flex-wrap gap-2 mb-10" aria-label="Estados atendidos">
                  {estadosAVCB.map((e) => (
                    <BadgeEstado key={e.sigla} sigla={e.sigla} nome={e.nome} />
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#800000] hover:bg-[#4f0101] text-white font-semibold text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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
                aria-label="Órgãos estaduais atendidos"
                className="hidden lg:flex flex-col gap-3 min-w-[220px]"
              >
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Corpos de Bombeiros</p>
                {estadosAVCB.map((e) => (
                  <div
                    key={e.sigla}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8"
                  >
                    <span className="text-sm font-semibold text-white font-mono">{e.siglaCB}</span>
                    <span className="text-xs text-neutral-400">{e.nome}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ───────────────────────────────────────────────────── */}
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

        {/* ── O QUE ESTÁ INCLUÍDO ────────────────────────────────────────────── */}
        <section
          aria-labelledby="incluido-titulo"
          className="bg-white py-20 md:py-28"
        >
          <div className="container-site">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div>
                <p className="text-xs font-semibold text-[#800000] uppercase tracking-wider mb-3 font-mono">Escopo do serviço</p>
                <h2
                  id="incluido-titulo"
                  className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-6"
                >
                  O que está incluído no serviço de AVCB
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  A Central de Soluções assume o processo de ponta a ponta: do diagnóstico inicial até a entrega do certificado. Nenhuma etapa fica a cargo do cliente.
                </p>
                <ul className="flex flex-col gap-4" aria-label="Etapas incluídas">
                  {avcb.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconeCheck />
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Setores */}
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Setores prioritários</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label="Setores atendidos">
                  {avcb.setoresPrioritarios?.map((setor) => (
                    <li
                      key={setor}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 text-sm text-neutral-700"
                    >
                      <IconeChevron />
                      {setor}
                    </li>
                  ))}
                </ul>

                {/* Normas */}
                {avcb.normaBase && (
                  <div className="mt-8 p-5 rounded-xl bg-neutral-900 border border-white/10">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Base normativa</p>
                    <ul className="flex flex-col gap-2">
                      {avcb.normaBase.map((norma) => (
                        <li key={norma} className="text-sm text-neutral-200 font-mono">
                          {norma}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── EQUIPE TÉCNICA (E-E-A-T) ──────────────────────────────────────────── */}
        <section
          aria-labelledby="equipe-titulo"
          className="relative bg-neutral-950 py-20 md:py-28 border-t border-white/8"
        >
          <CrosshairDecor corner="bottom-right" size="md" variant="light" />
          <div className="container-site">
            <p className="text-xs font-semibold text-[#800000] uppercase tracking-wider mb-3 font-mono">Responsabilidade técnica real</p>
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
                    <p className="text-sm text-[#ef9999] mt-0.5">{membro.formacao}</p>
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
        <section
          aria-labelledby="faq-titulo"
          className="bg-white py-20 md:py-28 border-t border-neutral-100"
        >
          <div className="container-site max-w-3xl">
            <p className="text-xs font-semibold text-[#800000] uppercase tracking-wider mb-3 font-mono">Perguntas frequentes</p>
            <h2
              id="faq-titulo"
              className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-10"
            >
              Tudo sobre AVCB e CLCB
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

        {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
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
              Precisa do AVCB ou CLCB?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossos engenheiros e receba um diagnóstico gratuito sobre as exigências do Corpo de Bombeiros para o seu imóvel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#800000] hover:bg-[#4f0101] text-white font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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
