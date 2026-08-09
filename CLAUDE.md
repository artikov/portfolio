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

All visible copy now comes from **one content document**, reached through
`getContent()` in `src/lib/content/store.ts`. Nothing else knows where content
is stored.

```
src/lib/content/
  schema.ts   types + parseSiteContent validator + homepageProjects/archiveProjects
  seed.ts     the content the site ships with; served whenever the store is empty
  store.ts    Vercel Blob read/write, unstable_cache'd under the 'site-content' tag
```

To change copy today, edit `seed.ts` — the admin panel that writes the stored
document is Stage B onwards. Both pages, `layout.tsx` metadata, the Person
JSON-LD, `sitemap.ts`, `robots.ts` and `opengraph-image.tsx` all `await
getContent()`; the site URL now exists once, at `settings.siteUrl`.

**`src/data/*` is dead.** It is kept only as the reference the seed was
transcribed from, and is deleted at step 25. Editing it changes nothing.

Homepage projects and archive rows are **one `Project` record** with
`onHomepage` / `inArchive` and a separate `homepageOrder` / `archiveOrder` —
the two surfaces sort the same six projects differently.

Prose (About paragraphs, footer) is plain text with exactly two pieces of
markup, `[label](https://…)` and `{cs2}`, rendered by `renderProse` in
`components/Prose.tsx`. Everything else becomes a React text node. This is
deliberately not `dangerouslySetInnerHTML` and must not become it — stored prose
is untrusted input.

Project images are `{ url, width, height, alt }`. The seed still derives them
from static imports (the bundler resolves those at build time, so a stored
record never can), but the renderer only ever sees the plain shape.

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

An admin panel is being built. The full plan — what becomes dynamic and a
26-step sequenced build order with risk flags — is in
[docs/admin-panel-plan.md](docs/admin-panel-plan.md), which is the source of
truth. Read it before changing how content is loaded, auth, or anything under
`/admin`. Update its checkboxes as steps land, and record decisions there rather
than only in chat.

**Stage A (steps 1–4) is done**: content flows through the store and the
rendered output is byte-identical to the pre-migration site. Nothing is editable
yet — that is the point, every later stage is additive. **Next up: step 5**,
password hashing.

Storage is Vercel Blob. `BLOB_READ_WRITE_TOKEN` is optional: without it the
store serves the seed and refuses writes, which is what lets CI and a fresh
clone build with no secrets. It must be set in production, or the site quietly
serves seed content instead of saved content.
