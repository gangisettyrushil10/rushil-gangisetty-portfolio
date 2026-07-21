'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Gamepad2, Satellite } from 'lucide-react'
import { SoundtrackCapsule } from '@/components/observatory/soundtrack-capsule'

const BasketballGame = dynamic(() => import('@/components/observatory/basketball-game'), {
  ssr: false,
  loading: () => <p className="game-loading">Calibrating gravity…</p>,
})

export function OffDutyLab() {
  const [courtOpen, setCourtOpen] = useState(false)

  return (
    <section className="off-duty-section section-pad" aria-labelledby="off-duty-title">
      <div className="shell-width">
        <header className="section-heading compact-heading">
          <div>
            <p className="section-eyebrow">Off-duty lab / optional signals</p>
            <h2 id="off-duty-title">A little play keeps the instruments honest.</h2>
          </div>
          <p>Both modules are deliberately optional: the playlist loads only on request, and the court ships in a separate JavaScript chunk.</p>
        </header>

        <div className="off-duty-grid">
          <SoundtrackCapsule />
          <article className="court-capsule">
            <div className="court-capsule-copy">
              <p><Satellite size={14} aria-hidden="true" />Gravity assist</p>
              <h3>Observatory free throw</h3>
              <span>Pointer flick + keyboard controls. Score stays on this device.</span>
            </div>
            {!courtOpen ? (
              <button type="button" className="button button-secondary" onClick={() => setCourtOpen(true)}>
                <Gamepad2 size={17} aria-hidden="true" />Open the court
              </button>
            ) : <BasketballGame />}
          </article>
        </div>
      </div>
    </section>
  )
}
