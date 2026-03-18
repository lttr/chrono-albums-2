---
status: draft
---

# Dependency Update Assessment (2026-03-18)

## Breaking Changes

### 1. `better-auth` 1.4.7 → 1.5.5 - **Medium risk**

Major breaking release with many removed deprecated APIs. For this project:

- `drizzleAdapter` from `better-auth/adapters/drizzle` still works
- `createAuthClient` from `better-auth/vue` unchanged
- No usage of removed APIs (`InferUser`, `InferSession`, `apiKey`, `getMigrations`)
- **Action needed**: Run `npx auth migrate` after upgrading to apply any DB schema changes
- Full breaking changes: https://github.com/better-auth/better-auth/releases/tag/v1.5.0

### 2. `eslint` 9.39.1 → 10.0.3 - **Medium risk**

- Removes eslintrc support, deprecated SourceCode/context methods
- Requires Node ^20.19.0 || ^22.13.0 || >=24
- `@nuxt/eslint` v1.15.0 already supports ESLint 10
- Risk: custom rules or configs relying on removed APIs

### 3. `@nuxtjs/plausible` 2.0.1 → 3.0.2 - **Low risk**

- Migrated to `@plausible-analytics/tracker`
- Config API appears largely preserved
- Adds outbound link, file download, form submission tracking

### 4. `@nuxt/test-utils` 3.21.0 → 4.0.0 - **Low risk**

- Requires vitest v4 (already on 4.0.15)
- Main change: composables at top level of `describe` must move into `beforeAll`/`beforeEach`
- Stricter mock exports (accessing undefined export now throws)

### 5. `@nuxt/fonts` 0.12.1 → 0.14.0 - **Low risk**

- Default font format now woff2-only (reduces CSS size)
- Cache invalidated once after upgrade
- npm provider for resolving fonts from node_modules

### 6. `@libsql/client` 0.15.15 → 0.17.0 - **Low risk**

- Only used in `scripts/seed.ts` (just `createClient`)
- Changelog not published for 0.16-0.17, jumped from 0.15.x directly

## Notable New Features

- **`@nuxtjs/seo` 3.4.0**: `definePageMeta()` integration for robots/sitemap, `zeroRuntime` sitemap mode
- **`zod` 4.3.6**: `z.fromJSONSchema()`, `z.xor()`, `z.looseRecord()`, `.toJSONSchema()` method
- **`vitest` 4.1.0**: Bug fixes and dependency updates
- **`@vueuse/core` 14.2.1**: Minor features and fixes
- **`@sentry/nuxt` 10.44.0**: 12 minor versions of improvements
- **`@nuxthub/core` 0.10.7**: D1 migrations improvements, new `applyMigrationsDuringDev` option

## Upgrade Plan

### Step 1 - Safe batch (minor/patch, no breaking changes)

```bash
pnpm update @nuxt/icon @nuxtjs/seo @sentry/nuxt @vueuse/core @vueuse/nuxt exifreader happy-dom prettier vitest vue-tsc zod @nuxthub/core drizzle-kit unplugin-vue-router @lttr/nuxt-config-eslint
```

### Step 2 - ESLint ecosystem (together)

```bash
pnpm update @nuxt/eslint eslint
```

### Step 3 - Test utils

```bash
pnpm update @nuxt/test-utils
```

### Step 4 - Fonts

```bash
pnpm update @nuxt/fonts
```

### Step 5 - Plausible (verify tracking after)

```bash
pnpm update @nuxtjs/plausible
```

### Step 6 - better-auth (most complex, do last)

```bash
pnpm update better-auth
npx auth migrate
```

### Step 7 - libsql

```bash
pnpm update @libsql/client
```

### After each step

```bash
nr verify && nr test
```
