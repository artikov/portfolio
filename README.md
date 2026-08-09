# artikov.tech

Personal portfolio of Oybek Artikov — frontend developer. Live at
[artikov.tech](https://artikov.tech).

## Stack

- **Next.js 15** (App Router), statically prerendered
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- **Inter** via `next/font/google`, icons from `react-icons`
- Deployed on **Vercel**

## Running it

Requires Node 20+ and npm (there is a single `package-lock.json`; do not add a
second lockfile).

```bash
npm ci
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script          | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Dev server with Turbopack           |
| `npm run build` | Production build                    |
| `npm start`     | Serve a production build            |
| `npm run lint`  | ESLint                              |

## Layout

```
src/
  app/         routes, metadata, sitemap/robots, OG image
  components/  UI; only CursorGlow, SectionNav and CurrentYear are client
  data/        projects, experience and site content, typed in types.ts
  lib/         shared style strings
public/        CV and project screenshots
```

Content lives in `src/data` — adding a project means adding an entry to
`projectsData` (homepage) or `archivedProjectsData` (`/archive` table), not
touching a component. Project thumbnails are imported statically so `next/image`
can derive their dimensions and avoid layout shift.

## Notes

- Both pages are Server Components. The three client components exist for the
  cursor gradient, the scroll-spy nav, and the copyright year.
- Security headers and the CSP live in `next.config.ts`. The CSP needs
  `'unsafe-inline'` for styles while the cursor gradient is an inline style.
- CI runs `npm ci`, lint and build on every push and pull request.
