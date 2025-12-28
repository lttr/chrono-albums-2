# Phase 2: Core Frontend - Detailed Implementation Plan

## Overview

Phase 2 builds the public-facing photo browsing experience.

**Current state:**

- `app/pages/index.vue` - Empty placeholder (`<h1>Chrono Albums</h1>`)
- `app/pages/a/[slug].vue` - Basic auto-grid, no justified layout, opens images in new tab
- No lightbox/gallery viewer
- API returns variant URLs (`thumbnailUrl`, `fullUrl`, `originalUrl`) and `lqip`

**Target state:**

- Timeline home page with albums grouped by year
- Justified grid layout for album photos
- PhotoSwipe lightbox with gestures and keyboard nav
- LQIP blur-up loading pattern

---

## Dependencies

```bash
pnpm add justified-layout photoswipe
```

- `justified-layout` - Flickr's grid algorithm (55KB, ISC license)
- `photoswipe` - Lightbox with gestures (17KB, MIT license)

---

## 3. Timeline View (Home)

### 3.1 Timeline API Endpoint

**File:** `server/api/timeline.get.ts`

Returns albums grouped by year for the timeline display.

**Tasks:**

- [ ] Create `server/api/timeline.get.ts`
- [ ] Query albums with cover from earliest photo (by dateTaken)
- [ ] Group by year, sort: year DESC → month DESC → title ASC
- [ ] Return year sections with album cards data

**Response shape:**

```typescript
interface TimelineResponse {
  years: {
    year: number
    albums: {
      id: string
      slug: string
      title: string
      month: number | null
      year: number
      coverThumbnail: string | null // First media thumbnailUrl
      coverLqip: string | null // First media LQIP
      mediaCount: number
      projectName: string | null
      categoryName: string | null
    }[]
  }[]
}
```

**Implementation:**

```typescript
export default defineEventHandler(async () => {
  const db = useDb()

  // Get albums with first media for cover
  const albums = await db
    .select({
      id: album.id,
      slug: album.slug,
      title: album.title,
      month: album.month,
      year: album.year,
      projectName: project.name,
      categoryName: category.name,
    })
    .from(album)
    .leftJoin(project, eq(album.projectId, project.id))
    .leftJoin(category, eq(album.categoryId, category.id))
    .orderBy(desc(album.year), desc(album.month), asc(album.title))

  // Get earliest photo per album as cover (by dateTaken, fallback to createdAt)
  const albumIds = albums.map((a) => a.id)

  // SQLite: get all media sorted, then pick first per album in JS
  const allMedia = await db
    .select({
      albumId: media.albumId,
      slug: media.slug,
      lqip: media.lqip,
      dateTaken: media.dateTaken,
      createdAt: media.createdAt,
    })
    .from(media)
    .where(inArray(media.albumId, albumIds))
    .orderBy(asc(media.dateTaken), asc(media.createdAt))

  // Pick first media per album
  const coverMap = new Map<string, { slug: string; lqip: string | null }>()
  for (const m of allMedia) {
    if (!coverMap.has(m.albumId)) {
      coverMap.set(m.albumId, { slug: m.slug, lqip: m.lqip })
    }
  }

  // Get media counts per album
  const counts = await db
    .select({
      albumId: media.albumId,
      count: count(),
    })
    .from(media)
    .groupBy(media.albumId)
    .where(inArray(media.albumId, albumIds))

  // Group by year
  const yearMap = new Map<number, typeof albums>()
  for (const a of albums) {
    const list = yearMap.get(a.year) ?? []
    list.push(a)
    yearMap.set(a.year, list)
  }

  return {
    years: [...yearMap.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, albums]) => ({ year, albums })),
  }
})
```

---

### 3.2 Album Card Component

**File:** `app/components/timeline/AlbumCard.vue`

Displays album thumbnail, title, date, and photo count.

**Tasks:**

- [ ] Create `app/components/timeline/AlbumCard.vue`
- [ ] Show cover thumbnail with LQIP blur-up
- [ ] Display title, month/year, photo count
- [ ] Link to album page `/a/[slug]`
- [ ] Responsive sizing

**Props:**

```typescript
interface Props {
  slug: string
  title: string
  month: number | null
  year: number
  coverThumbnail: string | null
  coverLqip: string | null
  mediaCount: number
  projectName?: string | null
  categoryName?: string | null
}
```

**Template:**

