# better-auth Integration Plan

## Overview

Integrate better-auth into Chrono Albums as a Nuxt layer at `layers/auth/`, replacing the current mock authentication with real Google OAuth. Use better-auth CLI for auth tables, add project_membership table separately.

**Deployment**: Node.js in Docker container (standard SQLite, not Cloudflare D1)
**Membership model**: Always require explicit invite - no auto-create on first login

## Architecture

Auth layer is self-contained with its own schema (NuxtHub auto-merges schemas from layers).

```
layers/auth/
├── nuxt.config.ts                    # Layer config with runtime secrets
├── server/
│   ├── db/schema/auth.ts             # user, session, account, verification
│   ├── api/auth/[...all].ts          # better-auth handler
│   └── utils/auth.ts                 # Server auth instance
└── app/
    ├── composables/useAuth.ts        # Auth client (session, signIn, signOut)
    ├── middleware/auth.global.ts     # Route protection
    └── pages/login.vue               # Login page with Google sign-in

server/db/schema/
├── projectMembership.ts              # userId + projectId + role
└── relations.ts                      # All relations including cross-layer

app/
├── composables/useAccess.ts          # Membership/permissions context
└── pages/admin/[projectSlug]/members.vue
```

## Implementation Steps

### 1. Install Dependencies

```bash
pnpm add better-auth
```

### 2. Create Auth Layer Schema

**`layers/auth/server/db/schema/auth.ts`** - Define better-auth core tables:

- `user` (id, name, email, emailVerified, image, createdAt, updatedAt)
- `session` (id, userId, token, expiresAt, ipAddress, userAgent, timestamps)
- `account` (id, userId, accountId, providerId, tokens, timestamps)
- `verification` (id, identifier, value, expiresAt, timestamps)

### 3. Create Project Membership Schema

**`server/db/schema/projectMembership.ts`** - Project membership:

- Composite PK: (userId, projectId)
- role: "owner" | "member"
- FK refs to user.id and project.id

Update `server/db/schema/relations.ts` to add user-membership-project relations.

### 4. Create Auth Layer Structure

**`layers/auth/nuxt.config.ts`**:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      secret: "",
      google: { clientId: "", clientSecret: "" },
    },
    public: { authUrl: "" },
  },
})
```

**`layers/auth/server/utils/auth.ts`** - Server auth instance using drizzleAdapter with `hub:db`

**`layers/auth/server/api/auth/[...all].ts`** - Handler: `auth.handler(toWebRequest(event))`

**`layers/auth/app/composables/useAuth.ts`** - Client with:

- `useSession(useFetch)` for SSR
- `signInWithGoogle()`
- `signOut()`

**`layers/auth/app/middleware/auth.global.ts`** - Route protection using useAuth

**`layers/auth/app/pages/login.vue`** - Login page with Google sign-in button

### 5. Migrate Existing Code

| File                            | Action                                              |
| ------------------------------- | --------------------------------------------------- |
| `app/composables/useUser.ts`    | Rename to useAccess, delegate auth, add memberships |
| `app/pages/login.vue`           | Delete (replaced by layer)                          |
| `app/middleware/auth.global.ts` | Delete (replaced by layer)                          |
| `nuxt.config.ts`                | Add layers/auth, add runtimeConfig for auth secrets |

### 6. Add User Memberships API

**`server/api/user/memberships.get.ts`** - Fetch current user's project memberships using `auth.api.getSession()`

### 7. Environment Variables

```env
BETTER_AUTH_SECRET=<random-32-char>
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
```

### 8. Project Members Management (Owner UI)

**API Endpoints:**

- `server/api/projects/[projectId]/members.get.ts` - List project members (owner only)
- `server/api/projects/[projectId]/members.post.ts` - Invite user by email (owner only)
- `server/api/projects/[projectId]/members/[userId].delete.ts` - Remove member (owner only)

**UI:**

- `app/pages/admin/[projectSlug]/members.vue` - Members management page
  - Table showing members (email, name, role, joined date)
  - Invite form (email input)
  - Remove member button with inline confirmation

**Behavior:**

- Invite by email - user can sign in later and automatically gains access
- Invited users are always "member" role (no role changes for now)
- Only the project creator is "owner"

### 9. Run Migrations

```bash
nr db:generate
nr db:migrate
```

## Files to Create

| Path                                                         | Purpose                   |
| ------------------------------------------------------------ | ------------------------- |
| `layers/auth/nuxt.config.ts`                                 | Layer config              |
| `layers/auth/server/db/schema/auth.ts`                       | Auth tables               |
| `layers/auth/server/utils/auth.ts`                           | Server auth instance      |
| `layers/auth/server/api/auth/[...all].ts`                    | API handler               |
| `layers/auth/app/composables/useAuth.ts`                     | Client composable         |
| `layers/auth/app/middleware/auth.global.ts`                  | Route protection          |
| `layers/auth/app/pages/login.vue`                            | Login page                |
| `server/db/schema/projectMembership.ts`                      | Membership table          |
| `server/api/user/memberships.get.ts`                         | User memberships endpoint |
| `server/api/projects/[projectId]/members.get.ts`             | List project members      |
| `server/api/projects/[projectId]/members.post.ts`            | Invite member             |
| `server/api/projects/[projectId]/members/[userId].delete.ts` | Remove member             |
| `app/pages/admin/[projectSlug]/members.vue`                  | Members management UI     |

## Files to Modify

| Path                            | Changes                                             |
| ------------------------------- | --------------------------------------------------- |
| `server/db/schema/relations.ts` | Add user-membership-project relations               |
| `app/composables/useUser.ts`    | Rename to useAccess.ts, delegate auth + memberships |
| `nuxt.config.ts`                | Add layers/auth, add runtimeConfig                  |
| `.env`                          | Add auth secrets                                    |

## Files to Delete

| Path                            | Reason                       |
| ------------------------------- | ---------------------------- |
| `app/middleware/auth.global.ts` | Replaced by layer middleware |
| `app/pages/login.vue`           | Replaced by layer page       |

## Design Decisions

1. **Membership requires invite** - Users can sign in via Google but cannot access any project until explicitly invited by a project owner
2. **Node.js deployment** - Standard SQLite file storage, no Cloudflare D1 considerations
3. **Layer architecture** - Auth logic isolated in `layers/auth/` for clean separation
4. **Future-ready naming** - `useAccess` instead of `useUser` to enable future `layers/access/` extraction (membership + authorization)
