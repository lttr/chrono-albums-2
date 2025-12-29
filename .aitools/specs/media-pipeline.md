# Photo Album Media Pipeline Spec

## Overview

Performant photo album with grid view (100+ photos per album), lightbox for full-screen viewing, and fast navigation between images. Optimized for perceived performance using LQIP placeholders and progressive loading.

Supports both images and videos with unified variant generation at upload time.

## Image Tiers

| Tier      | Max Size  | Format           | Quality | Encoding | Purpose                   |
| --------- | --------- | ---------------- | ------- | -------- | ------------------------- |
| Original  | 3500×3500 | JPEG             | 92      | —        | Archive, print, EXIF kept |
| Full      | 2000px    | Progressive JPEG | 85      | mozjpeg  | Lightbox                  |
| Thumbnail | 600px     | WebP             | 75      | libwebp  | Grid (@2x for 300px)      |
| LQIP      | 20px      | JPEG             | 60      | baseline | Inline placeholder        |

## Format Reasoning

### Original: JPEG 92

High quality source for potential print output. 92 is the threshold where JPEG artifacts become negligible for print. Higher values yield diminishing returns with significant file size increase.

**EXIF preservation**: Original variant retains all EXIF metadata (GPS coordinates, camera settings, date taken, etc.) using Sharp's `withMetadata()`. Other variants strip EXIF to reduce file size.

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

  // Original (already capped at upload, preserves EXIF)
  const originalPath = `${outputDir}/${id}-original.jpg`
  await image.clone().withMetadata().toFile(originalPath)

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

## Video Pipeline

Videos are processed in two stages:

1. **Sync (at upload):** Extract poster frame, generate poster variants, store original
2. **Async (background job):** Transcode to web-optimized mp4

### Video Tiers

| Tier         | Size   | Format     | Quality | Purpose             |
| ------------ | ------ | ---------- | ------- | ------------------- |
| Original     | —      | as-is      | —       | Archive/backup      |
| Web          | 1080p  | mp4 (h264) | crf 23  | Playback source     |
| Poster Full  | 2000px | JPEG       | 85      | Video player poster |
| Poster Thumb | 600px  | WebP       | 75      | Grid thumbnail      |
| Poster LQIP  | 20px   | JPEG       | 60      | Inline placeholder  |

### Processing Stages

**Stage 1: Synchronous (upload response)**

- Extract first frame as poster
- Generate poster variants (full, thumb, LQIP) via Sharp
- Store original video
- Mark video as `processing: true`
- Return immediately (video appears in grid with poster)

**Stage 2: Asynchronous (background job)**

- Transcode to web-optimized mp4 (h264, aac)
- Cap resolution at 1080p
- Update `processing: false` when complete
- Delete original after successful transcode (optional)

### Why Async Transcoding

- Video transcoding is slow (minutes for large files)
- Upload should not block on transcoding
- User sees video in grid immediately (with poster)
- Playback available after background job completes

### Why ffmpeg-static

- **Bundled binary**: No system dependency, works in Docker/Nixpacks
- **Simple install**: `pnpm add ffmpeg-static fluent-ffmpeg`
- **Size**: ~70MB added to node_modules (acceptable for server-side)
- **Alternative**: System ffmpeg via `aptPkgs = ["ffmpeg"]` in nixpacks.toml

### Stage 1: Poster Extraction (Sync)

```typescript
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import sharp from "sharp"

ffmpeg.setFfmpegPath(ffmpegPath!)

interface VideoPosterResult {
  posterFull: Buffer
  posterThumb: Buffer
  posterLqip: string // base64 data URI
  width: number
  height: number
  duration: number
}

async function extractVideoPoster(
  inputPath: string,
): Promise<VideoPosterResult> {
  // Get video metadata
  const metadata = await new Promise<ffmpeg.FfprobeData>((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

  const videoStream = metadata.streams.find((s) => s.codec_type === "video")
  const width = videoStream?.width ?? 1920
  const height = videoStream?.height ?? 1080
  const duration = metadata.format.duration ?? 0

  // Extract first frame to buffer (pipe to stdout)
  const posterBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    ffmpeg(inputPath)
      .frames(1)
      .format("image2pipe")
      .outputOptions("-vcodec", "mjpeg")
      .on("error", reject)
      .pipe()
      .on("data", (chunk: Buffer) => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", reject)
  })

  // Generate poster variants via Sharp
  const [posterFull, posterThumb, posterLqipBuffer] = await Promise.all([
    sharp(posterBuffer)
      .resize(2000, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer(),
    sharp(posterBuffer)
      .resize(600, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer(),
    sharp(posterBuffer)
      .resize(20, null, { withoutEnlargement: true })
      .jpeg({ quality: 60 })
      .toBuffer(),
  ])

  return {
    posterFull,
    posterThumb,
    posterLqip: `data:image/jpeg;base64,${posterLqipBuffer.toString("base64")}`,
    width,
    height,
    duration,
  }
}
```

