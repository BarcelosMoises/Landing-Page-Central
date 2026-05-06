import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { NavPrimaria } from "@/components/NavPrimaria";
import { ServicosTabs } from "@/components/ServicosTabs";
import { MetricasEmpresa } from "@/components/MetricasEmpresa";
import { TrustBar } from "@/components/TrustBar";
import { SetoresAtendidos } from "@/components/SetoresAtendidos";
import { MapaAtuacao } from "@/components/MapaAtuacao";
import { EquipeTecnica } from "@/components/EquipeTecnica";
import { Glossario } from "@/components/Glossario";
import { FormularioContato } from "@/components/FormularioContato";
import { getServicosPorCategoria } from "@/data/servicos";

// ─── Metadata ──────────────────────────────────────────────────────────────────

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

// ─── JSON-LD WebSite ───────────────────────────────────────────────────────────
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

// ─── Dados das tabs (Server Component — sem 'use client') ─────────────────────
//
// getServicosPorCategoria() retorna readonly Servico[].
// A tab "Laudos" agrega as categorias 'laudo' E 'instalacao' para cobrir
// SPDA, Aterramento, Teste de Continuidade e Laudos Técnicos em um único painel.

const servicosLegalizacao = getServicosPorCategoria("legalizacao");
const servicosProjetos    = getServicosPorCategoria("projeto");
const servicosLaudos      = [
  ...getServicosPorCategoria("laudo"),
  ...getServicosPorCategoria("instalacao"),
] as const;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />

      {/* Nav fixa — fora do <main> para não ser incluída na leitura sequencial */}
      <NavPrimaria />

      <main
        id="conteudo-principal"
        aria-label="Página inicial da Central de Soluções"
      >
        {/*
         * ServicosTabs — Client Component isolado.
         * Recebe arrays serializáveis (string | boolean | string[]);
         * page.tsx permanece Server Component puro.
         */}
        <ServicosTabs
          legalizacao={servicosLegalizacao}
          projetos={servicosProjetos}
          laudos={servicosLaudos}
        />

        {/* Seções de suporte — abaixo das tabs */}
        <MetricasEmpresa />
        <TrustBar />
        <SetoresAtendidos />
        <MapaAtuacao />
        <EquipeTecnica />
        <Glossario />
        <FormularioContato />
      </main>
    </>
  );
}
