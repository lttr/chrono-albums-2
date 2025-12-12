import { sql } from "drizzle-orm"
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"

// Album table schema
export const album = sqliteTable(
  "album",
  {
    categoryId: text("categoryId"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    id: text("id").primaryKey(),
    month: integer("month").notNull(),
    slug: text("slug").notNull().unique(),
    projectId: text("projectId").notNull(),
    title: text("title").notNull(),
    year: integer("year").notNull(),
  },
  (table) => [index("idx_album_year").on(table.year)],
)

export const albumInsertSchema = createInsertSchema(album).omit({
  slug: true,
  createdAt: true,
})
export const albumUpdateSchema = createUpdateSchema(album)
