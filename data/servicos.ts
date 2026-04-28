// ─────────────────────────────────────────────────────────────────────────────
// /data/servicos.ts
// Fonte única de verdade dos dados da Central de Soluções.
// Gerado a partir de docs/SERVICOS.md — não editar textos aqui diretamente.
// Atualizar sempre que docs/SERVICOS.md for alterado.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type EstadoSigla = "RJ" | "SP" | "MG" | "ES" | "BR";

export type CategoriaServico =
  | "legalizacao"
  | "projeto"
  | "laudo"
  | "instalacao";

export interface SubServico {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly norma?: string;
  readonly entregavel?: string;
}

export interface Servico {
  readonly id: string;
  readonly slug: string;
  readonly nome: string;
  readonly nomeAbreviado: string;
  readonly categoria: CategoriaServico;
  readonly descricao: string;
  readonly orgaos: readonly string[];
  readonly estados: readonly EstadoSigla[];
  readonly coberturaNacional: boolean;
  readonly itens: readonly string[];
  readonly subServicos?: readonly SubServico[];
  readonly setoresPrioritarios?: readonly string[];
  readonly normaBase?: readonly string[];
  readonly iconeLucide: string;
  readonly pathRota: string;
}

export interface Setor {
  readonly id: string;
  readonly nome: string;
  readonly servicoIds: readonly string[];
}

export interface Cliente {
  readonly id: string;
  readonly nome: string;
  readonly segmento: string;
  readonly logoPath?: string;
  readonly destaque: boolean;
}

export interface Diferencial {
  readonly ordem: number;
  readonly titulo: string;
  readonly descricao: string;
}

export interface MembroEquipe {
  readonly id: string;
  readonly nome: string;
  readonly formacao: string;
  readonly especialidades: readonly string[];
  readonly fotoPerfil?: string;
}

export interface EstadoAtuacao {
  readonly sigla: EstadoSigla;
  readonly nome: string;
  readonly siglaCB: string;
  readonly orgaoAmbiental: string;
  readonly cobertura: "completa" | "sob-consulta";
}

export interface ContatoEmpresa {
  readonly whatsapp: string;
  readonly telefone: string;
  readonly email: string;
  readonly instagram: string;
  readonly instagramUrl: string;
}

// ─── Equipe técnica ───────────────────────────────────────────────────────────

export const equipe: readonly MembroEquipe[] = [
  {
    id: "durval",
    nome: "Durval Ribeiro de Queiroz",
    formacao: "Arquiteto e Urbanista",
    especialidades: [
      "Engenharia de Segurança do Trabalho",
      "Engenharia de Segurança Contra Incêndio e Pânico",
    ],
  },
  {
    id: "theyllor",
    nome: "Theyllor Estulano do Espírito Santo",
    formacao: "Engenheiro Civil",
    especialidades: ["Técnico em Mecânica"],
  },
] as const;

// ─── Estados de atuação ───────────────────────────────────────────────────────

export const estadosAtuacao: readonly EstadoAtuacao[] = [
  {
    sigla: "RJ",
    nome: "Rio de Janeiro",
    siglaCB: "CBMERJ",
    orgaoAmbiental: "INEA",
    cobertura: "completa",
  },
  {
    sigla: "SP",
    nome: "São Paulo",
    siglaCB: "CBPMESP",
    orgaoAmbiental: "CETESB",
    cobertura: "completa",
  },
  {
    sigla: "MG",
    nome: "Minas Gerais",
    siglaCB: "CBMMG",
    orgaoAmbiental: "SUPRAM/SEMAD",
    cobertura: "completa",
  },
  {
    sigla: "ES",
    nome: "Espírito Santo",
    siglaCB: "CBMES",
    orgaoAmbiental: "IEMA",
    cobertura: "completa",
  },
] as const;

// ─── Catálogo de serviços ─────────────────────────────────────────────────────

