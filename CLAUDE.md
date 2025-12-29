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

# Testing
nr test             # Run vitest
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
  - `app/pages/index.vue` - Timeline view (albums grouped by year)
  - `app/pages/a/[slug].vue` - Album view with justified grid
  - `app/layouts/gallery.vue` - Gallery layout with header/footer
  - `app/components/timeline/` - Timeline components (YearSection, AlbumCard)
  - `app/components/album/` - Album components (JustifiedGrid, GridItem)
  - `app/composables/useJustifiedLayout.ts` - Justified grid layout logic
  - `app/composables/useLightbox.ts` - PhotoSwipe lightbox integration
- `server/api/` - API routes (Nitro handlers)
  - `server/api/timeline.get.ts` - Timeline data (albums grouped by year)
  - `server/api/albums/` - Album CRUD operations
  - `server/api/upload.post.ts` - Media upload with image variant generation
- `server/routes/m/[...path].ts` - Media serving (thumbnails, full, original)
- `server/db/schema/` - Drizzle schema definitions with Zod validation via `drizzle-zod`
- `shared/types/` - Shared TypeScript types and Zod schemas for validation
- `.data/blob/` - NuxtHub blob storage for uploaded media

### Database Access

```ts
// In server routes, use the helper:
const db = useDb()
db.select().from(album)
```

**Local DB queries**: Use `sqlite3 .data/db/sqlite.db` for direct database operations.

### Validation

Schema uses `zod` v4 for validation. Types exported from `shared/types/` include both Zod schemas and inferred TypeScript types.

## Git Commits

Use conventional commits with scope: `<type>(<scope>): <description>`

Derive scope from the area of change (e.g., `upload`, `album`, `api`, `db`, `ui`).

## Stack Notes

- **Styling**: `@lttr/puleo` CSS framework
- **Typed routes**: `experimental.typedPages: true`
- **Image handling**:
  - HEIC conversion via `heic2any`
  - Compression via `compressorjs`
  - EXIF via `exifreader`
  - Image variants: thumbnail (400px), full (1920px), original (with EXIF preserved)
  - LQIP (Low Quality Image Placeholder) generation via `sharp`
- **Gallery UI**:
  - `photoswipe` - Lightbox with gestures and keyboard navigation
  - `justified-layout` - Flickr-style responsive grid algorithm
