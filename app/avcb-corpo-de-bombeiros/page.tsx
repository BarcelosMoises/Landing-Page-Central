import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { NavPrimaria } from "@/components/NavPrimaria";
import {
  estadosAtuacao,
  getWhatsAppUrl,
  type Servico,
} from "@/data/servicos";

// ─── Metadata ────────────────────────────────────────────────────────────────
// keyword_title (SEO.md §1): "AVCB [estado] — Regularização"
// keyword_heading (SEO.md §1): "AVCB [estado]: Regularização Junto ao Corpo de Bombeiros"

export const metadata: Metadata = {
  title:
    "AVCB e CLCB — Regularização Corpo de Bombeiros RJ, SP, MG, ES",
  description:
    "Obtenha o AVCB ou CLCB com empresa especializada. Atendemos CBMERJ (RJ), CBPMESP (SP), CBMMG (MG) e CBMES (ES). Engenheiros habilitados que assinam a ART. Galpões, indústrias, telecom e usinas solares.",
  keywords: [
    "avcb corpo de bombeiros",
    "avcb rj para galpão industrial",
    "avcb sp urgente para indústria",
    "avcb mg renovação laudo",
    "avcb espírito santo regularização",
    "certificado de aprovação cbmerj renovação",
    "clcb regularização",
    "regularização corpo de bombeiros rj sp mg es",
  ],
  alternates: { canonical: "/avcb-corpo-de-bombeiros" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/avcb-corpo-de-bombeiros",
    siteName: "Central de Soluções",
    title:
      "AVCB e CLCB — Regularização Corpo de Bombeiros RJ, SP, MG, ES | Central de Soluções",
    description:
      "Obtenha o AVCB ou CLCB com empresa especializada. Atendemos CBMERJ, CBPMESP, CBMMG e CBMES com engenheiros que assinam a ART.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Central de Soluções — AVCB e Regularização Corpo de Bombeiros",
      },
    ],
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Regularização AVCB / CLCB — Corpo de Bombeiros",
  description:
    "Regularização junto ao Corpo de Bombeiros estadual para obtenção do Auto de Vistoria (AVCB) ou Certificado de Licença (CLCB), com acompanhamento completo até a emissão do certificado.",
  provider: {
    "@type": "ProfessionalService",
    name: "Central de Soluções",
    url: "https://www.centraldesolucoes.eng.br",
    telephone: "+5522981121315",
    email: "centralsolu@outlook.com",
  },
  areaServed: [
    { "@type": "State", name: "Rio de Janeiro" },
    { "@type": "State", name: "São Paulo" },
    { "@type": "State", name: "Minas Gerais" },
    { "@type": "State", name: "Espírito Santo" },
  ],
  serviceType: "Regularização junto ao Corpo de Bombeiros",
  url: "https://www.centraldesolucoes.eng.br/avcb-corpo-de-bombeiros",
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
        text: "O AVCB (Auto de Vistoria do Corpo de Bombeiros) é o documento que comprova que uma edificação atende às normas de segurança contra incêndio e pânico exigidas pelo Corpo de Bombeiros estadual. É obrigatório para a maioria das atividades comerciais e industriais.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre AVCB e CLCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O AVCB (Auto de Vistoria) é emitido para edificações de maior porte e risco, após vistoria presencial do Corpo de Bombeiros. O CLCB (Certificado de Licença do Corpo de Bombeiros) é destinado a edificações de menor porte, com processo documental simplificado. O tipo exigido depende da área, ocupação e estado.",
      },
    },
    {
      "@type": "Question",
      name: "Quais estados a Central de Soluções atende para AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Central de Soluções realiza o processo de AVCB e CLCB junto ao CBMERJ (Rio de Janeiro), CBPMESP (São Paulo), CBMMG (Minas Gerais) e CBMES (Espírito Santo).",
      },
    },
    {
      "@type": "Question",
      name: "Quais setores mais precisam de AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Galpões logísticos, indústrias, comércio, depósitos, torres de telecomunicações, usinas fotovoltaicas, escolas e igrejas são os setores que mais demandam regularização junto ao Corpo de Bombeiros.",
      },
    },
    {
      "@type": "Question",
      name: "O que acontece se a empresa não tiver o AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ausência do AVCB pode acarretar multa, interdição do estabelecimento pelo Corpo de Bombeiros ou órgãos municipais, além de impedir a renovação do Alvará de Funcionamento e dificultar a contratação de seguros.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a base normativa do AVCB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O processo segue a legislação específica de cada Corpo de Bombeiros estadual (CBMERJ, CBPMESP, CBMMG, CBMES) e as Instruções Técnicas (ITs) emitidas pelo CB de cada estado.",
      },
    },
  ],
};

