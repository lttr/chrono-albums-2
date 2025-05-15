import { media, mediaInsertSchema } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"
import { createError } from "h3"

const MediaCreateSchema = mediaInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const newMedia = await readValidatedBody(event, MediaCreateSchema.parse)

    const db = useDb()
    await db.insert(media).values(newMedia).returning()

    return {
      success: true,
    }
  } catch (error) {
    // Handle errors
    console.error("Failed to create media:", error)

    // Use createError for consistent error handling
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create media",
      data: error instanceof Error ? { message: error.message } : undefined,
    })
  }
})
