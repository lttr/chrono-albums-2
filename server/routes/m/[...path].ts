import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

const VALID_VARIANTS = ["thumb", "original", "poster"] as const
type Variant = (typeof VALID_VARIANTS)[number]

export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, "path")

  if (!pathParam) {
    throw createError({
      statusCode: 400,
      statusMessage: "Media slug is required",
    })
  }

  // Parse path: /m/{slug} or /m/{slug}/{variant}
  const pathParts = pathParam.split("/")
  const slug = pathParts[0]
  const variantParam = pathParts[1] as Variant | undefined

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Media slug is required",
    })
  }

  // Validate variant if provided
  if (variantParam && !VALID_VARIANTS.includes(variantParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid variant",
    })
  }

  // Look up media by slug
  const mediaResult = await db
    .select({
      kind: schema.media.kind,
      fileName: schema.media.fileName,
      originalName: schema.media.originalName,
      fullPath: schema.media.fullPath,
      thumbnailPath: schema.media.thumbnailPath,
      originalPath: schema.media.originalPath,
      // Video-specific
      posterPath: schema.media.posterPath,
      webPath: schema.media.webPath,
      processing: schema.media.processing,
    })
    .from(schema.media)
    .where(eq(schema.media.slug, slug))
    .limit(1)

  if (!mediaResult.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Media not found",
    })
  }

  const media = mediaResult[0]!

  // Set cache headers for media files
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable")
  setHeader(
    event,
    "Content-Disposition",
    `inline; filename="${media.originalName || media.fileName}"`,
  )

  // Handle video media
  if (media.kind === "video") {
    if (variantParam === "poster") {
      // Serve poster image
      if (!media.posterPath) {
        throw createError({
          statusCode: 404,
          statusMessage: "Poster not found",
        })
      }
      setHeader(event, "Content-Type", "image/jpeg")
      return blob.serve(event, media.posterPath)
    }

    if (variantParam === "thumb") {
      // Serve poster thumbnail
      if (!media.thumbnailPath) {
        throw createError({
          statusCode: 404,
          statusMessage: "Thumbnail not found",
        })
      }
      setHeader(event, "Content-Type", "image/webp")
      return blob.serve(event, media.thumbnailPath)
    }

    // Default: serve video
    if (media.processing === 1) {
      // Still transcoding - return 202
      setHeader(event, "Retry-After", 30)
      throw createError({
        statusCode: 202,
        statusMessage: "Video is still processing",
      })
    }

    const videoPath = media.webPath ?? media.originalPath
    if (!videoPath) {
      throw createError({ statusCode: 404, statusMessage: "Video not found" })
    }
    setHeader(event, "Content-Type", "video/mp4")
    return blob.serve(event, videoPath)
  }

  // Handle image media
  let blobPath: string | null = null

  switch (variantParam) {
    case "thumb":
      blobPath = media.thumbnailPath
      break
    case "original":
      blobPath = media.originalPath
      break
    default:
      // No variant = full size
      blobPath = media.fullPath
  }

  if (!blobPath) {
    throw createError({
      statusCode: 404,
      statusMessage: "Media file not available",
    })
  }

  return blob.serve(event, blobPath)
})
