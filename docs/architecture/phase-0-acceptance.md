# Phase 0 acceptance checklist

Run every item from the repository root. Tick each box only when the result matches.

## 1. Infrastructure

- [ ] `docker compose ps` shows `coconaesh-postgres` as `Up ... (healthy)`.
- [ ] The database port is bound to localhost only:
  `docker compose ps` shows `127.0.0.1:5432->5432/tcp`.
- [ ] `docker compose exec postgres psql -U coconaesh -d coconaesh_dev -c "select version(), now();"` prints a PostgreSQL 17 version and a UTC timestamp.

## 2. Database and Prisma

- [ ] `git ls-files prisma/migrations` lists a `migration.sql` file and `migration_lock.toml`.
- [ ] `ls prisma/migrations` shows a `*_init` folder and `migration_lock.toml`.
- [ ] `pnpm --filter @coconaesh/api db:check` prints three ticks and `Database connectivity verified.`

## 3. API

- [ ] `pnpm --filter @coconaesh/api test` reports 3 passed.
- [ ] `pnpm --filter @coconaesh/api typecheck` finishes without errors.
- [ ] `pnpm --filter @coconaesh/api build` finishes without errors.
- [ ] `curl -i http://localhost:3000/api/v1/health` returns `200` with `"status":"ok"`.
- [ ] `curl -i http://localhost:3000/api/v1/nope` returns `404` with `"code":"NOT_FOUND"`.
- [ ] With PostgreSQL stopped, the health endpoint returns `503` with `"code":"DATABASE_UNAVAILABLE"` and the response contains no connection details.
- [ ] After PostgreSQL restarts, the health endpoint returns `200` without restarting the API.

## 4. Frontend

- [ ] `pnpm --filter @coconaesh/web test` reports 6 passed.
- [ ] `pnpm --filter @coconaesh/web typecheck` finishes without errors.
- [ ] `pnpm --filter @coconaesh/web build` finishes without errors.
- [ ] http://localhost:5173 shows the frontend running and the API and database connected.
- [ ] With PostgreSQL stopped, "Check again" shows the database as unavailable.
- [ ] With the API stopped, "Check again" shows the API as unreachable.
- [ ] http://localhost:5173/anything shows the custom 404 page.
- [ ] The browser console shows no errors in the working state.

## 5. Whole repository

- [ ] `pnpm test` passes in both apps.
- [ ] `pnpm typecheck` passes in both apps.
- [ ] `pnpm build` passes in both apps.

## 6. Repository hygiene

- [ ] `git status --short` never lists `.env`.
- [ ] `git check-ignore -v apps/api/src/generated/prisma/client.ts` prints a matching `.gitignore` rule.
- [ ] After `git add -A`, the checks in "First commit" below print nothing.

## 7. Documentation

- [ ] `README.md` exists and its commands match what you ran.
- [ ] `docs/architecture/overview.md` lists every deviation from the specification.

## First commit

```bash
cd ~/Projects/coconaesh-visuals

# Git needs an identity. These print your name and email; set them if empty.
git config user.name
git config user.email

git add -A
git status --short

# Each of these must print NOTHING:
git diff --cached --name-only | grep -E '(^|/)\.env$'
git diff --cached --name-only | grep -E 'src/generated/'
git diff --cached --name-only | grep -E '(^|/)(dist|node_modules)/'
git diff --cached --name-only | grep -E '\.(sql|dump)$'

# This must list ONLY the three .gitkeep files:
git diff --cached --name-only | grep '^storage/'

git commit -m "chore: phase 0 project foundation"
git log --oneline
```

If `git config user.name` prints nothing, set it first:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Clean-clone check

This proves the repository works without anything left over on your machine. It does not touch your running database.

```bash
git clone ~/Projects/coconaesh-visuals /tmp/coconaesh-clone-check
cd /tmp/coconaesh-clone-check

cp .env.example .env
pnpm install
# If pnpm stops with ERR_PNPM_IGNORED_BUILDS: pnpm approve-builds, select the listed packages, then pnpm install again.

pnpm db:generate
pnpm typecheck
pnpm test
pnpm build

cd ~/Projects/coconaesh-visuals
rm -rf /tmp/coconaesh-clone-check
```

- [ ] Every command in the clean clone succeeds.

## Sign-off

Phase 0 is accepted when every box above is ticked. Phase 1 starts only after the owner approves.