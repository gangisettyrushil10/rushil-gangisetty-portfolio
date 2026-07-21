export type Capability = {
  title: string
  description: string
  tools: string[]
  proof: { label: string; href: string }[]
  depth: 'Used deeply' | 'Working fluency' | 'Learning now'
}

export type SystemDossier = {
  id: string
  eyebrow: string
  title: string
  description: string
  nodes: { label: string; detail: string }[]
  decision: string
  evidenceHref: string
  evidenceLabel: string
}

export type PersonalSignal = {
  label: string
  title: string
  note: string
}

export const heroContent = {
  eyebrow: 'Transmission 07 / Dallas, Texas',
  title: 'Rushil Gangisetty',
  role: 'Software engineer · incoming M.S. student focused on intelligent systems',
  proposition:
    'I build useful systems across applied AI, full-stack products, data, and fintech — with calm interfaces and engineering decisions you can inspect.',
  availability:
    'Seeking software engineering, AI/ML, data, fintech, and intelligent-systems internships.',
}

export const featuredProjectIds = [
  'fuzzy',
  'buzzr',
  'credit-union-ledger-api',
  'business-analytics-dashboard',
] as const

export const supportingProjectIds = [
  'blended',
  'graph-link-prediction',
  'ibm-medscribe-ai',
] as const

export const systemDossiers: SystemDossier[] = [
  {
    id: 'fuzzy-boundaries',
    eyebrow: 'Desktop AI / trust boundary',
    title: 'Keep documents local. Keep secrets out of the renderer.',
    description:
      'Fuzzy uses Electron process boundaries as an architectural constraint, not just a packaging detail.',
    nodes: [
      { label: 'Renderer', detail: 'React reading, annotation, study, and research workflows' },
      { label: 'Typed preload', detail: 'Small allowlisted bridge across the process boundary' },
      { label: 'Main process', detail: 'SQLite, file extraction, model calls, path and URL checks' },
    ],
    decision:
      'The renderer never gets direct filesystem, database, or secret access. AI keys use operating-system credential facilities, and mock mode keeps the product testable offline.',
    evidenceHref: 'https://github.com/gangisettyrushil10/fuzzy',
    evidenceLabel: 'Inspect Fuzzy source',
  },
  {
    id: 'ledger-write-path',
    eyebrow: 'Fintech / correctness path',
    title: 'Make retries boring and account state explicit.',
    description:
      'The Credit Union Ledger API treats duplicate requests and insufficient funds as normal operating conditions.',
    nodes: [
      { label: 'Validate', detail: 'Typed DTOs and FluentValidation guard the request contract' },
      { label: 'Deduplicate', detail: 'An idempotency key resolves retries to the original transaction' },
      { label: 'Commit + audit', detail: 'Balance changes and audit records share the application flow' },
    ],
    decision:
      'Thin controllers hand work to services and repositories, so overdraft rules, audit behavior, and transaction safety remain testable without coupling them to HTTP.',
    evidenceHref: 'https://github.com/gangisettyrushil10/Credit-Union-Ledger-API',
    evidenceLabel: 'Inspect ledger source',
  },
  {
    id: 'analytics-pipeline',
    eyebrow: 'Data / evidence pipeline',
    title: 'Do not forecast data you have not earned the right to trust.',
    description:
      'The analytics dashboard makes upload validation part of the product workflow before forecasting or AI-written interpretation.',
    nodes: [
      { label: 'Ingest', detail: 'CSV upload and schema discovery expose imperfect input' },
      { label: 'Validate + transform', detail: 'Previewed cleanup keeps changes legible to the user' },
      { label: 'Analyze', detail: 'Forecasting, anomaly detection, and assisted reporting stay separate' },
    ],
    decision:
      'Prophet, Isolation Forest, and model-written summaries sit behind discrete backend services; the interface keeps the path from raw rows to output visible.',
    evidenceHref: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard',
    evidenceLabel: 'Inspect analytics source',
  },
]

export const capabilities: Capability[] = [
  {
    title: 'Build intelligent products',
    description:
      'Shape model calls into grounded reading, structured review, retrieval, and recommendation workflows.',
    tools: ['OpenAI API', 'IBM watsonx', 'PyTorch', 'scikit-learn', 'LLM pipelines'],
    proof: [
      { label: 'Fuzzy', href: '/projects/fuzzy' },
      { label: 'Graph Link Prediction', href: '/projects/graph-link-prediction' },
    ],
    depth: 'Used deeply',
  },
  {
    title: 'Design backend and data systems',
    description:
      'Build clear contracts around transactions, auth, persistence, realtime data, and imperfect uploads.',
    tools: ['ASP.NET Core', 'FastAPI', 'PostgreSQL', 'SQLite', 'Supabase', 'REST APIs'],
    proof: [
      { label: 'Ledger API', href: '/projects/credit-union-ledger-api' },
      { label: 'Analytics Dashboard', href: '/projects/business-analytics-dashboard' },
    ],
    depth: 'Used deeply',
  },
  {
    title: 'Ship polished product surfaces',
    description:
      'Move between web, desktop, mobile, and native Apple interfaces without losing product clarity.',
    tools: ['React', 'Next.js', 'Electron', 'React Native', 'SwiftUI', 'Metal'],
    proof: [
      { label: 'Buzzr', href: '/projects/buzzr' },
      { label: 'PixelDraw', href: '/projects/pixeldraw' },
    ],
    depth: 'Working fluency',
  },
  {
    title: 'Deploy and keep systems legible',
    description:
      'Use tests, typed boundaries, Docker, CI/CD, and practical observability to make iteration safer.',
    tools: ['TypeScript', 'xUnit', 'Vitest', 'Playwright', 'Docker', 'CI/CD'],
    proof: [
      { label: 'Fuzzy architecture', href: '/projects/fuzzy' },
      { label: 'Ledger tests', href: '/projects/credit-union-ledger-api' },
    ],
    depth: 'Working fluency',
  },
]

export const personalSignals: PersonalSignal[] = [
  {
    label: 'Reading orbit',
    title: 'Books become product questions.',
    note: 'Project Hail Mary helped set this observatory in motion; Fuzzy came from wanting a better way to read and study.',
  },
  {
    label: 'Off-duty system',
    title: 'Basketball, boxing, games.',
    note: 'I like systems with visible cause and effect — spacing, timing, feedback, and one more attempt.',
  },
  {
    label: 'Worldbuilding',
    title: 'Astronomy, philosophy, visual design.',
    note: 'The best software has a point of view, but it never asks the interface to hide what the system is doing.',
  },
  {
    label: 'Magical marginalia',
    title: 'A small light for curious visitors.',
    note: 'Some interfaces reward the person who tries the right word. The observatory does too.',
  },
]

export const focusPlaylist = {
  title: 'Deep Focus',
  curator: 'Spotify',
  note: 'A public focus frequency for reading and building. Personal rotation can replace this one ID later.',
  url: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ',
  embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0',
}

export const reviewNotes = {
  spotify:
    'No verified Rushil-owned Spotify playlist was present in the repository, so the capsule uses a clearly labeled Spotify editorial focus playlist.',
  education:
    'The M.S. program at UT Dallas begins in August 2026; the site describes Rushil as an incoming graduate student until that date.',
  releases:
    'Buzzr shipped to TestFlight according to the current resume, but the old public invite URL no longer resolves and is not linked.',
}
