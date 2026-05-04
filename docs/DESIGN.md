# DESIGN.md — Central de Soluções Landing Page
> Sistema de design completo para uso pelos agentes de IA e desenvolvedores.
> Estilo: Cinemático Industrial — sóbrio, técnico, confiável, premium B2B.
> Última atualização: Maio 2026

---

## Paleta de Cores

### Cores Primárias

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#800000` | CTAs, botões primários, destaques, bordas ativas |
| `primary-dark` | `#4f0101` | Hover de botões, hero overlay, backgrounds escuros |
| `primary-light` | `#a30000` | Estados de foco, variações de hover |

### Cores Neutras

| Token | Hex | Uso |
|---|---|---|
| `neutral-50` | `#f5f5f5` | Background de seções claras |
| `neutral-100` | `#e8e8e8` | Bordas sutis, divisores |
| `neutral-400` | `#9ca3af` | Textos secundários, placeholders |
| `neutral-700` | `#374151` | Textos de corpo |
| `neutral-900` | `#111827` | Headings, textos de alta ênfase |

### Cores de Sistema

| Token | Hex | Uso |
|---|---|---|
| `white` | `#ffffff` | Textos sobre fundos escuros, cards |
| `black` | `#0a0a0a` | Background hero, seções cinemáticas |
| `success` | `#16a34a` | Ícones de confirmação, badges de serviço ativo |
| `warning` | `#ca8a04` | Alertas de prazo, urgência |

### Gradientes

```css
/* Hero overlay — fundo escuro cinemático */
background: linear-gradient(135deg, #4f0101 0%, #800000 50%, #1a0000 100%);

/* Card hover */
background: linear-gradient(180deg, #800000 0%, #4f0101 100%);

/* Overlay sobre imagem/vídeo */
background: linear-gradient(to bottom, rgba(79,1,1,0.85) 0%, rgba(10,0,0,0.6) 100%);
```

---

## Paleta por Serviço (Sistema de Cores de Categoria)

> **Origem:** sistema de cores extraído diretamente dos posts de Instagram e portfólio do cliente
> (arquivos `PRINCIPAIS-CLIENTES-1080-x-1080-px.pdf` e `1o-POST-THS-1080-x-1080-px.pdf`).
> O cliente já usa cores distintas por categoria de serviço nos materiais de marketing.
> **Regra:** a cor global da marca (`#800000`) é o accent da homepage, nav e footer.
> Cada subpágina usa o accent próprio da sua categoria via CSS variable `--color-service-accent`.

### Mapeamento de Cor por Subpágina

| Categoria | Rota | Accent principal | Hover | Highlight (10% opacidade) | Origem no material |
|---|---|---|---|---|---|
| Corpo de Bombeiros / AVCB | `/avcb-corpo-de-bombeiros` | `#800000` | `#4f0101` | `#800000/10` | Vinho — cor padrão da marca |
| Projetos de Engenharia | `/projetos` | `#800000` | `#4f0101` | `#800000/10` | Mesmo cluster visual do AVCB |
| Vigilância Sanitária | `/vigilancia-sanitaria` | `#0d7377` | `#095e62` | `#0d7377/10` | Turquesa/teal dos posts de Vigilância |
| Licenciamento Ambiental | `/licenciamento-ambiental` | `#2d6a2d` | `#1e4d1e` | `#2d6a2d/10` | Verde dos posts de Meio Ambiente |
| Laudos Técnicos | `/laudos-tecnicos` | `#92610a` | `#6e4908` | `#92610a/10` | Dourado/ocre dos posts de Laudos |
| SPDA / Para-raios | `/spda-para-raios` | `#92610a` | `#6e4908` | `#92610a/10` | Mesmo cluster visual dos Laudos |

### Como Aplicar nas Subpáginas

Cada `page.tsx` de subpágina define a cor do serviço via CSS variable inline no elemento `<main>`:

```tsx
// Exemplo: /vigilancia-sanitaria/page.tsx
<main
  style={{ "--color-service-accent": "#0d7377" } as React.CSSProperties}
  className="[--color-service-accent-hover:#095e62] [--color-service-accent-bg:#0d737710]"
>
```

Ou, alternativamente, via `data-service` attribute + CSS global:

```tsx
// page.tsx
<main data-service="vigilancia">

// globals.css
[data-service="vigilancia"] { --color-service-accent: #0d7377; --color-service-accent-hover: #095e62; }
[data-service="ambiental"]  { --color-service-accent: #2d6a2d; --color-service-accent-hover: #1e4d1e; }
[data-service="laudos"]     { --color-service-accent: #92610a; --color-service-accent-hover: #6e4908; }
[data-service="avcb"]       { --color-service-accent: #800000; --color-service-accent-hover: #4f0101; }
```

