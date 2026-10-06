# Admin panel — implementation plan

Status: **Stage A complete.** Both open decisions resolved 2026-08-09.
Written 2026-08-09 against commit `f3574e8` (branch `phase2-audit-fixes`).

This document is the source of truth for the admin-panel work. Update the
checkboxes as steps land, and record decisions here rather than in a chat.

---

## 1. Starting state

Next.js 16.3.0 App Router, React 19, Tailwind v4, TypeScript strict. Three
runtime dependencies: `next`, `react`, `react-icons`. Deployed on Vercel.

| Route | File | Rendering |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Server Component, statically prerendered |
| `/archive` | `src/app/archive/page.tsx` | Server Component, statically prerendered |
| `/robots.txt` | `src/app/robots.ts` | static |
| `/sitemap.xml` | `src/app/sitemap.ts` | static |
| `/opengraph-image` | `src/app/opengraph-image.tsx` | static |

**Auth: none.** No middleware, cookies, sessions, users, `.env`, or env var read
anywhere in `src/`.

**Data layer: none.** No database, route handlers, Server Actions, `fetch`
calls, or forms. Content is four TypeScript modules exporting frozen literals:
`src/data/{types,projects,experience,site}.ts`.

Project images are **static imports** typed as `StaticImageData`. A static
import is resolved by the bundler at build time and cannot come from a
database — this is the main structural obstacle to dynamic content.

### Hardcoded content that is NOT in `src/data`

The README's "content lives in `src/data`" is an overstatement; roughly half the
visible text is inlined in components.

| Content | Location |
| --- | --- |
| Name, job title, hero tagline | `src/app/page.tsx:18-27` |
| About section — 5 paragraphs, 7 inline links | `src/components/About.tsx` |
| Footer prose | `src/components/Footer.tsx` |
| 5 social links + icon mapping | `src/components/SocialLinks.tsx:14-33` |
| Scroll-spy nav section list | `src/components/SectionNav.tsx:5-9` |
| Resume link `/cv.pdf` | `src/components/Experience.tsx:82` |
| "Writing" heading + intro copy | `src/components/OtherItems.tsx` |
| Page metadata, canonical, OG tags | `src/app/layout.tsx:11-27` |
| Person JSON-LD incl. `sameAs` | `src/app/layout.tsx:29-49` |
| `https://artikov.tech`, repeated 4× | layout, robots, sitemap, opengraph-image |
| OG image text + brand colors | `src/app/opengraph-image.tsx` |
| Theme palette (2 commented alternates) | `src/app/globals.css:16-31` |
| CSP + security headers | `next.config.ts` |

**Not present in this codebase:** pricing, users, orders, feature flags,
analytics, forms, comments, i18n. No admin sections were invented for them. The
nearest real equivalent of "feature flags" is section visibility (item 15).

---

## 2. What should become dynamic

Ranked by edit frequency × cost of a code deploy.

### Tier 1 — changes often, pure content

| # | Item | Currently | Why | Control |
| --- | --- | --- | --- | --- |
| 1 | Projects (6) | `projectsData` | Most common edit; needs an image | Sortable table → form: title, description, tags, nullable URL, image upload, published toggle, drag-reorder |
| 2 | Archive projects (15) | `archivedProjectsData` | Same edits, duplicated by hand today | Sortable/filterable table, inline edit: year, company, tags, url, link label |
| 3 | Experience (4) | `experienceData` | Job changes; top entry's date range needs review | List + form: title, company, years, description, tags, link, order |
| 4 | Writing / other items (1) | `otherItemsData` | Same shape as Projects | Reuse Projects table UI |
| 5 | Resume PDF | `public/cv.pdf` | Replacing a CV shouldn't need a git push | File upload (PDF only), version history |

**Note on 1 & 2:** `projectsData` and `archivedProjectsData` duplicate
title/description/tags for six projects verbatim. Once dynamic they should be
**one `projects` table** with `onHomepage` / `inArchive` booleans. This
deduplication is the main structural win of the migration. (See open decision B.)

