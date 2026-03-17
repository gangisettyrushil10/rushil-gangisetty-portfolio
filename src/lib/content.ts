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
    role: "Founder-style product engineer",
    timeline: "2024 - Present",
    status: "Active build",
    oneLine: "A sports-social mobile app for rating games by entertainment, not just final score.",
    longSummary:
      "Built an Expo + React Native app with Supabase/Postgres, live league imports, ratings, watch parties, and identity-driven social features. The project emphasizes product polish, backend workflows, and migration-safe releases.",
    spotlight:
      "Shipped a high-change mobile product with strong backend and data discipline instead of stopping at UI mockups.",
    challenge:
      "The hard part was never the headline feature. It was making game data, user identity, ratings history, watch-party state, and release-safe changes work together without breaking the product every time the schema evolved.",
    decisions: [
      "Built the app on Expo, React Native, and TypeScript so product iteration speed stayed high without sacrificing typed interfaces.",
      "Used Supabase and PostgreSQL with migration-driven changes to keep the backend stable as ratings, parties, and social features expanded.",
      "Protected high-change areas with Jest coverage so user-facing product work could keep moving without random regressions.",
    ],
    outcomes: [
      "Expanded the codebase to 214 source files while keeping the data layer organized through 38 SQL migrations.",
      "Supported 7 live leagues and a ratings model centered on entertainment value instead of raw final scores.",
      "Maintained 28 automated test files to keep release confidence high as the feature set grew.",
    ],
    learnings: [
      "Product polish only feels real when the data model is stable underneath it.",
      "Shipping social features forces a higher bar for identity, timeline consistency, and state transitions.",
      "The best proof in a portfolio project is surviving repeated change without collapsing into ad hoc fixes.",
    ],
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
    gallery: [
      {
        src: "/projects/buzzr-home.png",
        alt: "Buzzr mobile app showing the home feed.",
        caption: "Home feed focused on making game discovery and ratings feel product-ready.",
      },
      {
        src: "/projects/buzzr-games.png",
        alt: "Buzzr mobile app showing game ratings and detail views.",
        caption: "Game experiences built around entertainment ranking, history, and user input.",
      },
      {
        src: "/projects/buzzr-party.png",
        alt: "Buzzr mobile app showing watch-party style features.",
        caption: "Watch-party surfaces that turn ratings into a shared social product.",
      },
    ],
  },
  {
    slug: "buzzr-desktop",
    title: "Buzzr Desktop Web",
    role: "Frontend and brand systems builder",
    timeline: "2025",
    status: "Launch-ready marketing site",
    oneLine: "A polished Next.js marketing site for the Buzzr mobile product.",
    longSummary:
      "Designed and built a conversion-oriented product site with animated sections, reusable components, SEO primitives, and test coverage. This is the quality bar I use for production-facing web experiences.",
    spotlight:
      "Turned a product pitch into a real launch-ready web surface with strong motion, structure, and content hierarchy.",
    challenge:
      "The goal was to create a site that felt like a serious consumer product launch, not a class-project landing page. That meant the visuals, motion, content structure, and responsiveness all had to reinforce credibility.",
    decisions: [
      "Used Next.js and TypeScript to keep the site structured, reusable, and production-friendly.",
      "Built the interface with Tailwind and Framer Motion to create clear section rhythm, controlled motion, and mobile-safe layouts.",
      "Added testing and SEO primitives so the site worked as a real shipping surface rather than a one-off demo.",
    ],
    outcomes: [
      "Shipped 39 frontend files organized around reusable sections and deployment-ready routing.",
      "Added 3 test files around the highest-value interactions and rendering behavior.",
      "Created a web presence that can support hiring, product storytelling, and future launch traffic.",
    ],
    learnings: [
      "A marketing site still needs engineering discipline if it is going to survive iteration.",
      "Motion is useful when it clarifies hierarchy, not when it becomes decoration.",
      "Strong product storytelling depends on deliberate structure as much as visual taste.",
    ],
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
    imageAlt: "Buzzr Desktop Web product marketing preview.",
    gallery: [
      {
        src: "/projects/buzzr-party.png",
        alt: "Buzzr desktop marketing section preview.",
        caption: "Landing page section built to make the product story feel intentional and launch-ready.",
      },
      {
        src: "/projects/buzzr-games.png",
        alt: "Buzzr desktop product feature preview.",
        caption: "Feature storytelling that translates app behavior into recruiter and user-facing proof.",
      },
    ],
  },
  {
    slug: "business-analytics-dashboard",
    title: "Business Analytics Dashboard",
    role: "Full-stack analytics engineer",
    timeline: "2025",
    status: "Case-study project",
    oneLine: "A full-stack analytics platform for messy CSVs, forecasting, anomaly detection, and AI insights.",
    longSummary:
      "Built a FastAPI + React application that handles ingestion, validation, analytics, forecasting, anomaly detection, and export. The value is not just charts, but reliable handling of bad data and clear backend boundaries.",
    spotlight:
      "Focused on systems that survive real input quality issues instead of dashboards that only work on happy-path demo data.",
    challenge:
      "Most analytics demos assume clean input and perfectly shaped tables. This project was designed around the opposite assumption: users upload messy CSVs, still want insight quickly, and need the system to fail safely when data quality is bad.",
    decisions: [
      "Separated ingestion, validation, forecasting, anomaly detection, and export into clear backend responsibilities.",
      "Used React and TypeScript on the client so the UI could guide users through upload, cleanup, and analysis states.",
      "Made validation a first-class step before analytics so the product could explain bad input instead of silently producing misleading charts.",
    ],
    outcomes: [
      "Built 12 backend endpoints around ingestion, analytics, anomaly detection, forecasting, and export.",
      "Shipped a 5K+ LOC codebase spanning API, frontend, and analytics workflows.",
      "Created a stronger product story by centering data quality and explainability instead of only visual output.",
    ],
    learnings: [
      "Users trust analytics tools more when validation behavior is visible and honest.",
      "Forecasting and anomaly detection only matter if the surrounding system handles messy inputs well.",
      "Full-stack analytics work is strongest when backend contracts stay explicit.",
    ],
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
    role: "Applied ML engineer",
    timeline: "2025",
    status: "Research-style project",
    oneLine: "A graph neural network project for link prediction on a Facebook social graph.",
    longSummary:
      "Trained a two-layer GCN for link prediction, evaluated with AUC, and used graph learning concepts to move beyond standard tabular ML workflows.",
    spotlight:
      "A good example of depth in ML work: not just off-the-shelf classification, but graph structure, training loops, and evaluation design.",
    challenge:
      "The project needed to show more than basic classification. The real target was proving comfort with graph structure, edge prediction, and the evaluation choices that come with non-tabular learning problems.",
    decisions: [
      "Used PyTorch Geometric to work directly with graph-native model layers instead of flattening the problem into tabular shortcuts.",
      "Built the project around a two-layer GCN to keep the architecture understandable while still demonstrating graph-learning fundamentals.",
      "Tracked evaluation with AUC to keep the model discussion tied to ranking quality rather than raw accuracy alone.",
    ],
    outcomes: [
      "Modeled a Facebook network with 4,039 nodes and 88,234 edges.",
      "Ran 100 training epochs to study how the GCN behaved under repeated optimization.",
      "Produced a portfolio example that shows practical comfort with graph ML concepts and tooling.",
    ],
    learnings: [
      "Graph structure changes how you think about features, splits, and evaluation.",
      "A simpler model is often stronger portfolio proof when the reasoning is clear.",
      "ML credibility improves when the experiment design is easy to defend.",
    ],
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
    role: "NLP and experimentation builder",
    timeline: "2024",
    status: "Applied ML prototype",
    oneLine: "A TF-IDF + Passive Aggressive classifier pipeline for fake-vs-real article classification.",
    longSummary:
      "Implemented a lean NLP pipeline for text classification using vectorization and linear models. The project is simple by design and demonstrates practical modeling, metrics, and fast experimentation.",
    spotlight:
      "Useful proof that I can ship practical ML work quickly and explain the tradeoffs clearly.",
    challenge:
      "The main design choice was restraint: use a lightweight, explainable text-classification pipeline that could train fast, establish a useful baseline, and stay easy to reason about in interviews.",
    decisions: [
      "Used TF-IDF features to keep the representation simple, interpretable, and quick to iterate on.",
      "Chose a Passive Aggressive classifier for a strong linear baseline that fits the speed and simplicity target.",
      "Framed the project around measurable validation results instead of overcomplicating the stack.",
    ],
    outcomes: [
      "Reached a reported validation accuracy of 92.6% with a lightweight NLP pipeline.",
      "Produced a fast experimentation project that is easy to discuss from data prep through evaluation.",
      "Created a defensible ML example without relying on heavy infrastructure or black-box modeling choices.",
    ],
    learnings: [
      "Simple baselines are valuable when the problem framing and evaluation are clear.",
      "Interview-ready ML projects benefit from transparency more than complexity.",
      "A strong explanation of tradeoffs often matters more than adding model novelty for its own sake.",
    ],
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

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
