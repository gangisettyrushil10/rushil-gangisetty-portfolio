/**
 * AuroraBackdrop — two drifting gradient ribbons.
 * Reduced from four ribbons + SVG filter to keep paint cost low.
 * The remaining ribbons rely on CSS keyframe transforms (GPU-cheap).
 */
export function AuroraBackdrop() {
  return (
    <div className="aurora-root" aria-hidden>
      <div className="aurora-ribbon aurora-violet" />
      <div className="aurora-ribbon aurora-electric" />
      <div className="aurora-glow" />
    </div>
  )
}
