# App Structure

The app is organized into Nuxt layers, each with a single responsibility.

## Layers

| Layer    | Responsibility                          |
| -------- | --------------------------------------- |
| `auth`   | Identity - who you are (Google sign-in) |
| `access` | Permissions - what you can access       |
| `admin`  | Admin UI for managing content           |
| `public` | Public album viewing                    |

## Composables

- `useAuth()` - Session, sign in/out
- `useAccess()` - Current user's project memberships and permissions

## Schema

Each layer can define its own Drizzle schema in `server/db/schema/`. NuxtHub auto-merges all schemas.
