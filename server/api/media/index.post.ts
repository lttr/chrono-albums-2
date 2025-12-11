import { db, schema } from "hub:db"
import { mediaInsertSchema } from "~~/server/db/schema"
import { createError } from "h3"

const MediaCreateSchema = mediaInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const newMedia = await readValidatedBody(event, MediaCreateSchema.parse)

    await db.insert(schema.media).values(newMedia)

    return {
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
