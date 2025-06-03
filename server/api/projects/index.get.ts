import { desc } from "drizzle-orm"
import { project } from "~~/server/database/schema/project"
import { useDb } from "~~/server/utils/db"

export default defineEventHandler(async () => {
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