Usando nos componentes:

```tsx
// Botão primário genérico — usa o accent da página atual
<a
  href={whatsappUrl}
  style={{ backgroundColor: "var(--color-service-accent)" }}
  className="text-white font-semibold px-6 py-3.5 rounded-lg
             hover:opacity-90 active:opacity-80 transition-opacity duration-200"
>
  Solicitar Orçamento
</a>

// Badge de estado com cor do serviço
<span
  style={{
    backgroundColor: "color-mix(in srgb, var(--color-service-accent) 12%, transparent)",
    color: "var(--color-service-accent)",
  }}
  className="text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
>
  CBMERJ · RJ
</span>
```

### Gradientes de Hero por Serviço

```css
/* AVCB / Projetos — vinho (igual ao hero global) */
--gradient-hero-avcb: linear-gradient(to bottom, rgba(79,1,1,0.85) 0%, rgba(10,0,0,0.6) 100%);

/* Vigilância Sanitária — teal escuro */
--gradient-hero-sanitaria: linear-gradient(to bottom, rgba(13,115,119,0.88) 0%, rgba(0,20,20,0.65) 100%);

/* Licenciamento Ambiental — verde escuro */
--gradient-hero-ambiental: linear-gradient(to bottom, rgba(45,106,45,0.88) 0%, rgba(0,15,0,0.65) 100%);

/* Laudos / SPDA — dourado escuro */
--gradient-hero-laudos: linear-gradient(to bottom, rgba(146,97,10,0.88) 0%, rgba(20,10,0,0.65) 100%);
```

---

## Tipografia

### Fontes (via next/font)

```ts
// app/layout.tsx
import { Inter, Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
```

| Papel | Fonte | Peso | Uso |
|---|---|---|---|
| Headings (H1–H3) | Montserrat | 700–800 | Títulos de seção, hero, cards |
| Subheadings (H4–H6) | Montserrat | 600 | Subtítulos, labels de serviço |
| Corpo | Inter | 400–500 | Parágrafos, descrições, listas |
| UI / Botões | Inter | 600 | Labels de botão, badges, navegação |
| Dados técnicos / Siglas | Inter | 500 `tabular-nums` | Glossário, números, normas técnicas |

> **Regra de uso (Material do cliente):** o cliente usa Montserrat ExtraBold em maiúsculas para
> títulos de serviço nos posts de Instagram. No site, manter esse padrão — headings em
> `uppercase tracking-wide` apenas em rótulos de categoria (`text-xs`) e héros de subpágina.
> **Nunca** usar uppercase em parágrafos ou descrições.

### Escala Tipográfica (Tailwind)

| Elemento | Classe Tailwind | Tamanho |
|---|---|---|
| H1 (Hero) | `text-4xl md:text-6xl font-extrabold` | 36px / 60px |
| H2 (Seção) | `text-2xl md:text-4xl font-bold` | 24px / 36px |
| H3 (Card) | `text-xl font-bold` | 20px |
| Body | `text-base leading-relaxed` | 16px |
| Small / Caption | `text-sm text-neutral-400` | 14px |
| Badge / Label | `text-xs font-semibold uppercase tracking-wide` | 12px |

---

## Identidade Visual — Elementos Gráficos do Cliente

> Derivado da análise do portfólio e posts de Instagram do cliente.
> Estes elementos já são reconhecidos pelos clientes da Central de Soluções.

### Logo

- **Formato:** ícone de engrenagens/ferramentas abstrato em branco sobre fundo colorido
- **Implementação no site:** SVG inline com `fill="currentColor"` — funciona em fundos escuros e claros sem duas versões
- **Nunca:** rasterizar o logo como PNG para uso em navegação — usar sempre SVG
- **Texto do logo:** `CENTRAL DE SOLUÇÕES` em Montserrat 700, maiúsculas, abaixo do ícone

### Elemento Crosshair / Retícula

- **O quê:** grid de linhas finas com ponto de cruzamento (retícula de engenharia)
  que aparece **no canto inferior direito** de todos os posts de Instagram do cliente
- **Função:** assinatura visual técnica — conecta o site ao material já reconhecido
- **Implementação no site:**

