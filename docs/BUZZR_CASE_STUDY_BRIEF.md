# Buzzr Case Study — Agent Brief

You are writing a single section of a long-form case study page for **Rushil Gangisetty's** portfolio. The portfolio exists at `/Users/rushilgangisetty/rushil-gangisetty-portfolio` and the target file is **[app/projects/buzzr/buzzr-content.tsx](../app/projects/buzzr/buzzr-content.tsx)**.

Read this entire brief before writing anything. Then follow the rules and use only the primitives listed below.

---

## Hard rules (read these first, they matter)

1. **Never reproduce copy from sarveshsea.site verbatim.** The user will paste a section of Sarvesh Chidambaram's published Buzzr case study as a reference. Match its **structure, section layout, data presentation, and visual rhythm** exactly. Write the **prose fresh** in Rushil's voice. If Sarvesh's section contains a specific phrasing, paraphrase — don't lift.
2. **Engineering POV, not design POV.** Sarvesh is a product designer and wrote his case study about personas, figma iterations, and user testing. Rushil is a software engineer. His angle is the backend, the APIs, the realtime architecture, the migrations, the edge functions, the deployment. When Sarvesh's section talks about "design decisions," Rushil's equivalent is "engineering decisions." When Sarvesh shows persona cards, Rushil shows system-actor cards (user, realtime publisher, edge function, database). Translate the structural slot, not the vocabulary.
3. **Use existing primitives only.** Do not introduce new components, new CSS classes, or new npm packages. Every visual pattern you need is already available (see inventory below). If a pattern you want doesn't exist, tell the user — don't fabricate.
4. **Output a self-contained JSX block** (not a full file). The user pastes it into the matching `§ N` slot in [buzzr-content.tsx](../app/projects/buzzr/buzzr-content.tsx). Wrap in a `<section>` with `py-16 sm:py-24` and a commented marker like `{/* § N — SECTION NAME */}` at the top.
5. **Never import from lib/data.ts inside a section** — `project` is already destructured at the top of buzzr-content.tsx and passed in scope. Reference `project.metrics`, `project.stack`, `project.outcomes`, etc. directly. If you need a fact that isn't on the project, pull it from the fact pack below and hardcode the string.
6. **Don't add images to `public/`** — placeholder divs with aspect ratios + `bg-bg-card-muted` + dashed border are fine. The user drops real files in later.
7. **Respect the dark theme.** Use the tokens (`text-foreground`, `text-muted-foreground`, `text-subtle-foreground`, `text-accent`, `bg-bg-card`, `bg-bg-card-muted`, `border-(--pill-border)`, `border-(--border-strong)`). Avoid inventing arbitrary hex.
8. **Mono for anything numeric or labelly** (timestamps, stack tags, stat labels, captions). Use `font-mono` or `className="font-mono text-[11px] uppercase tracking-[0.14em]"` pattern.
9. **Serif italic for editorial accents** — `font-serif-italic` class, sparingly, on 1–2 emphasis phrases per section max.
10. **Reveal every block.** Wrap children in `<Reveal>` or `<Reveal delay={N}>` with cascading delays (0, 80, 160, 240 ms) so sections stagger-animate on scroll entry.

---

## Design system snapshot

### Palette (all tokens already defined in [app/globals.css](../app/globals.css))

- `--background` `#0a0a0b` (body bg — do not override)
- `--bg-card` `#111114` (default tile surface)
- `--bg-card-muted` `#16161a` (sunken tile surface)
- `--foreground` `#f5f5f7`
- `--muted-foreground` `rgba(245,245,247,0.6)`
- `--subtle-foreground` `rgba(245,245,247,0.38)`
- `--accent` `#00e5ff` (electric cyan — the only saturated accent)
- `--accent-hover` `#4dedff`
- `--border` `rgba(255,255,255,0.08)` (default subtle)
- `--pill-border` `rgba(255,255,255,0.1)` (dashed borders use this)
- `--border-strong` `rgba(255,255,255,0.18)` (hover state)

Tailwind utility names available: `bg-background`, `bg-bg-card`, `bg-bg-card-muted`, `bg-bg-card-raised`, `text-foreground`, `text-muted-foreground`, `text-subtle-foreground`, `text-accent`, `bg-accent`, `border-accent`.

### Fonts

