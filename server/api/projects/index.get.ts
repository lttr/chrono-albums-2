import { desc } from "drizzle-orm"
import { db, schema } from "hub:db"
import type { Project } from "~~/shared/types/db"

export type GetProject = Pick<Project, "id" | "name">

export default defineEventHandler(async (): Promise<GetProject[]> => {
  const data = await db
    .select({
      id: schema.project.id,
      name: schema.project.name,
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
