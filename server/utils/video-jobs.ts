import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import ffprobePath from "ffprobe-static"
import { createWriteStream } from "fs"
import { readFile } from "fs/promises"
import { join } from "path"
import { ensureTempDir, cleanupTempFile } from "./video-variants"
import { eq } from "drizzle-orm"
import { Readable } from "stream"
import { pipeline } from "stream/promises"
import { blob } from "hub:blob"

ffmpeg.setFfmpegPath(ffmpegPath!)
ffmpeg.setFfprobePath(ffprobePath.path)

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
  if (processing || videoQueue.length === 0) {
    return
  }
  processing = true

  const job = videoQueue.shift()!
  const tempDir = await ensureTempDir()
  const tempInput = join(tempDir, `${job.mediaId}-transcode-in.mp4`)
  const tempOutput = join(tempDir, `${job.mediaId}-transcode-out.mp4`)

  console.log(`[video-jobs] Starting transcode for ${job.mediaId}`)

  try {
    // Download original from blob to temp file (streaming)
    const originalBlob = await blob.get(job.originalPath)
    if (!originalBlob) {
      throw new Error(`Original video not found: ${job.originalPath}`)
    }

    // Convert web ReadableStream to Node.js stream for pipeline
    const webStream = originalBlob.stream()
    const nodeStream = Readable.fromWeb(
      webStream as Parameters<typeof Readable.fromWeb>[0],
    )
    await pipeline(nodeStream, createWriteStream(tempInput))

    // Transcode to web-optimized mp4
    await transcodeToWeb(tempInput, tempOutput)

    // Upload transcoded video
    const transcodedBuffer = await readFile(tempOutput)
    await blob.put(job.webPath, transcodedBuffer, {
      addRandomSuffix: false,
    })

    // Update database: processing = 0 (ready)
    const { db, schema } = await import("hub:db")
    await db
      .update(schema.media)
      .set({ processing: 0, webPath: job.webPath })
      .where(eq(schema.media.id, job.mediaId))

    console.log(`[video-jobs] Completed transcode for ${job.mediaId}`)
  } catch (error) {
    console.error(`[video-jobs] Transcode failed for ${job.mediaId}:`, error)

    // Mark as failed in DB
    const { db, schema } = await import("hub:db")
    await db
      .update(schema.media)
      .set({ processing: -1 }) // -1 = failed
      .where(eq(schema.media.id, job.mediaId))
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
      .on("end", () => resolve())
      .on("error", reject)
      .save(outputPath)
  })
}
