import { useDb } from "~~/server/utils/db"
import { project, ProjectInsertSchema } from "~~/database/schema/project"

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, ProjectInsertSchema.parse)
    const result = await useDb().insert(project).values(body).returning({
      id: project.id,
    })
    return {
      id: result[0].id,
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
