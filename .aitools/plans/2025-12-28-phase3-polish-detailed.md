# Phase 3: Polish - Detailed Implementation Plan

## Overview

Phase 3 adds accessibility polish for the small private user base.

**Scope:** Small app for a few users - skip SEO and caching optimizations.

**Current state:**

- Basic `useHead()` on pages (title, description)
- Grid items are focusable buttons (good baseline)
- No focus restoration after lightbox close
- Generic alt text ("Photo N")

**Target state:**

- Focus returns to grid item after lightbox closes
- Visible focus indicators for keyboard navigation
- Descriptive alt text from original filename

---

## Deferred (not needed for private app)

Decision: 2025-12-28 - App is for a small private user base, not public-facing.

**SSR + Caching (original section 6):**

- `routeRules` with stale-while-revalidate (1h pages, 5min API)
- Verify cache headers in production

**SEO (original section 7.1, 7.2, 7.5):**

- Schema.org JSON-LD for `ImageGallery` and `ImageObject` on album pages
- Schema.org `CollectionPage` on timeline
- Open Graph images (og:image from first thumbnail)
- Enhanced meta descriptions per album
- Canonical URLs

These can be revisited if the app becomes public-facing.

---

## 7. Accessibility

### 7.1 Focus Restoration After Lightbox

**File:** `app/composables/useLightbox.ts`

Track the trigger element and restore focus when lightbox closes.

**Tasks:**

- [ ] Store reference to trigger element when opening
- [ ] Listen to PhotoSwipe close event
- [ ] Restore focus to trigger element

**Implementation:**

```typescript
export function useLightbox(media: Ref<LightboxMedia[]>) {
  const lightbox = ref<PhotoSwipeLightbox | null>(null)
  const triggerElement = ref<HTMLElement | null>(null)

  // ... existing setup

  const open = (index: number, trigger?: HTMLElement) => {
    triggerElement.value = trigger ?? (document.activeElement as HTMLElement)
    lightbox.value?.loadAndOpen(index)
  }

  onMounted(() => {
    // ... existing init

    lightbox.value?.on("close", () => {
      // Restore focus after close animation
      setTimeout(() => {
        triggerElement.value?.focus()
        triggerElement.value = null
      }, 50)
    })
  })

  return { open }
}
```

---

### 7.2 Keyboard Focus Indicators

**File:** `app/components/album/GridItem.vue`

Add visible focus ring for keyboard users.

**Tasks:**

- [ ] Add focus-visible styles
- [ ] Add aria-label with descriptive text

**Implementation:**

```vue
<style scoped>
.grid-item:focus-visible {
  outline: 2px solid var(--primary-6);
  outline-offset: 2px;
  z-index: 1;
}
</style>
```

---

### 7.3 Improved Alt Text

**File:** `app/components/album/GridItem.vue`

Use original filename for alt text instead of generic "Photo N".

**Tasks:**

- [ ] Accept `originalName` in media prop
- [ ] Generate alt text from filename (strip extension, replace dashes/underscores)

**Implementation:**

```typescript
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    lqip: string | null
    originalName?: string | null
  }
  // ...
}

const altText = computed(() => {
  if (props.media.originalName) {
    return props.media.originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
  }
  return `Photo ${props.index + 1}`
})
```

```vue
<img :alt="altText" ... />
```

---

## Files to Modify

| File                                | Action |
| ----------------------------------- | ------ |
| `app/composables/useLightbox.ts`    | Modify |
| `app/components/album/GridItem.vue` | Modify |

---

## Implementation Order

```
1. Focus restoration (useLightbox.ts)
2. Focus indicators (GridItem.vue)
3. Alt text (GridItem.vue)
```

---

## Testing Checklist

- [ ] Open lightbox with keyboard (Enter), close (Escape), verify focus returns to same photo
- [ ] Tab through grid: visible focus ring appears
- [ ] Inspect alt text in dev tools - shows filename-based text

---

## Verification

```bash
nr verify
nr dev    # Test keyboard navigation
```
