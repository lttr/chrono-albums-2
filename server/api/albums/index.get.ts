import { desc } from "drizzle-orm"
import { album } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"

export default defineEventHandler(async () => {
  const data = await useDb()
    .select({
      id: album.id,
      title: album.title,
      year: album.year,
      month: album.month,
      category: album.categoryId,
    })
    .from(album)
    .orderBy(desc(album.year), desc(album.month))

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  return data
})
