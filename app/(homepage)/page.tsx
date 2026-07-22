import type { Metadata } from "next";
import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import { NavPrimaria } from "@/components/NavPrimaria";
import { CrosshairDecor } from "@/components/CrosshairDecor";
import { HeroVideo } from "@/components/HeroVideo";
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
  type Servico,
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

// ─── Helper: preenche até o próximo múltiplo de 3 com mock cards ──────────────────

export type ServicoOuPlaceholder = Servico & { isPlaceholder?: boolean };

function padServicos(lista: readonly Servico[]): ServicoOuPlaceholder[] {
  const remainder = lista.length % 3;
  if (remainder === 0) return [...lista];
  const needed = 3 - remainder;
  const placeholders: ServicoOuPlaceholder[] = Array.from(
    { length: needed },
    (_, i) => ({
      id: `placeholder-${i}`,
      slug: `placeholder-${i}`,
      nome: "Em breve",
      nomeAbreviado: "Em breve",
      categoria: "legalizacao" as const,
      descricao: "Novo serviço em desenvolvimento. Entre em contato para mais informações.",
      orgaos: [],
      estados: [],
      coberturaNacional: false,
      itens: [],
      iconeLucide: "Clock",
      pathRota: "/",
      isPlaceholder: true,
    })
  );
  return [...lista, ...placeholders];
}

// ─── Dados das tabs ─────────────────────────────────────────────────────────────────────
const servicosLegalizacao = padServicos(getServicosPorCategoria("legalizacao"));
const servicosProjetos = padServicos(
  getServicosPorCategoria("projeto").filter((s) => s.exibirNaTabs !== false)
);
const servicosLaudos = padServicos([
  ...getServicosPorCategoria("laudo"),
  ...getServicosPorCategoria("instalacao"),
]);

const PILARES_HERO = [
  {
    numero: "01",
    label: "Legalizações",
    descricao: "AVCB, Alvará Sanitário e Licenciamento Ambiental",
    cobertura: "RJ · SP · MG · ES",
    href: "#servicos",
  },
  {
    numero: "02",
    label: "Projetos Técnicos",
    descricao: "Combate a Incêndio, Acessibilidade e PGRS/PGRSS",
    cobertura: "RJ · SP · MG · ES",
    href: "#servicos",
  },
  {
    numero: "03",
    label: "Laudos Técnicos",
    descricao: "SPDA, Aterramento e Teste de Continuidade",
    cobertura: "Todo o Brasil",
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
          className="relative min-h-[100svh] flex items-center"
        >
          {/*
            Camadas de fundo (progressive enhancement):

            1. Imagem estática com priority — sempre renderizada. É o fallback
               real para conexões lentas, save-data e reduced-motion.
            2. HeroVideo — client component que só monta o <video> quando
               prefers-reduced-motion = no-preference E a conexão é rápida.
               O vídeo cobre a imagem quando presente; nunca deixa o hero vazio.
          */}
          <Image
            src="/images/portfolio/hero-industrial.jpg"
            alt="Galpão industrial com sistema de tubulações — obra atendida pela Central de Soluções"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          <HeroVideo
            src="/videos/hero.mp4"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/*
            Overlay em três camadas — foge do gradiente linear uniforme:

            Camada 1 — base fixa (bg-black/55): piso de contraste independente
              do frame do vídeo.
            Camada 2 — vignette radial: escurece bordas e cantos, concentrando
              a luz no centro-esquerda onde está o texto. Quebra a uniformidade
              do linear de 180° e simula uma fonte de luz única.
            Camada 3 — gradiente vinho da marca no topo → quase-preto na base,
              onde fica o index strip.
          */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 30% 40%, transparent 45%, rgba(10,0,0,0.55) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#4f0101]/70 via-transparent to-[#0a0000]/85"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

            {/*
              Eyebrow editorial: hairline + small caps.
              Substitui o pill badge genérico (rounded-full + border) por um
              rótulo técnico — mais alinhado ao "cinemático industrial".
            */}
            <p className="flex items-center gap-3 mb-8">
              <span aria-hidden="true" className="h-px w-10 bg-white/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Engenharia de regularização — RJ · SP · MG · ES
              </span>
            </p>

            {/*
              H1 sem palavra colorida/itálica: hierarquia por peso, tracking
              negativo e text-wrap: balance (elimina palavra órfã na última linha).
            */}
            <h1
              id="hero-heading"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)", textWrap: "balance" }}
              className="font-heading text-4xl sm:text-5xl md:text-[4.25rem] font-extrabold tracking-[-0.02em] leading-[1.05] text-white mb-6 max-w-3xl"
            >
              Regularização completa de engenharia para a sua empresa
            </h1>

            {/* Largura limitada a ~65 caracteres para legibilidade */}
            <p
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              className="text-lg md:text-xl text-white/90 leading-relaxed mb-3 max-w-[62ch]"
            >
              Corpo de Bombeiros, Vigilância Sanitária, Licenciamento Ambiental
              e Laudos com ART — tudo com um único responsável técnico.
            </p>

            <p
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              className="text-sm text-white/75 mb-12 max-w-xl"
            >
              Engenheiros próprios assinando cada projeto. Atendimento em{" "}
              <strong className="text-white font-semibold">RJ, SP, MG e ES</strong>.
            </p>

            {/*
              Hierarquia de 3 níveis de ação: primário preenchido (com feedback
              físico de pressão), secundário outline e link terciário — reduz o
              ruído visual do par "filled + ghost".
            */}
            <div className="flex flex-wrap items-center gap-4 mb-20">
              <a
                href={whatsappHero}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solicitar orçamento via WhatsApp — Central de Soluções"
                style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
                className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:bg-[#4f0101] hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Solicitar Orçamento
              </a>

              <a
                href="#servicos"
                aria-label="Ver todos os serviços da Central de Soluções"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:border-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Ver Serviços
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>

              <a
                href={`tel:${contato.telefone.replace(/\D/g, "")}`}
                aria-label={`Ligar para a Central de Soluções — ${contato.telefone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                {contato.telefone}
              </a>
            </div>

            {/*
              Index strip editorial — substitui os 3 cards iguais com pill badges.
              Divisores hairline + numeração com tabular-nums: leitura de
              "índice técnico", coerente com a identidade de engenharia.
              Sem fundo translúcido: o texto fica direto no DOM sobre o overlay.
            */}
            <div className="max-w-4xl border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-white/15">
                {PILARES_HERO.map((pilar) => (
                  <a
                    key={pilar.label}
                    href={pilar.href}
                    aria-label={`${pilar.label}: ${pilar.descricao}`}
                    className="group flex flex-col gap-1.5 border-b border-white/10 py-5 sm:border-b-0 sm:px-6 sm:py-6 sm:first:pl-0 sm:last:pr-0 transition-colors duration-200 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
                  >
                    <span className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                        className="text-xs font-semibold tracking-widest text-white/50"
                      >
                        {pilar.numero}
                      </span>
                      <span className="text-sm font-semibold text-white leading-snug">
                        {pilar.label}
                      </span>
                    </span>
                    <span className="text-xs text-white/70 leading-relaxed">
                      {pilar.descricao}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                      {pilar.cobertura}
                    </span>
                  </a>
                ))}
              </div>
            </div>
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
