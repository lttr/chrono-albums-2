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
      fileName: schema.media.fileName,
      mimeType: schema.media.mimeType,
      originalName: schema.media.originalName,
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

  // Serve the file via blob with download-friendly headers
  setHeader(
    event,
    "Content-Disposition",
    `inline; filename="${media.originalName || media.fileName}"`,
  )

  return blob.serve(event, media.fileName)
})
