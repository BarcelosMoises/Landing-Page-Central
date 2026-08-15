#!/usr/bin/env bash
# audit-paleta.sh — Task #34 (TASKS.md): auditoria de cores proibidas
# Central de Soluções — Landing Page
#
# Uso:
#   chmod +x audit-paleta.sh
#   ./audit-paleta.sh              # imprime no terminal
#   ./audit-paleta.sh > relatorio.md   # salva relatório em Markdown
#
# O relatório já sai no formato para colar como comentário da task #34 no TASKS.md.

set -u

# Garante execução a partir da raiz do repo
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo .)"
cd "$ROOT" || exit 1

if [ ! -d app ] || [ ! -d components ]; then
  echo "ERRO: diretórios app/ e/ou components/ não encontrados. Rode na raiz do repo." >&2
  exit 1
fi

DATA="$(date +%d/%m/%Y)"
COMMIT="$(git rev-parse --short HEAD 2>/dev/null || echo 'n/a')"

echo "> **Auditoria #34 (${DATA}, commit ${COMMIT}):**"
echo

TOTAL_GERAL=0

auditar() {
  local titulo="$1"
  local padrao="$2"
  local incluir_css="$3"

  local includes=(--include="*.tsx")
  [ "$incluir_css" = "sim" ] && includes+=(--include="*.css")

  local resultado
  resultado="$(grep -rn "${includes[@]}" -E "$padrao" app components 2>/dev/null || true)"

  echo "**${titulo}**"
  echo

  if [ -z "$resultado" ]; then
    echo "Nenhuma ocorrência ✅"
    echo
    return
  fi

  local total
  total="$(printf '%s\n' "$resultado" | wc -l | tr -d ' ')"
  TOTAL_GERAL=$((TOTAL_GERAL + total))

  echo "${total} ocorrência(s):"
  echo
  echo '```'
  printf '%s\n' "$resultado"
  echo '```'
  echo
  echo "Por arquivo:"
  echo
  printf '%s\n' "$resultado" | cut -d: -f1 | sort | uniq -c | sort -rn | while read -r n arquivo; do
    echo "- \`${arquivo}\` — ${n}x"
  done
  echo
}

# Grep 1 da task #34: cores proibidas (tsx + css)
auditar "Cores proibidas — \`#111827\` · \`neutral-900\` · \`neutral-950\` · \`bg-black\` · \`text-neutral-400\` · \`text-gray-*\`" \
  '#111827|neutral-900|neutral-950|bg-black|text-neutral-400|text-gray-' "sim"

# Grep 2 do bloco de verificação: hex da marca hardcoded (apenas tsx)
auditar "Hex \`#800000\` hardcoded (verificar se está fora de tokens/layouts)" \
  '#800000' "não"

if [ "$TOTAL_GERAL" -eq 0 ]; then
  echo "**Resultado: nenhuma violação encontrada — paleta conforme AGENTS.md ✅**"
else
  echo "**Resultado: ${TOTAL_GERAL} ocorrência(s) a tratar nas tasks #35–#39.**"
fi
