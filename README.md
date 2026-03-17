# Rushil Gangisetty Portfolio

Personal portfolio site built with Next.js App Router and deployed to Vercel.

The site is designed for recruiter and hiring-manager review. It focuses on a small set of high-signal projects, a recruiter-ready resume, practical writing, and a direct contact path.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Framer Motion
- MDX
- Zod
- Resend

## Routes

- `/` home page with positioning, featured work, skills, experience, resume CTA, blog preview, and contact CTA
- `/projects` curated project catalog
- `/blog` MDX blog index
- `/blog/[slug]` blog post pages
- `/resume` recruiter-facing resume page with embedded PDF
- `/contact` direct contact page with optional form delivery
- `/api/contact` validated contact endpoint
- `/sitemap.xml`, `/robots.txt`, and generated Open Graph images

## Content Sources

- Projects and experience: [`/Users/rushilgangisetty/Desktop/Projects/rushil-gangisetty-portfolio/src/lib/content.ts`](/Users/rushilgangisetty/Desktop/Projects/rushil-gangisetty-portfolio/src/lib/content.ts)
- Site profile and metadata: [`/Users/rushilgangisetty/Desktop/Projects/rushil-gangisetty-portfolio/src/lib/site-config.ts`](/Users/rushilgangisetty/Desktop/Projects/rushil-gangisetty-portfolio/src/lib/site-config.ts)
- Blog posts: `src/content/blog/*.mdx`
- Resume PDF: `public/resume/rushil-gangisetty-resume.pdf`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` into `.env.local` when you want to enable production contact delivery.

```bash
NEXT_PUBLIC_SITE_URL=https://rushil-gangisetty-portfolio.vercel.app
CONTACT_FROM_EMAIL=Portfolio Contact <portfolio@yourdomain.com>
CONTACT_TO_EMAIL=gangisettyrushil@gmail.com
RESEND_API_KEY=
```

If the Resend variables are missing, the site falls back to direct email and LinkedIn links instead of exposing a broken form.

## Quality Checks

```bash
npm test -- --runInBand
npm run lint
npm run typecheck
npm run build
```

## Project Structure

```text
src/
  app/            routes, metadata, API route, SEO files
  components/     reusable UI building blocks
  content/blog/   MDX posts
  lib/            typed portfolio data and helpers
  types/          content interfaces
public/
  projects/       project screenshots
  resume/         downloadable resume PDF
```

## Deployment

Deploy on Vercel.

1. Import the GitHub repo into Vercel.
2. Add the environment variables from `.env.example` if you want the contact form enabled.
3. Set `NEXT_PUBLIC_SITE_URL` to the final production URL.

## Current Scope

- Five curated flagship projects
- Three seeded MDX blog posts
- Resume page with downloadable PDF
- Contact API with validation and safe fallback behavior
- Generated metadata, sitemap, robots, and Open Graph assets
