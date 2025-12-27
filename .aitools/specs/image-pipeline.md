# Photo Album Image Pipeline Spec

## Overview

Performant photo album with grid view (100+ photos per album), lightbox for full-screen viewing, and fast navigation between images. Optimized for perceived performance using LQIP placeholders and progressive loading.

## Image Tiers

| Tier      | Max Size  | Format           | Quality | Encoding | Purpose               |
| --------- | --------- | ---------------- | ------- | -------- | --------------------- |
| Original  | 3500×3500 | JPEG             | 92      | —        | Archive, print source |
| Full      | 2000px    | Progressive JPEG | 85      | mozjpeg  | Lightbox              |
| Thumbnail | 600px     | WebP             | 75      | libwebp  | Grid (@2x for 300px)  |
| LQIP      | 20px      | JPEG             | 60      | baseline | Inline placeholder    |

## Format Reasoning

### Original: JPEG 92

High quality source for potential print output. 92 is the threshold where JPEG artifacts become negligible for print. Higher values yield diminishing returns with significant file size increase.

### Full: Progressive JPEG (mozjpeg)

- **Progressive matters here** – blur-to-sharp rendering shows content immediately while loading
- WebP/AVIF don't support progressive decoding – image is blank until fully loaded
- mozjpeg provides ~10-15% smaller files than standard JPEG at equivalent quality
- Thumbnail-as-placeholder mitigates blank screen, but progressive still helps during fast navigation

### Thumbnail: WebP

- **25-30% smaller than JPEG** at equivalent visual quality
- 97%+ browser support – no fallback needed
- Fast decode – important when scrolling through 100+ images
- AVIF rejected: 10-20× slower encode, slower decode, marginal gains over WebP

### LQIP: JPEG

- At 20px, format differences are ~50 bytes
- Base64 overhead is the same regardless of format
- JPEG has fastest decode across all browsers
- Complexity of WebP/AVIF not justified for negligible savings

## Upload Processing

Original images are capped at 3500×3500px before storage. Resize happens at the earliest opportunity to minimize bandwidth and storage.

### Browser Upload (App)

Client-side resize before upload using Canvas API.

```typescript
async function prepareUpload(file: File): Promise<Blob> {
  const MAX_SIZE = 3500

  const img = await createImageBitmap(file)

  if (img.width <= MAX_SIZE && img.height <= MAX_SIZE) {
    return file
  }

  const scale = Math.min(MAX_SIZE / img.width, MAX_SIZE / img.height)
  const width = Math.round(img.width * scale)
  const height = Math.round(img.height * scale)

  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(img, 0, 0, width, height)

  return canvas.convertToBlob({ type: "image/jpeg", quality: 0.92 })
}
```

### API Upload (Direct)

Server-side resize as first step before variant generation.

```typescript
async function processUpload(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(3500, 3500, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 92 })
    .toBuffer()
}
```

### Why Cap at 3500px

