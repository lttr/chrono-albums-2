# App Structure

## Overview

The app uses a Nuxt layer for authentication, with the main app providing both public and admin functionality.

## Layers

| Layer  | Responsibility                          | Location      |
| ------ | --------------------------------------- | ------------- |
| `auth` | Identity - who you are (Google sign-in) | `layers/auth` |

The auth layer provides:
- Google OAuth via better-auth
- `useAuth()` composable for session management
- Sign in/out functionality

## Main App Structure

### Public Pages

| Path         | Purpose                          |
| ------------ | -------------------------------- |
| `/`          | Timeline view (albums by year)   |
| `/a/[slug]`  | Album view with justified grid   |
| `/c/*`       | Category pages                   |
| `/p/*`       | Project pages                    |

### Admin Pages

| Path                              | Purpose                   |
| --------------------------------- | ------------------------- |
| `/admin`                          | Admin dashboard           |
| `/admin/profile`                  | User profile              |
| `/admin/projects/[id]/*`          | Project management        |
| `/admin/projects/[id]/albums/*`   | Album management          |

### Composables

- `useAuth()` - Session, sign in/out (from auth layer)
- `useAccess()` - Current user's project memberships and permissions
- `useProjectAccess()` - Project-specific access control
- `useJustifiedLayout()` - Justified grid layout logic
- `useLightbox()` - PhotoSwipe lightbox integration

### Layouts

- `default.vue` - Admin pages layout
- `gallery.vue` - Public gallery layout with header/footer

## Schema

Each layer can define its own Drizzle schema in `server/db/schema/`. NuxtHub auto-merges all schemas.
