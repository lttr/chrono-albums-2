# Background Job Queue - Detailed Implementation Plan

## Overview

Replace in-memory video job queue with SQLite-backed persistent queue. Images continue processing synchronously (fast enough). Videos use async queue with retry and status tracking.

**Current state:**

- Images: Sync processing during upload (~2-5s per image)
- Videos: In-memory queue in `server/utils/video-jobs.ts`
- Jobs lost on server restart
- No retry logic, no visibility

**Target state:**

- Images: Same (sync processing is acceptable)
- Videos: SQLite-backed queue with persistence
- Jobs survive restart
- Retry failed jobs (max 3 attempts)
- Job status visible in admin UI
- Stuck job recovery

---

## Phase 1: Database Schema

### 1.1 Create job table schema

**File:** `server/db/schema/job.ts`

```typescript
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"
import { sql } from "drizzle-orm"
import { media } from "./media"

export const job = sqliteTable(
  "job",
  {
    id: text("id").primaryKey(),
    mediaId: text("media_id")
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),
    type: text("type", { enum: ["video_transcode"] }).notNull(),
    status: text("status", {
      enum: ["pending", "processing", "completed", "failed"],
    })
      .notNull()
      .default("pending"),
    sourcePath: text("source_path").notNull(), // blob path to original
    targetPath: text("target_path").notNull(), // blob path for output
    error: text("error"),
    attempts: integer("attempts").notNull().default(0),
    maxAttempts: integer("max_attempts").notNull().default(3),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    startedAt: integer("started_at", { mode: "timestamp" }),
    completedAt: integer("completed_at", { mode: "timestamp" }),
  },
  (table) => [
    index("idx_job_status").on(table.status),
    index("idx_job_media_id").on(table.mediaId),
  ],
)

export const jobSelectSchema = createSelectSchema(job)
export const jobInsertSchema = createInsertSchema(job)
```

### 1.2 Export from schema index

**File:** `server/db/schema/index.ts`

```diff
+export * from "./job"
```

### 1.3 Generate and apply migration

```bash
nr db:generate
nr db:migrate
```

---

## Phase 2: Job Queue Utilities

### 2.1 Create job queue manager

**File:** `server/utils/job-queue.ts`

