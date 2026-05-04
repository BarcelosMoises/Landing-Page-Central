import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { NavPrimaria } from "@/components/NavPrimaria";
import { HeroFullscreen } from "@/components/HeroFullscreen";
import { MetricasEmpresa } from "@/components/MetricasEmpresa";
import { TrustBar } from "@/components/TrustBar";
import { ServicosGrid } from "@/components/ServicosGrid";
import { SetoresAtendidos } from "@/components/SetoresAtendidos";
import { MapaAtuacao } from "@/components/MapaAtuacao";
import { EquipeTecnica } from "@/components/EquipeTecnica";
import { Glossario } from "@/components/Glossario";
import { FormularioContato } from "@/components/FormularioContato";

// ─── Metadata ─────────────────────────────────────────────────────────────────

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

// ─── JSON-LD WebSite ───────────────────────────────────────────────────────────────
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

// ─── Dados das seções fullscreen ───────────────────────────────────────────────────────

const SECOES = [
  {
    id: "legalizacao",
    titulo: "Legalização",
    descricao:
      "Regularize sua empresa junto ao Corpo de Bombeiros, Vigilância Sanitária, órgãos ambientais e prefeituras municipais em ES, MG, RJ e SP. Cada processo com ART e responsável técnico habilitado.",
    imagemFundo: "/images/bg-legalizacao.jpg",
    imagemAlt:
      "Engenheiro analisando documentação técnica para regularização junto ao Corpo de Bombeiros",
    isPrimeiro: true,
    itens: [
      { nome: "AVCB / CLCB", descricao: "Regularização junto ao Corpo de Bombeiros" },
      { nome: "Alvará Sanitário", descricao: "Vigilância Sanitária municipal e ANVISA" },
      { nome: "Licenciamento Ambiental", descricao: "INEA, CETESB, SUPRAM, IEMA" },
      { nome: "Regularização Municipal", descricao: "Habite-se e uso do solo junto à Prefeitura" },
    ],
  },
  {
    id: "projetos",
    titulo: "Projetos Técnicos",
    descricao:
      "Elaboração de projetos completos de engenharia e arquitetura com ART: combate a incêndio, arquitetônico, hidráulico, acessibilidade e gerenciamento de resíduos.",
    imagemFundo: "/images/bg-projetos.jpg",
    imagemAlt:
      "Engenheiro civil analisando planta arquitetônica de projeto técnico",
    isPrimeiro: false,
    itens: [
      { nome: "Combate a Incêndio e Pânico", descricao: "conforme IT do CB estadual" },
      { nome: "Levantamento Arquitetônico", descricao: "AutoCAD / PDF com ART" },
      { nome: "Projeto Hidráulico / Sanitário", descricao: "abastecimento, esgoto e pluvial" },
      { nome: "Acessibilidade NBR 9050", descricao: "rampas, pisos táteis e sinalização" },
    ],
  },
  {
    id: "laudos",
    titulo: "Laudos Técnicos",
    descricao:
      "Laudos de engenharia com validade jurídica e ART: exigências do Corpo de Bombeiros, SPDA, aterramento elétrico e testes de continuidade conforme NBR 5419 e NR-10.",
    imagemFundo: "/images/bg-laudos.jpg",
    imagemAlt:
      "Técnico realizando medição elétrica em campo para laudo técnico de SPDA",
    isPrimeiro: false,
    itens: [
      { nome: "Laudo de Exigências", descricao: "diagnóstico do Corpo de Bombeiros" },
      { nome: "Laudo SPDA", descricao: "conforme ABNT NBR 5419" },
      { nome: "Laudo de Aterramento", descricao: "resistividade do solo e NR-10" },
      { nome: "Teste de Continuidade", descricao: "ensaios com relatório e ART" },
    ],
  },
  {
    id: "sistemas",
    titulo: "Sistemas de Segurança",
    descricao:
      "Instalação, manutenção e inspeção de sistemas de combate a incêndio, SPDA (para-raios) e aterramento elétrico — com cobertura nacional para SPDA e aterramento.",
    imagemFundo: "/images/bg-sistemas.jpg",
    imagemAlt:
      "Instalação de sistema de sprinklers em galpão logístico industrial",
    isPrimeiro: false,
    itens: [
      { nome: "Combate a Incêndio", descricao: "hidrantes, sprinklers e alarme" },
      { nome: "SPDA / Para-raios", descricao: "projeto e instalação NBR 5419" },
      { nome: "Aterramento Elétrico", descricao: "projeto e execução NR-10" },
      { nome: "Teste de Continuidade", descricao: "inspeção anual de sistemas" },
    ],
  },
] as const;

// ─── Page ───────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />

      {/* Nav fixa — fora do <main> para não ser incluída na leitura sequencial */}
      <NavPrimaria />

      <main
        id="conteudo-principal"
        aria-label="Página inicial da Central de Soluções"
        className="motion-safe:snap-y motion-safe:snap-mandatory"
      >
        {/* ── Seções fullscreen por categoria ── */}
        {SECOES.map((secao) => (
          <HeroFullscreen
            key={secao.id}
            id={secao.id}
            titulo={secao.titulo}
            descricao={secao.descricao}
            imagemFundo={secao.imagemFundo}
            imagemAlt={secao.imagemAlt}
            itens={secao.itens}
            isPrimeiro={secao.isPrimeiro}
          />
        ))}

        {/* ── Seções de suporte (fora do snap) ── */}
        <div className="motion-safe:snap-none">
          <MetricasEmpresa />
          <TrustBar />
          <ServicosGrid />
          <SetoresAtendidos />
          <MapaAtuacao />
          <EquipeTecnica />
          <Glossario />
          <FormularioContato />
        </div>
      </main>
    </>
  );
}
