// app/licenciamento-ambiental/page.tsx
// Página de serviço: Licenciamento Ambiental
// Server Component puro — sem "use client".

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
import { equipe } from "@/data/equipe";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Licenciamento Ambiental RJ SP MG ES — Consultoria completa LP LI LO",
  description:
    "Consultoria em licenciamento ambiental nos estados RJ, SP, MG e ES: LP, LI, LO e LAS junto ao INEA, CETESB, SUPRAM/SEMAD e IEMA. Engenheiros com ART. Postos de combustível, indústrias e agronegócio.",
  keywords: [
    "licenciamento ambiental RJ consultoria",
    "licenciamento ambiental SP consultoria",
    "licenciamento ambiental MG consultoria",
    "licença ambiental INEA CETESB SUPRAM IEMA",
    "LP LI LO licença prévia instalação operação",
    "licença ambiental simplificada LAS",
    "regularização ambiental indústria posto combustível",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/licenciamento-ambiental",
  },
  openGraph: {
    title: "Licenciamento Ambiental RJ SP MG ES — Central de Soluções",
    description:
      "Licenciamento Ambiental em RJ, SP, MG e ES. LP, LI, LO e LAS para indústrias, postos de combustível, agronegócio e telecomunicações.",
    url: "https://www.centraldesolucoes.eng.br/licenciamento-ambiental",
    images: [
      {
        url: "/og-licenciamento-ambiental.jpg",
        width: 1200,
        height: 630,
        alt: "Licenciamento Ambiental — Central de Soluções",
      },
    ],
  },
};