- **Space Grotesk** — default sans, body + headings. Just `font-sans` (default, no class needed) or weight classes `font-normal` / `font-medium` / `font-semibold`.
- **IBM Plex Mono** — `font-mono`. Use for numbers, timestamps, kbd hints, stack chips, section kickers, captions.
- **Instrument Serif** (italic) — `font-serif-italic`. Use sparingly for 1–2 emphasis phrases per section.

### Motion (already wired globally)

- 3 drifting aurora orbs (cyan/violet/magenta) + grain overlay render behind every page — mounted in [layout.tsx](../app/layout.tsx). **Do nothing here.**
- Every section block should be wrapped in `<Reveal>` for scroll-entry fade + translate.
- Use `<DashedDivider />` between major sections (animates scaleX on entry).
- `.status-pulse` class on dots → always-on pulse.

---

## Component inventory (all importable, file paths relative to repo root)

### Scroll + reveal primitives

```tsx
import { Reveal } from '@/components/ui/reveal'
// <Reveal delay={80} className="...">{children}</Reveal>
// delay in ms, default 0. Renders a div with scroll-entry translate+fade.
// Use `as="section"` / `as="article"` / `as="header"` to change tag.

import { DashedDivider } from '@/components/ui/dashed-divider'
// <DashedDivider className="my-14" />
// Horizontal dashed line, animates scaleX 0 → 1 on viewport entry.
```

### Text effects

```tsx
import { TextCycle } from '@/components/ui/text-cycle'
// <TextCycle words={['ship things', 'build products']} intervalMs={2800} className="..." />
// Rotates words with a blur-swap every intervalMs. Use at most once per section.

import { Marquee } from '@/components/ui/marquee'
// <Marquee items={['React Native', 'Supabase', 'Postgres', ...]} />
// Infinite horizontal ticker. Pauses on hover. Good between dense sections for rhythm.
```

### iMessage thread (for § 3 origin section)

```tsx
import { iMessageThread } from '@/components/ui/imessage-thread'
// Shape:
// <iMessageThread
//   header="Sun 3:42 PM"
//   participants={[
//     { id: 'rushil', name: 'Rushil', side: 'right' },
//     { id: 'sarvesh', name: 'Sarvesh', side: 'left' },
//     { id: 'mike', name: 'Mike', side: 'left' },
//   ]}
//   messages={[
//     { fromId: 'rushil', text: 'okay hear me out', readReceipt: true },
//     { fromId: 'sarvesh', text: 'go' },
//   ]}
// />
// Bubbles animate in with stagger. Right-side = iMessage blue. Left = dark gray.
```

### Ambient pills (use in § 2 overview or callouts)

```tsx
import { LiveTimePill, LocationPill, NowBuildingPill, LatestCommitPill } from '@/components/organisms/live-pills'
// Self-contained. Drop anywhere you want a live status indicator.
```

### CSS utility classes (no import needed, defined in globals.css)

- `.bento-grid` — `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 14px;`. Children use `col-span-12` + `md:col-span-N` (where N is 3–8 or 12).
- `.bento-cell` — dashed-border tile with hover lift and cyan glow. Default padding handled by parent, usually add `p-5` or `p-6`.
- `.bento-cell.bento-sunken` — uses `--bg-card-muted` (for secondary tiles in a group).
- `.bento-cell.bento-no-scale` — disable hover lift (use for hero tile, signature CTA tile).
- `.section-label` — mono uppercase kicker chip. `<span className="section-label">Overview</span>`.
- `.pill` — rounded status pill. Includes glass bg, dashed-ish border.
- `.pill-dot` — 6px pulsing cyan dot for inside pills.
- `.btn-glow` — cyan glowing CTA button. Apply with `className="btn-glow inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"`.
- `.accent-link` — inline link with cyan underline + glow on hover.
- `.text-shimmer` — animated shimmer gradient text (use once max on a headline word).
- `.kbd` — small inline kbd badge.
- `.tile-float` — continuous subtle up-down float (use on 1 tile max per section for ambient motion).

---

## Buzzr fact pack (source of truth — use these exact facts)

