# Chrono Albums

Photo album management app built with Nuxt 4 and SQLite.

## Data Model

```
Project → Category → Album → Media
```

- **Project**: Top-level container
- **Category**: Groups albums (e.g., "Tábory", "Akce oddílu")
- **Album**: Photo album with year/month metadata
- **Media**: Images/videos with EXIF data

## Setup

```bash
pnpm install
pnpm run db:migrate
pnpm run dev
```

## Development

```bash
nr dev              # Dev server on http://localhost:3000
nr verify           # Format + lint + typecheck + test
nr test             # Run tests
```

## Database

```bash
nr db:generate      # Generate migrations from schema
nr db:migrate       # Apply migrations
nr db:seed          # Seed test data (requires dev server)
nr db:reset         # Reset database
nr db:studio        # Open Drizzle Studio
```

See [docs/database-workflow.md](docs/database-workflow.md) for details.

## Stack

- **Framework**: Nuxt 4 (compatibility mode)
- **Database**: SQLite via Drizzle ORM
- **Styling**: @lttr/puleo CSS
- **Validation**: Zod v4
- **Image handling**: HEIC conversion, EXIF extraction
