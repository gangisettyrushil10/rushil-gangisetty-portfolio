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
  availability: "Open to software engineering, data, and systems-oriented roles.",
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
    title: "Full-Stack and Product Engineering",
    summary: "Strongest when the work blends user-facing product decisions with backend ownership, iteration speed, and shipping discipline.",
    href: "/projects/buzzr-ecosystem",
    proof: "Buzzr Ecosystem",
  },
  {
    title: "Data and Analytics Workflows",
    summary: "Competitive for analyst-engineering or analytics-heavy roles that need SQL, validation, forecasting, and systems around messy inputs.",
    href: "/projects/business-analytics-dashboard",
    proof: "Business Analytics Dashboard",
  },
  {
    title: ".NET and Business APIs",
    summary: "Backed by layered ASP.NET Core API work with validation, idempotency, audit logging, Entity Framework, and integration tests.",
    href: "/projects/ledger-okcu",
    proof: "Ledger OKCU",
  },
  {
    title: "Applied AI Features",
    summary: "Best for product-facing AI work where models need structured outputs, trust signals, and a real software workflow around them.",
    href: "/projects/medscribe",
    proof: "Medscribe",
  },
];
