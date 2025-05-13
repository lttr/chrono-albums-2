import { album } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"

export default defineEventHandler(async () => {
  const db = useDb()

  const albums = await db.select().from(album)

  if (!albums.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  return {
    albums,
  }
})
