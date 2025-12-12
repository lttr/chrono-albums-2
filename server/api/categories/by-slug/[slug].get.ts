import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Category slug is required",
    })
  }

  const categoryResult = await db
    .select({
      id: schema.category.id,
      slug: schema.category.slug,
      name: schema.category.name,
      projectId: schema.category.projectId,
      projectName: schema.project.name,
      projectSlug: schema.project.slug,
    })
    .from(schema.category)
    .leftJoin(schema.project, eq(schema.category.projectId, schema.project.id))
    .where(eq(schema.category.slug, slug))
    .limit(1)

  if (!categoryResult.length) {
    throw createError({
      statusCode: 404,
      message: "Category not found",
    })
  }

  const category = categoryResult[0]!

  // Get albums in this category
  const albums = await db
    .select({
      id: schema.album.id,
      slug: schema.album.slug,
      title: schema.album.title,
      month: schema.album.month,
      year: schema.album.year,
    })
    .from(schema.album)
    .where(eq(schema.album.categoryId, category.id))
    .orderBy(schema.album.year, schema.album.month)

  return {
    category: {
      id: category.id,
      slug: category.slug,
      name: category.name,
    },
    project: {
      id: category.projectId,
      slug: category.projectSlug,
      name: category.projectName,
    },
    albums,
  }
})
