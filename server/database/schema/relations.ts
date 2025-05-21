import { relations } from "drizzle-orm"
import { album } from "./album"
import { category } from "./category"
import { media } from "./media"

export const categoryRelations = relations(category, ({ many }) => ({
  albums: many(album),
}))

export const albumRelations = relations(album, ({ many, one }) => ({
  media: many(media),
  category: one(category, {
    fields: [album.categoryId],
    references: [category.id],
  }),
}))

export const mediaRelations = relations(media, ({ one }) => ({
  belongsTo: one(album, {
    // To prevent TS error, the ! is required
    fields: [media.albumId!],
    references: [album.id],
  }),
}))
