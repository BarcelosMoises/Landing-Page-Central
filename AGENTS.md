# AGENTS.md — Central de Soluções Landing Page
> Arquivo de contexto global. Lido automaticamente por Claude Code, Gemini CLI e demais agentes.
> Atualizar este arquivo sempre que houver mudança de stack, escopo ou decisão arquitetural.
> Última atualização: Abril 2026

---

## Identidade do Projeto

- **Cliente:** Central de Soluções
- **Segmento:** Engenharia civil — regularização, projetos técnicos, laudos e sistemas de segurança
- **Responsáveis técnicos:**
  - Durval Ribeiro de Queiroz (Arquiteto e Urbanista, Eng. Segurança do Trabalho, Eng. Segurança Contra Incêndio e Pânico)
  - Theyllor Estulano do Espírito Santo (Engenheiro Civil, Técnico em Mecânica)
- **Região de atuação:** ES, MG, RJ, SP (alguns serviços: todo Brasil)
- **Objetivo do site:** Landing page de alta conversão B2B + ranqueamento orgânico no Google

---

## Stack Tecnológico

| Camada | Tecnologia | Observações |
|---|---|---|
| Framework | Next.js 14 (App Router) | Usar apenas App Router — sem Pages Router |
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
- Contraste mínimo de 4.5:1 para textos sobre fundos coloridos (especialmente sobre `#800000`)
- Navegação por teclado testada em todos os formulários
- Headings em ordem hierárquica: H1 → H2 → H3 (nunca pular níveis)
- `lang="pt-BR"` no `<html>` do RootLayout

---

## Design System

- **Paleta:** Ver `/docs/DESIGN.md`
- **Cor primária:** `#800000` (vinho)
- **Cor dark:** `#4f0101`
- **Neutro claro:** `#f5f5f5`
- **Estilo:** Cinemático industrial — sóbrio, técnico, confiável
- **Nunca usar:** glassmorphism em conteúdo indexável pelo Google

---

## Dados dos Serviços

- Fonte única de verdade: `/docs/SERVICOS.md`
- Componentes **nunca hardcodam** nomes ou descrições de serviços
- Importar dados de `/data/servicos.ts` (gerado a partir do SERVICOS.md)

---

## E-E-A-T (Autoridade e Confiança)

- Destacar nomes dos engenheiros (Durval e Theyllor) com título profissional completo
- Mencionar registro no CREA com número (quando disponível)
- Exibir logos de clientes âncora: Claro, Embratel, Ambev, Mercado Livre, Brasol
- Linkar para órgãos reguladores oficiais (CBMERJ, INEA, ANVISA, CREA) — abre em `target="_blank"` com `rel="noopener noreferrer"`
- Seção de glossário de siglas (AVCB, SPDA, ART, CLCB etc.) para relevância semântica

---

## Proibições Explícitas

| ❌ Proibido | ✅ Usar em vez disso |
|---|---|
| `next-seo` | Metadata API nativa do Next.js 14 |
| `<Head>` do Pages Router | `export const metadata` no App Router |
| Vídeo autoplay sem fallback | `next/image` com `priority` + vídeo condicional |
| Conteúdo técnico em modal | Accordion (`<details>`) ou seção colapsável no DOM |
| Importar fontes via `<link>` | `next/font` |
| Hardcodar textos de serviços | Importar de `/data/servicos.ts` |
| Glassmorphism em texto indexável | Fundo sólido ou semi-transparente com texto no DOM |
| Pular níveis de heading | H1 → H2 → H3 em sequência |

---

## Arquivos de Contexto do Projeto

| Arquivo | Conteúdo |
|---|---|
| `docs/SEO.md` | Keywords por serviço/estado, concorrentes, nichos, glossário, órgãos |
| `docs/SERVICOS.md` | Lista completa de serviços, setores atendidos, diferenciais |
| `docs/DESIGN.md` | Paleta, tipografia, componentes visuais, estilo cinemático |
| `data/servicos.ts` | Dados estruturados dos serviços para uso nos componentes |