```tsx
// Componente CrosshairDecor.tsx — SVG decorativo inline
// Inserir no canto inferior direito de seções escuras (hero, CTA, glossário)
export function CrosshairDecor({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute bottom-6 right-6 w-16 h-16 opacity-[0.08] pointer-events-none select-none ${className}`}
    >
      {/* Linhas horizontais */}
      <line x1="0" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1" />
      {/* Linhas verticais */}
      <line x1="20" y1="0" x2="20" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="0" x2="60" y2="80" stroke="currentColor" strokeWidth="1" />
      {/* Ponto de cruzamento central */}
      <circle cx="40" cy="40" r="2.5" fill="currentColor" />
      <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}
```

- **Uso:** `<CrosshairDecor />` dentro de qualquer `<section className="relative">` com fundo escuro
- **Opacidade:** `0.08` sobre fundo escuro | `0.05` sobre fundo branco
- **Cor:** `text-white` sobre escuro | `text-neutral-900` sobre claro

---

## Imagens Reais do Portfólio

> Derivado dos PDFs de portfólio. Estas são as fotos reais disponíveis para uso no site.
> **Pré-requisito:** extrair dos PDFs e salvar em `/public/images/portfolio/` antes do deploy.
> **Nunca usar stock photos** enquanto houver fotos reais do portfólio do cliente disponíveis.

### Mapeamento de Imagens por Seção

| Seção / Rota | Descrição da foto recomendada | Arquivo sugerido |
|---|---|---|
| Hero homepage | Galpão industrial com tubulações (sistema de refrigeração) ou interior industrial | `/images/portfolio/hero-industrial.jpg` |
| Hero `/avcb-corpo-de-bombeiros` | Hidrante vermelho `H` em corredor ou galpão logístico | `/images/portfolio/hero-avcb.jpg` |
| Hero `/spda-para-raios` | Antena parabólica em torre (telecom) | `/images/portfolio/hero-spda.jpg` |
| Hero `/laudos-tecnicos` | Racks de data center com cabos vermelhos | `/images/portfolio/hero-laudos.jpg` |
| Hero `/licenciamento-ambiental` | Campo com usina solar fotovoltaica | `/images/portfolio/hero-ambiental.jpg` |
| Hero `/vigilancia-sanitaria` | Engenheiro analisando planta arquitetônica | `/images/portfolio/hero-sanitaria.jpg` |
| SetoresAtendidos — Depósito | Interior de galpão logístico com pallets e prateleiras | `/images/portfolio/setor-deposito.jpg` |
| SetoresAtendidos — Telecom | Antena parabólica gigante, céu azul | `/images/portfolio/setor-telecom.jpg` |
| SetoresAtendidos — Tecnologia | Racks com cabos vermelhos em data center | `/images/portfolio/setor-tecnologia.jpg` |
| SetoresAtendidos — Indústria | Plataforma elevatória em galpão / sistema de tubulações | `/images/portfolio/setor-industria.jpg` |
| SetoresAtendidos — Solar | Painéis fotovoltaicos em campo aberto | `/images/portfolio/setor-solar.jpg` |
| SetoresAtendidos — Combustível | Cobertura de posto de combustível | `/images/portfolio/setor-combustivel.jpg` |
| EquipeTecnica — Durval | Foto com capacete branco, braços cruzados, fundo interno | `/images/equipe/durval.jpg` |
| EquipeTecnica — Theyllor | Foto com capacete branco, macação azul, torre ao fundo | `/images/equipe/theyllor.jpg` |

### Dados Completos da Equipe Técnica

Extraído do portfólio do cliente. Usar exatamente esses dados na seção `EquipeTecnica`:

```ts
// data/equipe.ts
export const equipe = [
  {
    nome: "Durval Ribeiro de Queiroz",
    especialidades: [
      "Arquiteto e Urbanista",
      "Engenheiro de Segurança do Trabalho",
      "Engenheiro de Segurança Contra Incêndio e Pânico",
    ],
    foto: "/images/equipe/durval.jpg",
    fotoAlt: "Durval Ribeiro de Queiroz, Engenheiro de Segurança Contra Incêndio",
  },
  {
    nome: "Theyllor Estulano do Espirito Santo",
    especialidades: [
      "Engenheiro Civil",
      "Técnico em Mecânica",
    ],
    foto: "/images/equipe/theyllor.jpg",
    fotoAlt: "Theyllor Estulano do Espirito Santo, Engenheiro Civil em campo",
  },
] as const;
```

### next/image — Regras de Uso

```tsx
// Hero: priority + fill
<Image
  src="/images/portfolio/hero-industrial.jpg"
  fill
  priority
  alt="Engenheiro realizando vistoria em galpão industrial"
  className="object-cover object-center"
  sizes="100vw"
/>

