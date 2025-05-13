import { H3Error } from "h3"
import {
  ACCEPTED_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_SIZE_BYTES,
} from "~~/shared/types/media"
import type { NewAlbum, NewMedia } from "../database/schema"
import {
  album,
  albumInsertSchema,
  media,
  mediaInsertSchema,
} from "../database/schema"
import type { GpsTags } from "~~/shared/types/media"
import type { MediaUploadData } from "../types/media"

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
      case "originalName":
        uploadData.originalName = part.data.toString()
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

  let newAlbum: NewAlbum

  try {
    newAlbum = albumInsertSchema.parse(uploadData.album)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid album data",
      cause: error,
    })
  }

  // Store file using useStorage
  const storage = useStorage("uploads")
  try {
    await storage.setItemRaw(`${uploadData.id}.jpeg`, uploadData.file)
  } catch (error) {
    console.error(error)
    if (error instanceof H3Error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Error storing files",
    })
  }

  // Insert metadata into database
  const db = useDb()
  try {
    await db
      .insert(album)
      .values(newAlbum)
      .onConflictDoUpdate({
        target: album.id,
        set: {
          category: newAlbum.category,
          month: newAlbum.month,
          title: newAlbum.title,
          year: newAlbum.year,
        },
      })

    const locationAlt = uploadData.location?.Altitude ?? null
    const locationLat = uploadData.location?.Latitude ?? null
    const locationLon = uploadData.location?.Longitude ?? null

    const newMedia = {
      ...uploadData,
      albumId: newAlbum.id,
      locationAlt,
      locationLat,
      locationLon,
    } satisfies NewMedia
    const newMediaValidated = mediaInsertSchema.parse(newMedia)

    await db.insert(media).values(newMediaValidated)
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
