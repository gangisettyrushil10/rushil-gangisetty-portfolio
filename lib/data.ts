export type ProjectMediaKind = 'screenshot' | 'diagram' | 'recording'

export interface ProjectGalleryItem {
  label: string
  alt: string
  caption: string
  src?: string
  kind?: ProjectMediaKind
  width?: number
  height?: number
  fit?: 'cover' | 'contain'
  position?: string
}

export interface ProjectVideo {
  title: string
  caption: string
  url?: string
  src?: string
  poster?: string
  description?: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectStoreLink {
  label: string
  href?: string
  status?: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  longDescription: string
  stack: string[]
  metrics: { label: string; value: string }[]
  role: string
  timeline: string
  status: string
  challenge: string
  decisions: string[]
  outcomes: string[]
  learnings: string[]
  limitations?: string[]
  nextSteps?: string[]
  githubUrl?: string
  liveUrl?: string
  links?: ProjectLink[]
  storeLinks?: ProjectStoreLink[]
  gallery?: ProjectGalleryItem[]
  video?: ProjectVideo
  featured: boolean
  recruiterAngle?: string
  proofLine?: string
  repoName?: string
  previewTitle?: string
  previewNote?: string
  theme?: { primary: string; secondary: string; glow: string }
}

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
  stack?: string[]
}

export interface Education {
  school: string
  degree: string
  period: string
  location: string
  note?: string
}

export interface FocusArea {
  title: string
  description: string
  proof: string
  href: string
}

export interface SkillGroup {
  title: string
  description: string
  items: string[]
}

export const aboutSection = {
  title: 'A personal operating system for useful software.',
  paragraphs: [
    'I studied computer science and mathematics because I like problems that reward both proof and experimentation. Now I am heading into graduate work at UT Dallas with an interest in intelligent systems, machine learning, backend architecture, and products that make complex work feel calmer.',
    'Most of my projects begin with something I actually want: a better reading workspace, a way to judge whether a game is worth watching, or a safer way to retry a financial transaction. That personal friction keeps the product honest while the engineering expands underneath it.',
    'Away from the editor, I am usually reading, following basketball, listening to music, thinking about astronomy or philosophy, or paying too much attention to how a fictional world explains its rules.',
  ],
  personality: ['Books and astronomy', 'Basketball and boxing', 'Music and game design', 'Philosophy and worldbuilding'],
  highlights: [
    { label: 'Based in', value: 'Dallas, Texas', color: '#8ee8db' },
    { label: 'Education', value: 'B.S. Computer Science & Mathematics; incoming M.S. Computer Science at UT Dallas', color: '#a8c7ff' },
    { label: 'Focus', value: 'Applied AI, backend systems, data, fintech, and thoughtful product engineering', color: '#e7b8ff' },
  ],
  portraitSrc: '/media/portrait-rushil.webp',
  portraitAlt: 'Rushil Gangisetty outdoors in a dark jacket',
}

