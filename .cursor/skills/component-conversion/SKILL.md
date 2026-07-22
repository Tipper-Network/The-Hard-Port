---
name: component-conversion
description: Converts generic UI components to Hard Port brand voice and visual system. Use when a template or design system provides a default component like pricing grid, comparison table, or FAQ accordion.
---

# Skill — Converting a Generic Component to Brand Voice

Read `.cursor/rules/03-ui-visual-system.mdc`, `.cursor/rules/01-copywriting-standards.mdc`, and
`.cursor/rules/02-conversion-funnel.mdc` first.

1. Identify every default label the component ships with ("Compare Plans," "Features,"
   "Details," "Learn More").
2. Replace each with brand-voice copy that continues the sentence the rest of the page is
   saying — never leave a default label unedited, even for purely "functional" UI text.
3. **Do not revive legacy agency components** (Port/Sea/Ocean grids, free-slot forms, boosting
   tabs) without explicit human request and `offer-construction` run against SERVICE-001.
4. Re-skin default visual treatment (rounded soft cards, pastel highlights, generic checkmark
   icons) to match the visual system rules.
5. Re-run `could-exist-on-any-agency-site` on the result before shipping.