// ─── Conteúdo da página (sem hardcode — derivado de servicos.ts) ──────────────

const ETAPAS = [
  {
    numero: "01",
    titulo: "Levantamento das exigências",
    descricao:
      "Analisamos as Instruções Técnicas do CB estadual e identificamos todas as adequações necessárias para a sua edificação.",
  },
  {
    numero: "02",
    titulo: "Laudo de Exigências com ART",
    descricao:
      "Emitimos o laudo técnico com diagnóstico das inconformidades e plano de adequações, com ART assinada pelo responsável técnico.",
  },
  {
    numero: "03",
    titulo: "Execução das adequações",
    descricao:
      "Realizamos ou coordenamos todas as adequações: sistemas de combate a incêndio, sinalização, projetos e documentos exigidos pelo CB.",
  },
  {
    numero: "04",
    titulo: "Vistoria e emissão do AVCB",
    descricao:
      "Acompanhamos a vistoria do Corpo de Bombeiros e gerenciamos o processo até a emissão do Certificado de Aprovação (AVCB ou CLCB).",
  },
] as const;

// Dados de servicos.ts — itens do serviço id:"avcb"
const ITENS_SERVICO: Servico["itens"] = [
  "Levantamento das exigências do CB estadual",
  "Elaboração do Laudo de Exigências",
  "Execução das adequações necessárias",
  "Acompanhamento da vistoria até emissão do Certificado de Aprovação / AVCB",
];

const SETORES_PRIORITARIOS: Servico["setoresPrioritarios"] = [
  "Galpões logísticos",
  "Indústrias",
  "Comércio",
  "Depósitos",
  "Torres de telecomunicações",
  "Usinas fotovoltaicas",
  "Escolas",
  "Igrejas",
];

// Órgãos reguladores — SEO.md §6
const ORGAOS = [
  { sigla: "CBMERJ", url: "https://www.cbmerj.rj.gov.br", estado: "RJ" },
  { sigla: "CBPMESP", url: "https://www.corpodebombeiros.sp.gov.br", estado: "SP" },
  { sigla: "CBMMG", url: "https://www.bombeiros.mg.gov.br", estado: "MG" },
  { sigla: "CBMES", url: "https://www.cbmes.es.gov.br", estado: "ES" },
] as const;

