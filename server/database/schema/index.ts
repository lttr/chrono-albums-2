import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core"

// Album table schema
export const album = sqliteTable(
  "album",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    category: text("category").notNull(),
    createdAt: text("createdAt").notNull(),
  },
  (table) => [
    index("idx_album_year").on(table.year),
    index("idx_album_category").on(table.category),
  ],
)

export type Album = typeof album.$inferSelect
export type NewAlbum = typeof album.$inferInsert

// Media table schema
export const media = sqliteTable(
  "media",
  {
    id: text("id").primaryKey(),
    album: text("album").references(() => album.id),
    createdAt: text("createdAt").notNull(),
    dateTaken: text("dateTaken"),
    fileName: text("fileName"),
    fileSize: integer("fileSize"),
    height: integer("height"),
    width: integer("width"),
    kind: text("kind", { enum: ["image", "video"] }).notNull(),
    locationLat: text("locationLat"),
    locationLng: text("locationLng"),
    locationAlt: text("locationAlt"),
    mimeType: text("mimeType"),
    updatedAt: text("updatedAt").notNull(),
  },
  (table) => [
    index("idx_media_kind").on(table.kind),
    index("idx_media_album").on(table.album),
    index("idx_media_dateTaken").on(table.dateTaken),
  ],
)

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert
