// ─────────────────────────────────────────────────────────────────────────────
// /data/servicos.ts
// Fonte única de verdade dos dados da Central de Soluções.
// Gerado a partir de docs/SERVICOS.md — não editar textos aqui diretamente.
// Atualizar sempre que docs/SERVICOS.md for alterado.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Equipe técnica (re-exportada de data/equipe.ts) ───────────────────────────────
//
// As páginas de serviço importam `equipe` deste arquivo.
// A fonte única de verdade é data/equipe.ts — nunca duplicar dados aqui.
// MembroEquipeServico é um tipo de compatibilidade (slug→id, tituloPrincipal→formacao,
// especializacoes→especialidades) exposto via equipeServicos em data/equipe.ts.

export type { MembroEquipeServico as MembroEquipe } from "@/data/equipe";
export { equipeServicos as equipe } from "@/data/equipe";

// ─── Tipos base ───────────────────────────────────────────────────────────────────────────

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

export interface ImagemServico {
  /** Caminho da imagem em /public, ex.: "/images/cards/corpo-de-bombeiros/capa.jpg" */
  readonly src: string;
  /** Alt técnico descritivo (regra SEO #6) — descreve o conteúdo real da foto */
  readonly alt: string;
  /** Foto de destaque no bento grid (ocupa 2x2) */
  readonly destaque?: boolean;
}

export interface Servico {
  readonly id: string;
  readonly slug: string;
  readonly nome: string;
  readonly nomeAbreviado: string;
  /**
   * Nome curto usado exclusivamente no título do card das ServicosTabs
   * da homepage. Quando presente, substitui nomeAbreviado apenas no card.
   * nomeAbreviado permanece inalterado para todos os outros usos do site
   * (SetoresAtendidos, aria-labels, metadata, etc.).
   */
  readonly nomeCurto?: string;
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
  /**
   * Galeria de imagens do serviço exibida no card expansível da homepage.
   * Quando ausente, o card usa um placeholder (dev-only) até haver fotos reais.
   */
  readonly imagens?: readonly ImagemServico[];
  /**
   * Controla se o serviço aparece como card nas ServicosTabs da homepage.
   * `undefined` ou `true`  → exibir (padrão para todos os serviços novos).
   * `false`                → ocultar (usado para entradas de compatibilidade/legado).
   */
  readonly exibirNaTabs?: boolean;
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
  /**
   * Controla o tamanho do contêiner da logo no slider da TrustBar.
   * `"large"`   → 374×124px (+100% em relação ao tamanho base) — padrão implícito.
   * `"default"` → 281×93px  (+50% em relação ao tamanho base original 187×62).
   * `"medium"`  → 243×81px  (+30% em relação ao tamanho base original 187×62).
   *
   * Omitir este campo equivale a `"large"`.
   */
  readonly logoSize?: "default" | "medium" | "large";
}

