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
  title: 'About me.',
  paragraphs: [
    'I build product-minded software with strong backend ownership and a bias for clarity. The work I enjoy most lives where interface quality, system design, and messy real-world inputs all need to hold together.',
  ],
  highlights: [
    {
      label: 'Based in',
      value: 'Dallas, Texas',
    },
    {
      label: 'Education',
      value: 'B.S. in Computer Science and Mathematics from Austin College. M.S. in Computer Science at UT Dallas starting Aug 2026.',
    },
    {
      label: 'Focus',
      value: 'Product software, backend workflows, and practical data and AI features',
    },
  ],
  portraitSrc: '/portrait.jpg',
  portraitAlt: 'Portrait of Rushil Gangisetty',
}

export const projects: Project[] = [
  {
    id: 'buzzr',
    title: 'Buzzr',
    category: 'Product Software',
    description:
      'A sports social platform across mobile and web with live league data, ratings, watch parties, and a shared backend.',
    longDescription:
      'Buzzr combines Expo, Next.js, and Supabase in a product system for live sports context, social interaction, and multi-surface delivery.',
    stack: [
      'Expo',
      'React Native',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'Jest',
    ],
    metrics: [
      { label: 'Live leagues', value: '7' },
      { label: 'Platforms', value: 'Mobile + Web' },
      { label: 'SQL migrations', value: '38' },
      { label: 'Test files', value: '28' },
    ],
    role: 'Product engineer across mobile, web, and backend',
    timeline: '2026',
    status: 'Active build',
    challenge:
      'The product needed live data, identity, ratings, and social activity to stay coherent across mobile and web as features expanded.',
    decisions: [
      'Built on Supabase and Postgres to move quickly while keeping auth, realtime updates, and data modeling in one place.',
      'Shared types and validation across mobile and web so product behavior stayed aligned.',
      'Made entertainment-based ratings the core interaction so the product had a distinct point of view.',
    ],
    outcomes: [
      'Supports 7 live leagues with profiles, ratings, following, and watch-party flows.',
      'Shows full-stack ownership across mobile, web, backend, and product decisions.',
      'Represents the strongest product system in my public GitHub work.',
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
      { label: 'App Store', status: 'Planned release' },
      { label: 'Google Play', status: 'Planned release' },
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
      primary: '#43d7ff',
      secondary: '#12b981',
      glow: 'rgba(67, 215, 255, 0.4)',
    },
  },
  {
    id: 'business-analytics-dashboard',
    title: 'Business Analytics Dashboard',
    category: 'Data Workflow Product',
    description:
      'A full-stack analytics workflow for CSV uploads, validation, forecasting, anomaly detection, and AI-assisted reporting on messy business data.',
    longDescription:
      'This project handles ingestion, validation, forecasting, anomaly detection, and export in one workflow built for imperfect business data.',
    stack: [
      'FastAPI',
      'React',
      'TypeScript',
      'PostgreSQL',
      'SQLAlchemy',
      'Prophet',
      'scikit-learn',
      'OpenAI',
      'Docker',
    ],
    metrics: [
      { label: 'Data input', value: 'Messy CSVs' },
      { label: 'Forecast windows', value: '7/30/90d' },
      { label: 'Backend endpoints', value: '12' },
      { label: 'Workflow stages', value: '5' },
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
      'A team-built AI clinical workflow (IBM hackathon) that turns raw notes into structured summaries and suggested actions in a review-friendly interface.',
    longDescription:
      'Built collaboratively during an IBM hackathon, Medscribe AI turns note input into structured clinical output through a review-oriented interface designed for clarity, not novelty. Forked from a shared team repo.',
    stack: ['React', 'JavaScript', 'Flask', 'Python', 'IBM watsonx', 'LLM orchestration', 'CSS'],
    metrics: [
      { label: 'Workflow', value: 'Notes -> Summary' },
      { label: 'Demo modes', value: 'Live + Mock' },
      { label: 'Backend LOC', value: '638' },
      { label: 'Frontend LOC', value: '686' },
    ],
    role: 'Full-stack contributor (team of 4)',
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
      },
    ],
    featured: true,
    recruiterAngle: 'Team hackathon project demonstrating applied AI with structured outputs, trust cues, and thoughtful UX.',
    proofLine: 'Collaborative AI case study shaped around workflow clarity.',
    repoName: 'IBM-Medscribe-AI',
    previewTitle: 'Applied AI workflow',
    previewNote: 'Structured outputs and a review-first interface keep the system legible.',
    theme: {
      primary: '#9d8cff',
      secondary: '#ff6cab',
      glow: 'rgba(157, 140, 255, 0.34)',
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
    featured: true,
    recruiterAngle: 'Adds credible ML depth without crowding the broader software story.',
    proofLine: 'Technical depth piece behind the main product story.',
    repoName: 'graph-theory-final-project',
    previewTitle: 'Graph ML depth',
    previewNote: 'Focused on defensible evaluation, not just model novelty.',
    theme: {
      primary: '#68f7c4',
      secondary: '#43d7ff',
      glow: 'rgba(104, 247, 196, 0.35)',
    },
  },
  {
    id: 'credit-union-ledger-api',
    title: 'Credit Union Ledger API',
    category: 'Backend Systems',
    description:
      'A banking ledger API built with ASP.NET Core for member management, account lifecycle, deposits/withdrawals with idempotency, and transaction history. Source code available on request.',
    longDescription:
      'This project implements a credit union banking ledger as a RESTful API using ASP.NET Core and Entity Framework Core backed by PostgreSQL. It covers member onboarding, account creation and closure, deposit and withdrawal operations with idempotency keys, and paginated transaction history. Validation is handled through FluentValidation, and the API is documented via Swagger. The codebase includes xUnit tests covering core business logic and edge cases. Code is available on request.',
    stack: [
      'ASP.NET Core',
      'C#',
      'Entity Framework Core',
      'PostgreSQL',
      'FluentValidation',
      'Swagger',
      'xUnit',
    ],
    metrics: [
      { label: 'Domain', value: 'Banking ledger' },
      { label: 'Operations', value: 'CRUD + transactions' },
      { label: 'Safety', value: 'Idempotent writes' },
      { label: 'Coverage', value: 'xUnit suite' },
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
  {
    id: 'fake-news-detection',
    title: 'Fake News Detection',
    category: 'ML Experiment',
    description:
      'An NLP classifier using TF-IDF and a Passive Aggressive model to label news articles as fake or real.',
    longDescription:
      'An earlier NLP project that builds and evaluates a straightforward text-classification pipeline from preprocessing through accuracy measurement.',
    stack: ['Python', 'scikit-learn', 'Pandas', 'TF-IDF', 'NLP'],
    metrics: [
      { label: 'Accuracy', value: '92%' },
      { label: 'Pipeline', value: 'TF-IDF + PA' },
      { label: 'Project type', value: 'ML baseline' },
      { label: 'Stage', value: 'Early work' },
    ],
    role: 'ML builder',
    timeline: '2024',
    status: 'Completed',
    challenge:
      'The goal was to build a simple end-to-end ML pipeline that stayed easy to explain.',
    decisions: [
      'Used TF-IDF and a Passive Aggressive classifier to keep the baseline legible and fast.',
      'Framed the project honestly as an early baseline rather than a production claim.',
    ],
    outcomes: [
      'Delivered a clear first text-classification workflow with measurable performance.',
      'Shows early initiative in machine learning and model evaluation.',
    ],
    learnings: [
      'Simple baselines teach the full path from data prep to evaluation.',
      'Honest framing makes early projects more credible.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/fakeNewsDetection.py',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/fakeNewsDetection.py' }],
    featured: false,
    recruiterAngle: 'Shows early machine-learning initiative and comfort with baseline modeling.',
    proofLine: 'Early ML baseline kept for range, not as a lead project.',
    repoName: 'fakeNewsDetection.py',
    previewTitle: 'NLP baseline',
    previewNote: 'A compact end-to-end classifier built as an early ML project.',
    theme: {
      primary: '#ff6cab',
      secondary: '#f5d76e',
      glow: 'rgba(255, 108, 171, 0.28)',
    },
  },
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
    company: 'Aeyesafe',
    role: 'QA Engineering Intern',
    period: 'Jun 2025 - Aug 2025',
    bullets: [
      'Validated ETL outputs and sensor datasets used in production release workflows.',
      'Built data quality checks and monitoring paths that improved release confidence.',
    ],
    stack: ['ETL', 'APIs', 'Data Quality', 'Testing'],
  },
  {
    company: 'Austin College',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 - May 2025',
    bullets: [
      'Built reporting and forecasting software used by more than 100 stakeholders.',
      'Managed data pipelines for 1,000+ records and kept forecast error below 1%.',
    ],
    stack: ['Java', 'SQL', 'Forecasting', 'Testing'],
  },
  {
    company: 'Seam.ai',
    role: 'Software Engineering Intern',
    period: 'Aug 2024 - May 2025',
    bullets: [
      'Built multi-tenant SaaS workflows across subscription tiers and organization-level access patterns.',
      'Developed data and NLP workflows processing 50K+ records per day.',
    ],
    stack: ['Python', 'NLP', 'CI/CD', 'SaaS'],
  },
]

export const education: Education[] = [
  {
    school: 'University of Texas at Dallas',
    degree: 'M.S. in Computer Science',
    period: 'Starting Aug 2026',
    location: 'Richardson, Texas',
    note: 'Incoming graduate study focused on advanced computer science coursework.',
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
    items: ['President, Computer Science Club', 'President, Robotics Club'],
  },
  {
    title: 'Certifications',
    items: ['Microsoft Certified: Azure Fundamentals', 'Full Stack Engineer'],
  },
]

export const skills = {
  languages: ['TypeScript', 'Python', 'SQL', 'C#', 'Java', 'JavaScript'],
  frontend: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Framer Motion'],
  backend: ['FastAPI', 'Flask', 'ASP.NET Core', 'Supabase', 'REST APIs', 'PostgreSQL'],
  systems: ['Entity Framework Core', 'FluentValidation', 'Swagger', 'Jest', 'xUnit', 'CI/CD'],
  data: ['Pandas', 'scikit-learn', 'Forecasting', 'Data Validation', 'PyTorch', 'NumPy'],
  tools: ['Git', 'Docker', 'Linux', 'Vite', 'SQLAlchemy', 'Postman'],
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
    note: 'Product software, data workflows, applied AI, backend systems, and ML depth.',
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
  {
    title: 'Applied AI inside real software',
    description: 'AI features shaped around reviewability, structure, and clear UX.',
    proof: 'IBM Medscribe AI',
    href: '/projects/ibm-medscribe-ai',
  },
  {
    title: 'Technical depth when needed',
    description: 'Enough machine-learning range to go deeper when the problem calls for it.',
    proof: 'Graph Link Prediction',
    href: '/projects/graph-link-prediction',
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
  title: 'Software engineer focused on product quality, dependable systems, and real-world workflows.',
  description:
    'I build product software, backend workflows, and data-intensive tools with an emphasis on clarity, reliability, and practical execution.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'Building polished product software, dependable backend workflows, and thoughtful AI features',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, backend, and product-focused full-stack roles',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
  resumePath: '/resume.pdf',
}
