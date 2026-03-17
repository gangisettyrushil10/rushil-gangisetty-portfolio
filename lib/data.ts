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
    challenge: 'The hard part was making Buzzr feel fun and social without letting the data model turn messy underneath it. Ratings, identities, parties, game catalogs, and league data all kept changing as the product evolved.',
    decisions: [
      'I used Supabase because real-time updates and auth were built in, which let me move faster on live game features.',
      'I kept shared types and validation logic across the mobile and web surfaces so the product would not drift as it grew.',
      'The rating system focused on entertainment value rather than the final score, because that is the core idea behind the product.',
      'I leaned on Jest because the product changed constantly and I did not want every new feature to break something old.',
    ],
    outcomes: [
      'The product grew to support 7 live leagues with real-time game activity and a real social layer.',
      'I managed 38 SQL migrations while the app kept moving, which was a good test of whether the backend was staying organized.',
      'The web surface gave the product a more polished public face instead of leaving it as just an app repo.',
    ],
    learnings: [
      'Keeping mobile and web in sync is mostly an API and data-model problem, not just a UI problem.',
      'Real-time features are fun to demo, but they only feel good when failure states are handled well.',
      'Social features matter more when the product already has a clear core loop.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Buzzr',
    liveUrl: 'https://buzzr-desktop.vercel.app/',
    links: [
      { label: 'Mobile repo', href: 'https://github.com/gangisettyrushil10/Buzzr' },
      { label: 'Desktop web repo', href: 'https://github.com/gangisettyrushil10/buzzr_desktop' },
    ],
    storeLinks: [
      { label: 'App Store', status: 'Planned release' },
      { label: 'Google Play', status: 'Planned release' },
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
      caption: 'Best demo to add: open the app, browse a game, rate it, then end on the desktop site so the full product story is clear.',
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
    challenge: 'I wanted this to feel like an actual business API, not a tutorial. That meant handling repeat-safe requests, money movement, validation, audit logging, and a codebase structure that could take on more rules later.',
    decisions: [
      'I split the solution into API, Application, Infrastructure, Core, and Tests so each layer had a clear job.',
      'I used FluentValidation to make request rules obvious before any business logic ran.',
      'I added idempotency and audit logging because those are the kinds of details that make backend systems feel real.',
      'I used Entity Framework Core with migrations so the data model could evolve without turning into a mess.',
    ],
    outcomes: [
      'The API covers 10 endpoints across members, accounts, balances, deposits, withdrawals, and transaction history.',
      'It grew into a 3,057-line C# project with Swagger, integration tests, and a layered structure I can actually explain in interviews.',
      'For .NET roles, this is much better proof than a basic CRUD sample.',
    ],
    learnings: [
      'Backend projects get more convincing the moment they enforce real invariants like idempotency and no-overdraft rules.',
      'Layered .NET architecture only helps if the boundaries are intentional rather than ceremonial.',
      'One thoughtful backend project goes farther than a handful of shallow samples.',
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
      caption: 'Best demo to add: create a member, open an account, make a transaction, then replay the request to show idempotency.',
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
    challenge: 'The challenge was not just getting a model response. It was making the result feel trustworthy enough that a clinician could actually review it, understand it, and follow where it came from.',
    decisions: [
      'I used structured outputs because free-form text alone was not good enough for a clinical workflow.',
      'I added citation and provenance hooks so the result felt reviewable instead of opaque.',
      'I kept live and mock modes separate so the product could still be demoed without depending on working credentials every time.',
      'I treated the UX as part of the AI system, not just a shell around it.',
    ],
    outcomes: [
      'The final prototype turns a raw note into a more structured summary with suggested actions and supporting context.',
      'It shipped as a real full-stack build with roughly 638 lines of backend Python and 686 lines of frontend React.',
      'It is stronger than a generic AI demo because the workflow, not just the model, does real work.',
    ],
    learnings: [
      'In healthcare-adjacent products, clarity matters as much as intelligence.',
      'Structured outputs make everything downstream easier to reason about.',
      'Trust comes from showing your work, not just returning a confident answer.',
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
      caption: 'A short walkthrough of the note-in, structured-result-out flow.',
      url: 'https://www.youtube.com/watch?v=nutsuHR1QPI',
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
    challenge: 'I built this around a simple reality: most real data is messy. Uploads fail, columns come in wrong, and people still expect useful output on the other side.',
    decisions: [
      'I treated validation as a first-class feature instead of something hidden behind the dashboard.',
      'I built the upload flow to handle bad input and explain what went wrong instead of silently failing.',
      'I kept forecasting and anomaly work behind clear backend boundaries so the app stayed understandable.',
      'I focused on making the workflow honest and usable rather than just visually impressive.',
    ],
    outcomes: [
      'The app covers ingestion, validation, forecasting, anomaly detection, and export in one workflow.',
      'It turned into a 5K+ LOC full-stack project rather than a thin dashboard on top of a dataset.',
      'The best part of the project is that it handles the ugly parts of analytics, not just the polished final chart.',
    ],
    learnings: [
      'A lot of analytics work is really data quality work in disguise.',
      'Users trust forecasts more when they can see the steps that led there.',
      'A useful analytics product needs good workflow design, not just good charts.',
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
      caption: 'Best demo to add: upload a messy CSV, show the validation pass, then walk into the final dashboard.',
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
    challenge: 'I wanted one machine learning project that went beyond a standard tabular pipeline and made me work with graph structure, training loops, and evaluation choices that actually matter.',
    decisions: [
      'I chose PyTorch Geometric so I could work with graph-native tooling instead of flattening the problem into tabular shortcuts.',
      'I used negative sampling because link prediction needs a thoughtful definition of what counts as a negative example.',
      'I kept the model architecture understandable so I could defend the choices in an interview.',
      'I spent time on the evaluation setup because that is where a lot of ML projects get hand-wavy.',
    ],
    outcomes: [
      'The model was trained on a Facebook graph with 4,039 nodes and 88,234 edges.',
      'I ran 100 epochs and used the project mainly as a way to build graph-ML intuition I could explain clearly.',
      'It adds technical depth to the portfolio without taking over the main story of the site.',
    ],
    learnings: [
      'Graph problems force you to think differently about representation, sampling, and evaluation.',
      'Small design choices in the data pipeline can matter a lot more than they seem at first.',
      'A simpler ML project with a clean explanation is usually stronger portfolio material than a flashy one I cannot defend.',
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
    'I am a software engineer first. Most of my work sits where product, backend, and data meet: building things people can actually use, APIs that hold up, and workflows that still make sense once real data gets involved.',
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
