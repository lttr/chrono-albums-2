import { desc } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async () => {
  const data = await db
    .select()
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
