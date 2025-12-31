import { desc } from "drizzle-orm"
import { db, schema } from "hub:db"
import type { Project } from "~~/shared/types/db"

export type GetProject = Pick<Project, "id" | "name" | "slug">

export default defineEventHandler(async (event): Promise<GetProject[]> => {
  const session = await getAuthSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  const data = await db
    .select({
      id: schema.project.id,
      name: schema.project.name,
      slug: schema.project.slug,
    })
    .from(schema.project)
    .orderBy(desc(schema.project.createdAt))

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: "Project not found",
    })
  }

  return data
})
