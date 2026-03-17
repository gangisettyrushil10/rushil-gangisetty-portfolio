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
  gallery?: ProjectGalleryItem[]
  video?: ProjectVideo
  featured: boolean
}

export interface ProjectLink {
  label: string
  href: string
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

export const projects: Project[] = [
  {
    id: 'buzzr-ecosystem',
    title: 'Buzzr Ecosystem',
    category: 'Product Software',
    description: 'A sports-social product with a real mobile experience, a launch-ready web surface, and a backend that kept evolving as the product grew.',
    longDescription: 'Buzzr started as a simple idea and turned into a real product system: a mobile app for rating games by entertainment value, plus a web experience that explains and supports the product. What makes it meaningful to me is not just the interface work. It is the combination of product decisions, social features, data modeling, and constant iteration.',
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'PostgreSQL', 'Jest', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Live Leagues', value: '7' },
      { label: 'Source Files', value: '214' },
      { label: 'SQL Migrations', value: '38' },
      { label: 'Test Files', value: '28' },
    ],
    role: 'Product and full-stack engineer',
    timeline: '2024 - Present',
    status: 'Active build',
    challenge: 'Building a cohesive sports-social experience that works seamlessly across mobile and web while handling real-time game data and social interactions at scale.',
    decisions: [
      'Chose Supabase for real-time subscriptions and built-in auth, enabling instant game updates across all connected clients',
      'Implemented a monorepo structure sharing types and validation logic between mobile and web surfaces',
      'Designed a flexible rating system that captures entertainment value beyond simple win/loss metrics',
      'Built comprehensive test coverage with Jest to ensure reliability across 214 source files',
    ],
    outcomes: [
      'Successfully launched 7 live leagues with real-time game tracking',
      'Achieved 38 database migrations without data loss during rapid iteration',
      'Created a polished web marketing surface that converts visitors to app downloads',
    ],
    learnings: [
      'Managing state consistency across mobile and web requires careful API design',
      'Real-time features need robust error handling for network edge cases',
      'Social features drive engagement more than pure utility features',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Buzzr',
    links: [
      { label: 'Mobile repo', href: 'https://github.com/gangisettyrushil10/Buzzr' },
      { label: 'Desktop web repo', href: 'https://github.com/gangisettyrushil10/buzzr_desktop' },
    ],
    gallery: [
      {
        label: 'Home feed',
        alt: 'Buzzr mobile home feed',
        caption: 'The main feed where users discover games, jump into live activity, and rate what they are watching.',
        src: '/projects/buzzr-home.png',
      },
      {
        label: 'Game detail',
        alt: 'Buzzr game detail view',
        caption: 'A closer look at the rating flow and game-level interaction.',
        src: '/projects/buzzr-games.png',
      },
      {
        label: 'Social layer',
        alt: 'Buzzr social and party experience',
        caption: 'The part of the product that made Buzzr feel social instead of just informational.',
        src: '/projects/buzzr-party.png',
      },
    ],
    video: {
      title: 'Product walkthrough',
      caption: 'A short demo that starts in the mobile app and ends on the web surface would be the clearest way to show how the ecosystem fits together.',
    },
    featured: true,
  },
  {
    id: 'ledger-okcu',
    title: 'Ledger OKCU',
    category: 'Business Systems API',
    description: 'A business-focused ASP.NET Core API with validation, idempotency, transaction rules, and a code structure that feels closer to a real system than a tutorial app.',
    longDescription: 'Ledger OKCU is the project I would point to for .NET roles. I built it as a layered API for members, accounts, and transactions with the kinds of constraints that make backend work interesting: validation, repeat-safe requests, auditability, and domain rules that actually matter.',
    stack: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'SQLite', 'FluentValidation', 'Swagger', 'Serilog', 'xUnit'],
    metrics: [
      { label: 'HTTP Endpoints', value: '10' },
      { label: 'C# LOC', value: '3,057' },
      { label: 'Solution Projects', value: '5' },
      { label: 'Core Rules', value: 'Idempotency + Audit' },
    ],
    role: 'ASP.NET Core backend engineer',
    timeline: '2026',
    status: 'Backend case study',
    challenge: 'The project needed to feel like a real business system rather than a toy API. That meant handling money movement, duplicate request protection, validation, auditability, and a codebase structure that could survive more rules over time.',
    decisions: [
      'Split the solution into API, Application, Infrastructure, Core, and Tests projects to keep HTTP, business logic, persistence, and domain concerns separate',
      'Used FluentValidation so request validation stays explicit and consistent before any business logic runs',
      'Implemented idempotency checks and audit logging so transaction endpoints behave defensively under retries and traceability requirements',
      'Used Entity Framework Core with migrations to keep the data model manageable as the API evolves toward production-style databases',
    ],
    outcomes: [
      'Built 10 HTTP endpoints across members, accounts, balances, deposits, withdrawals, and transaction history',
      'Shipped a 3,057-line C# codebase with integration tests, Swagger support, and layered architecture',
      'Created stronger proof for .NET, ASP.NET Core, and business-rule-heavy API work than a tutorial CRUD app would provide',
    ],
    learnings: [
      'Business APIs become much more credible when they enforce invariants like idempotency and no-overdraft rules',
      'Layered .NET solutions are easier to discuss in interviews when services, repositories, and DTO boundaries are deliberate',
      'For backend portfolios, one defensible API with real rules is more useful than several shallow demos',
    ],
    gallery: [
      {
        label: 'Swagger view',
        alt: 'Placeholder for Swagger endpoint overview',
        caption: 'A clean Swagger view would show the shape of the API quickly: members, accounts, and transaction flows.',
      },
      {
        label: 'Domain model',
        alt: 'Placeholder for data model diagram',
        caption: 'A simple entity diagram would help explain how members, accounts, transactions, and audit logs fit together.',
      },
      {
        label: 'Transaction flow',
        alt: 'Placeholder for transaction response and history view',
        caption: 'The most useful screenshot here would show a deposit or withdrawal request and the resulting transaction history.',
      },
    ],
    video: {
      title: 'API walkthrough',
      caption: 'A short demo creating a member, opening an account, and replaying a request to show idempotency would tell the story well.',
    },
    featured: true,
  },
  {
    id: 'medscribe',
    title: 'Medscribe',
    category: 'Applied AI Product',
    description: 'A clinical note assistant that turns messy input into structured summaries, suggestions, and evidence-backed output a user can actually review.',
    longDescription: 'Medscribe is the strongest AI project in the portfolio because it does not stop at the model call. The value is in the workflow: taking a raw note, structuring the output, surfacing recommendations, and showing enough evidence and provenance for the result to feel usable instead of magical.',
    stack: ['React', 'Vite', 'Flask', 'Python', 'IBM watsonx', 'LLM Orchestration'],
    metrics: [
      { label: 'Python Files', value: '9' },
      { label: 'Frontend Files', value: '12' },
      { label: 'Backend LOC', value: '638' },
      { label: 'Frontend LOC', value: '686' },
    ],
    role: 'Full-stack engineer',
    timeline: '2025',
    status: 'Completed',
    challenge: 'Creating an AI system that clinicians can trust, with transparent reasoning and proper citation of medical evidence.',
    decisions: [
      'Implemented structured output parsing to ensure consistent, reliable data formats',
      'Built citation extraction pipeline to link suggestions to medical evidence',
      'Created live vs mock modes for development without burning API credits',
      'Designed provenance tracking to show model confidence and reasoning chains',
    ],
    outcomes: [
      'Built a full-stack clinical workflow prototype around structured note analysis and explainable outputs',
      'Shipped approximately 638 lines of backend Python and 686 lines of frontend React code',
      'Created a stronger portfolio signal than a generic AI demo by wrapping model behavior in a believable product workflow',
    ],
    learnings: [
      'Healthcare AI requires extreme attention to explainability',
      'Structured outputs dramatically improve downstream processing reliability',
      'Clinician trust is earned through transparency, not just accuracy',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI',
    gallery: [
      {
        label: 'Input state',
        alt: 'Placeholder for Medscribe note input',
        caption: 'A strong first screenshot would show the raw note entry state before analysis starts.',
      },
      {
        label: 'Structured result',
        alt: 'Placeholder for Medscribe structured result',
        caption: 'The key screen is the structured output: summary, suggested actions, and a layout that feels trustworthy.',
      },
      {
        label: 'Evidence panel',
        alt: 'Placeholder for Medscribe evidence and provenance',
        caption: 'A screenshot of citations or provenance signals would make the trust story much stronger.',
      },
    ],
    video: {
      title: 'Medscribe demo',
      caption: 'This section is ready for your YouTube walkthrough: note in, structured result out, then a quick pass through recommendations and evidence.',
    },
    featured: true,
  },
  {
    id: 'business-analytics-dashboard',
    title: 'Business Analytics Dashboard',
    category: 'Data Workflows',
    description: 'A full-stack analytics tool built around messy CSVs, validation, forecasting, and the kinds of data problems real teams actually run into.',
    longDescription: 'This project matters because it is not a clean-data dashboard. It is an analytics workflow that deals with uploads, validation, forecasting, anomaly detection, and export. I like it because it shows the side of data work that is usually missing from portfolios: the part where inputs are bad and the system still has to be useful.',
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Prophet', 'scikit-learn'],
    metrics: [
      { label: 'Backend Endpoints', value: '12' },
      { label: 'Lines of Code', value: '5K+' },
      { label: 'Input Quality', value: 'CSV Validation' },
      { label: 'Workflow Focus', value: 'Forecasting' },
    ],
    role: 'Full-stack analytics engineer',
    timeline: '2025',
    status: 'Completed',
    challenge: 'Building an analytics platform that gracefully handles messy, real-world data while providing accurate forecasts and actionable insights.',
    decisions: [
      'Built robust CSV parsing with automatic type inference and error recovery',
      'Implemented multiple forecasting models (Prophet, ARIMA, exponential smoothing) for comparison',
      'Created anomaly detection pipeline using statistical and ML-based approaches',
      'Designed validation layer that cleans data while preserving audit trails',
    ],
    outcomes: [
      'Built a backend around ingestion, validation, forecasting, anomaly detection, and export workflows',
      'Shipped a 5K+ LOC codebase spanning API, frontend, and analytics workflows',
      'Created a better analytics story by centering data quality and explainability instead of only charts',
    ],
    learnings: [
      'Data quality handling is often more complex than the actual analytics',
      'Users need to understand why predictions are made, not just what they are',
      'Multiple model comparison builds user confidence in forecasts',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard',
    gallery: [
      {
        label: 'Upload flow',
        alt: 'Placeholder for dashboard upload view',
        caption: 'The first useful image would show the upload step and how the system handles incoming files.',
      },
      {
        label: 'Validation state',
        alt: 'Placeholder for validation and cleanup state',
        caption: 'A validation or cleanup screen would prove that the product handles bad data rather than hiding it.',
      },
      {
        label: 'Forecast view',
        alt: 'Placeholder for dashboard forecast view',
        caption: 'The final screenshot should show forecast output, anomaly surfacing, and the finished dashboard state.',
      },
    ],
    video: {
      title: 'Data workflow walkthrough',
      caption: 'A good demo would start with a messy file, show the validation step, and end with the cleaned-up analytics view.',
    },
    featured: true,
  },
  {
    id: 'graph-link-prediction',
    title: 'Graph Link Prediction',
    category: 'ML Depth',
    description: 'A graph neural network project that shows I can handle ML problems beyond standard tabular classification.',
    longDescription: 'This is the most technical project in the portfolio. I kept it as supporting work because it adds depth without changing the main story of the site. It shows that I can work with graph structure, model training, and evaluation design when the problem calls for it.',
    stack: ['Python', 'PyTorch Geometric', 'NetworkX', 'NumPy', 'scikit-learn'],
    metrics: [
      { label: 'Nodes', value: '4,039' },
      { label: 'Edges', value: '88,234' },
      { label: 'Training Epochs', value: '100' },
      { label: 'Evaluation', value: 'AUC' },
    ],
    role: 'ML Engineer',
    timeline: '2024',
    status: 'Completed',
    challenge: 'Implementing state-of-the-art graph neural network architectures for link prediction while handling the computational complexity of large social graphs.',
    decisions: [
      'Chose PyTorch Geometric for its efficient sparse tensor operations',
      'Implemented negative sampling strategy for balanced training',
      'Used GraphSAGE architecture for scalable neighborhood aggregation',
      'Built evaluation pipeline with proper train/val/test edge splits',
    ],
    outcomes: [
      'Modeled a Facebook network with 4,039 nodes and 88,234 edges',
      'Ran 100 training epochs to study link prediction behavior under repeated optimization',
      'Created a portfolio example that shows graph ML depth beyond basic tabular classification',
    ],
    learnings: [
      'Graph neural networks require careful attention to message passing design',
      'Negative sampling strategy significantly impacts model performance',
      'Proper edge splitting is crucial for valid evaluation metrics',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/graph-theory-final-project',
    featured: false,
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
    company: 'Seam.ai',
    role: 'Software Engineering Intern',
    period: 'Aug 2024 - May 2025',
    bullets: [
      'Built and supported multi-tenant SaaS workflows across 3 subscription tiers',
      'Scaled platform to support 100+ users per organization',
      'Developed production data/NLP workflows processing 50K+ records/day',
      'Implemented CI/CD pipelines and observability infrastructure',
    ],
    stack: ['Python', 'NLP', 'CI/CD', 'SaaS'],
  },
  {
    company: 'Aeyesafe',
    role: 'Software Engineering Intern',
    period: 'Jun 2025 - Aug 2025',
    bullets: [
      'Validated ETL outputs and API-fed sensor datasets',
      'Performed release testing and anomaly handling for production systems',
      'Built data quality checks and monitoring dashboards',
      'Improved runbooks and support handoff documentation',
    ],
    stack: ['ETL', 'APIs', 'Data Quality', 'Testing'],
  },
  {
    company: 'Austin College',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 - May 2025',
    bullets: [
      'Built reporting and forecasting workflows for 100+ stakeholders',
      'Managed data pipelines processing 1,000+ records',
      'Wrote 58+ unit tests ensuring code reliability',
      'Achieved forecast error within <1% of actuals',
    ],
    stack: ['Python', 'SQL', 'Forecasting', 'Testing'],
  },
]

export const skills = {
  languages: ['TypeScript', 'Python', 'C#', 'SQL', 'Java', 'JavaScript'],
  frontend: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Framer Motion'],
  backend: ['ASP.NET Core', 'FastAPI', 'Flask', 'REST APIs', 'PostgreSQL', 'Supabase'],
  systems: ['Entity Framework Core', 'FluentValidation', 'Swagger', 'xUnit', 'Operational Reporting', 'ETL'],
  data: ['Pandas', 'Forecasting', 'Data Validation', 'scikit-learn', 'PyTorch', 'NumPy'],
  tools: ['Git', 'Docker', 'CI/CD', 'Jest', 'Vite', 'Linux'],
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Product and full-stack work',
    description: 'The broadest read of my portfolio. I enjoy building software that feels polished to use and is still solid underneath.',
    proof: 'Buzzr Ecosystem',
    href: '/projects/buzzr-ecosystem',
  },
  {
    title: 'Backend and .NET systems',
    description: 'The best fit when a team needs API design, business rules, validation, and backend code that can hold up over time.',
    proof: 'Ledger OKCU',
    href: '/projects/ledger-okcu',
  },
  {
    title: 'Data-heavy software',
    description: 'A natural fit for SQL-heavy work, validation pipelines, forecasting, reporting, and systems that deal with messy input.',
    proof: 'Business Analytics Dashboard',
    href: '/projects/business-analytics-dashboard',
  },
  {
    title: 'Applied AI inside products',
    description: 'Strongest when the job is still software engineering, but the product also needs structured AI features and a trustworthy user experience.',
    proof: 'Medscribe',
    href: '/projects/medscribe',
  },
]

export const projectDomains = [
  {
    name: 'Product Software',
    description: 'User-facing applications with strong product judgment and shipping polish',
  },
  {
    name: 'Backend and Business APIs',
    description: 'Validation-heavy services, domain rules, and application-system reliability',
  },
  {
    name: 'Data Workflows',
    description: 'SQL, validation, forecasting, ingestion, and analytics around messy inputs',
  },
  {
    name: 'Applied AI',
    description: 'AI features wrapped in real software workflows and explainable UX',
  },
]

export const recruiterSummary = {
  title: 'Software engineer with backend, data, and business-systems depth.',
  description:
    'I am a software engineer first. Most of my work lives where product, backend, and data overlap: building interfaces people can use, APIs teams can trust, and workflows that still make sense when the inputs get messy.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'who likes building useful products and dependable systems',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, backend, data, and systems roles',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
}