- Covers 4K displays with room for cropping
- Sufficient for common print sizes (up to ~12×12" at 300dpi)
- Reduces storage costs (~2-4MB vs 10-20MB for full-res camera output)
- Faster variant generation
- Browser resize saves upload bandwidth on mobile

## Variant Generation Pipeline

All variants generated at upload time using Sharp. No runtime image processing.

```typescript
import sharp from "sharp"

interface ImageVariants {
  original: string
  full: string
  thumbnail: string
  lqip: string // base64 data URI
  width: number
  height: number
}

async function generateVariants(
  buffer: Buffer,
  outputDir: string,
  id: string,
): Promise<ImageVariants> {
  const image = sharp(buffer)
  const metadata = await image.metadata()

  // Original (already capped at upload)
  const originalPath = `${outputDir}/${id}-original.jpg`
  await image.clone().toFile(originalPath)

  // Full size - progressive JPEG with mozjpeg
  const fullPath = `${outputDir}/${id}-full.jpg`
  await image
    .clone()
    .resize(2000, null, { withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(fullPath)

  // Thumbnail - WebP
  const thumbPath = `${outputDir}/${id}-thumb.webp`
  await image
    .clone()
    .resize(600, null, { withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(thumbPath)

  // LQIP - base64 encoded
  const lqipBuffer = await image
    .clone()
    .resize(20, null, { withoutEnlargement: true })
    .jpeg({ quality: 60 })
    .toBuffer()

  const lqip = `data:image/jpeg;base64,${lqipBuffer.toString("base64")}`

  return {
    original: originalPath,
    full: fullPath,
    thumbnail: thumbPath,
    lqip,
    width: metadata.width!,
    height: metadata.height!,
  }
}
```

## Data Structure

```typescript
interface Photo {
  id: string
  alt: string
  width: number // original dimensions for aspect ratio
  height: number
  lqip: string // base64 data URI, stored in DB/JSON
  thumbnail: string // URL or path
  full: string // URL or path
}

interface Album {
  id: string
  title: string
  photos: Photo[]
}
```

## Storage Structure

Images stored separately from application, served via CDN or static file server.

```
{storage_root}/
  └── photos/
      ├── {id}-original.jpg   # 3500px max, ~2-4MB
      ├── {id}-full.jpg       # 2000px, ~150-300KB
      ├── {id}-thumb.webp     # 600px, ~20-40KB
      └── ...
```

LQIP stored in database alongside photo metadata, not as separate files.

## Grid Requirements

### Loading Behavior

- LQIP displayed as CSS background immediately (inlined in HTML or fetched with album data)
- First N thumbnails loaded eagerly (N = typical viewport capacity, ~12-20)
- Remaining thumbnails use native `loading="lazy"`
- Thumbnail covers LQIP on load via natural stacking

### Markup Pattern

```html
<button
  class="photo-item"
  style="background-image: url(data:image/jpeg;base64,...); aspect-ratio: 4/3"
>
  <img src="/photos/abc-thumb.webp" loading="lazy" alt="..." />
</button>
```

### Performance Targets

| Metric       | Target                                         |
| ------------ | ---------------------------------------------- |
| LCP          | < 1.5s                                         |
| Layout shift | 0 (aspect ratio preserved via LQIP dimensions) |

## Lightbox Requirements

### Loading Sequence

1. On open: display cached thumbnail instantly (already loaded in grid)
2. Load full-size image, display on complete
3. Preload adjacent ±1 (or ±2) full-size images in background

### Navigation

1. On navigate: shift preload window
2. If preloaded, display immediately
3. If not preloaded, show thumbnail placeholder while full loads

### Preloading Implementation

```typescript
function preloadImage(src: string): void {
  const img = new Image()
  img.src = src
}

function preloadAdjacent(photos: Photo[], currentIndex: number): void {
  const indices = [currentIndex - 1, currentIndex + 1]
  indices.forEach((i) => {
    if (i >= 0 && i < photos.length) {
      preloadImage(photos[i].full)
    }
  })
}
```

### Performance Targets

| Metric                    | Target            |
| ------------------------- | ----------------- |
| Grid to lightbox          | < 100ms perceived |
| Navigation to placeholder | < 50ms            |
| Full image load           | < 2s on 4G        |

## Rendering Strategy

### Considerations for Large Collections

With many albums and photos:

- Full static prerendering may be costly (build time, storage)
- Stale content risk if albums update frequently
- CDN cache invalidation complexity

### Recommended: Hybrid Approach

| Route        | Strategy        | Rationale                 |
| ------------ | --------------- | ------------------------- |
| Album index  | SSR + CDN cache | Changes when albums added |
| Album detail | SSR + CDN cache | Changes when photos added |
| Photo assets | Static + CDN    | Immutable once generated  |

### SSR with Edge Caching

```typescript
// Example route rules (Nuxt/Nitro syntax, adapt to framework)
export default {
  routeRules: {
    "/albums": {
      swr: 3600, // Stale-while-revalidate, 1 hour
    },
    "/albums/**": {
      swr: 3600,
    },
  },
}
```

### Cache Invalidation

On album/photo changes:

1. Purge CDN cache for affected routes
2. Or use shorter TTL and accept eventual consistency

### Why Not Full Prerendering

- **Build time**: Grows linearly with album count
- **Deployment size**: Each album page adds to bundle
- **Staleness**: Prerendered content requires rebuild to update
- **Diminishing returns**: SSR + CDN achieves similar TTFB after first request

### When Prerendering Makes Sense

- Small, stable collection (< 50 albums)
- SEO-critical landing pages
- Archival sites with no updates

## CDN Configuration

### Cache Headers

| Asset Type  | Cache-Control                                                    |
| ----------- | ---------------------------------------------------------------- |
| Original    | `private, max-age=31536000` (or not exposed)                     |
| Full        | `public, max-age=31536000, immutable`                            |
| Thumbnail   | `public, max-age=31536000, immutable`                            |
| Album pages | `public, max-age=0, s-maxage=3600, stale-while-revalidate=86400` |

### URL Structure

Photo IDs are UUIDs – re-upload creates new ID, so URLs are inherently immutable.

```
/photos/{uuid}-full.jpg
/photos/{uuid}-thumb.webp
```

No cache-busting hashes or version prefixes needed.
