import { db, schema } from "hub:db"
import { albumInsertSchema } from "~~/server/db/schema"
import { createError } from "h3"

const AlbumCreateSchema = albumInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const newAlbum = await readValidatedBody(event, AlbumCreateSchema.parse)

    await db
      .insert(schema.album)
      .values(newAlbum)
      .onConflictDoUpdate({
        target: schema.album.id,
        set: {
          categoryId: newAlbum.categoryId,
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
