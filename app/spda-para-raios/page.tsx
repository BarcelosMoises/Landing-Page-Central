// app/spda-para-raios/page.tsx
// Página de serviço: SPDA — Sistema de Proteção contra Descargas Atmosféricas
// Server Component puro — sem "use client".

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NavPrimaria } from "@/components/NavPrimaria";
import { FaqItem } from "@/components/FaqItem";
import {
  servicos,
  contato,
  getWhatsAppUrl,
} from "@/data/servicos";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "SPDA Para-raios — Projeto, Instalação e Laudo Técnico | Central de Soluções",
  description:
    "Projeto, instalação e laudo técnico de SPDA (para-raios) conforme ABNT NBR 5419, com ART assinada. Atendemos usinas fotovoltaicas, torres de telecomunicações, subestações e indústrias em todo o Brasil.",
  keywords: [
    "SPDA para-raios projeto",
    "laudo técnico SPDA NBR 5419",
    "instalação para-raios ART",
    "SPDA usina fotovoltaica",
    "SPDA torre telecomunicações",
    "proteção descargas atmosféricas RJ SP MG ES",
    "SPDA todo Brasil cobertura nacional",
  ],
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br/spda-para-raios",
  },
  openGraph: {
    title: "SPDA Para-raios — Central de Soluções",
    description:
      "Projeto, instalação e laudo técnico de SPDA conforme ABNT NBR 5419, com ART. Cobertura em todo o Brasil.",
    url: "https://www.centraldesolucoes.eng.br/spda-para-raios",
    images: [{ url: "/og-spda.jpg", width: 1200, height: 630, alt: "SPDA Para-raios — Central de Soluções" }],
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SPDA — Sistema de Proteção contra Descargas Atmosféricas",
  alternateName: "Para-raios",
  description:
    "Projeto, instalação e laudo técnico de SPDA (para-raios) conforme ABNT NBR 5419, com ART assinada e cobertura em todo o Brasil.",
  url: "https://www.centraldesolucoes.eng.br/spda-para-raios",
  provider: {
    "@type": "ProfessionalService",
    name: "Central de Soluções",
    url: "https://www.centraldesolucoes.eng.br",
    telephone: "+552298112-1315",
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType: "Proteção contra Descargas Atmosféricas",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Etapas do serviço SPDA",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto SPDA conforme ABNT NBR 5419" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laudo técnico com ART" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inspeção anual e teste de continuidade" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Atendimento em todo o Brasil" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é o SPDA e para que serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O SPDA (Sistema de Proteção contra Descargas Atmosféricas), popularmente conhecido como para-raios, é um conjunto de dispositivos e instalações projetados para interceptar raios e conduzir a corrente elétrica de forma segura até o solo, protegendo edificações, equipamentos e pessoas. É dimensionado conforme a norma ABNT NBR 5419 e exige ART de engenheiro responsável.",
      },
    },
    {
      "@type": "Question",
      name: "Quais estruturas são obrigadas a ter SPDA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usinas fotovoltaicas, torres de telecomunicações, subestações elétricas, indústrias, galpões de grande porte, estruturas em áreas rurais e edificações com alto risco de descarga atmosférica são as principais. A obrigatoriedade é definida pela análise de risco prevista na ABNT NBR 5419, que leva em conta a localização geográfica, o nível cerâunico da região, a altura da estrutura e o tipo de ocupação.",
      },
    },
    {
      "@type": "Question",
      name: "O SPDA exige ART? Quem pode assinar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Todo projeto e laudo técnico de SPDA deve ser elaborado por engenheiro habilitado junto ao CREA e acompanhado de ART (Anotação de Responsabilidade Técnica). A Central de Soluções conta com engenheiros registrados no CREA que assinam as ARTs diretamente, sem intermediários, garantindo validade jurídica e técnica ao documento.",
      },
    },
    {
      "@type": "Question",
      name: "Com que frequência o SPDA precisa ser inspecionado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ABNT NBR 5419 recomenda inspeção periódica anual do sistema instalado, incluindo teste de continuidade e verificação da resistência de aterramento. Em estruturas de alto risco — como torres de telecomunicações e subestações — a inspeção semestral é recomendada. A Central de Soluções oferece o serviço de inspeção anual com emissão de relatório técnico e ART.",
      },
    },
    {
      "@type": "Question",
      name: "A Central de Soluções atende SPDA fora do Sudeste?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. O serviço de SPDA tem cobertura em todo o Brasil. Para projetos e laudos técnicos em estados fora de RJ, SP, MG e ES, o atendimento é realizado por deslocamento de equipe técnica ou por análise remota de documentação, conforme a complexidade do projeto. Entre em contato para avaliar as condições de atendimento no seu estado.",
      },
    },
    {
      "@type": "Question",
      name: "O que são as zonas de proteção da NBR 5419?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ABNT NBR 5419 define zonas de proteção contra raios (LPZ — Lightning Protection Zones) que classificam as áreas de uma estrutura conforme o nível de risco e a intensidade da corrente de raio esperada. A LPZ 0A é a zona exposta diretamente aos impactos e ao campo eletromagnético total; a LPZ 0B é protegida contra impactos diretos mas exposta ao campo; as LPZ 1, 2 e seguintes são zonas internas com níveis crescentes de atenuação. O projeto do SPDA define as medidas de proteção necessárias em cada zona, incluindo o sistema de captores, descidas, aterramento e os DPS (Dispositivos de Proteção contra Surtos) nas fronteiras entre zonas.",
      },
    },
  ],
};