export interface Diferencial {
  readonly ordem: number;
  readonly titulo: string;
  readonly descricao: string;
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

// ─── Estados de atuação ───────────────────────────────────────────────────────────────────

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

// ─── Catálogo de serviços ─────────────────────────────────────────────────────────────────

export const servicos: readonly Servico[] = [

  // ── LEGALIZAÇÃO (4 cards) ─────────────────────────────────────────────────

  {
    id: "avcb",
    slug: "avcb-corpo-de-bombeiros",
    nome: "Legalização junto ao Corpo de Bombeiros (AVCB / CLCB)",
    nomeAbreviado: "Corpo de Bombeiros",
    nomeCurto: "Corpo de Bombeiros",
    categoria: "legalizacao",
    descricao:
      "Regularização junto ao Corpo de Bombeiros estadual para obtenção do Auto de Vistoria (AVCB) ou Certificado de Licença (CLCB), com acompanhamento completo até a emissão do certificado.",
    orgaos: ["CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Projeto de Combate ao Incêndio e Pânico",
      "Laudo de Exigências",
      "Certificado de Aprovação",
      "AVCB / CLCB",
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
    imagens: [
      {
        src: "/images/cards/corpo-de-bombeiros/capa.jpg",
        alt: "Vistoria técnica de segurança contra incêndio e pânico para emissão do AVCB — Corpo de Bombeiros",
        destaque: true,
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20230629-080514.jpeg",
        alt: "Sistema de combate a incêndio em edificação vistoriado durante regularização junto ao Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20231120-092320.jpeg",
        alt: "Equipamentos de segurança contra incêndio e pânico inspecionados em vistoria para AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20240612-121510.jpg",
        alt: "Levantamento técnico de instalações de combate a incêndio durante vistoria do Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20240612-121513.jpg",
        alt: "Levantamento de sistemas de combate a incêndio em edificação durante regularização junto ao Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20240612-121611.jpg",
        alt: "Hidrantes e tubulação de combate a incêndio verificados em vistoria de regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20240612-121658.jpg",
        alt: "Equipamentos de proteção contra incêndio e sinalização de emergência inspecionados em edificação",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20250922-130717.jpg",
        alt: "Inspeção de hidrantes e tubulação de combate a incêndio em galpão industrial",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20250922-130821.jpg",
        alt: "Registro fotográfico de sistema hidráulico de combate a incêndio durante regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20260210-152949.jpg",
        alt: "Registro fotográfico de vistoria de segurança contra incêndio e pânico para certificação do imóvel",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/20260519-111847.jpg",
        alt: "Casa de bombas e reservatórios de combate a incêndio inspecionados durante regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210310-152335.jpg",
        alt: "Vistoria de segurança contra incêndio e pânico em edificação para obtenção do AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210310-153115.jpg",
        alt: "Equipamentos de combate a incêndio inspecionados em vistoria do Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210722-123403.jpg",
        alt: "Inspeção de instalações de segurança contra incêndio e pânico em imóvel em regularização",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210723-125304.jpg",
        alt: "Levantamento técnico de sistemas de combate a incêndio durante regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210723-125541.jpg",
        alt: "Registro de vistoria de segurança contra incêndio e pânico em edificação comercial",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210723-125845.jpg",
        alt: "Equipamentos de proteção contra incêndio verificados durante inspeção para AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210804-160200.jpg",
        alt: "Vistoria técnica de sistemas de combate a incêndio em edificação industrial",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210804-160313.jpg",
        alt: "Hidrantes e equipamentos de combate a incêndio inspecionados em regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210804-173208.jpg",
        alt: "Inspeção de segurança contra incêndio e pânico em imóvel durante vistoria do Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210804-173619.jpg",
        alt: "Sistema de combate a incêndio e sinalização de emergência verificados em edificação",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210804-173716.jpg",
        alt: "Registro fotográfico de vistoria de regularização de AVCB em estabelecimento",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210804-191315.jpg",
        alt: "Equipamentos de segurança contra incêndio e pânico inspecionados em período noturno",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210805-114625.jpg",
        alt: "Levantamento técnico de combate a incêndio em edificação durante regularização junto ao Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210805-115102.jpg",
        alt: "Hidrantes e tubulação de combate a incêndio verificados em vistoria de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20210805-115119.jpg",
        alt: "Vistoria de sistemas de segurança contra incêndio e pânico em imóvel",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220321-170621.jpg",
        alt: "Inspeção de equipamentos de combate a incêndio em edificação para regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220322-120558.jpg",
        alt: "Registro fotográfico de vistoria de segurança contra incêndio e pânico em estabelecimento",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220322-151857.jpg",
        alt: "Levantamento de instalações de combate a incêndio durante regularização junto ao Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220808-150858.jpg",
        alt: "Equipamentos de proteção contra incêndio e sinalização de emergência verificados em edificação",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220908-144006.jpg",
        alt: "Vistoria técnica de sistemas de combate a incêndio em imóvel em regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220908-165832.jpg",
        alt: "Inspeção de hidrantes e equipamentos de combate a incêndio em vistoria do Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20220908-171622.jpg",
        alt: "Registro de vistoria de segurança contra incêndio e pânico em edificação",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20240102-wa0022.jpeg",
        alt: "Sistema de combate a incêndio inspecionado durante regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/img-20240102-wa0037.jpeg",
        alt: "Equipamentos de segurança contra incêndio e pânico verificados em vistoria",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/pano-20210427-143336.jpg",
        alt: "Vista panorâmica de edificação com sistemas de combate a incêndio durante regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-51-33-1.jpeg",
        alt: "Vistoria de segurança contra incêndio e pânico em edificação para emissão do AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-51-35.jpeg",
        alt: "Equipamentos de combate a incêndio inspecionados em vistoria do Corpo de Bombeiros",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-51-36.jpeg",
        alt: "Levantamento técnico de instalações de combate a incêndio em imóvel",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-51-57.jpeg",
        alt: "Hidrantes e tubulação de combate a incêndio verificados durante regularização de AVCB",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-52-00.jpeg",
        alt: "Registro fotográfico de vistoria de segurança contra incêndio e pânico em estabelecimento",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-52-02.jpeg",
        alt: "Sistema de combate a incêndio e sinalização de emergência inspecionados em edificação",
      },
      {
        src: "/images/cards/corpo-de-bombeiros/whatsapp-image-2026-09-07-at-16-52-05.jpeg",
        alt: "Vistoria técnica de equipamentos de combate a incêndio para regularização de AVCB",
      },
    ],
  },
  {
    id: "vigilancia-sanitaria",
    slug: "vigilancia-sanitaria",
    nome: "Legalização junto à Vigilância Sanitária",
    nomeAbreviado: "Vigilância Sanitária",
    categoria: "legalizacao",
    descricao:
      "Regularização sanitária para obtenção do Alvará Sanitário nos estados do RJ, SP e ES, com elaboração de todos os documentos exigidos pela VISA.",
    orgaos: ["VISA Municipal", "ANVISA"],
    estados: ["RJ", "SP", "ES"],
    coberturaNacional: false,
    itens: [
      "Alvará sanitário",
      "Laudo técnico de Atividades",
    ],
    setoresPrioritarios: [
      "Clínicas médicas e odontológicas",
      "Laboratórios de análises",
      "Farmácias e drogarias",
      "Restaurantes e lanchonetes",
      "Supermercados e mercados",
      "Indústrias alimentícias",
      "Salões de beleza",
      "Creches e escolas",
    ],
    normaBase: [
      "RDC ANVISA",
      "Legislação estadual e municipal",
    ],
    iconeLucide: "ClipboardCheck",
    pathRota: "/vigilancia-sanitaria",
    imagens: [
      {
        src: "/images/cards/vigilancia-sanitaria/20241210-215311.jpg",
        alt: "Ambiente interno de estabelecimento inspecionado para alvará sanitário com bancadas e superfícies higienizáveis",
        destaque: true,
      },
      {
        src: "/images/cards/vigilancia-sanitaria/20260129-152818.jpg",
        alt: "Área de manipulação de alimentos com equipamentos em aço inox durante vistoria da vigilância sanitária",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/20260129-155054.jpg",
        alt: "Registro fotográfico de inspeção sanitária em cozinha industrial com pias e chapas de aquecimento",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/20260427-120344.jpg",
        alt: "Sala técnica de estabelecimento de saúde pronta para avaliação de conformidade sanitária",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/img-0578.jpg",
        alt: "Interior de estabelecimento comercial com equipamentos de manipulação e armazenamento de alimentos",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/img-20220713-175228.jpg",
        alt: "Vistoria de regularização sanitária em área de processamento com utensílios e bancadas",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/whatsapp-image-2026-09-07-at-16-51-58.jpeg",
        alt: "Ambiente de atendimento de estabelecimento comercial em processo de alvará sanitário",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/whatsapp-image-2026-09-07-at-16-52-02-1.jpeg",
        alt: "Equipamentos de cozinha industrial durante levantamento para alvará sanitário",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/whatsapp-image-2026-09-07-at-16-52-03-1.jpeg",
        alt: "Detalhe de bancada em aço inox e utensílios em estabelecimento inspecionado",
      },
      {
        src: "/images/cards/vigilancia-sanitaria/whatsapp-image-2026-09-07-at-16-52-03.jpeg",
        alt: "Área de armazenamento de insumos avaliada em vistoria sanitária",
      },
    ],
  },
  {
    id: "licenciamento-ambiental",
    slug: "licenciamento-ambiental",
    nome: "Legalização Ambiental / Licenciamento",
    nomeAbreviado: "Meio Ambiente",
    categoria: "legalizacao",
    descricao:
      "Licenciamento ambiental para regularização de atividades com impacto ambiental junto ao INEA (RJ), CETESB (SP), SUPRAM/SEMAD (MG) e IEMA (ES).",
    orgaos: ["INEA", "CETESB", "SUPRAM", "SEMAD", "IEMA"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Licença Ambiental de Instalação",
      "Licença Ambiental de Operação",
      "Licença Ambiental Unificada",
      "Licença Ambiental Comunicada",
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
    imagens: [
      {
        src: "/images/cards/meio-ambiente/20230624-101553.jpeg",
        alt: "Área de vegetação em vistoria de licenciamento ambiental junto a usina ou empreendimento",
        destaque: true,
      },
      {
        src: "/images/cards/meio-ambiente/20231024-150833.jpeg",
        alt: "Campo com usina solar fotovoltaica com painéis dispostos em fileiras durante licenciamento ambiental",
      },
      {
        src: "/images/cards/meio-ambiente/20231024-151144.jpeg",
        alt: "Instalação de usina fotovoltaica com painéis solares e estrutura de fixação no solo",
      },
      {
        src: "/images/cards/meio-ambiente/20231024-155709.jpeg",
        alt: "Vista aérea de empreendimento com painéis fotovoltaicos em área rural",
      },
      {
        src: "/images/cards/meio-ambiente/20231024-161647.jpeg",
        alt: "Central fotovoltaica em operação com fileiras de módulos solares sob o sol",
      },
      {
        src: "/images/cards/meio-ambiente/20231214-152634.jpg",
        alt: "Área externa de empreendimento licenciado com vegetação e estrutura industrial",
      },
      {
        src: "/images/cards/meio-ambiente/20260826-101648.jpg",
        alt: "Técnico em campo realizando levantamento para licenciamento ambiental",
      },
      {
        src: "/images/cards/meio-ambiente/whatsapp-image-2026-08-31-at-10-57-14-1.jpeg",
        alt: "Documentação e pranchetas de vistoria de campo em licenciamento ambiental",
      },
      {
        src: "/images/cards/meio-ambiente/whatsapp-image-2026-09-07-at-16-52-05-1.jpeg",
        alt: "Registro de atividade de campo em área de empreendimento para licenciamento ambiental",
      },
      {
        src: "/images/cards/meio-ambiente/whatsapp-image-2026-09-07-at-16-52-06.jpeg",
        alt: "Vistoria técnica de licenciamento ambiental em área externa de instalação",
      },
    ],
  },
  {
    id: "regularizacao-prefeitura",
    slug: "regularizacao-prefeitura",
    nome: "Regularização junto à Prefeitura",
    nomeAbreviado: "Prefeitura",
    categoria: "legalizacao",
    descricao:
      "Regularização de imóveis junto às prefeituras municipais, incluindo aprovação de projetos, Habite-se, desmembramento e remembramento de lotes.",
    orgaos: ["Secretarias Municipais"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Projeto legal",
      "Habite-se",
      "Desmembramento de lotes",
      "Remembramento de lotes",
    ],
    iconeLucide: "Building2",
    pathRota: "/regularizacao-prefeitura",
    imagens: [
      {
        src: "/images/cards/prefeitura/whatsapp-image-2026-09-07-at-16-52-07.jpeg",
        alt: "Documentação técnica para regularização de imóvel junto à prefeitura municipal",
        destaque: true,
      },
    ],
  },

  // ── INSTALAÇÃO ────────────────────────────────────────────────────────────

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
    imagens: [
      {
        src: "/images/cards/laudo-spda/20220224-080825.jpeg",
        alt: "Sistema de captação de SPDA com cabo de cobre e haste instalada em cobertura de edificação",
        destaque: true,
      },
      {
        src: "/images/cards/laudo-spda/20240911-164026.jpeg",
        alt: "Cordoalha de cobre e conectores de descida do SPDA instalados em fachada industrial",
      },
      {
        src: "/images/cards/laudo-spda/d8d9.jpeg",
        alt: "Detalhe de conector de descida e fixação de cabo em sistema de para-raios",
      },
      {
        src: "/images/cards/laudo-spda/img-20220210-172321.jpg",
        alt: "Torre de telecomunicações com sistema de proteção contra descargas atmosféricas instalado",
      },
      {
        src: "/images/cards/laudo-spda/t1m1.jpeg",
        alt: "Caixa de inspeção de aterramento elétrico do SPDA aberta para medição",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2022-03-03-at-15-04-39-1.jpeg",
        alt: "Inspeção de sistema de para-raios em subestação elétrica com estruturas metálicas",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-15-29-23.jpeg",
        alt: "Técnico realizando inspeção de continuidade em sistema SPDA instalado",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-09.jpeg",
        alt: "Estrutura metálica com captor tipo Franklin e cabo de descida do para-raios",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-10.jpeg",
        alt: "Cordoalha de cobre de aterramento e descida do SPDA em área externa",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-13-1.jpeg",
        alt: "Registro fotográfico de laudo técnico SPDA em telhado metálico industrial",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-13.jpeg",
        alt: "Descida de SPDA com cabo isolado e suportes de fixação em parede",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-15.jpeg",
        alt: "Vistoria de sistema de proteção contra descargas atmosféricas em instalação fotovoltaica",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-16.jpeg",
        alt: "Conectores e garras de cabo do SPDA em inspeção de laudo técnico",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-18.jpeg",
        alt: "Medição de resistência de aterramento em sistema SPDA durante vistoria",
      },
    ],
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
    exibirNaTabs: false,
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
    exibirNaTabs: false,
    pathRota: "/aterramento",
  },

  // ── LAUDOS (4 cards — catálogo completo conforme PDF) ─────────────────────

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
    exibirNaTabs: false,
  },
  {
    id: "laudos-tecnicos",
    slug: "laudos-tecnicos",
    nome: "Laudo Técnico dos Sistemas de Combate ao Incêndio e Pânico",
    nomeAbreviado: "Laudo de Combate a Incêndio",
    categoria: "laudo",
    descricao:
      "Elaboração de laudo técnico dos sistemas de combate ao incêndio e pânico com ART: diagnóstico de inconformidades, plano de adequações e acompanhamento até a emissão do AVCB.",
    orgaos: ["CREA", "CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Laudo Técnico dos Sistemas de Combate ao Incêndio e Pânico",
      "Laudo de Exigências do Corpo de Bombeiros",
      "Diagnóstico de inconformidades com plano de adequações",
      "Acompanhamento completo até emissão do AVCB",
      "ART assinada por responsável técnico",
    ],
    iconeLucide: "FileText",
    pathRota: "/laudos-tecnicos",
    imagens: [
      {
        src: "/images/cards/laudo-combate-ao-incendio/20240423-140501-1.jpg",
        alt: "Sistema de hidrantes e tubulação de combate a incêndio instalado em galpão industrial",
        destaque: true,
      },
      {
        src: "/images/cards/laudo-combate-ao-incendio/whatsapp-image-2026-09-07-at-16-52-04.jpeg",
        alt: "Registro de laudo técnico de combate ao incêndio com extintores e sinalização",
      },
      {
        src: "/images/cards/laudo-combate-ao-incendio/whatsapp-image-2026-09-07-at-16-59-53.jpeg",
        alt: "Inspeção de sistema de combate a incêndio e pânico em edificação comercial",
      },
      {
        src: "/images/cards/laudo-combate-ao-incendio/whatsapp-image-2026-09-07-at-16-59-54-1.jpeg",
        alt: "Hidrante de parede com mangueira e esguicho em vistoria de laudo técnico",
      },
      {
        src: "/images/cards/laudo-combate-ao-incendio/whatsapp-image-2026-09-07-at-17-01-35.jpeg",
        alt: "Sistema de detecção e alarme de incêndio inspecionado durante elaboração de laudo",
      },
    ],
  },
  {
    id: "laudo-spda",
    slug: "laudo-spda",
    nome: "Laudo Técnico SPDA",
    nomeAbreviado: "Laudo SPDA",
    categoria: "laudo",
    descricao:
      "Elaboração de laudo técnico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) com inspeção visual, teste de continuidade, teste de condutividade elétrica do solo e ART. Cobertura em todo o Brasil.",
    orgaos: ["CREA"],
    estados: ["RJ", "SP", "MG", "ES", "BR"],
    coberturaNacional: true,
    itens: [
      "Inspeção visual do sistema de captação, descida e aterramento",
      "Teste de continuidade conforme ABNT NBR 5419",
      "Teste de condutividade elétrica do solo",
      "Relatório técnico com registro fotográfico",
      "ART assinada por engenheiro eletricista",
    ],
    setoresPrioritarios: [
      "Usinas fotovoltaicas",
      "Torres de telecomunicações",
      "Subestações elétricas",
      "Agronegócio",
      "Indústria",
    ],
    normaBase: [
      "ABNT NBR 5419 — Proteção contra descargas atmosféricas",
      "NR-10 — Segurança em instalações elétricas",
    ],
    iconeLucide: "ShieldCheck",
    exibirNaTabs: false,
    pathRota: "/laudo-spda",
    imagens: [
      {
        src: "/images/cards/laudo-spda/20220224-080825.jpeg",
        alt: "Sistema de captação de SPDA com cabo de cobre e haste instalada em cobertura de edificação",
        destaque: true,
      },
      {
        src: "/images/cards/laudo-spda/20240911-164026.jpeg",
        alt: "Cordoalha de cobre e conectores de descida do SPDA instalados em fachada industrial",
      },
      {
        src: "/images/cards/laudo-spda/d8d9.jpeg",
        alt: "Detalhe de conector de descida e fixação de cabo em sistema de para-raios",
      },
      {
        src: "/images/cards/laudo-spda/img-20220210-172321.jpg",
        alt: "Torre de telecomunicações com sistema de proteção contra descargas atmosféricas instalado",
      },
      {
        src: "/images/cards/laudo-spda/t1m1.jpeg",
        alt: "Caixa de inspeção de aterramento elétrico do SPDA aberta para medição",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2022-03-03-at-15-04-39-1.jpeg",
        alt: "Inspeção de sistema de para-raios em subestação elétrica com estruturas metálicas",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-15-29-23.jpeg",
        alt: "Técnico realizando inspeção de continuidade em sistema SPDA instalado",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-09.jpeg",
        alt: "Estrutura metálica com captor tipo Franklin e cabo de descida do para-raios",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-10.jpeg",
        alt: "Cordoalha de cobre de aterramento e descida do SPDA em área externa",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-13-1.jpeg",
        alt: "Registro fotográfico de laudo técnico SPDA em telhado metálico industrial",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-13.jpeg",
        alt: "Descida de SPDA com cabo isolado e suportes de fixação em parede",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-15.jpeg",
        alt: "Vistoria de sistema de proteção contra descargas atmosféricas em instalação fotovoltaica",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-16.jpeg",
        alt: "Conectores e garras de cabo do SPDA em inspeção de laudo técnico",
      },
      {
        src: "/images/cards/laudo-spda/whatsapp-image-2026-09-07-at-16-52-18.jpeg",
        alt: "Medição de resistência de aterramento em sistema SPDA durante vistoria",
      },
    ],
  },
  {
    id: "estanqueidade-glp-gn",
    slug: "estanqueidade-glp-gn",
    nome: "Teste de Estanqueidade de Rede GLP/GN",
    nomeAbreviado: "Estanqueidade GLP/GN",
    categoria: "laudo",
    descricao:
      "Realização de teste de estanqueidade em redes de gás GLP e GN com emissão de laudo técnico e ART, conforme ABNT NBR 15526. Exigido para obtenção do habite-se e licenças sanitárias.",
    orgaos: ["CREA", "VISA Municipal", "Secretarias Municipais"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Teste de pressão e estanqueidade da rede GLP/GN",
      "Verificação de conformidade das instalações",
      "Laudo técnico com resultado e memorial de ensaio",
      "ART assinada por responsável técnico",
    ],
    setoresPrioritarios: [
      "Restaurantes e lanchonetes",
      "Indústrias alimentícias",
      "Hospitais e clínicas",
      "Hotéis e pousadas",
      "Condomínios residenciais e comerciais",
    ],
    normaBase: [
      "ABNT NBR 15526 — Redes de distribuição interna para gases combustíveis",
      "ABNT NBR 13523 — Central de GLP",
    ],
    iconeLucide: "Gauge",
    pathRota: "/estanqueidade-glp-gn",
    imagens: [
      {
        src: "/images/cards/gas/20260129-153857.jpg",
        alt: "Central de GLP com cilindros e rede de distribuição de gás durante teste de estanqueidade",
        destaque: true,
      },
      {
        src: "/images/cards/gas/20260427-120517.jpg",
        alt: "Rede de tubulação de gás com registros e manômetros para ensaio de pressão",
      },
      {
        src: "/images/cards/gas/20260701-151751.jpg",
        alt: "Bateria de cilindros de GLP em central de gás inspecionada para laudo de estanqueidade",
      },
      {
        src: "/images/cards/gas/whatsapp-image-2026-09-07-at-16-51-32-1.jpeg",
        alt: "Manômetro e conjunto de ensaio de pressão em rede de gás GLP/GN",
      },
      {
        src: "/images/cards/gas/whatsapp-image-2026-09-07-at-16-51-32-2.jpeg",
        alt: "Registro fotográfico de teste de estanqueidade em instalação de gás",
      },
      {
        src: "/images/cards/gas/whatsapp-image-2026-09-07-at-16-51-33.jpeg",
        alt: "Conexões e tubulação de rede de gás GLP em vistoria técnica",
      },
      {
        src: "/images/cards/gas/whatsapp-image-2026-09-07-at-16-52-06-1.jpeg",
        alt: "Central de gás com reguladores de pressão e cilindros de GLP",
      },
    ],
  },

  // ── PROJETOS (5 serviços independentes) ───────────────────────────────────

  {
    id: "levantamento-arquitetonico",
    slug: "levantamento-arquitetonico",
    nome: "Levantamento Arquitetônico",
    nomeAbreviado: "Levantamento Arquitetônico",
    categoria: "projeto",
    descricao:
      "Levantamento arquitetônico de edificações existentes com entrega em AutoCAD e PDF, incluindo planta baixa, cortes e fachadas. Base para aprovação em prefeituras e Corpo de Bombeiros.",
    orgaos: ["CAU", "CREA"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Planta baixa, cortes e fachadas",
      "Entrega em AutoCAD e PDF",
      "ART ou RRT assinada",
      "Base para aprovação em órgãos públicos",
    ],
    setoresPrioritarios: [
      "Comércio",
      "Indústria",
      "Saúde",
      "Ensino",
      "Galpões logísticos",
    ],
    normaBase: [
      "NBR 6492 — Representação de projetos de arquitetura",
      "Legislação municipal de uso e ocupação do solo",
    ],
    iconeLucide: "Scan",
    pathRota: "/levantamento-arquitetonico",
  },
  {
    id: "projeto-acessibilidade",
    slug: "projeto-acessibilidade",
    nome: "Projeto de Acessibilidade",
    nomeAbreviado: "Acessibilidade",
    categoria: "projeto",
    descricao:
      "Elaboração de projeto de acessibilidade conforme ABNT NBR 9050, adequando edificações às normas de acessibilidade universal para pessoas com deficiência ou mobilidade reduzida.",
    orgaos: ["CAU", "CREA", "Secretarias Municipais"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Diagnóstico de barreiras arquitetônicas",
      "Projeto de adequações conforme NBR 9050",
      "Memorial descritivo e especificações técnicas",
      "ART ou RRT assinada",
    ],
    setoresPrioritarios: [
      "Comércio",
      "Escola",
      "Saúde",
      "Edifícios públicos",
      "Hotelaria",
    ],
    normaBase: [
      "ABNT NBR 9050 — Acessibilidade",
      "Lei Federal 13.146/2015 (Lei Brasileira de Inclusão)",
    ],
    iconeLucide: "Accessibility",
    pathRota: "/projeto-acessibilidade",
  },
  {
    id: "projeto-combate-incendio",
    slug: "projeto-combate-incendio",
    nome: "Projeto de Sistemas de Combate ao Incêndio e Pânico",
    nomeAbreviado: "Projeto de Incêndio",
    categoria: "projeto",
    descricao:
      "Elaboração de projeto técnico completo dos sistemas de combate ao incêndio e pânico conforme as Instruções Técnicas do Corpo de Bombeiros estadual, com ART e acompanhamento até a aprovação.",
    orgaos: ["CREA", "CBMERJ", "CBPMESP", "CBMMG", "CBMES"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Projeto de hidrantes e mangueiras",
      "Projeto de sprinklers (NBR 10897)",
      "Projeto de detecção e alarme de incêndio",
      "Projeto de iluminação de emergência e sinalização",
      "ART assinada e acompanhamento até aprovação no CB",
    ],
    setoresPrioritarios: [
      "Galpões logísticos",
      "Indústrias",
      "Comércio",
      "Hospitais e clínicas",
      "Escolas",
    ],
    normaBase: [
      "Instrução Técnica (IT) do CB estadual",
      "ABNT NBR 13714 — Sistemas de hidrantes",
      "ABNT NBR 10897 — Sprinklers",
    ],
    iconeLucide: "Flame",
    pathRota: "/projeto-combate-incendio",
  },
  {
    id: "projeto-spda",
    slug: "projeto-spda",
    nome: "Projeto de Sistema de Proteção Contra Descargas Atmosféricas",
    nomeAbreviado: "Projeto SPDA",
    categoria: "projeto",
    descricao:
      "Elaboração de projeto técnico de SPDA (para-raios) conforme ABNT NBR 5419, com memorial de cálculo, ART assinada e cobertura em todo o Brasil.",
    orgaos: ["CREA"],
    estados: ["RJ", "SP", "MG", "ES", "BR"],
    coberturaNacional: true,
    itens: [
      "Memorial de cálculo de nível de proteção",
      "Projeto de captação, descida e aterramento",
      "Memorial descritivo e especificações de materiais",
      "ART assinada por engenheiro eletricista",
    ],
    setoresPrioritarios: [
      "Usinas fotovoltaicas",
      "Torres de telecomunicações",
      "Subestações elétricas",
      "Agronegócio",
      "Indústria",
    ],
    normaBase: [
      "ABNT NBR 5419 — Proteção contra descargas atmosféricas",
    ],
    iconeLucide: "CloudLightning",
    pathRota: "/projeto-spda",
    exibirNaTabs: false,
  },
  {
    id: "estruturas-metalicas",
    slug: "estruturas-metalicas",
    nome: "Projeto de Estruturas Metálicas",
    nomeAbreviado: "Estruturas Metálicas",
    categoria: "projeto",
    descricao:
      "Elaboração de projeto estrutural metálico para galpões, mezaninos, passarelas e coberturas, conforme ABNT NBR 8681 e NBR 6118, com ART assinada.",
    orgaos: ["CREA"],
    estados: ["RJ", "SP", "MG", "ES"],
    coberturaNacional: false,
    itens: [
      "Cálculo estrutural e memorial de cálculo",
      "Plantas, cortes e detalhamentos em AutoCAD",
      "Lista de materiais e perfis metálicos",
      "ART assinada por engenheiro civil ou estrutural",
    ],
    setoresPrioritarios: [
      "Galpões logísticos",
      "Indústrias",
      "Agronegócio",
      "Energia Solar",
      "Comércio",
    ],
    normaBase: [
      "ABNT NBR 8681 — Ações e segurança nas estruturas",
      "ABNT NBR 6118 — Projeto de estruturas de concreto",
      "ABNT NBR 7190 — Projeto de estruturas de madeira (referência)",
    ],
    iconeLucide: "Construction",
    pathRota: "/estruturas-metalicas",
    exibirNaTabs: false,
  },

  // ── PROJETOS legado (mantém compatibilidade com setores[] existentes) ──────
  // exibirNaTabs: false — não renderizar como card nas ServicosTabs.
  // Preservado apenas para manter os IDs referenciados em setores[].

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
    exibirNaTabs: false,
  },

] as const;

