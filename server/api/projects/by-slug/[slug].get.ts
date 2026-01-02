import { count, desc, eq, inArray } from "drizzle-orm"
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
      sortOrder: schema.album.sortOrder,
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

  // Get all media for albums
  const allMedia = await db
    .select({
      albumId: schema.media.albumId,
      slug: schema.media.slug,
      lqip: schema.media.lqip,
      dateTaken: schema.media.dateTaken,
      fileName: schema.media.fileName,
      createdAt: schema.media.createdAt,
    })
    .from(schema.media)
    .where(inArray(schema.media.albumId, albumIds))

  // Group media by album
  const mediaByAlbum = new Map<
    string,
    Array<{
      slug: string
      lqip: string | null
      dateTaken: string | null
      fileName: string
      createdAt: Date
    }>
  >()
  for (const m of allMedia) {
    if (!mediaByAlbum.has(m.albumId)) {
      mediaByAlbum.set(m.albumId, [])
    }
    mediaByAlbum.get(m.albumId)!.push({
      slug: m.slug,
      lqip: m.lqip,
      dateTaken: m.dateTaken,
      fileName: m.fileName,
      createdAt: m.createdAt,
    })
  }

  // Build sortOrder map for albums
  const albumSortOrder = new Map(
    albums.map((a) => [a.id, a.sortOrder ?? "date"]),
  )

  // Pick first media per album based on album's sortOrder
  const coverMap = new Map<string, { slug: string; lqip: string | null }>()
  for (const [albumId, media] of mediaByAlbum) {
    const sortOrder = albumSortOrder.get(albumId) ?? "date"
    const sorted = [...media].sort((a, b) => {
      if (sortOrder === "name") {
        return a.fileName.localeCompare(b.fileName)
      }
      // Default: sort by date
      const aDate = a.dateTaken ?? a.createdAt.toISOString()
      const bDate = b.dateTaken ?? b.createdAt.toISOString()
      return aDate.localeCompare(bDate)
    })
    if (sorted.length > 0) {
      coverMap.set(albumId, { slug: sorted[0]!.slug, lqip: sorted[0]!.lqip })
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
