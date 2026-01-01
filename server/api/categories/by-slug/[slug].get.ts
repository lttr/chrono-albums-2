import { asc, count, desc, eq, inArray } from "drizzle-orm"
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

  // Get albums in this category (sorted by year/month descending, newer first)
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
    .orderBy(desc(schema.album.year), desc(schema.album.month))

  if (albums.length === 0) {
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
    albums: albumsWithCovers,
  }
})
