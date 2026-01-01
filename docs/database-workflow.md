# Database Workflow

## Local dev workflow

```bash
# First time / fresh start
nr db:generate          # Create migration from schema
nr db:migrate           # Apply migration (creates .data/db/sqlite.db)
nr db:seed              # Populate test data

# Schema changes
# 1. Edit server/db/schema/*.ts or layers/auth/server/db/schema/*.ts
nr db:generate          # Creates new migration file
nr db:migrate           # Applies it

# Full reset (wipe + reseed)
# Note: db:seed requires dev server running
nr db:reset             # Resets and seeds in one command
```

## Files involved

- `server/db/schema/` - App schema (project, category, album, media, job)
- `layers/auth/server/db/schema/` - Auth schema (user, session, account, verification)
- `server/db/migrations/` - Generated migrations (commit these)
- `.data/db/sqlite.db` - Local DB (gitignored)
- `server/tasks/db-seed.ts` - Seed logic

## Deploy (self-hosted)

**Coolify start command:**

```bash
pnpm exec nuxt db migrate && node .output/server/index.mjs
```

## Key points

- Always commit migrations
- Seed task only for dev/test data
- Production: migrations only, seed manually or via separate task
