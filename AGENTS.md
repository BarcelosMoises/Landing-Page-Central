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
│   └── page.tsx                # keyword: "avcb [estado] regularização"
├── vigilancia-sanitaria/
│   └── page.tsx                # keyword: "alvará sanitário [estado] consultoria"
├── spda-para-raios/
│   └── page.tsx                # keyword: "laudo spda com art [estado]"
├── laudos-tecnicos/
│   └── page.tsx                # keyword: "laudo técnico engenharia [estado]"
├── licenciamento-ambiental/
│   └── page.tsx                # keyword: "licenciamento ambiental [estado]"
└── projetos/
    └── page.tsx                # keyword: "projeto combate incêndio pânico"
```

> Todas as keywords, rotas e variações por estado estão em `/docs/SEO.md`

---

## Sistema de Cores por Serviço

> **Origem:** o cliente usa cores distintas por categoria nos materiais de marketing (Instagram, portfólio).
> O site herda esse sistema para manter coerência visual entre site e redes sociais.

### Regra principal
- A cor global da marca (`#800000`) é o accent da homepage, navegação e footer.
- Cada **subpágina de serviço** define seu accent via `data-service` attribute no `<main>`.
- Componentes genéricos usam `var(--color-service-accent, #800000)` — o fallback `#800000` garante que a homepage funcione sem o attribute.
- **Proibido hardcodar `#800000` em componentes reutilizados entre subpáginas** (botões, cards, badges).

### Mapa de cores

| Categoria | Rota | Accent | Hover |
|---|---|---|---|
| AVCB / Projetos | `/avcb-corpo-de-bombeiros`, `/projetos` | `#800000` | `#4f0101` |
| Vigilância Sanitária | `/vigilancia-sanitaria` | `#0d7377` | `#095e62` |
| Licenciamento Ambiental | `/licenciamento-ambiental` | `#2d6a2d` | `#1e4d1e` |
| Laudos / SPDA | `/laudos-tecnicos`, `/spda-para-raios` | `#92610a` | `#6e4908` |

### Como aplicar em subpáginas

```tsx
// Exemplo: app/vigilancia-sanitaria/page.tsx
<main data-service="vigilancia">
  ...
</main>

// app/globals.css — variáveis definidas uma única vez, cobrindo todo o site
[data-service="vigilancia"] { --color-service-accent: #0d7377; --color-service-accent-hover: #095e62; }
[data-service="ambiental"]  { --color-service-accent: #2d6a2d; --color-service-accent-hover: #1e4d1e; }
[data-service="laudos"]     { --color-service-accent: #92610a; --color-service-accent-hover: #6e4908; }
[data-service="avcb"]       { --color-service-accent: #800000; --color-service-accent-hover: #4f0101; }
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
- **Quando usar:** em toda `<section className="relative">` com fundo escuro (`bg-neutral-900`, `bg-[#0a0a0a]`, hero)
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
- **Accent por serviço:** ver tabela acima — sempre via CSS variable
- **Estilo:** Cinemático industrial — sóbrio, técnico, confiável
- **Nunca usar:** glassmorphism em conteúdo indexável pelo Google

---

## Arquivos de Dados

| Arquivo | Conteúdo | Fonte de verdade para |
|---|---|---|
| `data/servicos.ts` | Dados estruturados de todos os serviços | Descrições, estados, ícones, rotas |
| `data/equipe.ts` | Dados tipados da equipe técnica (Durval e Theyllor) | Nomes, especialidades, fotos, slugs |

> Componentes **nunca hardcodam** nomes, especialidades ou descrições — importar sempre dos arquivos acima.

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

---

## Componentes da Homepage

### ServicosTabs
- **Arquivo:** `components/ServicosTabs.tsx`
- **Tipo:** Client Component (`"use client"`) — único CC chamado diretamente pela homepage
- **O quê:** Tabs interativas com 3 categorias de serviço (Legalização, Projetos Técnicos, Laudos Técnicos), exibindo cards de serviço com link para a subpágina correspondente
- **Props:**
  ```tsx
  interface ServicosTabsProps {
    legalizacao: readonly Servico[];
    projetos:    readonly Servico[];
    laudos:      readonly Servico[];
  }
  ```
- **Fluxo de dados:** `app/page.tsx` (Server Component) chama `getServicosPorCategoria()` e passa os arrays como props; `ServicosTabs` recebe dados serializáveis (apenas `string`, `boolean` e `readonly string[]`) — sem `Date`, `Map` ou `Function`.
- **Estado:** `useState<"legalizacao" | "projetos" | "laudos">("legalizacao")` — tab ativa
- **SEO:** todas as 3 tabs renderizam no DOM; as tabs inativas usam `className="hidden"` (CSS `display: none`) — o Googlebot indexa o conteúdo normalmente
- **Cor:** todos os cards usam `var(--color-service-accent, #800000)` como accent — a homepage não define `data-service`, portanto o fallback `#800000` é aplicado
- **Expansão futura:** mapear tab → `data-service` no `<section>` wrapper para ativar a cor do serviço correspondente por tab

#### Padrão visual das tabs
- Tab ativa: `border-b-2 border-[#800000] text-[#800000] font-semibold`
- Tab inativa: `text-neutral-500 hover:text-neutral-800 transition-colors duration-200`
- Barra base das tabs: `border-b border-neutral-200` como linha de referência
- Transição de seleção: `transition-colors duration-200`

### ServicosGrid *(aposentado)*
- **Arquivo:** `components/ServicosGrid.tsx` — **mantido como referência, não usar**
- Substituído por `ServicosTabs` no plano Oceânica (Maio 2026)
- Não importar em nenhuma página — arquivo preservado para consulta histórica

---

## Arquivos de Contexto do Projeto

| Arquivo | Conteúdo |
|---|---|
| `docs/SEO.md` | Keywords por serviço/estado, concorrentes, nichos, glossário, órgãos |
| `docs/SERVICOS.md` | Lista completa de serviços, setores atendidos, diferenciais |
| `docs/DESIGN.md` | Paleta, tipografia, CrosshairDecor, imagens reais, sistema de cores por serviço, estados de foco |
| `data/servicos.ts` | Dados estruturados dos serviços para uso nos componentes |
| `data/equipe.ts` | Dados tipados da equipe técnica — fonte única de verdade |
| `components/CrosshairDecor.tsx` | SVG decorativo da retícula de engenharia do cliente |
| `components/ServicosTabs.tsx` | Tabs interativas de serviços — único Client Component da homepage |