### Tier 2 — changes occasionally, prose

| # | Item | Currently | Why | Control |
| --- | --- | --- | --- | --- |
| 6 | About paragraphs | `About.tsx` JSX | Longest prose; 7 links that rot | Array of paragraph strings with constrained `[text](url)` syntax through an allowlisted parser — **never** `dangerouslySetInnerHTML`. The CS2 letter animation stays a literal token the renderer recognises |
| 7 | Hero block | `page.tsx` | Name/title/tagline | Three text fields |
| 8 | Footer prose | `Footer.tsx` | Rarely, but it's copy | Same paragraph editor |
| 9 | Social links | `SocialLinks.tsx` | Adding a network means editing an icon import | Table: label, URL, icon from a **fixed enum** of already-imported `react-icons` components (never a dynamic import — defeats tree-shaking, opens code injection), order, visibility |

### Tier 3 — settings

| # | Item | Currently | Why | Control |
| --- | --- | --- | --- | --- |
| 10 | SEO / metadata | `layout.tsx`, page files | Tuned repeatedly, deployed each time | Form with character counters |
| 11 | Site URL | 4 hardcoded copies | Drifts | One field feeding metadata, sitemap, robots, JSON-LD |
| 12 | JSON-LD `sameAs` | `layout.tsx` | Should derive from #9 | Derived — no control |
| 13 | Blog URL | `src/data/site.ts` (TODO: currently 404s) | The literal case for an admin panel | Text field + "check URL" button |
| 14 | OG image text/colors | `opengraph-image.tsx` | Derives from #7, #10 | Derived; preview only |
| 15 | Section visibility | implicit | Hide Writing while the blog 404s without deleting content | Toggle per section, driving the page **and** `SectionNav`'s list |
| 16 | Cursor glow on/off | `CursorGlow.tsx` | Cheap, real toggle | Boolean |
| 17 | Theme palette | `globals.css` | Two alternates sat commented out | Named preset picker. **Optional / low priority** |

### Tier 4 — deliberately NOT dynamic

| Item | Why |
| --- | --- |
| Admin credentials | Env-based by constraint. Self-service password change needs a writable user store; out of scope. Rotation = change env var + redeploy |
| CSP / security headers | Runtime-editable security headers are a vulnerability, not a feature |
| Layout, Tailwind classes, component structure | Not content |

---

## 3. Implementation plan

Conventions: each step ends with a verification check. 🔴 = high-risk (touches
auth or shared production data), 🟡 = medium.

### Decisions — resolved 2026-08-09

**A. Storage backend → Vercel Blob.** `@vercel/blob` is installed; everything
goes through the repository interface in step 3, so Postgres remains a one-file
swap.

**B. Unify Projects and Archive → yes.** One `Project` record with
`onHomepage` / `inArchive`. Because the homepage and the archive order the same
six records differently, the record carries **two** order fields,
`homepageOrder` and `archiveOrder`, not the single `order` sketched below.

#### Deviations taken in Stage A

- **Env validation is per-group and lazy, not at module load.** The public site
  imports the content store during `next build`; validating admin credentials
  eagerly would make the public site unbuildable without secrets, and would have
  put CI red from step 1 until step 26. `src/lib/env.ts` exposes `requireEnv` /
  `optionalEnv`, and only accessors with a live caller exist — the auth ones
  arrive with steps 5–6.
- **No `flags` field in the schema yet.** Nothing reads it until step 20.
- **`BLOB_READ_WRITE_TOKEN` is optional.** Unset, `getContent()` serves the seed
  and `saveContent()` throws. This is what keeps CI and a fresh clone building.
  *Residual risk:* a token missing in production silently serves seed content
  instead of edited content. Step 24 must assert the token is present in
  production.
- **Step 26's dummy CI env vars turn out to be unnecessary.** Because env
  validation is lazy and the Blob token is optional, `npm ci && npm run lint &&
  npm run build` is green with no secrets at all. `.github/workflows/ci.yml` was
  left untouched. Step 26 reduces to the `/admin` redirect smoke test.
