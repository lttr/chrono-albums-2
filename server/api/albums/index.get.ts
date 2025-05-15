import { desc } from "drizzle-orm"
import { album } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"

export default defineEventHandler(async () => {
  const db = useDb()

  const data = await db
    .select({
      id: album.id,
      title: album.title,
      year: album.year,
      month: album.month,
      category: album.category,
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
