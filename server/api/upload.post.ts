import { H3Error } from "h3"
import {
  ACCEPTED_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
} from "~~/shared/types/media"
import type { MediaUploadData } from "../types/media"

export default defineEventHandler(async (event) => {
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

  // Store file using blob
  try {
    if (!uploadData.file) {
      throw createError({ statusCode: 400, statusMessage: "No file data" })
    }
    await blob.put(`${uploadData.id}.jpeg`, uploadData.file, {
      addRandomSuffix: false,
    })
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
