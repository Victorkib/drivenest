# DriveNest

Car hire across Kenya — self-drive and chauffeured vehicles from verified operators, with prices shown up front.

## Stack

- TanStack Start (React 19) and Vite
- Nitro, targeting Cloudflare Workers
- Tailwind CSS v4 and shadcn/ui

## Setup

Requires Node.js 20+.

```sh
git clone https://github.com/Victorkib/drivenest.git
cd drivenest
npm install
npm run dev
```

The app serves at `http://localhost:8080`.

## Scripts

| Command             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Local development server                                 |
| `npm run build`     | Production build into `.output/`                         |
| `npm run build:dev` | Unminified production-shaped build                       |
| `npm run preview`   | Preview the production build locally                     |
| `npm run lint`      | ESLint                                                   |
| `npm run format`    | Prettier                                                 |

Typecheck with `npx tsc --noEmit`.

## Project layout

- `src/routes/` — file-based pages (`__root.tsx` is the document shell)
- `src/lib/fleet.ts` — vehicle catalogue and KES price formatting
- `src/server.ts` — Cloudflare Worker `fetch` entry
- `src/start.ts` — server middleware (CSRF, error wrapping)
