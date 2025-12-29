import { enqueueJob } from "./job-queue"

interface VideoJob {
  mediaId: string
  originalPath: string
  webPath: string
}

/**
 * Enqueue video for transcoding
 * Uses SQLite-backed persistent queue
 */
export async function enqueueTranscode(job: VideoJob): Promise<string> {
  const jobId = await enqueueJob({
    mediaId: job.mediaId,
    type: "video_transcode",
    sourcePath: job.originalPath,
    targetPath: job.webPath,
  })

  console.log(
    `[video-jobs] Enqueued transcode job ${jobId} for media ${job.mediaId}`,
  )

  // Trigger immediate processing
  runTask("video:transcode")

  return jobId
}
