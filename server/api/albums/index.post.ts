import { album, albumInsertSchema } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"
import { createError } from "h3"

const AlbumCreateSchema = albumInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const newAlbum = await readValidatedBody(event, AlbumCreateSchema.parse)

    const db = useDb()
    await db
      .insert(album)
      .values(newAlbum)
      .onConflictDoUpdate({
        target: album.id,
        set: {
          category: newAlbum.category,
          month: newAlbum.month,
          title: newAlbum.title,
          year: newAlbum.year,
        },
      })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Failed to create album:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create album",
      data: error instanceof Error ? { message: error.message } : undefined,
    })
  }
})
