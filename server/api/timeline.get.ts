import { asc, count, desc, eq, inArray } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async () => {
  // Get albums with project/category info
  const albums = await db
    .select({
      id: schema.album.id,
      slug: schema.album.slug,
      title: schema.album.title,
      month: schema.album.month,
      year: schema.album.year,
      projectName: schema.project.name,
      categoryName: schema.category.name,
    })
    .from(schema.album)
    .leftJoin(schema.project, eq(schema.album.projectId, schema.project.id))
    .leftJoin(schema.category, eq(schema.album.categoryId, schema.category.id))
    .orderBy(
      desc(schema.album.year),
      desc(schema.album.month),
      asc(schema.album.title),
    )

  if (albums.length === 0) {
    return { years: [] }
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

  // Build album response objects
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
      projectName: a.projectName,
      categoryName: a.categoryName,
    }
  })

  // Group by year
  const yearMap = new Map<number, typeof albumsWithCovers>()
  for (const a of albumsWithCovers) {
    const list = yearMap.get(a.year) ?? []
    list.push(a)
    yearMap.set(a.year, list)
  }

  return {
    years: [...yearMap.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, albums]) => ({ year, albums })),
  }
})
