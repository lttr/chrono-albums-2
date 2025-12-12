import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Project slug is required",
    })
  }

  const projectResult = await db
    .select()
    .from(schema.project)
    .where(eq(schema.project.slug, slug))
    .limit(1)

  if (!projectResult.length) {
    throw createError({
      statusCode: 404,
      message: "Project not found",
    })
  }

  const project = projectResult[0]!

  // Get categories for this project
  const categories = await db
    .select({
      id: schema.category.id,
      slug: schema.category.slug,
      name: schema.category.name,
    })
    .from(schema.category)
    .where(eq(schema.category.projectId, project.id))

  // If project has categories, return them
  if (categories.length > 0) {
    return {
      project: {
        id: project.id,
        slug: project.slug,
        name: project.name,
      },
      hasCategories: true,
      categories,
      albums: [],
    }
  }

  // Otherwise, return albums directly under project (no category)
  const albums = await db
    .select({
      id: schema.album.id,
      slug: schema.album.slug,
      title: schema.album.title,
      month: schema.album.month,
      year: schema.album.year,
    })
    .from(schema.album)
    .where(eq(schema.album.projectId, project.id))
    .orderBy(schema.album.year, schema.album.month)

  return {
    project: {
      id: project.id,
      slug: project.slug,
      name: project.name,
    },
    hasCategories: false,
    categories: [],
    albums,
  }
})