```vue
<template>
  <NuxtLink :to="`/a/${slug}`" class="album-card">
    <div class="album-card__cover">
      <div
        v-if="coverLqip"
        class="album-card__lqip"
        :style="{ backgroundImage: `url(${coverLqip})` }"
      />
      <img
        v-if="coverThumbnail"
        :src="coverThumbnail"
        :alt="title"
        loading="lazy"
        @load="$event.target.classList.add('loaded')"
      />
      <div v-else class="album-card__placeholder">
        <span>No photos</span>
      </div>
    </div>
    <div class="album-card__info">
      <h3 class="album-card__title">{{ title }}</h3>
      <p class="album-card__meta">
        <span v-if="month">{{ formatMonth(month) }} </span>{{ year }}
        <span class="album-card__count">{{ mediaCount }} photos</span>
      </p>
    </div>
  </NuxtLink>
</template>
```

---

### 3.3 Year Section Component

**File:** `app/components/timeline/YearSection.vue`

Groups albums under a year header with anchor navigation.

**Tasks:**

- [ ] Create `app/components/timeline/YearSection.vue`
- [ ] Year header as anchor target (`id="year-{year}"`)
- [ ] Grid of AlbumCard components
- [ ] Responsive grid layout

**Template:**

```vue
<template>
  <section :id="`year-${year}`" class="year-section">
    <h2 class="year-section__heading">{{ year }}</h2>
    <div class="year-section__grid">
      <AlbumCard v-for="album in albums" :key="album.id" v-bind="album" />
    </div>
  </section>
</template>
```

---

### 3.4 Timeline Page

**File:** `app/pages/index.vue` (rewrite)

Main timeline view displaying all albums grouped by year.

**Tasks:**

- [ ] Rewrite `app/pages/index.vue`
- [ ] Fetch from `/api/timeline`
- [ ] Render YearSection for each year
- [ ] Handle empty state
- [ ] Add SEO meta tags

**Template:**

```vue
<script setup lang="ts">
const { data: timeline } = await useFetch("/api/timeline")

useHead({
  title: "Photo Albums",
  meta: [{ name: "description", content: "Browse photo albums by year" }],
})
</script>

<template>
  <div class="timeline-page">
    <header class="timeline-header">
      <h1>Photo Albums</h1>
    </header>

    <main class="timeline-content">
      <YearSection
        v-for="{ year, albums } in timeline?.years"
        :key="year"
        :year="year"
        :albums="albums"
      />

      <div v-if="!timeline?.years.length" class="empty-state">
        <p>No albums yet.</p>
      </div>
    </main>
  </div>
</template>
```

---

## 4. Album Grid (Justified Layout)

### 4.1 Add justified-layout Dependency

```bash
pnpm add justified-layout
```

- [ ] Install justified-layout
- [ ] Verify types (has built-in TypeScript types)

---

### 4.2 Justified Grid Composable

**File:** `app/composables/useJustifiedLayout.ts`

Wraps justified-layout for reactive container width.

**Tasks:**

- [ ] Create `app/composables/useJustifiedLayout.ts`
- [ ] Accept media items with aspect ratios
- [ ] React to container width changes
- [ ] Return box positions and container height

**Implementation:**

```typescript
import justifiedLayout from "justified-layout"
import type { JustifiedLayoutResult } from "justified-layout"

interface MediaItem {
  id: string
  width: number | null
  height: number | null
}

interface JustifiedOptions {
  targetRowHeight?: number
  targetRowHeightMobile?: number
  boxSpacing?: number
  containerPadding?: number
  mobileBreakpoint?: number
}

export function useJustifiedLayout(
  items: Ref<MediaItem[]>,
  containerRef: Ref<HTMLElement | null>,
  options: JustifiedOptions = {},
) {
  const {
    targetRowHeight = 280,
    targetRowHeightMobile = 240,
    boxSpacing = 4,
    containerPadding = 0,
    mobileBreakpoint = 640,
  } = options

  const layout = ref<JustifiedLayoutResult | null>(null)
  const containerWidth = ref(0)

  const aspectRatios = computed(() =>
    items.value.map((item) => {
      const w = item.width ?? 4
      const h = item.height ?? 3
      return w / h
    }),
  )

  const calculate = () => {
    if (!containerRef.value) return
    containerWidth.value = containerRef.value.offsetWidth

    const rowHeight =
      containerWidth.value < mobileBreakpoint
        ? targetRowHeightMobile
        : targetRowHeight

    layout.value = justifiedLayout(aspectRatios.value, {
      containerWidth: containerWidth.value,
      targetRowHeight: rowHeight,
      boxSpacing,
      containerPadding,
    })
  }

  // Recalculate on resize
  useResizeObserver(containerRef, calculate)

  // Recalculate when items change
  watch(items, calculate, { immediate: true })

  return {
    layout,
    containerWidth,
    boxes: computed(() => layout.value?.boxes ?? []),
    containerHeight: computed(() => layout.value?.containerHeight ?? 0),
  }
}
```

