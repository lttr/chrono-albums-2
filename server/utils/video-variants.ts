import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import sharp from "sharp"
import { mkdir, unlink } from "fs/promises"
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
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
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
