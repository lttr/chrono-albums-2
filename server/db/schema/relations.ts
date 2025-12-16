import { relations } from "drizzle-orm"
import {
  user,
  session,
  account,
} from "../../../layers/auth/server/db/schema/auth"
import { album } from "./album"
import { category } from "./category"
import { media } from "./media"
import { project } from "./project"
import { projectMembership } from "./projectMembership"

// Auth relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  memberships: many(projectMembership),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

// Project membership relations
export const projectMembershipRelations = relations(
  projectMembership,
  ({ one }) => ({
    user: one(user, {
      fields: [projectMembership.userId],
      references: [user.id],
    }),
    project: one(project, {
      fields: [projectMembership.projectId],
      references: [project.id],
    }),
  }),
)

export const projectRelations = relations(project, ({ many }) => ({
  albums: many(album),
  categories: many(category),
  memberships: many(projectMembership),
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
