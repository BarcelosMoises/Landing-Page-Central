# AGENTS.md — Central de Soluções Landing Page
> Arquivo de contexto global. Lido automaticamente por Claude Code, Gemini CLI, DeepSeek e demais agentes.
> Atualizar este arquivo sempre que houver mudança de stack, escopo ou decisão arquitetural.
> Última atualização: Agosto 2026

> **Arquivos relacionados:**
> - `TASKS.md` — plano de tarefas ativo (numeração contínua dos CSVs de planejamento)
> - `CLAUDE.md` — apenas um ponteiro para este arquivo; **não duplicar conteúdo nele**
> - `docs/DESIGN.md` · `docs/SEO.md` · `docs/SERVICOS.md` — referências de domínio

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
│   ├── layout.tsx              # Define --color-service-accent: #b7791f
│   └── page.tsx                # keyword: "laudo spda com art [estado]"
├── laudos-tecnicos/
│   ├── layout.tsx              # Define --color-service-accent: #92610a
│   └── page.tsx                # keyword: "laudo técnico engenharia [estado]"
├── licenciamento-ambiental/
│   ├── layout.tsx              # Define --color-service-accent: #2d6a2d
│   └── page.tsx                # keyword: "licenciamento ambiental [estado]"
├── regularizacao-prefeitura/
│   ├── layout.tsx              # Define --color-service-accent: #6b21a8
│   └── page.tsx                # keyword: "regularização prefeitura alvará [estado]"
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
| Laudos Técnicos | `/laudos-tecnicos` | `#92610a` | `#6e4908` |
| SPDA | `/spda-para-raios` | `#b7791f` | `#8a5a12` |
| Projetos Técnicos | `/projetos` | `#1e40af` | `#1e3a8a` |
| Prefeitura / Legalização municipal | `/regularizacao-prefeitura` | `#6b21a8` | `#561a86` |

> **Prefeitura (Ago 2026):** accent próprio roxo `#6b21a8` — não reutiliza o vinho da marca.
> Decisão pendente de confirmação com o cliente — ver TASKS.md #56. Se mudar, atualizar `layout.tsx`,
> `globals.css` (seletor `data-service`), esta tabela e `docs/DESIGN.md`.

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

### Fotos reais do portfólio
- Localização: `/public/images/portfolio/` e `/public/images/equipe/`
- **Nunca usar stock photos** enquanto houver fotos reais disponíveis
- Mapeamento completo de foto por seção/rota: ver `docs/DESIGN.md`

### Placeholders temporários (dev-only)

> O placeholder vermelho atual das subpáginas é **temporário** — o design foi aprovado pelo cliente
> e os slots de imagem devem receber fotos reais do portfólio (ver TASKS.md Fase 2).

- Todo placeholder de imagem usa o componente `components/PlaceholderImage.tsx` com `data-todo="placeholder"`
- **Proibido mergear para produção com placeholder** — verificação obrigatória antes de deploy:
  `grep -rn 'data-todo="placeholder"' app components` deve retornar vazio
- Substituição: foto real de `/public/images/portfolio/` conforme mapeamento do `docs/DESIGN.md`;
  se não houver foto real adequada ao serviço, usar card visual de documento/norma — **nunca stock photo**
