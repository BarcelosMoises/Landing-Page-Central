# TASKS.md — Central de Soluções Landing Page
> Plano de trabalho ativo. A numeração continua dos CSVs de planejamento (que terminam na task #33).
> Última atualização: Agosto 2026

## Convenções

- **Status:** ⬜ Pendente · 🟦 Em andamento · ✅ Concluída
- **Prioridade:** 🔴 Alta · 🟡 Média · 🟢 Baixa — executar nesta ordem
- **1 task = 1 commit** — mensagem no padrão `tipo(escopo): descrição` (ex.: `fix(cta): fundo #1a0000 na seção CTA final`)
- **Referências:** `AGENTS.md` · `docs/DESIGN.md` · `docs/SEO.md` · `docs/SERVICOS.md`
- Ao concluir uma task, atualizar o status aqui no mesmo commit

---

## Fase 1 — Correção de paleta nas subpáginas

> Contexto: elementos das subpáginas fora da paleta definida (seção CTA acima do footer,
> card "Base Normativa"). Regras violadas: hierarquia de fundos escuros e tokens quentes
> de texto — ver AGENTS.md → Hierarquia dos Fundos Escuros.

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 34 | ✅ | `app/` + `components/` | Auditoria de cores proibidas: rodar `grep -rn --include="*.tsx" --include="*.css" -E "#111827\|neutral-900\|neutral-950\|bg-black\|text-neutral-400\|text-gray-" app components` e listar ocorrências num comentário nesta task. Critério de aceite: lista completa das violações mapeada por arquivo | AGENTS.md → Proibições Explícitas | 🔴 |
| 35 | 🟦 | `components/CtaFinal.tsx` | Criar o componente compartilhado `CtaFinal` (Server Component) com props `titulo`, `subtitulo`, `whatsappUrl`, `email`, absorvendo a marcação hoje duplicada nas subpáginas. Critério de aceite: componente existe e renderiza idêntico ao layout aprovado. **Em andamento:** componente criado no commit `feat(cta)` — vira ✅ após verificação visual e adoção nas 7 rotas (task #40) | AGENTS.md → Componentes Compartilhados | 🔴 |
| 36 | ⬜ | `components/CtaFinal.tsx` | Fundo da seção em `bg-[#1a0000]` (remover `#0a0a0a`/`bg-black`/neutro) + `<CrosshairDecor />` no canto inferior direito. Aproveitar e limpar os comentários desatualizados de `CrosshairDecor.tsx` (linhas 4 e 46 citam `bg-neutral-900`). Aceite: seção na temperatura quente correta, retícula visível a 8% de opacidade | DESIGN.md → Hierarquia dos Fundos Escuros | 🔴 |
| 37 | ⬜ | `components/CtaFinal.tsx` | Tokens de texto: heading `text-white`, subtítulo `#c4a8a8` via `style=`, botão ghost de e-mail como `mailto:` com borda `white/20` e texto `#e0c8c8`. Verificar o contexto dos 5 ícones SVG com `text-neutral-400` (avcb:186, spda:167, vigilancia:175, ambiental:181, prefeitura:201) — manter apenas se estiverem sobre fundo claro. Aceite: nenhum `text-neutral-400` sobre fundo escuro; contraste ≥ 4.5:1 | DESIGN.md → Tokens sobre `#1a0000` | 🔴 |
| 38 | ⬜ | `components/CtaFinal.tsx` + subpáginas | Botão primário com `backgroundColor: "var(--color-service-accent, #800000)"` e `border-t-4` no accent como transição vinda do FAQ. Aceite: teal em `/vigilancia-sanitaria`, verde em `/licenciamento-ambiental`, vinho nas demais — sem hex hardcoded | AGENTS.md → Sistema de Cores | 🔴 |
| 39 | ⬜ | Subpáginas (card "Base Normativa") | Fundo do card em `color-mix(in srgb, var(--color-service-accent) 8%, #1a0000)` com `border-l-4` no accent e códigos de norma em `tabular-nums`. São 8 ocorrências de `bg-neutral-900` (AVCB tem 2 cards). Aceite: card integrado à identidade da categoria, sem fundo navy/neutro | DESIGN.md → Paleta por Serviço | 🔴 |
| 40 | ⬜ | Todas as subpáginas | Substituir a seção CTA inline por `<CtaFinal ... />` nas 7 rotas (`avcb-corpo-de-bombeiros`, `vigilancia-sanitaria`, `spda-para-raios`, `laudos-tecnicos`, `licenciamento-ambiental`, `regularizacao-prefeitura`, `projetos`). Aceite: `grep -rn "Precisa de" app` retorna apenas `CtaFinal.tsx` e as props nas páginas | AGENTS.md → Proibições Explícitas | 🔴 |
| 41 | ⬜ | Todas as subpáginas | Verificar contraste dos accents em texto pequeno (teal `#0d7377`, verde `#2d6a2d`, dourado `#92610a` sobre branco) com WebAIM Contrast Checker; onde falhar, usar o accent apenas em elementos grandes/ícones e texto em `neutral-700`. Aceite: 4.5:1 em todo texto de corpo | AGENTS.md → Acessibilidade | 🟡 |
| 58 | ⬜ | Subpáginas (hero) | Fundo dos heroes de `bg-neutral-950` (#030712, preto azulado — 7 ocorrências) para `bg-[#0a0a0a]`, único preto permitido no hero; ajustar os `focus-visible:ring-offset-neutral-950` dos botões do hero para `ring-offset-[#0a0a0a]`. Aceite: zero `neutral-950` nos heroes; temperatura quente mantida | DESIGN.md → Hierarquia dos Fundos Escuros | 🔴 |
| 59 | ⬜ | `components/MapaAtuacao.tsx` | Substituir `text-[#cc2200]` (linha 164 — vermelho vivo fora da paleta) por `text-[#a30000]` (`primary-light`); revisar os demais hardcodes `#800000`/`#4f0101` do componente — aceitos por ser homepage-only, registrar restrição de reuso em comentário no topo do arquivo. Aceite: zero cores fora da paleta | DESIGN.md → Paleta de Cores | 🟡 |

> **Auditoria #34 (15/08/2026, commit 257e802) — 149 ocorrências mapeadas via `audit-paleta.sh`:**
> - `bg-neutral-950` ×14 — 7 heroes (task #58) + 7 seções CTA (tasks #35–#38), uma de cada por subpágina
> - `bg-neutral-900` ×8 — cards "Base Normativa" (task #39); AVCB tem 2 cards
> - `text-neutral-400` sobre fundo escuro ×~15 — subtítulos da CTA, labels "Base Normativa" e 1 item de estado no card do AVCB (task #37); demais `neutral-400`/`neutral-900` estão sobre fundo claro (permitido)
> - `focus-visible:ring-offset-neutral-950` ×14 — botões de hero e CTA; acompanham os novos fundos (tasks #36–#37, #58)
> - `#800000` hardcoded ×56 — maioria legítima (fallbacks de `var(--color-service-accent, #800000)`, homepage, `layout.tsx` do AVCB); exceções tratadas na task #59
> - Falsos positivos: comentários em `FormularioContato.tsx`, `SetoresAtendidos.tsx`, `CrosshairDecor.tsx` (limpeza na #36)
> - Observação menor: overlays `bg-black/50`–`55` do hero da homepage são permitidos (hero aceita preto); alinhar para `#0a0000` quando o `HeroFullscreen` for tocado

---

## Fase 2 — Substituição dos placeholders por imagens reais

> Contexto: o placeholder vermelho é temporário (design aprovado pelo cliente). Regra:
> nunca stock photo enquanto houver foto real — ver AGENTS.md → Placeholders temporários.

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 42 | ⬜ | `components/PlaceholderImage.tsx` | Criar o componente `PlaceholderImage` com `data-todo="placeholder"`, `aspect-video`, `rounded-lg`, fundo `#4f0101` e label descritivo do slot. Aceite: todos os placeholders atuais passam a usar o componente (grepável) | AGENTS.md → Placeholders temporários | 🔴 |
| 43 | ⬜ | `public/images/portfolio/` | Extrair as fotos dos PDFs de portfólio do cliente e salvar com os nomes canônicos do DESIGN.md (`hero-sanitaria.jpg`, `setor-solar.jpg`, `setor-telecom.jpg` etc.). Aceite: arquivos otimizados (< 300 KB, JPG/WebP) no diretório correto | DESIGN.md → Mapeamento de Imagens | 🔴 |
| 44 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Substituir o placeholder do slot 16:9 do "Escopo do serviço" por foto real de vistoria/inspeção do portfólio; se não houver foto adequada, implementar o card visual de documento (fac-símile de Alvará Sanitário + card Base Normativa sobreposto). Aceite: `next/image` com `sizes="(min-width: 1024px) 50vw, 100vw"`, sem `priority`, `alt` técnico descritivo | DESIGN.md → Mapeamento de Imagens | 🔴 |
| 45 | ⬜ | `app/licenciamento-ambiental/page.tsx` | Substituir o placeholder do slot 16:9 por `setor-solar.jpg` (painéis fotovoltaicos) ou `setor-telecom.jpg` (antena em área verde). Aceite: mesmas regras técnicas da #44 | DESIGN.md → Mapeamento de Imagens | 🔴 |
| 46 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Adicionar a foto `hero-sanitaria.jpg` (engenheiro analisando planta) ao hero, hoje sem imagem — `next/image` com `fill`, `priority`, `object-cover` + overlay `from-[#4f0101]/85 to-[#0a0000]/60` + `<CrosshairDecor />`. Aceite: paridade visual com o hero de `/licenciamento-ambiental` | DESIGN.md → Hero Section | 🔴 |
| 47 | ⬜ | `app/` | Auditar `alt` de todas as imagens novas: descrever conteúdo técnico real (ex.: "Engenheiro analisando planta arquitetônica de cozinha industrial"), nunca nome de arquivo. Aceite: regra de SEO #6 cumprida em 100% das imagens | AGENTS.md → Regras de SEO | 🔴 |
| 48 | ⬜ | `app/` + `components/` | Gate de deploy: `grep -rn 'data-todo="placeholder"' app components` deve retornar vazio; remover `PlaceholderImage` dos imports. Aceite: zero ocorrências na branch `main` | AGENTS.md → Placeholders temporários | 🔴 |

---

## Fase 3 — Melhorias de design

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 49 | ⬜ | Subpáginas (hero) | Tingir o overlay do hero com o accent da categoria: `color-mix(in srgb, var(--color-service-accent) 40%, #0a0000)` no gradiente, mantendo legibilidade AAA do H1. Aceite: identidade de categoria visível no primeiro viewport; contraste do H1 preservado | DESIGN.md → Gradientes | 🟡 |
| 50 | ⬜ | `docs/DESIGN.md` | Se a #49 for aprovada visualmente, registrar o overlay por serviço no DESIGN.md (seção Gradientes) para manter doc e código sincronizados. Aceite: regra documentada com snippet CSS | DESIGN.md → Gradientes | 🟢 |
| 51 | ⬜ | Subpáginas (breadcrumb) | Adicionar `aria-label="breadcrumb"` no `<nav>` do breadcrumb + JSON-LD `BreadcrumbList` (Início → Serviço) nas 7 rotas. Aceite: Rich Results Test sem erros | AGENTS.md → Regras de SEO #8 | 🟡 |
| 52 | ⬜ | Subpáginas (FAQ) | Animação de rotação do chevron do accordion respeitando `prefers-reduced-motion`; verificar `FAQPage` JSON-LD com mínimo 3 Q&A por página. Aceite: motion desligado quando o SO pede redução; schema válido | DESIGN.md → Motion | 🟡 |
| 53 | ⬜ | Subpáginas | Revisar ritmo vertical: paddings de seção consistentes (`py-20`/`py-24`) e espaçamento hero → "Escopo do serviço" sem vão excessivo em 1440px e 375px. Aceite: checklist de qualidade visual do DESIGN.md | DESIGN.md → Checklist de Qualidade Visual | 🟡 |

---

## Fase 4 — Governança e documentação

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 54 | ✅ | `AGENTS.md` + `TASKS.md` | Atualizar AGENTS.md (rota `/regularizacao-prefeitura`, política de placeholders, `CtaFinal`, `PlaceholderImage`, `MapaAtuacao`, scripts) e criar este TASKS.md — commit `docs:` de Ago 2026 | AGENTS.md | — |
| 55 | ⬜ | `CLAUDE.md` | Reduzir `CLAUDE.md` a um ponteiro para `AGENTS.md` ("ler AGENTS.md") para eliminar divergência entre arquivos de contexto. Aceite: conteúdo único, sem duplicação | AGENTS.md → cabeçalho | 🟢 |
| 56 | ⬜ | Cliente + `AGENTS.md`/`DESIGN.md` | Confirmar com o cliente o accent de `/regularizacao-prefeitura` (provisório: `#800000`, família Legalização). Se mudar: atualizar `layout.tsx`, seletor `data-service` em `globals.css`, mapa de cores do AGENTS.md e tabela do DESIGN.md. Aceite: decisão registrada nos dois docs | AGENTS.md → Mapa de cores | 🟡 |
| 57 | ⬜ | `docs/SEO.md` | Validar a keyword primária de `/regularizacao-prefeitura` (provisória: "regularização prefeitura alvará [estado]") e registrá-la na tabela de rotas do SEO.md. Aceite: keyword definida e metadata da página alinhada | SEO.md → Tabela de rotas | 🟡 |

---

## Verificação rápida (rodar a cada fase)

```bash
# Auditoria completa (gera relatório Markdown)
bash audit-paleta.sh

# Cores proibidas (Fase 1)
grep -rn --include="*.tsx" --include="*.css" -E "#111827|neutral-900|neutral-950|bg-black|text-neutral-400|text-gray-" app components

# Hex da marca hardcoded fora de tokens/layouts (Fase 1)
grep -rn --include="*.tsx" "#800000" components app

# Placeholders pendentes (Fase 2 — deve zerar antes do deploy)
grep -rn 'data-todo="placeholder"' app components
```