export const projects: Project[] = [
  {
    id: 'fuzzy',
    title: 'Fuzzy',
    category: 'Local-first AI product',
    description:
      'A desktop reading and study workspace that keeps documents local while adding grounded tutoring, durable highlights, review, research, and writing tools.',
    longDescription:
      'Fuzzy is a Mac-first Electron workspace for PDFs, EPUBs, Word documents, Markdown, plain text, and MOBI files. It combines a focused reader with selection-grounded tutor actions, local retrieval, spaced review, study packs, evidence search, research projects, and exports. Documents and study state live in SQLite on the user’s machine; model access is bring-your-own-key with deterministic offline behavior for development and demos.',
    stack: ['Electron 39', 'React 19', 'TypeScript', 'SQLite', 'OpenAI-compatible APIs', 'PDF.js', 'Zustand'],
    metrics: [
      { label: 'Process model', value: 'Main / preload / renderer' },
      { label: 'Document support', value: 'PDF + 5 formats' },
      { label: 'Persistence', value: 'Local SQLite' },
      { label: 'Model access', value: 'BYOK + mock' },
    ],
    role: 'Sole builder — product, desktop UI, persistence, retrieval, and AI workflows',
    timeline: '2026 — active',
    status: 'Active build',
    challenge:
      'Most reading tools are either passive viewers or generic chat wrappers. Fuzzy needed to make assistance specific to a passage, preserve context across long documents, and remain useful when no model is connected.',
    decisions: [
      'Separated filesystem, SQLite, and provider calls into the Electron main process behind a typed allowlisted preload bridge.',
      'Made highlighted text the primary unit of interaction so tutor responses stay grounded in visible source material.',
      'Stored documents, positions, annotations, reviews, research evidence, and study state locally; encrypted provider credentials with operating-system facilities.',
      'Kept deterministic mock behavior as a first-class path so core flows can be tested without network calls or secrets.',
    ],
    outcomes: [
      'Supports an end-to-end loop from import and reading through highlights, spaced review, study packs, research evidence, and export.',
      'Keeps the renderer sandboxed while preserving a rich desktop workflow across multiple document formats.',
      'Provides local retrieval and visible source passages instead of treating generated output as self-authenticating.',
    ],
    learnings: [
      'Applied AI becomes credible when grounding, persistence, and failure states receive as much attention as the prompt.',
      'Desktop products benefit from explicit process boundaries even when they add implementation work.',
    ],
    limitations: [
      'Signed and notarized distribution still requires release-environment validation.',
      'Provider quality varies, and model requests may send selected document text to the configured provider.',
    ],
    nextSteps: ['Finish signed macOS distribution', 'Expand provider reliability tests', 'Continue cross-device reading-memory work'],
    githubUrl: 'https://github.com/gangisettyrushil10/fuzzy',
    links: [{ label: 'Public repository', href: 'https://github.com/gangisettyrushil10/fuzzy' }],
    gallery: [
      {
        label: 'Reader workspace',
        alt: 'Fuzzy desktop reader displaying a sample document with its study workspace',
        caption: 'A genuine local capture of the sample document running in Fuzzy’s Electron app.',
        src: '/media/projects/fuzzy/cover.webp',
        kind: 'screenshot', width: 1440, height: 900, fit: 'cover',
      },
      {
        label: 'Study workflow',
        alt: 'Fuzzy reader with a contextual study workflow open',
        caption: 'The document stays central while reading and tutor tools occupy bounded panels.',
        src: '/media/projects/fuzzy/workflow.webp',
        kind: 'screenshot', width: 1440, height: 900, fit: 'cover',
      },
    ],
    video: {
      title: 'Fuzzy local workflow',
      caption: 'A short capture of the bundled sample document and study interface running locally.',
      src: '/media/projects/fuzzy/demo.mp4',
      poster: '/media/projects/fuzzy/cover.webp',
      description: 'The recording opens a sample document, moves through the reading workspace, and reveals a study control.',
    },
    featured: true,
    proofLine: 'AI grounded in the document, with local state and inspectable boundaries.',
    repoName: 'fuzzy',
    previewTitle: 'A study IDE for serious reading',
    previewNote: 'Local documents, durable reading memory, source-grounded assistance.',
    theme: { primary: '#8ee8db', secondary: '#91b7ff', glow: 'rgba(142, 232, 219, 0.34)' },
  },
  {
    id: 'buzzr',
    title: 'Buzzr',
    category: 'Full-stack sports product',
    description:
      'A sports social product spanning mobile and web, built around live games, entertainment ratings, community activity, and shared watch experiences.',
    longDescription:
      'Buzzr is the broadest product system in this portfolio: an Expo and React Native application backed by Supabase, PostgreSQL, realtime subscriptions, and a companion web experience. The shipped TestFlight beta supported seven league integrations and 18 external testers. The current local codebase has grown well beyond the early portfolio counts, so this case study focuses on stable architecture and product behavior rather than volatile file totals.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Next.js'],
    metrics: [
      { label: 'Beta', value: '18 external testers' },
      { label: 'Sports data', value: '7 league integrations' },
      { label: 'Surfaces', value: 'Mobile + web' },
      { label: 'Data model', value: 'Postgres + realtime' },
    ],
    role: 'Sole builder — product, mobile, web, backend, and operations',
    timeline: 'Oct 2025 — present',
    status: 'Active build',
    challenge:
      'Live scores, social identity, ratings, and community activity need to stay coherent across platforms even when sports data is late, partial, or changing in real time.',
    decisions: [
      'Used Postgres and Supabase to keep authentication, relational modeling, realtime updates, storage, and small server functions close together.',
      'Made an entertainment rating — whether a game was worth watching — the product’s organizing idea instead of duplicating a scoreboard.',
      'Built guest-readable paths so the product can explain its value before demanding an account.',
      'Added operational audits and synchronization tooling as the number of leagues and data sources expanded.',
    ],
    outcomes: [
      'Reached Apple TestFlight with an external beta group and a functioning mobile/web product loop.',
      'Combined live game context, ratings, feeds, community surfaces, and watch-party behavior in one relational system.',
      'Created a long-running product codebase where data contracts and operational tooling evolved with the interface.',
    ],
    learnings: ['Realtime UX is mostly failure-state design.', 'A distinct product opinion is more memorable than feature breadth alone.'],
    limitations: ['The source repositories are not public.', 'The former public TestFlight invitation no longer resolves.'],
    nextSteps: ['Keep the guest value loop legible', 'Continue sports-data reliability work', 'Tighten public release readiness'],
    liveUrl: 'https://buzzr-desktop.vercel.app',
    links: [{ label: 'Public web demo', href: 'https://buzzr-desktop.vercel.app' }],
    gallery: [
      { label: 'Guest game surface', alt: 'Buzzr mobile guest view showing the games experience', caption: 'A genuine mobile capture from the current Buzzr marketing workflow.', src: '/media/projects/buzzr/cover.webp', kind: 'screenshot', width: 1179, height: 1980, fit: 'contain' },
      { label: 'World Cup hub', alt: 'Buzzr mobile World Cup hub', caption: 'Tournament navigation and live-context design on the mobile surface.', src: '/media/projects/buzzr/workflow.webp', kind: 'screenshot', width: 1179, height: 1980, fit: 'contain' },
    ],
    featured: true,
    proofLine: 'Product judgment under the pressure of live data and multiple surfaces.',
    repoName: 'Buzzr',
    previewTitle: 'A social layer for live sports',
    previewNote: 'Ratings, realtime data, and community behavior across mobile and web.',
    theme: { primary: '#91b7ff', secondary: '#8ee8db', glow: 'rgba(145, 183, 255, 0.34)' },
  },
  {
    id: 'credit-union-ledger-api',
    title: 'Credit Union Ledger API',
    category: 'Fintech backend',
    description:
      'A layered ASP.NET Core API for members, accounts, and transactions with idempotent writes, overdraft rules, audit records, and fraud-signal experiments.',
    longDescription:
      'This portfolio and learning project models the core of a credit-union ledger in ASP.NET Core. Thin controllers delegate to services and repositories; FluentValidation protects request contracts; transaction endpoints require idempotency keys; and accepted or rejected operations leave audit evidence. The local repository also explores rule-based fraud signals and a Python Isolation Forest sidecar without presenting either as production banking infrastructure.',
    stack: ['ASP.NET Core', 'C#', 'EF Core', 'SQLite', 'PostgreSQL', 'FluentValidation', 'Serilog', 'Docker', 'xUnit'],
    metrics: [
      { label: 'Safety', value: 'Idempotent writes' },
      { label: 'Domain rule', value: 'No overdrafts' },
      { label: 'Evidence', value: '19 test scenarios' },
      { label: 'Audit', value: 'Accepted + rejected' },
    ],
    role: 'Sole backend builder', timeline: '2026', status: 'Portfolio project',
    challenge:
      'A retry cannot become a second deposit, and an invalid withdrawal cannot quietly corrupt account state. The API needed explicit business rules and inspectable failure paths.',
    decisions: [
      'Required an idempotency key for each deposit or withdrawal and returned the original transaction on replay.',
      'Separated HTTP, business logic, persistence, and domain entities into clear layers.',
      'Used validation and audit records to make rejected actions part of the observable system.',
      'Kept fraud scoring behind an interface so rule-based and experimental model paths remain replaceable.',
    ],
    outcomes: ['Implements member, account, deposit, withdrawal, balance, and history flows.', 'Demonstrates financial-domain correctness concerns without claiming production readiness.', 'Adds .NET and C# backend depth to a portfolio otherwise led by TypeScript and Python.'],
    learnings: ['Idempotency is a product behavior as much as an API technique.', 'Auditability should include rejected decisions.'],
    limitations: ['Writes are not yet wrapped in a production-grade transactional strategy.', 'Authentication, authorization, rate limiting, and concurrency hardening remain future work.'],
    nextSteps: ['Add atomic transaction boundaries', 'Exercise concurrent write cases', 'Harden auth and API versioning'],
    githubUrl: 'https://github.com/gangisettyrushil10/Credit-Union-Ledger-API',
    links: [{ label: 'Public repository', href: 'https://github.com/gangisettyrushil10/Credit-Union-Ledger-API' }],
    featured: true,
    proofLine: 'Correctness, retries, and audit evidence in a financial domain.',
    previewTitle: 'Make duplicate financial requests harmless',
    previewNote: 'Layered .NET architecture with idempotent transaction behavior.',
    theme: { primary: '#e7b8ff', secondary: '#91b7ff', glow: 'rgba(231, 184, 255, 0.3)' },
  },
  {
    id: 'business-analytics-dashboard',
    title: 'Business Analytics Dashboard',
    category: 'Data product',
    description:
      'A FastAPI and React workflow that turns imperfect sales CSVs into validated data, transform previews, forecasts, anomalies, and assisted reports.',
    longDescription:
      'The Business Analytics Dashboard treats data preparation as visible product work. Users upload CSVs, review validation findings, preview transformations, and then move into dashboarding, Prophet forecasts, Isolation Forest anomalies, and optional OpenAI-written insight summaries. The implementation uses JWT authentication and separates these capabilities into backend services instead of placing every calculation in one request handler.',
    stack: ['FastAPI', 'Python', 'React 19', 'TypeScript', 'SQLAlchemy', 'Prophet', 'scikit-learn', 'OpenAI'],
    metrics: [
      { label: 'API surface', value: '14 routes incl. health' },
      { label: 'Forecasts', value: '7 / 30 / 90 days' },
      { label: 'Anomalies', value: 'Isolation Forest' },
      { label: 'Input', value: 'Validation first' },
    ],
    role: 'Full-stack builder', timeline: '2025', status: 'Completed prototype',
    challenge:
      'Forecasts and summaries are only useful if the uploaded rows are understandable. The interface needed to surface bad dates, missing values, and transformations before presenting polished charts.',
    decisions: ['Made validation a primary workflow with readable findings and transform previews.', 'Kept forecasting, anomaly detection, statistics, and model-written insights in distinct backend services.', 'Made OpenAI optional so the deterministic analytics workflow remains useful without a key.'],
    outcomes: ['Connects ingestion, cleanup, exploration, forecasting, anomaly detection, and export in one workflow.', 'Shows product thinking around imperfect input rather than relying on a clean demo dataset.', 'Creates a clear discussion surface for software, data, and applied-ML roles.'],
    learnings: ['A model result is easier to defend when the data path is visible.', 'Validation copy is part of the user interface, not an implementation detail.'],
    limitations: ['The project is a local prototype without a maintained public deployment.', 'Forecast uncertainty depends on the input and should not be presented as guaranteed accuracy.'],
    nextSteps: ['Add broader upload fixtures', 'Improve forecast evaluation', 'Package a reliable demo deployment'],
    githubUrl: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard',
    links: [{ label: 'Public repository', href: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard' }],
    gallery: [{ label: 'Validation workflow', alt: 'Business Analytics Dashboard showing CSV validation findings', caption: 'A local application capture showing the validation-first upload flow.', src: '/media/projects/analytics/cover.webp', kind: 'screenshot', width: 1440, height: 1024, fit: 'contain' }],
    featured: true,
    proofLine: 'Earn trust in the data before asking a model to interpret it.',
    previewTitle: 'Analytics that begins with imperfect input',
    previewNote: 'Validation, transforms, forecasting, anomalies, and assisted reporting.',
    theme: { primary: '#f3c889', secondary: '#e7b8ff', glow: 'rgba(243, 200, 137, 0.28)' },
  },
  {
    id: 'blended', title: 'Blended', category: 'Recommendation experiment',
    description: 'A public Next.js experiment that compares a listener’s Spotify taste with a fictional character, then builds a real blend playlist.',
    longDescription: 'Blended uses Spotify OAuth, real track resolution, explainable similarity math, and an LLM-generated character profile to create a 25-track playlist in the user’s account. Suggestions are resolved to actual Spotify tracks before they influence the score, and unsupported audio-feature APIs are deliberately avoided for new Spotify applications.',
    stack: ['Next.js 16', 'TypeScript', 'Spotify Web API', 'Claude', 'Supabase', 'Zod'],
    metrics: [{ label: 'Playlist', value: '25 tracks' }, { label: 'Score', value: 'Explainable weights' }, { label: 'Session', value: 'Encrypted JWE' }, { label: 'Grounding', value: 'Real Spotify tracks' }],
    role: 'Sole builder', timeline: '2026', status: 'Public source',
    challenge: 'A fictional taste profile is easy to hallucinate. The product needed to ground suggestions in real catalog data and make the resulting match score explainable.',
    decisions: ['Dropped LLM track suggestions that could not be confidently resolved to Spotify IDs.', 'Computed the score from genre overlap, artist overlap, popularity proximity, and era proximity.', 'Kept Spotify tokens in an encrypted cookie session and server-side routes.'],
    outcomes: ['Produces a real playlist instead of a text-only recommendation.', 'Turns model output into inputs for deterministic catalog and similarity steps.'],
    learnings: ['Generative output is more useful after an external system verifies it.', 'Explainability matters even for playful recommendations.'],
    limitations: ['Local use requires Spotify, Anthropic, and Supabase credentials.', 'It is an experiment, not evidence of production usage.'],
    nextSteps: ['Add demo-safe fixtures', 'Test the score with more listening profiles'],
    githubUrl: 'https://github.com/gangisettyrushil10/Blended', links: [{ label: 'Public repository', href: 'https://github.com/gangisettyrushil10/Blended' }],
    featured: false, proofLine: 'A playful recommendation system with catalog grounding and explainable math.', previewTitle: 'Blend real listening with a fictional point of view', previewNote: 'LLM profile, Spotify grounding, deterministic scoring.',
    theme: { primary: '#8ee8db', secondary: '#f3c889', glow: 'rgba(142, 232, 219, 0.28)' },
  },
  {
    id: 'graph-link-prediction', title: 'Graph Link Prediction', category: 'ML study',
    description: 'A two-layer graph convolutional network experiment on the Facebook social graph, paired with an honest account of its evaluation limits.',
    longDescription: 'This academic project explores link prediction with PyTorch Geometric on a bundled Facebook edge list. It trains a two-layer GCN, reports AUC on one split, and visualizes node embeddings with t-SNE. The useful lesson is as much about evaluation design as model code: the current negative sampling and single unseeded split limit what the score can prove.',
    stack: ['Python', 'PyTorch Geometric', 'NetworkX', 'scikit-learn', 'Matplotlib'],
    metrics: [{ label: 'Nodes', value: '4,039' }, { label: 'Edges', value: '88,234' }, { label: 'Model', value: '2-layer GCN' }, { label: 'Evaluation', value: 'Single-split AUC' }],
    role: 'Student ML engineer', timeline: '2025', status: 'Completed study',
    challenge: 'Build a small, reproducible graph-learning experiment and understand where a visually convincing result can still overstate generalization.',
    decisions: ['Used PyTorch Geometric to represent the graph directly.', 'Kept the model small enough to reason about and visualize.', 'Documented sampling and reproducibility limitations instead of presenting AUC as a production claim.'],
    outcomes: ['Implements a complete graph-to-embedding experiment on real network data.', 'Creates a useful technical conversation about leakage, negative sampling, and evaluation.'],
    learnings: ['Sampling design can matter more than another layer.', 'One split is an experiment, not a benchmark.'],
    limitations: ['The run is not seeded.', 'Negative examples are not validated against all existing edges.', 'There is no repeated or temporal evaluation.'],
    nextSteps: ['Use true non-edge sampling', 'Seed and repeat splits', 'Add calibration and baseline comparisons'],
    githubUrl: 'https://github.com/gangisettyrushil10/graph-theory-final-project', links: [{ label: 'Public repository', href: 'https://github.com/gangisettyrushil10/graph-theory-final-project' }],
    gallery: [{ label: 'Experiment summary', alt: 'Graph link prediction training output and embedding visualization', caption: 'An explanatory composite built from the project’s graph data and experiment output.', src: '/projects/graph-link-prediction-portfolio-preview.png', kind: 'diagram', width: 2016, height: 1401, fit: 'contain' }],
    featured: false, proofLine: 'ML depth with the evaluation caveats left visible.', previewTitle: 'Graph learning, including what the score cannot prove', previewNote: 'GCN link prediction and an honest evaluation audit.',
    theme: { primary: '#8ee8db', secondary: '#91b7ff', glow: 'rgba(142, 232, 219, 0.28)' },
  },
  {
    id: 'ibm-medscribe-ai', title: 'IBM Medscribe AI', category: 'Applied AI prototype',
    description: 'A team-built educational prototype that turns synthetic clinical notes into structured, reviewable output with live and credential-free mock modes.',
    longDescription: 'Built for IBM’s AI Experiential Learning Lab, Medscribe combines a React interface with Flask routes and optional IBM watsonx inference. The useful product idea is the review surface: generated fields, suggested actions, and source-aware cues are presented for human inspection rather than as a chat answer. The repository does not support quantitative workflow-impact claims, so this case study stays focused on the implemented prototype.',
    stack: ['React', 'JavaScript', 'Flask', 'Python', 'IBM watsonx'],
    metrics: [{ label: 'Backend', value: '8 routes' }, { label: 'Runtime', value: 'Live + mock' }, { label: 'Data', value: 'Synthetic demo notes' }, { label: 'Context', value: 'IBM AI Lab' }],
    role: 'Full-stack contributor in a team project', timeline: '2025', status: 'Educational prototype',
    challenge: 'Turn unstructured notes into output that a person can inspect and edit, while keeping the demo usable when hosted model credentials are absent.',
    decisions: ['Rendered structured fields instead of a generic chatbot transcript.', 'Separated live and mock modes for a credential-free demonstration.', 'Added source and review cues around generated output.'],
    outcomes: ['Demonstrates structured generation in a review-first workflow.', 'Provides a working recorded presentation of the prototype.'],
    learnings: ['Structure makes generated output easier to inspect.', 'Healthcare-adjacent demos should be explicit about synthetic data and limits.'],
    limitations: ['Not a clinical device and not validated on production health data.', 'The repository lacks tests and deployment automation.'],
    nextSteps: ['Add schema and route tests', 'Repair the direct live-analysis path', 'Strengthen evidence provenance'],
    githubUrl: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI-v2', links: [{ label: 'Public repository', href: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI-v2' }],
    gallery: [{ label: 'Structured review', alt: 'IBM Medscribe structured note review interface', caption: 'The prototype organizes generated content into a reviewable result surface.', src: '/projects/medscribe-output.png', kind: 'screenshot', width: 1440, height: 1400, fit: 'contain' }],
    video: { title: 'IBM SkillBuild presentation', caption: 'Team presentation and working prototype walkthrough.', url: 'https://www.youtube.com/watch?v=nutsuHR1QPI' },
    featured: false, proofLine: 'Structured output and review cues instead of chatbot novelty.', previewTitle: 'A review-first clinical-note prototype', previewNote: 'Synthetic data, structured output, live and mock modes.',
    theme: { primary: '#91b7ff', secondary: '#f3c889', glow: 'rgba(145, 183, 255, 0.28)' },
  },
  {
    id: 'pixeldraw', title: 'PixelDraw', category: 'Native creative tool',
    description: 'An in-progress macOS pixel-by-number product using SwiftUI, Metal, SwiftData, and server-side OpenAI generation.',
    longDescription: 'PixelDraw explores a calm native coloring loop with a Metal canvas, local guest progress, undo/redo, and generation paths based on a photo, mood, song, or daily ritual. OpenAI calls remain in Supabase Edge Functions. It is intentionally presented as an active build because clean runtime, signing, and release verification are still outstanding.',
    stack: ['SwiftUI', 'Metal', 'SwiftData', 'Supabase', 'OpenAI', 'Deno'],
    metrics: [{ label: 'Canvas', value: 'Metal' }, { label: 'Generation', value: '4 input modes' }, { label: 'Offline', value: 'Guest coloring loop' }, { label: 'Target', value: 'macOS 14+' }],
    role: 'Sole builder', timeline: '2026', status: 'In progress',
    challenge: 'Make model-assisted generation feel personal without weakening the quiet, tactile loop that makes coloring satisfying.',
    decisions: ['Built the canvas natively with Metal.', 'Kept the core guest loop local and useful before sign-in.', 'Moved provider credentials and model calls into server-side functions.'],
    outcomes: ['Implements the local coloring and saved-progress foundation.', 'Explores four distinct creative inputs without making AI the only interaction.'],
    learnings: ['The non-AI loop has to be good before generation adds value.', 'Tactile tools make performance visible.'],
    limitations: ['No verified public runtime or current media capture.', 'Signing, notarization, and production configuration are unfinished.'],
    nextSteps: ['Complete clean runtime verification', 'Capture the real canvas workflow', 'Prepare signing and release checks'],
    featured: false, proofLine: 'Native interaction and creative AI, clearly labeled as work in progress.', previewTitle: 'A calmer native coloring experiment', previewNote: 'SwiftUI, Metal, local progress, and server-side generation.',
    theme: { primary: '#f3c889', secondary: '#e7b8ff', glow: 'rgba(243, 200, 137, 0.28)' },
  },
]

