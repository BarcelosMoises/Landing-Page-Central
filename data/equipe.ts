/**
 * equipe.ts
 * ---------
 * Dados tipados da equipe técnica da Central de Soluções.
 * Fonte: portfólio do cliente (PDFs de Janeiro/2026).
 *
 * IMPORTANTE: estes são os nomes e especialidades EXATOS conforme
 * divulgados pelo cliente no material de marketing. Não alterar sem
 * confirmação do cliente.
 */

export interface MembroEquipe {
  /** Nome completo conforme portfólio do cliente */
  nome: string;
  /** Slug para uso em URLs e atributos HTML */
  slug: string;
  /** Lista de especialidades/títulos profissionais — ordem importa (principal primeiro) */
  especialidades: readonly string[];
  /** Caminho da foto em /public — extrair dos PDFs antes do deploy */
  foto: string;
  /** Alt text acessível e otimizado para SEO */
  fotoAlt: string;
  /** Número de registro profissional (CREA/CAU) — preencher quando disponível */
  registro?: string;
  /** LinkedIn do profissional — preencher quando disponível */
  linkedin?: string;
}

export const equipe: readonly MembroEquipe[] = [
  {
    nome: "Durval Ribeiro de Queiroz",
    slug: "durval-ribeiro-de-queiroz",
    especialidades: [
      "Arquiteto e Urbanista",
      "Engenheiro de Segurança do Trabalho",
      "Engenheiro de Segurança Contra Incêndio e Pânico",
    ],
    foto: "/images/equipe/durval.jpg",
    fotoAlt:
      "Durval Ribeiro de Queiroz — Arquiteto, Engenheiro de Segurança Contra Incêndio e Pânico",
    registro: undefined, // TODO: preencher com número CREA/CAU quando disponível
    linkedin: undefined, // TODO: preencher com URL do LinkedIn quando disponível
  },
  {
    nome: "Theyllor Estulano do Espirito Santo",
    slug: "theyllor-estulano-do-espirito-santo",
    especialidades: [
      "Engenheiro Civil",
      "Técnico em Mecânica",
    ],
    foto: "/images/equipe/theyllor.jpg",
    fotoAlt:
      "Theyllor Estulano do Espirito Santo — Engenheiro Civil, Técnico em Mecânica",
    registro: undefined, // TODO: preencher com número CREA quando disponível
    linkedin: undefined, // TODO: preencher com URL do LinkedIn quando disponível
  },
] as const;

/**
 * Retorna um membro da equipe pelo slug.
 * Útil para páginas dinâmicas de perfil.
 */
export function getMembroBySlug(
  slug: string
): MembroEquipe | undefined {
  return equipe.find((m) => m.slug === slug);
}
