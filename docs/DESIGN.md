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
| `neutral-400` | `#9ca3af` | Textos secundários sobre fundo **claro** (nunca sobre #1a0000) |
| `neutral-700` | `#374151` | Textos de corpo |
| `neutral-900` | `#111827` | Headings, textos de alta ênfase |
| `brand-dark` | `#1a0000` | Nav ao scroll, menus mobile — vinho escuro cinemático |
| `brand-dark-deep` | `#1a0000` | Seções escuras (SetoresAtendidos, FormularioContato, Footer, Glossário) |

> **Atenção:** `neutral-400` (#9ca3af) não deve ser usado como texto sobre `#1a0000`.
> O tom azul-acinzentado cria disssonância de temperatura sobre o vinho escuro.
> Usar os tokens quentes abaixo em todos os fundos `#1a0000`.

### Tokens de Texto sobre Fundos Escuros (`#1a0000`)

| Token | Hex | Contraste sobre `#1a0000` | Uso |
|---|---|---|---|
| `text-warm-secondary` | `#c4a8a8` | ~6.3:1 ✓ WCAG AA | Parágrafos, descrições, links secundários |
| `text-warm-primary` | `#e0c8c8` | ~10.2:1 ✓ WCAG AAA | Links de contato, nomes de serviço |
| `text-white` | `#ffffff` | ~18.1:1 ✓ WCAG AAA | Headings, rótulos em caps |
| `text-white/70` | `rgba(255,255,255,0.70)` | ~10.4:1 ✓ WCAG AAA | Labels de categoria (uppercase 12px) |

**Implementação React:** não existem classes Tailwind para #c4a8a8/#e0c8c8. Usar `style={{ color: "#c4a8a8" }}` ou `style={{ color: "#e0c8c8" }}` diretamente no elemento.

### Hierarquia dos Fundos Escuros

| Posição | Componente | Fundo | Observação |
|---|---|---|---|
| Nav ao scroll | `NavPrimaria` | `#1a0000/95` + backdrop-blur | Sem texto secundário |
| Menu mobile | `NavPrimaria` (dropdown) | `#1a0000/98` | |
| Seção de setores | `SetoresAtendidos` | `#1a0000` | Texto: #c4a8a8 |
| Formulário/contato | `FormularioContato` | `#1a0000` | Texto: #c4a8a8 |
| Rodapé | `Footer` | `#1a0000` | Texto: #c4a8a8 / #e0c8c8 |
| Glossário/Normas | `GlossarioSecao` (futuro) | `#1a0000` | Texto: #c4a8a8 |
| Hero cinemtico | `HeroSection` | `#0a0a0a` + overlay vinho | Fundo mais escuro que o vinho |

### Cores de Sistema

| Token | Hex | Uso |
|---|---|---|
| `white` | `#ffffff` | Textos sobre fundos escuros, cards |
| `black` | `#0a0a0a` | Background hero, seções cinemáticas |
| `success` | `#16a34a` | Ícones de confirmação, badges de serviço ativo |
| `warning` | `#ca8a04` | Alertas de prazo, urgência |

### Estados de Foco e Interação

> **Regra absoluta:** nenhum elemento do site exibe o outline ou ring azul padrão do navegador
> (Chrome, Firefox, Safari) ou do Tailwind CSS. Todos os estados de foco são na cor da marca.

| Estado | Cor | Implementação |
|---|---|---|
| `:focus-visible` (teclado) | `#800000` | `globals.css @layer base` — cobre **todo** o site automaticamente |
| `ring-*` sem cor explícita (Tailwind) | `#800000` | `ringColor.DEFAULT` em `tailwind.config.ts` |
| Links `<a>` sem classe de cor | herda do pai | `a { color: inherit }` em `globals.css @layer base` |

**Por que isso importa:** navegadores modernos injetam `outline: 2px solid -webkit-focus-ring-color`
(azul) em qualquer elemento focável que não tenha `outline