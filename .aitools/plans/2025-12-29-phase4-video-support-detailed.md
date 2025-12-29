# Phase 4: Video Support - Detailed Implementation Plan

## Overview

Add video support with poster frame extraction at upload and async transcoding to web-optimized mp4.

**Deployment target:** Node.js server on VPS (Docker container). No serverless/edge considerations.

**Current state:**

- Videos accepted at upload (100MB limit)
- Stored as-is without processing
- No poster frame, no LQIP
- Videos excluded from public grid (images only)

**Target state:**

- Poster frame extracted at upload (sync)
- Poster variants generated (full, thumb, LQIP)
- Video transcoded to h264 mp4 in background (async)
- Videos displayed in grid with play overlay
- Video playback in PhotoSwipe lightbox (see Phase 5 plan)

---

## Dependencies

```bash
pnpm add ffmpeg-static fluent-ffmpeg
pnpm add -D @types/fluent-ffmpeg
```

---

## Database Migration

**File:** `server/db/schema/media.ts`

Add columns for video-specific data:

```typescript
// Add to media table columns:
processing: integer("processing").default(0), // 0 = ready, 1 = transcoding, -1 = failed
duration: real("duration"), // video duration in seconds
posterPath: text("poster_path"), // full poster for player
webPath: text("web_path"), // transcoded video path
```

**Processing states:**

- `0` = ready (images always 0, videos after transcode completes)
- `1` = transcoding in progress
- `-1` = transcode failed

**Migration:**

```sql
ALTER TABLE media ADD COLUMN processing INTEGER DEFAULT 0;
ALTER TABLE media ADD COLUMN duration REAL;
ALTER TABLE media ADD COLUMN poster_path TEXT;
ALTER TABLE media ADD COLUMN web_path TEXT;
```

---

## 8. Video Variant Pipeline (Sync)

### 8.1 Create video-variants.ts

**File:** `server/utils/video-variants.ts`

Uses file paths instead of buffers to avoid memory issues with large videos.

```typescript
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import sharp from "sharp"
import { join } from "path"
import { unlink, mkdir } from "fs/promises"
import { existsSync } from "fs"

ffmpeg.setFfmpegPath(ffmpegPath!)

// Dedicated temp directory for video processing
const VIDEO_TEMP_DIR = ".data/temp/videos"

export interface VideoPosterResult {
  posterFull: Buffer
  posterThumb: Buffer
  posterLqip: string // base64 data URI
  width: number
  height: number
  duration: number
}

export interface VideoMetadata {
  width: number
  height: number
  duration: number
}

/**
 * Extract poster frame from video file on disk.
 * Caller is responsible for providing a valid file path.
 */
export async function extractVideoPoster(
  videoPath: string,
): Promise<VideoPosterResult> {
  // Get video metadata
  const metadata = await getVideoMetadata(videoPath)

  // Extract first frame to temp file (small JPEG, safe in memory)
  const posterBuffer = await extractFrame(videoPath)

  // Generate poster variants via Sharp (same as image pipeline)
  const [posterFull, posterThumb, posterLqipBuffer] = await Promise.all([
    sharp(posterBuffer)
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer(),
    sharp(posterBuffer)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer(),
    sharp(posterBuffer).resize(20).jpeg({ quality: 60 }).toBuffer(),
  ])

  return {
    posterFull,
    posterThumb,
    posterLqip: `data:image/jpeg;base64,${posterLqipBuffer.toString("base64")}`,
    ...metadata,
  }
}

export async function getVideoMetadata(
  videoPath: string,
): Promise<VideoMetadata> {
  const metadata = await new Promise<ffmpeg.FfprobeData>((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

  const videoStream = metadata.streams.find((s) => s.codec_type === "video")
  return {
    width: videoStream?.width ?? 1920,
    height: videoStream?.height ?? 1080,
    duration: metadata.format.duration ?? 0,
  }
}

async function extractFrame(videoPath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    ffmpeg(videoPath)
      .frames(1)
      .format("image2pipe")
      .outputOptions("-vcodec", "mjpeg")
      .on("error", reject)
      .pipe()
      .on("data", (chunk: Buffer) => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", reject)
  })
}

/**
 * Ensure temp directory exists
 */
export async function ensureTempDir(): Promise<string> {
  if (!existsSync(VIDEO_TEMP_DIR)) {
    await mkdir(VIDEO_TEMP_DIR, { recursive: true })
  }
  return VIDEO_TEMP_DIR
}

/**
 * Clean up a temp file (ignore errors)
 */
export async function cleanupTempFile(path: string): Promise<void> {
  await unlink(path).catch(() => {})
}
```