```typescript
import { eq, and, lt, sql, or } from "drizzle-orm"
import { nanoid } from "nanoid"

interface EnqueueOptions {
  mediaId: string
  type: "video_transcode"
  sourcePath: string
  targetPath: string
}

/**
 * Add job to queue
 */
export async function enqueueJob(options: EnqueueOptions): Promise<string> {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  const id = nanoid()

  await db.insert(job).values({
    id,
    mediaId: options.mediaId,
    type: options.type,
    sourcePath: options.sourcePath,
    targetPath: options.targetPath,
    status: "pending",
  })

  return id
}

/**
 * Claim next pending job for processing
 * Uses optimistic locking to prevent double-processing
 */
export async function claimNextJob(type: "video_transcode") {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  // Find oldest pending job with attempts < maxAttempts
  const [pendingJob] = await db
    .select()
    .from(job)
    .where(
      and(
        eq(job.type, type),
        eq(job.status, "pending"),
        lt(job.attempts, job.maxAttempts),
      ),
    )
    .orderBy(job.createdAt)
    .limit(1)

  if (!pendingJob) return null

  // Attempt to claim it (optimistic lock via status check)
  const result = await db
    .update(job)
    .set({
      status: "processing",
      startedAt: new Date(),
      attempts: pendingJob.attempts + 1,
    })
    .where(and(eq(job.id, pendingJob.id), eq(job.status, "pending")))
    .returning()

  // If update affected 0 rows, another worker claimed it
  return result[0] ?? null
}

/**
 * Mark job as completed
 */
export async function completeJob(jobId: string) {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  await db
    .update(job)
    .set({
      status: "completed",
      completedAt: new Date(),
    })
    .where(eq(job.id, jobId))
}

/**
 * Mark job as failed
 */
export async function failJob(jobId: string, error: string) {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  // Get current job to check attempts
  const [currentJob] = await db
    .select()
    .from(job)
    .where(eq(job.id, jobId))
    .limit(1)

  if (!currentJob) return

  const finalStatus =
    currentJob.attempts >= currentJob.maxAttempts ? "failed" : "pending"

  await db
    .update(job)
    .set({
      status: finalStatus,
      error,
      startedAt: null, // Clear for retry
    })
    .where(eq(job.id, jobId))
}

/**
 * Recover stuck jobs (processing > 5 minutes)
 * Called on server start and periodically
 */
export async function recoverStuckJobs() {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

  const result = await db
    .update(job)
    .set({
      status: "pending",
      startedAt: null,
    })
    .where(and(eq(job.status, "processing"), lt(job.startedAt, fiveMinutesAgo)))
    .returning()

  if (result.length > 0) {
    console.log(`[job-queue] Recovered ${result.length} stuck jobs`)
  }

  return result.length
}

/**
 * Get pending job count
 */
export async function getPendingJobCount(type?: "video_transcode") {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  const conditions = [eq(job.status, "pending")]
  if (type) conditions.push(eq(job.type, type))

  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(job)
    .where(and(...conditions))

  return result?.count ?? 0
}

/**
 * Get job by media ID
 */
export async function getJobByMediaId(mediaId: string) {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  const [result] = await db
    .select()
    .from(job)
    .where(eq(job.mediaId, mediaId))
    .orderBy(sql`${job.createdAt} DESC`)
    .limit(1)

  return result ?? null
}

/**
 * Cleanup old completed jobs (> 7 days)
 */
export async function cleanupOldJobs() {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  // Only delete completed jobs (not failed - those need blob cleanup first)
  const result = await db
    .delete(job)
    .where(and(eq(job.status, "completed"), lt(job.completedAt, sevenDaysAgo)))
    .returning()

  if (result.length > 0) {
    console.log(`[job-queue] Cleaned up ${result.length} old completed jobs`)
  }

  return result.length
}

/**
 * Cleanup failed job blobs after 30 days
 * Deletes original video blob and then removes job record
 */
export async function cleanupFailedJobBlobs() {
  const db = useDb()
  const { job } = await import("~/server/db/schema/job")

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  // Find failed jobs older than 30 days
  const oldFailedJobs = await db
    .select()
    .from(job)
    .where(and(eq(job.status, "failed"), lt(job.completedAt, thirtyDaysAgo)))

  let cleaned = 0
  for (const failedJob of oldFailedJobs) {
    try {
      // Delete the original video blob
      await hubBlob().del(failedJob.sourcePath)
      console.log(`[job-queue] Deleted blob ${failedJob.sourcePath}`)

      // Delete the job record
      await db.delete(job).where(eq(job.id, failedJob.id))
      cleaned++
    } catch (error) {
      console.error(`[job-queue] Failed to cleanup job ${failedJob.id}:`, error)
    }
  }

  if (cleaned > 0) {
    console.log(`[job-queue] Cleaned up ${cleaned} failed job blobs`)
  }

  return cleaned
}
```

---

## Phase 3: Nitro Task for Video Processing

### 3.1 Create video transcode task

**File:** `server/tasks/video/transcode.ts`

