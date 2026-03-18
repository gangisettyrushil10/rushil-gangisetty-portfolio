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
    description: 'A sports-social product built across mobile and web, with live leagues, social features, and a backend that had to stay organized as the product matured.',
    longDescription: 'Buzzr is probably the clearest picture of how I like to work. It started with a simple product idea, then grew into a mobile app plus a web presence that made the product easier to understand, share, and keep improving without the backend turning chaotic.',
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'PostgreSQL', 'Jest', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Live Leagues', value: '7' },
      { label: 'Source Files', value: '214' },
      { label: 'SQL Migrations', value: '38' },
      { label: 'Test Files', value: '28' },
    ],
    role: 'Product engineer across mobile, web, and data model',
    timeline: '2024 - Present',
    status: 'Active build',
    challenge: 'Buzzr had to feel playful and social on the surface while still staying sane underneath. Ratings, identities, parties, game catalogs, and league data all kept changing as the product matured, so the real work was keeping the experience flexible without letting the model turn brittle.',
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
    description: 'A layered ASP.NET Core API for members, accounts, and transactions, built around the kind of business rules that make backend work interesting.',
    longDescription: 'Ledger OKCU is the .NET project I would open first with a hiring manager. It is a layered API for members, accounts, and transactions, built with validation, repeat-safe requests, auditability, and domain rules that make it feel much closer to a real system than a tutorial app.',
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
    description: 'An AI-assisted clinical workflow that turns raw notes into structured summaries, suggested orders, and evidence a user can actually review.',
    longDescription: 'Medscribe is the strongest AI project in the portfolio because the interesting part is not just calling a model. The interesting part is shaping the workflow around it: turning a raw note into a structured result, surfacing recommendations, and making the output feel reviewable instead of opaque.',
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
    challenge: 'Getting a model response was the easy part. The real challenge was making the output trustworthy enough that someone could review it, understand it, and follow where it came from without feeling like the system was bluffing.',
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
    description: 'A full-stack analytics workflow for messy uploads, validation, forecasting, and the parts of data work most demos skip.',
    longDescription: 'This project matters to me because it is not a clean-data dashboard. It deals with uploads, validation, forecasting, anomaly detection, and export. In other words, it covers the side of analytics work that usually gets hidden once the chart looks pretty.',
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
    challenge: 'I built this around a simple reality: most real data is messy. Uploads fail, columns arrive wrong, and people still expect useful output on the other side.',
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
    description: 'A graph neural network project that adds technical depth without changing the fact that this is still a software-engineering-first portfolio.',
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
    description: 'A strong fit for product-minded software work where the experience matters just as much as the implementation underneath it.',
    proof: 'Buzzr Ecosystem',
    href: '/projects/buzzr-ecosystem',
  },
  {
    title: 'Backend and .NET systems',
    description: 'A strong fit for backend teams that care about APIs, validation, business rules, and code that stays readable as the system grows.',
    proof: 'Ledger OKCU',
    href: '/projects/ledger-okcu',
  },
  {
    title: 'Data-heavy software',
    description: 'A strong fit for SQL-heavy, reporting-heavy, or forecasting-heavy work where the input is messy and the workflow still has to make sense.',
    proof: 'Business Analytics Dashboard',
    href: '/projects/business-analytics-dashboard',
  },
  {
    title: 'Applied AI inside products',
    description: 'A strong fit when the product needs AI, but the real challenge is still workflow design, trust, and making the feature useful to a real user.',
    proof: 'Medscribe',
    href: '/projects/medscribe',
  },
]

export const projectDomains = [
  {
    name: 'Product Software',
    description: 'User-facing software where product judgment and implementation quality both matter',
  },
  {
    name: 'Backend and Business APIs',
    description: 'Validation-heavy services, domain rules, and backend systems that need to hold up',
  },
  {
    name: 'Data Workflows',
    description: 'SQL, validation, forecasting, ingestion, and analytics around imperfect input',
  },
  {
    name: 'Applied AI',
    description: 'AI features wrapped in real workflows, with clear outputs and trustworthy UX',
  },
]

export const recruiterSummary = {
  title: 'Software engineer with product sense, backend depth, and strong data workflow experience.',
  description:
    'I like building software that feels considered on the surface and solid underneath. Most of my work ends up where product, backend, and data meet: user-facing software, APIs with real business logic, and workflows that still hold up once real users and real data get involved.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'building product software, backend APIs, and data-heavy tools',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, backend, data, and business systems roles',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
}
