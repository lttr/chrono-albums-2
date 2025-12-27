import { H3Error } from "h3"
import {
  ACCEPTED_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
} from "~~/shared/types/media"
import type { MediaUploadData } from "../types/media"
import { generateVariants } from "../utils/image-variants"

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
      // Video: store as-is for now (variant generation skipped)
      await blob.put(`${uploadData.id}.mp4`, uploadData.file, {
        addRandomSuffix: false,
      })

      return {
        success: true,
        id: uploadData.id,
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