```typescript
import { transcodeVideo } from "~/server/utils/video-transcoder"
import {
  claimNextJob,
  completeJob,
  failJob,
  getPendingJobCount,
} from "~/server/utils/job-queue"

export default defineTask({
  meta: {
    name: "video:transcode",
    description: "Process video transcoding jobs from queue",
  },
  async run() {
    const startTime = Date.now()
    let processed = 0

    // Process one job at a time (video transcoding is CPU intensive)
    const job = await claimNextJob("video_transcode")

    if (!job) {
      return { result: "no pending jobs" }
    }

    console.log(
      `[video:transcode] Processing job ${job.id} for media ${job.mediaId}`,
    )

    try {
      // Download, transcode, upload
      await transcodeVideo({
        mediaId: job.mediaId,
        sourcePath: job.sourcePath,
        targetPath: job.targetPath,
      })

      await completeJob(job.id)
      processed++

      // Update media record
      const db = useDb()
      const { media } = await import("~/server/db/schema/media")
      const { eq } = await import("drizzle-orm")

      await db
        .update(media)
        .set({
          processing: 0,
          webPath: job.targetPath,
        })
        .where(eq(media.id, job.mediaId))

      console.log(`[video:transcode] Completed job ${job.id}`)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`[video:transcode] Failed job ${job.id}:`, errorMessage)

      await failJob(job.id, errorMessage)

      // Update media record on final failure
      const [updatedJob] = await useDb()
        .select()
        .from((await import("~/server/db/schema/job")).job)
        .where(
          (await import("drizzle-orm")).eq(
            (await import("~/server/db/schema/job")).job.id,
            job.id,
          ),
        )
        .limit(1)

      if (updatedJob?.status === "failed") {
        const db = useDb()
        const { media } = await import("~/server/db/schema/media")
        const { eq } = await import("drizzle-orm")

        await db
          .update(media)
          .set({ processing: -1 })
          .where(eq(media.id, job.mediaId))
      }
    }

    // Check if more jobs pending, schedule another run
    const pendingCount = await getPendingJobCount("video_transcode")
    if (pendingCount > 0) {
      // Schedule next job with slight delay to prevent tight loop
      setTimeout(() => {
        runTask("video:transcode")
      }, 1000)
    }

    return {
      result: `processed ${processed} job(s)`,
      duration: Date.now() - startTime,
      pendingCount,
    }
  },
})
```

### 3.2 Create maintenance task

**File:** `server/tasks/jobs/maintenance.ts`

```typescript
import {
  recoverStuckJobs,
  cleanupOldJobs,
  cleanupFailedJobBlobs,
  getPendingJobCount,
} from "~/server/utils/job-queue"
import { cleanupOrphanedTempFiles } from "~/server/utils/video-transcoder"

export default defineTask({
  meta: {
    name: "jobs:maintenance",
    description:
      "Recover stuck jobs, cleanup old jobs, temp files, and failed blobs",
  },
  async run() {
    const recovered = await recoverStuckJobs()
    const cleaned = await cleanupOldJobs()
    const blobsCleaned = await cleanupFailedJobBlobs()
    const tempFilesCleaned = await cleanupOrphanedTempFiles()
    const pending = await getPendingJobCount()

    // If we recovered jobs, trigger processing
    if (recovered > 0) {
      runTask("video:transcode")
    }

    return {
      result: "maintenance complete",
      recovered,
      cleaned,
      blobsCleaned,
      tempFilesCleaned,
      pending,
    }
  },
})
```

### 3.3 Configure scheduled tasks

**File:** `nuxt.config.ts`

```diff
 nitro: {
   experimental: {
     tasks: true,
   },
+  scheduledTasks: {
+    // Check for stuck/pending jobs every minute
+    "* * * * *": ["jobs:maintenance"],
+  },
 },
```

---

## Phase 4: Update Upload Flow

### 4.1 Refactor video-jobs.ts

**File:** `server/utils/video-jobs.ts`

Replace the in-memory queue with database-backed queue:

```typescript
import { enqueueJob } from "./job-queue"

/**
 * Enqueue video for transcoding
 * Replaces the old in-memory queue
 */
export async function enqueueTranscode(
  mediaId: string,
  originalPath: string,
  webPath: string,
) {
  // Add to persistent queue
  const jobId = await enqueueJob({
    mediaId,
    type: "video_transcode",
    sourcePath: originalPath,
    targetPath: webPath,
  })

  console.log(
    `[video-jobs] Enqueued transcode job ${jobId} for media ${mediaId}`,
  )

  // Trigger immediate processing
  runTask("video:transcode")

  return jobId
}

// Remove all the old in-memory queue code:
// - videoQueue array
// - processing flag
// - processNextJob function
// - processVideo function (moved to video-transcoder.ts)
```

### 4.2 Create video-transcoder.ts

**File:** `server/utils/video-transcoder.ts`

Extract transcoding logic from video-jobs.ts:

