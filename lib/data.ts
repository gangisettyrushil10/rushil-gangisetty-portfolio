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

export const projects: Project[] = [
  {
    id: 'buzzr',
    title: 'Buzzr',
    category: 'Product Software',
    description:
      'A sports-focused social product across mobile and web with live leagues, entertainment-based ratings, watch parties, and a shared backend model.',
    longDescription:
      'Buzzr is the strongest example of my product and full-stack work. It combines an Expo mobile app, a public web presence, shared types, live data, and social features in a system where product decisions and architecture both matter.',
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
      { label: 'SQL migrations', value: '38' },
      { label: 'Test files', value: '28' },
      { label: 'Surfaces', value: 'Mobile + Web' },
    ],
    role: 'Product engineer across mobile, web, and backend',
    timeline: '2026',
    status: 'Active build',
    challenge:
      'A social sports product only works when live data, identity, ratings, and activity feeds remain coherent while the product continues to evolve. The core challenge was preserving flexibility without compromising the underlying model.',
    decisions: [
      'Used Supabase for authentication, realtime primitives, and Postgres so the team could move quickly without overbuilding infrastructure early.',
      'Maintained shared types and validation logic across mobile and web to keep the experience and data model aligned.',
      'Centered the rating model on entertainment value rather than final score, which gave the product a clear point of view.',
    ],
    outcomes: [
      'Supports 7 live leagues with authentication, profiles, ratings, following, and watch-party workflows.',
      'Demonstrates product judgment, full-stack coordination, and sustained iteration across a growing codebase.',
      'Represents the most complete product system in my public portfolio.',
    ],
    learnings: [
      'In multi-surface products, the hardest problems usually live in the data model and API contracts rather than the screens themselves.',
      'Realtime features only feel polished when failure states are predictable and reliable.',
      'A clear product concept becomes stronger when the interaction model reinforces it consistently.',
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
        caption: 'The strongest first impression is the live feed: discover games, rate them, and move through the product quickly.',
        src: '/projects/buzzr-home.png',
      },
      {
        label: 'Game detail',
        alt: 'Buzzr game detail view',
        caption: 'The game detail flow shows where live context, ratings, and community interactions come together.',
        src: '/projects/buzzr-games.png',
      },
      {
        label: 'Social layer',
        alt: 'Buzzr watch party and social views',
        caption: 'The social layer is what moves Buzzr from scoreboard utility to actual product.',
        src: '/projects/buzzr-party.png',
      },
    ],
    video: {
      title: 'Product walkthrough',
      caption: 'A concise walkthrough would move from the mobile feed to ratings and then to the web experience to show the full product ecosystem.',
    },
    featured: true,
    recruiterAngle: 'Strongest evidence of product judgment, full-stack execution, and shipping momentum.',
    proofLine: 'Selected because it is the broadest and most current product system in my public GitHub work.',
    repoName: 'Buzzr',
    previewTitle: 'A sports product with a clear product point of view',
    previewNote: 'Live data, social activity, and a coherent product model make this the strongest flagship project in the portfolio.',
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
      'A full-stack analytics workflow for CSV uploads, validation, forecasting, anomaly detection, and AI-assisted insights.',
    longDescription:
      'This project is valuable because it is built around imperfect data rather than idealized input. It handles uploads, transformations, validation, forecasting, anomaly detection, authentication, and export, making it much closer to real analytics software than a dashboard layered on top of a tidy dataset.',
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
      { label: 'Backend endpoints', value: '12' },
      { label: 'Codebase size', value: '5K+' },
      { label: 'Forecast windows', value: '7/30/90d' },
      { label: 'Workflow focus', value: 'Messy CSVs' },
    ],
    role: 'Full-stack engineer',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'Many dashboards assume the data has already been cleaned. The challenge here was handling missing values, inconsistent dates, duplicates, and invalid categories while still guiding users toward useful output.',
    decisions: [
      'Made validation a first-class product feature rather than hiding it behind the upload flow.',
      'Kept forecasting, anomaly detection, and insight generation behind clear backend boundaries so the system remained explainable.',
      'Used AI-generated insights as a layer on top of the workflow rather than as a substitute for it.',
    ],
    outcomes: [
      'Combines ingestion, validation, forecasting, anomaly detection, and export in a single product flow.',
      'Shows a more realistic view of analytics software than a chart-first demo.',
      'Provides strong public GitHub evidence for roles where backend, product, and data intersect.',
    ],
    learnings: [
      'A significant share of analytics work is really about making imperfect input understandable.',
      'Forecasts are easier to trust when the path from raw data to output is visible.',
      'Clear boundaries between product logic and model logic make systems easier to explain and extend.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard' }],
    gallery: [
      {
        label: 'Validation-first workflow',
        alt: 'Business analytics dashboard validation state',
        caption: 'The strongest visual is the validation workflow, because it shows the system handling imperfect uploads before moving to charts and forecasts.',
      },
    ],
    featured: true,
    recruiterAngle: 'Strong evidence that I can build data-intensive software with attention to workflow quality and backend structure.',
    proofLine: 'Selected because it combines backend APIs, product design, data quality work, and model-driven features in one system.',
    repoName: 'Business_Analytics_Dashboard',
    previewTitle: 'Analytics software built for real-world input',
    previewNote: 'Validation, forecasting, anomaly detection, and AI insights operate inside one coherent workflow.',
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
      'An AI-assisted clinical workflow that turns raw notes into structured summaries and suggested actions in a review-friendly interface.',
    longDescription:
      'The value of this project lies in workflow design rather than simple model invocation. It uses structured outputs, clear presentation, demo-safe modes, and a review-oriented interface so the result feels inspectable rather than opaque.',
    stack: ['React', 'JavaScript', 'Flask', 'Python', 'IBM watsonx', 'LLM orchestration', 'CSS'],
    metrics: [
      { label: 'Backend files', value: '9' },
      { label: 'Frontend files', value: '12' },
      { label: 'Backend LOC', value: '638' },
      { label: 'Frontend LOC', value: '686' },
    ],
    role: 'Full-stack engineer',
    timeline: '2025',
    status: 'Completed',
    challenge:
      'Healthcare-adjacent workflows require a high standard of clarity. A visually impressive AI demo is not enough if users cannot understand what the system produced or why it should be trusted.',
    decisions: [
      'Used structured outputs because free-form responses were not sufficient for the workflow.',
      'Separated live and mock modes so the product remained demoable even when credentials were unavailable.',
      'Treated the frontend as part of the AI system by organizing results around reviewability rather than novelty.',
    ],
    outcomes: [
      'Transforms raw notes into structured summaries with suggested next steps and supporting context.',
      'Demonstrates attention to trust, workflow design, and presentation in addition to model integration.',
      'Adds a meaningful applied-AI case study without overwhelming the broader software engineering story.',
    ],
    learnings: [
      'In AI products, confidence without visibility creates risk.',
      'Structured outputs make downstream systems easier to reason about.',
      'The strongest AI features still need to function as well-designed software.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI' }],
    video: {
      title: 'Workflow demo',
      caption: 'The strongest demonstration is a clear note-in, structured-result-out workflow that shows why the output is reviewable.',
      url: 'https://www.youtube.com/watch?v=nutsuHR1QPI',
    },
    gallery: [
      {
        label: 'Structured output',
        alt: 'IBM Medscribe structured result view',
        caption: 'The structured result view is the most important screenshot because it communicates the trust model immediately.',
      },
    ],
    featured: true,
    recruiterAngle: 'Strong evidence that I can build AI features with product discipline rather than a thin chatbot layer.',
    proofLine: 'Selected because it demonstrates applied AI, backend orchestration, and thoughtful UX in one project.',
    repoName: 'IBM-Medscribe-AI',
    previewTitle: 'AI structured into a trustworthy workflow',
    previewNote: 'The value is not the model call itself, but the quality and clarity of the resulting workflow.',
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
      'A graph neural network project for link prediction on the Facebook social graph using PyTorch Geometric.',
    longDescription:
      'This project provides technical depth in the portfolio. It supports the broader software-engineering story while showing that I can work on lower-level machine learning problems when the problem warrants it.',
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
      'Link prediction is not only a model problem. It depends on how training and test edges are constructed, how negatives are defined, and how evaluation is handled.',
    decisions: [
      'Used PyTorch Geometric so the implementation matched the graph structure of the problem.',
      'Focused on negative sampling and evaluation because those decisions often determine whether graph-ML work is credible.',
      'Kept the model architecture simple enough to explain clearly in technical discussion.',
    ],
    outcomes: [
      'Implements a GCN-based workflow over a real social graph dataset rather than a toy tabular example.',
      'Adds credible technical depth without distracting from the stronger product and systems work.',
      'Supports teams looking for engineering breadth with the ability to go deeper when necessary.',
    ],
    learnings: [
      'Representation, sampling, and evaluation choices can matter more than model sophistication.',
      'Technical depth is most effective when it supports the broader narrative of the portfolio.',
      'Clear explanations are more valuable than unnecessary complexity when presenting work.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/graph-theory-final-project',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/graph-theory-final-project' }],
    featured: true,
    recruiterAngle: 'Adds meaningful technical depth and shows I can move beyond product software when the problem requires it.',
    proofLine: 'Selected because it adds technical range without distracting from the main portfolio narrative.',
    repoName: 'graph-theory-final-project',
    previewTitle: 'A graph ML project with a defensible technical story',
    previewNote: 'Included as a depth piece behind the stronger product and systems work.',
    theme: {
      primary: '#68f7c4',
      secondary: '#43d7ff',
      glow: 'rgba(104, 247, 196, 0.35)',
    },
  },
  {
    id: 'pa-gpa',
    title: 'PA GPA',
    category: 'Internal Tooling',
    description:
      'A GPA tracking and forecasting tool built for Austin College stakeholders who needed dependable reporting instead of spreadsheets.',
    longDescription:
      'PA GPA is a useful example of stakeholder-facing software. Its value lies in clearer reporting and forecasting for an operational workflow that needed more trust and less manual effort.',
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
      'Operational tools are only effective when non-engineers trust the numbers and the workflow fits their day-to-day needs.',
    decisions: [
      'Focused on reporting clarity and forecasting usefulness rather than decoration.',
      'Backed the workflow with tests so the numbers stayed dependable.',
    ],
    outcomes: [
      'Improved a stakeholder-facing process with clearer reporting and forecasting.',
      'Provides supporting evidence that I can build practical software for real operational use.',
    ],
    learnings: [
      'A plain internal tool can still be strong portfolio material if it solves a real problem cleanly.',
      'Trust in operational software is often earned through reliability and legibility.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/PA_GPA',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/PA_GPA' }],
    featured: false,
    recruiterAngle: 'Useful supporting evidence for stakeholder-facing software and forecasting work.',
    proofLine: 'Included as supporting GitHub work because it is practical, relevant, and professionally useful.',
    repoName: 'PA_GPA',
    previewTitle: 'An internal tool designed for clarity and reliability',
    previewNote: 'Shows experience with reporting, forecasting, and software built around stakeholder needs.',
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
      'An early NLP classifier using TF-IDF and a Passive Aggressive model to classify news as fake or real.',
    longDescription:
      'This is an earlier machine-learning project on my GitHub and serves as a compact example of building and evaluating a straightforward text-classification pipeline.',
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
      'The goal was to build a clean first machine-learning pipeline that could be explained end to end.',
    decisions: [
      'Used a straightforward classical ML approach so the result stayed legible.',
      'Framed the project as a baseline, not as a sweeping claim about misinformation detection.',
    ],
    outcomes: [
      'Shows early initiative in machine learning and text classification.',
      'Useful as supporting context, though not a flagship project.',
    ],
    learnings: [
      'Simple baselines are worth building because they teach the full path from data prep to evaluation.',
      'Early projects are strongest when they are presented honestly.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/fakeNewsDetection.py',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/fakeNewsDetection.py' }],
    featured: false,
    recruiterAngle: 'Shows early machine-learning interest and a willingness to build the fundamentals.',
    proofLine: 'Included as supporting GitHub work rather than flagship work.',
    repoName: 'fakeNewsDetection.py',
    previewTitle: 'A straightforward machine-learning baseline',
    previewNote: 'Included for range, though it is no longer central to the portfolio story.',
    theme: {
      primary: '#ff6cab',
      secondary: '#f5d76e',
      glow: 'rgba(255, 108, 171, 0.28)',
    },
  },
  {
    id: 'linkedin-high-school-scraper',
    title: 'LinkedIn High School Scraper',
    category: 'Automation Utility',
    description:
      'A CSV-in, CSV-out automation script that extracts high school information from a batch of LinkedIn profiles.',
    longDescription:
      'This smaller utility project is a practical example of automation. It processes a batch of LinkedIn URLs, extracts the relevant field, and returns a cleaner CSV for the next workflow step.',
    stack: ['Python', 'CSV workflows', 'HTML parsing', 'Automation'],
    metrics: [
      { label: 'Input/output', value: 'CSV -> CSV' },
      { label: 'Workflow', value: 'Batch scrape' },
      { label: 'Project type', value: 'Utility' },
      { label: 'Stage', value: 'Supporting' },
    ],
    role: 'Automation builder',
    timeline: '2024',
    status: 'Completed',
    challenge:
      'Even small automation utilities need clear input, output, and operational value.',
    decisions: [
      'Kept the contract simple: batch URLs in, extracted data out.',
      'Framed the project as a utility rather than overselling it as a platform.',
    ],
    outcomes: [
      'Shows practical automation instincts and comfort with batch-processing workflows.',
      'Provides supporting GitHub context without taking attention away from the stronger portfolio projects.',
    ],
    learnings: [
      'Small utilities are best when they solve one workflow pain point cleanly.',
      'A portfolio benefits from showing both ambitious builds and practical scripts.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/linkedin_high_school_scraper.py',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/linkedin_high_school_scraper.py' }],
    featured: false,
    recruiterAngle: 'Useful supporting proof of scripting and workflow automation.',
    proofLine: 'Included as supporting GitHub work for breadth rather than as a lead project.',
    repoName: 'linkedin_high_school_scraper.py',
    previewTitle: 'A practical automation script for a repetitive workflow',
    previewNote: 'Smaller than the flagship projects, but still useful evidence of hands-on automation.',
    theme: {
      primary: '#43d7ff',
      secondary: '#ff6cab',
      glow: 'rgba(67, 215, 255, 0.25)',
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
    role: 'Software Engineering Intern',
    period: 'Jun 2025 - Aug 2025',
    bullets: [
      'Validated ETL outputs and API-fed sensor datasets for production release workflows.',
      'Built data quality checks, monitoring dashboards, and anomaly-handling paths for production support.',
      'Improved release confidence with clearer runbooks and better support handoff documentation.',
    ],
    stack: ['ETL', 'APIs', 'Data Quality', 'Testing'],
  },
  {
    company: 'Austin College',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 - May 2025',
    bullets: [
      'Built reporting and forecasting software used by 100+ stakeholders.',
      'Managed data pipelines processing 1,000+ records and kept forecast error under 1% of actuals.',
      'Wrote 58+ unit tests to keep the workflow dependable as requirements changed.',
    ],
    stack: ['Python', 'SQL', 'Forecasting', 'Testing'],
  },
  {
    company: 'Seam.ai',
    role: 'Software Engineering Intern',
    period: 'Aug 2024 - May 2025',
    bullets: [
      'Built multi-tenant SaaS workflows across subscription tiers and organization-level access patterns.',
      'Developed production data and NLP workflows processing 50K+ records per day.',
      'Contributed CI/CD and observability improvements so the team could ship with more confidence.',
    ],
    stack: ['Python', 'NLP', 'CI/CD', 'SaaS'],
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
    description: 'Interfaces that feel polished, fast, and intentional instead of merely present.',
    items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    title: 'Backend and APIs',
    description: 'Services with clean contracts, sensible boundaries, and enough structure to keep growing.',
    items: ['FastAPI', 'Flask', 'ASP.NET Core', 'Supabase', 'PostgreSQL', 'SQL'],
  },
  {
    title: 'Data and AI workflows',
    description: 'Forecasting, validation, anomaly detection, and AI features that sit inside real software.',
    items: ['Pandas', 'scikit-learn', 'PyTorch', 'Forecasting', 'Data Validation', 'LLM workflows'],
  },
  {
    title: 'Delivery and tooling',
    description: 'The practical tools that help code stay understandable and shippable.',
    items: ['Git', 'Docker', 'CI/CD', 'Jest', 'xUnit', 'Linux'],
  },
]

export const homeStats: HomeStat[] = [
  {
    value: '23',
    label: 'public GitHub repos',
    note: 'Reviewed and curated to highlight the work that best represents my current level.',
  },
  {
    value: '4',
    label: 'flagship projects',
    note: 'Focused across product software, data workflows, applied AI, and technical depth.',
  },
  {
    value: '3',
    label: 'software internships',
    note: 'Experience across SaaS, data quality, forecasting, and production support.',
  },
  {
    value: '50K+',
    label: 'records/day handled',
    note: 'From internship workflow automation and production data pipeline work.',
  },
]

export const workPrinciples: WorkPrinciple[] = [
  {
    title: 'Build complete product experiences',
    description:
      'I am strongest in work where the interface, backend, and product requirements all need to hold together. That is why Buzzr and the analytics dashboard lead this portfolio.',
  },
  {
    title: 'Keep systems clear and explainable',
    description:
      'Whether the work is an API, a forecasting workflow, or an AI feature, I aim for structures that teammates can extend and hiring teams can understand quickly.',
  },
  {
    title: 'Handle operational complexity directly',
    description:
      'A meaningful share of engineering work lives in imperfect data, changing requirements, and difficult edge cases. I prefer to address those constraints directly.',
  },
]

export const focusAreas: FocusArea[] = [
  {
    title: 'Product-oriented engineering',
    description: 'Strong fit for software where user experience matters as much as the implementation behind it.',
    proof: 'Buzzr',
    href: '/projects/buzzr',
  },
  {
    title: 'Data-heavy product work',
    description: 'Strong fit for workflows with uploads, validation, forecasting, and imperfect input.',
    proof: 'Business Analytics Dashboard',
    href: '/projects/business-analytics-dashboard',
  },
  {
    title: 'Applied AI inside real software',
    description: 'Best when AI needs reviewability, structure, and clear UX instead of a thin chatbot shell.',
    proof: 'IBM Medscribe AI',
    href: '/projects/ibm-medscribe-ai',
  },
  {
    title: 'Technical depth when needed',
    description: 'Enough machine-learning range to go deeper when the problem calls for it without losing the software story.',
    proof: 'Graph Link Prediction',
    href: '/projects/graph-link-prediction',
  },
]

export const projectDomains = [
  {
    name: 'Product systems',
    description: 'Software where product clarity, backend structure, and ongoing iteration all matter.',
  },
  {
    name: 'Backend and workflows',
    description: 'Validation-heavy services and data flows that need to hold up under real input.',
  },
  {
    name: 'Applied AI',
    description: 'AI features shaped into trustworthy workflows instead of standalone model demos.',
  },
  {
    name: 'Technical depth',
    description: 'Supporting work that shows range without distracting from the primary portfolio narrative.',
  },
]

export const recruiterSummary = {
  title: 'Software engineer focused on product quality, dependable systems, and real-world workflows.',
  description:
    'I build software that is polished for users and maintainable for teams. The strongest public work in this portfolio sits where product, backend, data, and applied AI overlap.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'building polished product software, dependable backend workflows, and thoughtful AI features',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, backend, and product-oriented full-stack roles',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
  resumePath: '/resume.pdf',
}
