'use client'

const topSignals = [
  'Product software',
  'Backend APIs',
  'Data workflows',
  'ASP.NET Core',
  'React + Next.js',
  'SQL and validation',
  'Applied AI',
  'Systems that hold up',
]

const bottomSignals = [
  'Rushil Gangisetty',
  'Dallas, Texas',
  'Software engineer',
  'Full-stack execution',
  'Business systems',
  'Forecasting and ETL',
  'Case studies with demos',
  'Open to opportunities',
]

function RailRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const repeated = [...items, ...items]

  return (
    <div className="marquee-shell">
      <div className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}>
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className="signal-pill">
            <span className="signal-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SignalRail() {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-10">
      <RailRow items={topSignals} />
      <RailRow items={bottomSignals} reverse />
    </section>
  )
}
