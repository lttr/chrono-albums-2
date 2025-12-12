import { desc } from "drizzle-orm"
import { db, schema } from "hub:db"
import type { Category } from "~~/shared/types/db"

export type GetCategory = Pick<Category, "id" | "name" | "slug" | "projectId">

export default defineEventHandler(async (): Promise<GetCategory[]> => {
  const data = await db
    .select({
      id: schema.category.id,
      name: schema.category.name,
      slug: schema.category.slug,
      projectId: schema.category.projectId,
    })
    .from(schema.category)
    .orderBy(desc(schema.category.createdAt))

  return data
})
