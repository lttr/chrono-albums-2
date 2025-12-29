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
    slug: text("slug").notNull().unique(),
    locationAlt: real("locationAlt"),
    locationLat: real("locationLat"),
    locationLon: real("locationLon"),
    mimeType: text("mimeType").notNull(),
    originalName: text("originalName"),
    width: integer("width"),
    // Image variant paths
    lqip: text("lqip"),
    thumbnailPath: text("thumbnail_path"),
    fullPath: text("full_path"),
    originalPath: text("original_path"),
    // Video-specific fields
    processing: integer("processing").default(0), // 0 = ready, 1 = transcoding, -1 = failed
    duration: real("duration"), // video duration in seconds
    posterPath: text("poster_path"), // full poster for video player
    webPath: text("web_path"), // transcoded video path
  },
  (table) => [
    index("idx_media_kind").on(table.kind!),
    index("idx_media_albumId").on(table.albumId!),
  ],
)

export const mediaInsertSchema = createInsertSchema(media).omit({
  slug: true,
  createdAt: true,
})
export const mediaUpdateSchema = createUpdateSchema(media)
