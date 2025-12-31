import { count, desc, eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  const session = await getAuthSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  const data = await db
    .select({
      id: schema.album.id,
      slug: schema.album.slug,
      title: schema.album.title,
      month: schema.album.month,
      year: schema.album.year,
      createdAt: schema.album.createdAt,
      projectId: schema.album.projectId,
      categoryId: schema.album.categoryId,
      projectName: schema.project.name,
      categoryName: schema.category.name,
      mediaCount: count(schema.media.id),
    })
    .from(schema.album)
    .leftJoin(schema.project, eq(schema.album.projectId, schema.project.id))
    .leftJoin(schema.category, eq(schema.album.categoryId, schema.category.id))
    .leftJoin(schema.media, eq(schema.media.albumId, schema.album.id))
    .groupBy(schema.album.id)
    .orderBy(desc(schema.album.year), desc(schema.album.month))

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  return data
})
