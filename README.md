# CocoNaesh Visuals

Photography business website and client management platform for CocoNaesh Visuals (India).

**Current status:** Phase 0, project foundation. The repository contains a working React frontend, an Express API and a PostgreSQL database, with the three verified to communicate. There is no gallery, authentication, booking or integration code yet.

## What is in the repository

| Part | Technology | Location | Dev address |
|---|---|---|---|
| Frontend | React, Vite, TypeScript, Tailwind CSS v4, React Router | `apps/web` | http://localhost:5173 |
| Backend API | Node.js, Express, TypeScript, Zod, Prisma | `apps/api` | http://localhost:3000 |
| Database | PostgreSQL 17 in Docker | `docker-compose.yml` | localhost:5432 (bound to 127.0.0.1 only) |
| Schema and migrations | Prisma | `prisma/` | |

## Prerequisites

| Tool | Required version | Check with |
|---|---|---|
| Node.js | 22 or newer | `node -v` |
| pnpm | 10 or newer | `pnpm -v` |
| Git | any recent | `git --version` |
| Docker Engine | any recent | `docker --version` |
| Docker Compose plugin | v2 or newer | `docker compose version` |

Check what you already have before installing anything:

```bash
node -v
pnpm -v
git --version
docker --version
docker compose version
systemctl is-active docker
id -nG | tr ' ' '\n' | grep -x docker
ss -ltn | grep ':5432'
```

The last command should print nothing. If it prints a line, something else is already using port 5432 (see Troubleshooting).

## Install missing tools (CachyOS / Arch)

Install only what the check above showed to be missing.

```bash
# Node.js LTS: check the exact package name first
pacman -Ss '^nodejs-lts'
sudo pacman -S --needed nodejs-lts-jod npm

# pnpm, Git, Docker
sudo pacman -S --needed pnpm git docker docker-compose docker-buildx

# Start Docker now and at every boot
sudo systemctl enable --now docker

# Allow your user to run Docker without sudo,
# then LOG OUT AND BACK IN (or reboot) for it to take effect
sudo usermod -aG docker "$USER"
```

If `pacman -Ss` lists a different LTS package, use that one. Any Node 22 or newer works.

## First-time setup

All commands run from the repository root.

```bash
cd ~/Projects/coconaesh-visuals
```

### 1. Environment file

```bash
cp .env.example .env
```

The defaults work for local development. If you change `POSTGRES_PASSWORD`, change it inside `DATABASE_URL` too. The two must match. `.env` is git-ignored and must never be committed.

### 2. Install dependencies

```bash
pnpm install
```

If pnpm stops with `ERR_PNPM_IGNORED_BUILDS` (it blocks install scripts by default), run:

```bash
pnpm approve-builds
```
If pnpm stops with `ERR_PNPM_IGNORED_BUILDS`, run:

    pnpm approve-builds

Press Space to tick each listed package (or `a` to tick all), then Enter. Pressing Enter with nothing ticked blocks every package instead. The repository's `pnpm-workspace.yaml` already allows the packages this project needs, so a normal fresh install should not show this error.

### 3. Start PostgreSQL

```bash
pnpm dev:db
docker compose ps
```

Repeat `docker compose ps` until the status reads `Up ... (healthy)`. This takes about 10 to 15 seconds the first time.

### 4. Generate the Prisma client and apply migrations

```bash
pnpm db:generate
pnpm db:migrate
```

On a fresh database the migration is applied automatically. If Prisma asks for a migration name for a new change, use a short descriptive one.

### 5. Prove the database works through Prisma

```bash
pnpm --filter @coconaesh/api db:check
```

Expected: three lines with a tick (write, read, delete) and `Database connectivity verified.`

## Running the project

Use three terminals.

```bash
# Terminal 1: database (skip if already healthy)
pnpm dev:db

# Terminal 2: API
pnpm dev:api

# Terminal 3: frontend
pnpm dev:web
```

Then open http://localhost:5173. The System status panel should show the frontend, API and database as running or connected.

Check the API directly:

```bash
curl -i http://localhost:3000/api/v1/health
```

Expected: `HTTP/1.1 200 OK` and JSON with `"status":"ok"`.