### Stage 2: Video Transcoding (Async)

```typescript
interface TranscodeOptions {
  inputPath: string
  outputPath: string
  maxHeight?: number // default 1080
}

async function transcodeVideo(options: TranscodeOptions): Promise<void> {
  const { inputPath, outputPath, maxHeight = 1080 } = options

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      // Video: h264, crf 23, scale to max height
      .videoCodec("libx264")
      .outputOptions("-crf", "23")
      .outputOptions("-preset", "medium")
      .outputOptions("-vf", `scale=-2:'min(${maxHeight},ih)'`)
      // Audio: aac, 128k
      .audioCodec("aac")
      .audioBitrate("128k")
      // Container: mp4, faststart for web streaming
      .format("mp4")
      .outputOptions("-movflags", "+faststart")
      .on("end", resolve)
      .on("error", reject)
      .save(outputPath)
  })
}
```

### Background Job Pattern

```typescript
// server/utils/video-jobs.ts
interface VideoJob {
  mediaId: string
  originalPath: string
  webPath: string
}

// Simple in-process queue (for low volume)
// For production scale: use BullMQ, Temporal, or similar
const videoQueue: VideoJob[] = []
let processing = false

export function enqueueTranscode(job: VideoJob) {
  videoQueue.push(job)
  processQueue()
}

async function processQueue() {
  if (processing || videoQueue.length === 0) return
  processing = true

  const job = videoQueue.shift()!
  try {
    await transcodeVideo({
      inputPath: job.originalPath,
      outputPath: job.webPath,
    })
    // Update database: processing = false
    await db
      .update(media)
      .set({ processing: false })
      .where(eq(media.id, job.mediaId))
  } catch (error) {
    console.error(`Transcode failed for ${job.mediaId}:`, error)
    // Optionally: retry logic, dead letter queue
  } finally {
    processing = false
    processQueue() // Process next
  }
}
```

### Video Storage Structure

```
{storage_root}/
  └── videos/
      ├── {id}-original.{ext}     # Original upload (deleted after transcode)
      ├── {id}.mp4                # Web-optimized (h264, 1080p max)
      ├── {id}-poster.jpg         # 2000px poster for player
      └── {id}-poster-thumb.webp  # 600px for grid
```

### Video Serving

Same URL pattern as images:

```
/m/{slug}          → web-optimized video (mp4)
/m/{slug}/thumb    → poster thumbnail (WebP)
/m/{slug}/poster   → full poster (JPEG)
```

If video is still processing, `/m/{slug}` returns 202 Accepted or serves original.

## Data Structure

```typescript
interface MediaItem {
  id: string
  kind: "image" | "video"
  alt: string
  width: number
  height: number
  lqip: string // base64 data URI
  thumbnailUrl: string
  fullUrl: string
  processing?: boolean // true while video is transcoding
  duration?: number // video only, in seconds
}

interface Album {
  id: string
  title: string
  media: MediaItem[]
}
```

### Database Schema Addition

```sql
ALTER TABLE media ADD COLUMN processing INTEGER DEFAULT 0;
-- 0 = ready, 1 = transcoding in progress
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
  <img src="/m/{slug}/thumb" loading="lazy" alt="..." />
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

All media served via slug-based URLs. IDs never exposed publicly.

```
/m/{slug}          → full variant (default)
/m/{slug}/thumb    → thumbnail (WebP)
/m/{slug}/original → original with EXIF
```

Slugs are immutable (32-char hex from UUID). No cache-busting needed.
