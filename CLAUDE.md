# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

Personal portfolio for Oybek Artikov, live at [artikov.tech](https://artikov.tech).
Next.js 16 App Router, React 19, Tailwind v4, TypeScript strict, deployed on
Vercel. Two pages, no backend, no database, no auth.

## Commands

```bash
npm ci          # install — single package-lock.json, never add a second lockfile
npm run dev     # dev server, Turbopack
npm run build   # production build
npm start       # serve a production build
npm run lint    # ESLint
```

There is **no test framework**. CI (`.github/workflows/ci.yml`) runs `npm ci`,
`npm run lint` and `npm run build` — that trio is the full verification bar, so
run all three before calling a change done.

## Architecture

```
src/
  app/         routes, metadata, sitemap/robots, OG image
  components/  UI
  data/        content, typed in types.ts
  lib/         shared style strings
public/        CV and project screenshots
```

Routes: `/` (`app/page.tsx`) and `/archive` (`app/archive/page.tsx`), plus
`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `error.tsx`, `not-found.tsx`.

Both pages are **Server Components and statically prerendered**. Only three
components are client components, each for a specific reason:

- `CursorGlow` — writes pointer position straight to a CSS custom property.
  Do not move this into React state; that re-rendered the whole page tree on
  every mousemove.
- `SectionNav` — scroll-spy. Reads absolute geometry every frame *on purpose*.
  An `IntersectionObserver` only fires on visibility *changes*, which silently
  skipped Experience on tall viewports. Don't "simplify" it back.
- `CurrentYear` — the page is prerendered, so a `new Date()` in the server tree
  freezes at build time. It takes `buildYear` for hydration, then corrects on
  the client.

Path alias: `@/*` → `./src/*`.

## Content

`src/data/{projects,experience,site}.ts` hold the structured content, typed in
`types.ts`. Adding a project means adding an entry to `projectsData` (homepage)
or `archivedProjectsData` (`/archive` table), not touching a component.

**Caveat the README understates:** roughly half the visible copy is *not* in
`src/data` — it is inline JSX. The hero block is in `app/page.tsx`, the whole
About section in `components/About.tsx`, footer prose in `Footer.tsx`, social
links in `SocialLinks.tsx`, the nav section list in `SectionNav.tsx`, and all
metadata plus the Person JSON-LD in `app/layout.tsx`. The site URL
`https://artikov.tech` is hardcoded in four files.

`projectsData` and `archivedProjectsData` duplicate title/description/tags for
six projects verbatim. Editing one usually means editing the other.

Project images are **static imports** (`StaticImageData`), so `next/image` can
derive dimensions and avoid layout shift. They are resolved by the bundler at
build time and cannot come from a runtime source.

## Conventions

- Tabs for indentation. Match the surrounding file.
- Tailwind utility classes inline; theme colors are CSS custom properties in
  `globals.css` (`--background`, `--foreground`, `--surface`, `--accent`,
  `--headings`) exposed to Tailwind via `@theme inline`. Use the tokens
  (`text-headings`, `bg-accent/10`), not raw hex.
- External links: use the `ExternalLink` component for prose, or
  `target="_blank" rel="noreferrer noopener"` — never `next/link` off-site.
- Comments in this codebase explain *why*, usually a bug that was fixed. Keep
  that style and don't strip them.

## Security headers

CSP and security headers live in `next.config.ts`. The CSP needs
`'unsafe-inline'` for styles while the cursor gradient is an inline style.
Widening it is a security-relevant change — scope any addition to an exact host.

## Active work

An admin panel is planned but **not started**. The full plan — codebase
analysis, what becomes dynamic, and a 26-step sequenced build order with risk
flags — is in [docs/admin-panel-plan.md](docs/admin-panel-plan.md).

Read that document before changing `src/data`, how content is loaded, auth, or
anything under `/admin`. Two decisions in its "Open decisions" section are
unresolved; do not start step 1 until they are. Update its checkboxes as steps
land, and record new decisions there rather than only in chat.
