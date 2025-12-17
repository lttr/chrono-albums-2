import { db, schema } from "hub:db"
import { seed } from "drizzle-seed"
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core"
import { generateSlug } from "~~/server/utils/slug"
import { MOCK_USER } from "~~/shared/constants/mockAuth"

const currentYear = new Date().getFullYear()
const firstYear = 1968

// Meaningful names for photo album context
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

export default defineTask({
  meta: { name: "seed", description: "Seed database with test data" },
  async run() {
    console.log("Seeding database...")

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
      media: {
        count: 10,
        columns: {
          height: f.int({ minValue: 0, maxValue: 1000 }),
          width: f.int({ minValue: 0, maxValue: 1000 }),
          slug: f.valuesFromArray({
            values: Array.from({ length: 10 }, () => generateSlug()),
            isUnique: true,
          }),
        },
      },
    }))

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
    return { result: "Database seeded" }
  },
})
