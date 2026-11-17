# Architecture overview (Phase 0)

This document records how the project is organised and why. Update it whenever an architectural decision changes.

## System at a glance

```
Browser ──► React app (Vite, :5173) ──► Express API (:3000, /api/v1) ──► PostgreSQL (:5432)
                                              │
                                              └─ Prisma client (generated into apps/api/src/generated)
```

- The frontend talks to the API only through `apps/web/src/lib/api-client.ts`.
- The API is the only component that talks to the database.
- Every request crosses the CORS boundary, so the API allows exactly one origin, taken from `WEB_ORIGIN`.

## Monorepo

pnpm workspaces: `apps/*` and `packages/*`. `packages/` is empty in Phase 0 and will hold shared types and validation when the same shapes are needed by both apps.

Dependencies are added with `pnpm add` so versions stay current. Exact versions live in `pnpm-lock.yaml`.

## Backend conventions (`apps/api`)

- **ES modules** with NodeNext resolution. Relative imports end in `.js`.
- **Modular layout** per feature, under `src/modules/<feature>/`:
  - `*.repository.ts` talks to the database
  - `*.service.ts` holds business logic
  - `*.controller.ts` translates HTTP to service calls
  - `*.routes.ts` wires paths to controllers
- **Dependency injection through `createApp()`**. The app factory receives its services as arguments and does not import Prisma or environment config. Tests build the app with fake repositories, so they need no database.
- **Environment** is validated with Zod in `src/config/env.ts`. The process exits with a readable message if configuration is wrong.
- **Response envelope** for every endpoint:
  - success: `{ "success": true, "data": ... }`
  - failure: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- **Errors never leak internals.** Full detail is logged server-side and the client receives a generic code and message.
- **API is versioned** under `/api/v1`.

## Frontend conventions (`apps/web`)

- Business logic and data fetching live in `lib/` and `features/<feature>/` hooks. Components render state only.
- Design tokens (brand palette and fonts) are defined once in `src/index.css` under `@theme`.
- Fonts are self-hosted through Fontsource. The site makes no third-party font requests.
- Reduced-motion support is global in `index.css`.
- State is never conveyed by colour alone. Every status has a text label.

## Database

- PostgreSQL 17, UUID primary keys, timestamps stored as UTC `timestamptz`.
- Prisma 6 with the `prisma-client` generator (ESM). The generated client is git-ignored and recreated with `pnpm db:generate`.
- **`SystemCheck` is a Phase 0 placeholder.** It exists only to prove migrations and read/write work. It will be removed in Phase 2 when the real models arrive.

## Configuration

One `.env` at the repository root serves Docker Compose, the API, Prisma and Vite. Only `VITE_`-prefixed variables are exposed to the browser. `.env.example` documents every variable.

## Deviations from the master specification

| Deviation | Reason |
|---|---|
| `docker-compose.yml` at the repo root, not `infrastructure/docker/` | `docker compose up` works with no flags and reads the root `.env`. `infrastructure/docker/` will hold Dockerfiles in Phase 8. |
| Prisma pinned to version 6 | Prisma 7 changed configuration and client generation. Upgrading is a separate, planned task. |
| `dotenv-cli` in scripts instead of a runtime `dotenv` import | The app reads `process.env` only, exactly as it will in production. |
| `prisma-client` (ESM) generator instead of `prisma-client-js` | Avoids CommonJS and ESM interop problems in production builds. |
| Self-hosted fonts | Privacy and performance. |

## Known follow-ups

1. Move the health types to `packages/types` once the API and web app share more types.
2. Helmet sets `Cross-Origin-Resource-Policy: same-origin` by default. Relax it on image routes only, in Phase 2.
3. Add Playwright end-to-end tests when there are real user flows (Phase 1 onwards).
4. Production secrets and managed services are a Phase 8 concern.