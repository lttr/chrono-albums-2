import { relations } from "drizzle-orm"
import { album } from "./album"
import { category } from "./category"
import { media } from "./media"
import { project } from "./project"

export const projectRelations = relations(project, ({ many }) => ({
  albums: many(album),
  categories: many(category),
}))

export const categoryRelations = relations(category, ({ many, one }) => ({
  albums: many(album),
  project: one(project, {
    fields: [category.projectId],
    references: [project.id],
  }),
}))

export const albumRelations = relations(album, ({ many, one }) => ({
  media: many(media),
  category: one(category, {
    fields: [album.categoryId],
    references: [category.id],
  }),
  project: one(project, {
    fields: [album.projectId],
    references: [project.id],
  }),
}))

export const mediaRelations = relations(media, ({ one }) => ({
  belongsTo: one(album, {
    fields: [media.albumId],
    references: [album.id],
  }),
}))
