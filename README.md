# Rushil Gangisetty — Personal Observatory

A cinematic, evidence-led software-engineering portfolio for Rushil Gangisetty. The site frames project work as an observatory archive: calm planetary atmosphere on the surface, inspectable engineering decisions underneath.

Production URL: [rushil-gangisetty-portfolio.vercel.app](https://rushil-gangisetty-portfolio.vercel.app)

## What ships

- A responsive planetary landing experience with CSS-built atmosphere, moon, cloud bands, aurora, and restrained pointer parallax
- Persisted Planet Adrian / Petrova observation modes with an accessible switch and a progressive hidden signal
- Four primary case studies: Fuzzy, Buzzr, Credit Union Ledger API, and Business Analytics Dashboard
- Supporting records for Blended, Graph Link Prediction, Medscribe, and PixelDraw
- Code-native system diagrams, capability bands, experience, education, personal context, and direct contact paths
- Genuine project media: locally captured Fuzzy screenshots and recording, current Buzzr mobile captures, an analytics workflow capture, and the existing Medscribe presentation
- Optional, lazy-loaded Spotify and basketball modules
- Project detail pages that render every gallery item, local video, external video, limitations, learnings, and next steps
- Static sitemap, robots policy, web manifest, canonical metadata, JSON-LD, social card, responsive images, and Vercel Analytics in Vercel environments

The interface does not depend on JavaScript for its core project content. JavaScript is isolated to navigation state, observation mode, subtle pointer response, Spotify loading, and the optional game.

## Stack

- Next.js 16.2.10 App Router
- React 19.2
- TypeScript in strict mode
- Tailwind CSS 4 plus authored component CSS
- Lucide icons
- Vercel Analytics
- Node’s built-in test runner
- Playwright for repeatable media capture
- AVFoundation for local H.264 encoding on macOS

## Run locally

Prerequisites: Node.js 20.9 or later and npm 10.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The website itself requires no secrets or external services.

For a production-equivalent local preview:

```bash
npm run build
npm start
```

## Release checks

```bash
npm run check
npm audit
```

`npm run check` runs strict TypeScript validation, deterministic game-physics tests, and the optimized production build. The July 21, 2026 review also used Lighthouse against the production build and saved the report under `artifacts/portfolio-review/`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Observatory homepage and selected work |
| `/projects` | Complete project archive |
| `/projects/[id]` | Evidence, media, decisions, limits, and next steps |
| `/resume` | Browser-readable résumé |
| `/resume.pdf` | Stable redirect to the current PDF |
| `/contact` | Direct email and professional links |
| `/sitemap.xml` | Search-engine sitemap |
| `/robots.txt` | Crawl policy |
| `/manifest.webmanifest` | Install metadata |

## Architecture

```text
app/
├── layout.tsx                    metadata, providers, global navigation
├── page.tsx                      server-composed homepage
├── projects/                     project index and static case studies
├── resume/                       browser résumé
├── resume.pdf/                   stable PDF redirect
├── contact/                      dedicated contact route
├── sitemap.ts                    generated sitemap
├── robots.ts                     crawl policy
└── manifest.ts                   web-app manifest

components/observatory/
├── observation-provider.tsx      persisted mode, Signal 04, Lumos
├── site-nav.tsx                  responsive accessible navigation
├── planetary-hero.tsx            hero interaction island
├── project-archive.tsx           editorial case-study chapters
├── technical-systems.tsx         code-native architecture diagrams
├── capability-bands.tsx          capability → tool → proof mapping
├── about-observatory.tsx         profile and personal context
├── flight-path.tsx               experience and education
├── soundtrack-capsule.tsx        click-to-load Spotify embed
├── basketball-game.tsx           keyboard/pointer mini-game
└── contact-transmission.tsx      final contact path

lib/
├── data.ts                       verified project and résumé content
├── portfolio-content.ts          homepage hierarchy and editorial copy
└── game-physics.js               pure, tested game functions

public/media/
├── portrait-rushil.webp
└── projects/                     optimized project media

scripts/
├── capture-fuzzy-media.mjs       isolated authentic Fuzzy capture
├── capture-portfolio-walkthrough.mjs
└── frames-to-video.swift         reusable H.264 encoder
```

Legacy components remain in the repository for reference, but the homepage is composed from the focused `components/observatory/` system and keeps static sections on the server.

## Content and evidence policy

Project data lives in `lib/data.ts`; homepage ordering and system narratives live in `lib/portfolio-content.ts`.

When changing a project:

1. Link public source or a functioning live surface when one exists.
2. Separate implemented behavior, current limitations, and next steps.
3. Do not publish usage, accuracy, revenue, performance, or impact figures without a traceable source.
4. Prefer direct screenshots and recordings over fabricated UI mockups.
5. Put optimized media in `public/media/projects/<project>/` and preserve the capture evidence under `artifacts/project-capture/`.
6. Run `npm run check` and repeat the responsive browser review.

Known editorial assumptions are intentionally explicit:

- UT Dallas M.S. enrollment begins in August 2026, so current copy says “incoming.”
- “Intelligent systems” is described as an area of focus, not a confirmed transcript concentration.
- The Spotify capsule uses Spotify’s public editorial “Deep Focus” playlist because no verified Rushil-owned playlist was available.
- Buzzr’s former TestFlight invitation and public repository links no longer resolve, so the site links only the functioning web demo and labels the repository as private.
- PixelDraw is presented as in progress until a clean runtime and release capture are verified.

## Observation and easter eggs

- The navigation control switches between the atmospheric Planet Adrian view and the instrument-forward Petrova view.
- Mode preference and exploration count persist in local storage.
- The fourth mode switch reveals `Signal 04`.
- Typing `lumos` outside an editable control creates a temporary light bloom and an `aria-live` announcement.
- Reduced-motion preferences disable drifting, scanning, and parallax effects.

## Genuine media capture

### Fuzzy

`npm run capture:fuzzy` launches the built sibling `../Fuzzy` Electron application with a fresh temporary profile, deterministic mock provider, and bundled sample PDF. It never opens the normal Fuzzy profile and removes provider keys from the child environment.

Prerequisites are documented at the top of `scripts/capture-fuzzy-media.mjs`. The output is:

- `public/media/projects/fuzzy/cover.webp`
- `public/media/projects/fuzzy/workflow.webp`
- `public/media/projects/fuzzy/demo.mp4`
- timestamped source frames and metadata under `artifacts/project-capture/fuzzy/`

### Portfolio walkthrough

With the production build running at `127.0.0.1:3000`:

```bash
npm run capture:walkthrough
```

The script uses installed Playwright plus system Chrome, records a 31.5-second responsive desktop path, and encodes it with the shared Swift script. Override `PORTFOLIO_URL` or `CHROME_EXECUTABLE` when needed.

## Accessibility and performance guardrails

- Semantic headings, landmarks, labels, captions, and visible keyboard focus
- Skip link and Escape-aware mobile navigation
- Minimum 44px interactive targets in the global navigation
- No forced audio or autoplay video
- Core project copy remains server-rendered HTML
- Spotify and the game load only after intent
- Local project images use Next image optimization; WebP source assets are dimensioned to their real display role
- Mobile/coarse-pointer styles disable parallax and costly scanning animations
- `prefers-reduced-motion` collapses all nonessential animation

## Deployment

The existing deployment target is Vercel. Import the repository, use the detected Next.js settings, and run the default build command (`npm run build`). No runtime environment variables are required for the site. Vercel Analytics is rendered only when the `VERCEL` environment marker is present, avoiding false console failures in local production QA.

Before production promotion, verify:

- the canonical production hostname in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`;
- the latest résumé PDF filename and redirect;
- any project status or externally hosted link that may have changed;
- a fresh Lighthouse and responsive browser pass.

## Repository note

The working copy used for the July 2026 overhaul has a damaged local Git object database (`git status` cannot read one historical tree). The application source, build, and generated artifacts are intact, but Git history should be repaired by fetching the missing objects or recloning before attempting a commit or pull request.

## License and media

Project screenshots and Rushil’s portrait are portfolio materials. The generated social-card landscape is original to this site. Source-code licensing should be added explicitly before reuse outside this portfolio.
