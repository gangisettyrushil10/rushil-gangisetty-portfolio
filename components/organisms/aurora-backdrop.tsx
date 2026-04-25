/**
 * AuroraBackdrop — Petrova-line streak + violet/electric aurora ribbons.
 * Now warped by an SVG turbulence filter that animates baseFrequency to
 * give the ribbons an "Adrian"-style undulating, almost-liquid flow.
 */
export function AuroraBackdrop() {
  return (
    <>
      {/* Out-of-flow filter defs — referenced by .aurora-ribbon via CSS */}
      <svg
        aria-hidden
        width={0}
        height={0}
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="aurora-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="3" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="38s"
                values="0.008 0.014; 0.011 0.018; 0.007 0.012; 0.008 0.014"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="68" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="aurora-warp-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="2" seed="11" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="64s"
                values="0.005 0.009; 0.008 0.012; 0.004 0.007; 0.005 0.009"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="42" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="aurora-root" aria-hidden>
        <div className="aurora-ribbon aurora-petrova aurora-warp" />
        <div className="aurora-ribbon aurora-violet aurora-warp" />
        <div className="aurora-ribbon aurora-electric aurora-warp-soft" />
        <div className="aurora-ribbon aurora-crimson aurora-warp-soft" />
        <div className="aurora-glow" />
        <div className="aurora-flow" />
      </div>
    </>
  )
}
