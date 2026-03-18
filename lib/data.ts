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
      'A sports-social product across mobile and web with live leagues, entertainment-based ratings, watch parties, and a backend that had to stay organized while the product kept evolving.',
    longDescription:
      'Buzzr is the clearest snapshot of how I like to build. It is a product system, not just a single screen: an Expo mobile app, a public-facing web presence, shared types, social features, live data, and enough moving parts that architecture choices actually matter.',
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
      'Social sports products only feel good when live data, identity, ratings, and activity feeds stay coherent while the product is still changing. The hard part was keeping the system flexible without letting the underlying model get sloppy.',
    decisions: [
      'Used Supabase for auth, realtime primitives, and Postgres so the product could move quickly without inventing infrastructure too early.',
      'Kept shared types and validation logic between the app and the web surface so the product story stayed consistent.',
      'Centered the rating model on entertainment value instead of final score, which sharpened the product concept immediately.',
    ],
    outcomes: [
      'Supports 7 live leagues with auth, profiles, ratings, following, and watch-party flows.',
      'Shows the strongest mix of product taste, full-stack coordination, and ongoing iteration anywhere on my GitHub.',
      'Feels like something that could plausibly keep growing instead of a one-week portfolio demo.',
    ],
    learnings: [
      'The real complexity in multi-surface products usually lives in the data model and API contracts, not the individual screens.',
      'Realtime features only feel magical when the failure states are boring and dependable.',
      'A strong product concept gets stronger when the interaction model reinforces it everywhere.',
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
      caption: 'Open the app, browse a game, rate it, then land on the web surface to show the full ecosystem.',
    },
    featured: true,
    recruiterAngle: 'Best proof of product sense, full-stack execution, and shipping momentum.',
    proofLine: 'Selected from GitHub because it is the broadest and most current product system in the portfolio.',
    repoName: 'Buzzr',
    previewTitle: 'A sports app that actually feels like a product',
    previewNote: 'Live data, social activity, and a clear concept give this one the strongest recruiter signal.',
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
      'A full-stack analytics workflow for messy CSV uploads, validation, forecasting, anomaly detection, and AI-assisted insights.',
    longDescription:
      'This project matters because it does not pretend data arrives clean. It handles uploads, ETL-like transformations, validation, forecasting, anomaly detection, auth, and export, which makes it much closer to real analytics software than a dashboard pasted on top of a tidy dataset.',
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
      'Most dashboards look good only after someone else has already cleaned the data. I wanted this one to handle the ugly part too: missing values, broken dates, duplicate rows, bad categories, and still guide the user toward useful output.',
    decisions: [
      'Made validation a first-class product feature instead of something hidden behind the upload step.',
      'Kept forecasting, anomaly detection, and insight generation behind clear backend boundaries so the app stayed explainable.',
      'Used AI-generated insights as a layer on top of the workflow, not as a substitute for the workflow.',
    ],
    outcomes: [
      'Covers ingestion, validation, forecasting, anomaly detection, and export in one product flow.',
      'Reads like a serious data-heavy application rather than a chart gallery with a machine-learning badge on it.',
      'Strongest public GitHub proof for roles where backend, product, and data all overlap.',
    ],
    learnings: [
      'A lot of analytics work is really about making bad input understandable.',
      'Users trust forecasts more when the path from raw data to output is visible and calm.',
      'The right boundary between product and model logic makes demos far easier to explain.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/Business_Analytics_Dashboard' }],
    gallery: [
      {
        label: 'Validation-first workflow',
        alt: 'Business analytics dashboard validation state',
        caption: 'The key story is that the workflow handles messy uploads honestly before jumping to charts.',
      },
    ],
    featured: true,
    recruiterAngle: 'Best proof that I can build data-heavy software without hand-waving around the messy parts.',
    proofLine: 'Selected from GitHub because it combines backend APIs, product decisions, data quality work, and machine-learning output.',
    repoName: 'Business_Analytics_Dashboard',
    previewTitle: 'Data software that starts with bad input',
    previewNote: 'Validation, forecasting, anomaly detection, and AI insights all sit inside one coherent workflow.',
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
      'The interesting part of this project is not simply calling a model. It is shaping the workflow around the model so the result feels reviewable instead of magical: structured outputs, clearer sections, demo-safe modes, and a UI that treats trust as part of the feature.',
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
      'Healthcare-adjacent workflows raise the bar for clarity. A flashy AI demo is not enough if the user cannot understand what the system produced or why it should be trusted.',
    decisions: [
      'Used structured outputs because free-form text alone was not strong enough for the workflow.',
      'Separated live and mock modes so the product stayed demoable even when credentials were unavailable.',
      'Treated the frontend as part of the AI system by organizing results around reviewability instead of novelty.',
    ],
    outcomes: [
      'Transforms raw notes into a more structured summary with suggested next steps and supporting context.',
      'Shows that I think about trust, workflow design, and presentation, not just model invocation.',
      'Adds a strong applied-AI project to the portfolio without turning the entire site into an AI gimmick.',
    ],
    learnings: [
      'In AI products, confidence without visibility is a liability.',
      'Structured outputs make everything downstream easier to reason about.',
      'The best AI features feel like software first and model demos second.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/IBM-Medscribe-AI' }],
    video: {
      title: 'Workflow demo',
      caption: 'The strongest demo is note in, structured result out, with the interface showing why the output feels reviewable.',
      url: 'https://www.youtube.com/watch?v=nutsuHR1QPI',
    },
    gallery: [
      {
        label: 'Structured output',
        alt: 'IBM Medscribe structured result view',
        caption: 'The right screenshot here is the structured result because it shows the trust story immediately.',
      },
    ],
    featured: true,
    recruiterAngle: 'Best proof that I can build AI features with product discipline instead of a chatbot wrapper.',
    proofLine: 'Selected from GitHub because it demonstrates applied AI, backend orchestration, and thoughtful UX in one project.',
    repoName: 'IBM-Medscribe-AI',
    previewTitle: 'AI shaped into a trustworthy workflow',
    previewNote: 'The point is not the model call. The point is the reviewable result.',
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
      'This is the technical depth piece in the portfolio. I keep it as supporting evidence for machine-learning depth instead of the main story, which helps the site stay software-engineering-first while still proving I can work lower in the stack when the problem asks for it.',
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
      'Link prediction is not just a model problem. It depends on how you construct train and test edges, define negatives, and choose an evaluation setup that is honest.',
    decisions: [
      'Used PyTorch Geometric so the implementation matched the graph nature of the problem.',
      'Spent time on negative sampling and evaluation because that is where a lot of graph-ML projects get fuzzy.',
      'Kept the model simple enough to defend clearly in an interview.',
    ],
    outcomes: [
      'Trains a GCN-based workflow over a real social graph dataset instead of a toy tabular example.',
      'Adds credible technical depth to the portfolio without distracting from the stronger product and systems work.',
      'Useful proof point for teams that care about breadth plus the ability to go deeper when necessary.',
    ],
    learnings: [
      'Representation, sampling, and evaluation choices can matter more than model cleverness.',
      'Technical depth plays best in a portfolio when it supports the main narrative instead of replacing it.',
      'Simple explanations beat flashy complexity when you are presenting work to a recruiter or hiring manager.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/graph-theory-final-project',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/graph-theory-final-project' }],
    featured: true,
    recruiterAngle: 'Depth piece that shows I can move from product software into more technical ML territory when needed.',
    proofLine: 'Selected from GitHub because it adds real technical range without cluttering the main narrative.',
    repoName: 'graph-theory-final-project',
    previewTitle: 'A graph ML project I can actually explain',
    previewNote: 'Good depth piece, intentionally positioned behind the stronger product and systems work.',
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
      'PA GPA is a quieter project, but it is a useful example of stakeholder-facing software. The point was not flashy UI. The point was giving people clearer reporting and forecasting for an operational workflow that needed more trust and less manual effort.',
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
      'Operational tools are only valuable when non-engineers trust the numbers and the workflow fits what they actually need.',
    decisions: [
      'Focused on reporting clarity and forecasting usefulness rather than decoration.',
      'Backed the workflow with tests so the numbers stayed dependable.',
    ],
    outcomes: [
      'Improved a stakeholder-facing process with clearer reporting and forecasting.',
      'Good support project for showing that I can build practical software, not only flashy demos.',
    ],
    learnings: [
      'A plain internal tool can still be strong portfolio material if it solves a real problem cleanly.',
      'Trust in operational software is often earned through reliability and legibility.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/PA_GPA',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/PA_GPA' }],
    featured: false,
    recruiterAngle: 'Helpful supporting proof for stakeholder-facing software and forecasting work.',
    proofLine: 'Kept as supporting GitHub work because it is practical and useful, even if it is less visually exciting.',
    repoName: 'PA_GPA',
    previewTitle: 'An internal tool that prizes clarity over flash',
    previewNote: 'Shows comfort with reporting, forecasting, and building for real stakeholder needs.',
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
      'This is one of the earlier machine-learning projects on my GitHub, and I keep it around as a compact example of building and evaluating a simple text-classification pipeline.',
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
      'Shows early initiative in ML and text classification.',
      'Useful as supporting context, but not one of the first projects I want recruiters to open.',
    ],
    learnings: [
      'Simple baselines are worth building because they teach the full path from data prep to evaluation.',
      'Early projects are strongest when they are presented honestly.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/fakeNewsDetection.py',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/fakeNewsDetection.py' }],
    featured: false,
    recruiterAngle: 'Shows early ML curiosity and a willingness to build the fundamentals.',
    proofLine: 'Included as supporting GitHub work, not flagship work.',
    repoName: 'fakeNewsDetection.py',
    previewTitle: 'A simple ML baseline, presented honestly',
    previewNote: 'Useful context for range, but not the lead story anymore.',
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
      'This is a smaller utility project, but it is a good example of practical automation. It reads a batch of LinkedIn URLs, pulls the relevant field, and returns a cleaner CSV for the next step in the workflow.',
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
      'Even small utility scripts need to be clear about input, output, and where the automation saves time.',
    decisions: [
      'Kept the contract simple: batch URLs in, extracted data out.',
      'Framed the project as a utility rather than overselling it as a platform.',
    ],
    outcomes: [
      'Shows practical automation instincts and comfort with batch-processing workflows.',
      'Helpful supporting GitHub material without taking focus away from the stronger portfolio projects.',
    ],
    learnings: [
      'Small utilities are best when they solve one workflow pain point cleanly.',
      'A portfolio benefits from showing both ambitious builds and practical scripts.',
    ],
    githubUrl: 'https://github.com/gangisettyrushil10/linkedin_high_school_scraper.py',
    links: [{ label: 'Repository', href: 'https://github.com/gangisettyrushil10/linkedin_high_school_scraper.py' }],
    featured: false,
    recruiterAngle: 'Good supporting proof of scripting and workflow automation.',
    proofLine: 'Included as supporting GitHub work for breadth, not as a lead project.',
    repoName: 'linkedin_high_school_scraper.py',
    previewTitle: 'A practical script for a repetitive workflow',
    previewNote: 'Smaller than the flagship projects, but useful proof of hands-on automation.',
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
    note: 'Curated down to the projects that best represent how I build today.',
  },
  {
    value: '4',
    label: 'flagship projects',
    note: 'Product software, data workflows, applied AI, and ML depth.',
  },
  {
    value: '3',
    label: 'software internships',
    note: 'Experience across SaaS, data quality, forecasting, and production support.',
  },
  {
    value: '50K+',
    label: 'records/day handled',
    note: 'From internship workflow automation and data pipeline work.',
  },
]

