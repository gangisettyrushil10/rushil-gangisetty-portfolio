export type SocialLink = {
  label: string;
  href: string;
};

export type ProfileConfig = {
  name: string;
  title: string;
  location: string;
  availability: string;
  summary: string;
  email: string;
  resumePath: string;
  socialLinks: SocialLink[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectCategory = "Product" | "Data" | "AI";

export type ProjectEntry = {
  slug: string;
  title: string;
  oneLine: string;
  longSummary: string;
  spotlight: string;
  stack: string[];
  metrics: ProjectMetric[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  image?: string;
  imageAlt?: string;
};

export type ExperienceEntry = {
  company: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type AdditionalWork = {
  title: string;
  summary: string;
  githubUrl: string;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
};

export type PostEntry = PostFrontmatter & {
  readingTime: string;
};

export type PostWithContent = PostEntry & {
  content: string;
};
