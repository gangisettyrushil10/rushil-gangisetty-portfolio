import type {
  AdditionalWork,
  ExperienceEntry,
  ProjectEntry,
  SkillGroup,
} from "@/types/content";

export const projects: ProjectEntry[] = [
  {
    slug: "buzzr",
    title: "Buzzr",
    oneLine: "A sports-social mobile app for rating games by entertainment, not just final score.",
    longSummary:
      "Built an Expo + React Native app with Supabase/Postgres, live league imports, ratings, watch parties, and identity-driven social features. The project emphasizes product polish, backend workflows, and migration-safe releases.",
    spotlight:
      "Shipped a high-change mobile product with strong backend/data discipline instead of stopping at UI mockups.",
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL", "Jest"],
    metrics: [
      { label: "Live leagues", value: "7" },
      { label: "Source files", value: "214" },
      { label: "SQL migrations", value: "38" },
      { label: "Automated tests", value: "28" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/Buzzr",
    featured: true,
    category: "Product",
    image: "/projects/buzzr-home.png",
    imageAlt: "Buzzr mobile app home screen preview.",
  },
  {
    slug: "buzzr-desktop",
    title: "Buzzr Desktop Web",
    oneLine: "A polished Next.js marketing site for the Buzzr mobile product.",
    longSummary:
      "Designed and built a conversion-oriented product site with animated sections, reusable components, SEO primitives, and test coverage. This is the quality bar I use for production-facing web experiences.",
    spotlight:
      "Turned a product pitch into a real launch-ready web surface with strong motion, structure, and content hierarchy.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Jest"],
    metrics: [
      { label: "Frontend files", value: "39" },
      { label: "Test files", value: "3" },
      { label: "Primary use", value: "Launch site" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/buzzr_desktop",
    featured: true,
    category: "Product",
    image: "/projects/buzzr-party.png",
    imageAlt: "Buzzr feature preview for watch parties.",
  },
  {
    slug: "business-analytics-dashboard",
    title: "Business Analytics Dashboard",
    oneLine: "A full-stack analytics platform for messy CSVs, forecasting, anomaly detection, and AI insights.",
    longSummary:
      "Built a FastAPI + React application that handles ingestion, validation, analytics, forecasting, anomaly detection, and export. The value is not just charts, but reliable handling of bad data and clear backend boundaries.",
    spotlight:
      "Focused on systems that survive real input quality issues instead of dashboards that only work on happy-path demo data.",
    stack: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Prophet", "scikit-learn"],
    metrics: [
      { label: "Backend endpoints", value: "12" },
      { label: "Codebase size", value: "5K+ LOC" },
      { label: "Validated before analytics", value: "CSV ingestion" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/Business_Analytics_Dashboard",
    featured: true,
    category: "Data",
  },
  {
    slug: "graph-link-prediction",
    title: "Graph Link Prediction",
    oneLine: "A graph neural network project for link prediction on a Facebook social graph.",
    longSummary:
      "Trained a two-layer GCN for link prediction, evaluated with AUC, and used graph learning concepts to move beyond standard tabular ML workflows.",
    spotlight:
      "A good example of depth in ML work: not just off-the-shelf classification, but graph structure, training loops, and evaluation design.",
    stack: ["Python", "PyTorch Geometric", "NetworkX", "NumPy", "scikit-learn"],
    metrics: [
      { label: "Nodes", value: "4,039" },
      { label: "Edges", value: "88,234" },
      { label: "Training epochs", value: "100" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/graph-theory-final-project",
    featured: true,
    category: "AI",
  },
  {
    slug: "fake-news-detection",
    title: "Fake News Detection",
    oneLine: "A TF-IDF + Passive Aggressive classifier pipeline for fake-vs-real article classification.",
    longSummary:
      "Implemented a lean NLP pipeline for text classification using vectorization and linear models. The project is simple by design and demonstrates practical modeling, metrics, and fast experimentation.",
    spotlight:
      "Useful proof that I can ship practical ML work quickly and explain the tradeoffs clearly.",
    stack: ["Python", "scikit-learn", "Pandas", "TF-IDF", "NLP"],
    metrics: [
      { label: "Reported validation accuracy", value: "92.6%" },
      { label: "Model", value: "Passive Aggressive" },
      { label: "Feature pipeline", value: "TF-IDF" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/fakeNewsDetection.py",
    featured: true,
    category: "AI",
  },
];

export const experiences: ExperienceEntry[] = [
  {
    company: "Seam.ai",
    title: "Software Engineering Intern",
    dates: "Aug 2024 - May 2025",
    location: "Remote",
    bullets: [
      "Built and supported multi-tenant SaaS workflows serving 3 subscription tiers and 100+ users per organization.",
      "Operated production data and NLP workflows processing 50K+ records per day with validation-driven reliability improvements.",
      "Contributed to CI/CD and observability workflows tied to faster incident recovery.",
    ],
  },
  {
    company: "Aeyesafe",
    title: "Software Engineering Intern",
    dates: "Jun 2025 - Aug 2025",
    location: "Remote",
    bullets: [
      "Validated ETL outputs and API-fed sensor datasets across edge conditions during a release-testing internship.",
      "Ran recurring data-quality checks for missing fields, timestamp anomalies, and out-of-range values.",
      "Documented reproducible runbooks and handoff steps to improve support triage consistency.",
    ],
  },
  {
    company: "Austin College",
    title: "Software Engineering Intern",
    dates: "Jan 2025 - May 2025",
    location: "Sherman, Texas",
    bullets: [
      "Built reporting and forecasting workflows used by 100+ stakeholders across 1,000+ records.",
      "Added 58+ unit tests and edge-case validation logic to improve release confidence.",
      "Kept forecast calculations within <1% error across boundary and retake scenarios.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Product Engineering",
    items: ["TypeScript", "React", "Next.js", "Expo", "React Native", "Tailwind CSS"],
  },
  {
    title: "Backend and APIs",
    items: ["Python", "Java", "FastAPI", "Node.js", "REST APIs", "SQLAlchemy"],
  },
  {
    title: "Data and Analytics",
    items: ["PostgreSQL", "SQL", "Pandas", "ETL", "Forecasting", "Operational reporting"],
  },
  {
    title: "Applied AI and ML",
    items: ["scikit-learn", "PyTorch", "PyTorch Geometric", "NLP", "TF-IDF", "Anomaly detection"],
  },
];

export const additionalWork: AdditionalWork[] = [
  {
    title: "CommerceApp",
    summary: "Express + PostgreSQL REST API for e-commerce flows, auth, and Swagger docs.",
    githubUrl: "https://github.com/gangisettyrushil10/CommerceApp",
  },
  {
    title: "travel_rec",
    summary: "Recommendation-oriented backend work with Flask, SQLAlchemy, and asynchronous service integrations.",
    githubUrl: "https://github.com/gangisettyrushil10/travel_rec",
  },
  {
    title: "VOTINGAPPRG",
    summary: "Java coursework project focused on application structure and domain-driven flow.",
    githubUrl: "https://github.com/gangisettyrushil10/VOTINGAPPRG",
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