// ─── JSON-LD ────────────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Licenciamento Ambiental — LP, LI, LO e LAS",
  alternateName: "Regularização Ambiental / Licença Ambiental",
  description:
    "Licenciamento ambiental para regularização de atividades com impacto ambiental junto ao INEA (RJ), CETESB (SP), SUPRAM/SEMAD (MG) e IEMA (ES), com acompanhamento completo em todas as etapas.",
  url: "https://www.centraldesolucoes.eng.br/licenciamento-ambiental",
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
  serviceType: "Licenciamento Ambiental",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Modalidades de Licenciamento Ambiental",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LP — Licença Prévia" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LI — Licença de Instalação" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LO — Licença de Operação" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LAS — Licença Ambiental Simplificada" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o Licenciamento Ambiental e quando é obrigatório?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Licenciamento Ambiental é o procedimento administrativo pelo qual o órgão ambiental competente — federal, estadual ou municipal — avalia e autoriza a localização, instalação, ampliação e operação de empreendimentos e atividades que utilizam recursos ambientais ou que possam causar impacto ao meio ambiente. É obrigatório pela Lei nº 6.938/1981 (Política Nacional do Meio Ambiente) e regulamentado pela Resolução CONAMA 237/1997. Atividades como postos de combustível, indústrias, mineração, agronegócio e telecomunicações estão sujeitas ao licenciamento.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre LP, LI e LO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O processo de licenciamento ambiental é dividido em três etapas: a LP (Licença Prévia) aprova a concepção e viabilidade ambiental do empreendimento na fase de planejamento. A LI (Licença de Instalação) autoriza o início das obras e instalações. A LO (Licença de Operação) autoriza o início das atividades após a conclusão das obras, confirmando que todas as condicionantes foram atendidas. Cada licença tem prazo de validade definido pelo órgão licenciador.",
      },
    },
    {
      "@type": "Question",
      name: "O que é a Licença Ambiental Simplificada (LAS)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A LAS (Licença Ambiental Simplificada) é uma modalidade para atividades de menor potencial de impacto ambiental, que condensa as fases de LP, LI e LO em um único procedimento simplificado. É mais ágil e menos onerosa que o licenciamento trifásico, sendo aplicável a empreendimentos como pequenos postos de combustível, estabelecimentos comerciais e torres de telecomunicações, conforme critérios definidos pela legislação de cada estado.",
      },
    },
    {
      "@type": "Question",
      name: "Quais atividades precisam de Licenciamento Ambiental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "São sujeitas ao licenciamento ambiental as atividades potencialmente poluidoras ou que utilizam recursos ambientais, conforme listadas na Resolução CONAMA 237/1997 e na legislação estadual. Incluem: postos de combustível, indústrias, mineração, agronegócio, torres de telecomunicações, usinas fotovoltaicas, subestações elétricas, galpões com armazenamento de produtos perigosos, entre outras. A obrigatoriedade e o órgão competente variam conforme o porte e a natureza do empreendimento.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o órgão ambiental responsável em RJ, SP, MG e ES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cada estado possui seu próprio órgão ambiental licenciador: no Rio de Janeiro, o INEA (Instituto Estadual do Ambiente); em São Paulo, a CETESB (Companhia Ambiental do Estado de São Paulo); em Minas Gerais, a SUPRAM subordinada à SEMAD (Secretaria de Estado de Meio Ambiente e Desenvolvimento Sustentável); no Espírito Santo, o IEMA (Instituto Estadual de Meio Ambiente e Recursos Hídricos). A Central de Soluções possui equipe especializada nos processos e exigências de cada um desses órgãos.",
      },
    },
    {
      "@type": "Question",
      name: "O que é o EIA e o RIMA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O EIA (Estudo de Impacto Ambiental) é o documento técnico que avalia os impactos ambientais de um empreendimento ou atividade de significativo potencial poluidor, sendo exigido como condição para a obtenção da Licença Prévia (LP) nesses casos. Ele analisa o meio físico, biótico e sócio-econômico, identifica os impactos e propõe medidas mitigadoras e compensatórias. O RIMA (Relatório de Impacto Ambiental) é o resumo do EIA elaborado em linguagem acessível ao público, sendo documento obrigatório quando há audiência pública no processo de licenciamento. Para empreendimentos de menor impacto, o EIA pode ser substituído por estudos simplificados, como o RAS (Relatório Ambiental Simplificado) ou o PCA (Plano de Controle Ambiental), conforme a legislação do estado.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────────────────────

const ambiental = servicos.find((s) => s.id === "licenciamento-ambiental")!;
const estadosAmbiental = estadosAtuacao.filter((e) =>
  ambiental.estados.includes(e.sigla)
);
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse no serviço de Licenciamento Ambiental. Pode me passar mais informações?"
);

// ─── Componentes internos ────────────────────────────────────────────────────────────────

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

function IconeLeaf() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-neutral-400">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconeWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────────────

