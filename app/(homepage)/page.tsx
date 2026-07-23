import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { NavPrimaria } from "@/components/NavPrimaria";
import { CrosshairDecor } from "@/components/CrosshairDecor";
import { ServicosTabs } from "@/components/ServicosTabs";
import { MetricasEmpresa } from "@/components/MetricasEmpresa";
import { TrustBar } from "@/components/TrustBar";
import { SetoresAtendidos } from "@/components/SetoresAtendidos";
import { MapaAtuacao } from "@/components/MapaAtuacao";
import { Glossario } from "@/components/Glossario";
import { FormularioContato } from "@/components/FormularioContato";
import {
  getServicosPorCategoria,
  getWhatsAppUrl,
  contato,
} from "@/data/servicos";

// ─── Metadata ──────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Central de Soluções — AVCB, SPDA, Laudos e Licenciamento | RJ, SP, MG, ES",
  description:
    "Empresa de engenharia civil especializada em regularização: AVCB, SPDA, Vigilância Sanitária e Licenciamento Ambiental em RJ, SP, MG e ES. Engenheiros com ART. Clientes: Claro, Ambev, Mercado Livre.",
  keywords: [
    "regularização engenharia civil",
    "empresa de engenharia civil RJ SP MG ES",
    "AVCB SPDA laudo técnico licenciamento ambiental",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Central de Soluções",
    title:
      "Central de Soluções — AVCB, SPDA, Laudos e Licenciamento | RJ, SP, MG, ES",
    description:
      "Empresa de engenharia civil especializada em regularização: AVCB, SPDA, Vigilância Sanitária e Licenciamento Ambiental em RJ, SP, MG e ES. Engenheiros com ART. Clientes: Claro, Ambev, Mercado Livre.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Central de Soluções — Engenharia Civil e Regularização em RJ, SP, MG e ES",
      },
    ],
  },
};

// ─── JSON-LD WebSite ─────────────────────────────────────────────────────────────────────────
// LocalBusiness já está no layout.tsx — não duplicar aqui.

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Central de Soluções",
  url: "https://www.centraldesolucoes.eng.br",
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.centraldesolucoes.eng.br/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Dados das tabs ─────────────────────────────────────────────────────────────────────
const servicosLegalizacao = getServicosPorCategoria("legalizacao");
const servicosProjetos = getServicosPorCategoria("projeto").filter((s) => s.exibirNaTabs !== false);
const servicosLaudos = [
  ...getServicosPorCategoria("laudo"),
  ...getServicosPorCategoria("instalacao"),
];

const PILARES_HERO = [
  {
    label: "Legalizações",
    descricao: "AVCB, Alvará Sanitário, Licenciamento Ambiental",
    href: "#servicos",
  },
  {
    label: "Projetos Técnicos",
    descricao: "Incêndio, VISA, Hidráulico, Acessibilidade, PGRS",
    href: "#servicos",
  },
  {
    label: "Laudos Técnicos",
    descricao: "SPDA, Aterramento, Continuidade, Exigências",
    href: "#servicos",
  },
] as const;

const whatsappHero = getWhatsAppUrl(
  "Olá! Vim pelo site da Central de Soluções e gostaria de um orçamento."
);