- Imagens abaixo da dobra: `next/image` com `aspect-video`, `rounded-lg`, `sizes` responsivo, **sem** `priority`,
  `alt` técnico descritivo (regra de SEO #6)

---

## Regras de SEO (Obrigatórias)

1. **1 keyword primária por `page.tsx`** — sem exceção. Variações long-tail ficam no corpo do texto.
2. **Metadata API nativa** — usar `export const metadata: Metadata` em cada `page.tsx`, nunca `<Head>` do Pages Router.
3. **JSON-LD obrigatório em toda página** — mínimo `LocalBusiness` na homepage, `Service` nas demais.
4. **`FAQPage` schema** nas páginas de serviço com mínimo 3 perguntas/respostas sobre o serviço.
5. **Conteúdo indexável na página** — textos de laudos, decretos, siglas e explicações técnicas devem estar no DOM, nunca apenas em modais ou tooltips.
6. **Alt text obrigatório** em todas as imagens — descrever o conteúdo técnico real, não "imagem1.jpg".
7. **URLs amigáveis sem parâmetros** — `/avcb-corpo-de-bombeiros`, nunca `/servicos?id=1`.
8. **`BreadcrumbList` JSON-LD** nas subpáginas que exibem breadcrumb visual ("Início / Serviço"), com `aria-label="breadcrumb"` no `<nav>`.

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
- **Fundo de seções escuras de conteúdo:** `#1a0000` — SetoresAtendidos, FormularioContato, Glossário/Normas
- **Footer e CtaFinal são tingidos pelo accent da categoria:** `color-mix(in srgb, var(--color-service-accent, #800000) 12%, #1a0000)` — verde em ambiental, teal em VISA, dourado em laudos/SPDA, azul em projetos; na homepage (fallback vinho) o resultado ≈ `#1a0000`
- **Token de texto sobre `#1a0000` (secundário):** `#c4a8a8` — cinza rosado quente, contraste ≈ 6.5:1 ✓ WCAG AA
- **Token de texto sobre `#1a0000` (primário suave):** `#e0c8c8` — bege rosado, contraste ≈ 11:1 ✓ WCAG AAA
- **Accent por serviço:** ver tabela acima — sempre via CSS variable
- **Estilo:** Cinemático industrial — sóbrio, técnico, confiável
- **Nunca usar:** glassmorphism em conteúdo indexável pelo Google

---

## Hierarquia dos Fundos Escuros

> Regra de temperatura de cor: todos os fundos escuros do site são **quentes** (família vinho/preto-quente).
> O cinza azulado `#111827` (Tailwind `neutral-900`) nunca deve aparecer como fundo de seção ou nav.
> `#0a0a0a` é **exclusivo do hero** — seções escuras de conteúdo usam `#1a0000` (puro ou tingido pelo accent).

| Papel | Valor | Componentes |
|---|---|---|
| Fundo hero / mais escuro | `#0a0a0a` | Hero section, seções cinemáticas de impacto máximo |
| Fundo padrão de seções escuras | `#1a0000` | SetoresAtendidos, FormularioContato, Glossário/Normas |
| Fundo escuro tingido pela categoria | `color-mix(in srgb, var(--color-service-accent, #800000) 12%, #1a0000)` | Footer, CtaFinal |
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
| `bg-[#0a0a0a]` ou `bg-black` em seção escura de conteúdo (CTA final, cards) | `bg-[#1a0000]` — `#0a0a0a` é exclusivo do hero |
| `bg-[#1a0000]` puro no Footer ou na CTA final de subpágina | `color-mix(in srgb, var(--color-service-accent, #800000) 12%, #1a0000)` — fundo tingido pelo accent da categoria |
| `text-neutral-400` sobre fundo `#1a0000` | `style={{ color: "#c4a8a8" }}` — cinza rosado quente, contraste ≈ 6.5:1 |
| Item em `NAV_ITENS` sem `id` declarado na seção correspondente em `app/page.tsx` | Declarar `id` na seção antes de adicionar o item na nav |
| Categorias de serviço (`legalizacao`, `projetos`, `laudos`) como itens diretos de nav | Âncoras de seção estrutural: `servicos` · `setores` · `equipe` · `contato` |
| Definir `data-service` **só** no `<main>` da subpágina | Criar `layout.tsx` na subpágina com CSS variable no `<div>` wrapper (propaga para nav e footer) |
| Usar `especializacoes` como `especialidades` (nome de campo antigo) | `membro.especializacoes` — campo canônico em `data/equipe.ts` |
| Usar `formacao` ou `Formação` como campo da equipe | `membro.tituloPrincipal` — campo canônico em `data/equipe.ts` |
| Acessar membro da equipe sem `slug` | Usar `membro.slug` para links e IDs (ex.: `durval-ribeiro`, `theyllor-estulano`) |
| Criar componente duplicado de grid de serviços | `ServicosTabs` é o único componente de serviços da homepage — `ServicosGrid` foi removido |
| Seção CTA final duplicada/copiada entre subpáginas | `components/CtaFinal.tsx` — único componente de CTA das subpáginas |
| Placeholder de imagem em commit destinado a produção | `PlaceholderImage` com `data-todo="placeholder"` — removido antes do deploy (TASKS.md Fase 2) |
| Stock photo em slot de imagem de subpágina | Foto real de `/public/images/portfolio/` ou card visual de documento/norma |
| Fundo neutro (navy/cinza) no card "Base Normativa" | `color-mix(in srgb, var(--color-service-accent) 8%, #1a0000)` + `border-l-4` no accent |
| Retícula/crosshair decorativa | Não usar SVG ornamental de retícula no site |

---

## Componentes da Homepage

### ServicosTabs
- **Arquivo:** `components/ServicosTabs.tsx`
- **Tipo:** Client Component (`"use client"`) — único componente de serviços da homepage
- **O quê:** Tabs interativas (Legalização · Projetos · Laudos) com grid de cards de serviço
- **Props:** recebe arrays de `Servico[]` via `app/(homepage)/page.tsx` — nunca importa `servicos` diretamente
- **Grid:** colunas responsivas (1/2/3); sem placeholders
- **ARIA:** `role="tablist"` / `role="tab"` / `role="tabpanel"` obrigatórios
- **SEO:** todos os painéis renderizados no DOM; inativos ocultos com `hidden` (indexável)
- **`ServicosGrid.tsx` foi removido** (Jul 2026) — era código morto duplicado, nunca importado
- **Placeholders "Em breve" foram removidos** (Jul 2026) — `padServicos` e `ServicoOuPlaceholder` eliminados

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

### MapaAtuacao
- **Arquivo:** `components/MapaAtuacao.tsx`
- **O quê:** seção visual dos 4 estados de atuação (RJ/SP/MG/ES) com badges de órgãos reguladores
- **Referência de conteúdo:** `docs/SEO.md` → tabela de estados
- **Scripts utilitários:** `gerar-mapa.js` e `fix-map.js` (raiz do repo) geram/corrigem os dados do mapa — rodar localmente, nunca em build

---

## Componentes Compartilhados das Subpáginas

### CtaFinal
- **Arquivo:** `components/CtaFinal.tsx`
- **Tipo:** Server Component (sem `"use client"`) — sem interatividade client-side
- **O quê:** seção CTA escura imediatamente acima do footer em **todas** as subpáginas de serviço ("Precisa de X?")
- **Props:** `titulo` · `subtitulo` · `whatsappUrl` · `email`
- **Regras de cor (não violar — drift identificado em Ago 2026):**
  - Fundo **tingido pelo accent da categoria**: `color-mix(in srgb, var(--color-service-accent, #800000) 12%, #1a0000)` — mesmo padrão do Footer. Verde em ambiental, teal em VISA, dourado em laudos/SPDA, azul em projetos; `#1a0000` puro só na prática da homepage (fallback vinho). Nunca `#0a0a0a`, `bg-black` ou neutro
  - Heading `text-white`; subtítulo `style={{ color: "#c4a8a8" }}`
  - Botão primário: `backgroundColor: "var(--color-service-accent, #800000)"`
  - Botão ghost de e-mail: `mailto:` com borda `white/20` e texto `#e0c8c8`
  - `border-t-4` no accent do serviço como transição vinda da seção clara anterior (FAQ)

### Pill badges de hero

- Todo pill de hero deve usar `--color-service-accent` da rota — nunca hardcodar a cor no componente.
- Texto principal sempre em branco (`#ffffff`) ou token equivalente com contraste AA (≥ 4.5:1).
- Fundo sempre visível sobre imagens: `color-mix(in srgb, var(--color-service-accent, #800000) 32%, #0a0a0a)` + borda `color-mix(in srgb, var(--color-service-accent, #800000) 60%, #ffffff 40%)`.
- Não usar `text-neutral-400`, `text-white/30`, `bg-transparent` ou `border-white/10` como estilo principal do pill.
- O pill deve permanecer legível em desktop e mobile: `max-w-full flex-wrap`, tracking reduzido no mobile, sem quebra de texto nem overflow.

### PlaceholderImage
- **Arquivo:** `components/PlaceholderImage.tsx`
- **O quê:** placeholder temporário de imagem para slots ainda sem foto real — **dev-only**
- **Marcação:** `data-todo="placeholder"` obrigatório + label descritivo do slot (ex.: "Escopo VISA — imagem 16:9")
- **Formato:** `aspect-video`, `rounded-lg`, fundo `#4f0101` (vinho escuro da marca — nunca vermelho puro)
- **Ciclo de vida:** criado em desenvolvimento → substituído por foto real → removido antes do deploy

---

## Scripts Utilitários (raiz do repo)

| Script | Função | Quando rodar |
|---|---|---|
| `gerar-mapa.js` | Gera os dados/geometria do `MapaAtuacao` | Ao alterar estados ou órgãos exibidos |
| `fix-map.js` | Corrige/normaliza a saída do `gerar-mapa.js` | Após cada execução do `gerar-mapa.js` |
| `audit-paleta.sh` | Auditoria de cores proibidas (task #34) — gera relatório Markdown | A cada fase do TASKS.md e antes de deploy |

> Scripts de manutenção local — **nunca** executar em build/CI nem importar em componentes.
