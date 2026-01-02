# Chrono Albums

A self-hosted photo album platform for organizing and sharing memories chronologically. Built for groups, families, or organizations that want full control over their media.

## Features

**Media Management**

- Upload photos and videos with drag-and-drop
- Automatic HEIC → JPEG conversion for iPhone photos
- EXIF extraction (date taken, GPS coordinates, camera info)
- Client-side image compression before upload
- Video thumbnail generation with FFmpeg

**Gallery Experience**

- Flickr-style justified grid layout
- PhotoSwipe lightbox with swipe gestures
- Video playback support
- Dark/light mode

**Organization**

- Hierarchical structure: Projects → Categories → Albums
- Chronological timeline view by year/month
- Public album sharing via slug URLs

**Team Collaboration**

- Google OAuth sign-in
- Invitation-based project access
- Role-based permissions (owner, editor, viewer)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Nuxt 4 App                       │
├─────────────────────────────────────────────────────┤
│  Frontend          │  API Routes                    │
│  - Vue 3 SFCs      │  - Nitro handlers              │
│  - @lttr/puleo CSS │  - Drizzle ORM queries         │
│  - PhotoSwipe      │  - better-auth sessions        │
├─────────────────────────────────────────────────────┤
│              SQLite + NuxtHub Blob Storage          │
└─────────────────────────────────────────────────────┘
```

### Data Model

```
Project
├── Category (e.g., "Summer Camps", "Club Events")
│   └── Album (year/month metadata)
│       └── Media (images, videos with EXIF)
└── Team Members (owner, editor, viewer roles)
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment (copy and edit)
cp .env.example .env

# Initialize database
pnpm run db:migrate

# Start development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Mock Auth Mode

For local development without Google OAuth:

```bash
NUXT_PUBLIC_MOCK_AUTH=true pnpm run dev
```

## Commands

| Command         | Description                      |
| --------------- | -------------------------------- |
| `nr dev`        | Start dev server                 |
| `nr build`      | Production build                 |
| `nr verify`     | Format + lint + typecheck + test |
| `nr test`       | Run Vitest tests                 |
| `nr db:migrate` | Apply database migrations        |
| `nr db:seed`    | Seed with test data              |
| `nr db:studio`  | Open Drizzle Studio              |
| `nr db:reset`   | Reset and reseed database        |

## Tech Stack

| Layer            | Technology                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | [Nuxt 4](https://nuxt.com)                                                                                                                               |
| Database         | SQLite via [Drizzle ORM](https://orm.drizzle.team)                                                                                                       |
| Auth             | [better-auth](https://www.better-auth.com) with Google OAuth                                                                                             |
| Styling          | [@lttr/puleo](https://github.com/nicknisi/puleo) CSS framework                                                                                           |
| Validation       | [Zod](https://zod.dev) v4                                                                                                                                |
| Gallery          | [PhotoSwipe](https://photoswipe.com) + [justified-layout](https://flickr.github.io/justified-layout/)                                                    |
| Image processing | [Sharp](https://sharp.pixelplumbing.com), [heic2any](https://github.com/nicknisi/heic2any), [CompressorJS](https://fengyuanchen.github.io/compressorjs/) |
| Video processing | [FFmpeg](https://ffmpeg.org) (thumbnails, metadata)                                                                                                      |
| Deployment       | Self-hosted via [Coolify](https://coolify.io) on VPS                                                                                                     |

## Project Structure

```
├── app/
│   ├── pages/           # Route pages
│   │   ├── admin/       # Admin dashboard
│   │   ├── a/[slug]     # Public album view
│   │   ├── c/[slug]     # Public category view
│   │   └── p/[slug]     # Public project view
│   ├── components/      # Vue components
│   └── composables/     # Vue composables
├── server/
│   ├── api/             # API routes
│   └── db/schema/       # Drizzle schema
├── layers/auth/         # Authentication layer
├── shared/types/        # Shared TypeScript types
└── docs/                # Documentation
```

## Documentation

- [App Structure](docs/app-structure.md) - Layers and composables
- [Authentication](docs/authentication.md) - Google OAuth setup
- [Data Model](docs/data-model.md) - Database schema details
- [Permissions](docs/permissions.md) - Role-based access control
- [Database Workflow](docs/database-workflow.md) - Migrations and seeding
- [Production Deployment](docs/production-deployment.md) - Coolify/VPS setup

## License

Private project.
