# Execution instruments — visual brief

Use this prompt to build the diagram for `execution-section.tsx`. Drop the finished asset at `apps/web/public/execution-instruments.svg` (or `.png` / `.webp`) and swap the placeholder `<figure>` for an `<img>` or `next/image`.

---

## Prompt (copy into Figma, Illustrator, or an AI image tool)

**Subject:** A horizontal flow diagram for a dark navy marketing site. Nautical-adjacent but minimal — no clip art ships.

**Layout:** Three columns left to right, connected by arrows.

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| **Diagnostic** | **Primary constraint** | **Scoped instruments** |
| Evidence across 8 dimensions | One bottleneck named | Only what the constraint requires |

**Column 3 — instrument clusters** (group as a stacked card or hub-and-spoke, not a shopping menu):

1. **Identity & messaging** — positioning, brand language, offer presentation  
2. **Content & campaigns** — strategy, pillars, campaign architecture *(only when warranted)*  
3. **Customer & community** — interviews, feedback, referral patterns  
4. **Operating systems** — workflows, capacity rules, delivery standards  

**Visual rules:**

- Background: transparent or `#12151d` (site deepest navy)  
- Primary accent: gold/amber `#d9b676` for arrows, constraint box, and “approved scope” highlights  
- “Wrong path” muted: desaturate or strike through a small side branch labelled **Menu shopping** (branding package / content retainer / boost button) — dashed line that dead-ends, does not connect to column 3  
- Typography: condensed uppercase headings (Anton-like), sans body (IBM Plex-like)  
- No Port/Sea/Ocean tiers. No pricing. No “free slot” badges  

**Caption line (below diagram):**  
*Instruments enter through the intervention — scoped to the constraint, not sold off-menu.*

**Aspect ratio:** ~4:3 or 16:10, min width 800px for retina  

**Export:** SVG preferred (flat shapes, no photos). Name: `execution-instruments.svg`

---

## After export

1. Asset: `apps/web/public/execution-instruments.png` (wired in `execution-section.tsx`)
