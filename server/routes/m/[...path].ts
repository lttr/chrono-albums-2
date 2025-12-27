import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

const VALID_VARIANTS = ["thumb", "original"] as const
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
      fileName: schema.media.fileName,
      originalName: schema.media.originalName,
      fullPath: schema.media.fullPath,
      thumbnailPath: schema.media.thumbnailPath,
      originalPath: schema.media.originalPath,
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

  // Determine which path to serve based on variant
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

  // Set cache headers for media files
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable")
  setHeader(
    event,
    "Content-Disposition",
    `inline; filename="${media.originalName || media.fileName}"`,
  )

  return blob.serve(event, blobPath)
})
