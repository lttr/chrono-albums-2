# App Structure

The app is organized into Nuxt layers with a single `auth` layer for authentication concerns.

## Layers

| Layer  | Responsibility                          |
| ------ | --------------------------------------- |
| `auth` | Identity - who you are (Google sign-in) |

The main `app/` directory contains all pages, components, and composables for the application.

## Composables

### Authentication (`layers/auth`)

- `useAuth()` - Session, sign in/out, user state

### Access Control (`app/composables`)

- `useAccess()` - Current user's project memberships and roles
- `useProjectAccess(projectId)` - Permission helpers for a specific project

### UI (`app/composables`)

- `useJustifiedLayout()` - Flickr-style justified grid for media
- `useLightbox()` - PhotoSwipe lightbox with video support

## Schema

- `server/db/schema/` - Main application schemas (project, category, album, media, job)
- `layers/auth/server/db/schema/` - Auth schemas (user, session, account, verification)

Drizzle auto-merges all schemas at build time.