```typescript
const project = {
  id: 'buzzr',
  title: 'Buzzr',
  category: 'Product Software',
  role: 'Sole builder — product, mobile, web, backend',
  timeline: 'Oct 2025 – Present',
  status: 'Active build',

  longDescription:
    'Built a cross-platform sports social app from scratch with Expo, React Native, Next.js, and Supabase. Supports 7 live league integrations across 20+ REST endpoints, 38 SQL migrations, and 15+ relational tables. Architected real-time watch party and social features using Supabase Edge Functions, Postgres triggers, and live subscriptions. Built 9 Edge Functions, 70+ reusable UI components, and deployed across iOS and Web with CI/CD and production monitoring.',

  stack: [
    'React Native', 'TypeScript', 'Supabase', 'Expo',
    'PostgreSQL', 'Next.js', 'Edge Functions', 'CI/CD',
  ],

  metrics: [
    { label: 'Beta testers', value: '18' },
    { label: 'Live leagues', value: '7' },
    { label: 'REST endpoints', value: '20+' },
    { label: 'SQL migrations', value: '38' },
  ],

  challenge:
    'The product needed live data, identity, ratings, and social activity to stay coherent across mobile and web as features expanded.',

  decisions: [
    'Built on Supabase and Postgres to move quickly while keeping auth, realtime updates, and data modeling in one place.',
    'Architected real-time features using Edge Functions, Postgres triggers, and live subscriptions.',
    'Shared types and validation across mobile and web so product behavior stayed aligned.',
    'Made entertainment-based ratings the core interaction so the product had a distinct point of view.',
  ],

  outcomes: [
    'Shipped to Apple TestFlight with 18 external beta testers.',
    'Supports 7 live leagues across 20+ REST endpoints, 38 SQL migrations, and 15+ relational tables.',
    'Built 9 Edge Functions, 70+ reusable UI components, deployed across iOS and Web with CI/CD.',
  ],

  learnings: [
    'In multi-surface products, data contracts matter as much as interface polish.',
    'Realtime features only feel good when failure states are handled deliberately.',
    'A clear product concept should show up in every core interaction.',
  ],

  githubUrl: 'https://github.com/gangisettyrushil10/Buzzr',
  liveUrl: 'https://buzzr-desktop.vercel.app',
  links: [
    { label: 'Mobile repo', href: 'https://github.com/gangisettyrushil10/Buzzr' },
    { label: 'Web companion', href: 'https://github.com/gangisettyrushil10/buzzr_desktop' },
    { label: 'Live site', href: 'https://buzzr-desktop.vercel.app' },
  ],
  storeLinks: [
    { label: 'TestFlight', status: 'Live on TestFlight' },
    { label: 'App Store', status: 'Planned release' },
  ],

  gallery: [
    { label: 'Home feed', alt: 'Buzzr mobile home feed', caption: 'Feed for browsing live games, ratings, and follow activity.', src: '/projects/buzzr-home.png' },
    { label: 'Game detail', alt: 'Buzzr game detail view', caption: 'Game detail screen combining live context, community ratings, and discussion.', src: '/projects/buzzr-games.png' },
    { label: 'Social layer', alt: 'Buzzr watch party and social views', caption: 'Watch-party and social views that turn the app into a shared experience.', src: '/projects/buzzr-party.png' },
  ],

  recruiterAngle: 'Best proof of product judgment, full-stack ownership, and sustained iteration.',
  proofLine: 'Broadest and most current product system in my public work.',
  previewTitle: 'Live sports social product',
  previewNote: 'Mobile and web surfaces share one product model and backend.',
}

// Personal context (if ever needed inside a section)
const personalInfo = {
  name: 'Rushil Gangisetty',
  title: 'Software Engineer',
  location: 'Dallas, Texas',
  email: 'gangisettyrushil@gmail.com',
  github: 'https://github.com/gangisettyrushil10',
  linkedin: 'https://www.linkedin.com/in/rushilgangisetty10',
}
```

---

## Section map (structural parallel to sarveshsea.site/work/buzzr — Rushil's equivalent)

| §  | Sarvesh's section (structure only)      | Rushil's equivalent content focus                                                   |
|----|-----------------------------------------|-------------------------------------------------------------------------------------|
| 1  | Hero with 3 phone mockups, title, tagline | Same layout. Title "Buzzr". Engineering tagline. 3 placeholder phone frames.       |
| 2  | Overview: role / timeline / scope / stack | Bento grid with: role, timeline, status, stack chips, metrics row                 |
| 3  | Origin — iMessage thread                 | `<iMessageThread>` component, Rushil pastes real bubbles                           |
| 4  | Problem — stat cards + narrative         | Product-scope stats (leagues / endpoints / migrations) + engineering pain reframe  |
| 5  | Competitive landscape — feature table    | Technical axes comparison (alt approaches Rushil considered vs what he chose)      |
| 6  | User testing — 2-col metrics + screenshot | TestFlight metrics + a rollout/debugging screenshot placeholder                    |
| 7  | Opportunity — 3 persona cards            | 3 system-actor cards (user / realtime publisher / edge function)                   |
| 8  | Features & process — alternating grids   | Architecture walkthroughs: auth, realtime, data model, watch party                 |
| 9  | Reflection — 3 subsections               | Engineering learnings, stack choices, what's next (rec engine)                     |