const FAQS = [
  {
    pergunta: "O que é o AVCB?",
    resposta:
      "O AVCB (Auto de Vistoria do Corpo de Bombeiros) é o documento que comprova que uma edificação atende às normas de segurança contra incêndio e pânico exigidas pelo Corpo de Bombeiros estadual. É obrigatório para a maioria das atividades comerciais e industriais.",
  },
  {
    pergunta: "Qual a diferença entre AVCB e CLCB?",
    resposta:
      "O AVCB (Auto de Vistoria) é emitido para edificações de maior porte e risco, após vistoria presencial do Corpo de Bombeiros. O CLCB (Certificado de Licença) é destinado a edificações de menor porte, com processo documental simplificado. O tipo exigido depende da área, ocupação e estado.",
  },
  {
    pergunta: "Quais estados a Central de Soluções atende para AVCB?",
    resposta:
      "Atendemos junto ao CBMERJ (Rio de Janeiro), CBPMESP (São Paulo), CBMMG (Minas Gerais) e CBMES (Espírito Santo). Todos os processos com engenheiro habilitado e ART.",
  },
  {
    pergunta: "Quais setores mais precisam de AVCB?",
    resposta:
      "Galpões logísticos, indústrias, comércio, depósitos, torres de telecomunicações, usinas fotovoltaicas, escolas e igrejas são os setores que mais demandam regularização junto ao Corpo de Bombeiros.",
  },
  {
    pergunta: "O que acontece se a empresa não tiver o AVCB?",
    resposta:
      "A ausência do AVCB pode acarretar multa, interdição do estabelecimento pelo Corpo de Bombeiros ou órgãos municipais, além de impedir a renovação do Alvará de Funcionamento e dificultar a contratação de seguros.",
  },
  {
    pergunta: "Qual a base normativa do AVCB?",
    resposta:
      "O processo segue a legislação específica de cada Corpo de Bombeiros estadual e as Instruções Técnicas (ITs) de cada estado: CBMERJ, CBPMESP, CBMMG e CBMES.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AVCBPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Olá! Preciso de ajuda com AVCB / CLCB para minha empresa. Gostaria de um orçamento."
  );

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <NavPrimaria />

      <main id="conteudo-principal" aria-label="Serviço: AVCB e CLCB — Regularização Corpo de Bombeiros">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="avcb-h1"
          className="bg-neutral-900 pt-32 pb-20"
        >
          <div className="container-site">

            {/* Breadcrumb */}
            <nav aria-label="Navegação estrutural" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-neutral-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors duration-150"
                  >
                    Início
                  </Link>
                </li>
                <li aria-hidden="true" className="text-neutral-600">/</li>
                <li className="text-white" aria-current="page">
                  AVCB / CLCB
                </li>
              </ol>
            </nav>

            {/* Badges de órgãos reguladores */}
            <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Órgãos reguladores atendidos">
              {estadosAtuacao.map((e) => (
                <span
                  key={e.sigla}
                  role="listitem"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-[#800000]/20 text-red-300 px-2.5 py-1 rounded-full border border-[#800000]/30"
                >
                  {e.siglaCB} · {e.sigla}
                </span>
              ))}
            </div>

            <div className="max-w-3xl">
              <h1
                id="avcb-h1"
                className="font-heading text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6"
              >
                AVCB e CLCB —{" "}
                <span className="text-[#a30000]">
                  Regularização junto ao Corpo de Bombeiros
                </span>
              </h1>

              <p className="text-neutral-300 text-lg leading-relaxed mb-4">
                Regularização completa junto ao Corpo de Bombeiros estadual
                para obtenção do Auto de Vistoria (AVCB) ou Certificado de
                Licença (CLCB). Atendemos RJ, SP, MG e ES com engenheiros
                habilitados que assinam as ARTs diretamente, sem intermediários.
              </p>

              {/* Itens do serviço — derivados de servicos.ts */}
              <ul className="mb-10 space-y-2" aria-label="O que está incluído">
                {ITENS_SERVICO.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-neutral-300 text-base"
                  >
                    <span aria-hidden="true" className="mt-1 text-[#a30000]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Solicitar orçamento de AVCB via WhatsApp"
                  className="inline-flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#4f0101] active:bg-[#3a0000] text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200"
                >
                  Solicitar Orçamento
                  <span aria-hidden="true">→</span>
                </a>
                <Link
                  href="/#legalizacao"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200"
                >
                  Ver todos os serviços
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Etapas do processo ───────────────────────────────────────────── */}
        <section
          aria-labelledby="etapas-h2"
          className="bg-white py-16 md:py-24"
        >
          <div className="container-site">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
                Como funciona
              </p>
              <h2
                id="etapas-h2"
                className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
              >
                Processo de Regularização AVCB
              </h2>
              <p className="text-neutral-700 text-lg leading-relaxed">
                Cuidamos de todo o processo — do levantamento das exigências
                até a emissão do certificado — sem burocracia para o seu time.
              </p>
            </div>

            <ol
              aria-label="Etapas para obtenção do AVCB"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {ETAPAS.map((etapa) => (
                <li key={etapa.numero} className="flex flex-col gap-3">
                  <span
                    aria-hidden="true"
                    className="font-heading text-5xl font-extrabold text-[#800000]/15 leading-none select-none"
                  >
                    {etapa.numero}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-neutral-900">
                    {etapa.titulo}
                  </h3>
                  <p className="text-neutral-700 text-base leading-relaxed">
                    {etapa.descricao}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Cobertura por estado ─────────────────────────────────────────── */}
        <section
          aria-labelledby="estados-h2"
          className="bg-neutral-50 py-16 md:py-24"
        >
          <div className="container-site">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
                Cobertura geográfica
              </p>
              <h2
                id="estados-h2"
                className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
              >
                AVCB em RJ, SP, MG e ES
              </h2>
              <p className="text-neutral-700 text-lg leading-relaxed">
                Cada estado tem legislação e Instruções Técnicas próprias.
                Nossa equipe conhece as particularidades de cada Corpo de
                Bombeiros estadual e acompanha o processo presencialmente.
              </p>
            </div>

            <ul
              aria-label="Estados atendidos para AVCB"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {estadosAtuacao.map((estado) => (
                <li
                  key={estado.sigla}
                  className="bg-white border border-neutral-200/70 rounded-xl p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-heading text-2xl font-extrabold text-[#800000]"
                      aria-hidden="true"
                    >
                      {estado.sigla}
                    </span>
                    <h3 className="font-heading text-base font-bold text-neutral-900">
                      {estado.nome}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600">
                    CB:{" "}
                    <span className="font-semibold text-neutral-900">
                      {estado.siglaCB}
                    </span>
                  </p>
                  <p className="text-sm text-neutral-600">
                    Amb.:{" "}
                    <span className="font-semibold text-neutral-900">
                      {estado.orgaoAmbiental}
                    </span>
                  </p>
                  <span className="mt-auto inline-flex items-center text-xs font-semibold uppercase tracking-wide bg-[#800000]/10 text-[#800000] px-2.5 py-1 rounded-full w-fit">
                    Cobertura completa
                  </span>
                </li>
              ))}
            </ul>

            {/* Links para órgãos reguladores — E-E-A-T (SEO.md §6) */}
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-500 mb-3">
                Órgãos reguladores oficiais:
              </p>
              <ul className="flex flex-wrap gap-3" aria-label="Links para Corpos de Bombeiros estaduais">
                {ORGAOS.map((orgao) => (
                  <li key={orgao.sigla}>
                    <a
                      href={orgao.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Site oficial do ${orgao.sigla} — ${orgao.estado}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#800000] hover:text-[#4f0101] underline underline-offset-2 transition-colors duration-150"
                    >
                      {orgao.sigla}
                      <span aria-hidden="true" className="text-xs">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Setores prioritários ─────────────────────────────────────────── */}
        <section
          aria-labelledby="setores-h2"
          className="bg-neutral-900 py-16 md:py-20"
        >
          <div className="container-site">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
                Quem precisa de AVCB
              </p>
              <h2
                id="setores-h2"
                className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight"
              >
                Setores que mais demandam regularização
              </h2>
            </div>

            <ul
              aria-label="Setores prioritários para AVCB"
              className="flex flex-wrap gap-3"
            >
              {SETORES_PRIORITARIOS?.map((setor) => (
                <li
                  key={setor}
                  className="inline-flex items-center text-sm font-semibold bg-white/5 border border-white/10 text-neutral-200 px-4 py-2 rounded-full"
                >
                  {setor}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="faq-h2"
          className="bg-white py-16 md:py-24"
        >
          <div className="container-site max-w-3xl">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
                Dúvidas frequentes
              </p>
              <h2
                id="faq-h2"
                className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight"
              >
                Perguntas sobre AVCB e CLCB
              </h2>
            </div>

            <dl className="flex flex-col divide-y divide-neutral-100">
              {FAQS.map((faq) => (
                <div key={faq.pergunta} className="py-6">
                  <dt className="font-heading text-lg font-bold text-neutral-900 mb-3">
                    {faq.pergunta}
                  </dt>
                  <dd className="text-neutral-700 text-base leading-relaxed">
                    {faq.resposta}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA final ────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-h2"
          className="bg-[#4f0101] py-16 md:py-20"
        >
          <div className="container-site text-center">
            <h2
              id="cta-h2"
              className="font-heading text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4"
            >
              Precisa regularizar sua empresa junto ao Corpo de Bombeiros?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Entre em contato agora e receba um diagnóstico gratuito sobre o
              que sua edificação precisa para obter o AVCB ou CLCB.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com engenheiro sobre AVCB via WhatsApp"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 active:bg-neutral-200 text-[#800000] font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Falar com um engenheiro
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

      </main>
    </>
  );
}
