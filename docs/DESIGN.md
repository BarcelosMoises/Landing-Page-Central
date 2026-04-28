# DESIGN.md — Central de Soluções Landing Page
> Sistema de design completo para uso pelos agentes de IA e desenvolvedores.
> Estilo: Cinemático Industrial — sóbrio, técnico, confiável, premium B2B.
> Última atualização: Abril 2026

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
| `black` | `#0a0a0a` | Background hero, seções cinematográficas |
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
| Dados técnicos / Siglas | Inter | 500 | Glossário, números, normas técnicas |

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

- **Background:** imagem estática de alta qualidade (engenharia/obras) com `next/image priority`
- **Overlay:** `linear-gradient(to bottom, rgba(79,1,1,0.85), rgba(10,0,0,0.6))`
- **Altura:** `min-h-[90vh]`
- **Layout:** centralizado verticalmente, texto à esquerda em desktop
- **Vídeo (opcional):** carregar apenas em `(prefers-reduced-motion: no-preference)` + conexão rápida via `navigator.connection`; sempre com fallback de imagem estática

```tsx
// Estrutura do Hero
<section className="relative min-h-[90vh] flex items-center">
  {/* Imagem de fundo */}
  <Image src="/hero-bg.jpg" fill alt="Engenheiros em obra industrial" priority className="object-cover" />
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#4f0101]/85 to-[#0a0000]/60" />
  {/* Conteúdo */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight">
      ...
    </h1>
    {/* CTA */}
  </div>
</section>
```

### Botões

```tsx
// Primário
<button className="bg-[#800000] hover:bg-[#4f0101] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2">
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

```tsx
// Card com borda esquerda colorida — estilo industrial
<div className="bg-white border border-neutral-100 border-l-4 border-l-[#800000] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
  {/* Ícone */}
  <div className="w-10 h-10 bg-[#800000]/10 rounded-lg flex items-center justify-center mb-4">
    <Icon className="w-5 h-5 text-[#800000]" aria-hidden="true" />
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
    {/* logos */}
  </div>
</section>
```

### Badge de Estado/Órgão

```tsx
// Para identificar cobertura por estado
<span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide bg-[#800000]/10 text-[#800000] px-2.5 py-1 rounded-full">
  CBMERJ · RJ
</span>
```

### Seção de Normas / Glossário

- **Background:** `bg-neutral-900` (escuro, contraste com texto branco)
- **Layout:** grid 2 ou 3 colunas em desktop
- **Nunca:** glassmorphism — texto deve estar no DOM com contraste mínimo 4.5:1

### Formulário B2B

```tsx
// Campo select de estado + serviço
<form className="bg-white rounded-xl shadow-xl p-6 md:p-8">
  <select
    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-neutral-700 focus:ring-2 focus:ring-[#800000] focus:border-transparent outline-none"
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
