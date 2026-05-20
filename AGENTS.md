# AGENTS.md — Central de Soluções Landing Page
> Arquivo de contexto global. Lido automaticamente por Claude Code, Gemini CLI e demais agentes.
> Atualizar este arquivo sempre que houver mudança de stack, escopo ou decisão arquitetural.
> Última atualização: Maio 2026

---

## Identidade do Projeto

- **Cliente:** Central de Soluções
- **Segmento:** Engenharia civil — regularização, projetos técnicos, laudos e sistemas de segurança
- **Responsáveis técnicos** (dados extraídos do portfólio do cliente — não alterar sem confirmação):
  - **Durval Ribeiro de Queiroz** — Arquiteto e Urbanista, Eng. Segurança do Trabalho, Eng. Segurança Contra Incêndio e Pânico
  - **Theyllor Estulano do Espírito Santo** — Engenheiro Civil, Técnico em Mecânica
- **Fonte de verdade da equipe:** `data/equipe.ts` — importar sempre dali, nunca hardcodar nomes
- **Região de atuação:** ES, MG, RJ, SP (alguns serviços: todo Brasil)
- **Objetivo do site:** Landing page de alta conversão B2B + ranqueamento orgânico no Google

---

## Stack Tecnológico

| Camada | Tecnologia | Observações |
|---|---|---|
| Framework | Next.js 15 (App Router) | Usar apenas App Router — sem Pages Router |
| Estilização | Tailwind CSS v3 | Sem CSS Modules nem styled-components |
| Dados estruturados | JSON-LD nativo | Nunca usar next-seo — incompatível com App Router |
| Formulários | React Hook Form + Zod | Validação de schema obrigatória |
| Imagens | next/image com priority | Todas as imagens above-the-fold com priority={true} |
| Deploy | Vercel | Edge Network — sem configurações de servidor customizado |
| Analytics | Google Search Console + GA4 | Implementar via @next/third-parties |
| Fontes | next/font (Google Fonts) | Nunca importar fontes via <link> no HTML |

---

## Arquitetura de Rotas (App Router)

```
app/
├── layout.tsx                  # RootLayout com JSON-LD Organization + nav
├── page.tsx                    # Homepage — keyword: "regularização engenharia civil"
├── avcb-corpo-de-bombeiros/
│   ├── layout.tsx              # Define --color-service-accent: #800000
│   └── page.tsx                # keyword: "avcb [estado] regularização"
├── vigilancia-sanitaria/
│   ├── layout.tsx              # Define --color-service-accent: #0d7377
│   └── page.tsx                # keyword: "alvará sanitário [estado] consultoria"
├── spda-para-raios/
│   ├── layout.tsx              # Define --color-service-accent: #92610a
│   └── page.tsx                # keyword: "laudo spda com art [estado]"
├── laudos-tecnicos/
│   ├── layout.tsx              # Define --color-service-accent: #92610a
│   └── page.tsx                # keyword: "laudo técnico engenharia [estado]"
├── licenciamento-ambiental/
│   ├── layout.tsx              # Define --color-service-accent: #2d6a2d
│   └── page.tsx                # keyword: "licenciamento ambiental [estado]"
└── projetos/
    ├── layout.tsx              # Define --color-service-accent: #1e40af
    └── page.tsx                # keyword: "projeto combate incêndio pânico"
```

> Todas as keywords, rotas e variações por estado estão em `/docs/SEO.md`

---

## Sistema de Cores por Serviço

> **Origem:** o cliente usa cores distintas por categoria nos materiais de marketing (Instagram, portfólio).
> O site herda esse sistema para manter coerência visual entre site e redes sociais.

### Regra principal
- A cor global da marca (`#800000`) é o accent da homepage, navegação e footer.
- Cada **subpágina de serviço** define seu accent via `layout.tsx` — **não apenas no `<main>`**.
- O `layout.tsx` de cada subpágina envolve o conteúdo num `<div>` com a CSS variable, garantindo que `NavPrimaria` e `Footer` também herdem a cor do serviço.
- O `<main data-service="...">` da `page.tsx` ainda é mantido para os seletores do `globals.css`.
- Componentes genéricos usam `var(--color-service-accent, #800000)` — o fallback `#800000` garante que a homepage funcione sem o attribute.
- **Proibido hardcodar `#800000` em componentes reutilizados entre subpáginas** (botões, cards, badges).

### Mapa de cores

