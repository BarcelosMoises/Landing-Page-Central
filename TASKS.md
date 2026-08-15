# TASKS.md — Central de Soluções Landing Page
> Plano de trabalho ativo. A numeração continua dos CSVs de planejamento (que terminam na task #33).
> Última atualização: Agosto 2026

## Convenções

- **Status:** ⬜ Pendente · 🟦 Em andamento · ✅ Concluída
- **Prioridade:** 🔴 Alta · 🟡 Média · 🟢 Baixa — executar nesta ordem
- **1 task = 1 commit** — mensagem no padrão `tipo(escopo): descrição`
- **Referências:** `AGENTS.md` · `docs/DESIGN.md` · `docs/SEO.md` · `docs/SERVICOS.md`
- Ao concluir uma task, atualizar o status aqui no mesmo commit

---

## Fase 1 — Correção de paleta nas subpáginas

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 34 | ✅ | `app/` + `components/` | Auditoria de cores proibidas concluída | AGENTS.md | 🔴 |
| 35 | ✅ | `components/CtaFinal.tsx` | CtaFinal criado e adotado nas 7 rotas | AGENTS.md | 🔴 |
| 36 | ✅ | `components/CrosshairDecor.tsx` + `components/CtaFinal.tsx` | Fundo da CTA sem base vinho e comentários corrigidos | DESIGN.md | 🔴 |
| 37 | ✅ | `components/CtaFinal.tsx` + subpáginas | Tokens corrigidos e ícones mortos removidos | DESIGN.md | 🔴 |
| 38 | ✅ | `components/CtaFinal.tsx` + subpáginas | Botão e borda derivados do accent | AGENTS.md | 🔴 |
| 39 | ✅ | Subpáginas | Cards normativos integrados ao accent | DESIGN.md | 🔴 |
| 40 | ✅ | Todas as subpáginas | CtaFinal adotado nas 7 rotas | AGENTS.md | 🔴 |
| 41 | ⬜ | Todas as subpáginas | Verificar contraste dos accents | AGENTS.md | 🟡 |
| 58 | ✅ | Subpáginas | Heroes corrigidos para `#0a0a0a` | DESIGN.md | 🔴 |
| 59 | ✅ | `components/MapaAtuacao.tsx` | `#cc2200` substituído por `#a30000` | DESIGN.md | 🟡 |

> **Correção visual adicional (Ago 2026):** a CTA usava `color-mix` com base `#1a0000`. Essa combinação contaminava accents verdes e azuis, produzindo marrom-avermelhado. A base foi alterada para `#0a0a0a` e a contribuição do accent aumentada para 24%, preservando a temperatura de cada serviço.

---

## Fase 2 — Substituição dos placeholders por imagens reais

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 42 | 🟦 | `components/PlaceholderImage.tsx` | Placeholder usa accent dinâmico; substituir por imagens reais antes do deploy | AGENTS.md | 🔴 |
| 43 | ⬜ | `public/images/portfolio/` | Extrair fotos reais dos PDFs e salvar com nomes canônicos | DESIGN.md | 🔴 |
| 44 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Substituir slot 16:9 por foto real ou card documental | DESIGN.md | 🔴 |
| 45 | ⬜ | `app/licenciamento-ambiental/page.tsx` | Substituir slot 16:9 por foto solar/telecom | DESIGN.md | 🔴 |
| 46 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Adicionar foto real ao hero | DESIGN.md | 🔴 |
| 47 | ⬜ | `app/` | Auditar alt text | AGENTS.md | 🔴 |
| 48 | ⬜ | `app/` + `components/` | Remover placeholders antes do deploy | AGENTS.md | 🔴 |

---

## Fase 3 — Melhorias de design

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 49 | ⬜ | Subpáginas | Avaliar overlay do hero por accent | DESIGN.md | 🟡 |
| 50 | ⬜ | `docs/DESIGN.md` | Documentar overlay por serviço se aprovado | DESIGN.md | 🟢 |
| 51 | ⬜ | Subpáginas | BreadcrumbList JSON-LD | AGENTS.md | 🟡 |
| 52 | ⬜ | Subpáginas | Motion reduzido no FAQ | DESIGN.md | 🟡 |
| 53 | ⬜ | Subpáginas | Revisar ritmo vertical | DESIGN.md | 🟡 |

---

## Fase 4 — Governança

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 54 | ✅ | `AGENTS.md` + `TASKS.md` | Documentação criada | AGENTS.md | — |
| 55 | ✅ | `CLAUDE.md` | Ponteiro para AGENTS.md | AGENTS.md | 🟢 |
| 56 | ⬜ | Cliente + docs | Confirmar accent da Prefeitura | AGENTS.md | 🟡 |
| 57 | ⬜ | `docs/SEO.md` | Validar keyword da Prefeitura | SEO.md | 🟡 |

---

## Verificação rápida

```bash
bash audit-paleta.sh
grep -rn --include="*.tsx" --include="*.css" -E "#111827|neutral-900|neutral-950|bg-black|text-neutral-400|text-gray-" app components
grep -rn 'data-todo="placeholder"' app components
```
