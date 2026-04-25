export function bentoSpan(span: number): string {
  const map: Record<number, string> = {
    3: 'sm:col-span-6 md:col-span-3',
    4: 'sm:col-span-6 md:col-span-4',
    5: 'sm:col-span-6 md:col-span-5',
    6: 'sm:col-span-6 md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    12: 'md:col-span-12',
  }
  return `col-span-12 ${map[span] ?? ''}`
}

export function bentoRowSpan(rows: 1 | 2): string {
  return rows === 2 ? 'md:row-span-2' : ''
}

export function bentoQuirk(seed: string, _opts: { breathe?: boolean } = {}): string {
  // Continuous breathing keyframes were dropped in the perf triage.
  // Only deterministic vertical offset remains.
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  const offsetMod = Math.abs(h) % 5
  if (offsetMod === 0) return 'bento-cell--offset-up'
  if (offsetMod === 1) return 'bento-cell--offset-down'
  return ''
}
