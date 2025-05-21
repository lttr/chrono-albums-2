import { sql } from "drizzle-orm"
import {
  integer,
  sqliteTable,
  text,
  index,
  real,
} from "drizzle-orm/sqlite-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod"

// Media table schema
export const media = sqliteTable(
  "media",
  {
    albumId: text("albumId").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    dateTaken: text("dateTaken"),
    fileName: text("fileName").notNull(),
    fileSize: integer("fileSize"),
    height: integer("height"),
    id: text("id").primaryKey(),
    kind: text("kind", { enum: ["image", "video"] }).notNull(),
    locationAlt: real("locationAlt"),
    locationLat: real("locationLat"),
    locationLon: real("locationLon"),
    mimeType: text("mimeType").notNull(),
    originalName: text("originalName"),
    width: integer("width"),
  },
  (table) => [
    index("idx_media_kind").on(table.kind!),
    index("idx_media_albumId").on(table.albumId!),
  ],
)

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert

export const mediaInsertSchema = createInsertSchema(media)
export const mediaUpdateSchema = createUpdateSchema(media)
