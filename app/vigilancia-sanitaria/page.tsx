// app/vigilancia-sanitaria/page.tsx
// Página de serviço: Vigilância Sanitária — Alvará Sanitário
// Server Component puro — sem "use client".
// Accent: #0d7377 (teal) — cor primária do serviço.

import type { Metadata } from "next";
import Link from "next/link";
import { NavPrimaria } from "@/components/NavPrimaria";
import {
  servicos,
  clientes,
  contato,
  estadosAtuacao,
  getWhatsAppUrl,
} from "@/data/servicos";
import { equipe } from "@/data/equipe";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Alvará Sanitário — Regularização junto à Vigilância Sanitária",
  description:
    "Serviço especializado em obtenção do Alvará Sanitário junto à VISA Municipal e ANVISA nos estados RJ, SP e ES. Elaboração de PGRS, PGRSS, projeto arquitetônico e acompanhamento completo até a emissão.",
  keywords: [
    "alvará sanitário RJ consultoria",
    "alvará sanitário SP consultoria",
    "alvará sanitário ES consultoria",
    "vigilância sanitária VISA regularização",
    "PGRS PGRSS resíduos sólidos saúde",
    "projeto arquitetônico VISA aprovação",
    "licença sanitária clínica comércio",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/vigilancia-sanitaria",
  },
  openGraph: {
    title: "Alvará Sanitário — Central de Soluções",
    description:
      "Regularização junto à Vigilância Sanitária em RJ, SP e ES. Alvará Sanitário para clínicas, comércio, indústria alimentícia e serviços.",
    url: "https://www.centraldesolucoes.eng.br/vigilancia-sanitaria",
    images: [
      {
        url: "/og-vigilancia-sanitaria.jpg",
        width: 1200,
        height: 630,
        alt: "Alvará Sanitário — Central de Soluções",
      },
    ],
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Alvará Sanitário — Legalização junto à Vigilância Sanitária",
  alternateName: "VISA — Vigilância Sanitária Municipal / ANVISA",
  description:
    "Regularização sanitária para obtenção do Alvará Sanitário nos estados do RJ, SP e ES, com elaboração de todos os documentos exigidos pela VISA e acompanhamento completo até a emissão.",
  url: "https://www.centraldesolucoes.eng.br/vigilancia-sanitaria",
  provider: {
    "@type": "ProfessionalService",
    name: "Central de Soluções",
    url: "https://www.centraldesolucoes.eng.br",
    telephone: "+552298112-1315",
  },
  areaServed: [
    { "@type": "State", name: "Rio de Janeiro" },
    { "@type": "State", name: "São Paulo" },
    { "@type": "State", name: "Espírito Santo" },
  ],
  serviceType: "Regularização Sanitária / Alvará Sanitário",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Etapas do serviço de Alvará Sanitário",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Projeto Arquitetônico adequado às normas da VISA" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Projeto de Acessibilidade conforme NBR 9050" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "PGRS — Plano de Gerenciamento de Resíduos Sólidos" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "PGRSS — Plano de Gerenciamento de Resíduos de Serviços de Saúde" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Acompanhamento até emissão do Alvará Sanitário" },
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o Alvará Sanitário?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Alvará Sanitário é o documento emitido pela Vigilância Sanitária Municipal (VISA) ou pela ANVISA que certifica que um estabelecimento atende às normas sanitárias vigentes. É obrigatório para clínicas, farmácias, laboratórios, restaurantes, supermercados, indústrias alimentícias e demais estabelecimentos que lidam com produtos, serviços ou ambientes que possam impactar a saúde pública.",
      },
    },
    {
      "@type": "Question",
      name: "Quais estabelecimentos precisam de Alvará Sanitário?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Precisam de Alvará Sanitário: clínicas médicas e odontológicas, laboratórios, farmácias, drogarias, restaurantes, bares, padarias, supermercados, indústrias de alimentos, hotéis, salões de beleza, creches, academias e qualquer estabelecimento que manipule alimentos, medicamentos ou preste serviços de saúde. A abrangência exata varia conforme a legislação municipal e estadual.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre VISA Municipal e ANVISA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ANVISA (Agência Nacional de Vigilância Sanitária) é o órgão federal que regula medicamentos, alimentos industrializados, cosméticos e equipamentos médicos em nível nacional. A VISA Municipal é o órgão local responsável pela fiscalização de estabelecimentos comerciais, de serviços e de saúde no âmbito do município. Na maioria dos casos, o Alvará Sanitário é emitido pela VISA Municipal, com a ANVISA atuando em registros federais específicos.",
      },
    },
    {
      "@type": "Question",
      name: "O que é o PGRS e o PGRSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O PGRS (Plano de Gerenciamento de Resíduos Sólidos) é exigido pela Lei 12.305/2010 e descreve como o estabelecimento gerencia, armazena e descarta seus resíduos sólidos. O PGRSS (Plano de Gerenciamento de Resíduos de Serviços de Saúde) é específico para serviços de saúde, exigido pela RDC ANVISA 222/2018, e detalha o manejo de resíduos infectantes, químicos e perfurocortantes. Ambos são documentos obrigatórios para a obtenção do Alvará Sanitário em estabelecimentos de saúde.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o prazo para obter o Alvará Sanitário?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O prazo varia conforme o município, o tipo de estabelecimento e o estado de adequação do imóvel. Em média, o processo leva de 30 a 120 dias entre a entrega da documentação completa e a emissão do Alvará. Imóveis que demandam adequações físicas têm prazo maior. A Central de Soluções realiza um diagnóstico inicial para estimar o prazo específico para o seu caso, com elaboração de todos os documentos exigidos pela VISA.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────────────────

const vigilancia = servicos.find((s) => s.id === "vigilancia-sanitaria")!;
const clientesDestaque = clientes.filter((c) => c.destaque);
const estadosVigilancia = estadosAtuacao.filter((e) =>
  vigilancia.estados.includes(e.sigla)
);
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse no serviço de Alvará Sanitário / Vigilância Sanitária. Pode me passar mais informações?"
);

