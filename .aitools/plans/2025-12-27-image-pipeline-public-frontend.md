# High-Level Implementation Plan: Public Photo Album

## Current State Summary

**Exists:**

- Database schema (Project → Category → Album → Media)
- Basic CRUD APIs for all entities
- Client-side HEIC→JPEG conversion + compression (3000px max)
- Single-file upload to NuxtHub blob storage
- Simple CSS grid display (not justified)
- Auth layer with project membership

**Missing (per specs):**

- Multi-tier image variants (Original/Full/Thumbnail/LQIP)
- Server-side Sharp processing
- Justified grid layout
- Lightbox with gestures
- Timeline view
- Video poster frames
- SSR caching strategy

---

## Feature Modules

### 1. Image Variant Pipeline

**Goal:** Generate 4 image tiers at upload time

| Tier      | Size       | Format                     | Purpose     |
| --------- | ---------- | -------------------------- | ----------- |
| Original  | 3500px max | JPEG 92                    | Archive     |
| Full      | 2000px     | Progressive JPEG (mozjpeg) | Lightbox    |
| Thumbnail | 600px      | WebP                       | Grid        |
| LQIP      | 20px       | JPEG base64                | Placeholder |

**Tasks:**

1. Add `sharp` dependency
2. Create variant generation service (`server/utils/image-variants.ts`)
3. Update upload endpoint to process variants
4. Add DB columns: `lqip`, `thumbnailPath`, `fullPath`

**Files to modify:**

- `server/api/upload.post.ts`
- `server/db/schema/media.ts`
- New: `server/utils/image-variants.ts`

---

### 2. Media API Enhancement ✅ DONE

**Goal:** Expose variant URLs in API responses

**Tasks:**

1. ✅ Update `GET /api/albums/by-slug/[slug]` to return slug-based URLs
2. ✅ Unified serving route: `server/routes/m/[...path].ts`
3. ✅ Add cache headers (immutable for variants)

**Routes:**

- `/m/{slug}` → full variant (default)
- `/m/{slug}/thumb` → thumbnail
- `/m/{slug}/original` → original with EXIF

**Response shape:**

```typescript
interface MediaItem {
  id: string
  slug: string
  kind: "image" | "video"
  width: number
  height: number
  lqip: string // base64 data URI
  thumbnailUrl: string // /m/{slug}/thumb
  fullUrl: string // /m/{slug}
  originalUrl: string // /m/{slug}/original
  dateTaken: string | null
}
```

---

### 3. Timeline View (Home)

**Goal:** Albums grouped by year, reverse chronological

**Route:** `/`

**Tasks:**

1. Create timeline API endpoint or extend albums API with grouping
2. Build timeline page component
3. Album cards: thumbnail, title, month/year, photo count
4. Year headers as navigation anchors
5. Sorting: year DESC → month DESC → title ASC

**Files:**

- `app/pages/index.vue` (rewrite)
- New: `app/components/timeline/AlbumCard.vue`
- New: `app/components/timeline/YearSection.vue`

---

### 4. Album Grid (Justified Layout)

**Goal:** Flickr-style justified photo grid

**Route:** `/a/[slug]`

**Tasks:**

1. Add `justified-layout` dependency
2. Create justified grid component
3. LQIP as CSS background-image (inline base64)
4. Thumbnail loads over LQIP
5. Eager load first 12, lazy load rest
6. Click opens lightbox at index

**Files:**

- `app/pages/a/[slug].vue` (rewrite)
- New: `app/components/album/JustifiedGrid.vue`
- New: `app/components/album/GridItem.vue`

---

### 5. Lightbox

**Goal:** Full-screen image viewer with gestures

**Tasks:**

1. Add `photoswipe` v5 dependency
2. Create lightbox composable
3. Integration with grid (open at index)
4. Thumbnail placeholder → full-size load
5. Adjacent image preloading (±1)
6. Keyboard nav (arrows, escape)
7. Touch gestures (swipe, pinch-zoom)
8. Focus trap and return

**Files:**

- New: `app/composables/useLightbox.ts`
- New: `app/components/lightbox/` (if needed beyond PhotoSwipe)

---

### 6. SSR + Caching Strategy

**Goal:** Fast page loads with stale-while-revalidate

**Tasks:**

1. Add routeRules in nuxt.config.ts:
   - `/`: swr 3600
   - `/a/**`: swr 3600
   - `/p/**`: swr 3600
   - `/c/**`: swr 3600
2. Image variants: `Cache-Control: immutable, max-age=31536000`
3. Consider cache invalidation on album updates

**Files:**

- `nuxt.config.ts`
- Variant serving routes (add headers)

---

### 7. Accessibility + SEO

**Goal:** Schema.org markup, keyboard navigation, focus management

**Tasks:**

1. Add Schema.org `ImageGallery` and `ImageObject` JSON-LD
2. Grid items as focusable buttons
3. Lightbox focus trap
4. Alt text from media metadata or filename
5. Update meta tags per album

