import { db, schema } from "hub:db"
import { categoryInsertSchema } from "~~/server/db/schema"
import { generateSlug } from "~~/server/utils/slug"

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, categoryInsertSchema.parse)
    const result = await db
      .insert(schema.category)
      .values({ ...body, id: crypto.randomUUID(), slug: generateSlug() })
      .returning({
        id: schema.category.id,
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
    console.error("Error creating category:", error)
    throw createError({
      statusCode: 500,
      message: "Failed to create category",
      data: error instanceof Error ? { message: error.message } : undefined,
    })
  }
})
