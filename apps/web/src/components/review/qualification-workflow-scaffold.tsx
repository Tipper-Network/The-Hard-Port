/**
 * TODO(scaffold): guided qualification workflow beyond raw pipeline fields.
 * Ops doc: the-hard-port-os/operations/launch-scaffold/P03-intake-ops-loop.md
 */
export function QualificationWorkflowScaffold() {
  return (
    <section className="mt-6 border border-dashed border-white/20 p-6">
      <h4 className="text-xs font-bold tracking-[0.14em] text-white/40 uppercase">
        Qualification workflow (scaffold)
      </h4>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-white/50">
        <li>48h review SLA checklist</li>
        <li>Evidence gap prompts from intake responses</li>
        <li>One-click qualification outcome → lifecycle status mapping</li>
        <li>Reviewer assignment + handoff notes</li>
      </ul>
      <p className="mt-4 text-xs text-white/35">
        Fill in P03-intake-ops-loop.md, then replace this component.
      </p>
    </section>
  )
}
