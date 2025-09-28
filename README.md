# Terminal Portfolio

Minimal portfolio built with Next.js 15 and exported as a static site.

## Quick start

- Requirements: Node.js 20+, npm 10+
- Install: `npm ci` (or `npm install`)
- Dev: `npm run dev` → http://localhost:3000

## Build

- Build app: `npm run build`
- Static export: with `output: "export"` enabled, the static site is emitted to `out/`
- Lint: `npm run lint`

## Deploy (GitHub Pages)

Already wired via GitHub Actions. Pushing to `main` builds and publishes `out/` to Pages.

- Project page URL: https://bsowlx.github.io/terminal-portfolio/

Notes
- `next.config.ts` reads `NEXT_BASE_PATH` and `NEXT_ASSET_PREFIX` which the workflow sets for project pages.
- CI uses a non-Turbopack build (`npm run build:ci`) for reliability.
This project is configured to deploy to GitHub Pages via GitHub Actions.