- **`settings.blogUrl` was dropped.** `src/data/site.ts` exported `blogUrl` for
  exactly one consumer — the Writing card's `url`. Keeping both would be a
  second field to drift; the URL now lives on the record. Tier 3 item 13 is
  still a labelled field in the admin, just backed by the Writing record.
- **`SectionNav` stayed a single client component** taking `sections` as a prop
  rather than splitting into a server parent and client child. Every row's
  classes depend on the scroll-spy state, so the split would have moved no
  markup to the server.

#### Findings worth carrying forward

- **`revalidateTag` changed in Next 16**: it now requires a `cacheLife` profile
  and expires lazily. `revalidateContent()` uses **`updateTag`**, which expires
  immediately and gives the admin read-your-own-writes — but may only be called
  from a Server Action. Step 10's wrapper is the only caller, so this holds.
- **`.gitignore`'s `.env*` also matched `.env.example`**, which would have kept
  the template out of the repo entirely. Fixed with a `!.env.example` negation.
- **JSON-LD `sameAs` order changed.** It derives from the social links now
  (item 12), and the icon row orders Instagram before X while the old literal
  did the reverse. Order is not meaningful in `sameAs`; the five URLs are
  unchanged.
- **A seed edit could be served stale (found and fixed 2026-10-06).**
  `unstable_cache` keys on the wrapped function's source plus the key parts,
  not on data the function closes over, and it persists entries in
  `.next/cache/fetch-cache`. That directory survives `npm run build` and Vercel
  restores it between deploys. With the fixed key `['site-content']`, a rebuild
  after editing `seed.ts` without `rm -rf .next` prerendered the old seed text,
  and a seed-only deploy could have shipped stale copy.
  *Decision:* the key parts now include a SHA-256 of
  `JSON.stringify(SEED_CONTENT)`, computed once at module load in `store.ts`.
  The tag is unchanged, so `revalidateContent()` still busts it, and saved Blob
  content is still cached. A seed change just costs that cached Blob read one
  refetch. *Verified:* warm build → seed string edited → rebuild without
  clearing `.next` → the new string is in `.next/server/app/index.html`.
  Reverting brings the old string back.
- **`opengraph-image.tsx`'s `alt` export cannot come from the store** — Next
  reads it statically without running the route. It is the one string in that
  file still hardcoded.

### Original open decisions (kept for context)

**A. Storage backend.** Vercel's filesystem is read-only at runtime, so `public/`
and `src/data` cannot be written to. **Persisting anything requires exactly one
new storage dependency — unavoidable, not a preference.**

| Option | Deps | Verdict |
| --- | --- | --- |
| **Vercel Blob** — one JSON doc + uploaded files | `@vercel/blob` | **Recommended.** ~30 records, one editor. No schema migrations, no ORM, no pooling. An SDK, not a framework |
| Neon / Vercel Postgres | `@neondatabase/serverless` + likely ORM + migrations | Right if this grows multi-user or multi-hundred-record. Over-engineered for 30 rows |
| Commit JSON to GitHub via API | none | Rejected: every save triggers a redeploy; breaks under branch protection |

Plan below assumes Blob. **Step 3 puts every read/write behind a repository
interface**, so swapping to Postgres later is one file; nothing downstream knows
the backend.

**B. Unify Projects and Archive into one record type?** It is the right model but
it changes the shape of both public pages. Needs an explicit yes.

### Stage A — Foundation (site unchanged, still fully static)

- [x] **1. Env and config scaffolding.** `.env.local` (already gitignored) and a
  committed `.env.example` declaring `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`,
  `SESSION_SECRET`, `SESSION_VERSION`, `BLOB_READ_WRITE_TOKEN`. Add
  `src/lib/env.ts` validating them once at module load, throwing an error that
  names the missing variable.
  *Verify:* `npm run build` succeeds; removing a var fails the build with a
  readable message, not `undefined`.