**Files:**

- `app/pages/a/[slug].vue`
- `app/pages/index.vue`

---

## Implementation Order (Suggested)

```
Phase 1: Image Pipeline Foundation
├── 1. Image Variant Pipeline
└── 2. Media API Enhancement

Phase 2: Core Frontend
├── 3. Timeline View
├── 4. Album Grid (Justified Layout)
└── 5. Lightbox

Phase 3: Polish
├── 6. SSR + Caching
└── 7. Accessibility + SEO
```

**Deferred:** Video support (poster frames, player) - revisit after images complete

---

## Progress Tracking

### Phase 1: Image Pipeline Foundation

- [ ] **1. Image Variant Pipeline**
  - [ ] Add Sharp dependency
  - [ ] Create `server/utils/image-variants.ts`
  - [ ] Update DB schema (lqip, thumbnailPath, fullPath columns)
  - [ ] Run migrations
  - [ ] Update upload endpoint to generate variants
  - [ ] Update MediaUploader.vue to use new response
  - [ ] Test Sharp in NuxtHub preview deployment

- [ ] **2. Media API Enhancement**
  - [ ] Update album by-slug API to return variant URLs
  - [ ] Create `/photos/[...path].ts` serving route with cache headers
  - [ ] Add cache headers to existing `/m/[slug]` route

### Phase 2: Core Frontend

- [ ] **3. Timeline View**
  - [ ] Create timeline API endpoint
  - [ ] Build AlbumCard component
  - [ ] Build YearSection component
  - [ ] Rewrite index.vue

- [ ] **4. Album Grid (Justified Layout)**
  - [ ] Add justified-layout dependency
  - [ ] Create JustifiedGrid component
  - [ ] Create GridItem component with LQIP
  - [ ] Rewrite album page

- [ ] **5. Lightbox**
  - [ ] Add photoswipe dependency
  - [ ] Create useLightbox composable
  - [ ] Integrate with grid

### Phase 3: Polish

- [ ] **6. SSR + Caching**
  - [ ] Add routeRules in nuxt.config.ts
  - [ ] Verify cache headers

- [ ] **7. Accessibility + SEO**
  - [ ] Add Schema.org JSON-LD
  - [ ] Keyboard navigation
  - [ ] Focus management
  - [ ] Meta tags

---

## Dependencies to Add

```bash
pnpm add sharp                    # Server-side image processing
pnpm add justified-layout         # Flickr grid algorithm
pnpm add photoswipe               # Lightbox with gestures
```

---

## Database Migration

```sql
ALTER TABLE media ADD COLUMN lqip TEXT;
ALTER TABLE media ADD COLUMN thumbnail_path TEXT;
ALTER TABLE media ADD COLUMN full_path TEXT;
```

---

## Decisions Made

- **Video support:** Deferred to future phase
- **Migration:** Not needed (no existing media)
- **Storage:** NuxtHub blob (Cloudflare R2)

## Remaining Questions

1. **Cache invalidation** - On-demand purge or accept eventual consistency with short TTL?
2. **Original storage** - Keep originals in same blob bucket or separate path?

---

## Viability Research (2025-12-27)

### Sharp Integration ✅ Viable

**Status:** Production-ready with Nuxt/Nitro

