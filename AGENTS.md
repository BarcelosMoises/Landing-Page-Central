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

// app/globals.css
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

---

## Arquivos de Contexto do Projeto

| Arquivo | Conteúdo |
|---|---|
| `docs/SEO.md` | Keywords por serviço/estado, concorrentes, nichos, glossário, órgãos |
| `docs/SERVICOS.md` | Lista completa de serviços, setores atendidos, diferenciais |
| `docs/DESIGN.md` | Paleta, tipografia, CrosshairDecor, imagens reais, sistema de cores por serviço |
| `data/servicos.ts` | Dados estruturados dos serviços para uso nos componentes |
| `data/equipe.ts` | Dados tipados da equipe técnica — fonte única de verdade |
| `components/CrosshairDecor.tsx` | SVG decorativo da retícula de engenharia do cliente |
