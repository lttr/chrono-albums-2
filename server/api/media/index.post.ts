import { db, schema } from "hub:db"
import { mediaInsertSchema } from "~~/server/db/schema"
import { createError } from "h3"
import { generateSlug } from "~~/server/utils/slug"
import { enqueueTranscode } from "~~/server/utils/video-jobs"

const MediaCreateSchema = mediaInsertSchema

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, MediaCreateSchema.parse)
    const slug = generateSlug()

    await db.insert(schema.media).values({ ...body, slug })

    // Enqueue video transcoding after media record exists
    if (body.kind === "video" && body.originalPath) {
      enqueueTranscode({
        mediaId: body.id,
        originalPath: body.originalPath,
        webPath: `videos/${body.id}.mp4`,
      })
    }

    return {
      id: body.id,
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
