import { relations } from "drizzle-orm"
import { album } from "./album"
import { media } from "./media"

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