export const servicos: readonly Servico[] = [
  {
    id: "avcb",
    slug: "avcb-corpo-de-bombeiros",
    nome: "Legalização junto ao Corpo de Bombeiros (AVCB / CLCB)",
    nomeAbreviado: "AVCB / CLCB",
    categoria: "legalizacao",
    descricao:
      "Regularização junto ao Corpo de Bombeiros estadual para obtenção do Auto de Vistoria (AVCB) ou Certificado de Licença (CLCB), com acompanhamento completo até a emissão do certificado.",
    orgaos: ["CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Levantamento das exigências do CB estadual",
      "Elaboração do Laudo de Exigências",
      "Execução das adequações necessárias",
      "Acompanhamento da vistoria até emissão do Certificado de Aprovação / AVCB",
    ],
    setoresPrioritarios: [
      "Galpões logísticos",
      "Indústrias",
      "Comércio",
      "Depósitos",
      "Torres de telecomunicações",
      "Usinas fotovoltaicas",
      "Escolas",
      "Igrejas",
    ],
    normaBase: [
      "Legislação estadual de cada Corpo de Bombeiros",
      "Instrução Técnica (IT) do CB estadual",
    ],
    iconeLucide: "ShieldAlert",
    pathRota: "/avcb-corpo-de-bombeiros",
  },
  {
    id: "vigilancia-sanitaria",
    slug: "vigilancia-sanitaria",
    nome: "Legalização junto à Vigilância Sanitária",
    nomeAbreviado: "Alvará Sanitário",
    categoria: "legalizacao",
    descricao:
      "Regularização sanitária para obtenção do Alvará Sanitário nos estados do RJ, SP e ES, com elaboração de todos os documentos exigidos pela VISA.",
    orgaos: ["VISA Municipal", "ANVISA"],
    estados: ["RJ", "SP", "ES"],
    coberturaNacional: false,
    itens: [
      "Projeto Arquitetônico adequado às normas da VISA",
      "Projeto de Acessibilidade conforme NBR 9050",
      "PGRS — Plano de Gerenciamento de Resíduos Sólidos",
      "PGRSS — Plano de Gerenciamento de Resíduos de Serviços de Saúde",
      "Acompanhamento até emissão do Alvará Sanitário",
    ],
    normaBase: [
      "RDC ANVISA",
      "Legislação estadual e municipal",
    ],
    iconeLucide: "ClipboardCheck",
    pathRota: "/vigilancia-sanitaria",
  },
  {
    id: "licenciamento-ambiental",
    slug: "licenciamento-ambiental",
    nome: "Legalização Ambiental / Licenciamento",
    nomeAbreviado: "Licenciamento Ambiental",
    categoria: "legalizacao",
    descricao:
      "Licenciamento ambiental para regularização de atividades com impacto ambiental junto ao INEA (RJ), CETESB (SP), SUPRAM/SEMAD (MG) e IEMA (ES).",
    orgaos: ["INEA", "CETESB", "SUPRAM", "SEMAD", "IEMA"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "LP — Licença Prévia",
      "LI — Licença de Instalação",
      "LO — Licença de Operação",
      "LAS — Licença Ambiental Simplificada",
    ],
    setoresPrioritarios: [
      "Postos de combustível",
      "Agronegócio",
      "Indústria",
      "Mineração",
      "Telecomunicações",
    ],
    normaBase: [
      "Resolução CONAMA 237/1997",
      "CONAMA 273 (postos de combustível)",
      "Legislação estadual",
    ],
    iconeLucide: "Leaf",
    pathRota: "/licenciamento-ambiental",
  },
  {
    id: "regularizacao-prefeitura",
    slug: "regularizacao-prefeitura",
    nome: "Regularização junto à Prefeitura",
    nomeAbreviado: "Regularização Municipal",
    categoria: "legalizacao",
    descricao:
      "Regularização de imóveis junto às prefeituras municipais, incluindo aprovação de projetos, Habite-se e certidões de uso e ocupação do solo.",
    orgaos: ["Secretarias Municipais"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Aprovação de projetos arquitetônicos",
      "Habite-se",
      "Certidão de uso e ocupação do solo",
      "Acompanhamento de processos junto às secretarias municipais",
    ],
    iconeLucide: "Building2",
    pathRota: "/regularizacao-prefeitura",
  },
  {
    id: "spda",
    slug: "spda-para-raios",
    nome: "SPDA — Sistema de Proteção contra Descargas Atmosféricas",
    nomeAbreviado: "SPDA / Para-raios",
    categoria: "instalacao",
    descricao:
      "Projeto, instalação e laudo técnico de SPDA (para-raios) conforme ABNT NBR 5419, com ART assinada e cobertura em todo o Brasil.",
    orgaos: ["CREA"],
    estados: ["RJ", "SP", "MG", "ES", "BR"],
    coberturaNacional: true,
    itens: [
      "Projeto SPDA conforme ABNT NBR 5419",
      "Laudo técnico com ART",
      "Inspeção anual e teste de continuidade",
      "Atendimento em todo o Brasil",
    ],
    setoresPrioritarios: [
      "Usinas fotovoltaicas",
      "Torres de telecomunicações",
      "Subestações elétricas",
      "Agronegócio",
      "Indústria",
    ],
    normaBase: ["ABNT NBR 5419"],
    iconeLucide: "Zap",
    pathRota: "/spda-para-raios",
  },
  {
    id: "combate-incendio",
    slug: "sistemas-combate-incendio",
    nome: "Sistemas de Combate ao Incêndio e Pânico",
    nomeAbreviado: "Combate a Incêndio",
    categoria: "instalacao",
    descricao:
      "Instalação e manutenção de sistemas de combate ao incêndio e pânico: hidrantes, sprinklers, extintores, iluminação de emergência e alarme de incêndio.",
    orgaos: ["CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: true,
    itens: [
      "Hidrantes e mangueiras",
      "Sprinklers (chuveiros automáticos)",
      "Extintores e sinalização de emergência",
      "Iluminação de emergência",
      "Alarme de incêndio",
    ],
    normaBase: [
      "Instrução Técnica do CB estadual",
      "ABNT NBR 13714",
      "ABNT NBR 10897",
    ],
    iconeLucide: "FlameKindling",
    pathRota: "/sistemas-combate-incendio",
  },
  {
    id: "aterramento",
    slug: "aterramento",
    nome: "Aterramento Elétrico",
    nomeAbreviado: "Aterramento",
    categoria: "instalacao",
    descricao:
      "Projeto e execução de sistemas de aterramento elétrico com laudo técnico, teste de resistividade do solo e ART, conforme NR-10.",
    orgaos: ["CREA"],
    estados: ["RJ", "SP", "MG", "ES", "BR"],
    coberturaNacional: true,
    itens: [
      "Projeto de aterramento",
      "Execução e instalação do sistema",
      "Teste de resistividade do solo",
      "Laudo técnico de aterramento conforme NR-10",
    ],
    normaBase: ["NR-10", "ABNT NBR 5410"],
    iconeLucide: "Activity",
    pathRota: "/aterramento",
  },
  {
    id: "teste-continuidade",
    slug: "teste-continuidade",
    nome: "Teste de Continuidade e Condutividade Elétrica do Solo",
    nomeAbreviado: "Teste de Continuidade",
    categoria: "laudo",
    descricao:
      "Ensaios técnicos de continuidade e condutividade elétrica do solo com relatório técnico e ART, conforme NBR 5419 e NR-10. Cobertura em todo o Brasil.",
    orgaos: ["CREA"],
    estados: ["RJ", "SP", "MG", "ES", "BR"],
    coberturaNacional: true,
    itens: [
      "Ensaio de continuidade conforme NBR 5419",
      "Ensaio de condutividade do solo conforme NR-10",
      "Relatório técnico detalhado",
      "ART assinada por responsável técnico",
    ],
    normaBase: ["ABNT NBR 5419", "NR-10"],
    iconeLucide: "Radio",
    pathRota: "/teste-continuidade",
  },
  {
    id: "laudos-tecnicos",
    slug: "laudos-tecnicos",
    nome: "Laudos Técnicos",
    nomeAbreviado: "Laudos Técnicos",
    categoria: "laudo",
    descricao:
      "Elaboração de laudos técnicos de engenharia com ART: laudo de exigências do Corpo de Bombeiros, diagnósticos de inconformidades e planos de adequação.",
    orgaos: ["CREA", "CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    subServicos: [
      {
        id: "laudo-exigencias-cb",
        nome: "Laudo de Exigências (Corpo de Bombeiros)",
        descricao:
          "Diagnóstico das inconformidades identificadas pelo CB, relatório técnico com plano de adequações e prazos, com ART do responsável técnico.",
      },
      {
        id: "acompanhamento-avcb",
        nome: "Acompanhamento até emissão do AVCB",
        descricao:
          "Gestão completa da documentação e acompanhamento do processo junto ao CB estadual até a emissão do Certificado de Aprovação.",
      },
    ],
    itens: [
      "Laudo de Exigências do Corpo de Bombeiros",
      "Diagnóstico de inconformidades com plano de adequações",
      "Acompanhamento completo até emissão do AVCB",
      "ART assinada por responsável técnico",
    ],
    iconeLucide: "FileText",
    pathRota: "/laudos-tecnicos",
  },
  {
    id: "projetos-tecnicos",
    slug: "projetos",
    nome: "Projetos Técnicos de Engenharia",
    nomeAbreviado: "Projetos Técnicos",
    categoria: "projeto",
    descricao:
      "Elaboração de projetos técnicos completos: arquitetônico, combate ao incêndio, hidráulico/sanitário, acessibilidade, PGRS e PGRSS.",
    orgaos: ["CREA", "CAU", "CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    subServicos: [
      {
        id: "levantamento-arquitetonico",
        nome: "Levantamento Arquitetônico",
        descricao:
          "Levantamento físico do imóvel com planta baixa, cortes e fachadas.",
        entregavel: "Pranchas técnicas em AutoCAD / PDF",
      },
      {
        id: "projeto-incendio-panico",
        nome: "Projeto de Combate ao Incêndio e Pânico",
        descricao:
          "Projeto completo conforme Instrução Técnica do CB estadual, incluindo hidrantes, sprinklers, extintores, saídas de emergência e sinalização, com ART.",
        norma: "IT do Corpo de Bombeiros estadual",
      },
      {
        id: "projeto-arquitetonico-visa",
        nome: "Projeto Arquitetônico (Vigilância Sanitária)",
        descricao:
          "Projeto adequado às normas da VISA para aprovação do Alvará Sanitário, com planta baixa, memorial descritivo e especificação de materiais.",
      },
      {
        id: "projeto-hidraulico",
        nome: "Projeto Hidráulico / Sanitário",
        descricao:
          "Dimensionamento de instalações hidráulicas e sanitárias: abastecimento de água, esgoto sanitário e águas pluviais.",
      },
      {
        id: "projeto-acessibilidade",
        nome: "Projeto de Acessibilidade",
        descricao:
          "Adequação do imóvel à NBR 9050: rampas, pisos táteis, sanitários adaptados e sinalização.",
        norma: "ABNT NBR 9050",
      },
      {
        id: "pgrs-pgrss",
        nome: "PGRS / PGRSS",
        descricao:
          "Plano de Gerenciamento de Resíduos Sólidos (Lei 12.305/2010) e Plano de Gerenciamento de Resíduos de Serviços de Saúde (RDC ANVISA 222/2018).",
        norma: "Lei 12.305/2010 | RDC ANVISA 222/2018",
      },
    ],
    itens: [
      "Levantamento Arquitetônico (AutoCAD / PDF)",
      "Projeto de Combate ao Incêndio e Pânico com ART",
      "Projeto Arquitetônico para Vigilância Sanitária",
      "Projeto Hidráulico / Sanitário",
      "Projeto de Acessibilidade (NBR 9050)",
      "PGRS e PGRSS",
    ],
    iconeLucide: "Ruler",
    pathRota: "/projetos",
  },
] as const;

// ─── Setores atendidos ────────────────────────────────────────────────────────

export const setores: readonly Setor[] = [
  {
    id: "industria",
    nome: "Indústria",
    servicoIds: ["avcb", "spda", "laudos-tecnicos", "licenciamento-ambiental"],
  },
  {
    id: "comercio",
    nome: "Comércio (lojas e supermercados)",
    servicoIds: ["avcb", "vigilancia-sanitaria", "projetos-tecnicos"],
  },
  {
    id: "galpao-logistico",
    nome: "Depósito / Galpão Logístico",
    servicoIds: ["avcb", "spda", "laudos-tecnicos"],
  },
  {
    id: "telecom",
    nome: "Telecomunicações (torres)",
    servicoIds: ["spda", "avcb", "laudos-tecnicos", "aterramento"],
  },
  {
    id: "energia-solar",
    nome: "Energia Solar (usinas fotovoltaicas)",
    servicoIds: ["spda", "aterramento", "laudos-tecnicos"],
  },
  {
    id: "subestacoes",
    nome: "Subestações Elétricas",
    servicoIds: ["spda", "aterramento", "teste-continuidade"],
  },
  {
    id: "posto-combustivel",
    nome: "Posto de Combustível",
    servicoIds: ["avcb", "licenciamento-ambiental", "vigilancia-sanitaria"],
  },
  {
    id: "escola",
    nome: "Escola",
    servicoIds: ["avcb", "projetos-tecnicos", "vigilancia-sanitaria"],
  },
  {
    id: "igreja",
    nome: "Igreja",
    servicoIds: ["avcb", "projetos-tecnicos"],
  },
  {
    id: "agronegocio",
    nome: "Agronegócio",
    servicoIds: ["spda", "licenciamento-ambiental", "aterramento"],
  },
  {
    id: "saude",
    nome: "Clínica / Saúde",
    servicoIds: ["vigilancia-sanitaria", "projetos-tecnicos"],
  },
  {
    id: "ceramica",
    nome: "Cerâmica",
    servicoIds: ["avcb", "licenciamento-ambiental", "spda"],
  },
] as const;

// ─── Clientes (prova social) ──────────────────────────────────────────────────

export const clientes: readonly Cliente[] = [
  {
    id: "claro",
    nome: "Claro",
    segmento: "Telecomunicações",
    logoPath: "/images/clientes/claro.svg",
    destaque: true,
  },
  {
    id: "embratel",
    nome: "Embratel",
    segmento: "Telecomunicações",
    logoPath: "/images/clientes/embratel.svg",
    destaque: true,
  },
  {
    id: "brasil-center",
    nome: "Brasil Center",
    segmento: "Telecomunicações",
    logoPath: "/images/clientes/brasil-center.svg",
    destaque: false,
  },
  {
    id: "ambev",
    nome: "Ambev",
    segmento: "Alimentação / Bebidas",
    logoPath: "/images/clientes/ambev.svg",
    destaque: true,
  },
  {
    id: "mercado-livre",
    nome: "Mercado Livre",
    segmento: "Logística / E-commerce",
    logoPath: "/images/clientes/mercado-livre.svg",
    destaque: true,
  },
  {
    id: "brasol",
    nome: "Brasol",
    segmento: "Energia Solar",
    logoPath: "/images/clientes/brasol.svg",
    destaque: true,
  },
  {
    id: "rzk-energia",
    nome: "RZK Energia",
    segmento: "Energia",
    logoPath: "/images/clientes/rzk-energia.svg",
    destaque: false,
  },
  {
    id: "athan-energia",
    nome: "Athan Energia",
    segmento: "Energia",
    logoPath: "/images/clientes/athan-energia.svg",
    destaque: false,
  },
  {
    id: "sonne-energia",
    nome: "Sonne Solução em Energia",
    segmento: "Energia Solar",
    logoPath: "/images/clientes/sonne-energia.svg",
    destaque: false,
  },
  {
    id: "natural-energia",
    nome: "Natural Energia",
    segmento: "Energia",
    logoPath: "/images/clientes/natural-energia.svg",
    destaque: false,
  },
  {
    id: "eco-solucoes",
    nome: "Eco Soluções em Energia",
    segmento: "Energia",
    logoPath: "/images/clientes/eco-solucoes.svg",
    destaque: false,
  },
  {
    id: "della-delle",
    nome: "Della & Delle",
    segmento: "Comércio",
    logoPath: "/images/clientes/della-delle.svg",
    destaque: false,
  },
  {
    id: "casa-das-telhas",
    nome: "Casa das Telhas",
    segmento: "Comércio",
    logoPath: "/images/clientes/casa-das-telhas.svg",
    destaque: false,
  },
  {
    id: "pmc",
    nome: "PMC",
    segmento: "Não especificado",
    logoPath: "/images/clientes/pmc.svg",
    destaque: false,
  },
] as const;

// ─── Diferenciais competitivos ────────────────────────────────────────────────

export const diferenciais: readonly Diferencial[] = [
  {
    ordem: 1,
    titulo: "Solução completa em um só lugar",
    descricao:
      "AVCB, SPDA, Vigilância Sanitária, Licenciamento Ambiental e Projetos Técnicos — tudo com um único parceiro.",
  },
  {
    ordem: 2,
    titulo: "Engenheiros que assinam ARTs",
    descricao:
      "Responsabilidade técnica real: Durval e Theyllor assinam as ARTs diretamente, sem intermediários.",
  },
  {
    ordem: 3,
    titulo: "Carteira de grandes clientes",
    descricao:
      "Claro, Embratel, Ambev e Mercado Livre como prova social B2B comprovada.",
  },
  {
    ordem: 4,
    titulo: "Cobertura em 4 estados do Sudeste",
    descricao:
      "Atendimento completo em RJ, SP, MG e ES. Sistemas SPDA e aterramento em todo o Brasil.",
  },
  {
    ordem: 5,
    titulo: "Atendimento multissetorial",
    descricao:
      "Indústria, telecom, energia solar, agronegócio, saúde e muito mais — equipe especializada por segmento.",
  },
  {
    ordem: 6,
    titulo: "Transparência e acompanhamento constante",
    descricao:
      "Feedback em cada etapa do processo, com visitas técnicas e atendimento personalizado.",
  },
] as const;

// ─── Contato ──────────────────────────────────────────────────────────────────

export const contato: ContatoEmpresa = {
  whatsapp: "5522981121315",
  telefone: "(22) 98112-1315",
  email: "centralsolu@outlook.com",
  instagram: "@centraldesolucoes",
  instagramUrl: "https://www.instagram.com/centraldesolucoes",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Retorna um serviço pelo seu id */
export function getServicoPorId(id: string): Servico | undefined {
  return servicos.find((s) => s.id === id);
}

/** Retorna um serviço pelo seu slug (usado nas rotas do App Router) */
export function getServicoPorSlug(slug: string): Servico | undefined {
  return servicos.find((s) => s.slug === slug);
}

/** Retorna todos os serviços de uma categoria */
export function getServicosPorCategoria(categoria: CategoriaServico): readonly Servico[] {
  return servicos.filter((s) => s.categoria === categoria);
}

/** Retorna todos os serviços disponíveis em determinado estado */
export function getServicosPorEstado(estado: EstadoSigla): readonly Servico[] {
  return servicos.filter(
    (s) => s.coberturaNacional || s.estados.includes(estado)
  );
}

/** Retorna os clientes em destaque (para o Trust Bar) */
export function getClientesDestaque(): readonly Cliente[] {
  return clientes.filter((c) => c.destaque);
}

/** Retorna os serviços demandados por um setor */
export function getServicosPorSetor(setorId: string): readonly Servico[] {
  const setor = setores.find((s) => s.id === setorId);
  if (!setor) return [];
  return setor.servicoIds
    .map((id) => getServicoPorId(id))
    .filter((s): s is Servico => s !== undefined);
}

/** URL do WhatsApp com mensagem pré-preenchida */
export function getWhatsAppUrl(mensagem?: string): string {
  const base = `https://wa.me/${contato.whatsapp}`;
  if (!mensagem) return base;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}