---

### 8.2 Update upload endpoint

**File:** `server/api/upload.post.ts`

Stream upload to temp file, process, then upload to blob. Avoids holding entire video in memory.

```typescript
import { createWriteStream } from "fs"
import { pipeline } from "stream/promises"
import { Readable } from "stream"
import { join } from "path"
import { extractVideoPoster, ensureTempDir, cleanupTempFile } from "../utils/video-variants"
import { enqueueTranscode } from "../utils/video-jobs"

// Update UploadResponse interface
export interface UploadResponse {
  success: boolean
  id: string
  // Image variant data
  lqip?: string
  thumbnailPath?: string
  fullPath?: string
  originalPath?: string
  width?: number
  height?: number
  // Video-specific
  posterPath?: string
  duration?: number
  processing?: boolean
}

// In the else branch (video handling):
} else {
  const id = uploadData.id
  const ext = getExtension(uploadData.mimeType)

  // Write upload to temp file (avoids holding in memory)
  const tempDir = await ensureTempDir()
  const tempVideoPath = join(tempDir, `${id}-upload.${ext}`)

  await pipeline(
    Readable.from(uploadData.file),
    createWriteStream(tempVideoPath)
  )

  try {
    // Extract poster from temp file
    const { posterFull, posterThumb, posterLqip, width, height, duration } =
      await extractVideoPoster(tempVideoPath)

    const originalPath = `videos/${id}-original.${ext}`
    const posterPath = `videos/${id}-poster.jpg`
    const thumbnailPath = `videos/${id}-thumb.webp`

    // Upload original video and poster variants to blob
    // Read original as stream to avoid memory spike
    const originalStream = createReadStream(tempVideoPath)
    await Promise.all([
      hubBlob().put(originalPath, originalStream, { addRandomSuffix: false }),
      hubBlob().put(posterPath, posterFull, { addRandomSuffix: false }),
      hubBlob().put(thumbnailPath, posterThumb, { addRandomSuffix: false }),
    ])

    // Enqueue async transcoding (uses blob paths, not temp file)
    enqueueTranscode({
      mediaId: id,
      originalPath,
      webPath: `videos/${id}.mp4`,
    })

    return {
      success: true,
      id,
      lqip: posterLqip,
      thumbnailPath,
      posterPath,
      originalPath,
      width,
      height,
      duration,
      processing: true,
    }
  } finally {
    // Always clean up temp file
    await cleanupTempFile(tempVideoPath)
  }
}

function getExtension(mimeType: string): string {
  const map: Record<string, string> = {
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
    "video/x-msvideo": "avi",
  }
  return map[mimeType] ?? "mp4"
}
```

---

## 9. Video Transcoding (Async)

### 9.1 Create video-jobs.ts

**File:** `server/utils/video-jobs.ts`

File-based processing with proper cleanup. Downloads blob to temp file, transcodes, uploads result.

