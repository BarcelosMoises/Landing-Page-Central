// data/equipe.ts
// Fonte única de verdade dos membros da equipe técnica da Central de Soluções.
// Dados extraídos do portfólio físico do cliente (PDFs de apresentação, Maio 2026).
// NÃO editar nomes ou especialidades sem confirmar com o cliente.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Tipo canônico (schema completo, fonte única de verdade) ──────────────────────

export interface MembroEquipe {
  /** Identificador único — usado como key em listas e como seletor de foto */
  readonly slug: string;
  /** Nome completo conforme portfólio do cliente */
  readonly nome: string;
  /**
   * Título profissional principal — aparece logo abaixo do nome.
   * Ex: "Arquiteto e Urbanista"
   */
  readonly tituloPrincipal: string;
  /**
   * Especializações adicionais — exibidas como badges ou lista secundária.
   * Nunca incluir o tituloPrincipal aqui (evita duplicação visual).
   */
  readonly especializacoes: readonly string[];
  /**
   * Número de registro no CREA ou CAU.
   * Preencher quando disponível — campo de autoridade E-E-A-T.
   * Formato: "CREA-RJ 123456/D" ou "CAU A123456-0"
   */
  readonly registro?: string;
  /**
   * Caminho relativo à pasta /public para a foto de perfil.
   * Usar next/image com width=320 height=320 e object-fit cover.
   * Padrão enquanto a foto real não for comitada: undefined (mostrar placeholder)
   */
  readonly foto?: string;
  /**
   * Alt text da foto — já escrito para acessibilidade e SEO.
   * Descreve quem é a pessoa e o contexto, não apenas o nome.
   */
  readonly fotoAlt?: string;
  /** URL completa do perfil LinkedIn — usada no JSON-LD como sameAs */
  readonly linkedin?: string;
}

// ─── Dados da equipe ───────────────────────────────────────────────────────────────────
// Ordem: sócios fundadores primeiro, depois demais membros.

export const equipe: readonly MembroEquipe[] = [
  {
    slug: "durval",
    nome: "Durval Ribeiro de Queiroz",
    tituloPrincipal: "Arquiteto e Urbanista",
    especializacoes: [
      "Engenharia de Segurança do Trabalho",
      "Engenharia de Segurança Contra Incêndio e Pânico",
    ],
    // registro: "CAU A000000-0", // preencher quando disponível
    foto: "/images/equipe/durval-ribeiro.jpg",
    fotoAlt:
      "Durval Ribeiro de Queiroz, Arquiteto e Urbanista especializado em Segurança Contra Incêndio, sócio da Central de Soluções",
    // linkedin: "https://www.linkedin.com/in/durval-ribeiro", // preencher quando disponível
  },
  {
    slug: "theyllor",
    nome: "Theyllor Estulano do Espírito Santo",
    tituloPrincipal: "Engenheiro Civil",
    especializacoes: [
      "Técnico em Mecânica",
    ],
    // registro: "CREA-RJ 000000/D", // preencher quando disponível
    foto: "/images/equipe/theyllor-estulano.jpg",
    fotoAlt:
      "Theyllor Estulano do Espírito Santo, Engenheiro Civil e Técnico em Mecânica, sócio da Central de Soluções",
    // linkedin: "https://www.linkedin.com/in/theyllor-estulano", // preencher quando disponível
  },
] as const;

// ─── Helper ─────────────────────────────────────────────────────────────────────────────

/** Retorna um membro da equipe pelo slug */
export function getMembroPorSlug(slug: string): MembroEquipe | undefined {
  return equipe.find((m) => m.slug === slug);
}

// ─── Tipo de compatibilidade para data/servicos.ts e páginas de serviço ──────────────────
//
// As páginas de serviço (ex: vigilancia-sanitaria/page.tsx) importam `equipe`
// de @/data/servicos e consomem os campos: id, nome, formacao, especialidades.
//
// Este tipo mapeia o schema canônico acima para esses campos, permitindo que
// data/servicos.ts re-exporte equipe sem duplicar os dados.
//
// NUNCA usar MembroEquipeServico fora de data/servicos.ts — prefer sempre
// MembroEquipe com os campos canônicos (slug, tituloPrincipal, especializacoes).

export interface MembroEquipeServico {
  readonly id: string;              // ← mapeado de slug
  readonly nome: string;            // ← idêntico
  readonly formacao: string;        // ← mapeado de tituloPrincipal
  readonly especialidades: readonly string[]; // ← mapeado de especializacoes
}

/**
 * Versão da equipe com campos compatíveis com as páginas de serviço.
 * Re-exportado por data/servicos.ts como `equipe` para manter o import
 * existente nas páginas sem duplicar dados.
 */
export const equipeServicos: readonly MembroEquipeServico[] = equipe.map(
  (m) => ({
    id: m.slug,
    nome: m.nome,
    formacao: m.tituloPrincipal,
    especialidades: m.especializacoes,
  })
);