export const workPrinciples: WorkPrinciple[] = [
  {
    title: 'Build the product, not just the screen',
    description:
      'I like work where the UI, backend, and product idea all have to hold together. That is why Buzzr and the analytics dashboard lead this portfolio.',
  },
  {
    title: 'Make the system explainable',
    description:
      'Whether it is an API, a forecasting workflow, or an AI feature, I try to make the structure legible enough that a teammate can extend it and a recruiter can understand it quickly.',
  },
  {
    title: 'Handle messy inputs honestly',
    description:
      'A lot of real engineering work lives in bad data, changing requirements, and awkward edge cases. I do not like pretending those parts are somebody else’s problem.',
  },
]

export const focusAreas: FocusArea[] = [
  {
    title: 'Product-minded engineering',
    description: 'Useful when the experience matters as much as the implementation underneath it.',
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
    description: 'Best when AI needs reviewability, structure, and calm UX instead of a chatbot shell.',
    proof: 'IBM Medscribe AI',
    href: '/projects/ibm-medscribe-ai',
  },
  {
    title: 'Technical depth when it is useful',
    description: 'Enough ML range to go deeper when the problem calls for it without losing the software story.',
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
    description: 'Validation-heavy services and data flows that have to survive real input.',
  },
  {
    name: 'Applied AI',
    description: 'AI features shaped into trustworthy experiences instead of standalone model demos.',
  },
  {
    name: 'Technical depth',
    description: 'Supporting work that shows range without distracting from the strongest recruiter story.',
  },
]

export const recruiterSummary = {
  title: 'Software engineer with product sense, backend range, and a strong instinct for real-world workflows.',
  description:
    'I like building software that feels sharp to the user and sane for the team behind it. The strongest public work on my GitHub sits where product, backend, data, and applied AI overlap.',
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'building polished product software, dependable backend workflows, and thoughtful AI features',
  location: 'Dallas, Texas',
  status: 'Open to software engineering, backend, and product-minded full-stack roles',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
  resumePath: '/resume.pdf',
}