```typescript
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import { createWriteStream, createReadStream } from "fs"
import { join } from "path"
import { unlink } from "fs/promises"
import { pipeline } from "stream/promises"
import { ensureTempDir, cleanupTempFile } from "./video-variants"
import { media } from "../db/schema/media"
import { eq } from "drizzle-orm"

ffmpeg.setFfmpegPath(ffmpegPath!)

interface VideoJob {
  mediaId: string
  originalPath: string // blob path
  webPath: string // output blob path
}

// Simple in-process queue (sufficient for low volume VPS deployment)
const videoQueue: VideoJob[] = []
let processing = false

export function enqueueTranscode(job: VideoJob): void {
  videoQueue.push(job)
  // Start processing on next tick to avoid blocking upload response
  setImmediate(() => processQueue())
}

export function getQueueStatus(): { pending: number; processing: boolean } {
  return { pending: videoQueue.length, processing }
}

async function processQueue(): Promise<void> {
  if (processing || videoQueue.length === 0) return
  processing = true

  const job = videoQueue.shift()!
  const tempDir = await ensureTempDir()
  const tempInput = join(tempDir, `${job.mediaId}-transcode-in.mp4`)
  const tempOutput = join(tempDir, `${job.mediaId}-transcode-out.mp4`)

  console.log(`[video-jobs] Starting transcode for ${job.mediaId}`)

  try {
    // Download original from blob to temp file (streaming)
    const originalBlob = await hubBlob().get(job.originalPath)
    if (!originalBlob) {
      throw new Error(`Original video not found: ${job.originalPath}`)
    }

    await pipeline(originalBlob.stream() as any, createWriteStream(tempInput))

    // Transcode to web-optimized mp4
    await transcodeToWeb(tempInput, tempOutput)

    // Upload transcoded video (streaming)
    await hubBlob().put(job.webPath, createReadStream(tempOutput), {
      addRandomSuffix: false,
    })

    // Update database: processing = false
    const db = useDb()
    await db
      .update(media)
      .set({ processing: 0, webPath: job.webPath })
      .where(eq(media.id, job.mediaId))

    // Optionally delete original to save space
    // await hubBlob().delete(job.originalPath)

    console.log(`[video-jobs] Completed transcode for ${job.mediaId}`)
  } catch (error) {
    console.error(`[video-jobs] Transcode failed for ${job.mediaId}:`, error)

    // Mark as failed in DB (could add error column for better tracking)
    const db = useDb()
    await db
      .update(media)
      .set({ processing: -1 }) // -1 = failed
      .where(eq(media.id, job.mediaId))
  } finally {
    // Always clean up temp files
    await cleanupTempFile(tempInput)
    await cleanupTempFile(tempOutput)

    processing = false
    // Process next job
    setImmediate(() => processQueue())
  }
}

function transcodeToWeb(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      // Video: h264, crf 23, max 1080p
      .videoCodec("libx264")
      .outputOptions("-crf", "23")
      .outputOptions("-preset", "medium")
      .outputOptions("-vf", "scale=-2:'min(1080,ih)'")
      // Audio: aac, 128k
      .audioCodec("aac")
      .audioBitrate("128k")
      // Container: mp4, faststart for web streaming
      .format("mp4")
      .outputOptions("-movflags", "+faststart")
      .on("progress", (progress) => {
        console.log(
          `[video-jobs] Transcoding: ${Math.round(progress.percent || 0)}%`,
        )
      })
      .on("end", resolve)
      .on("error", reject)
      .save(outputPath)
  })
}
```

### 9.2 Cleanup plugin (server startup)

**File:** `server/plugins/video-cleanup.ts`

Clean orphaned temp files on server restart.

```typescript
import { readdirSync, unlinkSync } from "fs"
import { join } from "path"

const VIDEO_TEMP_DIR = ".data/temp/videos"

export default defineNitroPlugin(() => {
  try {
    const files = readdirSync(VIDEO_TEMP_DIR)
    for (const file of files) {
      const filePath = join(VIDEO_TEMP_DIR, file)
      unlinkSync(filePath)
      console.log(`[video-cleanup] Removed orphaned temp file: ${file}`)
    }
    if (files.length > 0) {
      console.log(`[video-cleanup] Cleaned ${files.length} orphaned temp files`)
    }
  } catch {
    // Directory doesn't exist yet, that's fine
  }
})
```

---

### 9.3 Update media serving route

**File:** `server/routes/m/[...path].ts`

Handle video serving with processing state:

```typescript
// Add "poster" to valid variants
const VALID_VARIANTS = ["thumb", "original", "poster"] as const

// In the handler, add video-specific logic:
if (mediaRecord.kind === "video") {
  if (variant === "poster") {
    // Serve poster image
    const posterPath = mediaRecord.posterPath
    if (!posterPath) {
      throw createError({ statusCode: 404, statusMessage: "Poster not found" })
    }
    setHeader(event, "Content-Type", "image/jpeg")
    return hubBlob().serve(event, posterPath)
  }

  if (variant === "thumb") {
    // Serve poster thumbnail
    const thumbPath = mediaRecord.thumbnailPath
    if (!thumbPath) {
      throw createError({
        statusCode: 404,
        statusMessage: "Thumbnail not found",
      })
    }
    setHeader(event, "Content-Type", "image/webp")
    return hubBlob().serve(event, thumbPath)
  }

  // Default: serve video
  if (mediaRecord.processing) {
    // Still transcoding - return 202 or serve original
    setHeader(event, "Retry-After", "30")
    throw createError({
      statusCode: 202,
      statusMessage: "Video is still processing",
    })
  }

  const videoPath = mediaRecord.webPath ?? mediaRecord.originalPath
  if (!videoPath) {
    throw createError({ statusCode: 404, statusMessage: "Video not found" })
  }
  setHeader(event, "Content-Type", "video/mp4")
  return hubBlob().serve(event, videoPath)
}
```

---

## 10. Video Player Integration

### 10.1 Create VideoGridItem component

**File:** `app/components/album/VideoGridItem.vue`

