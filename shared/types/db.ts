import type { schema } from "hub:db"
import type { z } from "zod"
import type {
  albumInsertSchema,
  categoryInsertSchema,
  mediaInsertSchema,
  projectInsertSchema,
} from "~~/server/db/schema"

// Select types (read from db)
export type Project = typeof schema.project.$inferSelect
export type Album = typeof schema.album.$inferSelect
export type Category = typeof schema.category.$inferSelect
export type Media = typeof schema.media.$inferSelect

// Insert types (for API input - excludes server-generated fields like slug)
export type NewProject = z.infer<typeof projectInsertSchema>
export type NewAlbum = z.infer<typeof albumInsertSchema>
export type NewCategory = z.infer<typeof categoryInsertSchema>
export type NewMedia = z.infer<typeof mediaInsertSchema>