// ─── Dados locais ─────────────────────────────────────────────────────────────────

const spda = servicos.find((s) => s.id === "spda")!;
const whatsappUrl = getWhatsAppUrl(
  "Olá! Tenho interesse no serviço de SPDA / Para-raios. Pode me passar mais informações?"
);

// ─── Componentes internos ────────────────────────────────────────────────────────────────

function IconeZap() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-neutral-400">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────────────

export default function PageSPDA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <NavPrimaria />

      <main data-service="laudos">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-titulo" className="relative bg-neutral-950 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(146,97,10,0.22) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="container-site relative z-10 pt-24 pb-20 md:pt-32 md:pb-28">
            <nav aria-label="Localização na página" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <li><Link href="/" className="hover:text-neutral-300 transition-colors">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-neutral-300">SPDA / Para-raios</li>
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
                <IconeZap />
                Instalação · Proteção Atmosférica
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
              <div className="max-w-2xl">
                <h1
                  id="hero-titulo"
                  className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6"
                >
                  SPDA Para-raios —{" "}
                  <span style={{ color: "var(--color-service-accent-light)" }}>projeto, instalação</span>{" "}
                  e laudo técnico com ART
                </h1>
                <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {spda.descricao}
                </p>

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
            </div>
          </div>
        </section>

        {/* ── O QUE ESTÁ INCLUÍDO ───────────────────────────────────────────── */}
        <section aria-labelledby="incluido-titulo" className="bg-white py-20 md:py-28">
          <div className="container-site">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3 font-mono"
                  style={{ color: "var(--color-service-accent)" }}
                >
                  Escopo do serviço
                </p>
                <h2 id="incluido-titulo" className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl leading-tight mb-6">
                  O que está incluído no serviço de SPDA
                </h2>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  A Central de Soluções entrega o projeto completo, executa a instalação e emite o laudo técnico com ART — tudo em conformidade com a ABNT NBR 5419 e com cobertura em todo o território nacional.
                </p>
                <ul className="flex flex-col gap-4" aria-label="Etapas incluídas">
                  {spda.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconeCheck />
                      <span className="text-neutral-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <Image
                    src="/images/placeholder-setores.svg"
                    alt="Setores atendidos pela Central de Soluções — SPDA"
                    fill
                    className="object-cover"
                  />
                </div>

                {spda.normaBase && (
                  <div className="mt-8 p-5 rounded-xl bg-neutral-900 border border-white/10">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">Base normativa</p>
                    <ul className="flex flex-col gap-2">
                      {spda.normaBase.map((norma) => (
                        <li key={norma} className="text-sm text-neutral-200 font-mono">{norma}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div
                  className="mt-6 p-5 rounded-xl border"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-service-accent) 8%, transparent)",
                    borderColor: "color-mix(in srgb, var(--color-service-accent) 22%, transparent)",
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2 font-mono"
                    style={{ color: "var(--color-service-accent)" }}
                  >
                    Cobertura
                  </p>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Atendimento em <strong>todo o Brasil</strong>. Para projetos fora do Sudeste, realizamos deslocamento de equipe técnica ou análise remota conforme a complexidade.
                  </p>
                </div>
              </div>
            </div>
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
              Tudo sobre SPDA e Para-raios
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
        <section aria-labelledby="cta-titulo" className="bg-neutral-950 py-20 md:py-28 border-t border-white/8">
          <div className="container-site text-center max-w-2xl">
            <h2 id="cta-titulo" className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4">
              Precisa de projeto ou laudo de SPDA?
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              Fale com nossos engenheiros e receba um diagnóstico gratuito para o seu projeto de SPDA — atendemos em todo o Brasil.
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
