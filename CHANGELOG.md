# Changelog

## 2026-07-21 — Living Adrian / Petrova field revision

- Replaced the static blue planetary horizon with a mode-aware Canvas2D environment.
- Planet Adrian now renders layered lime/citrine aurora curtains with slow turbulence, luminous folds, warm storm accents, and pointer-responsive ship parallax.
- Petrova line mode now uses a separate crimson contour, orbital, scan, waveform, and traveling-signal renderer instead of a cosmetic grid overlay.
- Added an explicit two-option visual instrument in the hero and made the mobile navigation toggle close before revealing the selected field.
- Added pre-paint mode restoration, atomic DOM/state updates, cross-tab reset handling, hidden-tab and offscreen pausing, a 24–30 fps cap, DPR limiting, and a static reduced-motion frame.
- Removed the supplied film stills from the shipped site and repository; the environmental artwork is now entirely code-native.
- Replaced the remaining navy/cyan section surfaces with mode-aware forest/citrine and oxblood/crimson tokens so the palette stays coherent through every route and footer.
- Refreshed the 34-second walkthrough so it opens on both Adrian and Petrova before descending through the portfolio.

## 2026-07-21 — Planetary observatory overhaul

### Experience

- Replaced the generic landing page with a full-height Planet Adrian arrival, atmospheric CSS art, moon, aurora, clouded horizon, and restrained pointer parallax.
- Added persisted Planet Adrian / Petrova observation modes, live announcements, Signal 04 progression, and a temporary `lumos` light interaction.
- Added responsive, keyboard-safe global navigation with a skip link and Escape handling.
- Added a lazy Spotify capsule and a separately loaded pointer/keyboard basketball game with local best-score persistence and reset.

### Portfolio content

- Rewrote and reordered project content around verified evidence from the current repositories and résumé.
- Promoted Fuzzy, Buzzr, Credit Union Ledger API, and Business Analytics Dashboard as the four primary records.
- Added Blended and retained Graph Link Prediction, Medscribe, and PixelDraw as supporting records.
- Removed unsupported PA GPA metrics and stale public Buzzr repository/TestFlight links.
- Added explicit limitations, learnings, and next steps to every project case study.
- Corrected education language to “incoming M.S. in Computer Science” for the August 2026 start.

### Media

- Added genuine Fuzzy captures from an isolated temp profile and deterministic mock-provider workflow: two 1440×900 WebP images plus a 12-second H.264 recording.
- Replaced stale Buzzr assets with direct current mobile captures from the product repository.
- Optimized the portrait and analytics capture to WebP.
- Generated and wired a custom 1200×630 planetary social card.
- Added repeatable Fuzzy capture, portfolio walkthrough, and AVFoundation encoding scripts.
- Added final desktop, tablet, mobile, archive, Lighthouse, and repeatable walkthrough artifacts.

### Engineering

- Split the former client-heavy homepage into server-composed sections and small interaction islands.
- Restored production TypeScript enforcement and Next image optimization.
- Upgraded Next.js from 16.1.6 to 16.2.10, upgraded PostCSS, overrode the vulnerable transitive Lodash release, and reached a zero-vulnerability `npm audit` result.
- Added deterministic game-physics tests and a single `npm run check` release command.
- Added sitemap, robots, manifest, canonical metadata, JSON-LD, social metadata, and explicit icons.
- Updated project detail pages to show all screenshots and local/external video rather than hiding media after the first image.
- Made Vercel Analytics environment-aware so local production runs remain console-clean.

### Validation

- `npm run check`: pass.
- `npm audit`: zero known vulnerabilities.
- Desktop Lighthouse after remediation: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO. Mobile: 95 Performance and 100 for the other three categories. Both captured runs had 0 ms total blocking time and 0 cumulative layout shift.
- Browser checks covered mode persistence, progressive signal state, typed Lumos, mobile disclosure/Escape, lazy Spotify loading, game interaction/reset, case-study media, routes, and responsive screenshots.

### Repository recovery

- Reconstructed the branch from remote `main`, preserved the damaged metadata as a recoverable backup, and pushed the validated overhaul through draft PR #1.
