# Akshat Kumar — Portfolio

Editorial, motion-led personal portfolio for **Akshat Kumar**, built with Next.js App Router, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lenis, Three.js and React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Set `NEXT_PUBLIC_SITE_URL` in production if you want absolute OpenGraph URLs to use your deployed domain.

## Production checks

```bash
npm run lint
npm run build
npm start
```

## Structure

- `app/` — App Router entry, metadata and global design system
- `components/` — section-level UI, motion and effects
- `data/` — profile, events, experience, projects, articles and skills content
- `lib/` — shared utilities, motion setup and composable hooks
- `public/images/` — replaceable local editorial image placeholders
  - `hero/` — hero collage visuals
  - `projects/` — selected work visuals
  - `events/` — event listing visuals
  - `articles/` — future article visuals
  - `experience/` — experience hover previews

## Replacing content and imagery

All resume-backed copy lives in `data/`. Add or edit event, project, article and experience entries there. The SVG files in `public/images/` are intentionally local, replaceable visual studies; swap them for supplied photography without changing component code. Article links are intentionally left empty until final URLs are provided. The Articles section is currently commented out of the rendered page while its component and data remain available for later. The upcoming event embed is configured in `data/events.ts`.
