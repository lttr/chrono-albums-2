import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"
import { transcodeVideo } from "../../utils/video-transcoder"
import {
  claimNextJob,
  completeJob,
  failJob,
  getPendingJobCount,
} from "../../utils/job-queue"

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
      await db
        .update(schema.media)
        .set({
          processing: 0,
          webPath: job.targetPath,
        })
        .where(eq(schema.media.id, job.mediaId))

      console.log(`[video:transcode] Completed job ${job.id}`)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`[video:transcode] Failed job ${job.id}:`, errorMessage)

      await failJob(job.id, errorMessage)

      // Check if job has exhausted retries
      const [updatedJob] = await db
        .select()
        .from(schema.job)
        .where(eq(schema.job.id, job.id))
        .limit(1)

      if (updatedJob?.status === "failed") {
        // Update media record on final failure
        await db
          .update(schema.media)
          .set({ processing: -1 })
          .where(eq(schema.media.id, job.mediaId))
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
