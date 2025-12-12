import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"

// Project table schema
export const project = sqliteTable("project", {
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
})

export const projectInsertSchema = createInsertSchema(project).omit({
  id: true,
  slug: true,
  createdAt: true,
})
export const projectUpdateSchema = createUpdateSchema(project)
