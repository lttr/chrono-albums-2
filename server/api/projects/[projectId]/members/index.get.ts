import { eq, and } from "drizzle-orm"
import { db, schema } from "hub:db"

export interface ProjectMember {
  userId: string
  name: string
  email: string
  role: "owner" | "member"
  createdAt: number
}

export default defineEventHandler(async (event): Promise<ProjectMember[]> => {
  const projectId = getRouterParam(event, "projectId")

  if (!projectId) {
    throw createError({
      statusCode: 400,
      message: "Project ID is required",
    })
  }

  const session = await getAuthSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  // Check if user has access to this project
  const userMembership = await db
    .select()
    .from(schema.projectMembership)
    .where(
      and(
        eq(schema.projectMembership.projectId, projectId),
        eq(schema.projectMembership.userId, session.user.id),
      ),
    )
    .get()

  if (!userMembership) {
    throw createError({
      statusCode: 403,
      message: "Access denied",
    })
  }

  // Get all members with user info
  const members = await db
    .select({
      userId: schema.projectMembership.userId,
      name: schema.user.name,
      email: schema.user.email,
      role: schema.projectMembership.role,
      createdAt: schema.projectMembership.createdAt,
    })
    .from(schema.projectMembership)
    .innerJoin(schema.user, eq(schema.projectMembership.userId, schema.user.id))
    .where(eq(schema.projectMembership.projectId, projectId))

  return members.map((m) => ({
    ...m,
    createdAt: m.createdAt.getTime(),
  }))
})