- [x] **2. Content schema.** `src/lib/content/schema.ts` typing the whole
  document: `SiteContent { profile, about, experience[], projects[], socials[],
  settings, flags, version, updatedAt }`. Merge `Project` and `ArchivedProject`
  into one `Project` with `onHomepage`/`inArchive`/`order`. Replace
  `image: StaticImageData` with `image: { url, width, height, alt } | null`.
  Hand-rolled validators (`parseSiteContent`) — no Zod; the shapes are simple and
  a validation library is a new dependency for four functions.
  *Verify:* `tsc` passes; validators reject a malformed fixture.

- [x] **3. Seed data + store interface** 🟡. `src/lib/content/seed.ts` — the
  *exact* current content transcribed into the new schema, verified field by
  field. `src/lib/content/store.ts` exposing `getContent()` / `saveContent()`.
  `getContent()` reads the Blob JSON and **returns the seed if the blob does not
  exist**. Wrap in `unstable_cache(..., ['site-content'], { tags:
  ['site-content'] })` so pages stay ISR-cached; export `revalidateContent()`
  calling `revalidateTag('site-content')`.
  *Risk:* the seed is what keeps the live site correct until content is written.
  Must be byte-accurate.
  *Verify:* a scratch script deep-equals `getContent()` against the old
  `src/data` exports.

- [x] **4. Point the public site at the store** 🔴. Convert `Projects`,
  `OtherItems`, `Experience`, the archive table, `SocialLinks`, `Footer`, the
  hero block, `About`, `SectionNav`, `layout.tsx` metadata, `sitemap.ts`,
  `robots.ts`, `opengraph-image.tsx` to `await getContent()`. `SocialLinks` and
  `SectionNav` become server components taking props (`SectionNav` keeps a thin
  client child for the scroll-spy). Add the About paragraph renderer with the
  allowlisted `[text](url)` parser. The seed keeps carrying the imported
  `StaticImageData` objects — `next/image` accepts both shapes.
  *Risk:* the change that can break the live site. One PR, Vercel preview, diff
  rendered HTML against production before merging.
  *Verify:* preview `/` and `/archive` HTML identical to production apart from
  whitespace; Lighthouse LCP/CLS unchanged; `npm run lint && npm run build` green.

> End of Stage A: the site is byte-identical to today and nothing is editable.
> That's the point — every later stage is additive.

### Stage B — Auth

- [ ] **5. Password hashing** 🔴. `src/lib/auth/password.ts`: PBKDF2-SHA256
  (≥300k iterations) via Node `crypto`, stored as
  `pbkdf2$<iterations>$<salt_b64>$<hash_b64>` in `ADMIN_PASSWORD_HASH`. Compare
  with `crypto.timingSafeEqual`. `scripts/hash-password.mjs` is a local CLI,
  never deployed. No bcrypt/argon2 — both are native modules and unnecessary here.
  *Verify:* generated hash verifies; wrong password fails; both paths take
  comparable time.

- [ ] **6. Session tokens** 🔴. `src/lib/auth/session.ts`: compact signed token
  `base64url(payload).base64url(HMAC-SHA256(payload, SESSION_SECRET))` with
  `{ sub, iat, exp, ver }`, implemented with **Web Crypto** (`crypto.subtle`) so
  the same code runs in the edge middleware runtime and in Node. No JWT library.
  `ver` compared against `SESSION_VERSION` gives "log out everywhere" via one env
  var. Cookie: `__Host-admin_session`, `httpOnly`, `secure`, `sameSite: 'lax'`,
  `path: '/'`, `maxAge` 8h, rolling refresh past half-life.
  *Verify:* tampered payload rejected; expired rejected; bumped
  `SESSION_VERSION` rejected.

