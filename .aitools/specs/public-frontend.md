# Public Frontend Spec

Public-facing photo album views. Complements `image-pipeline.md`.

## Overview

Display chronologically organized photo albums with:

- Timeline navigation (albums grouped by year)
- Justified grid layout per album
- Lightbox for full-screen viewing
- Video support with poster frames

## Routes

| Route       | Purpose                                                  |
| ----------- | -------------------------------------------------------- |
| `/`         | Timeline - albums grouped by year, reverse chronological |
| `/a/[slug]` | Album detail with photo grid and lightbox                |
| `/p/[slug]` | Project overview                                         |
| `/c/[slug]` | Category albums list                                     |

## Timeline View

### Display

- Albums grouped by year headers
- Reverse chronological (newest year first)
- Within year: by month descending, then title alphabetically

### Album Card

- Thumbnail: first media item in album
- Title
- Month/Year
- Photo count badge

## Album Grid

### Layout Algorithm

Flickr's justified-layout algorithm:

- Target row height: 300px
- Row height tolerance: 25%
- Box spacing: 4px
- Full container width

### Grid Items

**Photos:**

- LQIP as CSS background (instant display from inlined base64)
- Thumbnail image loads over LQIP
- First 12 items: eager load
- Remaining: native lazy loading
- Click opens lightbox at that index

**Videos:**

- Poster frame thumbnail
- Play icon overlay (centered, white with shadow)
- Click opens video player (not lightbox)

## Lightbox

### Behavior

- Opens at clicked photo index
- Zoom animation from thumbnail bounds
- Keyboard navigation (arrows, escape)
- Swipe/pinch gestures on touch
- Preloads adjacent 1-2 images

### Image Loading

1. Thumbnail shown immediately (already cached from grid)
2. Full-size progressive JPEG loads
3. Blur-to-sharp rendering as progressive JPEG decodes

### Navigation

- Arrow keys / swipe: prev/next
- Escape / click backdrop: close
- Focus trapped while open
- Focus returns to trigger element on close

## Data Requirements

### Album Response

```typescript
interface AlbumResponse {
  id: number
  title: string
  slug: string
  year: number
  month: number | null
  media: MediaItem[]
}

interface MediaItem {
  id: number
  slug: string
  kind: "image" | "video"
  originalName: string
  width: number
  height: number
  dateTaken: string | null
  lqip: string // base64 data URI
  thumbnailUrl: string // 600px WebP
  fullUrl: string // 2000px progressive JPEG
}
```

## Performance Targets

| Metric             | Target            |
| ------------------ | ----------------- |
| Timeline LCP       | < 1.5s            |
| Album grid LCP     | < 1.5s            |
| Grid to lightbox   | < 100ms perceived |
| Layout shift (CLS) | 0                 |

## Accessibility

- Schema.org `ImageGallery` and `ImageObject` markup
- Grid items are focusable buttons
- Lightbox traps focus while open
- Keyboard navigation for all interactions

## Loading States

| State            | Display                                          |
| ---------------- | ------------------------------------------------ |
| Album loading    | Skeleton grid with placeholder boxes             |
| Album error      | "Album not found" message                        |
| Image loading    | LQIP visible, thumbnail fades in                 |
| Lightbox loading | Thumbnail visible, full-size loads progressively |

## Dependencies

| Package            | Purpose                 |
| ------------------ | ----------------------- |
| `justified-layout` | Flickr's grid algorithm |
| `photoswipe` v5    | Lightbox with gestures  |