export const featuredProjectOrder = ['fuzzy', 'buzzr', 'credit-union-ledger-api', 'business-analytics-dashboard']

export const experiences: Experience[] = [
  {
    company: 'Aeyesafe', role: 'Software Engineer Intern', period: 'Jun 2025 — Aug 2025',
    bullets: ['Tested end-to-end IoT data flow across thermal, radar, and sleep sensors, API ingestion, and storage.', 'Documented connectivity, delayed-packet, and synchronization failures; produced debugging runbooks for engineering triage.'],
    stack: ['IoT', 'APIs', 'Integration testing'],
  },
  {
    company: 'Seam.ai', role: 'Software Engineering Intern', period: 'Aug 2024 — May 2025',
    bullets: ['Built full-stack SaaS features in Next.js with Clerk, Stripe, and Supabase, including protected APIs, organization onboarding, and a Clerk-to-Supabase JWT provisioning bridge.', 'Built Python extraction pipelines with JSON-schema enforcement and a two-stage repair path for malformed model output.', 'Built a Chrome Manifest V3 extension using service workers, webRequest, and Set-based response deduplication.'],
    stack: ['Next.js', 'Supabase', 'Python', 'LLM pipelines', 'Chrome extensions'],
  },
  {
    company: 'Austin College', role: 'Teaching Assistant — Introductory Programming', period: 'Aug 2024 — Dec 2024',
    bullets: ['Designed and administered the final lab project and supported students through office hours and one-on-one debugging.'],
    stack: ['Teaching', 'Programming', 'Curriculum design'],
  },
]