---

### 4.3 Grid Item Component

**File:** `app/components/album/GridItem.vue`

Single photo in justified grid with LQIP blur-up.

**Tasks:**

- [ ] Create `app/components/album/GridItem.vue`
- [ ] Accept position props from justified-layout
- [ ] Show LQIP as blurred background
- [ ] Load thumbnail, fade in on load
- [ ] Click handler for lightbox
- [ ] Keyboard accessible (button role)

**Props:**

```typescript
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    lqip: string | null
  }
  box: {
    width: number
    height: number
    top: number
    left: number
  }
  index: number
  eager?: boolean
}
```

**Template:**

```vue
<template>
  <button
    type="button"
    class="grid-item"
    :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: `translate(${box.left}px, ${box.top}px)`,
    }"
    @click="$emit('click', index)"
  >
    <div
      v-if="media.lqip"
      class="grid-item__lqip"
      :style="{ backgroundImage: `url(${media.lqip})` }"
    />
    <img
      :src="media.thumbnailUrl"
      :alt="`Photo ${index + 1}`"
      :loading="eager ? 'eager' : 'lazy'"
      class="grid-item__img"
      @load="$event.target.classList.add('loaded')"
    />
  </button>
</template>

<style scoped>
.grid-item {
  position: absolute;
  overflow: hidden;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--surface-2);
}

.grid-item__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.grid-item__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grid-item__img.loaded {
  opacity: 1;
}
</style>
```

---

### 4.4 Justified Grid Component

**File:** `app/components/album/JustifiedGrid.vue`

Container for justified photo grid.

**Tasks:**

- [ ] Create `app/components/album/JustifiedGrid.vue`
- [ ] Use `useJustifiedLayout` composable
- [ ] Render GridItem for each photo
- [ ] Eager load first 12 items
- [ ] Emit click events for lightbox

**Template:**

```vue
<script setup lang="ts">
interface MediaItem {
  id: string
  slug: string
  width: number | null
  height: number | null
  thumbnailUrl: string
  fullUrl: string
  lqip: string | null
}

const props = defineProps<{
  media: MediaItem[]
}>()

const emit = defineEmits<{
  open: [index: number]
}>()

const containerRef = ref<HTMLElement | null>(null)
const { boxes, containerHeight } = useJustifiedLayout(
  computed(() => props.media),
  containerRef,
  { targetRowHeight: 280, boxSpacing: 4 },
)
</script>

<template>
  <div
    ref="containerRef"
    class="justified-grid"
    :style="{ height: `${containerHeight}px` }"
  >
    <GridItem
      v-for="(item, index) in media"
      :key="item.id"
      :media="item"
      :box="boxes[index]"
      :index="index"
      :eager="index < 12"
      @click="emit('open', index)"
    />
  </div>
</template>

<style scoped>
.justified-grid {
  position: relative;
  width: 100%;
}
</style>
```

---

### 4.5 Album Page Rewrite

**File:** `app/pages/a/[slug].vue` (rewrite)

**Tasks:**

- [ ] Rewrite `app/pages/a/[slug].vue`
- [ ] Replace auto-grid with JustifiedGrid
- [ ] Integrate lightbox (open on click)
- [ ] Keep breadcrumb navigation
- [ ] Add album header (title, date, count)
- [ ] Handle empty album state

---

## 5. Lightbox

### 5.1 Add PhotoSwipe Dependency

```bash
pnpm add photoswipe
```

- [ ] Install photoswipe
- [ ] Note: CSS included via import

---

### 5.2 Lightbox Composable

**File:** `app/composables/useLightbox.ts`

Wraps PhotoSwipe for Vue integration.

**Tasks:**

- [ ] Create `app/composables/useLightbox.ts`
- [ ] Initialize PhotoSwipe on mount
- [ ] Accept media array with URLs and dimensions
- [ ] Provide `open(index)` function
- [ ] Handle cleanup on unmount
- [ ] Preload adjacent images (±1)

**Implementation:**