// ─── Componentes internos ─────────────────────────────────────────────────────

function BadgeEstado({ sigla, nome }: { sigla: string; nome: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs font-semibold text-neutral-200 font-mono tracking-wide">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "#0d7377" }}
        aria-hidden="true"
      />
      {sigla} · {nome}
    </span>
  );
}

function IconeClipboard() {
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
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 12 2 2 4-4" />
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
      style={{ color: "#0d7377" }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageVigilanciaSanitaria() {
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

      <main data-service="vigilancia">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-titulo"
          className="relative bg-neutral-950 overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(13,115,119,0.22) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="container-site relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
            {/* Breadcrumb */}
            <nav aria-label="Localização na página" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <li>
                  <Link href="/" className="hover:text-neutral-300 transition-colors">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-neutral-300">
                  Vigilância Sanitária
                </li>
              </ol>
            </nav>

            {/* Badge */}
            <div className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider"
                style={{
                  borderColor: "rgba(13,115,119,0.4)",
                  backgroundColor: "rgba(13,115,119,0.1)",
                  color: "#7dd4d7",
                }}
              >
                <IconeClipboard />
                Legalização · Vigilância Sanitária
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  Alvará Sanitário —{" "}
                  <span style={{ color: "#7dd4d7" }}>regularização completa</span>{" "}
                  junto à Vigilância Sanitária
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {vigilancia.descricao}
                </p>

                <div className="flex flex-wrap gap-2 mb-10" aria-label="Estados atendidos">
                  {estadosVigilancia.map((e) => (
                    <BadgeEstado key={e.sigla} sigla={e.sigla} nome={e.nome} />
                  ))}
                </div>

                {/* CTAs — hover via Tailwind, sem event handlers JS */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0d7377] hover:bg-[#095e62] text-white font-semibold text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7377] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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

              {/* Card lateral */}
              <aside
                aria-label="Órgãos de Vigilância Sanitária atendidos"
                className="hidden lg:flex flex-col gap-3 min-w-[220px]"
              >
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  Órgãos reguladores
                </p>
                {vigilancia.orgaos.map((orgao) => (
                  <div
                    key={orgao}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8"
                  >
                    <span className="text-sm font-semibold text-white font-mono">{orgao}</span>
                  </div>
                ))}
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-3 mb-1">
                  Estados atendidos
                </p>
                {estadosVigilancia.map((e) => (
                  <div
                    key={e.sigla}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8"
                  >
                    <span className="text-sm font-semibold text-white font-mono">{e.sigla}</span>
                    <span className="text-xs text-neutral-400">{e.nome}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
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

        {/* ── ESCOPO ────────────────────────────────────────────────────── */}
        <section aria-labelledby="incluido-titulo" className="bg-white py-20 md:py-28">
          <div className="container-site">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono" style={{ color: "#0d7377" }}>
                  Escopo do serviço
                </p>
                <h2
                  id="incluido-titulo"
                  className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-6"
                >
                  O que está incluído no serviço de Alvará Sanitário
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  A Central de Soluções assume o processo de ponta a ponta: do diagnóstico inicial à entrega do Alvará Sanitário. Elaboramos toda a documentação exigida pela VISA e acompanhamos o processo junto ao órgão competente.
                </p>
                <ul className="flex flex-col gap-4" aria-label="Itens incluídos">
                  {vigilancia.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconeCheck />
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                  Setores prioritários
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8" aria-label="Setores atendidos">
                  {[
                    "Clínicas médicas e odontológicas",
                    "Laboratórios de análises",
                    "Farmácias e drogarias",
                    "Restaurantes e lanchonetes",
                    "Supermercados e mercados",
                    "Indústrias alimentícias",
                    "Salões de beleza",
                    "Creches e escolas",
                  ].map((setor) => (
                    <li
                      key={setor}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 text-sm text-neutral-700"
                    >
                      <IconeChevron />
                      {setor}
                    </li>
                  ))}
                </ul>

                {vigilancia.normaBase && (
                  <div className="p-5 rounded-xl bg-neutral-900 border border-white/10">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                      Base normativa
                    </p>
                    <ul className="flex flex-col gap-2">
                      {vigilancia.normaBase.map((norma) => (
                        <li key={norma} className="text-sm text-neutral-200 font-mono">{norma}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── EQUIPE E-E-A-T ────────────────────────────────────────────── */}
        <section aria-labelledby="equipe-titulo" className="bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono" style={{ color: "#0d7377" }}>
              Responsabilidade técnica real
            </p>
            <h2
              id="equipe-titulo"
              className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-12"
            >
              Profissionais que assinam os projetos e ARTs
            </h2>
            <ul className="grid sm:grid-cols-2 gap-6" aria-label="Equipe técnica responsável">
              {equipe.map((membro) => (
                <li
                  key={membro.slug}
                  className="flex flex-col gap-3 p-6 rounded-xl bg-neutral-900 border border-white/10"
                >
                  <div>
                    <p className="font-heading font-semibold text-white text-lg">{membro.nome}</p>
                    <p className="text-sm mt-0.5" style={{ color: "#7dd4d7" }}>
                      {membro.tituloPrincipal}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-1" aria-label={`Especializações de ${membro.nome}`}>
                    {membro.especializacoes.map((esp) => (
                      <li key={esp} className="text-sm text-neutral-400">{esp}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-titulo" className="bg-white py-20 md:py-28 border-t border-neutral-100">
          <div className="container-site max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono" style={{ color: "#0d7377" }}>
              Perguntas frequentes
            </p>
            <h2
              id="faq-titulo"
              className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-10"
            >
              Tudo sobre Alvará Sanitário e Vigilância Sanitária
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
        <section aria-labelledby="cta-titulo" className="bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <div className="container-site text-center max-w-2xl">
            <h2
              id="cta-titulo"
              className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4"
            >
              Precisa do Alvará Sanitário?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossa equipe e receba um diagnóstico gratuito sobre as exigências da Vigilância Sanitária para o seu estabelecimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#0d7377] hover:bg-[#095e62] text-white font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d7377] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
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
