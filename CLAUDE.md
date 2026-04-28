# CLAUDE.md — Central de Soluções Landing Page
> Instruções específicas para o Claude Code (claude.ai/code ou CLI).
> Complementa o AGENTS.md com diretrizes de geração de código para o Claude.
> Última atualização: Abril 2026

---

## Contexto Rápido

Projeto: Landing page B2B para empresa de engenharia civil (regularização, AVCB, SPDA, licenciamento ambiental).
Stack: Next.js 14 App Router + Tailwind CSS + TypeScript.
Docs: `docs/AGENTS.md` (regras globais) | `docs/SEO.md` (keywords) | `docs/SERVICOS.md` (conteúdo) | `docs/DESIGN.md` (visual).

---

## Padrões de Código

### TypeScript
- Todo arquivo `.tsx` com tipagem explícita — sem `any`
- Props de componentes sempre com interface nomeada: `interface HeroProps { ... }`
- Dados de serviços tipados em `/data/servicos.ts` com `as const`

### Componentes
- Componentes de servidor por padrão — adicionar `"use client"` apenas quando necessário (eventos, hooks de estado)
- Nomes de arquivo: PascalCase para componentes (`HeroSection.tsx`), kebab-case para rotas (`app/avcb-corpo-de-bombeiros/page.tsx`)
- Exportar como `export default` nos `page.tsx`, `export` nomeado nos componentes

### Metadata API (SEO)
```tsx
// Padrão obrigatório em cada page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AVCB RJ — Regularização Junto ao Corpo de Bombeiros | Central de Soluções",
  description: "Regularização de AVCB no RJ com engenheiros especializados. Atendemos indústrias, galpões e telecomunicações. Solicite orçamento.",
  keywords: ["avcb rj", "avcb rj para indústria", "regularização cbmerj"],
  openGraph: {
    title: "...",
    description: "...",
    locale: "pt_BR",
    type: "website",
  },
};
```

### JSON-LD (Obrigatório)
```tsx
// Componente reutilizável — criar em /components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Uso em page.tsx de serviço
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Regularização AVCB",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Central de Soluções",
  },
  "areaServed": ["Rio de Janeiro", "São Paulo", "Minas Gerais", "Espírito Santo"],
};
```

### Imagens
```tsx
// Sempre com next/image
import Image from "next/image";
<Image
  src="/images/hero-engenharia.jpg"
  alt="Engenheiros realizando vistoria técnica em galpão industrial"
  width={1920}
  height={1080}
  priority  // obrigatório para imagens above-the-fold
  className="object-cover"
/>
```

---

## O que NÃO gerar

- `import Head from "next/head"` — Pages Router, incompatível com App Router
- `import { NextSeo }` — não usar next-seo
- `<style jsx>` — usar apenas Tailwind
- Fetch de dados em componentes cliente sem SWR/React Query quando necessário
- `console.log` em código de produção
- Comentários óbvios que apenas descrevem o código literalmente

---

## Estrutura de Resposta Preferida

Quando gerar um componente completo, entregar nesta ordem:
1. Arquivo do componente (`.tsx`)
2. Tipos/interfaces utilizados (se não estiverem no próprio arquivo)
3. Qualquer dado necessário em `/data/*.ts`
4. Snippet do JSON-LD correspondente (se for `page.tsx`)

Quando houver dúvida sobre keyword ou texto de serviço, **consultar `docs/SEO.md` e `docs/SERVICOS.md`** antes de inventar conteúdo.
