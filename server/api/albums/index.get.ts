import { desc, eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async () => {
  const data = await db
    .select({
      id: schema.album.id,
      title: schema.album.title,
      month: schema.album.month,
      year: schema.album.year,
      createdAt: schema.album.createdAt,
      projectName: schema.project.name,
      categoryName: schema.category.name,
    })
    .from(schema.album)
    .leftJoin(schema.project, eq(schema.album.projectId, schema.project.id))
    .leftJoin(schema.category, eq(schema.album.categoryId, schema.category.id))
    .orderBy(desc(schema.album.year), desc(schema.album.month))

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  return data
})
