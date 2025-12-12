import { db, schema } from "hub:db"
import { seed } from "drizzle-seed"
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core"
import { generateSlug } from "~~/server/utils/slug"

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
    await db.delete(schema.project)

    // Cast db for drizzle-seed compatibility
    await seed(
      db as unknown as BaseSQLiteDatabase<"async", unknown>,
      schema,
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

    console.log("Database seeded successfully!")
    return { result: "Database seeded" }
  },
})
