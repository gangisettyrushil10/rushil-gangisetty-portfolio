import { experiences, getFeaturedProjects } from "@/lib/content";

export type CopilotHighlight = {
  title: string;
  href: string;
  type: "project" | "experience" | "page";
  reason: string;
};

export type CopilotResponse = {
  answer: string;
  mode: "grounded-local";
  highlights: CopilotHighlight[];
};

const keywordGroups = {
  backend: ["backend", "api", "apis", "server", "flask", "fastapi", "database", "postgres", "sql"],
  frontend: ["frontend", "ui", "ux", "design", "mobile", "react", "next", "product"],
  ai: ["ai", "ml", "llm", "model", "nlp", "graph", "clinical", "healthcare", "watsonx"],
  data: ["data", "analytics", "etl", "forecast", "csv", "anomaly", "pipeline"],
  hiring: ["hire", "hiring", "recruiter", "best", "strongest", "fit", "role"],
};

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s+-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function countMatches(tokens: string[], text: string) {
  const haystack = text.toLowerCase();
  return tokens.reduce((score, token) => score + (haystack.includes(token) ? 1 : 0), 0);
}

export function buildPortfolioCopilotResponse(question: string): CopilotResponse {
  const tokens = tokenize(question);
  const featuredProjects = getFeaturedProjects();

  const projectScores = featuredProjects
    .map((project) => {
      const blob = [
        project.title,
        project.category,
        project.oneLine,
        project.longSummary,
        project.challenge,
        project.stack.join(" "),
        project.outcomes.join(" "),
      ].join(" ");

      let score = countMatches(tokens, blob);

      if (keywordGroups.backend.some((keyword) => tokens.includes(keyword))) {
        if (["medscribe", "business-analytics-dashboard"].includes(project.slug)) score += 4;
        if (project.slug === "buzzr-ecosystem") score += 2;
      }

      if (keywordGroups.frontend.some((keyword) => tokens.includes(keyword))) {
        if (project.slug === "buzzr-ecosystem") score += 5;
      }

      if (keywordGroups.ai.some((keyword) => tokens.includes(keyword))) {
        if (["medscribe", "graph-link-prediction"].includes(project.slug)) score += 5;
        if (project.slug === "business-analytics-dashboard") score += 2;
      }

      if (keywordGroups.data.some((keyword) => tokens.includes(keyword))) {
        if (project.slug === "business-analytics-dashboard") score += 5;
        if (project.slug === "buzzr-ecosystem") score += 1;
      }

      if (keywordGroups.hiring.some((keyword) => tokens.includes(keyword))) {
        if (["buzzr-ecosystem", "medscribe", "business-analytics-dashboard"].includes(project.slug)) score += 2;
      }

      return { project, score };
    })
    .sort((a, b) => b.score - a.score);

  const experienceScores = experiences
    .map((experience) => {
      const blob = [experience.company, experience.title, experience.bullets.join(" ")].join(" ");
      let score = countMatches(tokens, blob);

      if (keywordGroups.backend.some((keyword) => tokens.includes(keyword))) {
        if (experience.company === "Seam.ai") score += 3;
      }

      if (keywordGroups.data.some((keyword) => tokens.includes(keyword))) {
        if (["Seam.ai", "Aeyesafe", "Austin College"].includes(experience.company)) score += 2;
      }

      if (tokens.includes("internship") || tokens.includes("internships") || tokens.includes("experience")) {
        score += 3;
      }

      return { experience, score };
    })
    .sort((a, b) => b.score - a.score);

  const topProject = projectScores[0]?.project ?? featuredProjects[0];
  const highlights: CopilotHighlight[] = [];

  projectScores
    .filter((entry) => entry.score > 0)
    .slice(0, 2)
    .forEach(({ project }) => {
      highlights.push({
        title: project.title,
        href: `/projects/${project.slug}`,
        type: "project",
        reason: project.spotlight,
      });
    });

  experienceScores
    .filter((entry) => entry.score > 0)
    .slice(0, 1)
    .forEach(({ experience }) => {
      highlights.push({
        title: `${experience.company} internship`,
        href: "/#experience",
        type: "experience",
        reason: experience.bullets[0] ?? "Relevant execution experience.",
      });
    });

  if (highlights.length === 0) {
    highlights.push(
      {
        title: "Buzzr Ecosystem",
        href: "/projects/buzzr-ecosystem",
        type: "project",
        reason: "Best all-around signal for product engineering, frontend polish, and backend discipline.",
      },
      {
        title: "Medscribe",
        href: "/projects/medscribe",
        type: "project",
        reason: "Strongest AI product example with structured outputs and real workflow thinking.",
      },
    );
  }

  let answer = `${topProject.title} is the strongest place to start for that question. It combines ${topProject.category.toLowerCase()} depth with concrete engineering decisions, measurable proof, and a case study that explains why the system matters.`;

  if (keywordGroups.backend.some((keyword) => tokens.includes(keyword))) {
    answer = "For backend-oriented roles, start with Medscribe and the Business Analytics Dashboard, then use the Seam.ai internship as execution proof. Together they show API design, data flow discipline, and systems that handle messy real-world inputs.";
  } else if (keywordGroups.frontend.some((keyword) => tokens.includes(keyword))) {
    answer = "For frontend or product-engineering roles, lead with the Buzzr Ecosystem. It is the clearest proof that I can pair strong UI taste with a backend and data model solid enough to survive product change.";
  } else if (keywordGroups.ai.some((keyword) => tokens.includes(keyword))) {
    answer = "For AI-focused roles, Medscribe is the strongest product-facing example and Graph Link Prediction is the strongest technical-depth example. One shows applied workflow design, the other shows model and evaluation depth.";
  } else if (keywordGroups.data.some((keyword) => tokens.includes(keyword))) {
    answer = "For data-heavy roles, the Business Analytics Dashboard is the best project proof, and the internships add operational credibility. That combination shows forecasting, validation, ETL-style thinking, and real production support.";
  } else if (tokens.includes("internship") || tokens.includes("internships") || tokens.includes("experience")) {
    answer = "The internship section is strongest when paired with a flagship project. Seam.ai shows production workflow scale, Aeyesafe shows validation discipline, and Austin College shows forecasting plus testing rigor.";
  } else if (keywordGroups.hiring.some((keyword) => tokens.includes(keyword))) {
    answer = "If I were hiring from this portfolio, I would review the Buzzr Ecosystem first, then Medscribe, then the Business Analytics Dashboard. That sequence gives the fastest view of product judgment, applied AI, and backend/data execution.";
  }

  return {
    answer,
    mode: "grounded-local",
    highlights: highlights.slice(0, 3),
  };
}
