import { H3Error } from "h3"
import {
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
  ACCEPTED_MIME_TYPES,
} from "~~/shared/types/media"

interface GpsTags {
  Latitude?: number
  Longitude?: number
  Altitude?: number
}

interface MediaUploadData {
  album?: AlbumSearchParams
  dateTaken?: string
  file?: Buffer
  fileName?: string
  fileSize?: number
  height?: number
  id?: string
  kind?: "video" | "image"
  location?: GpsTags
  mimeType?: string
  width?: number
}

export default defineEventHandler(async (event) => {
  // Parse multipart form data
  const parts = await readMultipartFormData(event)

  // Handle empty FormData
  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files uploaded",
    })
  }

  const uploadData: MediaUploadData = {}
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
      case "kind":
        uploadData.kind = part.data.toString() === "image" ? "image" : "video"
        break
      case "dateTaken":
        uploadData.dateTaken = part.data.toString()
        break
      case "location":
        uploadData.location = JSON.parse(part.data.toString()) as GpsTags
        break
      case "album":
        uploadData.album = JSON.parse(part.data.toString()) as AlbumSearchParams
        break
      case "height":
        uploadData.height = parseInt(part.data.toString())
        break
      case "width":
        uploadData.width = parseInt(part.data.toString())
        break
      default:
        console.warn("Unknown part", part)
    }
  }

  // TODO validate using Zod

  // Validate required fields
  if (
    !uploadData.file ||
    !uploadData.id ||
    !uploadData.kind ||
    !uploadData.album
  ) {
    return {
      status: 400,
      body: {
        error:
          "Missing required fields: file, id, and kind, album are required",
      },
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
    (uploadData.kind === "image" &&
      uploadData.fileSize &&
      uploadData.fileSize > maxImageSize) ||
    (uploadData.kind === "video" &&
      uploadData.fileSize &&
      uploadData.fileSize > maxVideoSize)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: `File ${uploadData.fileName} exceeds maximum size of ${maxImageSize} MB`,
    })
  }

  const storage = useStorage("uploads")

  try {
    // Store file using useStorage
    await storage.setItemRaw(`${uploadData.id}.jpeg`, uploadData.file)
    const { file, ...metadata } = uploadData

    const db = useDatabase()

    const altitude = uploadData.location?.Altitude ?? null
    const latitude = uploadData.location?.Latitude ?? null
    const longitude = uploadData.location?.Longitude ?? null
    const dateTaken =
      uploadData.dateTaken && uploadData.dateTaken !== "undefined"
        ? new Date(uploadData.dateTaken).toISOString()
        : null

    await db.sql`
      INSERT INTO media (
        album,
        dateTaken,
        fileName,
        fileSize,
        id,
        kind,
        locationAlt,
        locationLat,
        locationLng,
        mimeType,
        updatedAt
      ) VALUES (
        ${uploadData.album.id},
        ${dateTaken},
        ${uploadData.fileName},
        ${uploadData.fileSize},
        ${uploadData.id},
        ${uploadData.kind},
        ${altitude},
        ${latitude},
        ${longitude},
        ${uploadData.mimeType},
        datetime('now')
      )
    `
    // upsert album
    await db.sql`
      INSERT INTO album (
        id,
        title,
        month,
        year,
        category
      ) VALUES (
        ${uploadData.album.id},
        ${uploadData.album.title},
        ${uploadData.album.month},
        ${uploadData.album.year},
        ${uploadData.album.category}
      ) ON CONFLICT (id) DO NOTHING
    `

    await storage.setItem(
      `${uploadData.id}-metadata.json`,
      JSON.stringify(metadata, null, 2),
    )
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
