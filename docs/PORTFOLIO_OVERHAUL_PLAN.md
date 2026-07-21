# Portfolio Overhaul — Implementation Note

## North star

The portfolio should feel like a quiet scientific observatory on the edge of a
habitable world: atmospheric and memorable on first contact, then increasingly
concrete as a recruiter moves into the project evidence.

The visual system uses CSS rather than WebGL for the sky, aurora, atmospheric
horizon, orbital marks, and Petrova observation state. This keeps essential
content in the document, avoids a large 3D runtime, and makes reduced-motion and
low-power behavior straightforward.

## Information architecture

1. A planetary hero with Rushil's role, value proposition, primary links, and a
   persistent Observation Mode control.
2. An editorial mission archive led by Fuzzy, followed by evidence-backed
   product, fintech/backend, data, and ML work.
3. A systems section that explains three real architectures: Fuzzy's Electron
   boundaries, the ledger's idempotent write path, and the analytics validation
   pipeline.
4. A concise personal operating system, demonstrated capabilities, and flight
   path for experience and education.
5. Optional personal signals: a Spotify focus transmission, a lazy basketball
   mini-game, and a hidden `Lumos` keyboard interaction.
6. A direct final contact transmission.

## Content rules

- Claims come from the current resume, source repositories, or working public
  links. Stale test counts and broken TestFlight/private-repository links are
  removed.
- Case studies separate current behavior, limits, and next work.
- Screenshots are treated as evidence. Media labels must describe what is
  actually visible, and diagrams are explicitly labeled as diagrams.
- Project copy lives in `lib/data.ts`; interface copy specific to the experience
  lives in `lib/portfolio-content.ts`.

## Interaction rules

- Observation Mode persists locally and changes the instrument layer, waveform,
  orbital markings, and color response without reloading.
- Pointer parallax affects decorative layers only and is disabled for reduced
  motion and coarse pointers.
- The basketball game is loaded only after a visitor opens it and always offers
  a keyboard shot action.
- Spotify is an official embed with a static link fallback; it is lazy-loaded
  outside the first viewport.
- `Lumos` is discoverable only through exploration and never gates content.

## Performance and accessibility guardrails

- No WebGL or autoplay audio.
- No essential content inside decorative layers.
- Large media has explicit dimensions and lazy loading.
- All motion uses opacity or transforms and stops under reduced motion.
- Touch targets are at least 44px, focus is visible, headings remain logical,
  and every media item has an external caption.
- The initial page ships only the core observatory interaction; the game and
  Spotify frame are deferred.

## Known source constraints

- The local Git object database is partially unavailable, so validation cannot
  rely on `git status` or full history until the repository is rehydrated or
  repaired.
- Buzzr's public demo works, while its repository and old TestFlight links are
  not public and therefore are not presented as live links.
- Personal Spotify history or a verified Rushil-owned playlist was not present.
  The initial capsule uses Spotify's public Deep Focus editorial playlist and
  is deliberately labeled as a focus frequency rather than personal listening
  history.