```typescript
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import { join } from "path"
import { unlink, mkdir, writeFile } from "fs/promises"
import { existsSync } from "fs"
import { Readable } from "stream"

ffmpeg.setFfmpegPath(ffmpegPath!)

const VIDEO_TEMP_DIR = ".data/temp/videos"

interface TranscodeOptions {
  mediaId: string
  sourcePath: string // blob path
  targetPath: string // blob path
}

export async function transcodeVideo(options: TranscodeOptions): Promise<void> {
  const { mediaId, sourcePath, targetPath } = options

  // Ensure temp directory exists
  if (!existsSync(VIDEO_TEMP_DIR)) {
    await mkdir(VIDEO_TEMP_DIR, { recursive: true })
  }

  const inputPath = join(VIDEO_TEMP_DIR, `${mediaId}-input.tmp`)
  const outputPath = join(VIDEO_TEMP_DIR, `${mediaId}-output.mp4`)

  try {
    // Download original from blob storage
    console.log(`[transcode] Downloading ${sourcePath}`)
    const blob = await hubBlob().get(sourcePath)
    if (!blob) {
      throw new Error(`Source blob not found: ${sourcePath}`)
    }

    // Stream to temp file
    const buffer = await blob.arrayBuffer()
    await writeFile(inputPath, Buffer.from(buffer))

    // Transcode to web-optimized mp4
    console.log(`[transcode] Transcoding ${mediaId}`)
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          "-c:v libx264",
          "-preset medium",
          "-crf 23",
          "-c:a aac",
          "-b:a 128k",
          "-movflags +faststart",
          "-vf scale='min(1920,iw)':'-2'", // Max 1080p width
        ])
        .output(outputPath)
        .on("end", () => resolve())
        .on("error", (err) => reject(err))
        .run()
    })

    // Upload transcoded file to blob storage
    console.log(`[transcode] Uploading to ${targetPath}`)
    const { readFile } = await import("fs/promises")
    const outputBuffer = await readFile(outputPath)
    await hubBlob().put(targetPath, outputBuffer, {
      contentType: "video/mp4",
    })

    console.log(`[transcode] Completed ${mediaId}`)
  } finally {
    // Cleanup temp files
    await cleanup(inputPath)
    await cleanup(outputPath)
  }
}

async function cleanup(path: string) {
  try {
    if (existsSync(path)) {
      await unlink(path)
    }
  } catch {
    // Ignore cleanup errors
  }
}

/**
 * Cleanup orphaned temp files older than 6 hours
 * Handles cases where server crashed mid-transcode
 */
export async function cleanupOrphanedTempFiles(): Promise<number> {
  const { readdir, stat, unlink } = await import("fs/promises")
  const { join } = await import("path")

  if (!existsSync(VIDEO_TEMP_DIR)) {
    return 0
  }

  const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000
  let cleaned = 0

  try {
    const files = await readdir(VIDEO_TEMP_DIR)

    for (const file of files) {
      const filePath = join(VIDEO_TEMP_DIR, file)
      try {
        const stats = await stat(filePath)
        if (stats.mtimeMs < sixHoursAgo) {
          await unlink(filePath)
          cleaned++
          console.log(`[transcode] Cleaned up orphaned temp file: ${file}`)
        }
      } catch {
        // Ignore individual file errors
      }
    }
  } catch (error) {
    console.error("[transcode] Failed to cleanup temp files:", error)
  }

  if (cleaned > 0) {
    console.log(`[transcode] Cleaned up ${cleaned} orphaned temp files`)
  }

  return cleaned
}
```

---

## Phase 5: Server Startup Hook

### 5.1 Create startup plugin

**File:** `server/plugins/job-queue-init.ts`

```typescript
import { recoverStuckJobs, getPendingJobCount } from "~/server/utils/job-queue"

export default defineNitroPlugin(async () => {
  // Give server time to fully initialize
  setTimeout(async () => {
    try {
      // Recover any jobs that were processing when server stopped
      const recovered = await recoverStuckJobs()
      const pending = await getPendingJobCount()

      console.log(
        `[job-queue] Initialized: ${recovered} recovered, ${pending} pending`,
      )

      // Start processing if there are pending jobs
      if (pending > 0) {
        runTask("video:transcode")
      }
    } catch (error) {
      console.error("[job-queue] Failed to initialize:", error)
    }
  }, 2000)
})
```

---

## Phase 6: Admin API Endpoints (Optional)

### 6.1 Get job status

**File:** `server/api/admin/jobs/index.get.ts`

