# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
nr dev              # Start dev server on http://localhost:3000
nr build            # Production build
nr verify           # Format + lint + typecheck (run before commits)

# Database (SQLite via Drizzle)
nr db:generate      # Generate migrations from schema changes
nr db:migrate       # Apply migrations
nr db:seed          # Seed with test data
nr db:reset         # Reset database
nr db:studio        # Open Drizzle Studio
```

## Architecture

**Nuxt 4 app** (compatibility mode) with SQLite database via Drizzle ORM.

### Data Model

```
Project → has many → Category
       → has many → Album → has many → Media
```

- **Project**: Top-level container for organizing albums
- **Category**: Groups albums within a project (e.g., "Tábory", "Akce oddílu")
- **Album**: Photo album with year/month metadata
- **Media**: Images/videos with EXIF data (dimensions, GPS, date taken)

### Key Directories

- `app/` - Nuxt frontend (pages, components, layouts)
- `server/api/` - API routes (Nitro handlers)
- `server/database/schema/` - Drizzle schema definitions with Zod validation via `drizzle-zod`
- `shared/types/` - Shared TypeScript types and Zod schemas for validation
- `user-data/uploads/` - File storage (configured in Nitro)

### Database Access

```ts
// In server routes, use the helper:
const db = useDb()
db.select().from(album)
```

### Validation

Schema uses `@zod/mini` for validation. Types exported from `shared/types/` include both Zod schemas and inferred TypeScript types.

## Stack Notes

- **Styling**: `@lttr/puleo` CSS framework
- **Typed routes**: `experimental.typedPages: true`
- **Image handling**: HEIC conversion via `heic2any`, compression via `compressorjs`, EXIF via `exifreader`