| Categoria | Rota | Accent | Hover |
|---|---|---|---|
| AVCB | `/avcb-corpo-de-bombeiros` | `#800000` | `#4f0101` |
| Vigilância Sanitária | `/vigilancia-sanitaria` | `#0d7377` | `#095e62` |
| Licenciamento Ambiental | `/licenciamento-ambiental` | `#2d6a2d` | `#1e4d1e` |
| Laudos / SPDA | `/laudos-tecnicos`, `/spda-para-raios` | `#92610a` | `#6e4908` |
| Projetos Técnicos | `/projetos` | `#1e40af` | `#1e3a8a` |

### Regra de Layout por Subpágina

> **Obrigatório:** toda subpágina de serviço deve ter um `layout.tsx` próprio.
> Esse arquivo é um Server Component puro (sem `"use client"`), define a CSS variable no `<div>` wrapper
> e não redeclara `<html>` nem `<body>` — apenas o RootLayout os define.

```tsx
// Padrão canônico — copiar e ajustar as cores por subpágina
// Exemplo: app/licenciamento-ambiental/layout.tsx
import type React from "react"

export default function LayoutAmbiental({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        "--color-service-accent": "#2d6a2d",
        "--color-service-accent-hover": "#1e4d1e",
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
```

### Como usar nos componentes

```tsx
// Botão primário — cor derivada da página
<button style={{ backgroundColor: "var(--color-service-accent, #800000)" }}>
  Solicitar Orçamento
</button>

// Badge
<span style={{
  backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 10%, transparent)",
  color: "var(--color-service-accent, #800000)",
}}>
  CBMERJ · RJ
</span>

// Tailwind não suporta CSS variables arbitrárias sem plugin — usar style= inline para accent dinâmico
```

---

## Identidade Visual — Elementos Gráficos

### CrosshairDecor
- **Arquivo:** `components/CrosshairDecor.tsx`
- **O quê:** SVG inline da retícula de engenharia presente em todos os posts do Instagram do cliente
- **Quando usar:** em toda `<section className="relative">` com fundo escuro (`bg-[#1a0000]`, `bg-[#0a0a0a]`, hero)
- **Fundos escuros que recebem CrosshairDecor:** `bg-[#1a0000]` (nav, SetoresAtendidos, FormularioContato, Footer, Glossário/Normas) · `bg-[#0a0a0a]` (hero) · qualquer seção com overlay escuro
- **Props:** `corner` (bottom-right | bottom-left | top-right | top-left), `variant` (light | dark), `size` (sm | md | lg)
- **Padrão:** `<CrosshairDecor />` — já posicionado no canto inferior direito
- **Nunca** escalar ou colorir manualmente — usar as props fornecidas

### Fotos reais do portfólio
- Localização: `/public/images/portfolio/` e `/public/images/equipe/`
- **Nunca usar stock photos** enquanto houver fotos reais disponíveis
- Mapeamento completo de foto por seção/rota: ver `docs/DESIGN.md`

---

## Regras de SEO (Obrigatórias)

1. **1 keyword primária por `page.tsx`** — sem exceção. Variações long-tail ficam no corpo do texto.
2. **Metadata API nativa** — usar `export const metadata: Metadata` em cada `page.tsx`, nunca `<Head>` do Pages Router.
3. **JSON-LD obrigatório em toda página** — mínimo `LocalBusiness` na homepage, `Service` nas demais.
4. **`FAQPage` schema** nas páginas de serviço com mínimo 3 perguntas/respostas sobre o serviço.
5. **Conteúdo indexável na página** — textos de laudos, decretos, siglas e explicações técnicas devem estar no DOM, nunca apenas em modais ou tooltips.
6. **Alt text obrigatório** em todas as imagens — descrever o conteúdo técnico real, não "imagem1.jpg".
7. **URLs amigáveis sem parâmetros** — `/avcb-corpo-de-bombeiros`, nunca `/servicos?id=1`.

---

## Regras de Performance

- LCP alvo: < 2.5s (Core Web Vitals)
- Hero section: usar `next/image` com `priority={true}` — **nunca vídeo autoplay sem fallback de imagem estática**
- Fontes: `display: swap` obrigatório via `next/font`
- Animações: usar `prefers-reduced-motion` em todos os componentes com transição
- Bundle: sem dependências desnecessárias — checar `next bundle-analyzer` antes de cada PR

---

## Regras de Acessibilidade (WCAG 2.1 AA)

