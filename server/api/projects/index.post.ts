import { useDb } from "~~/server/utils/db"
import { project, projectInsertSchema } from "~~/server/database/schema"

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, projectInsertSchema.parse)
    const result = await useDb().insert(project).values(body).returning({
      id: project.id,
    })
    const inserted = result[0]
    if (!inserted) {
      throw new Error("Insert returned no result")
    }
    return {
      id: inserted.id,
      success: true,
    }
  } catch (error) {
    console.error("Error creating project:", error)
    throw createError({
      statusCode: 500,
      message: "Failed to create project",
      data: error instanceof Error ? { message: error.message } : undefined,
    })
  }
})
