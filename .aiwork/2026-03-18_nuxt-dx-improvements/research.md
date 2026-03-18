---
status: complete
---

# Nuxt DX Improvements - Research

Three suggestions investigated: `createUseFetch` factory, `appLayout` route rule, `useAnnouncer` for a11y.

## 1. createUseFetch Factory (Nuxt 4.4+)

**Feature**: `createUseFetch` is a built-in Nuxt 4.x utility that creates a reusable fetch composable with shared defaults.

**Current state**: 18 `useFetch` calls + 9 `$fetch` calls across the app, no custom wrapper. Zero `useAsyncData` calls.

**Duplication found**:

- `/api/projects` fetched 6+ times across components
- `/api/categories` fetched 5+ times
- `/api/albums` fetched 5+ times
- No consistent error handling (6 files handle errors, 12 ignore them)
- Mixed `await useFetch()` vs bare `useFetch()` patterns

**Implementation**:

```ts
// app/composables/useApi.ts
export const useApi = createUseFetch({
  onResponseError({ response }) {
    // centralized error handling, e.g. 401 redirect
    if (response.status === 401) {
      navigateTo("/login")
    }
  },
})
```

Then replace `useFetch('/api/projects')` with `useApi('/api/projects')` across the app.

**Verdict**: High value. Centralizes error handling, reduces duplication, enables future additions (auth headers, base URL) in one place.

## 2. appLayout Route Rule

**Feature**: Nuxt 4.x supports `appLayout` in `routeRules` to assign layouts centrally.

```ts
// nuxt.config.ts
routeRules: {
  '/admin/**': { appLayout: 'admin' },
}
```

**Current state**: 16 admin pages each have `definePageMeta({ layout: 'admin' })`. All live under `/admin/**` path. No `routeRules` in config yet.

**Caveat**: `admin/profile.vue` also sets `pageName: 'Profil'` - that custom property would still need `definePageMeta`, but the layout can be dropped from it.

**Verdict**: Medium value. Removes 16 boilerplate lines, single source of truth for admin layout. Simple change.

## 3. useAnnouncer for Accessibility

**Feature**: A composable that manages a visually-hidden `aria-live` region to announce dynamic content changes to screen readers. Not built into Nuxt - would be a custom composable or use `@vueuse/integrations` or a dedicated library.

**Current a11y state**: Minimal. One `aria-live="polite"` in AdminSidebar for loading. Layouts have basic `aria-label`, `aria-expanded`, `aria-current`. No route change announcements.

**Blind spots (by impact)**:

| Area                         | Issue                                        |
| ---------------------------- | -------------------------------------------- |
| File uploads (MediaUploader) | Progress/completion/error not announced      |
| Route changes                | No page title announcements on navigation    |
| Data loading                 | 18 `useFetch` pending states invisible to SR |
| Error messages               | Auto-clearing errors missed by SR            |
| Lightbox (PhotoSwipe)        | Slide position "X of Y" not announced        |
| Sort changes                 | Album reordering silent                      |
| Empty states                 | "No projects" messages not semantic          |

**Implementation sketch**:

```ts
// app/composables/useAnnouncer.ts
const announcement = useState("announcer", () => "")

export function useAnnouncer() {
  function announce(message: string) {
    announcement.value = ""
    nextTick(() => {
      announcement.value = message
    })
  }
  return { announcement: readonly(announcement), announce }
}
```

Plus a global `<div aria-live="polite" class="sr-only">{{ announcement }}</div>` in the default/admin layouts.

**Verdict**: Medium-high value for accessibility. Quick win for route changes and upload status. The app is in Czech, so all announcements need Czech strings.
