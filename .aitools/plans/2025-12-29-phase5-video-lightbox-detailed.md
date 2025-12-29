# Phase 5: Video in PhotoSwipe Lightbox - Detailed Implementation Plan

## Overview

Unify image and video viewing by integrating video playback into the PhotoSwipe lightbox. Users can swipe seamlessly between images and videos.

**Current state:**

- Images open in PhotoSwipe lightbox
- Videos play inline in grid (VideoGridItem manages its own play state)
- Inconsistent UX between media types

**Target state:**

- Both images and videos open in PhotoSwipe lightbox
- Videos use custom content API to render `<video>` elements
- Autoplay on slide enter, pause on slide leave
- Unified swipe/keyboard navigation across all media

---

## Implementation

### 1. Extend useLightbox composable

**File:** `app/composables/useLightbox.ts`

Add video support via PhotoSwipe's custom content API:

```typescript
import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

interface LightboxMedia {
  fullUrl: string
  thumbnailUrl: string
  width: number | null
  height: number | null
  kind: "image" | "video"
  posterUrl?: string
  processing?: boolean
}

export function useLightbox(media: Ref<LightboxMedia[]>) {
  const lightbox = ref<PhotoSwipeLightbox | null>(null)
  const triggerElement = ref<HTMLElement | null>(null)

  const dataSource = computed(() =>
    media.value.map((item) => ({
      src: item.fullUrl,
      msrc: item.thumbnailUrl,
      width: item.width ?? 1600,
      height: item.height ?? 1200,
      // Custom properties for video handling
      type: item.kind === "video" ? "video" : "image",
      posterUrl: item.posterUrl,
      processing: item.processing,
    })),
  )

  onMounted(() => {
    lightbox.value = new PhotoSwipeLightbox({
      dataSource: dataSource.value,
      pswpModule: () => import("photoswipe"),
      preload: [1, 2],
      closeOnVerticalDrag: true,
    })

    // Handle video content loading
    lightbox.value.on("contentLoad", (e) => {
      const { content } = e
      if (content.data.type !== "video") return

      e.preventDefault()

      // Create video element
      content.videoElement = document.createElement("video")
      content.videoElement.className = "pswp__video"
      content.videoElement.src = content.data.src
      content.videoElement.poster = content.data.posterUrl || content.data.msrc
      content.videoElement.controls = true
      content.videoElement.playsInline = true
      content.videoElement.preload = "metadata"

      // Set element for PhotoSwipe
      content.element = content.videoElement

      // Mark as loaded immediately (video will buffer on play)
      content.state = "loaded"
      content.onLoaded()
    })

    // Custom append for video
    lightbox.value.on("contentAppend", (e) => {
      const { content } = e
      if (content.videoElement && !content.videoElement.parentNode) {
        e.preventDefault()
        content.slide.container.appendChild(content.videoElement)
      }
    })

    // Custom remove for video
    lightbox.value.on("contentRemove", (e) => {
      const { content } = e
      if (content.videoElement) {
        e.preventDefault()
        content.videoElement.pause()
        content.videoElement.remove()
        content.videoElement = null
      }
    })

    // Pause videos when changing slides
    lightbox.value.on("change", () => {
      const pswp = lightbox.value?.pswp
      if (!pswp) return

      // Pause all videos except current
      pswp.mainScroll.itemHolders.forEach((holder) => {
        if (holder.slide && holder.slide !== pswp.currSlide) {
          const video = holder.slide.container.querySelector("video")
          if (video) video.pause()
        }
      })

      // Autoplay current video (if it's a video slide)
      const currVideo = pswp.currSlide?.container.querySelector("video")
      if (currVideo) {
        currVideo.play().catch(() => {
          // Autoplay blocked - user will click play
        })
      }
    })

    // Pause all videos on close
    lightbox.value.on("close", () => {
      const pswp = lightbox.value?.pswp
      if (!pswp) return

      pswp.mainScroll.itemHolders.forEach((holder) => {
        const video = holder.slide?.container.querySelector("video")
        if (video) video.pause()
      })
    })

    // Restore focus after lightbox closes
    lightbox.value.on("destroy", () => {
      setTimeout(() => {
        triggerElement.value?.focus()
        triggerElement.value = null
      }, 50)
    })

    lightbox.value.init()
  })

  // Update data source when media changes
  watch(dataSource, (newSource) => {
    if (lightbox.value) {
      lightbox.value.options.dataSource = newSource
    }
  })

  const open = (index: number, trigger?: HTMLElement) => {
    // Don't open lightbox for processing videos
    const item = media.value[index]
    if (item?.kind === "video" && item.processing) return

    triggerElement.value = trigger ?? (document.activeElement as HTMLElement)
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

### 2. Add video styles

**File:** `app/assets/css/lightbox.css` (or inline in composable)

```css
.pswp__video {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background: black;
}
```

Import in `app/app.vue` or composable.

---

### 3. Simplify VideoGridItem

**File:** `app/components/album/VideoGridItem.vue`

Remove inline player logic, emit click event like GridItem:

```vue
<template>
  <button
    type="button"
    class="video-grid-item"
    :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: `translate(${box.left}px, ${box.top}px)`,
    }"
    :disabled="media.processing"
    @click="handleClick"
  >
    <div
      v-if="media.lqip"
      class="video-grid-item__lqip"
      :style="{ backgroundImage: `url(${media.lqip})` }"
    ></div>
    <img
      :src="media.thumbnailUrl"
      :alt="altText"
      :loading="eager ? 'eager' : 'lazy'"
      class="video-grid-item__img"
      @load="($event.target as HTMLImageElement).classList.add('loaded')"
    />
    <span v-if="media.processing" class="video-overlay processing">
      Processing...
    </span>
    <span v-else class="video-overlay play-icon">&#9654;</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    lqip: string | null
    originalName?: string | null
    processing?: boolean
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

