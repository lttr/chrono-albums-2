import { H3Error } from "h3"
import { createWriteStream } from "fs"
import { readFile } from "fs/promises"
import { pipeline } from "stream/promises"
import { Readable } from "stream"
import { join } from "path"
import {
  ACCEPTED_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
} from "~~/shared/types/media"
import type { MediaUploadData } from "../types/media"
import { generateVariants } from "../utils/image-variants"
import {
  extractVideoPoster,
  ensureTempDir,
  cleanupTempFile,
} from "../utils/video-variants"

export interface UploadResponse {
  success: boolean
  id: string
  // Image variant data (only for images)
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

export default defineEventHandler(async (event): Promise<UploadResponse> => {
  const parts = await readMultipartFormData(event)

  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files uploaded",
    })
  }

  const uploadData: Partial<MediaUploadData> = {}
  for (const part of parts) {
    switch (part.name) {
      case "file":
        uploadData.file = part.data
        uploadData.fileName = part.filename
        uploadData.fileSize = part.data.length
        uploadData.mimeType = part.type
        break
      case "id":
        uploadData.id = part.data.toString()
        break
      default:
        console.warn("Unknown part", part)
    }
  }

  // Validate file type
  if (
    !uploadData.mimeType ||
    !ACCEPTED_MIME_TYPES.includes(uploadData.mimeType)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `File type ${
        uploadData.mimeType || "unknown"
      } not allowed. Allowed types: ${ACCEPTED_MIME_TYPES.join(", ")}`,
    })
  }

  // Validate file size
  const maxImageSize = MAX_IMAGE_SIZE_BYTES
  const maxVideoSize = MAX_VIDEO_SIZE_BYTES
  if (
    (uploadData.mimeType.startsWith("image") &&
      uploadData.fileSize &&
      uploadData.fileSize > maxImageSize) ||
    (uploadData.mimeType.startsWith("video") &&
      uploadData.fileSize &&
      uploadData.fileSize > maxVideoSize)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `File ${uploadData.fileName} exceeds maximum size of ${maxImageSize} MB`,
    })
  }

  if (!uploadData.file) {
    throw createError({ statusCode: 400, statusMessage: "No file data" })
  }

  if (!uploadData.id) {
    throw createError({ statusCode: 400, statusMessage: "No file id" })
  }

  const isImage = uploadData.mimeType.startsWith("image")

  try {
    if (isImage) {
      // Generate image variants
      const { variants, metadata } = await generateVariants(uploadData.file)

      const id = uploadData.id
      const originalPath = `photos/${id}-original.jpg`
      const fullPath = `photos/${id}-full.jpg`
      const thumbnailPath = `photos/${id}-thumb.webp`

      // Store all variants to blob in parallel
      await Promise.all([
        blob.put(originalPath, variants.original, {
          addRandomSuffix: false,
        }),
        blob.put(fullPath, variants.full, { addRandomSuffix: false }),
        blob.put(thumbnailPath, variants.thumbnail, {
          addRandomSuffix: false,
        }),
      ])

      return {
        success: true,
        id,
        lqip: variants.lqip,
        thumbnailPath,
        fullPath,
        originalPath,
        width: metadata.width,
        height: metadata.height,
      }
    } else {
      // Video: extract poster, store original, enqueue transcoding
      const id = uploadData.id
      const ext = getVideoExtension(uploadData.mimeType!)

      // Write upload to temp file (avoids holding in memory)
      const tempDir = await ensureTempDir()
      const tempVideoPath = join(tempDir, `${id}-upload.${ext}`)

      await pipeline(
        Readable.from(uploadData.file),
        createWriteStream(tempVideoPath),
      )

      try {
        // Extract poster from temp file
        const { posterFull, posterThumb, posterLqip, width, height, duration } =
          await extractVideoPoster(tempVideoPath)

        const originalPath = `videos/${id}-original.${ext}`
        const posterPath = `videos/${id}-poster.jpg`
        const thumbnailPath = `videos/${id}-thumb.webp`

        // Upload original video and poster variants to blob
        const originalVideoBuffer = await readFile(tempVideoPath)
        await Promise.all([
          blob.put(originalPath, originalVideoBuffer, {
            addRandomSuffix: false,
          }),
          blob.put(posterPath, posterFull, { addRandomSuffix: false }),
          blob.put(thumbnailPath, posterThumb, { addRandomSuffix: false }),
        ])

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
  } catch (error) {
    console.error(error)
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error uploading files",
    })
  }
})

function getVideoExtension(mimeType: string): string {
  const map: Record<string, string> = {
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
    "video/x-msvideo": "avi",
  }
  return map[mimeType] ?? "mp4"
}