---

## Voice rules (short)

- **First-person.** "I built", "I shipped", "I hit a wall with".
- **Concrete engineering verbs.** Migrated, debounced, indexed, partitioned, subscribed, batched, fan-out, idempotent, eventually-consistent, RLS, RPC, JWT, pub/sub, edge function, trigger.
- **Numbers > adjectives.** "38 SQL migrations" beats "lots of database work." Use project.metrics wherever possible.
- **No marketing.** Avoid: "seamless," "cutting-edge," "powerful," "revolutionary," "passionate." If you catch yourself, rewrite.
- **Short sentences.** One idea per sentence. Longer sentences only for bridging or reflection.
- **No filler intros.** Don't open a section with "When I first started thinking about…" Start with the fact.

---

## Prompt templates (copy into the Agent tool, do not modify the TEMPLATE name)

### Template A — Rewrite a pasted Sarvesh section

```
Read the brief at /Users/rushilgangisetty/rushil-gangisetty-portfolio/docs/BUZZR_CASE_STUDY_BRIEF.md. Follow every rule in it.

You are writing section § {N} of Rushil's Buzzr case study: {SECTION_NAME}.

The user has pasted Sarvesh's equivalent section from sarveshsea.site/work/buzzr below for STRUCTURAL reference only:

<sarvesh-section>
{PASTED_SARVESH_TEXT}
</sarvesh-section>

Your output:
- A single JSX block wrapped in `<section className="py-16 sm:py-24">{/* § {N} — {SECTION_NAME} */}…</section>`
- Uses ONLY the primitives listed in the brief (Reveal, DashedDivider, iMessageThread, Marquee, TextCycle, .bento-grid/.bento-cell, pills, .section-label, .btn-glow, .accent-link).
- Mirrors the STRUCTURE of Sarvesh's section (same layout type: stat cards → stat cards, persona grid → persona grid, etc.), but the copy is written fresh in Rushil's engineering voice using the fact pack.
- Contains NO verbatim phrases lifted from Sarvesh's text. If his section uses a phrase like "X is Y", don't write "X is also Y" — write the underlying engineering point from Rushil's angle.
- For images, use placeholder divs: `<div className="aspect-[4/3] rounded-lg border border-dashed border-(--pill-border) bg-bg-card-muted" />` with an inline caption below in `font-mono text-[11px] tracking-[0.14em] text-subtle-foreground`.
- Wrap every child block in <Reveal> (with delay cascading 0/80/160/240ms) so content staggers in on scroll.
- Max ~120 lines of JSX. Do not include imports (they're handled in the parent).

Return only the JSX block, no explanation.
```

### Template B — Build a placeholder shell for a section the user hasn't pasted yet

```
Read /Users/rushilgangisetty/rushil-gangisetty-portfolio/docs/BUZZR_CASE_STUDY_BRIEF.md.

Build a minimal placeholder for § {N} ({SECTION_NAME}) that renders cleanly in dark mode:
- <Reveal><span className="section-label">{SECTION_NAME}</span></Reveal>
- A single-line italic heading using `font-serif-italic text-muted-foreground` saying "(coming soon)" in ambiguous copy
- Render a single `.bento-cell bento-sunken p-8` tile with a dashed placeholder div inside at aspect-[3/1]

Output JSX only, wrapped in <section className="py-16 sm:py-24">.
```

---

## Definition of done (per section)

- JSX compiles when pasted into [buzzr-content.tsx](../app/projects/buzzr/buzzr-content.tsx)
- Renders at `localhost:3000/projects/buzzr` with no console errors
- Animations visible: Reveal on scroll, divider scaleX, any staggered children
- Responsive: layout collapses to single column at `sm:` and below
- No unused imports, no hardcoded hex colors, no dropped `<Reveal>` wrappers
- No phrase overlap with the pasted Sarvesh source beyond common stack names ("Supabase", "React Native", etc.)
