import { db, schema } from "hub:db"
import { seed } from "drizzle-seed"
import type { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core"

const currentYear = new Date().getFullYear()
const firstYear = 1968

export default defineTask({
  meta: { name: "seed", description: "Seed database with test data" },
  async run() {
    console.log("Seeding database...")

    // Cast db for drizzle-seed compatibility
    await seed(
      db as unknown as BaseSQLiteDatabase<"async", unknown>,
      schema,
    ).refine((f) => ({
      album: {
        count: 20,
        columns: {
          month: f.int({ minValue: 1, maxValue: 12 }),
          year: f.int({ minValue: firstYear, maxValue: currentYear }),
        },
      },
      category: {
        count: 5,
      },
      project: {
        count: 3,
      },
      media: {
        count: 10,
        columns: {
          height: f.int({ minValue: 0, maxValue: 1000 }),
          width: f.int({ minValue: 0, maxValue: 1000 }),
        },
      },
    }))

    console.log("Database seeded successfully!")
    return { result: "Database seeded" }
  },
})