- [ ] **7. Login page + Server Action** 🔴. `/admin/login`, public, `noindex`.
  Action verifies username + password, sets the cookie, redirects to `/admin`.
  Failure returns one generic "Invalid credentials" — never distinguishing bad
  username from bad password. Logout is a POST action clearing the cookie.
  Rate limiting: failed-attempt counter **in the store** (keyed by username and
  by IP hash) with exponential backoff, ~15 min cap. Serverless in-memory
  counters are per-instance and useless, which is why this lives in the store.
  *Verify:* correct login lands on `/admin` with a cookie; 6 bad attempts lock
  out; the lockout survives a cold start.

- [ ] **8. Route guard** 🔴. `src/middleware.ts`, `matcher:
  ['/admin/:path*']`, excluding `/admin/login`. Verifies signature and expiry;
  on failure redirects to `/admin/login?next=<path>`, validating `next` is a
  same-origin relative path first (open redirect otherwise).
  **Middleware is not the security boundary.** Next has shipped middleware-bypass
  CVEs (`x-middleware-subrequest`); 16.3 is patched, but the design must not
  depend on that. So `src/app/admin/(protected)/layout.tsx` independently calls
  `requireSession()`, and **every mutation re-verifies the session** (step 10).
  Middleware is a UX redirect, nothing more.
  *Verify:* logged out, `/admin` and `/admin/projects` both redirect; the
  protected layout still 401s with middleware stubbed out;
  `?next=https://evil.com` does not redirect off-site.

- [ ] **9. Keep admin unindexed.** `disallow: ['/admin']` in `robots.ts`;
  `robots: { index: false, follow: false }` in the admin layout metadata.
  *Verify:* `/robots.txt` contains the rule; admin pages emit `noindex`.

### Stage C — Admin shell (read-only)

- [ ] **10. Mutation wrapper** 🔴. `src/lib/admin/action.ts` exports
  `adminAction(fn)`, wrapping every Server Action to (a) `requireSession()` or
  throw, (b) validate input against the schema, (c) `saveContent()` with
  **optimistic concurrency** (compare `version`, reject on mismatch), (d)
  `revalidateTag('site-content')`, (e) append to an audit-log blob. Every write
  goes through this; nothing bypasses it. Server Actions already enforce POST and
  Origin/Host matching in Next 16, covering CSRF; `sameSite=lax` is layer two.
  *Verify:* a wrapped action without a cookie throws; a stale `version` is
  rejected; the audit blob grows.

- [ ] **11. Admin layout and nav.** `/admin` dashboard listing sections and
  last-edited timestamp; sidebar nav; logged-in indicator; logout. Reuse the
  existing theme tokens (`--accent`, `--headings`, `--surface`). **No component
  library** — the admin is a dozen forms; a UI kit would be the largest
  dependency in the repo.
  *Verify:* every section renders current content read-only; logout works and
  blocks re-entry via the back button.

### Stage D — Editors, one section per step

Each is independently shippable. Order is lowest-blast-radius first.

- [ ] **12. Archive projects** — add/edit/delete/reorder. Safest: `/archive` is
  secondary.
- [ ] **13. Projects (homepage)** 🟡 — same records via `onHomepage`; text only
  at this step, images still from the seed.
- [ ] **14. Experience** — list editor with reorder.
- [ ] **15. Writing / other items** — reuses the Projects editor.
  Certificates (`content.certificates`, added 2026-10-06 after the plan was
  written: `{ id, title, issuer, url | null }`, rendered after Projects and in
  `nav`) get their list editor at this step too.
- [ ] **16. Social links** — fixed icon enum, reorder, visibility. Confirm the
  JSON-LD `sameAs` array follows.
- [ ] **17. About + Footer prose** — paragraph editor with a live preview
  rendering through the *same* allowlisted parser the site uses, so the preview
  cannot lie.
- [ ] **18. Hero / profile** 🟡 — name, role, tagline. Feeds the OG image; check
  it regenerates.
- [ ] **19. SEO settings** 🔴 — titles, descriptions, canonical base URL. A wrong
  `metadataBase` or sitemap domain is a real SEO incident: validate the URL, show
  a preview of the resulting `sitemap.xml` and `robots.txt`, require an explicit
  confirm on the base-URL field.