const props = defineProps<Props>()
const emit = defineEmits<{
  open: [index: number, trigger: HTMLElement]
}>()

const altText = computed(() => {
  if (props.media.originalName) {
    return props.media.originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
  }
  return `Video ${props.index + 1}`
})

function handleClick(event: MouseEvent) {
  if (!props.media.processing) {
    emit("open", props.index, event.currentTarget as HTMLElement)
  }
}
</script>

<style scoped>
.video-grid-item {
  position: absolute;
  overflow: hidden;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--surface-2);
}

.video-grid-item:disabled {
  cursor: not-allowed;
}

.video-grid-item:focus-visible {
  outline: 2px solid var(--primary-6);
  outline-offset: 2px;
  z-index: 1;
}

.video-grid-item__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.video-grid-item__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-grid-item__img.loaded {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.play-icon {
  font-size: 3rem;
}

.processing {
  font-size: 0.875rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
</style>
```

---

### 4. Update JustifiedGrid

**File:** `app/components/album/JustifiedGrid.vue`

Pass video clicks to lightbox (same as images):

```vue
<template>
  <div
    ref="containerRef"
    class="justified-grid"
    :style="{ height: `${containerHeight}px` }"
  >
    <template v-for="(item, index) in media" :key="item.id">
      <VideoGridItem
        v-if="item.kind === 'video'"
        :media="item"
        :box="boxes[index]"
        :index="index"
        :eager="index < 12"
        @open="openLightbox"
      />
      <GridItem
        v-else
        :media="item"
        :box="boxes[index]"
        :index="index"
        :eager="index < 12"
        @open="openLightbox"
      />
    </template>
  </div>
</template>
```

The `@open` handler should be the same for both - it calls `open(index, trigger)` from useLightbox.

---

### 5. Update album page

**File:** `app/pages/a/[slug].vue`

Ensure media passed to useLightbox includes video properties:

```typescript
const lightboxMedia = computed(() =>
  albumMedia.value.map((item) => ({
    fullUrl: item.fullUrl,
    thumbnailUrl: item.thumbnailUrl,
    width: item.width,
    height: item.height,
    kind: item.kind,
    posterUrl: item.posterUrl,
    processing: item.processing,
  })),
)

const { open } = useLightbox(lightboxMedia)
```

---

## Files to Modify

| File                                     | Action |
| ---------------------------------------- | ------ |
| `app/composables/useLightbox.ts`         | Modify |
| `app/components/album/VideoGridItem.vue` | Modify |
| `app/components/album/JustifiedGrid.vue` | Verify |
| `app/pages/a/[slug].vue`                 | Verify |

---

## Implementation Order

```
1. Update useLightbox.ts with video content handlers
2. Add video CSS styles
3. Simplify VideoGridItem (remove inline player, add @open emit, add duration badge)
4. Verify JustifiedGrid passes video clicks correctly
5. Verify album page passes video properties to lightbox
6. Test full flow
```

---

## Testing Checklist

- [ ] Click on image - opens in PhotoSwipe lightbox
- [ ] Click on video - opens in PhotoSwipe lightbox with video player
- [ ] Swipe from image to video - video appears, can play
- [ ] Swipe from video to image - video pauses, image appears
- [ ] Video autoplay on slide enter (falls back gracefully if blocked)
- [ ] Video pause on slide leave
- [ ] Escape key closes lightbox (including during video playback)
- [ ] Arrow keys navigate between images and videos
- [ ] Click on processing video - nothing happens (disabled)
- [ ] Focus returns to trigger element after lightbox close
- [ ] Duration badge shows on video thumbnails (e.g., "1:23")
- [ ] Duration badge hidden if duration is null/zero

---

## Verification

```bash
nr verify
nr dev    # Test video playback in lightbox
```

---

## Decisions

- **Autoplay:** Try autoplay on slide enter, fall back gracefully if browser blocks (user clicks play)
- **Video preloading:** `preload="metadata"` - load dimensions/duration but not full video
- **Duration badge:** Yes - show duration on grid thumbnails (e.g., "0:32")

---

## 6. Duration Badge on VideoGridItem

Add duration display to video thumbnails:

```vue
<span v-if="media.duration" class="video-duration">
  {{ formatDuration(media.duration) }}
</span>
```

```typescript
function formatDuration(seconds: number | null): string {
  if (!seconds) return ""
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
```

```css
.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-variant-numeric: tabular-nums;
}
```
