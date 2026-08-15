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

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 34 | ✅ | `app/` + `components/` | Auditoria de cores proibidas concluída: 149 ocorrências mapeadas e classificadas | AGENTS.md → Proibições Explícitas | 🔴 |
| 35 | ✅ | `components/CtaFinal.tsx` | CtaFinal criado e adotado nas 7 rotas | AGENTS.md → Componentes Compartilhados | 🔴 |
| 36 | ✅ | `components/CrosshairDecor.tsx` + `components/CtaFinal.tsx` | Fundo da CTA tingido pelo accent em 12%; comentários desatualizados do CrosshairDecor corrigidos | DESIGN.md → Hierarquia dos Fundos Escuros | 🔴 |
| 37 | ✅ | `components/CtaFinal.tsx` + subpáginas | Tokens da CTA corrigidos; funções IconeChevron não utilizadas removidas; nenhum `text-neutral-400` sobre fundo escuro | DESIGN.md → Tokens sobre `#1a0000` | 🔴 |
| 38 | ✅ | `components/CtaFinal.tsx` + subpáginas | Botão primário e borda superior derivados de `--color-service-accent` | AGENTS.md → Sistema de Cores | 🔴 |
| 39 | ✅ | Subpáginas (cards normativos) | Oito cards Base Normativa convertidos para `color-mix` 8% + `border-l-4` no accent | DESIGN.md → Paleta por Serviço | 🔴 |
| 40 | ✅ | Todas as subpáginas | CTA inline substituída por CtaFinal nas 7 rotas | AGENTS.md → Proibições Explícitas | 🔴 |
| 41 | ⬜ | Todas as subpáginas | Verificar contraste dos accents em texto pequeno com WebAIM Contrast Checker | AGENTS.md → Acessibilidade | 🟡 |
| 58 | ✅ | Subpáginas (hero) | Heroes corrigidos para `bg-[#0a0a0a]` e offsets de foco correspondentes | DESIGN.md → Hierarquia dos Fundos Escuros | 🔴 |
| 59 | ✅ | `components/MapaAtuacao.tsx` | `#cc2200` substituído por `#a30000`; restrição de reuso documentada | DESIGN.md → Paleta de Cores | 🟡 |

---

## Fase 2 — Substituição dos placeholders por imagens reais

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 42 | 🟦 | `components/PlaceholderImage.tsx` | Placeholder criado e agora usa accent dinâmico: fundo `color-mix` 18% + `#1a0000`, borda 45% do accent. **Pendente:** substituir por imagens reais e remover antes do deploy | AGENTS.md → Placeholders temporários | 🔴 |
| 43 | ⬜ | `public/images/portfolio/` | Extrair fotos dos PDFs de portfólio e salvar com nomes canônicos do DESIGN.md | DESIGN.md → Mapeamento de Imagens | 🔴 |
| 44 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Substituir slot 16:9 por foto real de vistoria ou card documental | DESIGN.md → Mapeamento de Imagens | 🔴 |
| 45 | ⬜ | `app/licenciamento-ambiental/page.tsx` | Substituir slot 16:9 por `setor-solar.jpg` ou `setor-telecom.jpg` | DESIGN.md → Mapeamento de Imagens | 🔴 |
| 46 | ⬜ | `app/vigilancia-sanitaria/page.tsx` | Adicionar `hero-sanitaria.jpg` ao hero | DESIGN.md → Hero Section | 🔴 |
| 47 | ⬜ | `app/` | Auditar alt text de todas as imagens novas | AGENTS.md → Regras de SEO | 🔴 |
| 48 | ⬜ | `app/` + `components/` | Remover todos os placeholders e validar `grep -rn 'data-todo="placeholder"' app components` vazio antes do deploy | AGENTS.md → Placeholders temporários | 🔴 |

---

## Fase 3 — Melhorias de design

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 49 | ⬜ | Subpáginas (hero) | Avaliar overlay do hero tingido pelo accent da categoria | DESIGN.md → Gradientes | 🟡 |
| 50 | ⬜ | `docs/DESIGN.md` | Documentar overlay por serviço se a #49 for aprovada | DESIGN.md → Gradientes | 🟢 |
| 51 | ⬜ | Subpáginas (breadcrumb) | Adicionar `BreadcrumbList` JSON-LD e `aria-label="breadcrumb"` | AGENTS.md → SEO | 🟡 |
| 52 | ⬜ | Subpáginas (FAQ) | Corrigir motion do accordion com `prefers-reduced-motion` e validar FAQPage schema | DESIGN.md → Motion | 🟡 |
| 53 | ⬜ | Subpáginas | Revisar ritmo vertical em 1440px e 375px | DESIGN.md → Checklist Visual | 🟡 |

---

## Fase 4 — Governança

| # | Status | Componente/Arquivo | Tarefa | Referência | Prioridade |
|---|---|---|---|---|---|
| 54 | ✅ | `AGENTS.md` + `TASKS.md` | Documentação inicial criada e atualizada | AGENTS.md | — |
| 55 | ✅ | `CLAUDE.md` | Reduzido a ponteiro para AGENTS.md | AGENTS.md | 🟢 |
| 56 | ⬜ | Cliente + docs | Confirmar accent de `/regularizacao-prefeitura` | AGENTS.md → Mapa de cores | 🟡 |
| 57 | ⬜ | `docs/SEO.md` | Validar keyword primária de `/regularizacao-prefeitura` | SEO.md → Rotas | 🟡 |

---

## Verificação rápida

```bash
bash audit-paleta.sh
grep -rn --include="*.tsx" --include="*.css" -E "#111827|neutral-900|neutral-950|bg-black|text-neutral-400|text-gray-" app components
grep -rn 'data-todo="placeholder"' app components
```
