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
  theme?: {
    primary: string
    secondary: string
    glow: string
  }
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

export interface ProjectGalleryItem {
  label: string
  alt: string
  caption: string
  src?: string
}

export interface ProjectVideo {
  title: string
  caption: string
  url?: string
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

export interface HomeStat {
  value: string
  label: string
  note: string
}

export interface WorkPrinciple {
  title: string
  description: string
}

export interface Education {
  school: string
  degree: string
  period: string
  location: string
  note?: string
}

export const aboutSection = {
  title: 'Why I build.',
  paragraphs: [
    'I started Buzzr because I wanted to know if the game I was about to watch would actually be worth watching. That turned into a cross-platform app on Apple TestFlight with 18 beta testers, 7 live league integrations, and 9 Edge Functions powering real-time watch parties.',
    "Lately that has meant building Fuzzy, a Mac-first study IDE for PDFs with OpenAI-powered workflows, and PixelDraw, an AI pixel-by-number coloring app across Apple platforms. I like products where the surface feels calm even when the backend, local persistence, or model orchestration underneath gets complicated.",
    'I build things I want to exist, then I make them work for other people too. That usually means caring about product feel as much as code quality, handling messy real-world edge cases in the backend, and shipping software that stays understandable to the next person who reads it.',
  ],
  personality: [
    'Sports obsessive (hence Buzzr)',
    'Strong opinions about database indexing',
    'Deep in recommendation systems right now',
    'First "app" was a TI-84 calculator game',
  ],
  highlights: [
    {
      label: 'Based in',
      value: 'Dallas, Texas',
      color: '#7df9ff',
    },
    {
      label: 'Education',
      value: 'B.S. CS & Math, Austin College. M.S. CS at UT Dallas starting Aug 2026.',
      color: '#8bd5ff',
    },
    {
      label: 'Focus',
      value: 'Product software, local-first tools, backend systems, applied AI',
      color: '#6ee7b7',
    },
  ],
  portraitSrc: '/portrait.jpg',
  portraitAlt: 'Portrait of Rushil Gangisetty',
}

export const projects: Project[] = [
  {
    id: 'fuzzy',
    title: 'Fuzzy',
    category: 'Desktop AI Product',
    description:
      'A Mac-first study IDE for PDFs that turns highlighted passages into OpenAI-powered explanations, study packs, reading plans, and notes inside a local-first Electron workspace.',
    longDescription:
      'Built a Mac-first desktop study workspace with Electron 39, React 19, Tailwind v4, and SQLite. Users can import PDFs, highlight passages, run OpenAI-powered tutor actions, save anchored notes, generate reading plans, create study packs with flashcards and quizzes, and keep everything local-first with encrypted BYOK settings. The app uses a three-process Electron architecture, a SQLite persistence layer, 21 main-process IPC modules, and 48 automated tests plus an Electron smoke test to keep the product stable while the UX and AI workflows evolve.',
    stack: ['Electron', 'React 19', 'TypeScript', 'SQLite', 'OpenAI', 'PDF.js', 'Tailwind CSS', 'Zustand'],
    metrics: [
      { label: 'Automated tests', value: '48' },
      { label: 'IPC modules', value: '21' },
      { label: 'Persistence', value: 'SQLite + keychain' },
      { label: 'Core loop', value: 'PDF -> AI tutor' },
    ],
    role: 'Sole builder — product, desktop UI, local persistence, AI workflows',
    timeline: '2026',
    status: 'Active build',
    challenge:
      'Reading tools are usually either passive viewers or generic chat wrappers. The product needed to make studying feel like an IDE: quick selection, structured help, local persistence, and flows that stay useful across long documents.',
    decisions: [
      'Used a three-process Electron architecture so file I/O, SQLite, and model access stay in the main process while the renderer stays sandboxed.',
      'Made the primary interaction selection-first: highlight a passage, call an OpenAI action, then turn the result into durable notes or study material.',
      'Kept the product local-first with SQLite persistence, encrypted BYOK settings, and mock/offline fallbacks for smoke testing and demos.',
      'Built reading plans, study packs, glossary, synthesis, and export workflows around documents instead of bolting chat onto a PDF viewer.',
    ],
    outcomes: [
      'Shipped the core study loop: import a PDF, select text, run tutor actions, save notes, and reopen the same document state later.',
      'Added structured study packs, reading plans, export flows, and supporting AI tools inside one desktop workspace.',
      'Backed the prototype with 48 automated tests, an Electron smoke test, and a persistence model built for iteration instead of one-off demos.',
    ],
    learnings: [
      'Desktop AI products feel credible when local persistence and UX reliability are treated as first-class work, not just wrappers around model calls.',
      'Selection-first interactions are often more useful than open-ended chat because they anchor the AI to a concrete passage.',
      'The hard part of applied AI is shaping the workflow around the model so the result stays legible and trustworthy.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/fuzzy',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/fuzzy' }],
    featured: true,
    recruiterAngle: 'Best proof of desktop product engineering, local-first architecture, and OpenAI workflows shaped into a real study tool.',
    proofLine: 'Turns AI from a demo into a document-centered workflow.',
    repoName: 'fuzzy',
    previewTitle: 'Study IDE for reading',
    previewNote: 'OpenAI-powered tutoring, local SQLite persistence, and PDF-native workflows.',
    theme: {
      primary: '#7df9ff',
      secondary: '#6ee7b7',
      glow: 'rgba(125, 249, 255, 0.35)',
    },
  },
  {
    id: 'buzzr',
    title: 'Buzzr',
    category: 'Product Software',
    description:
      'A cross-platform sports social app shipped to Apple TestFlight with 18 beta testers, 7 live league integrations, 20+ REST endpoints, and real-time watch parties powered by Supabase Edge Functions.',
    longDescription:
      'Built a cross-platform sports social app from scratch with Expo, React Native, Next.js, and Supabase. Supports 7 live league integrations across 20+ REST endpoints, 38 SQL migrations, and 15+ relational tables. Architected real-time watch party and social features using Supabase Edge Functions, Postgres triggers, and live subscriptions. Built 9 Edge Functions, 70+ reusable UI components, and deployed across iOS and Web with CI/CD and production monitoring.',
    stack: [
      'React Native',
      'TypeScript',
      'Supabase',
      'Expo',
      'PostgreSQL',
      'Next.js',
      'Edge Functions',
      'CI/CD',
    ],
    metrics: [
      { label: 'Beta testers', value: '18' },
      { label: 'Live leagues', value: '7' },
      { label: 'REST endpoints', value: '20+' },
      { label: 'SQL migrations', value: '38' },
    ],
    role: 'Sole builder — product, mobile, web, backend',
    timeline: 'Oct 2025 – Present',
    status: 'Active build',
    challenge:
      'The product needed live data, identity, ratings, and social activity to stay coherent across mobile and web as features expanded.',
    decisions: [
      'Built on Supabase and Postgres to move quickly while keeping auth, realtime updates, and data modeling in one place.',
      'Architected real-time features using Edge Functions, Postgres triggers, and live subscriptions.',
      'Shared types and validation across mobile and web so product behavior stayed aligned.',
      'Made entertainment-based ratings the core interaction so the product had a distinct point of view.',
    ],
    outcomes: [
      'Shipped to Apple TestFlight with 18 external beta testers.',
      'Supports 7 live leagues across 20+ REST endpoints, 38 SQL migrations, and 15+ relational tables.',
      'Built 9 Edge Functions, 70+ reusable UI components, deployed across iOS and Web with CI/CD.',
    ],
    learnings: [
      'In multi-surface products, data contracts matter as much as interface polish.',
      'Realtime features only feel good when failure states are handled deliberately.',
      'A clear product concept should show up in every core interaction.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Buzzr',
    liveUrl: 'https://buzzr-desktop.vercel.app',
    links: [
      { label: 'Mobile repo', href: 'https://github.com/gangisettyrushil10/Buzzr' },
      { label: 'Web companion', href: 'https://github.com/gangisettyrushil10/buzzr_desktop' },
      { label: 'Live site', href: 'https://buzzr-desktop.vercel.app' },
    ],
    storeLinks: [
      { label: 'TestFlight', href: 'https://testflight.apple.com/join/buzzr', status: 'Live on TestFlight' },
      { label: 'App Store', status: 'Planned release' },
    ],
    gallery: [
      {
        label: 'Home feed',
        alt: 'Buzzr mobile home feed',
        caption: 'Feed for browsing live games, ratings, and follow activity.',
        src: '/projects/buzzr-home.png',
      },
      {
        label: 'Game detail',
        alt: 'Buzzr game detail view',
        caption: 'Game detail screen combining live context, community ratings, and discussion.',
        src: '/projects/buzzr-games.png',
      },
      {
        label: 'Social layer',
        alt: 'Buzzr watch party and social views',
        caption: 'Watch-party and social views that turn the app into a shared experience.',
        src: '/projects/buzzr-party.png',
      },
    ],
    video: {
      title: 'Product walkthrough',
      caption: 'Walkthrough spanning the live feed, rating flow, and companion web experience.',
    },
    featured: true,
    recruiterAngle: 'Best proof of product judgment, full-stack ownership, and sustained iteration.',
    proofLine: 'Broadest and most current product system in my public work.',
    repoName: 'Buzzr',
    previewTitle: 'Live sports social product',
    previewNote: 'Mobile and web surfaces share one product model and backend.',
    theme: {
      primary: '#7df9ff',
      secondary: '#12b981',
      glow: 'rgba(125, 249, 255, 0.4)',
    },
  },
  {
    id: 'pixeldraw',
    title: 'PixelDraw',
    category: 'Apple-Platform Product',
    description:
      'An in-progress AI pixel-by-number coloring app for iPhone, iPad, and native macOS that can generate pages from a photo, a mood, a song, or a daily ritual.',
    longDescription:
      'Building a SwiftUI multiplatform coloring product with a Metal canvas renderer, SwiftData local persistence, Supabase backend services, and AI generation pipelines. The app already supports guest-mode coloring, undo/redo, palette-first canvas interactions, local progress persistence, and generation flows for photos, mood prompts, songs, and daily ritual pages. The backend is structured around Supabase Auth, Storage, Realtime, and Edge Functions, while the product itself is still actively being shaped into a calmer, more polished creative experience.',
    stack: ['SwiftUI', 'SwiftData', 'Metal', 'Supabase', 'PostgreSQL', 'Deno Edge Functions', 'Replicate', 'TypeScript'],
    metrics: [
      { label: 'Generation modes', value: '4' },
      { label: 'Edge Functions', value: '6' },
      { label: 'Apple surfaces', value: '3' },
      { label: 'Canvas', value: 'Metal' },
    ],
    role: 'Sole builder — product, Apple client, backend, AI generation',
    timeline: '2026',
    status: 'In progress',
    challenge:
      'Coloring apps are usually static libraries. The product needed to make generation feel personal without losing the low-friction, calming feel that makes pixel coloring satisfying in the first place.',
    decisions: [
      'Built the client in native SwiftUI with a Metal canvas so filling cells, zooming, and palette interactions feel tactile on Apple devices.',
      'Separated local guest-mode persistence from the Supabase-backed social and discovery systems so the core coloring loop works even before sign-in.',
      'Designed four generation paths — photo, mood, song, and daily ritual — to make the AI feel like creative input instead of a gimmick.',
      'Kept the backend around small Edge Functions and shared utilities for entitlements, storage, quantization, and image-generation orchestration.',
    ],
    outcomes: [
      'The core canvas, sample content, palette workflow, and local progress persistence already work without any backend setup.',
      'AI generation flows and the Supabase foundation are in place, with discovery, auth, and premium systems still being finished.',
      'Shows range across SwiftUI, rendering, product design, and backend orchestration while still being an active build.',
    ],
    learnings: [
      'Creative AI products need a calm default mode; the non-AI core loop still has to feel good on its own.',
      'Native client performance matters a lot when the interaction is repetitive, tactile, and visual.',
      'Offline-friendly architecture makes it easier to iterate on a product before every backend surface is complete.',
    ],
    featured: true,
    recruiterAngle: 'Strong signal on native Apple UI, rendering, and building a generative product that still prioritizes feel.',
    proofLine: 'Extends the portfolio into SwiftUI, Metal, and AI-assisted creative tooling.',
    repoName: 'PixelDraw',
    previewTitle: 'AI pixel coloring studio',
    previewNote: 'Photo, mood, song, and daily generation flows inside a native Apple client.',
    theme: {
      primary: '#ff8a5b',
      secondary: '#ffd166',
      glow: 'rgba(255, 138, 91, 0.32)',
    },
  },
  {
    id: 'business-analytics-dashboard',
    title: 'Business Analytics Dashboard',
    category: 'Data Workflow Product',
    description:
      'A full-stack analytics platform across 15+ REST endpoints and 7 backend services with JWT auth, CSV ingestion, multi-stage validation, Prophet forecasting with 95% confidence intervals, and AI-generated insights.',
    longDescription:
      'Built a full-stack analytics platform across 15+ REST endpoints and 7 backend services. Features JWT auth, CSV ingestion with a multi-stage validation pipeline, and ETL transformations with live preview. Integrated Prophet for 7/30/90-day time-series forecasting with 95% confidence intervals, scikit-learn Isolation Forest for anomaly detection, and OpenAI API for AI-generated business insights.',
    stack: [
      'FastAPI',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Prophet',
      'scikit-learn',
      'OpenAI',
      'JWT Auth',
    ],
    metrics: [
      { label: 'REST endpoints', value: '15+' },
      { label: 'Backend services', value: '7' },
      { label: 'Forecast confidence', value: '95%' },
      { label: 'Forecast windows', value: '7/30/90d' },
    ],
    role: 'Full-stack engineer',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'The system needed to accept messy uploads, surface validation issues clearly, and still guide users toward forecasts and useful analysis.',
    decisions: [
      'Made validation part of the main workflow instead of hiding it behind upload success states.',
      'Separated forecasting, anomaly detection, and AI insight generation behind clear backend services.',
      'Used AI as an assistive layer on top of the analytics workflow rather than the product itself.',
    ],
    outcomes: [
      'Combines ingestion, validation, forecasting, anomaly detection, and export in one product flow.',
      'Shows backend structure and product thinking around imperfect data.',
      'Provides strong evidence for roles that sit between software, data, and product.',
    ],
    learnings: [
      'Analytics products earn trust by making messy input legible.',
      'Forecasts are easier to defend when the path from raw data to output is visible.',
      'Model features work best when the surrounding workflow stays clear.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard' }],
    gallery: [
      {
        label: 'Validation-first workflow',
        alt: 'Business analytics dashboard validation state',
        caption: 'Validation workflow for cleaning columns, dates, and category issues before forecasting.',
        src: '/projects/dashboard-validation.png',
      },
    ],
    featured: true,
    recruiterAngle: 'Shows backend structure, data workflow thinking, and practical analytics product design.',
    proofLine: 'Strong example of software built around messy real-world data.',
    repoName: 'Business_Analytics_Dashboard',
    previewTitle: 'Analytics workflow for imperfect input',
    previewNote: 'Validation, forecasting, and AI-assisted reporting live in one system.',
    theme: {
      primary: '#ff8a5b',
      secondary: '#facc15',
      glow: 'rgba(255, 138, 91, 0.36)',
    },
  },
  {
    id: 'ibm-medscribe-ai',
    title: 'IBM Medscribe AI',
    category: 'Applied AI Product',
    description:
      'An AI-assisted clinical workflow for IBM\'s AI Experiential Learning Lab that transforms physician notes into structured summaries using IBM watsonx, reducing manual review time by 50%.',
    longDescription:
      'Built an AI-assisted clinical workflow for IBM\'s AI Experiential Learning Lab transforming physician notes into structured summaries using IBM watsonx, reducing manual review time by 50%. Constructed a React review interface with structured output rendering, citation-aware trust cues, and live/mock demo modes across 100+ sample clinical documents.',
    stack: ['React', 'JavaScript', 'Flask', 'Python', 'IBM watsonx', 'LLM pipelines'],
    metrics: [
      { label: 'Review time reduction', value: '50%' },
      { label: 'Sample documents', value: '100+' },
      { label: 'Demo modes', value: 'Live + Mock' },
      { label: 'Context', value: 'IBM AI Lab' },
    ],
    role: 'Full-stack contributor (team project)',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'The workflow needed to turn raw notes into structured output that felt reviewable, understandable, and demo-safe.',
    decisions: [
      'Used structured outputs so downstream fields stayed predictable and easy to review.',
      'Separated live and mock modes so the product remained demoable without external credentials.',
      'Designed the interface around review and editing rather than chatbot-style novelty.',
    ],
    outcomes: [
      'Generates structured summaries, suggested next steps, and supporting context from raw notes.',
      'Shows applied AI with product discipline, trust cues, and clear presentation.',
      'Adds a credible AI case study without overwhelming the broader engineering story.',
    ],
    learnings: [
      'AI output needs visibility before it earns trust.',
      'Structured responses make product behavior easier to reason about.',
      'The best AI features still need strong interaction design.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI' }],
    video: {
      title: 'Workflow demo',
      caption: 'Demo of note input flowing into structured review fields and suggested next steps.',
      url: 'https://www.youtube.com/watch?v=nutsuHR1QPI',
    },
    gallery: [
      {
        label: 'Structured output',
        alt: 'IBM Medscribe structured result view',
        caption: 'Structured result view for reviewing summaries, supporting details, and suggested actions.',
        src: '/projects/medscribe-output.png',
      },
    ],
    featured: false,
    recruiterAngle: 'Team hackathon project demonstrating applied AI with structured outputs, trust cues, and thoughtful UX.',
    proofLine: 'Collaborative AI case study shaped around workflow clarity.',
    repoName: 'IBM-Medscribe-AI',
    previewTitle: 'Applied AI workflow',
    previewNote: 'Structured outputs and a review-first interface keep the system legible.',
    theme: {
      primary: '#60a5fa',
      secondary: '#f59e0b',
      glow: 'rgba(96, 165, 250, 0.34)',
    },
  },
  {
    id: 'graph-link-prediction',
    title: 'Graph Link Prediction',
    category: 'ML Depth',
    description:
      'A graph neural network project for link prediction on the Facebook social graph using PyTorch Geometric and defensible evaluation.',
    longDescription:
      'This project applies graph neural networks to social link prediction and emphasizes careful sampling, evaluation, and technical explanation.',
    stack: ['Python', 'PyTorch Geometric', 'NetworkX', 'NumPy', 'scikit-learn', 'Matplotlib'],
    metrics: [
      { label: 'Nodes', value: '4,039' },
      { label: 'Edges', value: '88,234' },
      { label: 'Epochs', value: '100' },
      { label: 'Evaluation', value: 'AUC' },
    ],
    role: 'ML engineer',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'The hard part was not just the model; it was building a defensible pipeline for sampling, training, and evaluation.',
    decisions: [
      'Used PyTorch Geometric so the implementation matched the graph structure directly.',
      'Focused on negative sampling and evaluation so the results stayed defensible.',
      'Kept the architecture simple enough to explain clearly in technical discussion.',
    ],
    outcomes: [
      'Implements GCN-based link prediction on a real social graph dataset.',
      'Adds technical depth alongside the stronger product and systems projects.',
      'Shows I can move deeper into ML when the problem calls for it.',
    ],
    learnings: [
      'Sampling and evaluation choices can matter more than model complexity.',
      'Technical depth is strongest when it supports a broader engineering story.',
      'Clear explanation is part of good ML work.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/graph-theory-final-project',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/graph-theory-final-project' }],
    gallery: [
      {
        label: 'GCN output',
        alt: 'Graph link prediction model output and dataset visualization',
        caption: 'Generated from the project repo using the Facebook edge list, GCN embeddings, and test AUC evaluation.',
        src: '/projects/graph-link-prediction-portfolio-preview.png',
      },
    ],
    featured: false,
    recruiterAngle: 'Adds credible ML depth without crowding the broader software story.',
    proofLine: 'Technical depth piece behind the main product story.',
    repoName: 'graph-theory-final-project',
    previewTitle: 'Graph ML depth',
    previewNote: 'Focused on defensible evaluation, not just model novelty.',
    theme: {
      primary: '#68f7c4',
      secondary: '#7df9ff',
      glow: 'rgba(104, 247, 196, 0.35)',
    },
  },
  {
    id: 'credit-union-ledger-api',
    title: 'Credit Union Ledger API',
    category: 'Backend Systems',
    description:
      'A layered REST API for member management and financial transactions with dependency injection, repository pattern, idempotent transactions, 100% rollback coverage, and 40+ integration tests.',
    longDescription:
      'Engineered a layered REST API for member management and financial transactions using ASP.NET Core with dependency injection and repository pattern. Enforces idempotent transactions, balance constraints, and full audit logging. Implemented 100% rollback coverage on constraint violations, wrote 40+ integration tests, and Dockerized deployment with environment-specific config for dev, staging, and production.',
    stack: [
      'ASP.NET Core',
      'C#',
      'EF Core',
      'PostgreSQL',
      'FluentValidation',
      'Docker',
      'xUnit',
    ],
    metrics: [
      { label: 'Rollback coverage', value: '100%' },
      { label: 'Integration tests', value: '40+' },
      { label: 'Safety', value: 'Idempotent writes' },
      { label: 'Deployment', value: 'Dockerized' },
    ],
    role: 'Backend engineer',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'A banking ledger demands correctness at every layer — duplicate requests cannot create duplicate transactions, and account state must stay consistent through deposits, withdrawals, and closures.',
    decisions: [
      'Used idempotency keys on deposit and withdrawal endpoints so duplicate requests produce the same result safely.',
      'Modeled account lifecycle explicitly with status transitions instead of soft-delete flags.',
      'Separated validation into FluentValidation rules so business constraints stayed readable and testable.',
      'Kept the API surface documented through Swagger so consumers could integrate without reading source code.',
    ],
    outcomes: [
      'Implements a clean banking domain model with member management, account lifecycle, and transaction history.',
      'Demonstrates backend discipline around correctness, idempotency, and validation in a financial context.',
      'Adds a strong .NET and C# data point alongside the Python and TypeScript work in the rest of the portfolio.',
    ],
    learnings: [
      'Financial APIs earn trust through explicit state transitions and idempotent operations, not just input validation.',
      'Entity Framework Core migrations make schema evolution predictable when the domain model is well-structured.',
      'A clear Swagger contract is as valuable as the implementation behind it.',
    ],
    links: [],
    gallery: [
      {
        label: 'Integration tests',
        alt: 'Credit Union Ledger API passing integration tests',
        caption: 'Passing .NET integration tests covering member, account, and transaction flows while Swagger is being repaired.',
        src: '/projects/ledger-tests.png',
      },
    ],
    featured: true,
    recruiterAngle: 'Shows backend rigor in a financial domain with correctness guarantees, idempotency, and strong .NET fundamentals.',
    proofLine: 'Backend depth piece built around correctness and financial domain modeling.',
    previewTitle: 'Banking ledger API',
    previewNote: 'Idempotent transactions, account lifecycle, and validation in ASP.NET Core.',
    theme: {
      primary: '#4fc3f7',
      secondary: '#ab47bc',
      glow: 'rgba(79, 195, 247, 0.35)',
    },
  },
  {
    id: 'pa-gpa',
    title: 'PA GPA',
    category: 'Internal Tooling',
    description:
      'A GPA tracking and forecasting tool built for Austin College teams that needed dependable reporting instead of spreadsheet-heavy workflows.',
    longDescription:
      'PA GPA is a stakeholder-facing internal tool for reporting and forecasting student performance with more trust and less manual work.',
    stack: ['Java', 'Forecasting', 'Reporting', 'Testing'],
    metrics: [
      { label: 'Stakeholders', value: '100+' },
      { label: 'Forecast error', value: '<1%' },
      { label: 'Unit tests', value: '58+' },
      { label: 'Project type', value: 'Internal app' },
    ],
    role: 'Software engineering intern',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'The tool had to produce numbers non-engineers could trust and a workflow staff could use without friction.',
    decisions: [
      'Focused on reporting clarity and forecasting usefulness rather than feature sprawl.',
      'Backed the workflow with tests so the numbers stayed dependable.',
      'Kept the interface centered on reporting and forecasting instead of generic analytics.',
    ],
    outcomes: [
      'Improved a stakeholder-facing process with clearer reporting and forecasting.',
      'Reduced spreadsheet-heavy work with a dedicated internal workflow.',
      'Adds supporting evidence for practical stakeholder-facing software.',
    ],
    learnings: [
      'A plain internal tool can still be strong portfolio material if it solves a real problem cleanly.',
      'Operational software earns trust through reliability and legibility.',
      'Forecasting features matter more when they fit an existing workflow.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/PA_GPA',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/PA_GPA' }],
    gallery: [
      {
        label: 'Student management UI',
        alt: 'PA GPA student management interface',
        caption: 'JavaFX interface for staff-facing student reporting, table review, and report generation.',
        src: '/projects/pa-gpa-portfolio-preview.png',
      },
    ],
    featured: false,
    recruiterAngle: 'Supporting proof of stakeholder-facing software and forecasting work.',
    proofLine: 'Practical internal tooling with clear operational value.',
    repoName: 'PA_GPA',
    previewTitle: 'Internal reporting tool',
    previewNote: 'Built around reporting clarity, forecasting, and stakeholder trust.',
    theme: {
      primary: '#f5d76e',
      secondary: '#ff8a5b',
      glow: 'rgba(245, 215, 110, 0.3)',
    },
  },
]

export const featuredProjectOrder: string[] = [
  'fuzzy',
  'pixeldraw',
  'buzzr',
  'credit-union-ledger-api',
  'business-analytics-dashboard',
]

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
  stack?: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Seam.ai',
    role: 'Software Engineering Intern',
    period: 'Aug 2024 – May 2025',
    bullets: [
      'Developed full-stack SaaS features in Next.js using Clerk authentication, Stripe payment processing, and Supabase; built protected API routes, an org onboarding flow, and a Clerk-to-Supabase JWT provisioning bridge.',
      'Engineered Python data pipelines using crawl4ai and Llama 3.1 70B via DeepInfra for structured intelligence extraction from web content; implemented chained LLM calls with JSON schema enforcement and a two-stage repair fallback for malformed outputs.',
      'Built a Chrome Manifest V3 extension using service workers and the webRequest API to programmatically generate and replay search requests; implemented O(1) Set-based deduplication across batched API responses.',
    ],
    stack: ['Next.js', 'Clerk', 'Stripe', 'Supabase', 'Python', 'Llama 3.1 70B', 'DeepInfra', 'Chrome Extension'],
  },
  {
    company: 'Aeyesafe',
    role: 'Software Engineer Intern',
    period: 'Jun 2025 – Aug 2025',
    bullets: [
      'Performed hardware-software integration testing for an IoT senior safety platform across thermal, radar, and sleep sensor devices; verified end-to-end data flow from physical device through API ingestion to storage layer.',
      'Documented recurring failure modes across networked device configurations including connectivity drops, delayed packets, and data-sync issues; produced debugging runbooks used by the engineering team for faster triage.',
    ],
    stack: ['IoT', 'APIs', 'Integration Testing', 'Hardware-Software'],
  },
  {
    company: 'Austin College',
    role: 'Teaching Assistant, Introductory Programming',
    period: 'Aug 2024 – Dec 2024',
    bullets: [
      'Designed and administered the final lab project including requirements, rubric, and grading; supported instruction through office hours and one-on-one code debugging sessions.',
    ],
    stack: ['Teaching', 'Programming', 'Curriculum Design'],
  },
]

export const education: Education[] = [
  {
    school: 'University of Texas at Dallas',
    degree: 'M.S. in Computer Science',
    period: 'Aug 2026 – May 2028',
    location: 'Richardson, Texas',
    note: 'GPA: 4.0 / 4.0',
  },
  {
    school: 'Austin College',
    degree: 'B.S. in Computer Science and Mathematics',
    period: 'Aug 2021 - May 2025',
    location: 'Sherman, Texas',
    note: 'GPA: 3.5 / 4.0',
  },
]

export const educationHighlights = [
  {
    title: 'Relevant coursework',
    items: ['Data Structures & Algorithms', 'Operating Systems', 'Databases', 'Machine Learning', 'Artificial Intelligence'],
  },
  {
    title: 'Leadership',
    items: ['President, Computer Science & Robotics Club'],
  },
  {
    title: 'Certifications',
    items: ['Microsoft Certified: Azure Fundamentals', 'Full Stack Engineer'],
  },
]

export const skills = {
  languages: ['Java', 'C#', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
  frameworks: ['ASP.NET Core', 'EF Core', 'React', 'React Native', 'Expo', 'Node.js', 'Next.js', 'Flask', 'FastAPI'],
  tools: ['Git', 'Docker', 'Postman', 'Linux', 'Visual Studio', 'VS Code', 'Figma', 'Chrome DevTools'],
  databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Supabase', 'SQLite'],
  aiMl: ['OpenAI API', 'scikit-learn', 'Prophet', 'IBM watsonx', 'LLM pipelines', 'DeepInfra'],
  product: ['REST APIs', 'MVC Architecture', 'Unit Testing', 'CI/CD', 'ETL Pipelines', 'JWT Auth', 'Stripe', 'Clerk'],
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Product and frontend',
    description: 'Interfaces and flows that feel clear, fast, and finished.',
    items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    title: 'Backend and APIs',
    description: 'APIs and services with clean contracts and room to grow.',
    items: ['FastAPI', 'Flask', 'ASP.NET Core', 'Supabase', 'PostgreSQL', 'SQL'],
  },
  {
    title: 'Data and AI workflows',
    description: 'Validation, forecasting, anomaly detection, and structured AI features.',
    items: ['Pandas', 'scikit-learn', 'PyTorch', 'Forecasting', 'Data Validation', 'LLM workflows'],
  },
  {
    title: 'Delivery and tooling',
    description: 'Testing and tooling that keep code understandable and shippable.',
    items: ['Git', 'Docker', 'CI/CD', 'Jest', 'xUnit', 'Linux'],
  },
]

export const homeStats: HomeStat[] = [
  {
    value: '23',
    label: 'public GitHub repos',
    note: 'Reviewed for signal, then narrowed to a smaller set of highlighted work.',
  },
  {
    value: '5',
    label: 'flagship projects',
    note: 'Product software across mobile, desktop AI, Apple platforms, backend systems, and data workflows.',
  },
  {
    value: '3',
    label: 'software internships',
    note: 'Experience across SaaS, data quality, forecasting, and production support.',
  },
  {
    value: '50K+',
    label: 'records/day handled',
    note: 'From internship pipeline and workflow automation work.',
  },
]

export const workPrinciples: WorkPrinciple[] = [
  {
    title: 'Build products end to end',
    description:
      'I do my best work where interface, backend, and product decisions need to hold together.',
  },
  {
    title: 'Keep systems legible',
    description:
      'I favor systems teammates can understand, extend, and trust quickly.',
  },
  {
    title: 'Handle messy reality',
    description:
      'I like projects that deal directly with imperfect data, changing requirements, and operational edge cases.',
  },
]

export const focusAreas: FocusArea[] = [
  {
    title: 'Product-oriented engineering',
    description: 'Software where user experience matters as much as the implementation behind it.',
    proof: 'Buzzr',
    href: '/projects/buzzr',
  },
  {
    title: 'Desktop AI tooling',
    description: 'Local-first desktop software where AI is shaped into a real workflow instead of a demo.',
    proof: 'Fuzzy',
    href: '/projects/fuzzy',
  },
  {
    title: 'Apple-platform app design',
    description: 'Native product work that blends polish, tactile interactions, and backend orchestration.',
    proof: 'PixelDraw',
    href: '/projects/pixeldraw',
  },
  {
    title: 'Backend and API design',
    description: 'Service architecture with clean contracts, validation, and operational reliability.',
    proof: 'Credit Union Ledger API',
    href: '/projects/credit-union-ledger-api',
  },
  {
    title: 'Data-heavy product work',
    description: 'Workflows with uploads, validation, forecasting, and imperfect input.',
    proof: 'Business Analytics Dashboard',
    href: '/projects/business-analytics-dashboard',
  },
]

export const projectDomains = [
  {
    name: 'Product systems',
    description: 'Software where product clarity, backend structure, and iteration all matter.',
  },
  {
    name: 'Backend and workflows',
    description: 'Validation-heavy services and data flows built for real input.',
  },
  {
    name: 'Applied AI',
    description: 'AI features shaped into trustworthy workflows instead of standalone demos.',
  },
  {
    name: 'Technical depth',
    description: 'Supporting work that adds range without crowding the main portfolio story.',
  },
]

export const recruiterSummary = {
  title: 'I shipped a sports app to TestFlight and built a study IDE for PDFs.',
  description:
    'Full-stack engineer who builds products end-to-end across React, TypeScript, SwiftUI, Electron, and backend systems. Internships at Seam.ai (SaaS, LLM pipelines, Chrome extensions) and Aeyesafe (IoT integration testing). Five flagship projects now span mobile apps, desktop AI tools, backend APIs, analytics workflows, and Apple-platform product design.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'Building polished product software, local-first tools, and thoughtful AI features',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, backend, and product-focused full-stack roles',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
  resumePath: '/resume/rushil-gangisetty-resume.pdf',
}
