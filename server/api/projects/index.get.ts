import { desc } from "drizzle-orm"
import type { Project } from "~~/server/database/schema"
import { project } from "~~/server/database/schema"
import { useDb } from "~~/server/utils/db"

export type GetProject = Pick<Project, "id" | "name">

export default defineEventHandler(async (): Promise<GetProject[]> => {
  const data = await useDb()
    .select({
      id: project.id,
      name: project.name,
    })
    .from(project)
    .orderBy(desc(project.createdAt))

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: "Project not found",
    })
  }

  return data
})
