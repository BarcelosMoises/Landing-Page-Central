# TASKS.md — Central de Soluções Landing Page
> Plano de trabalho ativo. A numeração continua dos CSVs de planejamento (que terminam na task #33).
> Última atualização: Agosto 2026

## Convenções

- **Status:** ⬜ Pendente · 🟦 Em andamento · ✅ Concluída
- **Prioridade:** 🔴 Alta · 🟡 Média · 🟢 Baixa
- **1 task = 1 commit** — mensagem no padrão `tipo(escopo): descrição`
- **Referências:** `AGENTS.md` · `docs/DESIGN.md` · `docs/SEO.md` · `docs/SERVICOS.md`
- Ao concluir uma task, atualizar o status aqui no mesmo commit

## Fase 1 — Correção de paleta nas subpáginas

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 34 | ✅ | `app/` + `components/` | Auditoria de cores proibidas concluída | AGENTS.md | 🔴 |
| 35 | ✅ | `components/CtaFinal.tsx` | CtaFinal criado e adotado nas 7 rotas | AGENTS.md | 🔴 |
| 36 | ✅ | `components/CrosshairDecor.tsx` + `components/CtaFinal.tsx` | CTA em base neutra quente com accent na borda/faixa; comentários corrigidos | DESIGN.md | 🔴 |
| 37 | ✅ | `components/CtaFinal.tsx` + subpáginas | Contraste corrigido e ícones mortos removidos | DESIGN.md | 🔴 |
| 38 | ✅ | `components/CtaFinal.tsx` + subpáginas | Botão e borda derivados do accent | AGENTS.md | 🔴 |
| 39 | ✅ | Subpáginas | Cards normativos integrados ao accent | DESIGN.md | 🔴 |
| 40 | ✅ | Todas as subpáginas | CtaFinal adotado nas 7 rotas | AGENTS.md | 🔴 |
| 41 | 🟦 | Todas as subpáginas | Validar que as 7 rotas têm cores únicas; garantir contraste dos pills e consistência entre header, CTA e footer | AGENTS.md | 🔴 |
| 58 | ✅ | Subpáginas | Heroes corrigidos para `#0a0a0a` | DESIGN.md | 🔴 |
| 59 | ✅ | `components/MapaAtuacao.tsx` | `#cc2200` substituído por `#a30000` | DESIGN.md | 🟡 |

> **Regra de identidade (Ago 2026):** cada subpágina deve possuir um trio exclusivo de tokens `accent`, `surface` e `footer`. Nenhuma rota pode reutilizar o trio de outra rota. Header, CTA, Footer, botões, bordas, pills e cards devem derivar desses tokens; não misturar com a base vinho global.

## Mapa exclusivo de tokens

| Rota | Accent | Surface CTA | Footer |
|---|---|---|---|
| `/avcb-corpo-de-bombeiros` | `#800000` | `#210707` | `#160303` |
| `/vigilancia-sanitaria` | `#0d7377` | `#071a1b` | `#041012` |
| `/licenciamento-ambiental` | `#2d6a2d` | `#0b1b12` | `#07120c` |
| `/laudos-tecnicos` | `#92610a` | `#1f1606` | `#140e03` |
| `/spda-para-raios` | `#b7791f` | `#211807` | `#160f03` |
| `/regularizacao-prefeitura` | `#6b21a8` | `#1a0c26` | `#110719` |
| `/projetos` | `#1e40af` | `#080f24` | `#050a19` |

## Fase 2 — Imagens reais

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 42 | 🟦 | `components/PlaceholderImage.tsx` | Placeholder usa accent dinâmico; substituir por imagens reais | AGENTS.md | 🔴 |
| 43 | ⬜ | `public/images/portfolio/` | Extrair fotos reais dos PDFs | DESIGN.md | 🔴 |
| 44 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Substituir slot por foto real/card documental | DESIGN.md | 🔴 |
| 45 | ⬜ | `app/licenciamento-ambiental/page.tsx` | Substituir slot por foto solar/telecom | DESIGN.md | 🔴 |
| 46 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Adicionar foto ao hero | DESIGN.md | 🔴 |
| 47 | ⬜ | `app/` | Auditar alt text | AGENTS.md | 🔴 |
| 48 | ⬜ | `app/` + `components/` | Remover placeholders antes do deploy | AGENTS.md | 🔴 |

## Fase 3 — Melhorias de design

| # | Status | Componente/Arquivo | Tarefa | Prioridade |
|---|---|---|---|---|
| 49 | ⬜ | Subpáginas | Avaliar overlay do hero por accent | 🟡 |
| 50 | ⬜ | `docs/DESIGN.md` | Documentar overlay por serviço se aprovado | 🟢 |
| 51 | ⬜ | Subpáginas | BreadcrumbList JSON-LD | 🟡 |
| 52 | ⬜ | Subpáginas | Motion reduzido no FAQ | 🟡 |
| 53 | ⬜ | Subpáginas | Revisar ritmo vertical | 🟡 |

## Fase 4 — Governança

| # | Status | Componente/Arquivo | Tarefa | Prioridade |
|---|---|---|---|---|
| 54 | ✅ | `AGENTS.md` + `TASKS.md` | Documentação criada | — |
| 55 | ✅ | `CLAUDE.md` | Ponteiro para AGENTS.md | 🟢 |
| 56 | ⬜ | Cliente + docs | Confirmar accent da Prefeitura | 🟡 |
| 57 | ⬜ | `docs/SEO.md` | Validar keyword da Prefeitura | 🟡 |

## Verificação rápida

```bash
bash audit-paleta.sh
grep -rn --include="*.tsx" --include="*.css" -E "#111827|neutral-900|neutral-950|bg-black|text-neutral-400|text-gray-" app components
grep -rn 'data-todo="placeholder"' app components
```