- [ ] **20. Section visibility flags** 🟡 — toggles must drive both the section
  render and `SectionNav`'s list, or the nav gets dead anchors. Guard against
  hiding every section.

*Verify (each):* edit in admin → public page reflects it within one revalidation
→ reload admin shows the persisted value → `npm run build` green.

### Stage E — Media

- [ ] **21. Image upload** 🟡. `@vercel/blob` client upload with a server-issued
  token. Server-side: max ~2 MB, allowlist `image/png` `image/jpeg` `image/webp`,
  **verify magic bytes, not the declared content-type**, reject SVG outright (it
  is executable markup). Random UUID filenames; the client filename never
  reaches a path.
  Dimensions: `next/image` needs `width`/`height` for remote sources. Parse them
  from the PNG IHDR / JPEG SOF header — ~30 lines, zero dependencies — and store
  them on the record.
  Config: add `images.remotePatterns` for `*.public.blob.vercel-storage.com` in
  `next.config.ts`; extend CSP `img-src` to that host plus `connect-src` for the
  direct upload. 🔴 the CSP edit is security-relevant — exact host, no wildcards
  beyond the subdomain.
  *Verify:* upload renders with no layout shift; a renamed `.exe` is rejected; an
  SVG is rejected; zero CSP violations in the console.

- [ ] **22. Media library + resume upload** — list blobs, replace/delete with an
  "in use by N records" warning; PDF upload for the CV, resume link read from
  the store.
  *Verify:* replacing the CV changes the Experience link target; deleting an
  in-use image is blocked.

### Stage F — Hardening and cleanup

- [ ] **23. Backups and rollback.** Every `saveContent()` also writes
  `backups/<iso-timestamp>.json`; admin gets a version-history view with restore.
  This is the undo for a bad edit, ~20 lines.
  *Verify:* restore a prior version; the public site follows.

- [ ] **24. Security pass** 🔴. No secret in a client bundle (grep the build
  output for `SESSION_SECRET` and the hash); every Server Action goes through
  `adminAction`; no stack traces in error responses; the `next` redirect param is
  same-origin only; sessions invalidate on `SESSION_VERSION` bump; admin pages
  `noindex` + `Cache-Control: no-store`; rate limiting holds across cold starts.
  Run `/security-review` on the branch.
  *Verify:* an unauthenticated `curl` POST to each action endpoint errors and
  mutates nothing.

- [ ] **25. Delete the old data layer.** Only now remove
  `src/data/{projects,experience,site}.ts` and the seed's static image imports,
  once the store holds real content. Update the README's "content lives in
  `src/data`" section, which will be wrong. Keep `src/data/types.ts` if anything
  still imports it.
  *Verify:* build green; no dangling imports; `/` and `/archive` diff clean
  against pre-migration HTML apart from intended edits.

- [ ] **26. CI.** Extend `.github/workflows/ci.yml` with dummy env vars so the
  build doesn't fail on missing secrets. Consider a smoke test asserting
  `/admin` redirects when unauthenticated.
  *Verify:* CI green on a PR without production secrets.

---

## 4. High-risk register

| Step | Risk | Mitigation |
| --- | --- | --- |
| 4 | Rewiring both public pages | Preview deploy + HTML diff before merge |
| 5–8 | All auth logic | No hand-rolled crypto primitives (Web Crypto / Node `crypto` only); middleware is not the sole guard |
| 10 | Every write path | Single choke point; nothing writes without it |
| 19 | Base URL / SEO metadata | Explicit confirm + sitemap preview |
| 21 | CSP and `remotePatterns` widening | Exact host only; no `unsafe-*` additions |
| 25 | Deleting seed data | Last step, after content is verified in the store, with backups live |

## 5. Reduced scope, if wanted

Steps 17, 20, 22, 23 and Tier 3 item 17 are all deferrable. A useful v1 is
steps 1–16 plus 21: auth, projects, archive, experience, socials, images. That
is the 80% at about half the work.