// ─── Setores atendidos ─────────────────────────────────────────────────────────────────

export const setores: readonly Setor[] = [
  {
    id: "industria",
    nome: "Indústria",
    servicoIds: [
      "avcb", "spda", "laudos-tecnicos", "licenciamento-ambiental",
      "projeto-combate-incendio", "projeto-spda", "estruturas-metalicas",
      "laudo-spda", "estanqueidade-glp-gn",
    ],
  },
  {
    id: "comercio",
    nome: "Comércio (lojas e supermercados)",
    servicoIds: [
      "avcb", "vigilancia-sanitaria",
      "levantamento-arquitetonico", "projeto-acessibilidade", "projeto-combate-incendio",
      "estanqueidade-glp-gn",
    ],
  },
  {
    id: "galpao-logistico",
    nome: "Depósito / Galpão Logístico",
    servicoIds: [
      "avcb", "spda", "laudos-tecnicos",
      "projeto-combate-incendio", "estruturas-metalicas",
    ],
  },
  {
    id: "telecom",
    nome: "Telecomunicações (torres)",
    servicoIds: [
      "spda", "avcb", "laudos-tecnicos", "aterramento",
      "projeto-spda", "laudo-spda",
    ],
  },
  {
    id: "energia-solar",
    nome: "Energia Solar (usinas fotovoltaicas)",
    servicoIds: [
      "spda", "aterramento", "laudos-tecnicos",
      "projeto-spda", "estruturas-metalicas", "laudo-spda",
    ],
  },
  {
    id: "subestacoes",
    nome: "Subestações Elétricas",
    servicoIds: [
      "spda", "aterramento", "teste-continuidade",
      "projeto-spda", "laudo-spda",
    ],
  },
  {
    id: "posto-combustivel",
    nome: "Posto de Combustível",
    servicoIds: [
      "avcb", "licenciamento-ambiental", "vigilancia-sanitaria",
      "estanqueidade-glp-gn",
    ],
  },
  {
    id: "escola",
    nome: "Escola",
    servicoIds: [
      "avcb", "vigilancia-sanitaria",
      "levantamento-arquitetonico", "projeto-acessibilidade", "projeto-combate-incendio",
    ],
  },
  {
    id: "igreja",
    nome: "Igreja",
    servicoIds: [
      "avcb",
      "levantamento-arquitetonico", "projeto-combate-incendio",
    ],
  },
  {
    id: "agronegocio",
    nome: "Agronegócio",
    servicoIds: [
      "spda", "licenciamento-ambiental", "aterramento",
      "projeto-spda", "estruturas-metalicas", "laudo-spda",
    ],
  },
  {
    id: "saude",
    nome: "Clínica / Saúde",
    servicoIds: [
      "vigilancia-sanitaria",
      "levantamento-arquitetonico", "projeto-acessibilidade", "projeto-combate-incendio",
      "estanqueidade-glp-gn",
    ],
  },
  {
    id: "ceramica",
    nome: "Cerâmica",
    servicoIds: ["avcb", "licenciamento-ambiental", "spda"],
  },
] as const;