```typescript
import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

interface LightboxMedia {
  fullUrl: string
  thumbnailUrl: string
  width: number | null
  height: number | null
}

export function useLightbox(media: Ref<LightboxMedia[]>) {
  const lightbox = ref<PhotoSwipeLightbox | null>(null)

  const dataSource = computed(() =>
    media.value.map((item) => ({
      src: item.fullUrl,
      msrc: item.thumbnailUrl,
      width: item.width ?? 1600,
      height: item.height ?? 1200,
    })),
  )

  onMounted(() => {
    lightbox.value = new PhotoSwipeLightbox({
      dataSource: dataSource.value,
      pswpModule: () => import("photoswipe"),
      // Preload adjacent slides
      preload: [1, 2],
      // Close on vertical drag
      closeOnVerticalDrag: true,
      // Keyboard bindings (arrows, escape) enabled by default
    })
    lightbox.value.init()
  })

  // Update data source when media changes
  watch(dataSource, (newSource) => {
    if (lightbox.value) {
      lightbox.value.options.dataSource = newSource
    }
  })

  const open = (index: number) => {
    lightbox.value?.loadAndOpen(index)
  }

  onUnmounted(() => {
    lightbox.value?.destroy()
    lightbox.value = null
  })

  return { open }
}
```

---

### 5.3 Lightbox Integration

Integrate lightbox with album grid.

**Tasks:**

- [ ] Import `useLightbox` in album page
- [ ] Pass media array to composable
- [ ] Connect grid click events to `open(index)`
- [ ] Test keyboard navigation (arrows, escape)
- [ ] Test touch gestures (swipe, pinch-zoom)
- [ ] Verify focus returns to grid after close

**Usage in album page:**

```vue
<script setup lang="ts">
const { data } = await useFetch(`/api/albums/by-slug/${route.params.slug}`)

const { open } = useLightbox(computed(() => data.value?.media ?? []))
</script>

<template>
  <JustifiedGrid v-if="data?.media.length" :media="data.media" @open="open" />
</template>
```

---

## Files to Create/Modify

| File                                      | Action  |
| ----------------------------------------- | ------- |
| `server/api/timeline.get.ts`              | Create  |
| `app/components/timeline/AlbumCard.vue`   | Create  |
| `app/components/timeline/YearSection.vue` | Create  |
| `app/pages/index.vue`                     | Rewrite |
| `app/composables/useJustifiedLayout.ts`   | Create  |
| `app/components/album/GridItem.vue`       | Create  |
| `app/components/album/JustifiedGrid.vue`  | Create  |
| `app/pages/a/[slug].vue`                  | Rewrite |
| `app/composables/useLightbox.ts`          | Create  |

---

## Implementation Order

```
1. Dependencies
   └── pnpm add justified-layout photoswipe

2. Timeline View (Feature 3)
   ├── 3.1 Create timeline API endpoint
   ├── 3.2 Create AlbumCard component
   ├── 3.3 Create YearSection component
   └── 3.4 Rewrite index.vue

3. Justified Grid (Feature 4)
   ├── 4.2 Create useJustifiedLayout composable
   ├── 4.3 Create GridItem component
   ├── 4.4 Create JustifiedGrid component
   └── 4.5 Rewrite album page (without lightbox first)

4. Lightbox (Feature 5)
   ├── 5.2 Create useLightbox composable
   └── 5.3 Integrate with album grid
```

---

## Testing Checklist

- [ ] Timeline API returns albums grouped by year correctly
- [ ] Timeline API selects earliest photo as cover (by dateTaken)
- [ ] AlbumCard displays cover with LQIP blur-up
- [ ] Justified grid calculates layout on resize
- [ ] Justified grid uses responsive row heights (280px/240px)
- [ ] GridItem lazy loads with blur-up effect
- [ ] First 12 items eager load
- [ ] Lightbox opens at correct index
- [ ] Keyboard nav works (arrows, escape)
- [ ] Touch gestures work (swipe, pinch-zoom)
- [ ] Focus returns to grid item after lightbox close
- [ ] Empty states handled gracefully

---

## Verification

After Phase 2 completion:

```bash
nr verify        # Format + lint + typecheck
nr test          # Run tests
nr dev           # Test UI locally
```

---

## Styling Notes

Use existing Puleo CSS patterns:

- `--space-*` for spacing (1-12 scale)
- `--surface-*` for backgrounds
- `--text-color-*` for text
- `.p-flow` for vertical rhythm
- `.p-stack` for flex stacks

Grid and lightbox will need custom styles but should follow the variable naming conventions.

---

## Decisions Made

1. **justified-layout** over alternatives - Stable, minimal, no DOM manipulation
2. **PhotoSwipe** over alternatives - Lightest (17KB), Vue-compatible, gesture support
3. **Composables** for layout/lightbox - Reusable, testable, follows project patterns
4. **Eager load 12 items** - Above fold on most screens
5. **LQIP as CSS background** - Simpler than inline blur filter
6. **Cover image** - First by date taken (earliest photo in album)
7. **Year navigation** - None, just scroll through years naturally
8. **Row height** - Responsive: 280px desktop, 240px mobile
