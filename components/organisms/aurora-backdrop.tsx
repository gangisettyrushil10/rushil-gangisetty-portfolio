/**
 * AuroraBackdrop — Petrova-line streak + violet/electric aurora ribbons.
 * Layered linear gradients with long-period drifts for constant subtle motion.
 * Pure CSS, mix-blend-mode: screen over the starfield below.
 */
export function AuroraBackdrop() {
  return (
    <div className="aurora-root" aria-hidden>
      <div className="aurora-ribbon aurora-petrova" />
      <div className="aurora-ribbon aurora-violet" />
      <div className="aurora-ribbon aurora-electric" />
      <div className="aurora-ribbon aurora-crimson" />
      <div className="aurora-glow" />
    </div>
  )
}
