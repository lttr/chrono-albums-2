import { asc, count, desc, eq, inArray } from "drizzle-orm"
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
  // Sorted by year/month descending (newer first)
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
    .orderBy(desc(schema.album.year), desc(schema.album.month))

  if (albums.length === 0) {
    return {
      project: {
        id: project.id,
        slug: project.slug,
        name: project.name,
      },
      hasCategories: false,
      categories: [],
      albums: [],
    }
  }

  const albumIds = albums.map((a) => a.id)

  // Get earliest media per album (by dateTaken) for cover
  const allMedia = await db
    .select({
      albumId: schema.media.albumId,
      slug: schema.media.slug,
      lqip: schema.media.lqip,
      dateTaken: schema.media.dateTaken,
      createdAt: schema.media.createdAt,
    })
    .from(schema.media)
    .where(inArray(schema.media.albumId, albumIds))
    .orderBy(asc(schema.media.dateTaken), asc(schema.media.createdAt))

  // Pick first media per album
  const coverMap = new Map<string, { slug: string; lqip: string | null }>()
  for (const m of allMedia) {
    if (!coverMap.has(m.albumId)) {
      coverMap.set(m.albumId, { slug: m.slug, lqip: m.lqip })
    }
  }

  // Get media counts per album
  const countsResult = await db
    .select({
      albumId: schema.media.albumId,
      count: count(),
    })
    .from(schema.media)
    .where(inArray(schema.media.albumId, albumIds))
    .groupBy(schema.media.albumId)

  const countMap = new Map(countsResult.map((c) => [c.albumId, c.count]))

  // Build album response objects with covers
  const albumsWithCovers = albums.map((a) => {
    const cover = coverMap.get(a.id)
    return {
      id: a.id,
      slug: a.slug,
      title: a.title,
      month: a.month,
      year: a.year,
      coverThumbnail: cover ? `/m/${cover.slug}/thumb` : null,
      coverLqip: cover?.lqip ?? null,
      mediaCount: countMap.get(a.id) ?? 0,
    }
  })

  return {
    project: {
      id: project.id,
      slug: project.slug,
      name: project.name,
    },
    hasCategories: false,
    categories: [],
    albums: albumsWithCovers,
  }
})
