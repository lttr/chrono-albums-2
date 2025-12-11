import { eq } from "drizzle-orm"
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
    .select()
    .from(schema.album)
    .where(eq(schema.album.id, id))
    .limit(1)

  if (!albumDetails.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  const mediaItems = await db
    .select()
    .from(schema.media)
    .where(eq(schema.media.albumId, id))
    .orderBy(schema.media.dateTaken)

  return {
    album: albumDetails[0],
    media: mediaItems,
  }
})
