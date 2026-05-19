import { JsonLd } from "@/components/JsonLd";

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface FaqItem {
  readonly pergunta: string;
  readonly resposta: string;
}

// ─── Dados do FAQPage (mínimo 5 pares — exigência AGENTS.md) ──────────────────

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    pergunta: "O que é AVCB e quem precisa ter?",
    resposta:
      "O AVCB (Auto de Vistoria do Corpo de Bombeiros) é o documento emitido pelo Corpo de Bombeiros estadual que certifica que uma edificação atende às normas de prevenção e combate a incêndio. É obrigatório para indústrias, galpões logísticos, comércios, escolas, igrejas, hospitais e qualquer edificação de uso coletivo ou com atividade de risco. Sem o AVCB, a empresa pode ser autuada, multada ou ter suas atividades interrompidas pelos órgãos de fiscalização.",
  },
  {
    pergunta: "O que é SPDA e quando é obrigatório?",
    resposta:
      "O SPDA (Sistema de Proteção contra Descargas Atmosféricas), popularmente chamado de para-raios, é um conjunto de dispositivos que captura e dissipa com segurança a energia de descargas elétricas atmosféricas. É regulamentado pela ABNT NBR 5419 e obrigatório em estruturas como usinas fotovoltaicas, torres de telecomunicações, subestações elétricas, galpões industriais e qualquer edificação sujeita a risco elevado de raios. O laudo técnico de SPDA com ART é exigência do Corpo de Bombeiros para emissão do AVCB em diversas ocupações.",
  },
  {
    pergunta: "O que é ART e por que ela é exigida nos laudos?",
    resposta:
      "A ART (Anotação de Responsabilidade Técnica) é o documento emitido pelo CREA (Conselho Regional de Engenharia e Agronomia) que vincula legalmente um engenheiro ou arquiteto habilitado a um serviço técnico específico. Ela é exigida em laudos, projetos e relatórios porque garante que o documento foi elaborado por um profissional legalmente habilitado, que assume responsabilidade civil e criminal pela qualidade e veracidade das informações. Órgãos como o Corpo de Bombeiros, INEA, CETESB e IEMA não aceitam documentos técnicos sem ART.",
  },
  {
    pergunta: "Qual a diferença entre AVCB e CLCB?",
    resposta:
      "O AVCB (Auto de Vistoria do Corpo de Bombeiros) e o CLCB (Certificado de Licença do Corpo de Bombeiros) são documentos equivalentes, mas aplicados a situações distintas. O AVCB é exigido para edificações de médio e alto risco, como indústrias e grandes galpões, passando por vistoria presencial do Corpo de Bombeiros. Já o CLCB é utilizado em edificações de baixo risco, principalmente em São Paulo (CBPMESP), com processo simplificado e sem necessidade de vistoria presencial. A classificação de risco depende do tipo de ocupação, área e carga de incêndio da edificação.",
  },
  {
    pergunta: "O que é licenciamento ambiental e quais empresas precisam?",
    resposta:
      "O licenciamento ambiental é o procedimento pelo qual os órgãos ambientais estaduais (INEA no RJ, CETESB em SP, SUPRAM/SEMAD em MG e IEMA no ES) avaliam, controlam e autorizam o funcionamento de atividades que causam impacto ao meio ambiente. Empresas dos setores de indústria, agroindústria, mineração, postos de combustível, telecomunicações e energia precisam obter as licenças LP (Licença Prévia), LI (Licença de Instalação) e LO (Licença de Operação), conforme a Resolução CONAMA 237/1997. Operar sem a licença ambiental adequada sujeita a empresa a multas, interdições e responsabilidade civil e penal dos sócios.",
  },
  {
    pergunta: "O que é PGRS e quando uma empresa precisa elaborar?",
    resposta:
      "O PGRS (Plano de Gerenciamento de Resíduos Sólidos) é um documento exigido pela Lei Federal 12.305/2010 (Política Nacional de Resíduos Sólidos) que descreve como a empresa identifica, coleta, armazena, transporta e dá a destinação correta aos seus resíduos sólidos. É exigido para empresas que geram resíduos de construção civil, resíduos industriais, resíduos perigosos (Classe I) e para obtenção do Alvará Sanitário e da Licença Ambiental. Estabelecimentos de saúde têm obrigação adicional de elaborar também o PGRSS (Plano específico para resíduos de serviços de saúde), regulamentado pela RDC ANVISA 222/2018.",
  },
  {
    pergunta: "Quanto tempo leva para obter o AVCB?",
    resposta:
      "O prazo para obtenção do AVCB varia de acordo com o estado, a complexidade da edificação e o volume de processos em tramitação no Corpo de Bombeiros. Em média, o processo leva de 60 a 180 dias no Rio de Janeiro (CBMERJ) e em São Paulo (CBPMESP), podendo ser mais rápido em Minas Gerais e Espírito Santo. O prazo depende de fatores como: adequações necessárias no imóvel, aprovação do projeto de incêndio, disponibilidade de vistoria e completude da documentação. Uma consultoria especializada como a Central de Soluções pode reduzir o prazo ao garantir que o processo seja protocolado sem pendências.",
  },
] as const;

// ─── JSON-LD FAQPage ────────────────────────────────────────────────────────────────────

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.resposta,
    },
  })),
};

// ─── Sub-componente: item de FAQ accordion ────────────────────────────────────

function FaqAccordionItem({ pergunta, resposta }: FaqItem) {
  return (
    <details className="group border border-neutral-100 rounded-xl bg-white overflow-hidden">
      <summary
        className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-heading text-base font-bold text-neutral-900 hover:bg-neutral-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-inset"
        aria-label={pergunta}
      >
        <span>{pergunta}</span>
        <span
          aria-hidden="true"
          className="flex-shrink-0 text-[#800000] transition-transform duration-200 group-open:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </summary>
      <p className="px-6 pb-5 pt-1 text-neutral-700 text-base leading-relaxed">
        {resposta}
      </p>
    </details>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Glossario() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section
        aria-labelledby="glossario-heading"
        className="bg-neutral-50 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Seção de perguntas frequentes */}
          <div>
            <h2
              id="glossario-heading"
              className="font-heading text-xl md:text-2xl font-bold text-neutral-900 mb-6"
            >
              Perguntas Frequentes
            </h2>
            <div
              className="flex flex-col gap-3"
              aria-label="Perguntas frequentes sobre regularização de engenharia civil"
            >
              {FAQ_ITEMS.map((item) => (
                <FaqAccordionItem
                  key={item.pergunta}
                  pergunta={item.pergunta}
                  resposta={item.resposta}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