- Todos os botões CTA com `aria-label` descritivo
- Contraste mínimo de 4.5:1 para textos sobre fundos coloridos
- **Verificar contraste para cada accent de serviço** — teal `#0d7377`, verde `#2d6a2d` e dourado `#92610a` sobre branco podem falhar em texto pequeno
- Navegação por teclado testada em todos os formulários
- Headings em ordem hierárquica: H1 → H2 → H3 (nunca pular níveis)
- `lang="pt-BR"` no `<html>` do RootLayout
- **Foco visível sempre em vinho (`#800000`)** — nunca deixar o `outline` ou `ring` azul padrão do navegador/Tailwind aparecer.
  - Garantia global: `:focus-visible { outline: 2px solid #800000; outline-offset: 3px }` está definido em `app/globals.css` `@layer base` e cobre **todos** os elementos.
  - Em componentes com `focus-visible:ring-*` explícito, usar sempre `focus-visible:ring-[#800000]` ou `focus-visible:ring-primary`.

---

## Design System

- **Referência completa:** `docs/DESIGN.md`
- **Cor primária global:** `#800000` (vinho) — homepage, nav, footer
- **Fundo da nav ao scroll:** `#1a0000` (vinho escuro cinemático) — `bg-[#1a0000]/95`
- **Fundo do menu mobile:** `#1a0000` (vinho escuro cinemático) — `bg-[#1a0000]/98`
- **Fundo de seções escuras de conteúdo:** `#1a0000` — SetoresAtendidos, FormularioContato, Footer, Glossário/Normas
- **Token de texto sobre `#1a0000` (secundário):** `#c4a8a8` — cinza rosado quente, contraste ≈ 6.5:1 ✓ WCAG AA
- **Token de texto sobre `#1a0000` (primário suave):** `#e0c8c8` — bege rosado, contraste ≈ 11:1 ✓ WCAG AAA
- **Accent por serviço:** ver tabela acima — sempre via CSS variable
- **Estilo:** Cinemático industrial — sóbrio, técnico, confiável
- **Nunca usar:** glassmorphism em conteúdo indexável pelo Google

---

## Hierarquia dos Fundos Escuros

> Regra de temperatura de cor: todos os fundos escuros do site são **quentes** (família vinho/preto-quente).
> O cinza azulado `#111827` (Tailwind `neutral-900`) nunca deve aparecer como fundo de seção ou nav.

| Papel | Valor | Componentes |
|---|---|---|
| Fundo hero / mais escuro | `#0a0a0a` | Hero section, seções cinemáticas de impacto máximo |
| Fundo padrão de seções escuras | `#1a0000` | SetoresAtendidos, FormularioContato, Footer, Glossário/Normas |
| Nav ao scroll (95% opacidade) | `bg-[#1a0000]/95` + `backdrop-blur` | NavPrimaria (estado scrolled) |
| Nav menu mobile (98% opacidade) | `bg-[#1a0000]/98` | NavPrimaria (dropdown mobile) |
| Overlay de hero sobre foto | `from-[#4f0101]/85 to-[#0a0000]/60` | Hero section gradient |

### Textos sobre fundos `#1a0000`

| Papel | Classe / Valor | Contraste |
|---|---|---|
| Texto principal | `text-white` | ~16:1 ✓ AAA |
| Texto secundário / subtítulos | `style={{ color: "#c4a8a8" }}` | ≈ 6.5:1 ✓ AA |
| Texto terciário / labels | `text-white/70` | ≈ 10.7:1 ✓ AAA |
| Links e e-mails secundários | `style={{ color: "#c4a8a8" }}` | ≈ 6.5:1 ✓ AA |
| Cor primária suave (nomes, destaques) | `style={{ color: "#e0c8c8" }}` | ≈ 11:1 ✓ AAA |

> **Nunca usar** `text-neutral-400` (`#9ca3af`) sobre `#1a0000` — o tom azulado-acinzentado cria
> disssonância de temperatura de cor com o fundo vinho escuro. Usar sempre `#c4a8a8` ou `#e0c8c8`.

---

## Arquivos de Dados

| Arquivo | Conteúdo | Fonte de verdade para |
|---|---|---|
| `data/servicos.ts` | Dados estruturados de todos os serviços | Descrições, estados, ícones, rotas |
| `data/equipe.ts` | Dados tipados da equipe técnica (Durval e Theyllor) | Nomes, especialidades, fotos, slugs |

> Componentes **nunca hardcodam** nomes, especialidades ou descrições — importar sempre dos arquivos acima.
> Campos canônicos de `data/equipe.ts`: `slug` · `nome` · `tituloPrincipal` · `especializacoes` · `foto` · `fotoAlt`

---

## E-E-A-T (Autoridade e Confiança)

