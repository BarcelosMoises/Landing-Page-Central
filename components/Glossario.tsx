import { JsonLd } from "@/components/JsonLd";

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface SiglaItem {
  readonly sigla: string;
  readonly significado: string;
  readonly descricao: string;
  readonly normaOrgao: string;
}

interface FaqItem {
  readonly pergunta: string;
  readonly resposta: string;
}

// ─── Dados das siglas (fonte: docs/SEO.md — Glossário de Siglas) ────────────────────

const SIGLAS: readonly SiglaItem[] = [
  {
    sigla: "AVCB",
    significado: "Auto de Vistoria do Corpo de Bombeiros",
    descricao:
      "Documento emitido pelo Corpo de Bombeiros estadual que certifica que um imóvel atende a todas as exigências de prevenção e combate a incêndio. É obrigatório para operação legal de indústrias, comércios, galpões e edificações em geral.",
    normaOrgao: "CBMERJ / CBPMESP / CBMMG / CBMES",
  },
  {
    sigla: "CLCB",
    significado: "Certificado de Licença do Corpo de Bombeiros",
    descricao:
      "Equivalente ao AVCB para edificações de baixo risco, utilizado principalmente no estado de São Paulo. Tem processo simplificado em relação ao AVCB completo.",
    normaOrgao: "CBPMESP (SP)",
  },
  {
    sigla: "SPDA",
    significado: "Sistema de Proteção contra Descargas Atmosféricas",
    descricao:
      "Popularmente chamado de para-raios, o SPDA é um conjunto de dispositivos instalados em edificações e estruturas para capturar e dissipar a energia de raios com segurança, protegendo pessoas, equipamentos e instalações elétricas.",
    normaOrgao: "ABNT NBR 5419",
  },
  {
    sigla: "ART",
    significado: "Anotação de Responsabilidade Técnica",
    descricao:
      "Documento obrigatório emitido pelo CREA que vincula um engenheiro ou arquiteto a um serviço técnico específico. A ART garante que o profissional habilitado assume responsabilidade legal pela execução do projeto ou laudo.",
    normaOrgao: "CREA",
  },
  {
    sigla: "PPCI / PSCI",
    significado: "Projeto de Prevenção e Combate a Incêndios",
    descricao:
      "Projeto técnico que define todos os sistemas de prevenção e combate a incêndio de uma edificação: hidrantes, extintores, sprinklers, iluminação de emergência e saídas de emergência. É exigência do Corpo de Bombeiros para emissão do AVCB.",
    normaOrgao: "Instrução Técnica do CB estadual",
  },
  {
    sigla: "NR-10",
    significado: "Norma Regulamentadora de Segurança em Instalações Elétricas",
    descricao:
      "Norma do Ministério do Trabalho que estabelece os requisitos mínimos de segurança para trabalhos em instalações elétricas. Exige laudo técnico de aterramento e continuidade elétrica com ART do responsável.",
    normaOrgao: "MTE (Ministério do Trabalho e Emprego)",
  },
  {
    sigla: "NR-23",
    significado: "Norma Regulamentadora de Proteção Contra Incêndios",
    descricao:
      "Norma do Ministério do Trabalho que determina as obrigações do empregador quanto à proteção contra incêndios no ambiente de trabalho, complementando as exigências do Corpo de Bombeiros.",
    normaOrgao: "MTE (Ministério do Trabalho e Emprego)",
  },
  {
    sigla: "PGRS",
    significado: "Plano de Gerenciamento de Resíduos Sólidos",
    descricao:
      "Documento obrigatório pela Lei 12.305/2010 (Política Nacional de Resíduos Sólidos) que estabelece como a empresa coleta, armazena, transporta e destina seus resíduos sólidos. É exigência para alvará sanitário e licenças ambientais.",
    normaOrgao: "Lei 12.305/2010",
  },
  {
    sigla: "PGRSS",
    significado: "Plano de Gerenciamento de Resíduos de Serviços de Saúde",
    descricao:
      "Plano específico para clínicas, laboratórios, hospitais e demais estabelecimentos de saúde que define o manejo adequado de resíduos biológicos, químicos e radioativos, evitando riscos à saúde pública e ao meio ambiente.",
    normaOrgao: "RDC ANVISA 222/2018",
  },
  {
    sigla: "LP / LI / LO",
    significado: "Licenças Ambientais: Prévia, de Instalação e de Operação",
    descricao:
      "As três fases do licenciamento ambiental brasileiro. A LP (Licença Prévia) aprova a viabilidade do empreendimento; a LI (Licença de Instalação) autoriza a construção; a LO (Licença de Operação) autoriza o funcionamento após verificar que as condições foram cumpridas.",
    normaOrgao: "Resolução CONAMA 237/1997",
  },
  {
    sigla: "INEA",
    significado: "Instituto Estadual do Ambiente",
    descricao:
      "Órgão ambiental do estado do Rio de Janeiro, responsável pelo licenciamento, fiscalização e monitoramento das atividades que causam impacto ambiental no RJ. É o órgão ao qual as empresas devem solicitar licenças LP, LI e LO no estado.",
    normaOrgao: "Governo do Estado do Rio de Janeiro",
  },
  {
    sigla: "IEMA",
    significado: "Instituto Estadual de Meio Ambiente e Recursos Hídricos",
    descricao:
      "Órgão ambiental do Espírito Santo, responsável pelo licenciamento ambiental estadual, controle da poluição e gestão dos recursos naturais do ES. Equivalente ao INEA no RJ e à CETESB em SP.",
    normaOrgao: "Governo do Estado do Espírito Santo",
  },
  {
    sigla: "CETESB",
    significado: "Companhia Ambiental do Estado de São Paulo",
    descricao:
      "Agência de licenciamento e fiscalização ambiental do estado de São Paulo, vinculada à Secretaria de Infraestrutura e Meio Ambiente. É referência nacional em controle ambiental e emite as licenças LP, LI e LO para atividades com impacto ambiental em SP.",
    normaOrgao: "Governo do Estado de São Paulo",
  },
] as const;

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

