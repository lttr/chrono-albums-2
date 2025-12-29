import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  // TODO: Add auth check for admin role
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, message: "Job ID required" })
  }

  // Reset job to pending with cleared attempts
  const [updated] = await db
    .update(schema.job)
    .set({
      status: "pending",
      attempts: 0,
      error: null,
      startedAt: null,
      completedAt: null,
    })
    .where(eq(schema.job.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: "Job not found" })
  }

  // Trigger processing
  runTask("video:transcode")

  return updated
})
