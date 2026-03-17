import type { ProfileConfig } from "@/types/content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://rushil-gangisetty-portfolio.vercel.app";

export const siteName = "Rushil Gangisetty";
export const siteTagline = "Software engineer building product, data, and AI systems.";
export const siteDescription =
  "Rushil Gangisetty is a software engineer focused on product development, data systems, and applied AI. Explore projects, writing, resume, and contact details.";

export const profile: ProfileConfig = {
  name: "Rushil Gangisetty",
  title: "Software Engineer building product, data, and AI systems.",
  location: "Dallas, Texas",
  availability: "Open to software engineering roles and internships.",
  summary:
    "I build polished user-facing products, data-heavy systems, and practical machine learning projects. My work sits at the intersection of product delivery, reliability, and measurable engineering impact.",
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
  { value: "5", label: "curated flagship projects" },
  { value: "3", label: "software engineering internships" },
  { value: "50K+", label: "daily records supported in production workflows" },
  { value: "90K+", label: "lines across my largest shipped codebase" },
];