// ─── Sub-componente: card de sigla ────────────────────────────────────────────────────

function SiglaCard({ sigla, significado, descricao, normaOrgao }: SiglaItem) {
  return (
    <article
      aria-label={`Sigla ${sigla}: ${significado}`}
      className="bg-white border border-neutral-100 rounded-xl p-5 flex flex-col gap-3"
    >
      {/* Sigla em destaque */}
      {/* text-[#800000] sobre #fff → contraste 5.9:1 ✓ WCAG AA */}
      <span
        className="font-heading text-2xl font-bold text-[#800000] leading-none"
        aria-label={`Sigla: ${sigla}`}
      >
        {sigla}
      </span>

      {/* Significado completo */}
      {/* text-neutral-900 sobre #fff → contraste 18.1:1 ✓ WCAG AAA */}
      <h3 className="font-heading text-sm font-bold text-neutral-900 leading-snug">
        {significado}
      </h3>

      {/* Descrição — no DOM, indexada pelo Google */}
      {/* text-neutral-700 sobre #fff → contraste 9.4:1 ✓ WCAG AAA */}
      <p className="text-neutral-700 text-sm leading-relaxed flex-1">
        {descricao}
      </p>

      {/* Norma / Órgão */}
      {/* text-neutral-400 sobre #fff → contraste 2.9:1 — apenas para texto pequeno decorativo */}
      <p className="text-xs text-neutral-500 font-medium mt-auto">
        {/* text-neutral-500 (#6b7280) sobre #fff → contraste 4.6:1 ✓ WCAG AA para texto \u2265 14px bold */}
        {normaOrgao}
      </p>
    </article>
  );
}

// ─── Sub-componente: item de FAQ visível ──────────────────────────────────────────────────

function FaqAccordionItem({ pergunta, resposta }: FaqItem) {
  return (
    <details className="group border border-neutral-100 rounded-xl bg-white overflow-hidden">
      <summary
        className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-heading text-base font-bold text-neutral-900 hover:bg-neutral-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-inset"
        aria-label={pergunta}
      >
        <span>{pergunta}</span>
        {/* Chevron — rotaciona quando aberto */}
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
      {/* Resposta no DOM — indexada pelo Google mesmo quando fechada */}
      <p className="px-6 pb-5 pt-1 text-neutral-700 text-base leading-relaxed">
        {resposta}
      </p>
    </details>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function Glossario() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section
        aria-labelledby="glossario-heading"
        className="bg-neutral-50 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cabeçalho */}
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
              Transparência técnica
            </p>
            <h2
              id="glossario-heading"
              className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
            >
              Entenda os Termos Técnicos
            </h2>
            <p className="text-neutral-700 text-lg leading-relaxed">
              Siglas como AVCB, SPDA e ART não são jargão — são exigências
              legais que toda empresa precisa cumprir para operar com segurança
              e regularidade. Entender cada uma facilita o processo de
              regularização.
            </p>
          </div>

          {/* Grid de siglas */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16"
            aria-label="Glossário de siglas técnicas"
          >
            {SIGLAS.map((item) => (
              <li key={item.sigla} className="list-none">
                <SiglaCard {...item} />
              </li>
            ))}
          </ul>

          {/* Seção de perguntas frequentes */}
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-neutral-900 mb-6">
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
