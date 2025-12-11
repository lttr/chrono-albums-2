import type { schema } from "hub:db"

// Select types (read from db)
export type Project = typeof schema.project.$inferSelect
export type Album = typeof schema.album.$inferSelect
export type Category = typeof schema.category.$inferSelect
export type Media = typeof schema.media.$inferSelect

// Insert types (write to db)
export type NewProject = typeof schema.project.$inferInsert
export type NewAlbum = typeof schema.album.$inferInsert
export type NewCategory = typeof schema.category.$inferInsert
export type NewMedia = typeof schema.media.$inferInsert
