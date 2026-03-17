import type { ProfileConfig, RoleFit } from "@/types/content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://rushil-gangisetty-portfolio.vercel.app";

export const siteName = "Rushil Gangisetty";
export const siteTagline = "Software engineer shipping product, data, and AI systems.";
export const siteDescription =
  "Rushil Gangisetty is a software engineer focused on product engineering, backend systems, data-heavy applications, and applied AI. Explore flagship case studies, writing, resume, and contact details.";

export const profile: ProfileConfig = {
  name: "Rushil Gangisetty",
  title: "Software Engineer building product, data, and AI systems.",
  location: "Dallas, Texas",
  availability: "Open to software engineering roles and internships.",
  summary:
    "I build products that feel polished on the surface and defensible underneath. My work spans consumer apps, backend systems, messy data workflows, and applied AI products that need to earn trust.",
  email: "gangisettyrushil@gmail.com",
  resumePath: "/resume/rushil-gangisetty-resume.pdf",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/gangisettyrushil10",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rushilgangisetty10",
    },
    {
      label: "Email",
      href: "mailto:gangisettyrushil@gmail.com",
    },
  ],
};

export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export const homeStats = [
  { value: "4", label: "flagship case studies" },
  { value: "3", label: "software engineering internships" },
  { value: "50K+", label: "daily records supported in production workflows" },
  { value: "88K+", label: "edges modeled in graph ML work" },
];

export const targetRoles: RoleFit[] = [
  {
    title: "Software Engineer I",
    summary: "Best overall fit if the team wants a broad early-career engineer who can contribute across product, backend, and implementation detail.",
    href: "/projects/buzzr-ecosystem",
    proof: "Buzzr Ecosystem",
  },
  {
    title: "Full-Stack Engineer",
    summary: "Strong fit when the job blends frontend product work with backend APIs, data models, and shipping velocity.",
    href: "/projects/business-analytics-dashboard",
    proof: "Business Analytics Dashboard",
  },
  {
    title: "Backend or Product Engineer",
    summary: "Competitive when the role values API design, workflow reliability, and systems that need to survive real product iteration.",
    href: "/projects/medscribe",
    proof: "Medscribe",
  },
  {
    title: "Applied AI Engineer",
    summary: "Strongest for product-facing AI work, LLM workflow tooling, or teams that want AI features wrapped in credible software systems.",
    href: "/projects/graph-link-prediction",
    proof: "Graph Link Prediction + Medscribe",
  },
];
