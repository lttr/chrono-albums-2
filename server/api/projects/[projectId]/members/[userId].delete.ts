import { eq, and } from "drizzle-orm"
import { db, schema } from "hub:db"
import { auth } from "~~/layers/auth/server/utils/auth"

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "projectId")
  const userId = getRouterParam(event, "userId")

  if (!projectId || !userId) {
    throw createError({
      statusCode: 400,
      message: "Project ID and User ID are required",
    })
  }

  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  // Check if user is owner of this project
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

  if (!userMembership || userMembership.role !== "owner") {
    throw createError({
      statusCode: 403,
      message: "Only project owners can remove members",
    })
  }

  // Cannot remove yourself
  if (userId === session.user.id) {
    throw createError({
      statusCode: 400,
      message: "You cannot remove yourself from the project",
    })
  }

  // Check if target is a member
  const targetMembership = await db
    .select()
    .from(schema.projectMembership)
    .where(
      and(
        eq(schema.projectMembership.projectId, projectId),
        eq(schema.projectMembership.userId, userId),
      ),
    )
    .get()

  if (!targetMembership) {
    throw createError({
      statusCode: 404,
      message: "Member not found",
    })
  }

  // Cannot remove another owner
  if (targetMembership.role === "owner") {
    throw createError({
      statusCode: 403,
      message: "Cannot remove a project owner",
    })
  }

  // Remove membership
  await db
    .delete(schema.projectMembership)
    .where(
      and(
        eq(schema.projectMembership.projectId, projectId),
        eq(schema.projectMembership.userId, userId),
      ),
    )

  return { success: true }
})
