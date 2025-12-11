import { db, schema } from "hub:db"
import { projectInsertSchema } from "~~/server/db/schema"

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, projectInsertSchema.parse)
    const result = await db
      .insert(schema.project)
      .values({ ...body, id: crypto.randomUUID() })
      .returning({
        id: schema.project.id,
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
