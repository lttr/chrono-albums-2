import { relations, sql } from "drizzle-orm"
import {
  integer,
  sqliteTable,
  text,
  index,
  real,
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

// Media table schema
export const media = sqliteTable(
  "media",
  {
    albumId: text("albumId").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    dateTaken: text("dateTaken"),
    fileName: text("fileName"),
    fileSize: integer("fileSize"),
    height: integer("height"),
    id: text("id").primaryKey(),
    kind: text("kind", { enum: ["image", "video"] }).notNull(),
    locationAlt: real("locationAlt"),
    locationLat: real("locationLat"),
    locationLon: real("locationLon"),
    mimeType: text("mimeType"),
    originalName: text("originalName"),
    width: integer("width"),
  },
  (table) => [
    index("idx_media_kind").on(table.kind!),
    index("idx_media_albumId").on(table.albumId!),
  ],
)

export const albumRelations = relations(album, ({ many }) => ({
  media: many(media),
}))

export const mediaRelations = relations(media, ({ one }) => ({
  belongsTo: one(album, {
    // To prevent TS error, the ! is required
    fields: [media.albumId!],
    references: [album.id],
  }),
}))

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert

export const mediaInsertSchema = createInsertSchema(media)
export const mediaUpdateSchema = createUpdateSchema(media)