export const education: Education[] = [
  { school: 'University of Texas at Dallas', degree: 'Incoming M.S. in Computer Science', period: 'Aug 2026 — May 2028', location: 'Richardson, Texas', note: 'Program begins August 2026; interests include intelligent systems, machine learning, and agents.' },
  { school: 'Austin College', degree: 'B.S. in Computer Science and Mathematics', period: 'Aug 2021 — May 2025', location: 'Sherman, Texas', note: 'GPA: 3.5 / 4.0' },
]

export const educationHighlights = [
  { title: 'Coursework', items: ['Data Structures & Algorithms', 'Operating Systems', 'Databases', 'Machine Learning', 'Artificial Intelligence'] },
  { title: 'Leadership', items: ['President, Computer Science & Robotics Club'] },
  { title: 'Certification', items: ['Microsoft Certified: Azure Fundamentals'] },
]

export const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Swift', 'C#', 'Java', 'SQL'],
  frameworks: ['React', 'Next.js', 'React Native', 'Electron', 'SwiftUI', 'ASP.NET Core', 'FastAPI', 'Flask'],
  tools: ['Git', 'Docker', 'Postman', 'Linux', 'Figma', 'Chrome DevTools'],
  databases: ['PostgreSQL', 'Supabase', 'SQLite', 'SQL Server'],
  aiMl: ['OpenAI API', 'PyTorch', 'scikit-learn', 'Prophet', 'IBM watsonx', 'LLM workflows'],
  product: ['REST APIs', 'Testing', 'CI/CD', 'ETL workflows', 'JWT auth', 'Stripe', 'Clerk'],
}

