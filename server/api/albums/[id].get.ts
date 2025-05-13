import { eq } from "drizzle-orm"
import { album, media } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"

export default defineEventHandler(async (event) => {
  const db = useDb()
  const id = getRouterParam(event, "id")

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Album ID is required",
    })
  }

  const albumDetails = await db
    .select()
    .from(album)
    .where(eq(album.id, id))
    .limit(1)

  if (!albumDetails.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  const mediaItems = await db
    .select()
    .from(media)
    .where(eq(media.albumId, id))
    .orderBy(media.dateTaken)

  return {
    album: albumDetails[0],
    media: mediaItems,
  }
})
