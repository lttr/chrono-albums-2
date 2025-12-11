import { desc } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async () => {
  const data = await db
    .select({
      id: schema.album.id,
      title: schema.album.title,
      year: schema.album.year,
      month: schema.album.month,
      category: schema.album.categoryId,
    })
    .from(schema.album)
    .orderBy(desc(schema.album.year), desc(schema.album.month))

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  return data
})
