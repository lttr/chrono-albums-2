import { db, schema } from "hub:db"
import { albumInsertSchema } from "~~/server/db/schema"
import { createError } from "h3"
import { generateSlug } from "~~/server/utils/slug"

const AlbumCreateSchema = albumInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, AlbumCreateSchema.parse)
    const slug = generateSlug()

    await db.insert(schema.album).values({ ...body, slug })

    return {
      id: body.id,
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