// ─── Clientes (prova social) ───────────────────────────────────────────────────────────────
//
// destaque: true  → exibido em subpáginas (getClientesDestaque)
// destaque: false → apenas no slider da homepage (getTodosClientesLogos)
//
// logoSize: "default" → 281×93px  (+50% vs base 187×62 — usar para 1.png)
// logoSize: "medium"  → 243×81px  (+30% vs base 187×62 — usar para 6.png)
// logoSize: "large"   → 374×124px (+100% vs base 187×62 — padrão para demais)
// Omitir logoSize equivale a "large".
//
// Logos PNG em /public/images/clientes/1.png … 20.png
// Ordem dos arquivos conforme entregue pelo cliente.

export const clientes: readonly Cliente[] = [
  { id: "claro",            nome: "Claro",                       segmento: "Telecomunicações",       logoPath: "/images/clientes/1.png",  destaque: true,  logoSize: "default" },
  { id: "embraer",          nome: "Embraer",                     segmento: "Aeronáutica / Indústria", logoPath: "/images/clientes/2.png",  destaque: true  },
  { id: "brasil-center",    nome: "Brasil Center",               segmento: "Telecomunicações",       logoPath: "/images/clientes/3.png",  destaque: true  },
  { id: "ambev",            nome: "Ambev",                       segmento: "Alimentação / Bebidas",  logoPath: "/images/clientes/4.png",  destaque: true  },
  { id: "della-delle",      nome: "Della & Delle",               segmento: "Comércio",               logoPath: "/images/clientes/5.png",  destaque: true  },
  { id: "if",               nome: "IF",                          segmento: "Educação",               logoPath: "/images/clientes/6.png",  destaque: false, logoSize: "medium" },
  { id: "sonne",            nome: "SONNE",                       segmento: "Energia Solar",          logoPath: "/images/clientes/7.png",  destaque: false },
  { id: "brasol",           nome: "Brasol",                      segmento: "Energia Solar",          logoPath: "/images/clientes/8.png",  destaque: false },
  { id: "rzk-energia",      nome: "RZK Energia",                 segmento: "Energia",                logoPath: "/images/clientes/9.png",  destaque: false },
  { id: "athon-energia",    nome: "Athon Energia",               segmento: "Energia",                logoPath: "/images/clientes/10.png", destaque: false },
  { id: "pmc",              nome: "PMC",                         segmento: "Indústria",              logoPath: "/images/clientes/11.png", destaque: false },
  { id: "eco-solucoes",     nome: "ECO Soluções em Energia",     segmento: "Energia",                logoPath: "/images/clientes/12.png", destaque: false },
  { id: "casa-das-telhas",  nome: "Casa das Telhas",             segmento: "Comércio / Materiais",   logoPath: "/images/clientes/13.png", destaque: false },
  { id: "natural-energia",  nome: "Natural Energia",             segmento: "Energia",                logoPath: "/images/clientes/14.png", destaque: false },
  { id: "mercado-livre",    nome: "Mercado Livre",               segmento: "Logística / E-commerce", logoPath: "/images/clientes/15.png", destaque: true  },
  { id: "colegio-asa",      nome: "Colégio ASA",                 segmento: "Educação",               logoPath: "/images/clientes/16.png", destaque: false },
  { id: "sollax-safety",    nome: "SOLLAX SAFETY",               segmento: "Segurança / EPI",        logoPath: "/images/clientes/17.png", destaque: false },
  { id: "super-bom",        nome: "Supermercado Super Bom",      segmento: "Varejo / Alimentação",   logoPath: "/images/clientes/18.png", destaque: false },
  { id: "acelleron",        nome: "Acelleron",                   segmento: "Tecnologia / Indústria", logoPath: "/images/clientes/19.png", destaque: false },
  { id: "thopen",           nome: "Thopen",                      segmento: "Indústria",              logoPath: "/images/clientes/20.png", destaque: false },
] as const;

// ─── Diferenciais competitivos ──────────────────────────────────────────────────────────────

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
      "Claro, Embraer, Ambev e Mercado Livre como prova social B2B comprovada.",
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

// ─── Contato ──────────────────────────────────────────────────────────────────────────────

export const contato: ContatoEmpresa = {
  whatsapp: "5522981121315",
  telefone: "(22) 98112-1315",
  email: "centralsolu@outlook.com",
  instagram: "@centraldesolucoes",
  instagramUrl: "https://www.instagram.com/centraldesolucoes",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────────────────

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

/** Retorna os clientes em destaque (subpáginas de serviço) */
export function getClientesDestaque(): readonly Cliente[] {
  return clientes.filter((c) => c.destaque);
}

/**
 * Retorna todos os clientes que possuem logoPath.
 * Usado exclusivamente pelo slider da homepage (TrustBar).
 */
export function getTodosClientesLogos(): readonly Cliente[] {
  return clientes.filter((c): c is Cliente & { logoPath: string } =>
    typeof c.logoPath === "string" && c.logoPath.length > 0
  );
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
