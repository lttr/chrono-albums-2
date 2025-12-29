import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import ffprobePath from "ffprobe-static"
import { createWriteStream, existsSync } from "fs"
import { readdir, readFile, stat, unlink, mkdir } from "fs/promises"
import { join } from "path"
import { Readable } from "stream"
import { pipeline } from "stream/promises"
import { blob } from "hub:blob"

ffmpeg.setFfmpegPath(ffmpegPath!)
ffmpeg.setFfprobePath(ffprobePath.path)

const VIDEO_TEMP_DIR = ".data/temp/videos"

interface TranscodeOptions {
  mediaId: string
  sourcePath: string
  targetPath: string
}

/**
 * Transcode video from blob storage to web-optimized mp4
 */
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
    const originalBlob = await blob.get(sourcePath)
    if (!originalBlob) {
      throw new Error(`Source blob not found: ${sourcePath}`)
    }

    // Stream to temp file
    const webStream = originalBlob.stream()
    const nodeStream = Readable.fromWeb(
      webStream as Parameters<typeof Readable.fromWeb>[0],
    )
    await pipeline(nodeStream, createWriteStream(inputPath))

    // Transcode to web-optimized mp4
    console.log(`[transcode] Transcoding ${mediaId}`)
    await transcodeToWeb(inputPath, outputPath)

    // Upload transcoded file to blob storage
    console.log(`[transcode] Uploading to ${targetPath}`)
    const outputBuffer = await readFile(outputPath)
    await blob.put(targetPath, outputBuffer, {
      addRandomSuffix: false,
    })

    console.log(`[transcode] Completed ${mediaId}`)
  } finally {
    // Cleanup temp files
    await cleanup(inputPath)
    await cleanup(outputPath)
  }
}

function transcodeToWeb(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .outputOptions("-crf", "23")
      .outputOptions("-preset", "medium")
      .outputOptions("-vf", "scale=-2:'min(1080,ih)'")
      .audioCodec("aac")
      .audioBitrate("128k")
      .format("mp4")
      .outputOptions("-movflags", "+faststart")
      .on("progress", (progress) => {
        console.log(
          `[transcode] Progress: ${Math.round(progress.percent || 0)}%`,
        )
      })
      .on("end", () => resolve())
      .on("error", reject)
      .save(outputPath)
  })
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
