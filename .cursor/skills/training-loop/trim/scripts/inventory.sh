#!/usr/bin/env bash
# Static fixed per-turn baseline (one proxy for token economy — see TRIM-LOOP.md four taxes)
# Usage: bash .cursor/training-loop/trim/scripts/inventory.sh [repo-root]

set -euo pipefail
ROOT="${1:-$(cd "$(dirname "$0")/../../../../" && pwd)}"
RULES="$ROOT/.cursor/rules"
SKILLS="$ROOT/.cursor/skills"

echo "# Tipper context inventory — $(date -Iseconds)"
echo "repo: $ROOT"
echo ""

total_always=0
total_scoped=0

echo "## Always-on rules (alwaysApply: true)"
while IFS= read -r f; do
  [[ -f "$f" ]] || continue
  bytes=$(wc -c < "$f" | tr -d ' ')
  total_always=$((total_always + bytes))
  name=$(basename "$f")
  printf "  %-40s %6d bytes\n" "$name" "$bytes"
done < <(grep -l 'alwaysApply: true' "$RULES"/*.mdc 2>/dev/null | sort)

echo ""
echo "  ALWAYS_ON_TOTAL: $total_always bytes (~$((total_always / 4)) est tokens)"
echo ""

echo "## Path-scoped rules (alwaysApply: false)"
while IFS= read -r f; do
  [[ -f "$f" ]] || continue
  bytes=$(wc -c < "$f" | tr -d ' ')
  total_scoped=$((total_scoped + bytes))
  globs=$(grep -m1 '^globs:' "$f" 2>/dev/null | sed 's/^globs: //' || echo "(none)")
  name=$(basename "$f")
  printf "  %-40s %6d bytes  globs=%s\n" "$name" "$bytes" "$globs"
done < <(grep -l 'alwaysApply: false' "$RULES"/*.mdc 2>/dev/null | sort)

echo ""
echo "  SCOPED_TOTAL: $total_scoped bytes (loaded when globs match)"
echo ""

agents_bytes=0
if [[ -f "$ROOT/AGENTS.md" ]]; then
  agents_bytes=$(wc -c < "$ROOT/AGENTS.md" | tr -d ' ')
fi
echo "## Entry"
printf "  %-40s %6d bytes\n" "AGENTS.md" "$agents_bytes"

echo ""
echo "## Tipper sprint skills (on-demand — not always injected)"
tipper_skill_total=0
for f in "$SKILLS"/tipper-*/SKILL.md; do
  [[ -f "$f" ]] || continue
  bytes=$(wc -c < "$f" | tr -d ' ')
  tipper_skill_total=$((tipper_skill_total + bytes))
  name=$(basename "$(dirname "$f")")
  printf "  %-40s %6d bytes\n" "$name" "$bytes"
done
echo "  TIPPER_SKILLS_TOTAL: $tipper_skill_total bytes"

echo ""
echo "## Summary"
echo "  per_turn_estimate: $((total_always + agents_bytes)) bytes always-on rules + AGENTS (~$(((total_always + agents_bytes) / 4)) est tokens)"
echo "  budget_target_always_on: 20480 bytes (~5k tokens)"
