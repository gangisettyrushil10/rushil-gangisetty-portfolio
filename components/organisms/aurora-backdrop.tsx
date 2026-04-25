/**
 * AuroraBackdrop — violet/electric/petrova/crimson ribbons.
 * One ribbon (the violet primary) gets a *static* turbulence warp via
 * #aurora-warp; the rest stay plain blurred gradients. Animating the
 * SVG turbulence per frame is far too expensive on a fixed full-screen
 * blurred surface, so the warp pattern is fixed and the ribbons drift
 * with their cheap CSS keyframe animations underneath it.
 */
export function AuroraBackdrop() {
  return (
    <>
      <svg
        aria-hidden
        width={0}
        height={0}
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id="aurora-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.015"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="aurora-root" aria-hidden>
        <div className="aurora-ribbon aurora-petrova" />
        <div className="aurora-ribbon aurora-violet aurora-warp" />
        <div className="aurora-ribbon aurora-electric" />
        <div className="aurora-ribbon aurora-crimson" />
        <div className="aurora-glow" />
      </div>
    </>
  )
}
