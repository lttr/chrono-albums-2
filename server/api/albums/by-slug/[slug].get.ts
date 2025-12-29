import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Album slug is required",
    })
  }

  const albumDetails = await db
    .select({
      id: schema.album.id,
      slug: schema.album.slug,
      title: schema.album.title,
      month: schema.album.month,
      year: schema.album.year,
      createdAt: schema.album.createdAt,
      projectName: schema.project.name,
      projectSlug: schema.project.slug,
      categoryName: schema.category.name,
      categorySlug: schema.category.slug,
    })
    .from(schema.album)
    .leftJoin(schema.project, eq(schema.album.projectId, schema.project.id))
    .leftJoin(schema.category, eq(schema.album.categoryId, schema.category.id))
    .where(eq(schema.album.slug, slug))
    .limit(1)

  if (!albumDetails.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  const mediaItems = await db
    .select({
      id: schema.media.id,
      slug: schema.media.slug,
      fileName: schema.media.fileName,
      originalName: schema.media.originalName,
      mimeType: schema.media.mimeType,
      kind: schema.media.kind,
      width: schema.media.width,
      height: schema.media.height,
      dateTaken: schema.media.dateTaken,
      lqip: schema.media.lqip,
      // Video-specific fields
      processing: schema.media.processing,
      duration: schema.media.duration,
    })
    .from(schema.media)
    .where(eq(schema.media.albumId, albumDetails[0]!.id))
    .orderBy(schema.media.dateTaken)

  // Transform to slug-based URLs (no internal paths exposed)
  const mediaWithUrls = mediaItems.map((item) => ({
    ...item,
    thumbnailUrl: `/m/${item.slug}/thumb`,
    fullUrl: `/m/${item.slug}`,
    originalUrl: `/m/${item.slug}/original`,
    // Video-specific URLs
    posterUrl: item.kind === "video" ? `/m/${item.slug}/poster` : undefined,
    // Convert processing state to boolean for frontend
    processing: item.kind === "video" ? item.processing === 1 : undefined,
  }))

  return {
    album: albumDetails[0],
    media: mediaWithUrls,
  }
})