export default function PageLicenciamentoAmbiental() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <NavPrimaria />

      <main data-service="ambiental">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-titulo" className="relative bg-neutral-950 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(45,106,45,0.22) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          {/* Vídeo de fundo */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          >
            <source src="/videos/ambiental.mp4" type="video/mp4" />
          </video>
          <CrosshairDecor corner="top-right" size="lg" variant="light" />
          <CrosshairDecor corner="bottom-left" size="sm" variant="light" />

          <div className="container-site relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
            <nav aria-label="Localização na página" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <li><Link href="/" className="hover:text-neutral-300 transition-colors">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-neutral-300">Licenciamento Ambiental</li>
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
                <IconeLeaf />
                Legalização · Licenciamento Ambiental
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  Licenciamento Ambiental —{" "}
                  <span style={{ color: "var(--color-service-accent-light)" }}>LP, LI, LO e LAS</span>{" "}
                  em RJ, SP, MG e ES
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {ambiental.descricao}
                </p>

                <div className="flex flex-wrap gap-2 mb-10" aria-label="Estados atendidos">
                  {estadosAmbiental.map((e) => (
                    <BadgeEstado key={e.sigla} sigla={e.sigla} nome={e.nome} />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                    style={{
                      backgroundColor: "var(--color-service-accent)",
                      ["--tw-ring-color" as string]: "var(--color-service-accent)",
                    }}
                  >
                    <IconeWhatsApp />
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

              <aside aria-label="Órgãos ambientais licenciadores" className="hidden lg:flex flex-col gap-3 min-w-[252px]">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1 font-mono">Órgãos licenciadores</p>
                {estadosAmbiental.map((e) => (
                  <div key={e.sigla} className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-neutral-900 border border-white/8">
                    <span className="text-sm font-semibold text-white font-mono">{e.orgaoAmbiental}</span>
                    <span className="text-xs text-neutral-400">{e.sigla}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ── ESCOPO DO SERVIÇO ──────────────────────────────────────────────────── */}
        <section aria-labelledby="escopo-titulo" className="bg-white py-20 md:py-28">
          <div className="container-site">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
                  style={{ color: "var(--color-service-accent)" }}
                >
                  Escopo do serviço
                </p>
                <h2 id="escopo-titulo" className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-6">
                  Modalidades de Licenciamento Ambiental
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  A Central de Soluções conduz o processo de licenciamento de ponta a ponta: diagnóstico da atividade, definição da modalidade aplicável, elaboração dos estudos ambientais e acompanhamento junto ao órgão licenciador até a emissão da licença.
                </p>
                <ul className="flex flex-col gap-4" aria-label="Modalidades incluídas no serviço">
                  {ambiental.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconeCheck />
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Setores prioritários</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8" aria-label="Setores atendidos pelo licenciamento ambiental">
                  {ambiental.setoresPrioritarios?.map((setor) => (
                    <li key={setor} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 text-sm text-neutral-700">
                      <IconeChevron />
                      {setor}
                    </li>
                  ))}
                </ul>

                {ambiental.normaBase && (
                  <div className="p-5 rounded-xl bg-neutral-900 border border-white/10">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Base normativa</p>
                    <ul className="flex flex-col gap-2">
                      {ambiental.normaBase.map((norma) => (
                        <li key={norma} className="text-sm text-neutral-200 font-mono">{norma}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── EQUIPE TÉCNICA (E-E-A-T) ─────────────────────────────────────────── */}
        <section aria-labelledby="equipe-titulo" className="relative bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <CrosshairDecor corner="bottom-right" size="md" variant="light" />
          <div className="container-site">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
              style={{ color: "var(--color-service-accent-light)" }}
            >
              Responsabilidade técnica real
            </p>
            <h2 id="equipe-titulo" className="font-heading font-bold text-white text-3xl md:text-4xl leading-tight mb-12">
              Engenheiros que conduzem o processo
            </h2>
            <ul className="grid sm:grid-cols-2 gap-6" aria-label="Equipe técnica responsável pelo licenciamento ambiental">
              {equipe.map((membro) => (
                <li key={membro.slug} className="flex flex-col gap-3 p-6 rounded-xl bg-neutral-900 border border-white/10">
                  <div>
                    <p className="font-heading font-semibold text-white text-lg">{membro.nome}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--color-service-accent-light)" }}>
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

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-titulo" className="bg-white py-20 md:py-28 border-t border-neutral-100">
          <div className="container-site max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
              style={{ color: "var(--color-service-accent)" }}
            >
              Perguntas frequentes
            </p>
            <h2 id="faq-titulo" className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-10">
              Tudo sobre Licenciamento Ambiental
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

        {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="cta-titulo" className="relative bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <CrosshairDecor corner="top-left" size="sm" variant="light" />
          <CrosshairDecor corner="bottom-right" size="lg" variant="light" />
          <div className="container-site text-center max-w-2xl">
            <h2 id="cta-titulo" className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4">
              Precisa de Licença Ambiental?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossos engenheiros e receba um diagnóstico gratuito sobre a modalidade de licenciamento aplicável à sua atividade e o órgão competente em seu estado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
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
