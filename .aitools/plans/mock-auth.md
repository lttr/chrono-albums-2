# Mock Auth for Development & Testing

## Goal

Create a mock user that auto-logs in when `NUXT_MOCK_AUTH=true`, bypassing Google OAuth. The mock user is owner of 2/3 projects and member of the 3rd.

## Approach: Auth Bypass with Seeded Data

Bypass better-auth entirely when the flag is set, returning a consistent mock session on both server and client. Seed the mock user + memberships alongside existing data.

## Implementation Steps

### 1. Add env config

**Files:** `.env.example`, `nuxt.config.ts`

```
NUXT_MOCK_AUTH=true  # Enable mock auth (dev only)
```

Add to runtimeConfig:

```ts
runtimeConfig: {
  mockAuth: false,  // Server-side flag
  public: {
    mockAuth: false // Client needs to know too
  }
}
```

### 2. Define mock user constant

**File:** `server/utils/mockAuth.ts` (new)

```ts
export const MOCK_USER = {
  id: "mock-user-001",
  name: "Dev User",
  email: "dev@localhost",
  emailVerified: true,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}
```

### 3. Create getAuthSession helper

**File:** `server/utils/mockAuth.ts`

Added `getAuthSession(event)` function that:

- Returns mock session when `mockAuth` is enabled
- Calls `auth.api.getSession()` otherwise

Updated all API routes to use `getAuthSession()` instead of direct `auth.api.getSession()` call.

### 4. Update frontend composable

**File:** `layers/auth/app/composables/useAuth.ts`

When `runtimeConfig.public.mockAuth` is true:

- Return mock user directly (no better-auth client)
- `signInWithGoogle()` → noop or redirect to /admin
- `signOut()` → noop or redirect to /login

### 5. Seed mock user and memberships

**File:** `server/tasks/seed.ts`

Add to seed task:

1. Insert mock user into `user` table
2. Insert mock user as owner of projects 1 and 2
3. Insert mock user as member of project 3

Order: users → projects → memberships (after categories/albums)

### 6. Update auth middleware to respect mock

**File:** `layers/auth/app/middleware/auth.global.ts`

Skip redirect to `/login` when mockAuth is enabled.

## Files Modified/Created

| File                                                         | Action                         |
| ------------------------------------------------------------ | ------------------------------ |
| `.env.example`                                               | Add `NUXT_PUBLIC_MOCK_AUTH`    |
| `layers/auth/nuxt.config.ts`                                 | Add runtimeConfig for mockAuth |
| `shared/constants/mockAuth.ts`                               | **Created** - shared mock user |
| `server/utils/mockAuth.ts`                                   | **Created** - getAuthSession() |
| `server/api/user/memberships.get.ts`                         | Use getAuthSession             |
| `server/api/projects/[projectId]/members/index.get.ts`       | Use getAuthSession             |
| `server/api/projects/[projectId]/members/index.post.ts`      | Use getAuthSession             |
| `server/api/projects/[projectId]/members/[userId].delete.ts` | Use getAuthSession             |
| `layers/auth/app/composables/useAuth.ts`                     | Handle mock mode               |
| `server/tasks/seed.ts`                                       | Seed mock user + memberships   |

## Testing Considerations

- Unit tests: Use `mockNuxtImport('useAuth', ...)` - no env flag needed
- E2E tests: Set `NUXT_MOCK_AUTH=true` - instant auth without OAuth
- Integration tests: Same as E2E

## Decision: Seed to Database

Mock user inserted into `user` table with real `projectMembership` records. Session bypass is in-memory only (no session/account records needed - we intercept before better-auth checks).