```typescript
import { sql, desc, eq } from "drizzle-orm"
import { job } from "~/server/db/schema/job"

export default defineEventHandler(async (event) => {
  // TODO: Add auth check
  const query = getQuery(event)
  const status = query.status as string | undefined

  const db = useDb()

  const conditions = []
  if (status) {
    conditions.push(eq(job.status, status as any))
  }

  const jobs = await db
    .select()
    .from(job)
    .where(conditions.length > 0 ? conditions[0] : undefined)
    .orderBy(desc(job.createdAt))
    .limit(100)

  const [stats] = await db
    .select({
      pending: sql<number>`sum(case when status = 'pending' then 1 else 0 end)`,
      processing: sql<number>`sum(case when status = 'processing' then 1 else 0 end)`,
      completed: sql<number>`sum(case when status = 'completed' then 1 else 0 end)`,
      failed: sql<number>`sum(case when status = 'failed' then 1 else 0 end)`,
    })
    .from(job)

  return {
    jobs,
    stats,
  }
})
```

### 6.2 Retry failed job

**File:** `server/api/admin/jobs/[id]/retry.post.ts`

```typescript
import { eq } from "drizzle-orm"
import { job } from "~/server/db/schema/job"

export default defineEventHandler(async (event) => {
  // TODO: Add auth check
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, message: "Job ID required" })
  }

  const db = useDb()

  // Reset job to pending with cleared attempts
  const [updated] = await db
    .update(job)
    .set({
      status: "pending",
      attempts: 0,
      error: null,
      startedAt: null,
      completedAt: null,
    })
    .where(eq(job.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: "Job not found" })
  }

  // Trigger processing
  runTask("video:transcode")

  return updated
})
```

---

## Implementation Checklist

### Database

- [ ] Create `server/db/schema/job.ts` with job table schema
- [ ] Export job schema from `server/db/schema/index.ts`
- [ ] Generate migration: `nr db:generate`
- [ ] Apply migration: `nr db:migrate`

### Queue Utilities

- [ ] Create `server/utils/job-queue.ts` with queue functions
  - [ ] Include `cleanupFailedJobBlobs()` for 30-day blob cleanup
- [ ] Create `server/utils/video-transcoder.ts` (extract from video-jobs.ts)
  - [ ] Include `cleanupOrphanedTempFiles()` for 6-hour temp cleanup
- [ ] Refactor `server/utils/video-jobs.ts` to use new queue

### Nitro Tasks

- [ ] Create `server/tasks/video/transcode.ts`
- [ ] Create `server/tasks/jobs/maintenance.ts`
- [ ] Add scheduled task config to `nuxt.config.ts`

### Server Hooks

- [ ] Create `server/plugins/job-queue-init.ts` for startup recovery

### Admin API (Optional)

- [ ] Create `server/api/admin/jobs/index.get.ts`
- [ ] Create `server/api/admin/jobs/[id]/retry.post.ts`

### Testing

- [ ] Upload video, verify job created in DB
- [ ] Kill server during transcode, verify job recovers on restart
- [ ] Verify failed jobs retry up to max attempts
- [ ] Verify completed jobs cleaned up after 7 days
- [ ] Verify failed job blobs cleaned up after 30 days
- [ ] Verify orphaned temp files cleaned up after 6 hours

---

## Design Decisions

| Decision         | Choice                    | Rationale                                                 |
| ---------------- | ------------------------- | --------------------------------------------------------- |
| Runtime          | Node.js                   | Use `fs.readFile/writeFile` instead of `Bun.file()`       |
| Original videos  | Keep both                 | Store original + transcoded. Allows re-transcoding later. |
| Failed job blobs | Keep 30 days, then delete | Grace period for manual intervention                      |
| Job retention    | 7 days                    | Balance between debugging history and DB size             |
| FK constraint    | CASCADE delete            | Delete job when media deleted                             |
| Temp cleanup     | Auto-delete > 6 hours     | Cleanup orphaned temp files in maintenance task           |

---

## Remaining Technical Questions

1. **hubBlob() availability** - Is it available in Nitro tasks context or only in event handlers?
2. **runTask() in plugins** - Can we call runTask from nitro plugins at startup?
3. **Scheduled tasks on dev** - Do cron-style scheduled tasks run in dev mode?