- Destacar nomes dos engenheiros com título profissional completo — importar de `data/equipe.ts`
- Mencionar registro no CREA com número (quando disponível) — campo `registro` em `MembroEquipe`
- Exibir logos de clientes âncora: Claro, Embratel, Ambev, Mercado Livre, Brasol
- Linkar para órgãos reguladores oficiais (CBMERJ, INEA, ANVISA, CREA) — `target="_blank" rel="noopener noreferrer"`
- Seção de glossário de siglas (AVCB, SPDA, ART, CLCB etc.) para relevância semântica

---

## Proibições Explícitas

| ❌ Proibido | ✅ Usar em vez disso |
|---|---|
| `next-seo` | Metadata API nativa do Next.js 15 |
| `<Head>` do Pages Router | `export const metadata` no App Router |
| Vídeo autoplay sem fallback | `next/image` com `priority` + vídeo condicional |
| Conteúdo técnico em modal | Accordion (`<details>`) ou seção colapsável no DOM |
| Importar fontes via `<link>` | `next/font` |
| Hardcodar textos de serviços | Importar de `data/servicos.ts` |
| Hardcodar nomes/especialidades da equipe | Importar de `data/equipe.ts` |
| Hardcodar `#800000` em componentes reutilizados | `var(--color-service-accent, #800000)` |
| Importar `equipe` de `data/servicos` | Importar de `data/equipe.ts` |
| Glassmorphism em texto indexável | Fundo sólido ou semi-transparente com texto no DOM |
| Pular níveis de heading | H1 → H2 → H3 em sequência |
| `<a>` sem `color` definido (herda azul do navegador) | `a { color: inherit }` já está em `globals.css @layer base` |
| `focus-visible:ring-2` sem cor explícita (usa azul padrão do Tailwind) | `focus-visible:ring-[#800000]` ou `focus-visible:ring-primary` |
| `outline` / `ring` azul em qualquer elemento | Foco sempre em `#800000` — coberto globalmente pelo `globals.css` |
| `bg-neutral-900` / `#111827` como fundo da nav | `bg-[#1a0000]` — vinho escuro da marca |
| `bg-[#111827]` / `bg-neutral-900` como fundo de seção de conteúdo | `bg-[#1a0000]` — único fundo escuro de seção do site |
| `bg-[#111827]/95` ou `bg-neutral-900/95` como fundo da nav ao scroll | `bg-[#1a0000]/95 backdrop-blur-sm` — vinho escuro cinemático |
| `text-neutral-400` sobre fundo `#1a0000` | `style={{ color: "#c4a8a8" }}` — cinza rosado quente, contraste ≈ 6.5:1 |
| Item em `NAV_ITENS` sem `id` declarado na seção correspondente em `app/page.tsx` | Declarar `id` na seção antes de adicionar o item na nav |
| Categorias de serviço (`legalizacao`, `projetos`, `laudos`) como itens diretos de nav | Âncoras de seção estrutural: `servicos` · `setores` · `equipe` · `contato` |
| Definir `data-service` **só** no `<main>` da subpágina | Criar `layout.tsx` na subpágina com CSS variable no `<div>` wrapper (propaga para nav e footer) |
| Usar `especializacoes` como `especialidades` (nome de campo antigo) | `membro.especializacoes` — campo canônico em `data/equipe.ts` |
| Usar `formacao` ou `Formação` como campo da equipe | `membro.tituloPrincipal` — campo canônico em `data/equipe.ts` |
| Acessar membro da equipe sem `slug` | Usar `membro.slug` para links e IDs (ex.: `durval-ribeiro`, `theyllor-estulano`) |

---

## Componentes da Homepage

### NavPrimaria
- **Arquivo:** `components/NavPrimaria.tsx`
- **Tipo:** Client Component (`"use client"`) — necessário para scroll spy, estado de scroll e menu mobile
- **O quê:** Header fixo com logo, links de navegação âncora, CTA WhatsApp e menu mobile hamburger
- **IDs vinculados (homepage):** `servicos` · `setores` · `equipe` · `contato`
  - Esses IDs são declarados como wrappers `<section id="...">` em `app/page.tsx`
  - O scroll spy (`IntersectionObserver`) observa exatamente esses 4 IDs
  - **Regra de sincronização:** `NAV_ITENS` e os `id` das seções em `app/page.tsx` devem estar sempre em paridade — alterar um exige alterar o outro
- **Comportamento em subpáginas:** `isHomepage === false` → itens renderizam como `<Link href="/#id">` em vez de `<button onClick={scroll}>`
- **Cores nas subpáginas:** NavPrimaria herda `--color-service-accent` do `<div>` wrapper do `layout.tsx` da subpágina — o CTA e o indicador de seção ativa mudam automaticamente
- **Estado de scroll:** transparente → `bg-[#1a0000]/95 backdrop-blur-sm` ao rolar
