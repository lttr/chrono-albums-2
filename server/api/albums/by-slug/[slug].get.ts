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
      thumbnailPath: schema.media.thumbnailPath,
      fullPath: schema.media.fullPath,
    })
    .from(schema.media)
    .where(eq(schema.media.albumId, albumDetails[0]!.id))
    .orderBy(schema.media.dateTaken)

  // Transform paths to URLs
  const mediaWithUrls = mediaItems.map((item) => ({
    ...item,
    thumbnailUrl: item.thumbnailPath ? `/${item.thumbnailPath}` : null,
    fullUrl: item.fullPath ? `/${item.fullPath}` : null,
  }))

  return {
    album: albumDetails[0],
    media: mediaWithUrls,
  }
})
