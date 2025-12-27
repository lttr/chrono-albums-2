import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Media slug is required",
    })
  }

  // Look up media by slug
  const mediaResult = await db
    .select({
      id: schema.media.id,
      fileName: schema.media.fileName,
      mimeType: schema.media.mimeType,
      originalName: schema.media.originalName,
      fullPath: schema.media.fullPath,
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

  // Serve from fullPath (new format) or fall back to old format
  const blobPath = media.fullPath ?? `${media.id}.jpeg`
  return blob.serve(event, blobPath)
})
