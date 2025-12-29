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

## Features

- **Timeline View**: Albums grouped by year on homepage
- **Justified Grid Layout**: Flickr-style photo grid (via `justified-layout`)
- **Lightbox Gallery**: PhotoSwipe integration with gestures and keyboard navigation
- **Image Variants**: Automatic thumbnail, full-size, and original image generation
- **LQIP Loading**: Low-quality image placeholder blur-up effect
- **Slug-based URLs**: Clean URLs for albums (`/a/{slug}`) and media (`/m/{slug}/*`)

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
nr db:seed          # Seed test data
nr db:reset         # Reset database
nr db:studio        # Open Drizzle Studio
```

See [docs/database-workflow.md](docs/database-workflow.md) for details.

## Git Commits

[Conventional commits](https://www.conventionalcommits.org/) with scope: `<type>(<scope>): <description>`

## Stack

- **Framework**: Nuxt 4 (compatibility mode)
- **Database**: SQLite via Drizzle ORM
- **Styling**: @lttr/puleo CSS
- **Validation**: Zod v4
- **Image handling**: HEIC conversion, EXIF extraction, image variants
- **Gallery**: PhotoSwipe (lightbox), justified-layout (grid)