## Quality checks

```bash
pnpm typecheck   # TypeScript, both apps
pnpm test        # API tests (3) and web tests (6)
pnpm build       # production builds of both apps
```

## Command reference

| Command | What it does |
|---|---|
| `pnpm dev:db` | Start PostgreSQL in Docker |
| `pnpm dev:db:stop` | Stop PostgreSQL (data kept) |
| `pnpm dev:db:reset` | **Delete all development data** and recreate the database |
| `pnpm dev:api` | Start the API with auto-reload |
| `pnpm dev:web` | Start the frontend dev server |
| `pnpm db:generate` | Generate the Prisma client |
| `pnpm db:migrate` | Create and apply development migrations |
| `pnpm db:studio` | Open Prisma Studio to browse data |
| `pnpm typecheck` | Type-check every workspace |
| `pnpm test` | Run every workspace's tests |
| `pnpm build` | Production build of every workspace |

## Project structure

```
coconaesh-visuals/
├── apps/
│   ├── api/          Express API (modules: repository, service, controller, routes)
│   └── web/          React frontend
├── packages/         Reserved for shared types and validation
├── prisma/           Schema and migrations
├── infrastructure/   Reserved for Docker, Nginx and scripts (later phases)
├── storage/          Local photograph storage (contents are git-ignored)
├── docs/             Architecture, API, deployment and user documentation
├── docker-compose.yml
└── .env.example
```

See `docs/architecture/overview.md` for the architecture and conventions.

## Security notes for development

- `.env` holds secrets and is never committed. Only `.env.example` is.
- PostgreSQL is bound to `127.0.0.1`, so it is not reachable from your network.
- Only variables prefixed with `VITE_` reach the browser. Never put a secret in one.
- The development database password in `.env.example` is a placeholder for local use only.
- `storage/` contents are git-ignored so original and client photographs are never committed.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `permission denied ... docker.sock` | You have not logged out and back in since `usermod -aG docker`. Log out and in, or reboot. |
| `Cannot connect to the Docker daemon` | Run `sudo systemctl enable --now docker`. |
| `port is already allocated` on 5432 | A local PostgreSQL is running. Run `sudo systemctl stop postgresql`, or set `POSTGRES_PORT=5433` in `.env` and change the port in `DATABASE_URL`. |
| `POSTGRES_USER is required` | `.env` is missing. Run `cp .env.example .env`. |
| `psql` or the API cannot connect right after starting the database | The database is still starting. Wait for `(healthy)` in `docker compose ps`. |
| `P1000: Authentication failed` | The password in `DATABASE_URL` does not match the one the database volume was created with. Fix `.env`, or run `pnpm dev:db:reset` (deletes dev data). |
| `Invalid environment configuration` when starting the API | `.env` is missing a value. Compare it with `.env.example`. |
| `Cannot find module '../generated/prisma/client.js'` | Run `pnpm db:generate`. |
| `Port 5173 is already in use` | Close the other Vite instance. The port is fixed on purpose because the API's CORS setting depends on it. |
| Frontend says the API is unreachable but `curl` works | Open the site at exactly `http://localhost:5173`, not `127.0.0.1`. |
| `ERR_PNPM_IGNORED_BUILDS` | Run `pnpm approve-builds`, select the listed packages, then `pnpm install` again. |
| Notice: "pnpm is running through Node.js..." | Cosmetic. pnpm was installed through npm with install scripts skipped. To remove it: `sudo npm uninstall -g pnpm && sudo pacman -S --needed pnpm`. |

## Shell note (fish)

All commands in this README work in fish, bash and zsh. When creating files, use your editor rather than shell heredocs, because fish does not support them.

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| 0 | Project foundation | In progress, final acceptance pending |
| 1 | Public website and visual identity | Not started |
| 2 | Gallery engine and media management | Not started |
| 3 | Authentication and client portal | Not started |
| 4 | Booking and payment management | Not started |
| 5 | Instagram, WhatsApp and currency integrations | Not started |
| 6 | Complete admin dashboard | Not started |
| 7 | Security, performance and testing | Not started |
| 8 | Deployment and production preparation | Not started |