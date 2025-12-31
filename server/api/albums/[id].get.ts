import { asc, eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Album ID is required",
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
      projectId: schema.album.projectId,
      categoryId: schema.album.categoryId,
      sortOrder: schema.album.sortOrder,
      projectName: schema.project.name,
      categoryName: schema.category.name,
    })
    .from(schema.album)
    .leftJoin(schema.project, eq(schema.album.projectId, schema.project.id))
    .leftJoin(schema.category, eq(schema.album.categoryId, schema.category.id))
    .where(eq(schema.album.id, id))
    .limit(1)

  if (!albumDetails.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  const album = albumDetails[0]!
  const orderBy =
    album.sortOrder === "name"
      ? asc(schema.media.originalName)
      : asc(schema.media.dateTaken)

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
    })
    .from(schema.media)
    .where(eq(schema.media.albumId, id))
    .orderBy(orderBy)

  // Transform to slug-based URLs
  const mediaWithUrls = mediaItems.map((item) => ({
    ...item,
    thumbnailUrl: `/m/${item.slug}/thumb`,
    fullUrl: `/m/${item.slug}`,
    originalUrl: `/m/${item.slug}/original`,
  }))

  return {
    album,
    media: mediaWithUrls,
  }
})
