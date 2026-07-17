# Icon / motif direction

**Nautical only. No rockets, lightbulbs, or handshakes.** (Direct quote from the doc's section
label — this is already a hard rule, see `RULES.md`.)

## The six motifs defined

| Motif | Built from | Use case |
|-------|------------|----------|
| **Anchor** | Circle + cross lines + two angled "flukes," all in Gold | Grounding, proof, stats |
| **Sail** | A single triangle (CSS border-trick), solid Gold | Momentum, offer stack |
| **Rope / knot** | Two overlapping circles — one Gold, one Rust | Commitment, tiers |
| **Rock** | An irregular polygon (`clip-path`), flat gray (`oklch(0.45 0.02 250)`) | Warning, agitation |
| **Compass** | Circle + 4 tick marks (N/S/E/W) + center dot, all Gold | Direction, identity match |
| **Depth line** | 3 stacked horizontal bars, shrinking width, fading from Gold → Ink Muted → dim gray | Scroll progress indicator |

All are built as plain CSS shapes in the doc (borders, clip-path, positioned divs) — no icon
library referenced. Whatever gets implemented for real doesn't need to match this construction
method, just the *shape vocabulary*: circles, triangles, angled lines, polygons — nothing
rounded-friendly-tech (no rocket, no lightbulb, no handshake, no checkmark-in-a-circle SaaS
iconography).

## Live comparison

No icon system currently exists in `apps/web` beyond whatever comes bundled with shadcn/lucide
defaults (not audited here). This is a pure gap, not a conflict — nothing to reconcile, just a
motif set to build from when icons are actually needed (e.g. a scroll-progress indicator using
the "Depth line" motif would directly reinforce the scroll-intensity mechanic in
`07-depth-scroll-intensity.md`).

Cross-reference: `.cursor/skills/component-conversion/SKILL.md` (converting generic template
components to brand voice) is the natural home for enforcing this when a UI library's default
icon set gets swapped in.
