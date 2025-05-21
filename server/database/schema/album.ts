import { sql } from "drizzle-orm"
import {
  integer,
  sqliteTable,
  text,
  index,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"

// Album table schema
export const album = sqliteTable(
  "album",
  {
    category: text("category").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    id: text("id").primaryKey(),
    month: integer("month").notNull(),
    title: text("title").notNull(),
    year: integer("year").notNull(),
  },
  (table) => [
    index("idx_album_year").on(table.year),
    index("idx_album_category").on(table.category),
  ],
)

export type Album = typeof album.$inferSelect
export type NewAlbum = typeof album.$inferInsert

export const albumInsertSchema = createInsertSchema(album)
export const albumUpdateSchema = createUpdateSchema(album)