// ─── Page ───────────────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <NavPrimaria />

      <main
        id="conteudo-principal"
        aria-label="Página inicial da Central de Soluções"
      >
        {/* ───────────────────────────────────────────────────────────────────
            1. HERO
        ───────────────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="relative min-h-[90vh] flex items-center"
        >
          {/* Vídeo de fundo */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            poster="/images/portfolio/hero-industrial.jpg"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/*
            Overlay duplo para garantir contraste uniforme em qualquer frame do vídeo:

            Camada 1 — base fixa escura (bg-black/55):
              Piso de contraste que não depende do conteúdo do vídeo.
              Garante que frames claros/brancos não "apaguem" o texto.

            Camada 2 — gradiente direcional vinho:
              Mantém a identidade cromática da marca (vinho #4f0101) no topo,
              e reforça o escurecimento na base (onde ficam os cards dos pilares)
              com `to-[#0a0000]/80` — subindo de /60 para /80.

            Resultado: texto branco sobre fundo efetivo ≈ #0d0000 → contraste > 10:1 (WCAG AAA).
          */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#4f0101]/75 to-[#0a0000]/80"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

            <p className="inline-flex items-center gap-2 mb-6">
              <span
                style={{
                  backgroundColor: "color-mix(in srgb, #800000 18%, transparent)",
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
              >
                CORPO DE BOMBEIROS · VIGILÂNCIA SANITÁRIA · PREFEITURAS · ÓRGÃOS AMBIENTAIS
              </span>
            </p>

            <h1
              id="hero-heading"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 max-w-3xl"
            >
              Regularização de{" "}
              <span style={{ color: "#a30000" }} className="italic">
                Engenharia
              </span>{" "}
              para sua Empresa
            </h1>

            {/* text-white/90: contraste ≥ 4.5:1 mesmo sobre frames claros do vídeo ✓ WCAG AA */}
            <p
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              className="text-lg md:text-xl text-white/90 font-medium mb-3 max-w-2xl"
            >
              Tudo que sua empresa precisa em um só lugar.
            </p>

            {/* text-white/75: sobe de /60 para garantir leitura sobre fundo dinâmico */}
            <p
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              className="text-sm text-white/75 mb-10 max-w-xl"
            >
              Atendimento em{" "}
              <strong className="text-white">RJ, SP, MG e ES</strong>
              {" "}— Corpo de Bombeiros, Vigilância Sanitária, Licenciamento
              Ambiental, Laudos com ART.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href={whatsappHero}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solicitar orçamento via WhatsApp — Central de Soluções"
                style={{ backgroundColor: "#800000" }}
                className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Solicitar Orçamento
              </a>

              <a
                href="#servicos"
                aria-label="Ver todos os serviços da Central de Soluções"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-lg hover:border-white hover:bg-white/10 active:bg-white/20 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Ver Serviços
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>

            {/*
              Cards dos pilares: border e texto elevados para garantir leitura
              sobre o fundo dinâmico do vídeo.
              border-white/25 (era /15) e bg-white/8 (era /5): mais visíveis sem
              perder a sensação de leveza.
              text-white/75 nos subtextos (era /60): contraste seguro sobre vídeo.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              {PILARES_HERO.map((pilar) => (
                <a
                  key={pilar.label}
                  href={pilar.href}
                  aria-label={`${pilar.label}: ${pilar.descricao}`}
                  className="group flex flex-col gap-1 rounded-xl border border-white/25 bg-white/8 px-4 py-3.5 hover:bg-white/15 hover:border-white/40 active:bg-white/20 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
                >
                  <span className="text-sm font-semibold text-white leading-snug">{pilar.label}</span>
                  <span className="text-xs text-white/75 leading-snug">{pilar.descricao}</span>
                </a>
              ))}
            </div>
          </div>

          <div aria-label="Telefone de contato" className="absolute bottom-6 left-6 z-10 hidden lg:flex items-center gap-2">
            <a href={`tel:${contato.telefone.replace(/\D/g, "")}`} className="text-xs text-white/60 hover:text-white/90 transition-colors duration-200">
              {contato.telefone}
            </a>
            <span className="text-white/20 text-xs">·</span>
            <a href={contato.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white/90 transition-colors duration-200">
              {contato.instagram}
            </a>
          </div>

          <CrosshairDecor variant="light" size="lg" corner="bottom-right" />
        </section>

        {/* 2. MÉTRICAS */}
        <MetricasEmpresa />

        {/* 3. TRUST BAR */}
        <TrustBar />

        {/* 4. TABS DE SERVIÇOS */}
        <section id="servicos" aria-label="Serviços da Central de Soluções">
          <ServicosTabs
            legalizacao={servicosLegalizacao}
            projetos={servicosProjetos}
            laudos={servicosLaudos}
          />
        </section>

        {/* 5. SETORES */}
        <section id="setores" aria-label="Setores atendidos pela Central de Soluções">
          <SetoresAtendidos />
        </section>

        {/* 6. MAPA */}
        <MapaAtuacao />

        {/* 7. GLOSSÁRIO */}
        <Glossario />

        {/* 8. FORMULÁRIO / CTA */}
        <FormularioContato />
      </main>
    </>
  );
}
