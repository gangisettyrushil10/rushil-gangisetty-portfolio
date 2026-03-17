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
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'buzzr-ecosystem',
    title: 'Buzzr Ecosystem',
    category: 'Product Engineering',
    description: 'A sports-social product ecosystem with a mobile app and polished web experience for rating games by entertainment value.',
    longDescription: 'A consumer product ecosystem consisting of a mobile app plus a launch/marketing web experience. The mobile app lets users rate games by entertainment, not just final score, with social features and watch-party style flows. The desktop web app acts as a polished launch-ready marketing surface for the product.',
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'PostgreSQL', 'Jest', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Live Leagues', value: '7' },
      { label: 'Source Files', value: '214' },
      { label: 'SQL Migrations', value: '38' },
      { label: 'Test Files', value: '28' },
    ],
    role: 'Full-Stack Engineer',
    timeline: '2024 - Present',
    status: 'Active Development',
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
    featured: true,
  },
  {
    id: 'medscribe',
    title: 'Medscribe',
    category: 'Applied AI / Full-Stack Product',
    description: 'An agentic AI scribe for clinicians that transforms raw clinical notes into structured, citation-backed insights.',
    longDescription: 'An agentic AI scribe experience for clinicians that turns raw clinical notes into structured, citation-backed insights and suggested orders. Users input clinical notes and the system returns structured summaries, suggested orders, evidence/citations, and model/provenance signals.',
    stack: ['React', 'Vite', 'Flask', 'Python', 'IBM watsonx', 'LLM Orchestration'],
    metrics: [
      { label: 'Python Files', value: '9' },
      { label: 'Frontend Files', value: '12' },
      { label: 'Backend LOC', value: '638' },
      { label: 'Frontend LOC', value: '686' },
    ],
    role: 'Full-Stack Engineer',
    timeline: '2024',
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
    featured: true,
  },
  {
    id: 'business-analytics-dashboard',
    title: 'Business Analytics Dashboard',
    category: 'Full-Stack Data Product',
    description: 'A full-stack analytics application for messy CSV ingestion, validation, forecasting, and anomaly detection.',
    longDescription: 'A comprehensive analytics platform that handles the full data lifecycle - from messy CSV ingestion and validation to forecasting and anomaly detection. Built to handle real-world data quality issues rather than just displaying clean charts.',
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Prophet', 'scikit-learn'],
    metrics: [
      { label: 'Backend Endpoints', value: '12' },
      { label: 'Lines of Code', value: '5K+' },
      { label: 'Input Quality', value: 'CSV Validation' },
      { label: 'Workflow Focus', value: 'Forecasting' },
    ],
    role: 'Full-Stack Engineer',
    timeline: '2024',
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
    featured: true,
  },
  {
    id: 'graph-link-prediction',
    title: 'Graph Link Prediction',
    category: 'ML / Technical Depth',
    description: 'A graph neural network project for link prediction on a Facebook social graph dataset.',
    longDescription: 'A deep learning project implementing graph neural networks for link prediction on the Facebook social graph. Demonstrates understanding of graph-based ML beyond basic tabular classification.',
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
    featured: true,
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
  languages: ['TypeScript', 'Python', 'JavaScript', 'SQL', 'Java'],
  frontend: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'FastAPI', 'Flask', 'PostgreSQL', 'Supabase'],
  data: ['Prophet', 'scikit-learn', 'PyTorch', 'Pandas', 'NumPy'],
  tools: ['Git', 'Docker', 'CI/CD', 'Jest', 'Vite'],
}

export const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  tagline: 'Building product, backend, data, and AI systems',
  location: 'Dallas, Texas',
  status: 'Open to software engineering roles and internships',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
}