// Fotos de equipe: width/height fixos + lazy
<Image
  src="/images/equipe/durval.jpg"
  width={400}
  height={500}
  alt="Durval Ribeiro de Queiroz — Engenheiro de Segurança Contra Incêndio"
  className="object-cover rounded-2xl"
  loading="lazy"
/>

// Setores: lazy + aspect-ratio
<Image
  src="/images/portfolio/setor-telecom.jpg"
  width={600}
  height={400}
  alt="Antena parabólica de telecomunicações — setor atendido pela Central de Soluções"
  className="object-cover w-full h-full"
  loading="lazy"
/>
```

---

## Espaçamento e Grid

```
Container max-width: 1280px (max-w-7xl)
Padding horizontal: px-4 sm:px-6 lg:px-8
Gap entre seções: py-16 md:py-24
Gap entre cards: gap-6 md:gap-8
Border radius padrão: rounded-lg (8px) | rounded-xl (12px) para cards
```

---

## Componentes Visuais

### Hero Section

- **Background:** imagem real do portfólio (ver tabela acima) com `next/image priority`
- **Overlay:** `linear-gradient(to bottom, rgba(79,1,1,0.85), rgba(10,0,0,0.6))`
- **Altura:** `min-h-[90vh]`
- **Layout:** centralizado verticalmente, texto à esquerda em desktop
- **Vídeo (opcional):** carregar apenas em `(prefers-reduced-motion: no-preference)` + conexão rápida via `navigator.connection`; sempre com fallback de imagem estática
- **Crosshair:** inserir `<CrosshairDecor />` no canto inferior direito (ver seção Identidade Visual)

```tsx
// Estrutura do Hero
<section className="relative min-h-[90vh] flex items-center">
  {/* Imagem de fundo — FOTO REAL do portfólio */}
  <Image
    src="/images/portfolio/hero-industrial.jpg"
    fill
    alt="Engenheiro em vistoria técnica em galão industrial"
    priority
    className="object-cover"
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#4f0101]/85 to-[#0a0000]/60" />
  {/* Conteúdo */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight">
      ...
    </h1>
    {/* CTA */}
  </div>
  {/* Crosshair — assinatura visual do cliente */}
  <CrosshairDecor />
</section>
```

### Botões

```tsx
// Primário — usa a cor do serviço da página atual via CSS variable
<button
  style={{ backgroundColor: "var(--color-service-accent, #800000)" }}
  className="text-white font-semibold px-6 py-3 rounded-lg transition-opacity duration-200
             hover:opacity-90 active:opacity-80
             focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
>
  Solicitar Orçamento
</button>

// Secundário (outline)
<button className="border-2 border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
  Conhecer Serviços
</button>

// Ghost (sobre fundo escuro)
<button className="border border-white/40 text-white hover:border-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
  Ver Portfólio
</button>
```

### Cards de Serviço

> **Atenção:** não usar `border-l-4 border-l-[#800000]` fixo — usar a CSS variable do serviço.

```tsx
// Card genérico — cor da borda derivada do serviço da página
<div
  style={{ borderLeftColor: "var(--color-service-accent, #800000)" }}
  className="bg-white border border-neutral-100 border-l-4 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
>
  {/* Ícone */}
  <div
    style={{ backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 10%, transparent)" }}
    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
  >
    <Icon
      style={{ color: "var(--color-service-accent, #800000)" }}
      className="w-5 h-5"
      aria-hidden="true"
    />
  </div>
  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">...</h3>
  <p className="text-neutral-700 text-base leading-relaxed">...</p>
</div>
```

### Barra de Confiança (Trust Bar)

```tsx
// Logos de clientes e órgãos reguladores
<section className="bg-neutral-50 border-y border-neutral-100 py-8">
  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-6">
    Empresas que confiam na Central de Soluções
  </p>
  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale hover:grayscale-0 transition-all">
    {/* logos: Claro, Embratel, Ambev, Mercado Livre, Brasol */}
  </div>
</section>
```

### Badge de Estado/Órgão

```tsx
// Badge genérico — usa a cor do serviço
<span
  style={{
    backgroundColor: "color-mix(in srgb, var(--color-service-accent, #800000) 12%, transparent)",
    color: "var(--color-service-accent, #800000)",
    borderColor: "color-mix(in srgb, var(--color-service-accent, #800000) 25%, transparent)",
  }}
  className="inline-flex items-center text-xs font-semibold uppercase tracking-wide
             px-2.5 py-1 rounded-full border"
>
  CBMERJ · RJ
</span>
```

### Seção de Normas / Glossário

- **Background:** `bg-neutral-900` (escuro, contraste com texto branco)
- **Layout:** grid 2 ou 3 colunas em desktop
- **Crosshair:** inserir `<CrosshairDecor />` no canto inferior direito da seção
- **Nunca:** glassmorphism — texto deve estar no DOM com contraste mínimo 4.5:1

### Formulário B2B

```tsx
// Campo select de estado + serviço
<form className="bg-white rounded-xl shadow-xl p-6 md:p-8">
  <select
    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-700
               focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
    aria-label="Selecione o estado"
  >
    <option value="">Selecione o estado</option>
    <option value="rj">Rio de Janeiro</option>
    <option value="sp">São Paulo</option>
    <option value="mg">Minas Gerais</option>
    <option value="es">Espírito Santo</option>
  </select>
</form>
```

---

## Iconografia

- **Biblioteca:** `lucide-react` (leve, tree-shakeable, consistente)
- **Estilo:** `strokeWidth={1.5}` — outline fino, coerente com os ícones dos posts do cliente
- **Tamanho padrão:** `w-5 h-5` (inline) | `w-8 h-8` (destaque de card) | `w-10 h-10` (hero)
- **Ícones sempre com** `aria-hidden="true"` (decorativos) ou `aria-label` (funcionais)

### Ícones por Serviço

| Serviço | Ícone Lucide |
|---|---|
| AVCB / Corpo de Bombeiros | `FlameKindling` ou `ShieldAlert` |
| Vigilância Sanitária | `ClipboardCheck` |
| Licenciamento Ambiental | `Leaf` |
| SPDA / Para-raios | `Zap` |
| Laudos Técnicos | `FileText` |
| Projetos de Engenharia | `Ruler` |
| Aterramento | `Activity` |
| Teste de Continuidade | `Radio` |

---

## Animações e Motion

- **Princípio:** sutil, funcional, nunca decorativo puro
- **Transições:** `duration-200` para hover, `duration-300` para entradas
- **Entrada de seção:** `fade-in + slide-up` com `IntersectionObserver` — apenas se `prefers-reduced-motion: no-preference`
- **Nunca:** parallax pesado, animações em loop, partículas

### Tabela de Animações por Elemento

| Elemento | Animação | Duração | Easing |
|---|---|---|---|
| Entrada de seções no scroll | `opacity 0→1` + `translateY 24px→0` | `600ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover em cards | `shadow-md → shadow-xl` | `180ms` | `ease-out` |
| Hover em botão primário | `opacity 1 → 0.9` + `scale 1 → 1.01` | `150ms` | `ease-out` |
| Logos TrustBar | `grayscale(1) → grayscale(0)` + `opacity 0.5 → 1` | `250ms` | `ease` |
| Números de métricas | Contador animado ao entrar no viewport | `1200ms` | `ease-out` |
| NavPrimaria ao scroll | `bg transparent → bg #111827/95 backdrop-blur` | `300ms` | `ease` |

```tsx
// Exemplo de entrada com respeito a prefers-reduced-motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animation = prefersReduced ? {} : { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] };
```

---

## Responsividade

| Breakpoint | Tailwind | Comportamento |
|---|---|---|
| Mobile | `< 640px` | Stack vertical, 1 coluna, CTA full-width |
| Tablet | `sm: 640px` | 2 colunas nos cards de serviço |
| Desktop | `lg: 1024px` | 3 colunas nos cards, hero dividido |
| Wide | `xl: 1280px` | Container máximo 1280px centralizado |

---

## Dark Mode

- **Status:** não implementado na v1
- Preparar tokens CSS com `--color-primary` para facilitar no futuro
- Não usar valores hex hardcodados em CSS inline — usar sempre classes Tailwind ou variáveis CSS

---

## Checklist de Qualidade Visual

- [ ] Contraste ≥ 4.5:1 em todos os textos (verificar com WebAIM Contrast Checker)
- [ ] Hero testado em mobile 375px e desktop 1440px
- [ ] Botões com estado `:focus-visible` visível (anel de foco)
- [ ] Logos de clientes com `alt` descritivo
- [ ] Imagens com `width` e `height` explícitos (evitar CLS)
- [ ] Nenhum texto em cima de imagem sem overlay de contraste suficiente
- [ ] Cor de accent correta para cada subpágina (ver tabela Paleta por Serviço)
- [ ] `<CrosshairDecor />` presente em todas as seções escuras
- [ ] Fotos reais do portfólio usadas (sem stock photos genéricos)
- [ ] Dados da equipe técnica completos (nome completo + especialidades exatas)
