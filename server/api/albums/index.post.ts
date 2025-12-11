import { db, schema } from "hub:db"
import { albumInsertSchema } from "~~/server/db/schema"
import { createError } from "h3"

const AlbumCreateSchema = albumInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, AlbumCreateSchema.parse)
    const id = crypto.randomUUID()

    await db.insert(schema.album).values({ ...body, id })

    return {
      id,
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
