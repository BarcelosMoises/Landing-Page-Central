# TASKS.md — Central de Soluções Landing Page
> Plano de trabalho ativo. A numeração continua dos CSVs de planejamento que terminam na task #33.
> Última atualização: Agosto 2026

## Convenções

- **Status:** ⬜ Pendente, 🟦 Em andamento, ✅ Concluída.
- **Prioridade:** 🔴 Alta, 🟡 Média, 🟢 Baixa.
- **1 task = 1 commit.**
- **Referências:** `AGENTS.md`, `docs/DESIGN.md`, `docs/SEO.md`, `docs/SERVICOS.md`.

## Fase 1. Correção de paleta nas subpáginas

| # | Status | Componente/Arquivo | Tarefa | Prioridade |
|---|---|---|---|---|
| 34 | ✅ | `app/` e `components/` | Auditoria de cores proibidas concluída | 🔴 |
| 35 | ✅ | `components/CtaFinal.tsx` | CtaFinal criado e adotado nas 7 rotas | 🔴 |
| 36 | ✅ | `components/CrosshairDecor.tsx` e `components/CtaFinal.tsx` | CTA sem decoração redundante e com superfície própria. **Nota (Ago 2026):** componente `CrosshairDecor` desde então **removido do projeto** (task #60) | 🔴 |
| 37 | ✅ | `components/CtaFinal.tsx` e subpáginas | Contraste corrigido e ícones mortos removidos | 🔴 |
| 38 | ✅ | `components/CtaFinal.tsx` e subpáginas | Botão derivado do accent | 🔴 |
| 39 | ✅ | Subpáginas | Cards normativos integrados ao accent | 🔴 |
| 40 | ✅ | Todas as subpáginas | CtaFinal adotado nas 7 rotas | 🔴 |
| 41 | 🟦 | Todas as subpáginas | Validar cores únicas, pills, CTA e Footer nas 7 rotas | 🔴 |
| 58 | ✅ | Subpáginas | Heroes corrigidos para `#0a0a0a` | 🔴 |
| 59 | ✅ | `components/MapaAtuacao.tsx` | Accent fora da paleta corrigido | 🟡 |

### Tokens exclusivos

Cada rota deve definir um trio próprio. Nenhuma rota pode reutilizar o trio de outra rota.

| Rota | Accent | Surface CTA | Footer |
|---|---|---|---|
| `/avcb-corpo-de-bombeiros` | `#800000` | `#210707` | `#160303` |
| `/vigilancia-sanitaria` | `#0d7377` | `#071a1b` | `#041012` |
| `/licenciamento-ambiental` | `#2d6a2d` | `#0b1b12` | `#07120c` |
| `/laudos-tecnicos` | `#92610a` | `#1f1606` | `#140e03` |
| `/spda-para-raios` | `#b7791f` | `#211807` | `#160f03` |
| `/regularizacao-prefeitura` | `#6b21a8` | `#1a0c26` | `#110719` |
| `/projetos` | `#1e40af` | `#080f24` | `#050a19` |

## Fase 2. Imagens reais

| # | Status | Componente/Arquivo | Tarefa | Prioridade |
|---|---|---|---|---|
| 42 | 🟦 | `components/PlaceholderImage.tsx` | Placeholder usa accent dinâmico. Substituir por imagens reais antes do deploy | 🔴 |
| 43 | ⬜ | `public/images/portfolio/` | Extrair fotos reais dos PDFs | 🔴 |
| 44 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Substituir slot por foto real ou card documental | 🔴 |
| 45 | ⬜ | `app/licenciamento-ambiental/page.tsx` | Substituir slot por foto solar ou telecom | 🔴 |
| 46 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Adicionar foto ao hero | 🔴 |
| 47 | ⬜ | `app/` | Auditar alt text | 🔴 |
| 48 | ⬜ | `app/` e `components/` | Remover placeholders antes do deploy | 🔴 |

## Fase 3. Melhorias de design

| # | Status | Componente/Arquivo | Tarefa | Prioridade |
|---|---|---|---|---|
| 49 | ⬜ | Subpáginas | Avaliar overlay do hero por accent | 🟡 |
| 50 | ⬜ | `docs/DESIGN.md` | Documentar overlay por serviço se aprovado | 🟢 |
| 51 | ⬜ | Subpáginas | BreadcrumbList JSON-LD | 🟡 |
| 52 | ⬜ | Subpáginas | Motion reduzido no FAQ | 🟡 |
| 53 | ⬜ | Subpáginas | Revisar ritmo vertical | 🟡 |

## Fase 4. Governança

| # | Status | Componente/Arquivo | Tarefa | Prioridade |
|---|---|---|---|---|
| 54 | ✅ | `AGENTS.md` e `TASKS.md` | Documentação criada | — |
| 55 | ✅ | `CLAUDE.md` | Ponteiro para AGENTS.md | 🟢 |
| 56 | ⬜ | Cliente e docs | Confirmar accent da Prefeitura | 🟡 |
| 57 | ⬜ | `docs/SEO.md` | Validar keyword da Prefeitura | 🟡 |
| 60 | ✅ | Site inteiro | Retícula decorativa removida de todas as páginas e componentes | 🟡 |

> A retícula decorativa foi removida globalmente para simplificar a linguagem visual e eliminar elementos ornamentais que não organizam conteúdo real.

## Verificação rápida

```bash
bash audit-paleta.sh
grep -rn --include="*.tsx" --include="*.css" -E "#111827|neutral-900|neutral-950|bg-black|text-neutral-400|text-gray-" app components
grep -rn 'data-todo="placeholder"' app components
```