export const skillGroups: SkillGroup[] = [
  { title: 'Intelligent products', description: 'Grounded model workflows, retrieval, structured generation, and graph learning.', items: ['OpenAI API', 'PyTorch', 'scikit-learn', 'IBM watsonx', 'LLM workflows'] },
  { title: 'Backend and data systems', description: 'APIs, transactional rules, validation, persistence, and realtime data.', items: ['ASP.NET Core', 'FastAPI', 'Supabase', 'PostgreSQL', 'SQLite', 'REST APIs'] },
  { title: 'Product surfaces', description: 'Web, desktop, mobile, and native Apple interfaces.', items: ['React', 'Next.js', 'Electron', 'React Native', 'SwiftUI', 'Metal'] },
  { title: 'Delivery', description: 'Typed boundaries, tests, packaging, and repeatable builds.', items: ['TypeScript', 'Vitest', 'xUnit', 'Playwright', 'Docker', 'CI/CD'] },
]

export const focusAreas: FocusArea[] = [
  { title: 'Applied AI', description: 'Model behavior shaped into grounded, inspectable product workflows.', proof: 'Fuzzy', href: '/projects/fuzzy' },
  { title: 'Full-stack product systems', description: 'Interfaces, data models, realtime behavior, and operations that evolve together.', proof: 'Buzzr', href: '/projects/buzzr' },
  { title: 'Fintech backend', description: 'Explicit correctness, validation, audit evidence, and safe retries.', proof: 'Ledger API', href: '/projects/credit-union-ledger-api' },
  { title: 'Data workflows', description: 'Validation, transformation, forecasting, anomalies, and clear communication.', proof: 'Analytics Dashboard', href: '/projects/business-analytics-dashboard' },
]

export const recruiterSummary = {
  title: 'I build the interface and the system it depends on.',
  description: 'Software engineer with internship experience across SaaS, LLM data pipelines, Chrome extensions, and IoT integration testing. Current work spans a local-first reading product, a sports social system, a financial ledger API, and analytics workflows.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'Useful systems across applied AI, full-stack products, data, and fintech',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, AI/ML, data, fintech, and intelligent-systems internships',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
  resumePath: '/resume.pdf',
}
