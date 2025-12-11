import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"

// Category table schema
export const category = sqliteTable("category", {
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  projectId: text("projectId").notNull(),
})

export type Category = typeof category.$inferSelect
export type NewCategory = typeof category.$inferInsert

export const categoryInsertSchema = createInsertSchema(category)
export const categoryUpdateSchema = createUpdateSchema(category)