```vue
<template>
  <div
    class="video-grid-item"
    :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: `translate(${box.left}px, ${box.top}px)`,
    }"
  >
    <!-- Playing state -->
    <video
      v-if="playing && !media.processing"
      ref="videoRef"
      :src="media.fullUrl"
      :poster="media.posterUrl"
      class="video-player"
      controls
      autoplay
      @ended="playing = false"
      @click.stop
    />

    <!-- Thumbnail state -->
    <button
      v-else
      type="button"
      class="video-thumb"
      :disabled="media.processing"
      @click="play"
    >
      <div
        v-if="media.lqip"
        class="video-thumb__lqip"
        :style="{ backgroundImage: `url(${media.lqip})` }"
      ></div>
      <img
        :src="media.thumbnailUrl"
        :alt="altText"
        :loading="eager ? 'eager' : 'lazy'"
        class="video-thumb__img"
        @load="($event.target as HTMLImageElement).classList.add('loaded')"
      />
      <span v-if="media.processing" class="video-overlay processing">
        Processing...
      </span>
      <span v-else class="video-overlay play-icon">▶</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    fullUrl: string
    posterUrl?: string
    lqip: string | null
    originalName?: string | null
    processing?: boolean
    duration?: number
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
const playing = ref(false)
const videoRef = ref<HTMLVideoElement>()

const altText = computed(() => {
  if (props.media.originalName) {
    return props.media.originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
  }
  return `Video ${props.index + 1}`
})

function play() {
  if (!props.media.processing) {
    playing.value = true
  }
}

// Close video on escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && playing.value) {
      playing.value = false
    }
  }
  window.addEventListener("keydown", handleEscape)
  onUnmounted(() => window.removeEventListener("keydown", handleEscape))
})
</script>

<style scoped>
.video-grid-item {
  position: absolute;
  overflow: hidden;
}

.video-thumb {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--surface-2);
  position: relative;
}

.video-thumb:disabled {
  cursor: not-allowed;
}

.video-thumb:focus-visible {
  outline: 2px solid var(--primary-6);
  outline-offset: 2px;
  z-index: 1;
}

.video-thumb__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.video-thumb__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-thumb__img.loaded {
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

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: black;
}
</style>
```

---

### 10.2 Update JustifiedGrid

**File:** `app/components/album/JustifiedGrid.vue`

Add conditional rendering for video items:

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
      />
      <GridItem
        v-else
        :media="item"
        :box="boxes[index]"
        :index="index"
        :eager="index < 12"
        @click="openLightbox"
      />
    </template>
  </div>
</template>
```

---

### 10.3 Update API response types

**File:** `app/components/album/types.ts` (or wherever MediaItem is defined)

```typescript
interface MediaItem {
  id: string
  slug: string
  kind: "image" | "video"
  width: number
  height: number
  lqip: string | null
  thumbnailUrl: string
  fullUrl: string
  originalName?: string | null
  // Video-specific
  posterUrl?: string
  duration?: number
  processing?: boolean
}
```

---

## Files to Modify/Create

| File                                     | Action |
| ---------------------------------------- | ------ |
| `server/db/schema/media.ts`              | Modify |
| `server/utils/video-variants.ts`         | Create |
| `server/utils/video-jobs.ts`             | Create |
| `server/plugins/video-cleanup.ts`        | Create |
| `server/api/upload.post.ts`              | Modify |
| `server/routes/m/[...path].ts`           | Modify |
| `app/components/album/VideoGridItem.vue` | Create |
| `app/components/album/JustifiedGrid.vue` | Modify |

---

## Implementation Order

```
1. Add dependencies (ffmpeg-static, fluent-ffmpeg)
2. Update database schema + run migration
3. Create video-variants.ts (poster extraction, temp file helpers)
4. Create video-jobs.ts (async transcoding queue)
5. Create video-cleanup.ts (orphan cleanup on startup)
6. Update upload.post.ts (stream to temp, extract poster, enqueue)
7. Update media serving route (video + poster variants)
8. Create VideoGridItem.vue
9. Update JustifiedGrid.vue
10. Test full flow
```

---

## Testing Checklist

- [ ] Upload a video file - poster appears in grid immediately
- [ ] Video shows "Processing..." overlay while transcoding
- [ ] After transcode completes, video is playable
- [ ] Click video thumbnail - inline player opens
- [ ] Press Escape - player closes
- [ ] Video player has native controls
- [ ] Poster LQIP shows blur placeholder
- [ ] Grid layout handles mixed images and videos

---

## Verification

```bash
nr verify
nr dev    # Test video upload and playback
```

---

## Unresolved Questions

None - all decisions made in specs.
