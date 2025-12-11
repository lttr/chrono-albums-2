import { db, schema } from "hub:db"
import { mediaInsertSchema } from "~~/server/db/schema"
import { createError } from "h3"

const MediaCreateSchema = mediaInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, MediaCreateSchema.parse)
    const id = crypto.randomUUID()

    await db.insert(schema.media).values({ ...body, id })

    return {
      id,
      success: true,
    }
  } catch (error) {
    console.error("Failed to create media:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create media",
      data: error instanceof Error ? { message: error.message } : undefined,
    })
  }
})
