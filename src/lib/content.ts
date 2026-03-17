import type {
  AdditionalWork,
  ExperienceEntry,
  ProjectEntry,
  SkillGroup,
} from "@/types/content";

export const projects: ProjectEntry[] = [
  {
    slug: "buzzr-ecosystem",
    title: "Buzzr Ecosystem",
    role: "Product engineer across mobile, web, and backend systems",
    timeline: "2024 - Present",
    status: "Active build",
    oneLine:
      "A sports-social product ecosystem combining the Buzzr mobile app with a launch-ready desktop web experience.",
    longSummary:
      "Built a consumer product ecosystem spanning an Expo + React Native app, Supabase/Postgres backend workflows, and a polished Next.js marketing surface. The value is not just interface polish. The system had to hold together across live league imports, ratings, parties, migrations, and high-change product iteration.",
    spotlight:
      "One product story across multiple surfaces: mobile product depth, backend discipline, and a launch-grade web presence.",
    challenge:
      "The hard part was making a social sports product feel trustworthy while the underlying data model kept evolving. Ratings, identity, history, parties, and game catalogs all had to stay coherent as the app and web surfaces expanded in parallel.",
    decisions: [
      "Built the mobile product on Expo, React Native, and TypeScript to move quickly while keeping typed product boundaries.",
      "Used Supabase and PostgreSQL with migration-driven changes so new social features could ship without destabilizing the data model.",
      "Created a separate Next.js desktop web surface for launch storytelling, support pages, and a stronger product marketing layer.",
      "Protected high-change product areas with Jest coverage to keep shipping velocity high without random regressions.",
    ],
    outcomes: [
      "Supported 7 live leagues with entertainment-first rating flows and social watch-party features.",
      "Scaled the mobile codebase to 214 source files while preserving order through 38 SQL migrations.",
      "Shipped 28 automated test files for the mobile stack plus a polished 39-file desktop web experience.",
    ],
    learnings: [
      "A product only feels premium when the data model is stable underneath the UI.",
      "Cross-surface ecosystems require stronger content hierarchy and shared mental models than one-off apps.",
      "The strongest portfolio work survives repeated change instead of freezing at demo quality.",
    ],
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Jest",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    metrics: [
      { label: "Live leagues", value: "7" },
      { label: "Mobile files", value: "214" },
      { label: "SQL migrations", value: "38" },
      { label: "Desktop files", value: "39" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/Buzzr",
    links: [
      { label: "Mobile repo", href: "https://github.com/gangisettyrushil10/Buzzr" },
      { label: "Desktop web repo", href: "https://github.com/gangisettyrushil10/buzzr_desktop" },
    ],
    featured: true,
    category: "Product",
    image: "/projects/buzzr-home.png",
    imageAlt: "Buzzr ecosystem preview showing the mobile product interface.",
    gallery: [
      {
        src: "/projects/buzzr-home.png",
        alt: "Buzzr mobile home experience.",
        label: "Mobile home",
        caption: "The primary mobile surface focused on game discovery, ratings, and social energy.",
      },
      {
        src: "/projects/buzzr-games.png",
        alt: "Buzzr game detail and ratings screen.",
        label: "Game detail",
        caption: "Game detail flows built around entertainment ranking, history, and participation.",
      },
      {
        src: "/projects/buzzr-party.png",
        alt: "Buzzr party and social experience preview.",
        label: "Social layer",
        caption: "Watch-party and social surfaces that make the ecosystem feel like a real consumer product.",
      },
    ],
    recording: {
      title: "Product walkthrough",
      caption:
        "Best demo flow: open the app, browse a live game, rate it, then show how the desktop surface sells the ecosystem.",
      ctaLabel: "Add screen recording",
    },
    assetChecklist: [
      "Capture the home feed, game detail flow, and a social or party interaction from the mobile product.",
      "Record a short 20-30 second walkthrough that starts on mobile and ends on the desktop launch site.",
      "Add one architecture slide showing mobile app, Supabase/Postgres backend, and desktop marketing surface.",
    ],
  },
  {
    slug: "medscribe",
    title: "Medscribe",
    role: "Full-stack AI product engineer",
    timeline: "2025",
    status: "Hackathon-to-product prototype",
    oneLine:
      "An AI scribe for clinicians that turns raw notes into structured, citation-backed summaries and suggested orders.",
    longSummary:
      "Built a full-stack clinical note assistant with a React/Vite frontend, Flask backend, and watsonx-driven reasoning flows. The product takes raw clinical notes and returns structured summaries, suggested next steps, evidence references, and model provenance so the experience feels useful and explainable instead of magical and opaque.",
    spotlight:
      "The strongest applied AI story in the portfolio: real workflow, structured outputs, citations, and a product surface around the model.",
    challenge:
      "Clinical AI only becomes believable when the output is structured, traceable, and presented in a way that builds trust. Medscribe needed to feel like a real workflow tool instead of a generic chatbot pasted onto healthcare copy.",
    decisions: [
      "Used Flask on the backend to keep note processing, routing, and model orchestration straightforward and inspectable.",
      "Designed the frontend around a chat-plus-structured-output experience so the result is readable by both technical and non-technical reviewers.",
      "Separated live vs mock model modes so the product can be demoed and developed without blocking on credentials every time.",
      "Included evidence and provenance hooks so the user can understand how the system arrived at its suggestions.",
    ],
    outcomes: [
      "Built a project with 9 Python source files and 12 frontend source files around a focused healthcare workflow.",
      "Shipped approximately 638 lines of backend Python and 686 lines of frontend React code in the current prototype.",
      "Created a stronger hiring signal than a generic ML notebook by wrapping AI behavior in a believable product experience.",
    ],
    learnings: [
      "AI projects become far more credible when the UX explains confidence, structure, and evidence.",
      "Healthcare-adjacent interfaces require more restraint and clarity than general consumer chat products.",
      "Live/mock operating modes are useful when shipping demos under real API and credential constraints.",
    ],
    stack: ["React", "Vite", "Flask", "Python", "IBM watsonx", "Structured Outputs"],
    metrics: [
      { label: "Python files", value: "9" },
      { label: "Frontend files", value: "12" },
      { label: "Backend LOC", value: "638" },
      { label: "Frontend LOC", value: "686" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/IBM-Medscribe-AI",
    featured: true,
    category: "AI",
    gallery: [
      {
        alt: "Medscribe note input screen placeholder.",
        label: "Clinical note input",
        caption: "Capture the input state where a clinician pastes or types an unstructured note.",
      },
      {
        alt: "Medscribe structured result screen placeholder.",
        label: "Structured output",
        caption: "Capture the summary, treatment recommendations, and structured result layout after processing.",
      },
      {
        alt: "Medscribe citation and evidence view placeholder.",
        label: "Evidence + provenance",
        caption: "Capture citations, support scores, and model/provenance indicators to show trust-building UX.",
      },
    ],
    recording: {
      title: "Clinical workflow demo",
      caption:
        "Record a note-to-output walkthrough: paste note, trigger analysis, then scroll through structured recommendations and evidence.",
      ctaLabel: "Add demo reel",
    },
    assetChecklist: [
      "Capture the landing state, note input, structured output, and evidence sections as separate screenshots.",
      "Record one short workflow video from note entry through model response and evidence review.",
      "Add a simple system diagram showing React/Vite frontend, Flask backend, and watsonx/model layer.",
    ],
  },
  {
    slug: "business-analytics-dashboard",
    title: "Business Analytics Dashboard",
    role: "Full-stack analytics engineer",
    timeline: "2025",
    status: "Case-study project",
    oneLine:
      "A full-stack analytics platform for messy CSV ingestion, validation, forecasting, anomaly detection, and AI insights.",
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
      { label: "Forecasting focus", value: "Multi-step" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/Business_Analytics_Dashboard",
    featured: true,
    category: "Data",
    gallery: [
      {
        alt: "CSV ingestion screen placeholder.",
        label: "Upload + ingest",
        caption: "Capture the upload step and the first pass of CSV validation or parsing feedback.",
      },
      {
        alt: "Validation and anomaly view placeholder.",
        label: "Validation",
        caption: "Capture a state where the system explains broken or messy input before analytics run.",
      },
      {
        alt: "Forecast dashboard placeholder.",
        label: "Forecast view",
        caption: "Capture the final dashboard state with forecasts, anomalies, and exported insight panels.",
      },
    ],
    recording: {
      title: "Data workflow walkthrough",
      caption:
        "Best recording: upload a messy CSV, show validation feedback, then transition into the dashboard and forecast outputs.",
      ctaLabel: "Add screen recording",
    },
    assetChecklist: [
      "Capture one raw upload state, one validation/error state, and one polished dashboard/forecast state.",
      "Record a short walkthrough that shows bad input getting corrected before insights appear.",
      "Export one architecture diagram highlighting FastAPI backend services and frontend analysis flow.",
    ],
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
      { label: "Evaluation", value: "AUC" },
    ],
    githubUrl: "https://github.com/gangisettyrushil10/graph-theory-final-project",
    featured: true,
    category: "AI",
    gallery: [
      {
        alt: "Graph architecture placeholder.",
        label: "Architecture",
        caption: "Add a visual of the graph model architecture or message-passing flow instead of a generic screenshot.",
      },
      {
        alt: "Dataset visualization placeholder.",
        label: "Dataset view",
        caption: "Show dataset scale with node/edge counts or a graph excerpt that helps recruiters understand the problem shape.",
      },
      {
        alt: "Training or evaluation chart placeholder.",
        label: "Evaluation",
        caption: "Add an AUC, loss, or performance chart to make the ML proof visual and concrete.",
      },
    ],
    recording: {
      title: "Technical walkthrough",
      caption:
        "If you record this project, focus on model setup, evaluation metrics, and why graph learning was the right approach.",
      ctaLabel: "Add walkthrough",
    },
    assetChecklist: [
      "Add one architecture diagram, one dataset scale visual, and one evaluation chart instead of UI screenshots.",
      "Record a short technical walkthrough explaining the graph problem, model choice, and evaluation outcome.",
      "Include one comparison note showing why this is stronger than a basic tabular ML example.",
    ],
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
    featured: false,
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
    items: ["TypeScript", "React", "Next.js", "Expo", "React Native", "Framer Motion"],
  },
  {
    title: "Backend and APIs",
    items: ["Python", "Flask", "FastAPI", "PostgreSQL", "REST APIs", "SQLAlchemy"],
  },
  {
    title: "Data and Analytics",
    items: ["PostgreSQL", "SQL", "Pandas", "ETL", "Forecasting", "Operational reporting"],
  },
  {
    title: "Applied AI and ML",
    items: ["watsonx", "scikit-learn", "PyTorch", "PyTorch Geometric", "NLP", "Structured outputs"],
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
    title: "Fake News Detection",
    summary: "Lean NLP baseline using TF-IDF and a Passive Aggressive classifier for fast, explainable text classification.",
    githubUrl: "https://github.com/gangisettyrushil10/fakeNewsDetection.py",
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
