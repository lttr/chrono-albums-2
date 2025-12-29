import { eq, and, lt, sql } from "drizzle-orm"
import { nanoid } from "nanoid"
import { db, schema } from "hub:db"
import { blob } from "hub:blob"

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
  const id = nanoid()

  await db.insert(schema.job).values({
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
  // Find oldest pending job with attempts < maxAttempts
  const [pendingJob] = await db
    .select()
    .from(schema.job)
    .where(
      and(
        eq(schema.job.type, type),
        eq(schema.job.status, "pending"),
        lt(schema.job.attempts, schema.job.maxAttempts),
      ),
    )
    .orderBy(schema.job.createdAt)
    .limit(1)

  if (!pendingJob) {
    return null
  }

  // Attempt to claim it (optimistic lock via status check)
  const result = await db
    .update(schema.job)
    .set({
      status: "processing",
      startedAt: new Date(),
      attempts: pendingJob.attempts + 1,
    })
    .where(
      and(eq(schema.job.id, pendingJob.id), eq(schema.job.status, "pending")),
    )
    .returning()

  // If update affected 0 rows, another worker claimed it
  return result[0] ?? null
}

/**
 * Mark job as completed
 */
export async function completeJob(jobId: string) {
  await db
    .update(schema.job)
    .set({
      status: "completed",
      completedAt: new Date(),
    })
    .where(eq(schema.job.id, jobId))
}

/**
 * Mark job as failed
 */
export async function failJob(jobId: string, error: string) {
  // Get current job to check attempts
  const [currentJob] = await db
    .select()
    .from(schema.job)
    .where(eq(schema.job.id, jobId))
    .limit(1)

  if (!currentJob) {
    return
  }

  const finalStatus =
    currentJob.attempts >= currentJob.maxAttempts ? "failed" : "pending"

  await db
    .update(schema.job)
    .set({
      status: finalStatus,
      error,
      startedAt: null,
    })
    .where(eq(schema.job.id, jobId))
}

/**
 * Recover stuck jobs (processing > 5 minutes)
 * Called on server start and periodically
 */
export async function recoverStuckJobs() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

  const result = await db
    .update(schema.job)
    .set({
      status: "pending",
      startedAt: null,
    })
    .where(
      and(
        eq(schema.job.status, "processing"),
        lt(schema.job.startedAt, fiveMinutesAgo),
      ),
    )
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
  const conditions = [eq(schema.job.status, "pending")]
  if (type) {
    conditions.push(eq(schema.job.type, type))
  }

  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.job)
    .where(and(...conditions))

  return result?.count ?? 0
}

/**
 * Get job by media ID
 */
export async function getJobByMediaId(mediaId: string) {
  const [result] = await db
    .select()
    .from(schema.job)
    .where(eq(schema.job.mediaId, mediaId))
    .orderBy(sql`${schema.job.createdAt} DESC`)
    .limit(1)

  return result ?? null
}

/**
 * Cleanup old completed jobs (> 7 days)
 */
export async function cleanupOldJobs() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const result = await db
    .delete(schema.job)
    .where(
      and(
        eq(schema.job.status, "completed"),
        lt(schema.job.completedAt, sevenDaysAgo),
      ),
    )
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
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  // Find failed jobs older than 30 days
  const oldFailedJobs = await db
    .select()
    .from(schema.job)
    .where(
      and(
        eq(schema.job.status, "failed"),
        lt(schema.job.completedAt, thirtyDaysAgo),
      ),
    )

  let cleaned = 0
  for (const failedJob of oldFailedJobs) {
    try {
      // Delete the original video blob
      await blob.del(failedJob.sourcePath)
      console.log(`[job-queue] Deleted blob ${failedJob.sourcePath}`)

      // Delete the job record
      await db.delete(schema.job).where(eq(schema.job.id, failedJob.id))
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