- [Sharp v0.33+](https://github.com/lovell/sharp) - 190 code examples, High reputation
- Nuxt Image v2 uses IPX v3 with better Sharp binary handling
- Direct API matches spec exactly:

```typescript
// Progressive JPEG with mozjpeg
sharp(buffer)
  .resize(2000)
  .jpeg({ quality: 85, progressive: true, mozjpeg: true })

// WebP thumbnail
sharp(buffer).resize(600).webp({ quality: 75 })

// LQIP
sharp(buffer).resize(20).jpeg({ quality: 60 }).toBuffer()
```

**Concern:** Cloudflare Workers may need [sharp-wasm](https://github.com/nicknisi/sharp-wasm) or pre-process before deployment. Test in NuxtHub production first.

**References:**

- [Sharp resize docs](https://github.com/lovell/sharp/blob/main/docs/src/content/docs/api-resize.md)
- [Sharp output docs](https://github.com/lovell/sharp/blob/main/docs/src/content/docs/api-output.md)

---

### NuxtHub Blob Storage ✅ Viable

**Status:** Already in use (`@nuxthub/core` v0.10.1)

Multi-file storage pattern for variants:

```typescript
import { blob } from "hub:blob"

// Store multiple variants with different paths
await blob.put(`photos/${id}-original.jpg`, originalBuffer)
await blob.put(`photos/${id}-full.jpg`, fullBuffer)
await blob.put(`photos/${id}-thumb.webp`, thumbBuffer)
```

Serving with cache headers:

```typescript
// server/routes/photos/[...path].ts
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path")
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable")
  return hubBlob().serve(event, `photos/${path}`)
})
```

**References:**

- [NuxtHub Blob docs](https://hub.nuxt.com/docs/features/blob)
- [NuxtHub multi-vendor](https://hub.nuxt.com/changelog/nuxthub-multi-vendor)

---

### justified-layout ✅ Viable

**Status:** Stable, widely used

- [flickr/justified-layout](https://github.com/flickr/justified-layout) v4.1.0
- Last publish: 5 years ago (stable, no breaking changes needed)
- 55 KB, ISC license
- Simple API, no Vue wrapper needed

```typescript
import justifiedLayout from "justified-layout"

const geometry = justifiedLayout(
  photos.map((p) => p.width / p.height), // aspect ratios
  {
    containerWidth: containerRef.value?.offsetWidth,
    targetRowHeight: 300,
    boxSpacing: 4,
  },
)
// Returns: { containerHeight, boxes: [{ width, height, top, left }] }
```

**Alternative considered:** `flickr-justified-gallery` has ESM build but adds unnecessary DOM manipulation. Raw `justified-layout` + Vue is cleaner.

**References:**

- [justified-layout npm](https://www.npmjs.com/package/justified-layout)
- [Flickr demo](https://flickr.github.io/justified-layout/)

---

### PhotoSwipe ✅ Viable

**Status:** Well-documented, Vue 3 compatible

- [PhotoSwipe v5](https://github.com/dimsemenov/photoswipe) - 110 code examples
- [Official Vue example](https://photoswipe.com/vue-image-gallery/)
- Works with data array (no DOM dependency)

```typescript
// app/composables/useLightbox.ts
import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

export function useLightbox(photos: Ref<Photo[]>) {
  const lightbox = ref<PhotoSwipeLightbox | null>(null)

  onMounted(() => {
    lightbox.value = new PhotoSwipeLightbox({
      dataSource: photos.value.map((p) => ({
        src: p.fullUrl,
        width: p.width,
        height: p.height,
        msrc: p.thumbnailUrl, // thumbnail as placeholder
      })),
      pswpModule: () => import("photoswipe"),
      preloadFirstSlide: false,
    })
    lightbox.value.init()
  })

  const open = (index: number) => lightbox.value?.loadAndOpen(index)

  onUnmounted(() => lightbox.value?.destroy())

  return { open }
}
```

**Alternatives considered:**

- `vue3-picture-swipe` - Wrapper, but adds abstraction we don't need
- `lightgallery` - More features but heavier (70KB vs 17KB)
- `fancybox` - Commercial license for commercial use

**References:**

- [PhotoSwipe Vue Gallery](https://photoswipe.com/vue-image-gallery/)
- [PhotoSwipe data sources](https://github.com/dimsemenov/photoswipe/blob/master/docs/data-sources.md)
- [vue3-picture-swipe](https://github.com/Sitronik/vue3-picture-swipe)

---

### Existing Project Assets

Already installed and usable:

| Package         | Version | Use                                            |
| --------------- | ------- | ---------------------------------------------- |
| `@nuxthub/core` | 0.10.1  | Blob storage                                   |
| `@nuxt/image`   | 2.0.0   | Can use for `<NuxtImg>` with providers         |
| `@vueuse/nuxt`  | 14.1.0  | `useResizeObserver`, `useIntersectionObserver` |
| `compressorjs`  | 1.2.1   | Keep for client-side pre-compression           |
| `exifreader`    | 4.33.1  | Keep for EXIF extraction                       |

---

### Risk Assessment

| Risk                          | Likelihood | Mitigation                                                         |
| ----------------------------- | ---------- | ------------------------------------------------------------------ |
| Sharp in Cloudflare Workers   | Medium     | Fallback: `@nuxt/image` with IPX provider for on-demand processing |
| justified-layout unmaintained | Low        | Stable API, fork if needed                                         |
| PhotoSwipe CSS conflicts      | Low        | Scope styles, use CSS layers                                       |
| Large file upload timeouts    | Medium     | Use multipart upload for originals                                 |

### Fallback: IPX On-Demand Processing

If Sharp doesn't work in Cloudflare Workers, use `@nuxt/image` with IPX:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  image: {
    provider: "ipx",
    ipx: {
      // IPX uses Sharp internally but runs on Node.js
    },
  },
})
```

```vue
<!-- On-demand resizing via URL params -->
<NuxtImg
  :src="`/photos/${id}-original.jpg`"
  width="600"
  format="webp"
  quality="75"
/>
```

Trade-off: On-demand is slower first load but simpler deployment. Can cache aggressively with `routeRules`.

---

### Recommendations

1. **Start with Sharp locally** - Verify variant generation works before blob integration
2. **Test Sharp in NuxtHub preview** - Deploy early to catch Workers compatibility issues
3. **Use PhotoSwipe directly** - No wrapper needed, better control
4. **Create `useJustifiedLayout` composable** - Wrap the library for reactive container width
5. **Consider IPX provider** - `@nuxt/image` can use Sharp internally for on-demand resizing as fallback
