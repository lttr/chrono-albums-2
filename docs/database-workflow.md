# Database Workflow

## Local dev workflow

```bash
# First time / fresh start
nr db:generate          # Create migration from schema
nr db:migrate           # Apply migration (creates .data/db/sqlite.db)
nr db:seed              # Populate test data

# Schema changes
# 1. Edit server/db/schema/*.ts
nr db:generate          # Creates new migration file
nr db:migrate           # Applies it

# Full reset (wipe + reseed)
nr db:reset && nr db:seed
```

## Files involved

- `server/db/schema/` - source of truth
- `server/db/migrations/` - generated, commit these
- `.data/db/sqlite.db` - local DB, gitignored
- `server/tasks/db-seed.ts` - seed logic

## Deploy (self-hosted)

For self-hosted deployment, migrations run automatically on server start.
The `.data/db/sqlite.db` file persists on the server.

## Key points

- Always commit migrations
- Seed task only for dev/test data
- Production: migrations only, seed manually or via separate task
