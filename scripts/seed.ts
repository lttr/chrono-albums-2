/**
 * Standalone database seed script
 * Can be run directly without the dev server: npx tsx scripts/seed.ts
 */
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { seed } from "drizzle-seed"
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core"
import * as schema from "../server/db/schema"
import sharp from "sharp"
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"

const MOCK_USER = {
  id: "mock-user-001",
  name: "Dev User",
  email: "dev@localhost",
  emailVerified: true,
  image: null,
}

const currentYear = new Date().getFullYear()
const firstYear = 1968

const projectNames = ["Rodinné fotky", "Skautský oddíl Sova", "Cestování"]

const categoryNames = [
  "Letní tábory",
  "Víkendové akce",
  "Oddílové schůzky",
  "Výlety",
  "Narozeniny",
]

const albumTitles = [
  "Letní tábor Šumava",
  "Velikonoční výprava",
  "Vánoční besídka",
  "Vodácký výlet Vltava",
  "Zimní přespávačka",
  "Den dětí",
  "Sraz starých skautů",
  "Výlet do Českého ráje",
  "Táborák u rybníka",
  "Silvestr na chatě",
  "Jarní brigáda",
  "Orientační závod",
  "Pohádkový les",
  "Cyklovýlet Morava",
  "Stavění iglú",
  "Zpívání u táboráku",
  "Noční hra",
  "Vodní bitva",
  "Horolezecký kurz",
  "Podzimní výšlap",
]

function generateSlug(): string {
  return crypto.randomUUID().replace(/-/g, "")
}

const BLOB_DIR = ".data/blob/photos"
const FIXTURES_DIR = "fixtures/images"

interface BlobMeta {
  contentType: string
  size: number
  mtime: string
}

async function writeBlobFile(
  path: string,
  data: Buffer,
  contentType: string,
): Promise<void> {
  const fullPath = join(BLOB_DIR, path)
  const meta: BlobMeta = {
    contentType,
    size: data.length,
    mtime: new Date().toISOString(),
  }
  await writeFile(fullPath, data)
  await writeFile(`${fullPath}.$meta.json`, JSON.stringify(meta))
}

async function generateAndStoreVariants(
  id: string,
  input: Buffer,
): Promise<{ lqip: string; width: number; height: number }> {
  // Generate variants
  const [original, full, thumbnail, lqipBuffer] = await Promise.all([
    sharp(input)
      .resize(3500, 3500, { fit: "inside", withoutEnlargement: true })
      .rotate()
      .withMetadata()
      .jpeg({ quality: 92 })
      .toBuffer(),
    sharp(input)
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .rotate()
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toBuffer(),
    sharp(input)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true })
      .rotate()
      .webp({ quality: 75 })
      .toBuffer(),
    sharp(input).resize(20).rotate().jpeg({ quality: 60 }).toBuffer(),
  ])

  // Get dimensions from original variant
  const meta = await sharp(original).metadata()

  // Store all variants
  await Promise.all([
    writeBlobFile(`${id}-original.jpg`, original, "image/jpeg"),
    writeBlobFile(`${id}-full.jpg`, full, "image/jpeg"),
    writeBlobFile(`${id}-thumb.webp`, thumbnail, "image/webp"),
  ])

  return {
    lqip: `data:image/jpeg;base64,${lqipBuffer.toString("base64")}`,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
  }
}

async function main() {
  const client = createClient({
    url: "file:.data/db/sqlite.db",
  })
  const db = drizzle(client, { schema })

  console.log("Seeding database...")

  // Ensure blob directory exists
  await mkdir(BLOB_DIR, { recursive: true })

  // Clear existing data first (in correct order due to foreign keys)
  await db.delete(schema.media)
  await db.delete(schema.album)
  await db.delete(schema.category)
  await db.delete(schema.projectMembership)
  await db.delete(schema.project)
  // Clear auth tables (session, account reference user)
  await db.delete(schema.session)
  await db.delete(schema.account)
  await db.delete(schema.verification)
  await db.delete(schema.user)

  // Insert mock user
  await db.insert(schema.user).values({
    id: MOCK_USER.id,
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    emailVerified: MOCK_USER.emailVerified,
    image: MOCK_USER.image,
  })
  console.log("Mock user created:", MOCK_USER.email)

  // Cast db for drizzle-seed compatibility
  // Exclude tables/relations not being seeded to avoid warnings
  const {
    projectMembership: _pm,
    user: _u,
    session: _s,
    account: _a,
    verification: _v,
    userRelations: _ur,
    sessionRelations: _sr,
    accountRelations: _ar,
    media: _media,
    mediaRelations: _mr,
    ...seedSchema
  } = schema

  await seed(
    db as unknown as BaseSQLiteDatabase<"async", unknown>,
    seedSchema,
  ).refine((f) => ({
    project: {
      count: 3,
      columns: {
        name: f.valuesFromArray({ values: projectNames, isUnique: true }),
        slug: f.valuesFromArray({
          values: Array.from({ length: 3 }, () => generateSlug()),
          isUnique: true,
        }),
      },
    },
    category: {
      count: 5,
      columns: {
        name: f.valuesFromArray({ values: categoryNames, isUnique: true }),
        slug: f.valuesFromArray({
          values: Array.from({ length: 5 }, () => generateSlug()),
          isUnique: true,
        }),
      },
    },
    album: {
      count: 20,
      columns: {
        title: f.valuesFromArray({ values: albumTitles }),
        month: f.int({ minValue: 1, maxValue: 12 }),
        year: f.int({ minValue: firstYear, maxValue: currentYear }),
        slug: f.valuesFromArray({
          values: Array.from({ length: 20 }, () => generateSlug()),
          isUnique: true,
        }),
      },
    },
  }))

  // Seed media from fixture images
  const albums = await db.select().from(schema.album)
  const fixtureFiles = await readdir(FIXTURES_DIR)
  const imageFiles = fixtureFiles.filter((f) => f.endsWith(".jpg"))

  // Put all images in first album for testing justified grid
  const testAlbum = albums[0]

  console.log(
    `Seeding ${imageFiles.length} media items into album "${testAlbum.title}"...`,
  )

  for (let i = 0; i < imageFiles.length; i++) {
    const fileName = imageFiles[i]!
    const input = await readFile(join(FIXTURES_DIR, fileName))
    const id = crypto.randomUUID()

    const { lqip, width, height } = await generateAndStoreVariants(id, input)

    await db.insert(schema.media).values({
      id,
      albumId: testAlbum.id,
      slug: generateSlug(),
      fileName,
      originalName: fileName,
      mimeType: "image/jpeg",
      kind: "image",
      fileSize: input.length,
      width,
      height,
      lqip,
      thumbnailPath: `photos/${id}-thumb.webp`,
      fullPath: `photos/${id}-full.jpg`,
      originalPath: `photos/${id}-original.jpg`,
    })
    console.log(`  Created media: ${fileName}`)
  }

  // Create project memberships for mock user
  // Owner of first 2 projects, member of 3rd
  const projects = await db.select().from(schema.project)
  for (let i = 0; i < projects.length; i++) {
    await db.insert(schema.projectMembership).values({
      userId: MOCK_USER.id,
      projectId: projects[i].id,
      role: i < 2 ? "owner" : "member",
    })
  }
  console.log("Mock user memberships created (owner: 2, member: 1)")

  console.log("Database seeded successfully!")
  client.close()
}

main().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
