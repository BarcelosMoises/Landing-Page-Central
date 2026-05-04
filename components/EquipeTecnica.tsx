import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { equipe, type MembroEquipe } from "@/data/equipe";

// ─── JSON-LD Person ──────────────────────────────────────────────────────────────────
//
// Dados complementares para JSON-LD (knowsAbout) que vão além dos títulos
// profissionais — mapeados pelo slug para manter o data/equipe.ts limpo.

const CONHECIMENTOS_JSONLD: Record<string, string[]> = {
  "durval-ribeiro-de-queiroz": [
    "AVCB",
    "CLCB",
    "Sistemas de Combate a Incêndio",
    "Engenharia de Segurança do Trabalho",
    "Projetos Arquitetônicos",
    "SPDA",
  ],
  "theyllor-estulano-do-espirito-santo": [
    "Engenharia Civil",
    "SPDA",
    "Aterramento Elétrico",
    "Licenciamento Ambiental",
    "Laudos Técnicos",
  ],
};

const pessoasJsonLd = equipe.map((membro) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: membro.nome,
  jobTitle: membro.especialidades[0], // título principal
  worksFor: {
    "@type": "Organization",
    name: "Central de Soluções Engenharia",
    url: "https://www.centraldesolucoes.eng.br",
  },
  knowsAbout: CONHECIMENTOS_JSONLD[membro.slug] ?? [...membro.especialidades],
  ...(membro.linkedin ? { sameAs: membro.linkedin } : {}),
}));

// ─── Sub-componente: card de profissional ────────────────────────────────────────

function MembroCard({
  nome,
  foto,
  fotoAlt,
  especialidades,
  registro,
}: MembroEquipe) {
  const primeiroNome = nome.split(" ")[0];
  // Primeiro item é o título principal; os demais são especialidades secundárias
  const tituloPrincipal = especialidades[0];
  const especialidadesSecundarias = especialidades.slice(1);

  return (
    <article
      aria-label={`Perfil profissional de ${nome}`}
      className="bg-white border border-neutral-100 rounded-xl p-6 md:p-8 flex flex-col items-center text-center gap-5"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Foto */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={foto}
          alt={fotoAlt}
          fill
          sizes="96px"
          className="object-cover rounded-full"
        />
      </div>

      {/* Nome e título principal */}
      <div className="flex flex-col gap-1">
        {/* text-neutral-900 sobre #fff → contraste 18.1:1 ✓ AAA */}
        <h3
          className="font-heading text-xl font-bold text-neutral-900 leading-snug"
          itemProp="name"
        >
          {nome}
        </h3>
        {/* text-neutral-600 sobre #fff → contraste 5.9:1 ✓ AA */}
        <p
          className="text-neutral-600 text-sm font-medium"
          itemProp="jobTitle"
        >
          {tituloPrincipal}
        </p>
        {registro && (
          <p className="text-neutral-400 text-xs" itemProp="identifier">
            CREA {registro}
          </p>
        )}
      </div>

      {/* Badges de especialidades secundárias */}
      {especialidadesSecundarias.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-2"
          aria-label={`Especialidades adicionais de ${primeiroNome}`}
        >
          {especialidadesSecundarias.map((esp) => (
            <span
              key={esp}
              itemProp="knowsAbout"
              className="text-xs font-semibold bg-[#800000]/10 text-[#800000] rounded-full px-3 py-1"
            >
              {esp}
            </span>
          ))}
        </div>
      )}

      {/* Indicador de ART */}
      <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="font-semibold">Assina ARTs diretamente</span>
      </div>
    </article>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────────

export function EquipeTecnica() {
  return (
    <>
      {/* JSON-LD Person para cada profissional */}
      {pessoasJsonLd.map((pessoa) => (
        <JsonLd key={pessoa.name} data={pessoa} />
      ))}

      <section
        aria-labelledby="equipe-heading"
        className="bg-neutral-50 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cabeçalho */}
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#800000] mb-3">
              Responsabilidade técnica real
            </p>
            {/* text-neutral-900 sobre bg-neutral-50 → contraste 18.1:1 ✓ AAA */}
            <h2
              id="equipe-heading"
              className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 leading-tight mb-4"
            >
              Engenheiros Reais Assinando Cada ART
            </h2>
            {/* text-neutral-700 sobre bg-neutral-50 → contraste 9.4:1 ✓ AAA */}
            <p className="text-neutral-700 text-lg leading-relaxed">
              Diferente de empresas que terceirizam a responsabilidade técnica,
              na Central de Soluções cada laudo, projeto e relatório é assinado
              diretamente pelos engenheiros da equipe, com ART registrada no
              CREA. Seu nome e o deles estão no mesmo documento.
            </p>
          </div>

          {/* Cards dos profissionais */}
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl"
            aria-label="Equipe técnica da Central de Soluções"
          >
            {equipe.map((membro) => (
              <li key={membro.slug} className="list-none">
                <MembroCard {...membro} />
              </li>
            ))}
          </ul>

          {/* Bloco E-E-A-T sobre CREA e responsabilidade */}
          <div className="mt-12 max-w-3xl bg-white border border-neutral-100 rounded-xl p-6 md:p-8">
            <h3 className="font-heading text-base font-bold text-neutral-900 mb-3">
              O que significa ter ART em cada serviço?
            </h3>
            <p className="text-neutral-700 text-sm leading-relaxed mb-4">
              A ART (Anotação de Responsabilidade Técnica) é o documento emitido
              pelo CREA que vincula legalmente um engenheiro ou arquiteto
              habilitado a um serviço específico. Órgãos como o Corpo de
              Bombeiros, INEA, CETESB e IEMA não aceitam laudos técnicos sem
              ART — documentos sem assinatura de responsável técnico registrado
              no CREA são inválidos para fins de regularização.
            </p>
            <p className="text-neutral-700 text-sm leading-relaxed">
              Ao contratar a Central de Soluções, você recebe documentos com
              validade jurídica e técnica completa: o engenheiro responsável
              assina e assume responsabilidade civil pelo conteúdo, garantindo
              que os laudos e projetos entregues serão aceitos pelos órgãos
              competentes em RJ, SP, MG e ES.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
