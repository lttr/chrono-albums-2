import { eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export interface UserMembership {
  projectId: string
  role: "owner" | "member"
}

export default defineEventHandler(async (event): Promise<UserMembership[]> => {
  const session = await getAuthSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  const memberships = await db
    .select({
      projectId: schema.projectMembership.projectId,
      role: schema.projectMembership.role,
    })
    .from(schema.projectMembership)
    .where(eq(schema.projectMembership.userId, session.user.id))

  return memberships
})
